extends Node3D
class_name EnvPowerCore

# Materials matching HTML 3D specification
var mat_gun: StandardMaterial3D
var mat_dk: StandardMaterial3D
var mat_al: StandardMaterial3D
var mat_cu: StandardMaterial3D
var mat_st: StandardMaterial3D
var mat_am: StandardMaterial3D
var mat_rd: StandardMaterial3D
var mat_cy: StandardMaterial3D
var mat_yl: StandardMaterial3D
var mat_lane: StandardMaterial3D
var mat_floor: StandardMaterial3D
var mat_barrier: StandardMaterial3D
var mat_hazard: StandardMaterial3D
var mat_core_inner: StandardMaterial3D
var mat_core_outer: StandardMaterial3D

# Laser Materials & State
var mat_laser_active: StandardMaterial3D
var mat_laser_curtain_active: StandardMaterial3D
var mat_laser_warning: StandardMaterial3D
var mat_laser_curtain_warning: StandardMaterial3D
var mat_laser_disarmed: StandardMaterial3D

enum LaserState { ACTIVE, WARNING, DISARMED }
var laser_barrier_data: Array[Dictionary] = []
var laser_cycle_timer: float = 4.5
var current_laser_state: LaserState = LaserState.ACTIVE
var player_laser_cooldowns: Dictionary = {}

var energy_core_group: Node3D
var core_light: OmniLight3D
var core_floor_light: OmniLight3D
var orbiting_fragments: Array[MeshInstance3D] = []
var impellers: Array[Node3D] = []
var spawn_beacons: Array[MeshInstance3D] = []

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func _process(delta: float) -> void:
	var t = Time.get_ticks_msec() / 1000.0

	# 1. Floating Energy Core Animation (Group E in HTML reference)
	if energy_core_group:
		energy_core_group.rotate_y(delta * 0.6)
		energy_core_group.position.y = 4.3 + sin(t * 1.4) * 0.12
		if core_light:
			core_light.light_energy = 3.4 + sin(t * 4.3) * 0.25

		for k in range(orbiting_fragments.size()):
			var frag = orbiting_fragments[k]
			if is_instance_valid(frag):
				var angle = t * 1.1 + (k / float(orbiting_fragments.size())) * PI * 2.0
				frag.position = Vector3(2.9 * cos(angle), sin(angle * 2.0 + k) * 0.5, 2.9 * sin(angle))
				frag.rotate_y(delta * 2.5)

	# 2. Generator Impeller Fan Rotations (10 blades at y = 7.15)
	for i in range(impellers.size()):
		var imp = impellers[i]
		if is_instance_valid(imp):
			var dir = 1.0 if (i % 2 == 1) else -1.0
			imp.rotate_y(delta * 2.4 * dir)

	# 3. Spawn Pad Floating Octahedron Beacons
	for b in spawn_beacons:
		if is_instance_valid(b):
			b.rotate_y(delta * 1.8)

