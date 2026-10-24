extends Area3D
class_name OverdriveProjectile

# ==============================================================================
# CORE BREACH — OBSTACLE OVERDRIVE PULSE PROJECTILE
# - High-speed crimson energy projectile fired by Crimson Wraith
# - Travels with glowing trail particles & illumination
# - Cannot pass through walls or solid barriers (stops on environment collision)
# - Validates hits against obstacle generators & calls accelerate_obstacle_countdown()
# ==============================================================================

signal obstacle_accelerated(generator: Node, reduction: float)

@export var speed: float = 38.0
@export var max_lifetime: float = 1.4
@export var countdown_reduction: float = 3.0

var direction: Vector3 = Vector3.FORWARD
var lifetime: float = 0.0
var shooter_ref: Node3D = null
var has_impacted: bool = false

# Authoritative raycast trajectory bounds
var has_authoritative_trajectory: bool = false
var target_impact_pos: Vector3 = Vector3.ZERO
var target_impact_normal: Vector3 = Vector3.UP
var target_impact_collider: Node = null
var is_authoritative_runner_hit: bool = false
var is_authoritative_generator_hit: bool = false

@onready var raycast: RayCast3D = $RayCast3D
@onready var visual_mesh: MeshInstance3D = $VisualMesh
@onready var trail_particles: CPUParticles3D = $TrailParticles
@onready var impact_particles: CPUParticles3D = $ImpactParticles
@onready var light: OmniLight3D = $OmniLight3D

func _ready() -> void:
	collision_layer = 16
	collision_mask = 1 | 2 | 4 | 8 # Environment (1), Players (2), Control Points (4), Hazards / Lasers (8)
	body_entered.connect(_on_body_entered)
	area_entered.connect(_on_area_entered)
	if raycast:
		raycast.enabled = true
		raycast.collision_mask = 1 | 2 | 4 | 8
		raycast.target_position = Vector3(0, 0, -1.5)

func setup_trajectory(spawn_pos: Vector3, impact_pos: Vector3, impact_normal: Vector3, impact_collider: Node, is_runner_hit: bool, is_gen_hit: bool) -> void:
	global_position = spawn_pos
	target_impact_pos = impact_pos
	target_impact_normal = impact_normal
	target_impact_collider = impact_collider
	is_authoritative_runner_hit = is_runner_hit
	is_authoritative_generator_hit = is_gen_hit
	has_authoritative_trajectory = true

	if spawn_pos.distance_squared_to(impact_pos) > 0.001:
		look_at(impact_pos, Vector3.UP)

func set_shooter(shooter: Node3D) -> void:
	shooter_ref = shooter
	if raycast and shooter is CollisionObject3D:
		raycast.add_exception(shooter)

func _physics_process(delta: float) -> void:
	if has_impacted:
		return

	lifetime += delta
	if lifetime >= max_lifetime:
		queue_free()
		return

	var move_dist = speed * delta
	var forward_dir = -global_transform.basis.z

	# 1. Authoritative trajectory destination check (stops exactly at wall or target)
	if has_authoritative_trajectory:
		var dist_to_target = global_position.distance_to(target_impact_pos)
		if move_dist >= dist_to_target or dist_to_target < 0.1:
			_handle_impact(target_impact_collider, target_impact_pos, target_impact_normal)
			return

	# 2. Continuous sweep raycast along this frame's step to prevent tunneling through thin geometry
	var space_state = get_world_3d().direct_space_state if is_inside_tree() else null
	if space_state:
		var next_pos = global_position + forward_dir * move_dist
		var query = PhysicsRayQueryParameters3D.create(global_position, next_pos, 1 | 2 | 4 | 8)
		query.collide_with_areas = true
		query.collide_with_bodies = true
		var exceptions: Array[RID] = []
		if shooter_ref is CollisionObject3D:
			exceptions.append(shooter_ref.get_rid())
		if shooter_ref:
			for child in shooter_ref.find_children("*", "CollisionObject3D", true, false):
				if child is CollisionObject3D:
					exceptions.append(child.get_rid())
		query.exclude = exceptions
		var result = space_state.intersect_ray(query)
		if not result.is_empty():
			_handle_impact(result.collider, result.position, result.normal)
			return

	global_position += forward_dir * move_dist

func _on_body_entered(body: Node3D) -> void:
	if has_impacted or body == shooter_ref:
		return
	if has_authoritative_trajectory:
		if not is_authoritative_runner_hit and _find_runner(body) != null:
			return # Geometry blocks shot from reaching runner
	_handle_impact(body, global_position, Vector3.UP)

func _on_area_entered(area: Area3D) -> void:
	if has_impacted or area == shooter_ref:
		return
	if has_authoritative_trajectory:
		if not is_authoritative_runner_hit and _find_runner(area) != null:
			return
	_handle_impact(area, global_position, Vector3.UP)

