extends Node3D
class_name EnvResearchFacility

# Coordinate conversion matching HTML 3D reference
const S: float = 0.0787
const H: float = 4.6
const TH: float = 0.6

# Materials matching HTML 3D specification
var mat_side: StandardMaterial3D
var mat_top: StandardMaterial3D
var mat_gun: StandardMaterial3D
var mat_dk: StandardMaterial3D
var mat_al: StandardMaterial3D
var mat_cy: StandardMaterial3D
var mat_red: StandardMaterial3D
var mat_amb: StandardMaterial3D
var mat_grn: StandardMaterial3D
var mat_glass: StandardMaterial3D
var mat_holo: StandardMaterial3D
var mat_holr: StandardMaterial3D
var mat_floor: StandardMaterial3D
var mat_hazard: StandardMaterial3D
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
var gates_data: Dictionary = {}

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func x_coord(p: float) -> float:
	return (p - 707.0) * S

func z_coord(p: float) -> float:
	return (p - 490.0) * S

func _init_materials() -> void:
	# M.side = mk(0x1b2028, .6, .5) -> high-tech slate wall panels
	mat_side = StandardMaterial3D.new()
	mat_side.albedo_color = Color(0.18, 0.22, 0.28)
	mat_side.roughness = 0.55
	mat_side.metallic = 0.45

	# M.top = mk(0x46536a, .5, .4, {emissive: 0x0a2a40}) -> luminous blue-slate wall-top caps
	mat_top = StandardMaterial3D.new()
	mat_top.albedo_color = Color(0.28, 0.34, 0.44)
	mat_top.roughness = 0.5
	mat_top.metallic = 0.4
	mat_top.emission_enabled = true
	mat_top.emission = Color(0.06, 0.22, 0.36)
	mat_top.emission_energy_multiplier = 0.9

	# M.gun = mk(0x2c333d, .45, .8) -> gunmetal framework and consoles
	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.22, 0.26, 0.31)
	mat_gun.roughness = 0.45
	mat_gun.metallic = 0.8

	# M.dk = mk(0x14181e, .7, .4) -> dark composite foundation
	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.11, 0.13, 0.16)
	mat_dk.roughness = 0.65
	mat_dk.metallic = 0.4

	# M.al = mk(0x7d8794, .35, .85) -> brushed aluminum
	mat_al = StandardMaterial3D.new()
	mat_al.albedo_color = Color(0.52, 0.56, 0.62)
	mat_al.roughness = 0.35
	mat_al.metallic = 0.85

	# M.cy = em(0x1aa0ff, 1.4) -> electric neon cyan
	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.102, 0.627, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.102, 0.627, 1.0)
	mat_cy.emission_energy_multiplier = 1.8

	# M.red = em(0xff2a2a, 2) -> danger crimson
	mat_red = StandardMaterial3D.new()
	mat_red.albedo_color = Color(1.0, 0.165, 0.165)
	mat_red.emission_enabled = true
	mat_red.emission = Color(1.0, 0.165, 0.165)
	mat_red.emission_energy_multiplier = 2.2

	# M.amb = em(0xffb21a, 1) -> amber warning
	mat_amb = StandardMaterial3D.new()
	mat_amb.albedo_color = Color(1.0, 0.698, 0.102)
	mat_amb.emission_enabled = true
	mat_amb.emission = Color(1.0, 0.698, 0.102)
	mat_amb.emission_energy_multiplier = 1.3

	# M.grn = mk(0x2c6a34, .9, 0) -> biological foliage
	mat_grn = StandardMaterial3D.new()
	mat_grn.albedo_color = Color(0.19, 0.45, 0.23)
	mat_grn.roughness = 0.85

	# M.glass = mk(0x56c8ff, .1, .2, {transparent: true, opacity: .28, emissive: 0x0a5a90, emissiveIntensity: .5})
	mat_glass = StandardMaterial3D.new()
	mat_glass.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_glass.albedo_color = Color(0.337, 0.784, 1.0, 0.28)
	mat_glass.roughness = 0.1
	mat_glass.metallic = 0.2
	mat_glass.emission_enabled = true
	mat_glass.emission = Color(0.04, 0.35, 0.56)
	mat_glass.emission_energy_multiplier = 0.6

	# M.holo = mk(0x1aa0ff, .3, 0, {transparent: true, opacity: .55, emissive: 0x1aa0ff, emissiveIntensity: 1.4})
	mat_holo = StandardMaterial3D.new()
	mat_holo.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_holo.albedo_color = Color(0.102, 0.627, 1.0, 0.55)
	mat_holo.emission_enabled = true
	mat_holo.emission = Color(0.102, 0.627, 1.0)
	mat_holo.emission_energy_multiplier = 1.6

	# M.holr = mk(0xff2a2a, .3, 0, {transparent: true, opacity: .55, emissive: 0xff2a2a, emissiveIntensity: 1.4})
	mat_holr = StandardMaterial3D.new()
	mat_holr.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_holr.albedo_color = Color(1.0, 0.165, 0.165, 0.55)
	mat_holr.emission_enabled = true
	mat_holr.emission = Color(1.0, 0.165, 0.165)
	mat_holr.emission_energy_multiplier = 1.6

	# Modular High-Tech Floor Texture (matching HTML canvas: #39424f base, #1a2029 border, #4a5565 groove)
	_generate_procedural_floor_material()

	# Hazard Chevron Striping Texture (matching HTML canvas: #ffc21a and #111111 diagonal stripes)
	_generate_procedural_hazard_material()

	# Laser Materials (Beams & Curtains)
	mat_laser_active = StandardMaterial3D.new()
	mat_laser_active.albedo_color = Color(1.0, 0.12, 0.12)
	mat_laser_active.emission_enabled = true
	mat_laser_active.emission = Color(1.0, 0.12, 0.12)
	mat_laser_active.emission_energy_multiplier = 3.8

	mat_laser_curtain_active = StandardMaterial3D.new()
	mat_laser_curtain_active.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_curtain_active.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_laser_curtain_active.albedo_color = Color(1.0, 0.165, 0.165, 0.18)
	mat_laser_curtain_active.emission_enabled = true
	mat_laser_curtain_active.emission = Color(1.0, 0.165, 0.165)
	mat_laser_curtain_active.emission_energy_multiplier = 1.3

	mat_laser_warning = StandardMaterial3D.new()
	mat_laser_warning.albedo_color = Color(1.0, 0.72, 0.1)
	mat_laser_warning.emission_enabled = true
	mat_laser_warning.emission = Color(1.0, 0.65, 0.1)
	mat_laser_warning.emission_energy_multiplier = 3.0

	mat_laser_curtain_warning = StandardMaterial3D.new()
	mat_laser_curtain_warning.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_curtain_warning.cull_mode = BaseMaterial3D.CULL_DISABLED
	mat_laser_curtain_warning.albedo_color = Color(1.0, 0.7, 0.1, 0.16)
	mat_laser_curtain_warning.emission_enabled = true
	mat_laser_curtain_warning.emission = Color(1.0, 0.65, 0.1)
	mat_laser_curtain_warning.emission_energy_multiplier = 1.1

	mat_laser_disarmed = StandardMaterial3D.new()
	mat_laser_disarmed.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_disarmed.albedo_color = Color(0.1, 0.95, 0.55, 0.22)
	mat_laser_disarmed.emission_enabled = true
	mat_laser_disarmed.emission = Color(0.1, 0.95, 0.55)
	mat_laser_disarmed.emission_energy_multiplier = 0.7