func _init_materials() -> void:
	# M.gun = mk(0x2a2e34, .55, .85) -> gunmetal framework
	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.18, 0.20, 0.23)
	mat_gun.roughness = 0.55
	mat_gun.metallic = 0.85

	# M.dk = mk(0x121316, .8, .4) -> dark structural composite
	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.09, 0.10, 0.11)
	mat_dk.roughness = 0.8
	mat_dk.metallic = 0.4

	# M.al = mk(0x8a8f96, .35, .9) -> polished aluminum / heat sinks
	mat_al = StandardMaterial3D.new()
	mat_al.albedo_color = Color(0.56, 0.58, 0.61)
	mat_al.roughness = 0.35
	mat_al.metallic = 0.9

	# M.cu = mk(0x9a5a35, .5, .85) -> copper / bronze coils & conduits
	mat_cu = StandardMaterial3D.new()
	mat_cu.albedo_color = Color(0.62, 0.37, 0.23)
	mat_cu.roughness = 0.5
	mat_cu.metallic = 0.85

	# M.st = mk(0x3b4048, .5, .85) -> dark structural steel
	mat_st = StandardMaterial3D.new()
	mat_st.albedo_color = Color(0.25, 0.27, 0.31)
	mat_st.roughness = 0.5
	mat_st.metallic = 0.85

	# M.am = em(0xff8a1f, 1.8) -> amber power core luminescence
	mat_am = StandardMaterial3D.new()
	mat_am.albedo_color = Color(1.0, 0.54, 0.12)
	mat_am.emission_enabled = true
	mat_am.emission = Color(1.0, 0.54, 0.12)
	mat_am.emission_energy_multiplier = 2.0

	# M.rd = em(0xff2a1a, 2.2) -> hazard crimson
	mat_rd = StandardMaterial3D.new()
	mat_rd.albedo_color = Color(1.0, 0.165, 0.10)
	mat_rd.emission_enabled = true
	mat_rd.emission = Color(1.0, 0.165, 0.10)
	mat_rd.emission_energy_multiplier = 2.4

	# M.cy = em(0x20c8ff, 2) -> electric cyan
	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.125, 0.78, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.125, 0.78, 1.0)
	mat_cy.emission_energy_multiplier = 2.2

	# M.yl = em(0xffe070, 2) -> yellow energy plasma
	mat_yl = StandardMaterial3D.new()
	mat_yl.albedo_color = Color(1.0, 0.88, 0.44)
	mat_yl.emission_enabled = true
	mat_yl.emission = Color(1.0, 0.88, 0.44)
	mat_yl.emission_energy_multiplier = 2.5

	# M.lane = mk(0x464a51, .6, .6) -> cardinal lane deck
	mat_lane = StandardMaterial3D.new()
	mat_lane.albedo_color = Color(0.30, 0.33, 0.38)
	mat_lane.roughness = 0.55
	mat_lane.metallic = 0.6

	# Core Inner White-Hot Plasma: em(0xfff4b0, 5)
	mat_core_inner = StandardMaterial3D.new()
	mat_core_inner.albedo_color = Color(1.0, 0.96, 0.70)
	mat_core_inner.emission_enabled = true
	mat_core_inner.emission = Color(1.0, 0.96, 0.70)
	mat_core_inner.emission_energy_multiplier = 5.0

	# Core Outer Fiery Plasma Shield: em(0xff6a10, 1.6, {transparent:true, opacity:.55})
	mat_core_outer = StandardMaterial3D.new()
	mat_core_outer.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_core_outer.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_core_outer.albedo_color = Color(1.0, 0.42, 0.06, 0.55)
	mat_core_outer.emission_enabled = true
	mat_core_outer.emission = Color(1.0, 0.42, 0.06)
	mat_core_outer.emission_energy_multiplier = 1.8

	# Forcefield Curtain Material
	mat_barrier = StandardMaterial3D.new()
	mat_barrier.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_barrier.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_barrier.albedo_color = Color(1.0, 0.54, 0.12, 0.28)
	mat_barrier.emission_enabled = true
	mat_barrier.emission = Color(1.0, 0.54, 0.12)
	mat_barrier.emission_energy_multiplier = 1.6

	# Modular Metallic Plate Floor Texture with Bolt Rivets (matching HTML 512x512 canvas)
	_generate_procedural_floor_material()

	# Hazard Chevron Striping Texture (matching HTML 128x128 canvas: #d9a21a and #111)
	_generate_procedural_hazard_material()

	# Laser Materials
	mat_laser_active = StandardMaterial3D.new()
	mat_laser_active.albedo_color = Color(1.0, 0.12, 0.12)
	mat_laser_active.emission_enabled = true
	mat_laser_active.emission = Color(1.0, 0.12, 0.12)
	mat_laser_active.emission_energy_multiplier = 3.8

	mat_laser_curtain_active = StandardMaterial3D.new()
	mat_laser_curtain_active.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_curtain_active.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_laser_curtain_active.albedo_color = Color(1.0, 0.165, 0.165, 0.20)
	mat_laser_curtain_active.emission_enabled = true
	mat_laser_curtain_active.emission = Color(1.0, 0.165, 0.165)
	mat_laser_curtain_active.emission_energy_multiplier = 1.4

	mat_laser_warning = StandardMaterial3D.new()
	mat_laser_warning.albedo_color = Color(1.0, 0.72, 0.1)
	mat_laser_warning.emission_enabled = true
	mat_laser_warning.emission = Color(1.0, 0.65, 0.1)
	mat_laser_warning.emission_energy_multiplier = 3.0

	mat_laser_curtain_warning = StandardMaterial3D.new()
	mat_laser_curtain_warning.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_curtain_warning.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_laser_curtain_warning.albedo_color = Color(1.0, 0.7, 0.1, 0.18)
	mat_laser_curtain_warning.emission_enabled = true
	mat_laser_curtain_warning.emission = Color(1.0, 0.65, 0.1)
	mat_laser_curtain_warning.emission_energy_multiplier = 1.2

	mat_laser_disarmed = StandardMaterial3D.new()
	mat_laser_disarmed.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_disarmed.albedo_color = Color(0.1, 0.95, 0.55, 0.22)
	mat_laser_disarmed.emission_enabled = true
	mat_laser_disarmed.emission = Color(0.1, 0.95, 0.55)
	mat_laser_disarmed.emission_energy_multiplier = 0.7

func _generate_procedural_floor_material() -> void:
	mat_floor = StandardMaterial3D.new()
	mat_floor.roughness = 0.55
	mat_floor.metallic = 0.5

	var img = Image.create(512, 512, false, Image.FORMAT_RGBA8)
	var col_seam = Color(0.06, 0.07, 0.08) # #0a0b0d
	img.fill(col_seam)

	# Metallic Plating Rows & Columns (matching HTML canvas layout)
	var widths = [64, 128, 192]
	var rng = RandomNumberGenerator.new()
	rng.seed = 42

	for y in range(0, 512, 128):
		var x = 0
		while x < 512:
			var w = widths[rng.randi_range(0, 2)]
			if x + w > 512:
				w = 512 - x
			var val = rng.randi_range(40, 54)
			var plate_col = Color8(val, val + 4, val + 10)

			# Draw metallic plate with 3px seam margin
			for px in range(x + 3, x + w - 3):
				for py in range(y + 3, y + 125):
					img.set_pixel(px, py, plate_col)

			# Corner bolt rivets at [x+8, y+8], [x+w-10, y+8], [x+8, y+118], [x+w-10, y+118]
			var rivets = [
				Vector2i(x + 8, y + 8),
				Vector2i(x + w - 10, y + 8),
				Vector2i(x + 8, y + 118),
				Vector2i(x + w - 10, y + 118)
			]
			for rv in rivets:
				if rv.x >= 0 and rv.x < 510 and rv.y >= 0 and rv.y < 510:
					for dx in range(3):
						for dy in range(3):
							img.set_pixel(rv.x + dx, rv.y + dy, col_seam)

			x += w

	var tex = ImageTexture.create_from_image(img)
	mat_floor.albedo_texture = tex
	mat_floor.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC
	# Repeated 5x5 across 100m x 100m arena floor
	mat_floor.uv1_scale = Vector3(5.0, 5.0, 1.0)

