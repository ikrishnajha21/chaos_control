extends CharacterBody3D
class_name PlayerController

signal hazard_effect_applied
signal player_eliminated(player_id: int)

enum Role { RUNNER, SABOTEUR }

@export var player_id: int = 1
@export var current_role: Role = Role.RUNNER
@export var move_speed: float = 8.0
@export var jump_velocity: float = 8.5
@export var acceleration: float = 35.0
@export var friction: float = 30.0
@export var rotation_speed: float = 14.0

# Node references
@onready var visual_root: Node3D = $Visuals
@onready var crimson_wraith: CharacterVisual = $Visuals.get_node_or_null("CrimsonWraith")
@onready var cyan_phantom: CharacterVisual = $Visuals.get_node_or_null("CyanPhantom")
@onready var body_mesh: MeshInstance3D = $Visuals.get_node_or_null("BodyMesh")
@onready var visor_mesh: MeshInstance3D = $Visuals.get_node_or_null("VisorMesh")
@onready var ring_mesh: MeshInstance3D = $Visuals.get_node_or_null("RingMesh")
@onready var label_3d: Label3D = $Label3D

# Active character reference
var active_character: CharacterVisual = null

# Internal movement state
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity", 9.8) * 2.0
var move_input: Vector2 = Vector2.ZERO
var input_up: String = ""
var input_down: String = ""
var input_left: String = ""
var input_right: String = ""
var input_action: String = ""
var input_jump: String = ""
var last_checkpoint_position: Vector3 = Vector3.ZERO

# Hazard / Debuff state
var speed_multiplier: float = 1.0
var hazard_timer: float = 0.0
var is_glitched: bool = false
var is_frozen: bool = false

# Elimination & Death state
var is_eliminated: bool = false
var elimination_timer: float = 0.0
var elimination_delay: float = 1.2
var deaths: int = 0

# Mobility Surge state (Runner ability)
var surge_timer: float = 0.0
var surge_multiplier: float = 1.0
var is_surging: bool = false

# Bobbing animation state
var bob_time: float = 0.0

func _ready() -> void:
	_configure_inputs()
	_update_appearance()
	last_checkpoint_position = global_position

func _configure_inputs() -> void:
	if player_id == 1:
		input_up = "p1_up"
		input_down = "p1_down"
		input_left = "p1_left"
		input_right = "p1_right"
		input_action = "p1_interact"
		input_jump = "p1_jump"
	else:
		input_up = "p2_up"
		input_down = "p2_down"
		input_left = "p2_left"
		input_right = "p2_right"
		input_action = "p2_action"
		input_jump = "p2_jump"

func set_checkpoint(pos: Vector3) -> void:
	last_checkpoint_position = pos

func eliminate() -> void:
	if is_eliminated:
		return # Single-trigger guard prevents repeated trigger spam
	is_eliminated = true
	deaths += 1
	elimination_timer = elimination_delay
	is_glitched = true
	speed_multiplier = 0.25
	velocity = Vector3.ZERO
	clear_surge()
	hazard_effect_applied.emit()
	player_eliminated.emit(player_id)
	
	if label_3d:
		label_3d.text = "P%d: ELIMINATED!" % player_id
		label_3d.modulate = Color(1.0, 0.15, 0.15)
		
	if active_character:
		active_character.apply_hazard_glitch(true)
		
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("round_loss", 1.2)

func respawn_at_checkpoint() -> void:
	if last_checkpoint_position == Vector3.ZERO:
		last_checkpoint_position = Vector3(global_position.x, 1.0, global_position.z)
	global_position = last_checkpoint_position
	velocity = Vector3.ZERO
	is_eliminated = false
	elimination_timer = 0.0
	clear_hazard_effect()
	clear_surge()
	if visual_root:
		visual_root.position = Vector3.ZERO
	_update_appearance()
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click", 0.75)

func set_role(new_role: Role) -> void:
	current_role = new_role
	clear_surge()
	_update_appearance()

func is_saviour() -> bool:
	return current_role == Role.RUNNER

func is_runner() -> bool:
	return current_role == Role.RUNNER