func _generate_procedural_floor_material() -> void:
	mat_floor = StandardMaterial3D.new()
	mat_floor.roughness = 0.55
	mat_floor.metallic = 0.35

	var img = Image.create(256, 256, false, Image.FORMAT_RGBA8)
	var col_base = Color(0.24, 0.28, 0.35)    # HTML #39424f enhanced for readability
	var col_seam = Color(0.10, 0.125, 0.16)  # HTML #1a2029
	var col_groove = Color(0.35, 0.40, 0.48) # HTML #4a5565

	img.fill(col_base)

	# Outer Seam Border (lineWidth 6)
	for x in range(256):
		for y in range(6):
			img.set_pixel(x, y, col_seam)
			img.set_pixel(x, 255 - y, col_seam)
	for y in range(256):
		for x in range(6):
			img.set_pixel(x, y, col_seam)
			img.set_pixel(255 - x, y, col_seam)

	# Inner Inset Groove Line (lineWidth 2 at inset 10px)
	for x in range(10, 246):
		for w in range(2):
			img.set_pixel(x, 10 + w, col_groove)
			img.set_pixel(x, 245 - w, col_groove)
	for y in range(10, 246):
		for w in range(2):
			img.set_pixel(10 + w, y, col_groove)
			img.set_pixel(245 - w, y, col_groove)

	# Micro surface speckling
	for i in range(120):
		var rx = randi_range(14, 230)
		var ry = randi_range(14, 230)
		var fleck = Color(col_base.r * 0.92, col_base.g * 0.92, col_base.b * 0.92)
		img.set_pixel(rx, ry, fleck)

	var tex = ImageTexture.create_from_image(img)
	mat_floor.albedo_texture = tex
	mat_floor.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC
	# Repeated across 99m x 66m (33 x 22 tiles of 3m each)
	mat_floor.uv1_scale = Vector3(33.0, 22.0, 1.0)