func _generate_procedural_hazard_material() -> void:
	mat_hazard = StandardMaterial3D.new()
	mat_hazard.roughness = 0.65
	mat_hazard.metallic = 0.15
	mat_hazard.emission_enabled = true
	mat_hazard.emission = Color(0.95, 0.70, 0.12)
	mat_hazard.emission_energy_multiplier = 0.9

	var h_img = Image.create(128, 128, false, Image.FORMAT_RGBA8)
	var col_amber = Color(0.85, 0.635, 0.10) # HTML #d9a21a
	var col_black = Color(0.07, 0.07, 0.07) # HTML #111111

	for py in range(128):
		for px in range(128):
			if ((px + py) % 24) < 12:
				h_img.set_pixel(px, py, col_amber)
			else:
				h_img.set_pixel(px, py, col_black)

	var h_tex = ImageTexture.create_from_image(h_img)
	mat_hazard.albedo_texture = h_tex
	mat_hazard.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC

func add_box(w: float, h: float, d: float, mat: Material, pos: Vector3, ry: float = 0.0, collide: bool = true) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var b_mesh = BoxMesh.new()
	b_mesh.size = Vector3(w, h, d)
	mi.mesh = b_mesh
	mi.material_override = mat
	mi.position = pos
	if ry != 0.0:
		mi.rotation.y = ry
	add_child(mi)

	if collide:
		var sb = StaticBody3D.new()
		var cs = CollisionShape3D.new()
		var sh = BoxShape3D.new()
		sh.size = Vector3(w, h, d)
		cs.shape = sh
		sb.add_child(cs)
		sb.position = pos
		if ry != 0.0:
			sb.rotation.y = ry
		add_child(sb)

	return mi

func add_cyl(r: float, h: float, mat: Material, pos: Vector3, n: int = 36, collide: bool = true) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var c_mesh = CylinderMesh.new()
	c_mesh.top_radius = r
	c_mesh.bottom_radius = r
	c_mesh.height = h
	c_mesh.radial_segments = n
	mi.mesh = c_mesh
	mi.material_override = mat
	mi.position = pos
	add_child(mi)

	if collide:
		var sb = StaticBody3D.new()
		var cs = CollisionShape3D.new()
		var sh = CylinderShape3D.new()
		sh.radius = r
		sh.height = h
		cs.shape = sh
		sb.add_child(cs)
		sb.position = pos
		add_child(sb)

	return mi

func add_torus(r_center: float, r_tube: float, mat: Material, pos: Vector3) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var t_mesh = TorusMesh.new()
	t_mesh.inner_radius = r_center - r_tube
	t_mesh.outer_radius = r_center + r_tube
	t_mesh.rings = 36
	t_mesh.ring_segments = 12
	mi.mesh = t_mesh
	mi.material_override = mat
	mi.position = pos
	add_child(mi)
	return mi

