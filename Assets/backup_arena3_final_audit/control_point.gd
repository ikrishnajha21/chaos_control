extends Area3D
class_name ControlPoint

signal point_activated(point_name: String)

@export var point_id: String = "A"
@export var point_title: String = "POINT ALPHA"

var is_activated: bool = false
var runner_in_range: bool = false
var is_interaction_locked: bool = false
var is_scrambled: bool = false
var scramble_timer: float = 0.0
var current_runner: PlayerController = null

# Visual nodes
@onready var core_mesh: MeshInstance3D = $Visuals/CoreMesh
@onready var ring_mesh: MeshInstance3D = $Visuals/RingMesh
@onready var pedestal_mesh: MeshInstance3D = $Visuals/PedestalMesh
@onready var omni_light: OmniLight3D = $Visuals/OmniLight3D
@onready var burst_particles: CPUParticles3D = $Visuals/BurstParticles
@onready var prompt_label: Label3D = $StatusLabel3D

# Materials
var inactive_mat: StandardMaterial3D
var active_mat: StandardMaterial3D
var scrambled_mat: StandardMaterial3D

func _ready() -> void:
	_setup_materials()
	_update_visuals()
	
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)

func _setup_materials() -> void:
	inactive_mat = StandardMaterial3D.new()
	inactive_mat.albedo_color = Color(1.0, 0.65, 0.1) # Amber / Tech Yellow
	inactive_mat.emission_enabled = true
	inactive_mat.emission = Color(1.0, 0.55, 0.05)
	inactive_mat.emission_energy_multiplier = 1.8
	inactive_mat.roughness = 0.3
	inactive_mat.metallic = 0.4

	active_mat = StandardMaterial3D.new()
	active_mat.albedo_color = Color(0.1, 1.0, 0.75) # Cyber Aqua / Emerald
	active_mat.emission_enabled = true
	active_mat.emission = Color(0.1, 1.0, 0.75)
	active_mat.emission_energy_multiplier = 3.5
	active_mat.roughness = 0.2
	active_mat.metallic = 0.5

	scrambled_mat = StandardMaterial3D.new()
	scrambled_mat.albedo_color = Color(1.0, 0.15, 0.2) # Glitch Crimson
	scrambled_mat.emission_enabled = true
	scrambled_mat.emission = Color(1.0, 0.2, 0.1)
	scrambled_mat.emission_energy_multiplier = 4.0
	scrambled_mat.roughness = 0.4
	scrambled_mat.metallic = 0.6

func _process(delta: float) -> void:
	# Continuous rotation and floating bob of the core
	if core_mesh:
		core_mesh.rotate_y(delta * (3.5 if is_activated else (5.0 if is_scrambled else 1.5)))
		var time = Time.get_ticks_msec() / 1000.0
		var base_y = 1.35 + sin(time * 3.0) * 0.1
		if is_scrambled:
			base_y += randf_range(-0.06, 0.06)
		core_mesh.position.y = base_y

	# Process scramble timer
	if is_scrambled:
		scramble_timer -= delta
		if prompt_label:
			prompt_label.text = "%s\n[ SCRAMBLED // LOCKED (%.1fs) ]" % [point_title, maxf(0.0, scramble_timer)]
			prompt_label.modulate = Color(1.0, 0.2, 0.2)
		if scramble_timer <= 0.0:
			is_scrambled = false
			is_interaction_locked = false
			_update_visuals()

	# Continuous frame check for immediate responsiveness on override key press
	if runner_in_range and not is_activated and not is_interaction_locked and not is_scrambled:
		var action_to_check = "p1_interact"
		if current_runner and current_runner.player_id == 2:
			action_to_check = "p2_action"
		if Input.is_action_just_pressed(action_to_check):
			activate()

func scramble(duration: float = 3.5) -> void:
	if is_activated:
		return # Cannot scramble already claimed terminals
	is_scrambled = true
	is_interaction_locked = true
	scramble_timer = duration
	if core_mesh:
		core_mesh.material_override = scrambled_mat
	if ring_mesh:
		ring_mesh.material_override = scrambled_mat
	if omni_light:
		omni_light.light_color = Color(1.0, 0.15, 0.2)
		omni_light.light_energy = 4.0
	if prompt_label:
		prompt_label.text = "%s\n[ SCRAMBLED // LOCKED (%.1fs) ]" % [point_title, duration]
		prompt_label.modulate = Color(1.0, 0.2, 0.2)
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("terminal_scramble")

func _on_body_entered(body: Node3D) -> void:
	if _is_runner(body):
		runner_in_range = true
		current_runner = body as PlayerController
		_update_prompt()

func _on_body_exited(body: Node3D) -> void:
	if _is_runner(body):
		runner_in_range = false
		current_runner = null
		_update_prompt()

func _is_runner(body: Node3D) -> bool:
	if body is PlayerController:
		return body.current_role == PlayerController.Role.RUNNER
	return false

func set_interaction_locked(locked: bool) -> void:
	is_interaction_locked = locked
	_update_prompt()

func _unhandled_input(event: InputEvent) -> void:
	if is_activated or not runner_in_range or is_interaction_locked:
		return
		
	var action_to_check = "p1_interact"
	if current_runner and current_runner.player_id == 2:
		action_to_check = "p2_action"
		
	if event.is_action_pressed(action_to_check):
		activate()
		get_viewport().set_input_as_handled()

func activate() -> void:
	if is_activated or is_interaction_locked:
		return
		
	is_activated = true
	_update_visuals()
	
	# Visual feedback: Particle burst and glow flash
	if burst_particles:
		burst_particles.restart()
	if omni_light:
		omni_light.light_energy = 5.5
		var tw = create_tween()
		tw.tween_property(omni_light, "light_energy", 3.0, 0.45).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
		
	# Audio feedback
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("objective_activate")

	point_activated.emit(point_title)

func reset_point() -> void:
	is_activated = false
	is_interaction_locked = false
	is_scrambled = false
	scramble_timer = 0.0
	if burst_particles:
		burst_particles.emitting = false
	_update_visuals()
	_update_prompt()

func _update_visuals() -> void:
	var mat = active_mat if is_activated else inactive_mat
	if core_mesh:
		core_mesh.material_override = mat
	if ring_mesh:
		ring_mesh.material_override = mat
	if omni_light:
		omni_light.light_color = Color(0.1, 1.0, 0.75) if is_activated else Color(1.0, 0.65, 0.1)
		omni_light.light_energy = 3.0 if is_activated else 1.2
	
	_update_prompt()

func _update_prompt() -> void:
	if not prompt_label:
		return
		
	if is_activated:
		prompt_label.text = "%s\n[ ONLINE ✓ ]" % point_title
		prompt_label.modulate = Color(0.2, 1.0, 0.8)
	elif runner_in_range:
		var key_text = "E"
		if current_runner and current_runner.player_id == 2:
			key_text = "SPACE"
		prompt_label.text = "%s\n[ PRESS %s TO OVERRIDE ]" % [point_title, key_text]
		prompt_label.modulate = Color(1.0, 0.9, 0.3)
	else:
		prompt_label.text = "%s\n[ STANDBY ]" % point_title
		prompt_label.modulate = Color(0.9, 0.7, 0.4, 0.8)
