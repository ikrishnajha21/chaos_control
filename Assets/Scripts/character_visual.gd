extends Node3D
class_name CharacterVisual

@onready var anim_player: AnimationPlayer = $AnimationPlayer
@onready var model: Node3D = $Model

var current_anim: String = ""
var is_glitching: bool = false
var original_materials: Dictionary = {}

var is_cyan: bool = false
var theme_color: Color = Color(0.12, 0.85, 1.0)
var accent_color: Color = Color(0.4, 1.0, 0.85)

var emissive_entries: Array[Dictionary] = []
var ground_ring: MeshInstance3D = null
var ground_ring_mat: StandardMaterial3D = null
var foot_particles: CPUParticles3D = null

var landing_pulse_timer: float = 0.0
var breath_time: float = 0.0

func _enter_tree() -> void:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
	if not model:
		model = get_node_or_null("Model")

func _ready() -> void:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
		
	# Identify character color identity
	var n = name.to_lower()
	is_cyan = ("cyan" in n or "phantom" in n)
	if is_cyan:
		theme_color = Color(0.12, 0.85, 1.0)
		accent_color = Color(0.4, 1.0, 0.85)
	else:
		theme_color = Color(1.0, 0.25, 0.2)
		accent_color = Color(1.0, 0.82, 0.2)
		
	_cache_materials(self)
	_setup_materials_and_glow(self)
	_setup_ground_ring()
	_setup_foot_particles()
	play_idle()

func _cache_materials(node: Node) -> void:
	if node is MeshInstance3D:
		original_materials[node] = node.material_override
	for child in node.get_children():
		_cache_materials(child)

func _setup_materials_and_glow(node: Node) -> void:
	if node is MeshInstance3D:
		var mi = node as MeshInstance3D
		var count = mi.get_surface_override_material_count()
		if count == 0 and mi.mesh:
			count = mi.mesh.get_surface_count()
			
		for i in range(max(1, count)):
			var mat = mi.get_surface_override_material(i)
			if not mat and mi.mesh and i < mi.mesh.get_surface_count():
				mat = mi.mesh.surface_get_material(i)
				
			if mat is StandardMaterial3D:
				var m = mat.duplicate() as StandardMaterial3D
				# Enable rim lighting for clean silhouette visibility against dark walls
				m.rim_enabled = true
				m.rim = 0.88
				m.rim_tint = 0.65
				
				# Check if this material is an emissive or accent material
				var has_emission = m.emission_enabled
				var is_accent = false
				var albedo = m.albedo_color
				if is_cyan and (albedo.b > 0.4 and (albedo.b > albedo.r * 1.5)):
					is_accent = true
				elif not is_cyan and (albedo.r > 0.4 and (albedo.r > albedo.g * 1.5)):
					is_accent = true
					
				if has_emission or is_accent:
					m.emission_enabled = true
					if not has_emission:
						m.emission = theme_color
						m.emission_energy_multiplier = 1.6
					else:
						# Boost baseline emission slightly for futuristic look
						m.emission_energy_multiplier = maxf(1.8, m.emission_energy_multiplier * 1.35)
						
					emissive_entries.append({
						"mat": m,
						"base_energy": m.emission_energy_multiplier,
						"base_color": m.emission
					})
					
				mi.set_surface_override_material(i, m)
				
	for child in node.get_children():
		_setup_materials_and_glow(child)

func _setup_ground_ring() -> void:
	if get_node_or_null("GroundAuraRing"):
		ground_ring = get_node("GroundAuraRing")
		return
		
	ground_ring = MeshInstance3D.new()
	ground_ring.name = "GroundAuraRing"
	
	var tm = TorusMesh.new()
	tm.inner_radius = 0.38
	tm.outer_radius = 0.46
	tm.rings = 24
	tm.ring_segments = 12
	ground_ring.mesh = tm
	
	ground_ring_mat = StandardMaterial3D.new()
	ground_ring_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	ground_ring_mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	ground_ring_mat.albedo_color = Color(theme_color.r, theme_color.g, theme_color.b, 0.4)
	ground_ring.material_override = ground_ring_mat
	
	# Sits slightly above ground plane
	ground_ring.position = Vector3(0.0, 0.035, 0.0)
	add_child(ground_ring)