func _build_environment() -> void:
	# 1. Floor (100m x 100m with Modular Metallic Plate Texture)
	add_box(100.0, 1.0, 100.0, mat_floor, Vector3(0.0, -0.5, 0.0), 0.0, true)

	# 2. Central Stepped Concentric Annular Platforms
	# Tier 5 (outermost deck: r=15.4..17.0, h=0.5)
	add_cyl(17.0, 0.5, mat_st, Vector3(0.0, 0.25, 0.0), 48, false)
	# Tier 4 (gunmetal deck: r=12.9..15.0, h=0.9)
	add_cyl(15.0, 0.9, mat_gun, Vector3(0.0, 0.45, 0.0), 48, false)
	# Tier 3 (dark composite: r=10.5..12.4, h=0.5)
	add_cyl(12.4, 0.5, mat_dk, Vector3(0.0, 0.25, 0.0), 44, false)
	# Tier 2 (steel ring: r=8.4..10.2, h=1.1)
	add_cyl(10.2, 1.1, mat_st, Vector3(0.0, 0.55, 0.0), 40, false)
	# Tier 1 (inner gunmetal: r=6.0..8.0, h=0.7)
	add_cyl(8.0, 0.7, mat_gun, Vector3(0.0, 0.35, 0.0), 36, false)

	# Walkable concentric stepped collision tiers
	var sb_tiers = StaticBody3D.new()
	for tier in [[17.0, 0.5, 0.25], [15.0, 0.9, 0.45], [10.2, 1.1, 0.55]]:
		var cs = CollisionShape3D.new()
		var sh = CylinderShape3D.new()
		sh.radius = tier[0]
		sh.height = tier[1]
		cs.shape = sh
		cs.position.y = tier[2]
		sb_tiers.add_child(cs)
	add_child(sb_tiers)

	# Concentric Amber Luminescent Rings
	for r in [12.6, 10.3, 8.2]:
		add_torus(r, 0.08, mat_am, Vector3(0.0, 0.04, 0.0))
	add_torus(15.25, 0.08, mat_am, Vector3(0.0, 0.50, 0.0))

	# Radial Heat Sinks (24 aluminum blocks at r=9.3, y=1.25)
	for k in range(24):
		var a = k / 24.0 * PI * 2.0
		var pos = Vector3(9.3 * cos(a), 1.25, 9.3 * sin(a))
		add_box(1.1, 0.35, 0.5, mat_al, pos, -a, false)

	# Radial Copper Coils (18 inductive blocks at r=7.0, y=0.82)
	for k in range(18):
		var a = k / 18.0 * PI * 2.0
		var pos = Vector3(7.0 * cos(a), 0.82, 7.0 * sin(a))
		add_box(0.9, 0.25, 0.5, mat_cu, pos, -a, false)

	# Radial Conduits & Heavy Clamps (10 at r=10.2, y=0.65)
	for k in range(10):
		var a = k / 10.0 * PI * 2.0 + PI / 10.0
		var pos = Vector3(10.2 * cos(a), 0.65, 10.2 * sin(a))
		add_box(3.2, 0.7, 1.0, mat_gun, pos, -a, true)
		var cl_pos = Vector3(12.5 * cos(a), 0.75, 12.5 * sin(a))
		add_box(0.7, 0.9, 1.5, mat_al, cl_pos, -a, true)

	# Central Reactor Core Pedestal Column
	add_cyl(4.4, 2.6, mat_dk, Vector3(0.0, 1.3, 0.0), 36, true)
	add_cyl(3.2, 0.5, mat_st, Vector3(0.0, 2.75, 0.0), 32, false)
	add_torus(3.1, 0.1, mat_am, Vector3(0.0, 2.9, 0.0))
	add_cyl(3.1, 0.1, mat_dk, Vector3(0.0, 2.6, 0.0), 28, false)

	# 4 Reactor Containment Pylons
	for k in range(4):
		var a = k / 4.0 * PI * 2.0 + PI / 4.0
		var pos = Vector3(3.6 * cos(a), 3.2, 3.6 * sin(a))
		add_cyl(0.35, 4.4, mat_gun, pos, 16, true)
		add_box(0.5, 0.5, 0.5, mat_al, Vector3(3.6 * cos(a), 5.4, 3.6 * sin(a)), 0.0, false)
	add_torus(3.6, 0.18, mat_gun, Vector3(0.0, 5.4, 0.0))

	# 3. Floating Animated Energy Core (Group E in HTML reference)
	energy_core_group = Node3D.new()
	energy_core_group.position = Vector3(0.0, 4.3, 0.0)
	add_child(energy_core_group)

	# Inner white-hot icosahedron core (emissive intensity 5.0)
	var core_inner = MeshInstance3D.new()
	var inner_mesh = SphereMesh.new()
	inner_mesh.radius = 1.1
	inner_mesh.height = 2.2
	inner_mesh.radial_segments = 24
	inner_mesh.rings = 12
	core_inner.mesh = inner_mesh
	core_inner.material_override = mat_core_inner
	energy_core_group.add_child(core_inner)

	# Outer translucent fiery plasma shield
	var core_outer = MeshInstance3D.new()
	var outer_mesh = SphereMesh.new()
	outer_mesh.radius = 2.1
	outer_mesh.height = 4.2
	outer_mesh.radial_segments = 24
	outer_mesh.rings = 12
	core_outer.mesh = outer_mesh
	core_outer.material_override = mat_core_outer
	energy_core_group.add_child(core_outer)

	# 6 Tilted magnetic containment flux fins
	for k in range(6):
		var a = k / 6.0 * PI * 2.0
		var fin = MeshInstance3D.new()
		var fb = BoxMesh.new()
		fb.size = Vector3(0.25, 3.2, 1.1)
		fin.mesh = fb
		fin.material_override = mat_gun
		fin.position = Vector3(2.9 * cos(a), 0.0, 2.9 * sin(a))
		fin.rotation.y = -a
		fin.rotation.z = 0.12
		energy_core_group.add_child(fin)

	# 8 Orbiting plasma octahedrons
	orbiting_fragments.clear()
	for k in range(8):
		var frag = MeshInstance3D.new()
		var oct_mesh = PrismMesh.new()
		oct_mesh.size = Vector3(0.6, 0.6, 0.6)
		frag.mesh = oct_mesh
		frag.material_override = mat_yl
		energy_core_group.add_child(frag)
		orbiting_fragments.append(frag)

	# Core OmniLight3D nodes
	core_light = OmniLight3D.new()
	core_light.light_color = Color(1.0, 0.54, 0.19)
	core_light.light_energy = 3.4
	core_light.omni_range = 55.0
	core_light.position = Vector3(0.0, 4.3, 0.0)
	add_child(core_light)

	core_floor_light = OmniLight3D.new()
	core_floor_light.light_color = Color(1.0, 0.42, 0.13)
	core_floor_light.light_energy = 1.6
	core_floor_light.omni_range = 25.0
	core_floor_light.position = Vector3(0.0, 1.2, 0.0)
	add_child(core_floor_light)

	# 4. 4 Massive Peripheral Turbines / Generators
	impellers.clear()
	var gen_coords = [
		Vector2(-28.0, -34.0), # NW Generator
		Vector2(28.0, -34.0),  # NE Generator
		Vector2(-28.0, 34.0),  # SW Generator
		Vector2(28.0, 34.0)   # SE Generator
	]
	for i in range(gen_coords.size()):
		_build_generator(gen_coords[i].x, gen_coords[i].y, i)

	# 5. Curved Blast Barriers in 4 Quadrants
	for q in range(4):
		var r_rot = q * PI * 0.5
		var a0 = r_rot + 15.0 * PI / 180.0
		var a1 = r_rot + 75.0 * PI / 180.0
		_build_curved_barrier_quadrant(a0, a1)

	# 6. 4 Cardinal Access Lanes & Perimeter Fortress Walls
	_build_lane(0, false) # North Lane (Entrance/Exit corridor)
	_build_lane(1, true)  # East Lane (with Laser Barrier)
	_build_lane(2, false) # South Lane
	_build_lane(3, true)  # West Lane (with Laser Barrier)

	# 7. 4 Heavy Corner Towers at (±47, ±47)
	for p in [[-1.0, -1.0], [1.0, -1.0], [-1.0, 1.0], [1.0, 1.0]]:
		add_box(6.0, 9.0, 6.0, mat_st, Vector3(p[0] * 47.0, 4.5, p[1] * 47.0), 0.0, true)
		add_box(1.0, 1.0, 1.0, mat_rd, Vector3(p[0] * 43.9, 7.8, p[1] * 43.9), 0.0, false)

	# 8. Moving Service Platform at (14, 0, -38)
	var pf_pos = Vector3(14.0, 0.0, -38.0)
	add_box(7.4, 0.5, 7.4, mat_st, Vector3(pf_pos.x, 0.25, pf_pos.z), 0.0, true)
	add_box(6.4, 0.5, 6.4, mat_dk, Vector3(pf_pos.x, 0.15, pf_pos.z), 0.0, true)
	add_box(6.0, 0.5, 6.0, mat_al, Vector3(pf_pos.x, 0.9, pf_pos.z), 0.0, true)
	for x_off in [-3.4, 3.4]:
		add_box(0.4, 1.2, 7.4, mat_gun, Vector3(pf_pos.x + x_off, 0.6, pf_pos.z), 0.0, true)
		add_cyl(0.3, 1.6, mat_cu, Vector3(pf_pos.x + x_off, 0.5, pf_pos.z + 2.5), 12, true)
		add_cyl(0.3, 1.6, mat_cu, Vector3(pf_pos.x + x_off, 0.5, pf_pos.z - 2.5), 12, true)
	add_box(6.0, 0.1, 0.3, mat_am, Vector3(pf_pos.x, 1.2, pf_pos.z + 3.1), 0.0, false)

	# 9. Spawn Pads (matching HTML: West Spawn at -43, 12, East Spawn at 43, 12)
	spawn_beacons.clear()
	# West Spawn (Runner): [-43, 12]
	add_cyl(3.0, 0.3, mat_dk, Vector3(-43.0, 0.15, 12.0), 32, false)
	add_torus(2.6, 0.12, mat_cy, Vector3(-43.0, 0.34, 12.0))
	add_torus(1.6, 0.07, mat_cy, Vector3(-43.0, 0.34, 12.0))
	var w_beacon = MeshInstance3D.new()
	var w_bmesh = PrismMesh.new()
	w_bmesh.size = Vector3(1.2, 1.2, 1.2)
	w_beacon.mesh = w_bmesh
	w_beacon.material_override = mat_cy
	w_beacon.position = Vector3(-43.0, 1.8, 12.0)
	add_child(w_beacon)
	spawn_beacons.append(w_beacon)

	var sp_light1 = OmniLight3D.new()
	sp_light1.light_color = Color(0.125, 0.78, 1.0)
	sp_light1.light_energy = 2.2
	sp_light1.omni_range = 16.0
	sp_light1.position = Vector3(-43.0, 2.5, 12.0)
	add_child(sp_light1)

	# East Spawn (Saboteur): [43, 12]
	add_cyl(3.0, 0.3, mat_dk, Vector3(43.0, 0.15, 12.0), 32, false)
	add_torus(2.6, 0.12, mat_rd, Vector3(43.0, 0.34, 12.0))
	add_torus(1.6, 0.07, mat_rd, Vector3(43.0, 0.34, 12.0))
	var e_beacon = MeshInstance3D.new()
	var e_bmesh = PrismMesh.new()
	e_bmesh.size = Vector3(1.2, 1.2, 1.2)
	e_beacon.mesh = e_bmesh
	e_beacon.material_override = mat_rd
	e_beacon.position = Vector3(43.0, 1.8, 12.0)
	add_child(e_beacon)
	spawn_beacons.append(e_beacon)

	var sp_light2 = OmniLight3D.new()
	sp_light2.light_color = Color(1.0, 0.165, 0.10)
	sp_light2.light_energy = 2.2
	sp_light2.omni_range = 16.0
	sp_light2.position = Vector3(43.0, 2.5, 12.0)
	add_child(sp_light2)

	# 10. 6 Functional Lethal Laser Barriers
	var lasers = [
		[-6.0, -38.0, 6.0, -38.0],   # North Cardinal Walkway
		[-6.0, 38.0, 6.0, 38.0],     # South Cardinal Walkway
		[-38.0, -6.0, -38.0, 6.0],   # West Walkway Security Choke
		[38.0, -6.0, 38.0, 6.0],     # East Walkway Security Choke
		[-22.0, -18.0, -14.0, -26.0], # NW Generator Flank Corridor
		[22.0, 18.0, 14.0, 26.0]     # SE Generator Flank Corridor
	]
	laser_barrier_data.clear()
	for ls in lasers:
		var lax = ls[0]
		var laz = ls[1]
		var lbx = ls[2]
		var lbz = ls[3]
		var ll = sqrt((lbx - lax) * (lbx - lax) + (lbz - laz) * (lbz - laz))
		var la = -atan2(lbz - laz, lbx - lax)
		var l_center = Vector3((lax + lbx) * 0.5, 0.0, (laz + lbz) * 0.5)

		# 3 Horizontal Laser Beam Rods at y = 0.5, 1.2, 1.9
		var barrier_beams: Array[MeshInstance3D] = []
		for ly in [0.5, 1.2, 1.9]:
			var beam = add_box(ll, 0.07, 0.07, mat_laser_active, Vector3(l_center.x, ly, l_center.z), la, false)
			barrier_beams.append(beam)

		# Translucent Glowing Laser Curtain Plane at y = 1.2
		var curtain = add_box(ll, 1.8, 0.04, mat_laser_curtain_active, Vector3(l_center.x, 1.2, l_center.z), la, false)

		# End Posts with Beacon Tops
		for pt in [Vector3(lax, 0.0, laz), Vector3(lbx, 0.0, lbz)]:
			add_box(0.5, 2.4, 0.5, mat_gun, Vector3(pt.x, 1.2, pt.z), 0.0, true)
			add_box(0.25, 0.25, 0.25, mat_rd, Vector3(pt.x, 2.5, pt.z), 0.0, false)

		var l_light = OmniLight3D.new()
		l_light.light_color = Color(1.0, 0.165, 0.165)
		l_light.light_energy = 1.8
		l_light.omni_range = 12.0
		l_light.position = Vector3(l_center.x, 1.5, l_center.z)
		add_child(l_light)

		# Authoritative Lethal Area3D (Collision Mask 2 = PlayerController)
		var area = Area3D.new()
		area.collision_layer = 8
		area.collision_mask = 2
		var col = CollisionShape3D.new()
		var box_shape = BoxShape3D.new()
		box_shape.size = Vector3(ll, 2.5, 1.2)
		col.shape = box_shape
		area.add_child(col)
		area.position = Vector3(l_center.x, 1.25, l_center.z)
		area.rotation.y = la
		add_child(area)

		var data = {
			"area": area,
			"col": col,
			"beams": barrier_beams,
			"curtain": curtain,
			"light": l_light
		}
		laser_barrier_data.append(data)
		area.body_entered.connect(func(body): _on_laser_body_entered(body, data))

	# 11. Balanced Corridor Visibility Lights (Cures excessive darkness)
	var corridor_light_coords = [
		Vector3(0.0, 4.0, -35.0), # North Cardinal Lane
		Vector3(0.0, 4.0, 35.0),  # South Cardinal Lane
		Vector3(-35.0, 4.0, 0.0), # West Cardinal Lane
		Vector3(35.0, 4.0, 0.0),  # East Cardinal Lane
		Vector3(-20.0, 3.8, -14.0),
		Vector3(20.0, 3.8, -14.0),
		Vector3(-20.0, 3.8, 14.0),
		Vector3(20.0, 3.8, 14.0)
	]
	for clpos in corridor_light_coords:
		var corr_light = OmniLight3D.new()
		corr_light.light_color = Color(0.88, 0.94, 1.0)
		corr_light.light_energy = 1.15
		corr_light.omni_range = 22.0
		corr_light.position = clpos
		corr_light.shadow_enabled = false
		add_child(corr_light)