func _update_appearance() -> void:
	if not is_inside_tree():
		return
		
	if not visual_root:
		visual_root = get_node_or_null("Visuals")
	if not crimson_wraith and visual_root:
		crimson_wraith = visual_root.get_node_or_null("CrimsonWraith")
	if not cyan_phantom and visual_root:
		cyan_phantom = visual_root.get_node_or_null("CyanPhantom")
	if not label_3d:
		label_3d = get_node_or_null("Label3D")
		
	var main_color: Color
	var accent_color: Color
	var role_name: String
	
	if current_role == Role.RUNNER:
		main_color = Color(0.12, 0.72, 1.0) # Bright Cyan
		accent_color = Color(0.4, 1.0, 0.8) # Aqua Glow
		role_name = "P%d: RUNNER" % player_id
		
		# Show Cyan Phantom, hide Crimson Wraith
		if cyan_phantom:
			cyan_phantom.visible = true
			active_character = cyan_phantom
		if crimson_wraith:
			crimson_wraith.visible = false
			
		# Disable Saboteur visibility aura
		var s_light = get_node_or_null("SaboteurVisibilityLight")
		if s_light:
			s_light.visible = false
	else:
		main_color = Color(1.0, 0.28, 0.15) # Aggressive Neon Crimson / Orange
		accent_color = Color(1.0, 0.85, 0.2) # Ember Yellow Glow
		role_name = "P%d: SABOTEUR" % player_id
		
		# Show Crimson Wraith, hide Cyan Phantom
		if crimson_wraith:
			crimson_wraith.visible = true
			active_character = crimson_wraith
		if cyan_phantom:
			cyan_phantom.visible = false

		# Enable Saboteur visibility enhancement (Aura Rim Light)
		var s_light = get_node_or_null("SaboteurVisibilityLight")
		if not s_light:
			s_light = OmniLight3D.new()
			s_light.name = "SaboteurVisibilityLight"
			s_light.light_color = Color(1.0, 0.22, 0.15)
			s_light.light_energy = 1.8
			s_light.omni_range = 3.8
			s_light.position = Vector3(0, 1.1, 0)
			s_light.shadow_enabled = false
			add_child(s_light)
		s_light.visible = true

	if active_character:
		active_character.play_idle()

	# Backward compatibility if legacy meshes are present
	if body_mesh:
		var mat = StandardMaterial3D.new()
		mat.albedo_color = main_color
		mat.roughness = 0.35
		mat.metallic = 0.2
		body_mesh.material_override = mat

	if visor_mesh:
		var visor_mat = StandardMaterial3D.new()
		visor_mat.albedo_color = accent_color
		visor_mat.emission_enabled = true
		visor_mat.emission = accent_color
		visor_mat.emission_energy_multiplier = 2.0
		visor_mesh.material_override = visor_mat

	if ring_mesh:
		var ring_mat = StandardMaterial3D.new()
		ring_mat.albedo_color = main_color
		ring_mat.emission_enabled = true
		ring_mat.emission = main_color
		ring_mat.emission_energy_multiplier = 1.5
		ring_mesh.material_override = ring_mat

	if label_3d:
		label_3d.text = role_name
		label_3d.modulate = accent_color

func apply_hazard_effect(duration: float = 1.5, slow_factor: float = 0.25) -> void:
	# Only affect the Runner
	if current_role != Role.RUNNER:
		return
		
	# Positive Character Perk: Cybernetic Resilience (25% reduced debuff recovery duration)
	var effective_duration = duration * 0.75
	hazard_timer = effective_duration
	speed_multiplier = slow_factor
	is_glitched = true
	# Interrupt any active surge
	is_surging = false
	surge_timer = 0.0
	surge_multiplier = 1.0
	hazard_effect_applied.emit()
	
	# Immediate visual glitch feedback
	if label_3d:
		label_3d.text = "P%d: GLITCHED! (%.1fs)" % [player_id, effective_duration]
		label_3d.modulate = Color(1.0, 0.2, 0.1)
		
	if active_character:
		active_character.apply_hazard_glitch(true)

	if body_mesh and body_mesh.material_override:
		body_mesh.material_override.albedo_color = Color(1.0, 0.4, 0.1)
		body_mesh.material_override.emission_enabled = true
		body_mesh.material_override.emission = Color(1.0, 0.2, 0.1)
		body_mesh.material_override.emission_energy_multiplier = 2.5

func apply_mobility_surge(duration: float = 1.4, boost_factor: float = 1.35) -> void:
	if current_role != Role.RUNNER:
		return
	if is_glitched:
		return # Cannot surge while glitched
		
	surge_timer = duration
	surge_multiplier = boost_factor
	is_surging = true
	
	if label_3d:
		label_3d.text = "P%d: SURGE! (%.1fs)" % [player_id, duration]
		label_3d.modulate = Color(0.2, 1.0, 0.8)
		
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("runner_surge")

func clear_surge() -> void:
	surge_timer = 0.0
	surge_multiplier = 1.0
	is_surging = false
	if not is_glitched:
		_update_appearance()

