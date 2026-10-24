extends Area3D
class_name ExitZone

signal runner_reached_exit()

var is_unlocked: bool = false

# Visual nodes
@onready var laser_barrier: MeshInstance3D = $Visuals/LaserBarrier
@onready var pad_mesh: MeshInstance3D = $Visuals/ExitPad
@onready var omni_light: OmniLight3D = $Visuals/OmniLight3D
@onready var unlock_particles: CPUParticles3D = $Visuals/UnlockParticles
@onready var status_label: Label3D = $StatusLabel3D

# Materials
var locked_mat: StandardMaterial3D
var unlocked_mat: StandardMaterial3D

func _ready() -> void:
	_setup_materials()
	lock_exit()
	body_entered.connect(_on_body_entered)

func _setup_materials() -> void:
	locked_mat = StandardMaterial3D.new()
	locked_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	locked_mat.albedo_color = Color(1.0, 0.1, 0.1, 0.5)
	locked_mat.emission_enabled = true
	locked_mat.emission = Color(1.0, 0.1, 0.1)
	locked_mat.emission_energy_multiplier = 3.0

	unlocked_mat = StandardMaterial3D.new()
	unlocked_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	unlocked_mat.albedo_color = Color(0.1, 1.0, 0.4, 0.6)
	unlocked_mat.emission_enabled = true
	unlocked_mat.emission = Color(0.1, 1.0, 0.4)
	unlocked_mat.emission_energy_multiplier = 4.5

func lock_exit() -> void:
	is_unlocked = false
	if laser_barrier:
		laser_barrier.scale.y = 1.0
		laser_barrier.position.y = 1.35
	if unlock_particles:
		unlock_particles.emitting = false
	_update_visuals()

func unlock_exit() -> void:
	is_unlocked = true
	_update_visuals()
	
	# Opening animation
	if laser_barrier:
		var tw = create_tween()
		tw.tween_property(laser_barrier, "scale:y", 0.1, 0.75).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
		tw.parallel().tween_property(laser_barrier, "position:y", 2.65, 0.75)
		
	if omni_light:
		omni_light.light_energy = 6.0
		var tw_light = create_tween()
		tw_light.tween_property(omni_light, "light_energy", 3.8, 0.5)

	if unlock_particles:
		unlock_particles.emitting = true

	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("exit_unlocked")

func _update_visuals() -> void:
	if not is_inside_tree():
		return
		
	var mat = unlocked_mat if is_unlocked else locked_mat
	
	if laser_barrier:
		laser_barrier.material_override = mat
	if pad_mesh:
		pad_mesh.material_override = mat
	if omni_light:
		omni_light.light_color = Color(0.1, 1.0, 0.4) if is_unlocked else Color(1.0, 0.1, 0.1)
		omni_light.light_energy = 4.0 if is_unlocked else 2.0
		
	if status_label:
		if is_unlocked:
			status_label.text = "EXIT UNLOCKED\n[ REACH THE EXIT ]"
			status_label.modulate = Color(0.2, 1.0, 0.4)
		else:
			status_label.text = "EXIT LOCKED\n[ COMPLETE ALL OBJECTIVES ]"
			status_label.modulate = Color(1.0, 0.25, 0.25)

func _process(delta: float) -> void:
	# Subtle energy wave animation on laser barrier
	if laser_barrier and is_unlocked:
		var pulse = (sin(Time.get_ticks_msec() * 0.006) + 1.0) * 0.5
		laser_barrier.scale.y = 1.0 + pulse * 0.08
		laser_barrier.rotate_y(delta * 0.8)

func _on_body_entered(body: Node3D) -> void:
	if not is_unlocked:
		return
		
	if body is PlayerController:
		# Strictly require Runner role; Saboteur cannot activate
		if body.current_role == PlayerController.Role.RUNNER:
			runner_reached_exit.emit()