func _build_generator(gx: float, gz: float, idx: int) -> void:
	# Pedestal & Main Turbine Body
	add_cyl(7.4, 0.8, mat_dk, Vector3(gx, 0.4, gz), 36, true)
	add_cyl(6.4, 5.6, mat_gun, Vector3(gx, 3.6, gz), 36, true)

	# 4 Aluminum Cooling Toruses
	for h in [1.5, 2.7, 3.9, 5.1]:
		add_torus(6.5, 0.18, mat_al, Vector3(gx, h + 0.4, gz))

	# 8 Radial Heat Radiator Fins (alternating copper & steel)
	for k in range(8):
		var a = k / 8.0 * PI * 2.0 + PI / 8.0
		var m = mat_cu if ((k % 2) ^ (idx % 2) != 0) else mat_st
		var f_pos = Vector3(gx + 6.6 * cos(a), 3.0, gz + 6.6 * sin(a))
		add_box(2.3, 3.0, 0.6, m, f_pos, -a, true)

	# Upper Cowl & Copper Cap
	add_cyl(5.6, 0.5, mat_al, Vector3(gx, 6.65, gz), 28, true)
	add_torus(4.8, 0.25, mat_cu, Vector3(gx, 6.95, gz))
	add_cyl(3.6, 0.3, mat_dk, Vector3(gx, 6.95, gz), 24, false)

	# Rotating 10-Blade Impeller Fan at y = 7.15
	var imp = Node3D.new()
	imp.position = Vector3(gx, 7.15, gz)
	add_child(imp)
	impellers.append(imp)

	for k in range(10):
		var b = MeshInstance3D.new()
		var bm = BoxMesh.new()
		bm.size = Vector3(2.6, 0.1, 0.55)
		b.mesh = bm
		b.material_override = mat_al
		b.position = Vector3(1.6 * cos(k / 10.0 * PI * 2.0), 0.0, 1.6 * sin(k / 10.0 * PI * 2.0))
		b.rotation.y = k / 10.0 * PI * 2.0
		b.rotation.z = 0.2
		imp.add_child(b)

	var hub = MeshInstance3D.new()
	var hm = CylinderMesh.new()
	hm.top_radius = 0.7
	hm.bottom_radius = 0.7
	hm.height = 0.4
	hub.mesh = hm
	hub.material_override = mat_cu
	imp.add_child(hub)

	# 6 Vertical Copper Busbars with Aluminum Collar Rings
	for k in range(6):
		var a = k / 6.0 * PI * 2.0 + 0.3 + idx * 0.2
		var pos = Vector3(gx + 7.0 * cos(a), 3.0, gz + 7.0 * sin(a))
		add_cyl(0.22, 5.0, mat_cu, pos, 12, false)
		add_torus(0.3, 0.1, mat_al, Vector3(pos.x, 5.2, pos.z))

	# 4 Warning Status Indicators at r=6.7, y=5.9
	for k in range(4):
		var a = k / 4.0 * PI * 2.0 + PI / 4.0
		var m = mat_rd if ((k + idx) % 3 == 0) else mat_am
		var pos = Vector3(gx + 6.7 * cos(a), 5.9, gz + 6.7 * sin(a))
		var sp = MeshInstance3D.new()
		var sm = SphereMesh.new()
		sm.radius = 0.22
		sm.height = 0.44
		sp.mesh = sm
		sp.material_override = m
		sp.position = pos
		add_child(sp)

	# Access Terminal Station
	var a_term = PI * 0.5 * idx + 0.4
	var t_pos = Vector3(gx + 7.6 * cos(a_term), 2.0, gz + 7.6 * sin(a_term))
	add_box(2.6, 0.25, 1.6, mat_st, t_pos, -a_term, true)

	# Heavy High-Voltage Conduit linking Generator to Core
	var u = Vector3(-gx, 0.0, -gz).normalized()
	var p0 = Vector3(gx, 0.4, gz) + u * 7.6
	var p1 = Vector3(0.0, 0.4, 0.0) - u * 17.0
	var dist = p0.distance_to(p1)
	var mid = (p0 + p1) * 0.5
	var angle = -atan2(p1.z - p0.z, p1.x - p0.x)
	add_box(dist, 0.8, 0.8, mat_dk, mid, angle, true)

	for k in range(1, 5):
		var q = p0.lerp(p1, k / 5.0)
		add_box(0.5, 1.0, 1.0, mat_cu, q, angle, false)

	# Localized Generator Alcove Overhead Light
	var gen_light = OmniLight3D.new()
	gen_light.light_color = Color(1.0, 0.42, 0.16)
	gen_light.light_energy = 1.25
	gen_light.omni_range = 28.0
	gen_light.position = Vector3(gx, 8.5, gz)
	gen_light.shadow_enabled = false
	add_child(gen_light)