func _generate_procedural_hazard_material() -> void:
	mat_hazard = StandardMaterial3D.new()
	mat_hazard.roughness = 0.6
	mat_hazard.metallic = 0.1
	mat_hazard.emission_enabled = true
	mat_hazard.emission = Color(0.95, 0.72, 0.1)
	mat_hazard.emission_energy_multiplier = 0.85

	var h_img = Image.create(128, 128, false, Image.FORMAT_RGBA8)
	var col_amber = Color(1.0, 0.76, 0.1)
	var col_dark = Color(0.08, 0.08, 0.09)

	for py in range(128):
		for px in range(128):
			if ((px + py) % 24) < 12:
				h_img.set_pixel(px, py, col_amber)
			else:
				h_img.set_pixel(px, py, col_dark)

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

func add_cyl(r: float, h: float, mat: Material, pos: Vector3, n: int = 16, collide: bool = true) -> MeshInstance3D:
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

# Builds a wall segment with HTML WM specification (side panels + luminous top trim cap)
func seg(x1: float, y1: float, x2: float, y2: float) -> void:
	var ax = x_coord(x1)
	var az = z_coord(y1)
	var bx = x_coord(x2)
	var bz = z_coord(y2)
	var l = sqrt((bx - ax) * (bx - ax) + (bz - az) * (bz - az))
	if l < 0.05:
		return
	var center = Vector3((ax + bx) * 0.5, H * 0.5, (az + bz) * 0.5)
	var angle = -atan2(bz - az, bx - ax)
	var wall_len = l + TH * 0.9

	# Main wall body (M.side)
	add_box(wall_len, H, TH, mat_side, center, angle, true)

	# Luminous top cap trim (M.top: glowing blue-slate cap outlining every wall from camera view)
	var top_pos = Vector3(center.x, H + 0.04, center.z)
	add_box(wall_len, 0.08, TH, mat_top, top_pos, angle, false)

func post(px: float, py: float) -> void:
	var pos = Vector3(x_coord(px), (H + 0.2) * 0.5, z_coord(py))
	add_box(0.7, H + 0.2, 0.7, mat_gun, pos, 0.0, true)
	# Vertical cyan neon strip on doorpost face
	var cy_pos = Vector3(x_coord(px), 1.6, z_coord(py) + 0.35)
	add_box(0.16, 2.2, 0.16, mat_cy, cy_pos, 0.0, false)

func wl(x1: float, y1: float, x2: float, y2: float, gs: Array = []) -> void:
	var sorted_gs = gs.duplicate()
	sorted_gs.sort_custom(func(a, b): return a[0] < b[0])
	var hor = (y1 == y2)
	var cur = x1 if hor else y1
	var end_val = x2 if hor else y2

	for gap in sorted_gs:
		var c = gap[0]
		var w = gap[1]
		var a = c - w * 0.5
		var b = c + w * 0.5
		if hor:
			seg(cur, y1, a, y1)
		else:
			seg(x1, cur, x1, a)
		cur = b
		post(a if hor else x1, y1 if hor else a)
		post(b if hor else x1, y1 if hor else b)
		var hl = w * S
		if hor:
			add_box(hl, 0.6, TH, mat_gun, Vector3(x_coord(c), H - 0.3, z_coord(y1)), 0.0, false)
		else:
			add_box(TH, 0.6, hl, mat_gun, Vector3(x_coord(x1), H - 0.3, z_coord(c)), 0.0, false)

	if hor:
		seg(cur, y1, end_val, y1)
	else:
		seg(x1, cur, x1, end_val)