func _handle_impact(target: Node, impact_pos: Vector3, _normal: Vector3) -> void:
	if has_impacted:
		return
	has_impacted = true

	global_position = impact_pos

	# 1. Check if the target is the Runner player
	var runner = _find_runner(target)
	if runner:
		# If authoritative trajectory exists and established no runner hit (e.g. wall in front), ignore runner
		if has_authoritative_trajectory and not is_authoritative_runner_hit:
			_trigger_impact_fx(false)
			return
		_apply_runner_impact(runner)
		_trigger_impact_fx(true)
		return

	# 2. Check for valid obstacle generator
	var generator = _find_obstacle_generator(target)
	var successfully_accelerated = false

	if generator:
		if generator.has_method("accelerate_obstacle_countdown"):
			successfully_accelerated = true
			generator.call_deferred("accelerate_obstacle_countdown", countdown_reduction)
		elif generator.has_method("accelerate_countdown"):
			successfully_accelerated = true
			generator.call_deferred("accelerate_countdown", countdown_reduction)
		
		if successfully_accelerated:
			obstacle_accelerated.emit(generator, countdown_reduction)
			# Play subtle confirmation sound
			if has_node("/root/AudioManager"):
				get_node("/root/AudioManager").play_sfx("sabotage_activate", 1.25)
			# Notify arena
			var arena = get_tree().current_scene if (get_tree() and get_tree().current_scene) else null
			if arena and arena.has_method("_show_notification"):
				arena._show_notification("⚡ OBSTACLE ACCELERATED: -%.0fs SPAWN TIME! ⚡" % countdown_reduction)

	# Trigger visual impact FX
	_trigger_impact_fx(successfully_accelerated)

func _find_runner(node: Node) -> PlayerController:
	if not node:
		return null
	if node is PlayerController:
		if node.current_role == PlayerController.Role.RUNNER:
			return node
	var curr = node.get_parent()
	var depth = 0
	while curr and depth < 4:
		if curr is PlayerController:
			if curr.current_role == PlayerController.Role.RUNNER:
				return curr
		curr = curr.get_parent()
		depth += 1
	return null

func _apply_runner_impact(runner: PlayerController) -> void:
	var arena = get_tree().current_scene
	if not arena or arena.get("time_remaining") == null:
		var curr = runner.get_parent()
		while curr:
			if curr.get("time_remaining") != null:
				arena = curr
				break
			curr = curr.get_parent()

	# Deduct 2 seconds from the remaining match time
	if arena and arena.get("time_remaining") != null:
		arena.time_remaining = maxf(0.0, arena.time_remaining - 2.0)
		if arena.has_method("_update_timer_hud"):
			arena._update_timer_hud()

	# Teleport Runner back to their respawn / checkpoint point
	if runner.has_method("respawn_at_checkpoint"):
		runner.respawn_at_checkpoint()

	# Apply hazard glitch debuff
	if runner.has_method("apply_hazard_effect"):
		runner.apply_hazard_effect(1.2, 0.3)

	# Audio feedback
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("sabotage_activate", 1.6)
		get_node("/root/AudioManager").play_sfx("round_loss", 1.1)

	# UI feedback
	if arena and arena.has_method("_show_notification"):
		arena._show_notification("⚡ RUNNER HIT BY OVERDRIVE LASER: -2s MATCH TIME & RESPAWNED! ⚡")

func _find_obstacle_generator(node: Node) -> Node:
	if not node:
		return null
		
	# Direct match
	if node.is_in_group("obstacle_generator") or node.has_method("accelerate_obstacle_countdown"):
		return node
		
	# Check parent hierarchy (e.g. child collision shape or mesh hit)
	var curr = node.get_parent()
	var depth = 0
	while curr and depth < 4:
		if curr.is_in_group("obstacle_generator") or curr.has_method("accelerate_obstacle_countdown"):
			return curr
		curr = curr.get_parent()
		depth += 1

	# Check if current arena environment has an obstacle at this position
	var arena = get_tree().current_scene
	if arena and arena.has_method("find_obstacle_generator_at_pos"):
		var gen = arena.find_obstacle_generator_at_pos(global_position)
		if gen:
			return gen

	return null

func _trigger_impact_fx(is_generator_hit: bool) -> void:
	if visual_mesh:
		visual_mesh.visible = false
	if trail_particles:
		trail_particles.emitting = false

	if light:
		light.light_color = Color(1.0, 0.2, 0.1) if is_generator_hit else Color(0.9, 0.5, 0.2)
		light.light_energy = 4.0 if is_generator_hit else 1.8
		light.omni_range = 6.0

	if impact_particles:
		impact_particles.emitting = true

	var tw = create_tween()
	if light:
		tw.tween_property(light, "light_energy", 0.0, 0.2)
	tw.tween_callback(queue_free)