func _build_curved_barrier_quadrant(a0: float, a1: float) -> void:
	var num_segs = 8
	for s in range(num_segs):
		var t0 = a0 + (a1 - a0) * (s / float(num_segs))
		var t1 = a0 + (a1 - a0) * ((s + 1) / float(num_segs))
		var mid_a = (t0 + t1) * 0.5
		var seg_len = (t1 - t0) * 22.5

		# Outer Blast Wall: r=21..24, h=2.8
		var pos_wall = Vector3(22.5 * cos(mid_a), 1.4, 22.5 * sin(mid_a))
		add_box(seg_len, 2.8, 3.0, mat_gun, pos_wall, -mid_a, true)

		# Stepped Outer Reinforcement: r=24..24.25, h=0.8
		var pos_reinf = Vector3(24.1 * cos(mid_a), 1.5, 24.1 * sin(mid_a))
		add_box(seg_len, 0.8, 0.3, mat_st, pos_reinf, -mid_a, false)

		# Amber Energy Trim: r=20.9..21.05, h=0.3
		var pos_trim = Vector3(20.95 * cos(mid_a), 1.55, 20.95 * sin(mid_a))
		add_box(seg_len, 0.3, 0.15, mat_am, pos_trim, -mid_a, false)

		# Inner Elevated Platform Deck: r=17.8..19.3, h=1.2
		var pos_plat = Vector3(18.55 * cos(mid_a), 0.6, 18.55 * sin(mid_a))
		add_box(seg_len, 1.2, 1.5, mat_st, pos_plat, -mid_a, true)
		add_box(seg_len, 0.1, 1.5, mat_al, Vector3(pos_plat.x, 1.25, pos_plat.z), -mid_a, false)

	# End Bastion Pillars at a0 and a1
	for a in [a0, a1]:
		var p_pos = Vector3(22.5 * cos(a), 1.7, 22.5 * sin(a))
		add_box(3.0, 3.4, 3.0, mat_st, p_pos, -a, true)
		var c_pos = Vector3(19.2 * cos(a), 0.8, 19.2 * sin(a))
		add_cyl(0.9, 1.6, mat_al, c_pos, 16, true)