func room(x1: float, y1: float, x2: float, y2: float, d: Dictionary = {}) -> void:
	wl(x1, y1, x2, y1, d.get("N", []))
	wl(x1, y2, x2, y2, d.get("S", []))
	wl(x1, y1, x1, y2, d.get("W", []))
	wl(x2, y1, x2, y2, d.get("E", []))

func _build_environment() -> void:
	# 1. Floor (99m x 66m at X(670), Z(505))
	var floor_pos = Vector3(x_coord(670), -0.5, z_coord(505))
	add_box(99.0, 1.0, 66.0, mat_floor, floor_pos, 0.0, true)

	# 2. Floor Traps with Diagonal Hazard Chevron Stripes
	var traps_data = [
		[470, 415, 3.0, 1.6], [1190, 490, 4.0, 1.6], [490, 622, 1.6, 3.0],
		[1100, 395, 3.0, 1.4], [210, 700, 4.0, 1.4], [1040, 540, 1.6, 3.0]
	]
	for t in traps_data:
		add_box(t[2], 0.04, t[3], mat_hazard, Vector3(x_coord(t[0]), 0.02, z_coord(t[1])), 0.0, false)

	# 3. Complete Reference Architecture & Room Layout
	room(35, 90, 1300, 920) # Facility Outer Enclosure
	room(40, 110, 250, 300, {"S": [[215, 70]]})
	room(260, 95, 600, 320, {"S": [[520, 120]], "E": [[250, 80]]})
	room(840, 100, 1100, 320, {"W": [[250, 80]], "S": [[900, 100]]})
	room(1130, 120, 1290, 540, {"W": [[480, 90]]})
	room(90, 330, 260, 640, {"E": [[490, 100]]})
	room(340, 330, 465, 440, {"S": [[400, 60]]})
	room(340, 545, 465, 645, {"N": [[400, 60]]})
	room(60, 655, 470, 860, {"N": [[300, 150]]})
	room(480, 700, 600, 880, {"E": [[800, 80]]})
	room(830, 660, 950, 880, {"W": [[800, 80]]})
	room(960, 570, 1100, 870, {"N": [[1030, 100]]})
	room(1110, 640, 1290, 880, {"N": [[1200, 100]]})
	room(960, 330, 1120, 440, {"S": [[1040, 100]]})

	# 4. Central Octagon Perimeter Walls (Radius = 189 units = 14.87m)
	var cx = 707.0
	var cy = 490.0
	var rv = 189.0
	for k in range(8):
		var a1 = (22.5 + 45.0 * k) * PI / 180.0
		var a2 = (22.5 + 45.0 * (k + 1)) * PI / 180.0
		var ax = cx + rv * cos(a1)
		var ay = cy + rv * sin(a1)
		var bx = cx + rv * cos(a2)
		var by = cy + rv * sin(a2)
		if k % 2 == 1:
			var t = 0.5
			var w = 100.0 / 145.0 / 2.0
			var mx = ax + (bx - ax) * t
			var my = ay + (by - ay) * t
			var u = bx - ax
			var v = by - ay
			seg(ax, ay, mx - u * w, my - v * w)
			seg(mx + u * w, my + v * w, bx, by)
			post(mx - u * w, my - v * w)
			post(mx + u * w, my + v * w)
		else:
			seg(ax, ay, bx, by)

	# 5. Central Objective Core & Dais (Exact HTML Reference Proportions)
	# Dais platform: 8-sided cylinder, radius 9.4m, height 0.5m, rotated by PI/8 (22.5 deg)
	var dais_mesh = add_cyl(9.4, 0.5, mat_dk, Vector3(0.0, 0.25, 0.0), 8, false)
	dais_mesh.rotation.y = PI / 8.0

	# Dais low collision allowing smooth player walk-up without obstruction
	var dais_body = StaticBody3D.new()
	var dais_col = CollisionShape3D.new()
	var dais_shape = CylinderShape3D.new()
	dais_shape.radius = 9.4
	dais_shape.height = 0.35
	dais_col.shape = dais_shape
	dais_body.add_child(dais_col)
	dais_body.position = Vector3(0.0, 0.175, 0.0)
	add_child(dais_body)

	# Concentric Octagonal Cyan Floor Rings at radius 13m and 11m
	for r in [13.0, 11.0]:
		_create_octagonal_ring(r, 0.12, 0.03, mat_cy)

	# Octagonal Cyan Torus Ring at radius 7.6m at y = 0.6m
	_create_octagonal_ring(7.6, 0.14, 0.6, mat_cy)

	# Tiered Hexagonal Pedestals
	add_cyl(3.4, 0.9, mat_gun, Vector3(0.0, 0.95, 0.0), 6, true)
	add_cyl(2.4, 1.8, mat_cy, Vector3(0.0, 1.4, 0.0), 6, true)

	# Floating Holographic Core Sphere
	var sph = MeshInstance3D.new()
	var sph_mesh = SphereMesh.new()
	sph_mesh.radius = 1.3
	sph_mesh.height = 2.6
	sph.mesh = sph_mesh
	sph.material_override = mat_holo
	sph.position = Vector3(0.0, 3.4, 0.0)
	add_child(sph)

	# Central Hub OmniLight3D
	var cl = OmniLight3D.new()
	cl.light_color = Color(0.102, 0.627, 1.0)
	cl.light_energy = 2.4
	cl.omni_range = 35.0
	cl.position = Vector3(0.0, 4.0, 0.0)
	add_child(cl)

	# Surrounding Central Dais Consoles
	var c_offsets_z = [[0.0, -9.5], [0.0, 9.5]]
	for p in c_offsets_z:
		add_box(8.0, 1.1, 1.2, mat_gun, Vector3(p[0], 0.6, p[1]), 0.0, true)
		var sign_z = 0.2 if p[1] < 0 else -0.2
		add_box(7.0, 0.6, 0.5, mat_cy, Vector3(p[0], 1.25, p[1] + sign_z), 0.0, false)

	var c_offsets_x = [[-9.5, 0.0], [9.5, 0.0]]
	for p in c_offsets_x:
		add_box(1.2, 1.1, 8.0, mat_gun, Vector3(p[0], 0.6, p[1]), 0.0, true)
		var sign_x = 0.2 if p[0] < 0 else -0.2
		add_box(0.5, 0.6, 7.0, mat_cy, Vector3(p[0] + sign_x, 1.25, p[1]), 0.0, false)

	# 6. Props: Containment Vessels
	var vessels = [
		[515, 165, 0.9, 3.6, mat_cy], [1225, 240, 1.6, 3.6, mat_cy], [1225, 295, 1.6, 3.6, mat_cy],
		[1225, 350, 1.6, 3.6, mat_cy], [140, 730, 1.5, 3.0, mat_cy], [140, 778, 1.5, 3.0, mat_cy],
		[395, 590, 0.9, 3.2, mat_amb], [425, 590, 0.9, 3.2, mat_amb], [420, 385, 0.8, 3.5, mat_cy]
	]
	for v in vessels:
		var vx = x_coord(v[0])
		var vz = z_coord(v[1])
		var vr = v[2]
		var vh = v[3]
		var vm = v[4]
		add_cyl(vr * 1.15, 0.5, mat_gun, Vector3(vx, 0.25, vz), 16, true)
		add_cyl(vr * 1.15, 0.5, mat_gun, Vector3(vx, vh + 0.5, vz), 16, false)
		add_cyl(vr * 0.55, vh, vm, Vector3(vx, vh * 0.5 + 0.5, vz), 12, false)
		add_cyl(vr, vh, mat_glass, Vector3(vx, vh * 0.5 + 0.5, vz), 16, false)

	# 7. Props: Chemical Reactors in SW Room
	var reactors = [[380, 775, 3.2], [440, 768, 2.4]]
	for r in reactors:
		var rx = x_coord(r[0])
		var rz = z_coord(r[1])
		var rad = r[2]
		add_cyl(rad, 0.8, mat_gun, Vector3(rx, 0.4, rz), 16, true)
		add_cyl(rad * 0.8, 2.6, mat_glass, Vector3(rx, 2.0, rz), 16, false)
		add_cyl(rad * 0.45, 2.4, mat_cy, Vector3(rx, 2.0, rz), 12, false)
		add_cyl(rad * 0.9, 0.5, mat_al, Vector3(rx, 3.4, rz), 16, false)
		# Glowing cyan collar ring
		var torus_inst = MeshInstance3D.new()
		var t_mesh = TorusMesh.new()
		t_mesh.inner_radius = rad * 0.85 - 0.08
		t_mesh.outer_radius = rad * 0.85 + 0.08
		t_mesh.rings = 24
		t_mesh.ring_segments = 12
		torus_inst.mesh = t_mesh
		torus_inst.material_override = mat_cy
		torus_inst.position = Vector3(rx, 0.9, rz)
		add_child(torus_inst)

	# 8. Props: Consoles
	var consoles = [
		[330, 185, 70, 25, 1], [300, 250, 60, 20, 0], [900, 200, 60, 60, 0],
		[930, 270, 140, 22, 1], [1000, 150, 120, 20, 1], [1170, 170, 100, 25, 1],
		[1010, 600, 90, 30, 1], [1010, 820, 80, 25, 1], [880, 780, 25, 80, 1],
		[850, 700, 40, 20, 0], [540, 740, 25, 60, 1], [130, 610, 110, 24, 1],
		[320, 830, 120, 20, 1], [200, 830, 80, 20, 0], [470, 340, 30, 50, 0],
		[1180, 570, 60, 30, 0]
	]
	for cn in consoles:
		var cx_pos = x_coord(cn[0])
		var cz_pos = z_coord(cn[1])
		var cw = cn[2] * S
		var cd = cn[3] * S
		add_box(cw, 1.0, cd, mat_gun, Vector3(cx_pos, 0.5, cz_pos), 0.0, true)
		var sc_mat = mat_cy if cn[4] == 1 else mat_dk
		add_box(cw * 0.8, 0.1, cd * 0.7, sc_mat, Vector3(cx_pos, 1.06, cz_pos), 0.0, false)

	# 9. Props: Server Racks
	var racks = [
		[1070, 180], [1085, 215], [975, 590], [1000, 640],
		[565, 620], [565, 665], [110, 360], [110, 400]
	]
	for rk in racks:
		var rkx = x_coord(rk[0])
		var rkz = z_coord(rk[1])
		add_box(1.1, 2.5, 0.8, mat_dk, Vector3(rkx, 1.25, rkz), 0.0, true)
		add_box(0.9, 0.1, 0.05, mat_cy, Vector3(rkx, 1.8, rkz + 0.43), 0.0, false)
		add_box(0.9, 0.1, 0.05, mat_amb, Vector3(rkx, 1.4, rkz + 0.43), 0.0, false)

	# 10. Props: Biomass Specimen Planters
	var planters = [
		[600, 150], [825, 160], [830, 295], [790, 820],
		[600, 290], [800, 880], [570, 880]
	]
	for pl in planters:
		var plx = x_coord(pl[0])
		var plz = z_coord(pl[1])
		add_cyl(0.7, 0.5, mat_gun, Vector3(plx, 0.25, plz), 12, true)
		var f = MeshInstance3D.new()
		var f_mesh = SphereMesh.new()
		f_mesh.radius = 0.8
		f_mesh.height = 1.6
		f.mesh = f_mesh
		f.material_override = mat_grn
		f.position = Vector3(plx, 1.1, plz)
		add_child(f)

	# 11. Laser Barriers (Exact Reference Positions + Lethal Curtains)
	var lasers = [
		[662, 210, 762, 210], # North Laser
		[662, 750, 762, 750], # South Laser
		[250, 448, 250, 532], # West Laser
		[350, 452, 350, 528], # Inner West Laser
		[1046, 460, 1046, 526] # East Laser
	]
	laser_barrier_data.clear()
	for ls in lasers:
		var lax = x_coord(ls[0])
		var laz = z_coord(ls[1])
		var lbx = x_coord(ls[2])
		var lbz = z_coord(ls[3])
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

		# End Posts with Red Beacons
		for pt in [Vector3(lax, 0.0, laz), Vector3(lbx, 0.0, lbz)]:
			add_box(0.5, 2.4, 0.5, mat_gun, Vector3(pt.x, 1.2, pt.z), 0.0, true)
			add_box(0.25, 0.25, 0.25, mat_red, Vector3(pt.x, 2.5, pt.z), 0.0, false)

		var l_light = OmniLight3D.new()
		l_light.light_color = Color(1.0, 0.165, 0.165)
		l_light.light_energy = 1.8
		l_light.omni_range = 12.0
		l_light.position = Vector3(l_center.x, 1.5, l_center.z)
		add_child(l_light)

		# Authoritative Lethal Detection Area3D (Mask 2 = PlayerController)
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

	# 12. Spawn Pads & Holographic Beacons
	# Runner Spawn Pad [173, 228]
	var rx = x_coord(173)
	var rz = z_coord(228)
	var r_ring = TorusMesh.new()
	r_ring.inner_radius = 60.0 * S * 0.85
	r_ring.outer_radius = 60.0 * S
	r_ring.rings = 36
	r_ring.ring_segments = 8
	var r_ring_inst = MeshInstance3D.new()
	r_ring_inst.mesh = r_ring
	r_ring_inst.material_override = mat_cy
	r_ring_inst.position = Vector3(rx, 0.04, rz)
	add_child(r_ring_inst)
	add_cyl(60.0 * S * 0.85, 0.02, mat_holo, Vector3(rx, 0.03, rz), 32, false)

	var r_light = OmniLight3D.new()
	r_light.light_color = Color(0.102, 0.627, 1.0)
	r_light.light_energy = 2.2
	r_light.omni_range = 16.0
	r_light.position = Vector3(rx, 3.0, rz)
	add_child(r_light)

	# Holographic Runner Beacon (floating mannequin indicator)
	var r_beacon_body = MeshInstance3D.new()
	var r_capsule = CapsuleMesh.new()
	r_capsule.radius = 0.3
	r_capsule.height = 0.8
	r_beacon_body.mesh = r_capsule
	r_beacon_body.material_override = mat_holo
	r_beacon_body.position = Vector3(rx, 1.2, rz)
	add_child(r_beacon_body)

	var r_beacon_head = MeshInstance3D.new()
	var r_head_mesh = SphereMesh.new()
	r_head_mesh.radius = 0.24
	r_head_mesh.height = 0.48
	r_beacon_head.mesh = r_head_mesh
	r_beacon_head.material_override = mat_holo
	r_beacon_head.position = Vector3(rx, 2.0, rz)
	add_child(r_beacon_head)

	# Saboteur Spawn Pad [1195, 755]
	var sx = x_coord(1195)
	var sz = z_coord(755)
	var s_ring = TorusMesh.new()
	s_ring.inner_radius = 60.0 * S * 0.85
	s_ring.outer_radius = 60.0 * S
	s_ring.rings = 36
	s_ring.ring_segments = 8
	var s_ring_inst = MeshInstance3D.new()
	s_ring_inst.mesh = s_ring
	s_ring_inst.material_override = mat_red
	s_ring_inst.position = Vector3(sx, 0.04, sz)
	add_child(s_ring_inst)
	add_cyl(60.0 * S * 0.85, 0.02, mat_holr, Vector3(sx, 0.03, sz), 32, false)

	var s_light = OmniLight3D.new()
	s_light.light_color = Color(1.0, 0.165, 0.165)
	s_light.light_energy = 2.2
	s_light.omni_range = 16.0
	s_light.position = Vector3(sx, 3.0, sz)
	add_child(s_light)

	# Holographic Saboteur Beacon (floating crimson prism indicator)
	var s_prism = MeshInstance3D.new()
	var prism_mesh = CylinderMesh.new()
	prism_mesh.top_radius = 0.0
	prism_mesh.bottom_radius = 0.7
	prism_mesh.height = 1.4
	prism_mesh.radial_segments = 3
	s_prism.mesh = prism_mesh
	s_prism.material_override = mat_holr
	s_prism.position = Vector3(sx, 1.4, sz)
	add_child(s_prism)

	# 13. Balanced Facility Visibility Lights (Cures excessive darkness without washing out the aesthetic)
	var corridor_light_coords = [
		Vector3(0.0, 3.8, -24.0),   # North Gate approach
		Vector3(0.0, 3.8, 24.0),    # South Exit corridor
		Vector3(-24.0, 3.8, 0.0),   # West Wing corridor
		Vector3(24.0, 3.8, 0.0),    # East Wing corridor
		Vector3(-34.0, 3.8, -16.0), # NW Laboratory bay
		Vector3(34.0, 3.8, -16.0),  # NE Server bay
		Vector3(-34.0, 3.8, 18.0),  # SW Chemical bay
		Vector3(34.0, 3.8, 18.0)    # SE Transit corridor
	]
	for clpos in corridor_light_coords:
		var corr_light = OmniLight3D.new()
		corr_light.light_color = Color(0.88, 0.94, 1.0)
		corr_light.light_energy = 1.15
		corr_light.omni_range = 18.0
		corr_light.position = clpos
		corr_light.shadow_enabled = false
		add_child(corr_light)

	# 14. Dynamic Security Gates for Control Point Rearrangement
	_create_security_gate("gate_alpha", Vector3(-22.0, 1.6, 8.0), Vector3(1.2, 3.2, 8.0))
	_create_security_gate("gate_beta", Vector3(20.0, 1.6, -6.0), Vector3(1.2, 3.2, 8.0))
	_create_security_gate("gate_gamma", Vector3(0.0, 1.6, -22.0), Vector3(8.0, 3.2, 1.2))

