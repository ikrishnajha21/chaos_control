extends Node3D
class_name FinalBlastFX

# ==============================================================================
# CORE BREACH — CRIMSON LASER BURST: FINAL OVERDRIVE DETONATION FX
# - Dramatic, high-impact crimson explosion centered on target
# - Expanding shockwave ring, central flash flare, particle blast, and light burst
# ==============================================================================

@onready var shockwave_mesh: MeshInstance3D = $ShockwaveRing
@onready var flash_light: OmniLight3D = $FlashLight
@onready var spark_particles: CPUParticles3D = $SparkParticles
@onready var core_flash_mesh: MeshInstance3D = $CoreFlash

func _ready() -> void:
	# Initial states
	if shockwave_mesh:
		shockwave_mesh.scale = Vector3(0.2, 0.2, 0.2)
	if flash_light:
		flash_light.light_energy = 8.0
		flash_light.omni_range = 10.0
	if core_flash_mesh:
		core_flash_mesh.scale = Vector3(0.5, 0.5, 0.5)

	# Trigger particles
	if spark_particles:
		spark_particles.emitting = true

	# Play audio
	if has_node("/root/AudioManager"):
		var am = get_node("/root/AudioManager")
		am.play_sfx("round_loss", 0.85)
		am.play_sfx("sabotage_activate", 0.75)
		if ResourceLoader.exists("res://audio/sfx/arena_shift.wav"):
			am.play_sfx("arena_shift", 1.3)

	# Animate explosion expansion and fade
	var tw = create_tween()
	
	# Expanding shockwave
	if shockwave_mesh:
		tw.parallel().tween_property(shockwave_mesh, "scale", Vector3(6.5, 1.0, 6.5), 0.45).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
		tw.parallel().tween_property(shockwave_mesh, "transparency", 1.0, 0.45).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	
	# Core flash bloom & collapse
	if core_flash_mesh:
		tw.parallel().tween_property(core_flash_mesh, "scale", Vector3(2.5, 2.5, 2.5), 0.12)
		tw.chain().tween_property(core_flash_mesh, "scale", Vector3(0.01, 0.01, 0.01), 0.25)
	
	# Flash light fade
	if flash_light:
		tw.parallel().tween_property(flash_light, "light_energy", 0.0, 0.5).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	
	# Clean up after particles and tween complete
	tw.tween_callback(func():
		var timer = get_tree().create_timer(0.4)
		timer.timeout.connect(queue_free)
	)