func _build_lane(k: int, has_bar: bool) -> void:
	var rot_y = k * PI * 0.5
	var forward = Vector3(0, 0, -1).rotated(Vector3.UP, rot_y)
	var right = Vector3(1, 0, 0).rotated(Vector3.UP, rot_y)

	var lane_center = forward * 35.0
	lane_center.y = 0.06

	# Walkway Deck (10m wide x 28m long)
	add_box(10.0, 0.12, 28.0, mat_lane, lane_center, rot_y, true)

	# Guardrails & Amber Light Strips
	for x_side in [-5.0, 5.0]:
		var pos_am = lane_center + right * x_side + Vector3(0, 0.09, 0)
		add_box(0.25, 0.1, 26.0, mat_am, pos_am, rot_y, false)
		var pos_st = lane_center + right * (x_side * 1.06) + Vector3(0, 0.04, 0)
		add_box(0.6, 0.2, 26.0, mat_st, pos_st, rot_y, true)

	# 5 Circular Aluminum Deck Plates along Centerline
	for i in range(5):
		var dp_pos = forward * (26.0 + i * 4.5) + Vector3(0, 0.17, 0)
		add_cyl(0.9, 0.1, mat_al, dp_pos, 24, false)

	# Hazard Chevron Striping at Entrance (10m x 2m)
	add_box(10.0, 0.04, 2.0, mat_hazard, forward * 44.0 + Vector3(0, 0.14, 0), rot_y, false)

	# Forcefield Laser Barrier on East & West Lanes
	if has_bar:
		for x_sign in [-5.4, 5.4]:
			var bp = forward * 38.0 + right * x_sign
			add_box(1.4, 1.4, 1.4, mat_gun, Vector3(bp.x, 0.7, bp.z), rot_y, true)
			add_cyl(0.25, 2.6, mat_st, Vector3(bp.x, 2.2, bp.z), 12, true)
			var sp = MeshInstance3D.new()
			var sm = SphereMesh.new()
			sm.radius = 0.4
			sm.height = 0.8
			sp.mesh = sm
			sp.material_override = mat_am
			sp.position = Vector3(bp.x, 3.6, bp.z)
			add_child(sp)

		# Translucent Forcefield Curtain
		add_box(10.8, 2.8, 0.04, mat_barrier, forward * 38.0 + Vector3(0, 1.9, 0), rot_y, false)

		# 3 Horizontal Energy Rods at y = 0.6, 1.8, 3.0
		for ly in [0.6, 1.8, 3.0]:
			add_box(10.8, 0.06, 0.06, mat_am, forward * 38.0 + Vector3(0, ly, 0), rot_y, false)

	# Perimeter Fortress Wall at 50m
	var wall_base = forward * 50.0
	for i in [-4, -3, -2, -1, 1, 2, 3, 4]:
		var b_pos = wall_base + right * (i * 10.0) + Vector3(0, 3.25, 0)
		add_box(9.8, 6.5, 3.2, mat_gun, b_pos, rot_y, true)
		var p_pos = wall_base + right * (i * 10.0) + Vector3(0, 2.7, 0) - forward * 1.8
		var p_thick = 0.5 + ((i & 1) * 0.3)
		add_box(7.0, 3.4, p_thick, mat_st, p_pos, rot_y, false)
		var c_pos = wall_base + right * (i * 10.0) + Vector3(0, 5.0, 0) - forward * 2.1
		add_box(6.0, 0.12, 0.1, mat_am, c_pos, rot_y, false)

	# Continuous Heavy Top Parapet Beam (100m length at y = 6.9)
	add_box(100.0, 0.8, 3.8, mat_st, wall_base + Vector3(0, 6.9, 0), rot_y, true)

	# Doorway Portal Pillars & Overhead Lintel
	for x_side in [-6.2, 6.2]:
		var dp_pos = wall_base + right * x_side + Vector3(0, 3.3, 0)
		add_box(2.4, 6.6, 3.6, mat_st, dp_pos, rot_y, true)
		var b_col = mat_rd if (k % 2 != 0) else mat_am
		add_box(0.3, 0.3, 0.3, b_col, wall_base + right * (x_side * 0.9) + Vector3(0, 5.8, 0) - forward * 2.0, rot_y, false)

	add_box(11.0, 0.9, 3.4, mat_gun, wall_base + Vector3(0, 6.2, 0), rot_y, true)

	# Retracted Heavy Blast Door Panels (3 aluminum slabs)
	for j in [-1, 0, 1]:
		var bp_pos = wall_base + right * (12.6 + j * 2.7) + Vector3(0, 2.7, 0) + forward * 1.5
		add_box(2.6, 5.4, 0.4, mat_al, bp_pos, rot_y, false)

	# Portal Terminal Access Station with Cyan Screen
	var term_pos = wall_base - right * 6.3 + Vector3(0, 1.4, 0) - forward * 2.0
	add_box(0.5, 0.9, 0.3, mat_dk, term_pos, rot_y, false)
	add_box(0.2, 0.2, 0.1, mat_cy, wall_base - right * 6.3 + Vector3(0, 1.5, 0) - forward * 2.2, rot_y, false)