# Helper to construct an 8-sided regular ring of thickness and height
func _create_octagonal_ring(radius: float, thickness: float, y_pos: float, mat: Material) -> void:
	for k in range(8):
		var a1 = (22.5 + 45.0 * k) * PI / 180.0
		var a2 = (22.5 + 45.0 * (k + 1)) * PI / 180.0
		var ax = radius * cos(a1)
		var az = radius * sin(a1)
		var bx = radius * cos(a2)
		var bz = radius * sin(a2)
		var seg_len = sqrt((bx - ax) * (bx - ax) + (bz - az) * (bz - az))
		var angle = -atan2(bz - az, bx - ax)
		var center = Vector3((ax + bx) * 0.5, y_pos, (az + bz) * 0.5)
		add_box(seg_len, thickness, thickness, mat, center, angle, false)

func _create_security_gate(gate_id: String, pos: Vector3, size: Vector3, rotation_y: float = 0.0) -> StaticBody3D:
	var body = StaticBody3D.new()
	body.name = "SecurityGate_" + gate_id
	body.position = pos
	body.rotation.y = rotation_y

	var col = CollisionShape3D.new()
	var box_shape = BoxShape3D.new()
	box_shape.size = size
	col.shape = box_shape
	body.add_child(col)

	var mesh_inst = MeshInstance3D.new()
	var box_mesh = BoxMesh.new()
	box_mesh.size = size
	mesh_inst.mesh = box_mesh

	var mat = StandardMaterial3D.new()
	mat.albedo_color = Color(0.18, 0.22, 0.3)
	mat.metallic = 0.7
	mat.roughness = 0.4
	mat.emission_enabled = true
	mat.emission = Color(0.1, 0.7, 1.0)
	mat.emission_energy_multiplier = 1.2
	mesh_inst.material_override = mat
	body.add_child(mesh_inst)

	add_child(body)

	gates_data[gate_id] = {
		"body": body,
		"col": col,
		"mesh": mesh_inst,
		"mat": mat,
		"initial_pos": pos,
		"target_pos": pos + Vector3(0, -size.y * 1.5, 0),
		"is_open": false
	}
	return body

