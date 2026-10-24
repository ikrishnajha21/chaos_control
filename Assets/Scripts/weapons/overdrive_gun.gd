extends Node3D
class_name OverdriveGun

# ==============================================================================
# CORE BREACH — OBSTACLE OVERDRIVE SCI-FI WEAPON
# - Equipped exclusively by Crimson Wraith (Saboteur role)
# - Emits high-energy crimson pulses that target Cyan Phantom and obstacles
# - Forward orientation: -Z (Standard Godot convention)
# - Dark metallic chassis, dual plasma rails, glowing crimson conduits & muzzle flash
# - Procedural spring recoil animation on fire
# ==============================================================================

const PROJECTILE_SCENE = preload("res://scenes/weapons/overdrive_projectile.tscn")

@onready var muzzle: Marker3D = $Muzzle
@onready var muzzle_light: OmniLight3D = $Muzzle/MuzzleLight
@onready var muzzle_flash_mesh: MeshInstance3D = $Muzzle/MuzzleFlashMesh

var recoil_offset: float = 0.0
var base_position: Vector3 = Vector3.ZERO

func _ready() -> void:
	base_position = position
	if muzzle_light:
		muzzle_light.visible = false
	if muzzle_flash_mesh:
		muzzle_flash_mesh.visible = false

func _process(delta: float) -> void:
	# Smooth recoil recovery (recoil pushes backwards along +Z)
	if recoil_offset > 0.001:
		recoil_offset = lerpf(recoil_offset, 0.0, 16.0 * delta)
		position = base_position + transform.basis.z * recoil_offset
	else:
		position = base_position

func get_muzzle_position() -> Vector3:
	if muzzle and muzzle.is_inside_tree():
		return muzzle.global_position
	if is_inside_tree():
		return global_position + (-global_transform.basis.z * 0.28)
	return Vector3.ZERO

func fire(aim_direction: Vector3, shooter: Node3D = null) -> Node3D:
	# Trigger recoil
	recoil_offset = 0.08
	
	# Muzzle flash illumination
	_trigger_muzzle_flash()

	var spawn_pos: Vector3 = get_muzzle_position()
	if spawn_pos == Vector3.ZERO:
		if shooter and shooter.is_inside_tree():
			spawn_pos = shooter.global_position + Vector3(0.0, 1.2, 0.0) + aim_direction.normalized() * 0.9
		else:
			spawn_pos = global_position + Vector3(0.0, 1.2, 0.0)

	# Perform authoritative physics raycast from muzzle along aim_direction
	var max_range: float = 80.0
	var query_end: Vector3 = spawn_pos + aim_direction.normalized() * max_range
	var impact_pos: Vector3 = query_end
	var impact_normal: Vector3 = -aim_direction.normalized()
	var impact_collider: Node = null
	var is_runner_hit: bool = false
	var is_generator_hit: bool = false

	var space_state = get_world_3d().direct_space_state if is_inside_tree() else null
	if space_state:
		var query = PhysicsRayQueryParameters3D.create(spawn_pos, query_end, 1 | 2 | 4 | 8)
		query.collide_with_areas = true
		query.collide_with_bodies = true

		var exceptions: Array[RID] = []
		if shooter is CollisionObject3D:
			exceptions.append(shooter.get_rid())
		if shooter:
			for child in shooter.find_children("*", "CollisionObject3D", true, false):
				if child is CollisionObject3D:
					exceptions.append(child.get_rid())
		query.exclude = exceptions

		var result = space_state.intersect_ray(query)
		if not result.is_empty():
			impact_pos = result.position
			impact_normal = result.normal
			impact_collider = result.collider

			var runner = _find_runner(impact_collider)
			if runner:
				is_runner_hit = true
				impact_collider = runner
			elif _is_obstacle_generator(impact_collider):
				is_generator_hit = true

	# Spawn projectile in world space
	var projectile = PROJECTILE_SCENE.instantiate()
	if shooter and shooter.get_parent():
		shooter.get_parent().add_child(projectile)
	else:
		get_tree().current_scene.add_child(projectile)

	projectile.set_shooter(shooter)
	projectile.setup_trajectory(spawn_pos, impact_pos, impact_normal, impact_collider, is_runner_hit, is_generator_hit)
	
	return projectile

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

func _is_obstacle_generator(node: Node) -> bool:
	if not node:
		return false
	if node.is_in_group("obstacle_generator") or node.has_method("accelerate_obstacle_countdown") or node.has_method("accelerate_countdown"):
		return true
	var curr = node.get_parent()
	var depth = 0
	while curr and depth < 4:
		if curr.is_in_group("obstacle_generator") or curr.has_method("accelerate_obstacle_countdown") or curr.has_method("accelerate_countdown"):
			return true
		curr = curr.get_parent()
		depth += 1
	return false

func _trigger_muzzle_flash() -> void:
	if muzzle_light:
		muzzle_light.visible = true
		muzzle_light.light_energy = 3.5
	if muzzle_flash_mesh:
		muzzle_flash_mesh.visible = true
		muzzle_flash_mesh.scale = Vector3(1.2, 1.2, 1.2)

	var tw = create_tween()
	if muzzle_light:
		tw.parallel().tween_property(muzzle_light, "light_energy", 0.0, 0.08)
	if muzzle_flash_mesh:
		tw.parallel().tween_property(muzzle_flash_mesh, "scale", Vector3(0.1, 0.1, 0.1), 0.08)
	tw.tween_callback(func():
		if muzzle_light:
			muzzle_light.visible = false
		if muzzle_flash_mesh:
			muzzle_flash_mesh.visible = false
	)
