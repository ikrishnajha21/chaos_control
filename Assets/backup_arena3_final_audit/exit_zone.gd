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
		laser_barrier.visible = true
		laser_barrier.scale = Vector3.ONE
		laser_barrier.position = Vector3(0.0, 1.35, 0.0)
		laser_barrier.rotation = Vector3.ZERO
	if unlock_particles:
		unlock_particles.emitting = false
	_update_visuals()

func unlock_exit() -> void:
	is_unlocked = true
	_update_visuals()
	
	# Clean opening retraction animation without fighting process
	if laser_barrier:
		var tw = create_tween()
		tw.tween_property(laser_barrier, "scale:y", 0.01, 0.6).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		tw.parallel().tween_property(laser_barrier, "position:y", 2.8, 0.6)
		tw.tween_callback(func():
			if is_unlocked and laser_barrier:
				laser_barrier.visible = false
		)
		
	if omni_light:
		omni_light.light_energy = 5.0
		var tw_light = create_tween()
		tw_light.tween_property(omni_light, "light_energy", 3.5, 0.5)

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
		omni_light.light_energy = 3.5 if is_unlocked else 2.0
		
	if status_label:
		if is_unlocked:
			status_label.text = "EXIT UNLOCKED\n[ REACH THE EXIT ]"
			status_label.modulate = Color(0.2, 1.0, 0.4)
		else:
			status_label.text = "EXIT LOCKED\n[ COMPLETE ALL OBJECTIVES ]"
			status_label.modulate = Color(1.0, 0.25, 0.25)

func _process(delta: float) -> void:
	# Subtle energy shimmer on locked laser barrier without mesh rotation or transform jitter
	if not is_unlocked and laser_barrier and locked_mat:
		var pulse = (sin(Time.get_ticks_msec() * 0.005) + 1.0) * 0.5
		locked_mat.emission_energy_multiplier = 2.5 + pulse * 1.5

func _on_body_entered(body: Node3D) -> void:
	if not is_unlocked:
		if (body is PlayerController or body.has_method("eliminate")) and not body.is_eliminated:
			body.eliminate()
			if has_node("/root/AudioManager"):
				get_node("/root/AudioManager").play_sfx("sabotage_activate")
			var arena = get_parent()
			if arena and arena.has_method("_show_notification"):
				arena._show_notification("⚡ ALERT: Player %d Contacted Locked Extraction Laser Barrier! ⚡" % body.player_id)
		return
		
	if body is PlayerController or body.has_method("is_runner"):
		# Strictly require Runner role; Saboteur cannot activate
		if body.current_role == PlayerController.Role.RUNNER:
			runner_reached_exit.emit()