func _on_laser_body_entered(body: Node3D, _barrier: Dictionary) -> void:
	if current_laser_state != LaserState.ACTIVE:
		return
	if body is PlayerController:
		if body.is_eliminated:
			return # Single-trigger guard
		body.eliminate()
		if has_node("/root/AudioManager"):
			get_node("/root/AudioManager").play_sfx("sabotage_activate")
		var arena = get_parent()
		if arena and arena.has_method("_show_notification"):
			arena._show_notification("⚡ ALERT: Player %d Eliminated by Active Power Core Laser Grid! ⚡" % body.player_id)

func process_lasers(delta: float) -> void:
	laser_cycle_timer -= delta
	match current_laser_state:
		LaserState.ACTIVE:
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.WARNING, 1.5)
		LaserState.WARNING:
			var pulse = (sin(Time.get_ticks_msec() * 0.03) + 1.0) * 0.5
			for d in laser_barrier_data:
				if d.light:
					d.light.light_energy = 1.0 + pulse * 2.5
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.DISARMED, 2.5)
		LaserState.DISARMED:
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.ACTIVE, 4.5)

func _set_lasers_state(new_state: LaserState, duration: float) -> void:
	current_laser_state = new_state
	laser_cycle_timer = duration
	for d in laser_barrier_data:
		var beam_mat = mat_laser_active
		var curtain_mat = mat_laser_curtain_active
		var col = Color(1.0, 0.165, 0.165)
		var energy = 1.8
		var col_disabled = false
		var curtain_visible = true

		if new_state == LaserState.WARNING:
			beam_mat = mat_laser_warning
			curtain_mat = mat_laser_curtain_warning
			col = Color(1.0, 0.7, 0.1)
			energy = 2.6
		elif new_state == LaserState.DISARMED:
			beam_mat = mat_laser_disarmed
			col = Color(0.1, 0.95, 0.55)
			energy = 0.6
			col_disabled = true
			curtain_visible = false

		for b in d.beams:
			if b:
				b.material_override = beam_mat
		if d.has("curtain") and d["curtain"]:
			var cur: MeshInstance3D = d["curtain"]
			cur.visible = curtain_visible
			if curtain_visible:
				cur.material_override = curtain_mat
		if d.light:
			d.light.light_color = col
			d.light.light_energy = energy
		if d.col:
			d.col.disabled = col_disabled

func overload_lasers() -> void:
	_set_lasers_state(LaserState.ACTIVE, 5.0)

func reset_lasers() -> void:
	player_laser_cooldowns.clear()
	_set_lasers_state(LaserState.ACTIVE, 4.5)