func rearrange_for_point(point_title: String, _count: int) -> void:
	var title_upper = point_title.to_upper()
	if "ALPHA" in title_upper:
		_open_gate("gate_alpha")
	elif "BETA" in title_upper:
		_open_gate("gate_beta")
	elif "GAMMA" in title_upper:
		_open_gate("gate_gamma")

func _open_gate(gate_id: String) -> void:
	if not gates_data.has(gate_id):
		return
	var d = gates_data[gate_id]
	if d["is_open"]:
		return
	d["is_open"] = true
	var body: StaticBody3D = d["body"]
	var target: Vector3 = d["target_pos"]

	if d.get("mat"):
		var m: StandardMaterial3D = d["mat"]
		m.emission = Color(0.2, 1.0, 0.6)
		m.emission_energy_multiplier = 3.0

	var tw = create_tween()
	tw.tween_property(body, "position", target, 0.7).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)

func reset_rearrangement() -> void:
	for gate_id in gates_data.keys():
		var d = gates_data[gate_id]
		d["is_open"] = false
		var body: StaticBody3D = d["body"]
		body.position = d["initial_pos"]
		if d.get("mat"):
			var m: StandardMaterial3D = d["mat"]
			m.emission = Color(0.1, 0.7, 1.0)
			m.emission_energy_multiplier = 1.2

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
			arena._show_notification("⚡ ALERT: Player %d Eliminated by Active Laser Barrier! ⚡" % body.player_id)

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
	reset_rearrangement()