func _setup_foot_particles() -> void:
	if get_node_or_null("FootTrailParticles"):
		foot_particles = get_node("FootTrailParticles")
		return
		
	foot_particles = CPUParticles3D.new()
	foot_particles.name = "FootTrailParticles"
	foot_particles.amount = 6
	foot_particles.lifetime = 0.35
	foot_particles.preprocess = 0.05
	foot_particles.emitting = false
	foot_particles.local_coords = false
	foot_particles.emission_shape = CPUParticles3D.EMISSION_SHAPE_SPHERE
	foot_particles.emission_sphere_radius = 0.18
	foot_particles.direction = Vector3(0, 1, 0)
	foot_particles.spread = 45.0
	foot_particles.gravity = Vector3(0, 0.6, 0)
	foot_particles.initial_velocity_min = 0.3
	foot_particles.initial_velocity_max = 0.7
	foot_particles.scale_amount_min = 0.06
	foot_particles.scale_amount_max = 0.11
	foot_particles.color = theme_color
	
	var qm = QuadMesh.new()
	qm.size = Vector2(0.12, 0.12)
	var pmat = StandardMaterial3D.new()
	pmat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	pmat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	pmat.albedo_color = Color(theme_color.r, theme_color.g, theme_color.b, 0.8)
	pmat.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	qm.material = pmat
	foot_particles.mesh = qm
	
	foot_particles.position = Vector3(0.0, 0.1, 0.0)
	add_child(foot_particles)

func get_anim_player() -> AnimationPlayer:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
	return anim_player

func play_idle() -> void:
	if is_glitching:
		return
	var ap = get_anim_player()
	if ap and ap.has_animation("idle"):
		if current_anim != "idle":
			current_anim = "idle"
			ap.play("idle", 0.2)

func play_run(speed_factor: float = 1.0) -> void:
	if is_glitching:
		return
	var ap = get_anim_player()
	if ap and ap.has_animation("run"):
		if current_anim != "run":
			current_anim = "run"
			ap.play("run", 0.15)
		ap.speed_scale = clampf(speed_factor, 0.5, 2.5)

func apply_hazard_glitch(enabled: bool) -> void:
	is_glitching = enabled
	var ap = get_anim_player()
	if enabled:
		if ap and ap.has_animation("glitch"):
			current_anim = "glitch"
			ap.play("glitch", 0.05)
	else:
		current_anim = ""
		play_idle()

func trigger_landing_pulse() -> void:
	landing_pulse_timer = 0.25

func update_movement(speed: float) -> void:
	update_movement_state(speed, false, false, 0.016)

func update_movement_state(speed: float, is_airborne: bool, is_surging: bool, delta: float) -> void:
	if is_glitching:
		return
		
	# Animation selection
	if speed > 0.1:
		var factor = speed / 8.0 # Normal speed is 8.0
		play_run(factor)
	else:
		play_idle()
		
	breath_time += delta
	
	# Determine dynamic energy multiplier
	var energy_mult: float = 1.0
	if is_surging:
		energy_mult = 2.4
	elif is_airborne:
		energy_mult = 1.55
	elif speed > 5.5:
		energy_mult = 1.85
	elif speed > 0.1:
		energy_mult = 1.35
	else:
		# Idle gentle breathing pulse
		energy_mult = 1.0 + sin(breath_time * 2.4) * 0.18
		
	if landing_pulse_timer > 0.0:
		landing_pulse_timer -= delta
		energy_mult += (landing_pulse_timer / 0.25) * 0.9
		
	# Modulate emissive material energies
	for entry in emissive_entries:
		var m: StandardMaterial3D = entry["mat"]
		var base_e: float = entry["base_energy"]
		m.emission_energy_multiplier = base_e * energy_mult
		
	# Modulate Ground Foot Aura
	if ground_ring and ground_ring_mat:
		var rot_speed = 1.8 + speed * 0.5
		ground_ring.rotation.y += rot_speed * delta
		
		var target_scale = 1.0
		var target_alpha = 0.4
		if is_airborne:
			target_scale = 1.25
			target_alpha = 0.2
		elif speed > 5.5:
			target_scale = 1.1 + sin(breath_time * 10.0) * 0.06
			target_alpha = 0.55
		elif landing_pulse_timer > 0.0:
			target_scale = 1.35
			target_alpha = 0.8
			
		ground_ring.scale = ground_ring.scale.lerp(Vector3(target_scale, 1.0, target_scale), 12.0 * delta)
		var c = ground_ring_mat.albedo_color
		c.a = lerpf(c.a, target_alpha, 10.0 * delta)
		ground_ring_mat.albedo_color = c
		
	# Modulate Foot Trail Particles
	if foot_particles:
		var should_emit = (speed > 5.0 and not is_airborne) or is_surging
		if foot_particles.emitting != should_emit:
			foot_particles.emitting = should_emit