func clear_hazard_effect() -> void:
	hazard_timer = 0.0
	speed_multiplier = 1.0
	is_glitched = false
	if active_character:
		active_character.apply_hazard_glitch(false)
	_update_appearance()

func freeze() -> void:
	is_frozen = true
	clear_surge()
	velocity = Vector3.ZERO

func unfreeze() -> void:
	is_frozen = false

func _physics_process(delta: float) -> void:
	# Out-of-bounds fall check -> respawn at last valid checkpoint
	if global_position.y < -10.0:
		respawn_at_checkpoint()

	# Process Elimination Sequence
	if is_eliminated:
		velocity = Vector3.ZERO
		elimination_timer -= delta
		if visual_root:
			visual_root.position.x = randf_range(-0.08, 0.08)
			visual_root.position.z = randf_range(-0.08, 0.08)
		if active_character:
			active_character.update_movement(0.0)
		if label_3d:
			label_3d.text = "P%d: ELIMINATED! (%.1fs)" % [player_id, maxf(0.0, elimination_timer)]
		if elimination_timer <= 0.0:
			respawn_at_checkpoint()
			return
		move_and_slide()
		return

	if is_frozen:
		velocity = Vector3.ZERO
		move_and_slide()
		if active_character:
			active_character.update_movement(0.0)
		return

	# Gravity & Jumping
	if not is_on_floor():
		velocity.y -= gravity * delta
	else:
		if not is_frozen and input_jump != "" and Input.is_action_just_pressed(input_jump):
			velocity.y = jump_velocity
			if has_node("/root/AudioManager"):
				get_node("/root/AudioManager").play_sfx("menu_click", 1.4)
		else:
			velocity.y = 0.0

	# Process Hazard Glitch state
	if hazard_timer > 0.0:
		hazard_timer -= delta
		if label_3d:
			label_3d.text = "P%d: GLITCHED! (%.1fs)" % [player_id, maxf(0.0, hazard_timer)]
		
		# Jitter visual mesh slightly
		if visual_root:
			visual_root.position.x = randf_range(-0.06, 0.06)
			visual_root.position.z = randf_range(-0.06, 0.06)
			
		if hazard_timer <= 0.0:
			clear_hazard_effect()
	elif is_surging:
		surge_timer -= delta
		if label_3d:
			label_3d.text = "P%d: SURGE! (%.1fs)" % [player_id, maxf(0.0, surge_timer)]
		if surge_timer <= 0.0:
			clear_surge()

	# Read Input
	var dir_x := 0.0
	var dir_z := 0.0
	if Input.is_action_pressed(input_right):
		dir_x += 1.0
	if Input.is_action_pressed(input_left):
		dir_x -= 1.0
	if Input.is_action_pressed(input_down):
		dir_z += 1.0
	if Input.is_action_pressed(input_up):
		dir_z -= 1.0

	var wish_dir := Vector3(dir_x, 0.0, dir_z).normalized()
	
	# Horizontal velocity calculation with speed multiplier (slow / surge / normal)
	var current_h_vel: Vector3 = Vector3(velocity.x, 0.0, velocity.z)
	var current_boost = surge_multiplier if is_surging else 1.0
	var target_speed: float = move_speed * speed_multiplier * current_boost
	var target_h_vel: Vector3 = wish_dir * target_speed
	
	if wish_dir.length_squared() > 0.01:
		current_h_vel = current_h_vel.move_toward(target_h_vel, acceleration * delta)
		
		# Smooth rotation towards movement direction
		var look_target = global_position + wish_dir
		var target_transform = visual_root.global_transform.looking_at(look_target, Vector3.UP)
		visual_root.global_basis = visual_root.global_basis.slerp(target_transform.basis, rotation_speed * delta)
		
		# Juicy bounce/tilt animation when running
		bob_time += delta * 15.0
		visual_root.position.y = abs(sin(bob_time)) * 0.12
		visual_root.rotation.z = sin(bob_time * 0.5) * 0.08
		
		# Update character movement animation
		if active_character:
			active_character.update_movement(current_h_vel.length())
	else:
		current_h_vel = current_h_vel.move_toward(Vector3.ZERO, friction * delta)
		# Smoothly reset bobbing
		visual_root.position.y = lerp(visual_root.position.y, 0.0, 12.0 * delta)
		visual_root.rotation.z = lerp(visual_root.rotation.z, 0.0, 12.0 * delta)
		
		if active_character:
			active_character.update_movement(0.0)

	velocity.x = current_h_vel.x
	velocity.z = current_h_vel.z

	move_and_slide()
