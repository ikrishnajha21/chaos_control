extends Node3D
class_name CyanPhantomShatterFX

# ==============================================================================
# CORE BREACH — CYAN PHANTOM PHYSICAL SHATTER EFFECT
# - Shatters Cyan Phantom into distinct physical armor and body fragments
# - Radial explosive scattering with physics impulses, tumbling torque & gravity
# - Cyan electrical spark arcs, central bloom flash, and expanding shockwave
# - Automatic fade and clean removal
# ==============================================================================

@onready var flash_light: OmniLight3D = $FlashLight
@onready var shockwave_ring: MeshInstance3D = $ShockwaveRing
@onready var spark_particles: CPUParticles3D = $SparkParticles
@onready var electric_particles: CPUParticles3D = $ElectricParticles
@onready var fragments_root: Node3D = $Fragments

var is_active: bool = false
var has_exploded: bool = false
var blast_origin_override: Vector3 = Vector3.ZERO
var blast_force_override: float = 14.0

func _ready() -> void:
	if not has_exploded:
		var origin = blast_origin_override if blast_origin_override != Vector3.ZERO else (global_position + Vector3(0.0, 0.8, 0.0))
		explode_shatter(origin, blast_force_override)

func explode_shatter(blast_origin: Vector3 = Vector3.ZERO, blast_force: float = 14.0) -> void:
	if not is_inside_tree():
		blast_origin_override = blast_origin
		blast_force_override = blast_force
		return
	if has_exploded:
		return
	has_exploded = true
	is_active = true
	if blast_origin == Vector3.ZERO:
		blast_origin = global_position + Vector3(0.0, 0.8, 0.0)

	# 1. Trigger audio feedback (layered crystalline/metallic shatter + electronic glitch)
	if is_inside_tree() and has_node("/root/AudioManager"):
		var am = get_node("/root/AudioManager")
		am.play_sfx("round_loss", 1.35)
		am.play_sfx("terminal_scramble", 1.15)
		am.play_sfx("sabotage_activate", 0.65)

	# 2. Trigger particles
	if spark_particles:
		spark_particles.emitting = true
	if electric_particles:
		electric_particles.emitting = true

	# 3. Animate flash light & shockwave
	if flash_light:
		flash_light.light_energy = 9.0
		flash_light.omni_range = 8.5
	if shockwave_ring:
		shockwave_ring.scale = Vector3(0.2, 0.2, 0.2)

	if is_inside_tree():
		var tw = create_tween().set_parallel(true)
		if flash_light:
			tw.tween_property(flash_light, "light_energy", 0.0, 0.45).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		if shockwave_ring:
			tw.tween_property(shockwave_ring, "scale", Vector3(5.5, 1.0, 5.5), 0.4).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
			tw.tween_property(shockwave_ring, "transparency", 1.0, 0.4).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)

	# 4. Disperse individual fragment RigidBody3D nodes
	if fragments_root:
		for child in fragments_root.get_children():
			if child is RigidBody3D:
				var rb: RigidBody3D = child
				rb.freeze = false
				
				# Calculate vector from blast center to fragment
				var frag_pos = rb.global_position if is_inside_tree() else (global_position + rb.position)
				var dir = (frag_pos - blast_origin).normalized()
				if dir.length_squared() < 0.01:
					dir = Vector3(randf_range(-1.0, 1.0), randf_range(0.2, 1.0), randf_range(-1.0, 1.0)).normalized()
				
				# Outward explosive impulse + vertical lift
				var force = randf_range(blast_force * 0.7, blast_force * 1.3)
				var impulse = (dir + Vector3(0.0, randf_range(0.6, 1.2), 0.0)).normalized() * force
				rb.apply_central_impulse(impulse)
				
				# Dramatic tumbling torque
				var torque = Vector3(
					randf_range(-12.0, 12.0),
					randf_range(-12.0, 12.0),
					randf_range(-12.0, 12.0)
				)
				rb.apply_torque_impulse(torque)

	# 5. Dissolve fragments and clean up after 2.0 seconds
	if is_inside_tree():
		var cleanup_timer = get_tree().create_timer(2.0)
		cleanup_timer.timeout.connect(_fade_and_cleanup)

func _fade_and_cleanup() -> void:
	if not is_inside_tree():
		queue_free()
		return
	var tw = create_tween().set_parallel(true)
	if fragments_root:
		for child in fragments_root.get_children():
			if child is RigidBody3D:
				tw.tween_property(child, "scale", Vector3(0.01, 0.01, 0.01), 0.45).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	
	tw.chain().tween_callback(queue_free)
