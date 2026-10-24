extends Node3D
class_name EnvUndergroundComplex

# ==============================================================================
# ARENA 03 — UNDERGROUND COMPLEX (3D) - FINAL MASTER REFINEMENT
# - Relocated Exit Gate to prominent central concourse at (0, 0, -24)
# - Subterranean Vault 3D Backdrop (Zero black void: massive silo containment walls,
#   high-altitude service catwalks, and glowing atmospheric ventilation hubs)
# - Removed overhead grid cage lattice entirely for wide-open camera sightlines
# - Functional Checkpoint integration with safe respawn position recording
# - Clean, readable illumination with 18 facility luminaires + elevated albedo
# ==============================================================================

const S: float = 0.296
const H: float = 4.8
const TH: float = 0.5

# Palette Materials
var mat_side: StandardMaterial3D
var mat_top: StandardMaterial3D
var mat_gun: StandardMaterial3D
var mat_dk: StandardMaterial3D
var mat_st: StandardMaterial3D
var mat_cu: StandardMaterial3D
var mat_am: StandardMaterial3D
var mat_rd: StandardMaterial3D
var mat_cy: StandardMaterial3D
var mat_yl: StandardMaterial3D
var mat_rm: StandardMaterial3D
var mat_floor: StandardMaterial3D
var mat_hazard: StandardMaterial3D
var mat_portal_frame: StandardMaterial3D

# Laser Materials
var mat_laser_active: StandardMaterial3D
var mat_laser_warning: StandardMaterial3D
var mat_laser_disarmed: StandardMaterial3D

# Animated Components
var objective_orb: MeshInstance3D
var objective_light: OmniLight3D
var anim_holograms: Array[MeshInstance3D] = []
var exit_beacon_light: OmniLight3D

# Lethal Lasers System
enum LaserState { ACTIVE, WARNING, DISARMED }
var laser_barrier_data: Array[Dictionary] = []
var laser_cycle_timer: float = 4.5
var current_laser_state: LaserState = LaserState.ACTIVE
var player_laser_cooldowns: Dictionary = {}

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func _process(delta: float) -> void:
	var t = Time.get_ticks_msec() / 1000.0

	# Objective Emitter Pulsing Animation (geometry only, lighting remains stable and non-flickering)
	if objective_orb:
		var s_factor = 1.0 + sin(t * 3.33) * 0.12
		objective_orb.scale = Vector3(s_factor, s_factor, s_factor)

	# Rotating Hologram Spawns
	for holo in anim_holograms:
		if is_instance_valid(holo):
			holo.rotation.y += 1.8 * delta

	# Process Laser State Cycle
	process_lasers(delta)

func x_coord(p: float) -> float:
	return (p - 146.0) * S

func z_coord(p: float) -> float:
	return (p - 210.0) * S

# ------------------------------------------------------------------------------
# MATERIAL INITIALIZATION & PROCEDURAL TEXTURES
# ------------------------------------------------------------------------------
func _init_materials() -> void:
	# M.side: Clean industrial bunker slate (lifted from 0.14 to readable 0.32)
	mat_side = StandardMaterial3D.new()
	mat_side.albedo_color = Color(0.32, 0.36, 0.44)
	mat_side.roughness = 0.55
	mat_side.metallic = 0.45

	# M.top: Distinct wall-cap trim
	mat_top = StandardMaterial3D.new()
	mat_top.albedo_color = Color(0.48, 0.52, 0.60)
	mat_top.roughness = 0.45
	mat_top.metallic = 0.40

	# M.gun: Gunmetal structural plating
	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.28, 0.31, 0.36)
	mat_gun.roughness = 0.45
	mat_gun.metallic = 0.80

	# M.dk: Structural composite (lifted from 0.05 to readable 0.18)
	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.18, 0.20, 0.24)
	mat_dk.roughness = 0.65
	mat_dk.metallic = 0.40

	# M.st: Structural steel
	mat_st = StandardMaterial3D.new()
	mat_st.albedo_color = Color(0.38, 0.42, 0.48)
	mat_st.roughness = 0.40
	mat_st.metallic = 0.85

	# M.cu: Metallic copper
	mat_cu = StandardMaterial3D.new()
	mat_cu.albedo_color = Color(0.68, 0.42, 0.26)
	mat_cu.roughness = 0.45
	mat_cu.metallic = 0.85

	# M.am: Amber luminescence
	mat_am = StandardMaterial3D.new()
	mat_am.albedo_color = Color(1.0, 0.64, 0.18)
	mat_am.emission_enabled = true
	mat_am.emission = Color(1.0, 0.64, 0.18)
	mat_am.emission_energy_multiplier = 2.2

	# M.rd: Hazard crimson
	mat_rd = StandardMaterial3D.new()
	mat_rd.albedo_color = Color(1.0, 0.18, 0.12)
	mat_rd.emission_enabled = true
	mat_rd.emission = Color(1.0, 0.18, 0.12)
	mat_rd.emission_energy_multiplier = 2.4

	# M.cy: Electric cyan
	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.15, 0.82, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.15, 0.82, 1.0)
	mat_cy.emission_energy_multiplier = 2.2

	# M.yl: Warm industrial yellow
	mat_yl = StandardMaterial3D.new()
	mat_yl.albedo_color = Color(1.0, 0.84, 0.46)
	mat_yl.emission_enabled = true
	mat_yl.emission = Color(1.0, 0.84, 0.46)
	mat_yl.emission_energy_multiplier = 2.2

	# M.rm: Raised room floor subfloor (lifted from 0.13 to readable 0.30)
	mat_rm = StandardMaterial3D.new()
	mat_rm.albedo_color = Color(0.30, 0.34, 0.40)
	mat_rm.roughness = 0.55
	mat_rm.metallic = 0.45

	# Extraction Portal Frame Material
	mat_portal_frame = StandardMaterial3D.new()
	mat_portal_frame.albedo_color = Color(0.36, 0.40, 0.48)
	mat_portal_frame.roughness = 0.35
	mat_portal_frame.metallic = 0.85

	# Procedural Grating Floor Material
	_create_procedural_floor_material()

	# Procedural Hazard Material
	_create_procedural_hazard_material()

	# Laser Barrier Materials
	mat_laser_active = StandardMaterial3D.new()
	mat_laser_active.albedo_color = Color(1.0, 0.1, 0.1)
	mat_laser_active.emission_enabled = true
	mat_laser_active.emission = Color(1.0, 0.1, 0.1)
	mat_laser_active.emission_energy_multiplier = 4.0

	mat_laser_warning = StandardMaterial3D.new()
	mat_laser_warning.albedo_color = Color(1.0, 0.7, 0.1)
	mat_laser_warning.emission_enabled = true
	mat_laser_warning.emission = Color(1.0, 0.6, 0.1)
	mat_laser_warning.emission_energy_multiplier = 3.0

	mat_laser_disarmed = StandardMaterial3D.new()
	mat_laser_disarmed.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_disarmed.albedo_color = Color(0.1, 0.95, 0.55, 0.25)
	mat_laser_disarmed.emission_enabled = true
	mat_laser_disarmed.emission = Color(0.1, 0.95, 0.55)
	mat_laser_disarmed.emission_energy_multiplier = 0.7

func _create_procedural_floor_material() -> void:
	mat_floor = StandardMaterial3D.new()
	mat_floor.roughness = 0.48
	mat_floor.metallic = 0.38
	mat_floor.albedo_color = Color(1.15, 1.18, 1.25)

	# 512x512 Procedural Metallic Steel Grating
	var img = Image.create(512, 512, false, Image.FORMAT_RGBA8)
	var col_bg = Color8(42, 46, 54) # clean seam background
	img.fill(col_bg)

	var widths = [64, 128, 192]
	var rng = RandomNumberGenerator.new()
	rng.seed = 303

	for y in range(0, 512, 128):
		var x = 0
		while x < 512:
			var w = widths[rng.randi_range(0, 2)]
			if x + w > 512:
				w = 512 - x
			var v = rng.randi_range(80, 105)
			var plate_col = Color8(v, v + 4, v + 12)

			for px in range(x + 3, x + w - 3):
				for py in range(y + 3, y + 125):
					img.set_pixel(px, py, plate_col)

			var rivets = [
				Vector2i(x + 7, y + 7),
				Vector2i(x + w - 9, y + 7),
				Vector2i(x + 7, y + 121),
				Vector2i(x + w - 9, y + 121)
			]
			for rv in rivets:
				if rv.x >= 0 and rv.x < 511 and rv.y >= 0 and rv.y < 511:
					for dx in range(2):
						for dy in range(2):
							img.set_pixel(rv.x + dx, rv.y + dy, col_bg)

			x += w

	var tex = ImageTexture.create_from_image(img)
	mat_floor.albedo_texture = tex
	mat_floor.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC
	mat_floor.uv1_scale = Vector3(5.0, 5.0, 1.0)

func _create_procedural_hazard_material() -> void:
	mat_hazard = StandardMaterial3D.new()
	mat_hazard.roughness = 0.55
	mat_hazard.metallic = 0.15
	mat_hazard.emission_enabled = true
	mat_hazard.emission_energy_multiplier = 1.0

	var img = Image.create(128, 128, false, Image.FORMAT_RGBA8)
	var col_amber = Color8(215, 165, 30)
	var col_dark = Color8(24, 24, 24)
	img.fill(col_amber)

	for py in range(128):
		var y_ratio = float(py) / 128.0
		var x_shift = y_ratio * 128.0
		for px in range(128):
			var sample_x = px - x_shift
			var stripe_mod = fposmod(sample_x, 24.0)
			if stripe_mod < 12.0:
				img.set_pixel(px, py, col_dark)

	var tex = ImageTexture.create_from_image(img)
	mat_hazard.albedo_texture = tex
	mat_hazard.emission_texture = tex
	mat_hazard.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC

# ------------------------------------------------------------------------------
# PRIMITIVE SHAPE BUILDERS
# ------------------------------------------------------------------------------
func add_box(w: float, h: float, d: float, mat: Material, pos: Vector3, ry: float = 0.0, collide: bool = true, parent: Node = null) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var b_mesh = BoxMesh.new()
	b_mesh.size = Vector3(w, h, d)
	mi.mesh = b_mesh
	mi.material_override = mat
	mi.position = pos
	if ry != 0.0:
		mi.rotation.y = ry
	(parent if parent else self).add_child(mi)

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
		(parent if parent else self).add_child(sb)

	return mi

func add_cyl(r: float, h: float, mat: Material, pos: Vector3, n: int = 24, collide: bool = true, parent: Node = null) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var c_mesh = CylinderMesh.new()
	c_mesh.top_radius = r
	c_mesh.bottom_radius = r
	c_mesh.height = h
	c_mesh.radial_segments = n
	mi.mesh = c_mesh
	mi.material_override = mat
	mi.position = pos
	(parent if parent else self).add_child(mi)

	if collide:
		var sb = StaticBody3D.new()
		var cs = CollisionShape3D.new()
		var sh = CylinderShape3D.new()
		sh.radius = r
		sh.height = h
		cs.shape = sh
		sb.add_child(cs)
		sb.position = pos
		(parent if parent else self).add_child(sb)

	return mi

func add_torus(r_center: float, r_tube: float, mat: Material, pos: Vector3, parent: Node = null) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var t_mesh = TorusMesh.new()
	t_mesh.inner_radius = max(0.01, r_center - r_tube)
	t_mesh.outer_radius = r_center + r_tube
	t_mesh.rings = 36
	t_mesh.ring_segments = 12
	mi.mesh = t_mesh
	mi.material_override = mat
	mi.position = pos
	(parent if parent else self).add_child(mi)
	return mi

func add_annulus(r0: float, r1: float, h: float, mat: Material, pos: Vector3, parent: Node = null, n: int = 36) -> MeshInstance3D:
	var st = SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	for i in range(n):
		var a1 = float(i) / float(n) * TAU
		var a2 = float(i + 1) / float(n) * TAU
		var cos1 = cos(a1)
		var sin1 = sin(a1)
		var cos2 = cos(a2)
		var sin2 = sin(a2)

		st.set_normal(Vector3.UP)
		st.add_vertex(Vector3(r0 * cos1, h * 0.5, r0 * sin1))
		st.add_vertex(Vector3(r1 * cos1, h * 0.5, r1 * sin1))
		st.add_vertex(Vector3(r1 * cos2, h * 0.5, r1 * sin2))

		st.add_vertex(Vector3(r0 * cos1, h * 0.5, r0 * sin1))
		st.add_vertex(Vector3(r1 * cos2, h * 0.5, r1 * sin2))
		st.add_vertex(Vector3(r0 * cos2, h * 0.5, r0 * sin2))

		var n1 = Vector3(cos1, 0, sin1)
		var n2 = Vector3(cos2, 0, sin2)
		st.set_normal(n1)
		st.add_vertex(Vector3(r1 * cos1, -h * 0.5, r1 * sin1))
		st.set_normal(n2)
		st.add_vertex(Vector3(r1 * cos2, h * 0.5, r1 * sin2))
		st.set_normal(n1)
		st.add_vertex(Vector3(r1 * cos1, h * 0.5, r1 * sin1))

		st.set_normal(n1)
		st.add_vertex(Vector3(r1 * cos1, -h * 0.5, r1 * sin1))
		st.set_normal(n2)
		st.add_vertex(Vector3(r1 * cos2, -h * 0.5, r1 * sin2))
		st.set_normal(n2)
		st.add_vertex(Vector3(r1 * cos2, h * 0.5, r1 * sin2))
	var m = st.commit()
	var mi = MeshInstance3D.new()
	mi.mesh = m
	mi.material_override = mat
	mi.position = pos
	(parent if parent else self).add_child(mi)
	return mi

func add_pipe(x1: float, y1: float, x2: float, y2: float, y: float, r: float, mat: Material) -> void:
	var a = Vector3(x_coord(x1), y, z_coord(y1))
	var b = Vector3(x_coord(x2), y, z_coord(y2))
	var d = b - a
	var l = d.length()
	if l < 0.05:
		return

	var mi = MeshInstance3D.new()
	var cm = CylinderMesh.new()
	cm.top_radius = r
	cm.bottom_radius = r
	cm.height = l
	cm.radial_segments = 10
	mi.mesh = cm
	mi.material_override = mat
	mi.position = (a + b) * 0.5

	var up = Vector3.UP
	var dir = d.normalized()
	if abs(up.dot(dir)) < 0.999:
		var axis = up.cross(dir).normalized()
		var angle = acos(clamp(up.dot(dir), -1.0, 1.0))
		mi.basis = Basis(axis, angle)
	add_child(mi)

	var steps = int(l / 4.0)
	for k in range(steps + 1):
		var frac = (float(k) * 4.0) / l
		var q = a.lerp(b, frac)
		add_box(0.25, 0.25, 0.25, mat_dk, q, 0.0, false)

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
	add_box(l, H, TH, mat_side, center, angle, true)

func post(px: float, py: float, m: Material) -> void:
	add_box(0.5, H, 0.5, mat_gun, Vector3(x_coord(px), H * 0.5, z_coord(py)), 0.0, true)
	add_box(0.14, 0.14, 0.14, m, Vector3(x_coord(px), 3.2, z_coord(py) + 0.28), 0.0, false)

func wl(x1: float, y1: float, x2: float, y2: float, gs: Array = []) -> void:
	var sorted_gs = gs.duplicate()
	sorted_gs.sort_custom(func(a, b): return a[0] < b[0])
	var hor = (y1 == y2)
	var cur = x1 if hor else y1
	var end_val = x2 if hor else y2

	for gap in sorted_gs:
		var cc = gap[0]
		var w = gap[1]
		var st = gap[2] if gap.size() > 2 else ""
		var a = cc - w * 0.5
		var b = cc + w * 0.5
		var hl = w * S

		if hor:
			seg(cur, y1, a, y1)
		else:
			seg(x1, cur, x1, a)
		cur = b

		var post_mat = mat_rd if st == "c" else mat_am
		post(a if hor else x1, y1 if hor else a, post_mat)
		post(b if hor else x1, y1 if hor else b, post_mat)

		if hor:
			add_box(hl, 0.7, TH, mat_gun, Vector3(x_coord(cc), H - 0.35, z_coord(y1)), 0.0, false)
		else:
			add_box(TH, 0.7, hl, mat_gun, Vector3(x_coord(x1), H - 0.35, z_coord(cc)), 0.0, false)

		if st == "c" or st == "p":
			var f = 1.0 if st == "c" else 0.5
			var l_door = (hl - 0.1) * f
			var off = (hl - 0.1 - l_door) * 0.5
			if hor:
				add_box(l_door, H - 0.7, 0.3, mat_rm, Vector3(x_coord(cc) - off, (H - 0.7) * 0.5, z_coord(y1)), 0.0, true)
				add_box(l_door, 0.12, 0.34, mat_am, Vector3(x_coord(cc) - off, 2.0, z_coord(y1)), 0.0, false)
			else:
				add_box(0.3, H - 0.7, l_door, mat_rm, Vector3(x_coord(x1), (H - 0.7) * 0.5, z_coord(cc) - off), 0.0, true)
				add_box(0.34, 0.12, l_door, mat_am, Vector3(x_coord(x1), 2.0, z_coord(cc) - off), 0.0, false)
		else:
			if hor:
				add_box(hl, 0.04, 0.5, mat_dk, Vector3(x_coord(cc), 0.02, z_coord(y1)), 0.0, false)
			else:
				add_box(0.5, 0.04, hl, mat_dk, Vector3(x_coord(x1), 0.02, z_coord(cc)), 0.0, false)

	if hor:
		seg(cur, y1, end_val, y1)
	else:
		seg(x1, cur, x1, end_val)

func room(x1: float, y1: float, x2: float, y2: float, d: Dictionary = {}) -> void:
	wl(x1, y1, x2, y1, d.get("N", []))
	wl(x1, y2, x2, y2, d.get("S", []))
	wl(x1, y1, x1, y2, d.get("W", []))
	wl(x2, y1, x2, y2, d.get("E", []))

func rfloor(x1: float, y1: float, x2: float, y2: float) -> void:
	var rw = (x2 - x1) * S
	var rd = (y2 - y1) * S
	add_box(rw, 0.08, rd, mat_rm, Vector3(x_coord((x1 + x2) * 0.5), 0.04, z_coord((y1 + y2) * 0.5)), 0.0, false)

func blast_archway(px: float, py: float, hor: bool, w: float) -> void:
	var l_len = w * S
	if hor:
		add_box(l_len, 0.8, 0.9, mat_gun, Vector3(x_coord(px), H - 0.4, z_coord(py)), 0.0, false)
		add_box(l_len * 0.25, H - 0.8, 0.4, mat_rm, Vector3(x_coord(px) - l_len * 0.38, (H - 0.8) * 0.5, z_coord(py)), 0.0, true)
		add_box(l_len * 0.25, H - 0.8, 0.4, mat_rm, Vector3(x_coord(px) + l_len * 0.38, (H - 0.8) * 0.5, z_coord(py)), 0.0, true)
		add_box(0.2, 0.2, 0.2, mat_am, Vector3(x_coord(px), 3.2, z_coord(py) + 0.4), 0.0, false)
	else:
		add_box(0.9, 0.8, l_len, mat_gun, Vector3(x_coord(px), H - 0.4, z_coord(py)), 0.0, false)
		add_box(0.4, H - 0.8, l_len * 0.25, mat_rm, Vector3(x_coord(px), (H - 0.8) * 0.5, z_coord(py) - l_len * 0.38), 0.0, true)
		add_box(0.4, H - 0.8, l_len * 0.25, mat_rm, Vector3(x_coord(px), (H - 0.8) * 0.5, z_coord(py) + l_len * 0.38), 0.0, true)
		add_box(0.2, 0.2, 0.2, mat_am, Vector3(x_coord(px), 3.2, z_coord(py) + 0.4), 0.0, false)

# ------------------------------------------------------------------------------
# COMPLETE ENVIRONMENT BUILDER
# ------------------------------------------------------------------------------
func _build_environment() -> void:
	# 1. Main Floor Plane (84m x 90m, clean reflective steel plate grating)
	add_box(84.0, 1.0, 90.0, mat_floor, Vector3(x_coord(146), -0.5, z_coord(210)), 0.0, true)

	# 2. 13 Architectural Bunker Rooms
	var room_data = [
		[20, 75, 75, 135, {"S": [[48, 14]], "E": [[105, 14]]}],
		[85, 75, 130, 125, {"S": [[108, 14]], "W": [[100, 12]]}],
		[160, 75, 215, 125, {"W": [[100, 12]], "S": [[190, 14, "p"]]}],
		[225, 75, 272, 150, {"W": [[110, 14]], "S": [[250, 12]]}],
		[20, 150, 60, 260, {"E": [[205, 14]], "N": [[40, 12]]}],
		[20, 275, 75, 345, {"N": [[45, 14]], "E": [[310, 12]]}],
		[75, 150, 105, 240, {"N": [[90, 10]], "S": [[90, 10, "c"]], "E": [[200, 12]]}],
		[118, 170, 182, 232, {"N": [[150, 16]], "S": [[150, 16]], "W": [[200, 16]], "E": [[200, 16]]}],
		[198, 160, 272, 230, {"W": [[200, 14]], "S": [[240, 12]]}],
		[198, 245, 272, 290, {"W": [[268, 12]], "N": [[240, 12]]}],
		[85, 255, 140, 345, {"N": [[110, 14]], "E": [[300, 12]]}],
		[150, 255, 200, 345, {"N": [[175, 14]], "W": [[300, 12, "c"]], "E": [[310, 12]]}],
		[220, 305, 275, 350, {"W": [[325, 14]], "N": [[245, 14]]}]
	]
	for r in room_data:
		rfloor(r[0], r[1], r[2], r[3])
		room(r[0], r[1], r[2], r[3], r[4])

	# 3. Perimeter Enclosure Walls
	wl(12, 65, 280, 65)
	wl(12, 355, 280, 355)
	wl(12, 65, 12, 355)
	wl(280, 65, 280, 355)

	# 4. 18 Structural Perimeter Buttress Columns
	for i in range(9):
		var x_pos = 12.0 + i * 33.5
		add_box(0.9, H + 0.4, 0.9, mat_st, Vector3(x_coord(x_pos), H * 0.5, z_coord(65) + 0.7), 0.0, true)
		add_box(0.9, H + 0.4, 0.9, mat_st, Vector3(x_coord(x_pos), H * 0.5, z_coord(355) - 0.7), 0.0, true)

	# 5. Corridor Blast Archways (Unobstructed sightlines and clear extraction corridor!)
	blast_archway(80, 95, true, 10)
	blast_archway(145, 300, true, 10)

	# 6. Central Objective Core Station (at X(150), Z(201))
	var oc_node = Node3D.new()
	var oc_x = x_coord(150)
	var oc_z = z_coord(201)
	oc_node.position = Vector3(oc_x, 0.0, oc_z)
	add_child(oc_node)

	add_box(12.0, 0.35, 12.0, mat_dk, Vector3(0, 0.18, 0), 0.0, true, oc_node)
	add_cyl(5.0 * 0.5, 0.6, mat_st, Vector3(0, 0.5, 0), 8, true, oc_node)
	add_annulus(3.6 * 0.5, 4.4 * 0.5, 0.15, mat_gun, Vector3(0, 0.80, 0), oc_node)
	add_annulus(2.6 * 0.5, 3.4 * 0.5, 0.10, mat_am, Vector3(0, 0.82, 0), oc_node)
	add_annulus(1.6 * 0.5, 2.4 * 0.5, 0.20, mat_gun, Vector3(0, 0.84, 0), oc_node)

	for k in range(8):
		var a = float(k) / 8.0 * TAU + PI / 8.0
		var pos = Vector3(3.7 * cos(a), 0.95, 3.7 * sin(a))
		add_box(0.5, 0.3, 1.4, mat_st, pos, -a, false, oc_node)

	add_cyl(0.9 * 0.5, 1.1, mat_gun, Vector3(0, 1.5, 0), 16, true, oc_node)
	add_cyl(0.62 * 0.5, 1.4, mat_dk, Vector3(0, 2.4, 0), 16, true, oc_node)

	for k in range(4):
		var a = float(k) / 4.0 * TAU + PI / 4.0
		var pos = Vector3(0.8 * cos(a), 2.5, 0.8 * sin(a))
		add_box(0.12, 1.6, 0.5, mat_st, pos, -a, false, oc_node)

	objective_orb = MeshInstance3D.new()
	var orb_mesh = SphereMesh.new()
	orb_mesh.radius = 0.38
	orb_mesh.height = 0.76
	orb_mesh.radial_segments = 24
	orb_mesh.rings = 14
	objective_orb.mesh = orb_mesh
	var mat_emit = StandardMaterial3D.new()
	mat_emit.albedo_color = Color(1.0, 0.80, 0.40)
	mat_emit.emission_enabled = true
	mat_emit.emission = Color(1.0, 0.80, 0.40)
	mat_emit.emission_energy_multiplier = 4.5
	objective_orb.material_override = mat_emit
	objective_orb.position = Vector3(0, 3.4, 0)
	oc_node.add_child(objective_orb)

	add_torus(0.7, 0.05, mat_am, Vector3(0, 3.4, 0), oc_node)

	objective_light = OmniLight3D.new()
	objective_light.light_color = Color(1.0, 0.64, 0.22)
	objective_light.light_energy = 2.8
	objective_light.omni_range = 26.0
	objective_light.position = Vector3(0, 3.4, 0)
	oc_node.add_child(objective_light)

	# 7. 15 Server Cabinets / Racks
	var cabs = [
		[170, 80], [185, 80], [200, 80], [30, 310], [30, 325], [30, 340],
		[250, 258], [255, 170], [265, 170], [232, 255], [245, 255], [258, 255],
		[30, 160], [30, 175], [160, 262]
	]
	for i in range(cabs.size()):
		var cp = cabs[i]
		var cx = x_coord(cp[0])
		var cz = z_coord(cp[1])
		var c_node = Node3D.new()
		c_node.position = Vector3(cx, 0.0, cz)
		add_child(c_node)
		add_box(1.1, 2.3, 0.8, mat_gun, Vector3(0, 1.15, 0), 0.0, true, c_node)
		add_box(0.9, 0.05, 0.05, mat_dk, Vector3(0, 1.15, 0.41), 0.0, false, c_node)
		var led_mat = mat_cy if (i % 3 != 0) else mat_am
		add_box(0.7, 0.1, 0.04, led_mat, Vector3(0, 1.9, 0.41), 0.0, false, c_node)
		add_box(0.5, 0.3, 0.04, mat_dk, Vector3(0, 0.5, 0.41), 0.0, false, c_node)

	# 8. 4 Heavy Industrial Power Generators
	for gp in [[117, 100], [235, 195], [175, 310], [100, 300]]:
		var gx = x_coord(gp[0])
		var gz = z_coord(gp[1])
		var g_node = Node3D.new()
		g_node.position = Vector3(gx, 0.0, gz)
		add_child(g_node)
		add_cyl(1.7 * 0.5, 0.4, mat_dk, Vector3(0, 0.2, 0), 20, true, g_node)
		add_cyl(1.5 * 0.5, 3.0, mat_gun, Vector3(0, 1.9, 0), 20, true, g_node)
		for h_step in [1.0, 2.0, 3.0]:
			add_torus(1.52 * 0.5, 0.08, mat_st, Vector3(0, h_step + 0.4, 0), g_node)
		add_cyl(1.2 * 0.5, 0.3, mat_st, Vector3(0, 3.5, 0), 16, false, g_node)
		add_box(1.4, 0.1, 0.5, mat_dk, Vector3(0, 3.7, 0), 0.0, false, g_node)
		for k in range(3):
			var a = k * 2.1
			add_cyl(0.18, 4.0, mat_cu, Vector3(1.7 * cos(a), 2.0, 1.7 * sin(a)), 10, false, g_node)
		add_box(0.2, 0.2, 0.2, mat_am, Vector3(0, 3.2, 1.52), 0.0, false, g_node)

	# 9. 4 Hydraulic Pump Stations
	for pp in [[40, 300], [225, 110], [47, 205], [240, 115]]:
		var px_pos = x_coord(pp[0])
		var pz_pos = z_coord(pp[1])
		var p_node = Node3D.new()
		p_node.position = Vector3(px_pos, 0.0, pz_pos)
		add_child(p_node)
		add_box(2.4, 0.3, 1.2, mat_dk, Vector3(0, 0.15, 0), 0.0, true, p_node)
		var hcyl = MeshInstance3D.new()
		var hcm = CylinderMesh.new()
		hcm.top_radius = 0.55 * 0.5
		hcm.bottom_radius = 0.55 * 0.5
		hcm.height = 2.2
		hcm.radial_segments = 16
		hcyl.mesh = hcm
		hcyl.material_override = mat_gun
		hcyl.position = Vector3(0, 0.9, 0)
		hcyl.rotation.z = PI * 0.5
		p_node.add_child(hcyl)
		for off in [-0.8, 0.8]:
			add_cyl(0.15, 1.0, mat_cu, Vector3(off, 1.7, 0), 8, false, p_node)
		add_box(0.3, 0.3, 0.3, mat_am, Vector3(0, 1.6, 0.6), 0.0, false, p_node)

	# 10. 5 Computer Workstations / Consoles
	for cnp in [[250, 100], [265, 100], [100, 170], [230, 275], [240, 140]]:
		var cx = x_coord(cnp[0])
		var cz = z_coord(cnp[1])
		var con_node = Node3D.new()
		con_node.position = Vector3(cx, 0.0, cz)
		add_child(con_node)
		add_box(1.8, 1.0, 0.8, mat_gun, Vector3(0, 0.5, 0), 0.0, true, con_node)
		var sc = add_box(1.4, 0.5, 0.06, mat_cy, Vector3(0, 1.3, -0.2), 0.0, false, con_node)
		sc.rotation.x = -0.5

	# 11. 9 Cargo Crate Clusters
	for cr in [[30, 100], [45, 125], [100, 110], [110, 330], [130, 335], [190, 335], [60, 285], [65, 330], [265, 285]]:
		var cx = x_coord(cr[0])
		var cz = z_coord(cr[1])
		add_box(1.2, 1.0, 1.2, mat_rm, Vector3(cx, 0.5, cz), 0.0, true)
		add_box(1.25, 0.1, 1.25, mat_st, Vector3(cx, 1.02, cz), 0.0, false)

	# 12. Heavy Perimeter Utility Pipelines
	add_pipe(16, 70, 16, 350, 4.1, 0.18, mat_cu)
	add_pipe(16, 70, 16, 350, 3.7, 0.12, mat_st)
	add_pipe(18, 69, 275, 69, 4.1, 0.20, mat_cu)
	add_pipe(18, 351, 275, 351, 4.1, 0.20, mat_cu)
	add_pipe(276, 70, 276, 350, 4.0, 0.16, mat_st)
	add_pipe(146, 128, 146, 168, 4.2, 0.14, mat_cu)
	add_pipe(80, 250, 80, 290, 4.2, 0.14, mat_st)

	# 13. 6 Floor Traps with Diagonal Hazard Chevron Stripes
	for tp in [[148, 142], [103, 200], [197, 200], [148, 250], [240, 297], [80, 185]]:
		var tx = x_coord(tp[0])
		var tz = z_coord(tp[1])
		var t_node = Node3D.new()
		t_node.position = Vector3(tx, 0.0, tz)
		add_child(t_node)
		add_box(3.4, 0.06, 3.4, mat_dk, Vector3(0, 0.03, 0), 0.0, false, t_node)
		for cp in [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]:
			add_box(1.4, 0.1, 1.4, mat_st, Vector3(cp[0], 0.08, cp[1]), 0.0, false, t_node)
			add_cyl(0.06, 0.1, mat_gun, Vector3(cp[0], 0.16, cp[1]), 6, false, t_node)
		for rp in [[-1.6, -1.6], [1.6, 1.6]]:
			add_box(0.15, 0.15, 0.15, mat_rd, Vector3(rp[0], 0.1, rp[1]), 0.0, false, t_node)
		add_box(3.4, 0.02, 0.35, mat_hazard, Vector3(0, 0.07, -1.9), 0.0, false, t_node)

	# 14. Spawn Pads & Animated Holographic Beacons
	# Runner Spawn -> Cyan Hologram (Central West concourse)
	var rx = -8.0
	var rz = 4.0
	var r_spawn_node = Node3D.new()
	r_spawn_node.position = Vector3(rx, 0.0, rz)
	add_child(r_spawn_node)
	add_cyl(2.4 * 0.5, 0.25, mat_dk, Vector3(0, 0.13, 0), 36, false, r_spawn_node)
	add_torus(2.0 * 0.5, 0.05, mat_cy, Vector3(0, 0.28, 0), r_spawn_node)
	add_torus(1.2 * 0.5, 0.03, mat_cy, Vector3(0, 0.30, 0), r_spawn_node)

	var r_holo = MeshInstance3D.new()
	var oct_mesh = CylinderMesh.new()
	oct_mesh.top_radius = 0.0
	oct_mesh.bottom_radius = 0.55
	oct_mesh.height = 1.1
	oct_mesh.radial_segments = 4
	r_holo.mesh = oct_mesh
	r_holo.material_override = mat_cy
	r_holo.position = Vector3(0, 1.5, 0)
	r_spawn_node.add_child(r_holo)
	anim_holograms.append(r_holo)

	var r_light = OmniLight3D.new()
	r_light.light_color = Color(0.125, 0.784, 1.0)
	r_light.light_energy = 2.4
	r_light.omni_range = 20.0
	r_light.position = Vector3(0, 2.6, 0)
	r_spawn_node.add_child(r_light)

	# Saboteur Spawn -> Crimson Hologram (Central East concourse)
	var sx = 8.0
	var sz = -4.0
	var s_spawn_node = Node3D.new()
	s_spawn_node.position = Vector3(sx, 0.0, sz)
	add_child(s_spawn_node)
	add_cyl(2.4 * 0.5, 0.25, mat_dk, Vector3(0, 0.13, 0), 36, false, s_spawn_node)
	add_torus(2.0 * 0.5, 0.05, mat_rd, Vector3(0, 0.28, 0), s_spawn_node)
	add_torus(1.2 * 0.5, 0.03, mat_rd, Vector3(0, 0.30, 0), s_spawn_node)

	var s_holo = MeshInstance3D.new()
	var cone_mesh = CylinderMesh.new()
	cone_mesh.top_radius = 0.0
	cone_mesh.bottom_radius = 0.5
	cone_mesh.height = 1.0
	cone_mesh.radial_segments = 3
	s_holo.mesh = cone_mesh
	s_holo.material_override = mat_rd
	s_holo.position = Vector3(0, 1.5, 0)
	s_spawn_node.add_child(s_holo)
	anim_holograms.append(s_holo)

	var s_light = OmniLight3D.new()
	s_light.light_color = Color(1.0, 0.165, 0.102)
	s_light.light_energy = 2.4
	s_light.omni_range = 20.0
	s_light.position = Vector3(0, 2.6, 0)
	s_spawn_node.add_child(s_light)

	# 15. HIGH-VISIBILITY EXTRACTION PORTAL LANDMARK (Around ExitZone at X=0, Z=-24.0)
	_build_extraction_portal_landmark()

	# 16. SUBTERRANEAN VAULT 3D BACKDROP & SILO CONTAINMENT (Cures Black Background completely!)
	_build_subterranean_vault_backdrop()

	# 17. BALANCED PRACTICAL ILLUMINATION NETWORK (18 Facility Luminaires)
	var lights_data = [
		[40, 200, Color(1.0, 0.165, 0.102)],  # Red security beacon
		[47, 310, Color(1.0, 0.604, 0.188)],  # Amber industrial
		[190, 100, Color(1.0, 0.604, 0.188)], # Amber industrial
		[235, 195, Color(1.0, 0.165, 0.102)], # Red security beacon
		[175, 300, Color(1.0, 0.604, 0.188)], # Amber industrial
		[110, 100, Color(1.0, 0.604, 0.188)], # Amber industrial
		[100, 300, Color(1.0, 0.165, 0.102)], # Red security beacon
		# Quadrant fill luminaires
		[60, 105, Color(1.0, 0.85, 0.55)],   # NW quadrant warm fill
		[240, 105, Color(1.0, 0.85, 0.55)],  # NE quadrant warm fill
		[50, 260, Color(1.0, 0.85, 0.55)],   # SW quadrant warm fill
		[240, 260, Color(1.0, 0.85, 0.55)],  # SE quadrant warm fill
		# North extraction corridor route lighting (guiding player to exit)
		[146, 85, Color(0.20, 0.85, 1.0)],   # North corridor entrance portal illumination
		[146, 115, Color(1.0, 0.85, 0.55)],  # North passage mid-way light
		[146, 145, Color(1.0, 0.85, 0.55)],  # North dais junction light
		# Center & West / East cross corridors
		[146, 210, Color(1.0, 0.85, 0.55)],  # Central core south approach
		[100, 210, Color(1.0, 0.85, 0.55)],  # West central connector
		[195, 210, Color(1.0, 0.85, 0.55)],  # East central connector
		[146, 280, Color(1.0, 0.85, 0.55)]   # South central thoroughfare
	]
	for lp in lights_data:
		var lx = x_coord(lp[0])
		var lz = z_coord(lp[1])
		var pl = OmniLight3D.new()
		pl.light_color = lp[2]
		pl.light_energy = 1.8
		pl.omni_range = 20.0
		pl.position = Vector3(lx, 3.4, lz)
		add_child(pl)
		var housing_mat = mat_rd if (lp[2].r > 0.9 and lp[2].g < 0.25) else (mat_cy if lp[2].b > 0.9 else mat_yl)
		add_box(0.4, 0.12, 0.4, housing_mat, Vector3(lx, H - 0.1, lz), 0.0, false)

	# 18. 5 Functional Lethal Laser Barriers (Chokepoint Security Grid)
	var lasers = [
		[132, 160, 160, 160], # Central Core North Entrance
		[132, 260, 160, 260], # Central Core South Entrance
		[86, 200, 118, 200],  # West Bunker Security Choke
		[174, 200, 206, 200], # East Bunker Security Choke
		[226, 140, 258, 140]  # East High-Radiation Passage
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

		var barrier_beams: Array[MeshInstance3D] = []
		for ly in [0.5, 1.2, 1.9]:
			var beam = add_box(ll, 0.07, 0.07, mat_laser_active, Vector3(l_center.x, ly, l_center.z), la, false)
			barrier_beams.append(beam)

		# End posts
		for pt in [Vector3(lax, 0.0, laz), Vector3(lbx, 0.0, lbz)]:
			add_box(0.5, 2.4, 0.5, mat_gun, Vector3(pt.x, 1.2, pt.z), 0.0, true)
			add_box(0.25, 0.25, 0.25, mat_rd, Vector3(pt.x, 2.5, pt.z), 0.0, false)

		var l_light = OmniLight3D.new()
		l_light.light_color = Color(1.0, 0.165, 0.165)
		l_light.light_energy = 1.6
		l_light.omni_range = 10.0
		l_light.position = Vector3(l_center.x, 1.5, l_center.z)
		add_child(l_light)

		# Functional trigger area on layer 8, mask 2
		var area = Area3D.new()
		area.collision_layer = 8
		area.collision_mask = 2 # Detect PlayerController on layer 2
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
			"light": l_light
		}
		laser_barrier_data.append(data)
		area.body_entered.connect(func(body): _on_laser_body_entered(body, data))

# ------------------------------------------------------------------------------
# HIGH-VISIBILITY EXTRACTION PORTAL LANDMARK AT (0, 0, -24.0)
# ------------------------------------------------------------------------------
func _build_extraction_portal_landmark() -> void:
	var portal_z = -24.0
	var portal_node = Node3D.new()
	portal_node.position = Vector3(0.0, 0.0, portal_z)
	add_child(portal_node)

	# Flanking Gateway Tower Pylons (Left & Right)
	for side_x in [-2.8, 2.8]:
		add_box(0.8, 4.6, 0.8, mat_st, Vector3(side_x, 2.3, 0.0), 0.0, true, portal_node)
		add_box(0.6, 3.8, 0.1, mat_hazard, Vector3(side_x, 2.0, 0.45), 0.0, false, portal_node)
		add_box(0.3, 0.3, 0.3, mat_cy, Vector3(side_x, 4.75, 0.0), 0.0, false, portal_node)
		var p_light = OmniLight3D.new()
		p_light.light_color = Color(0.2, 0.85, 1.0)
		p_light.light_energy = 2.4
		p_light.omni_range = 12.0
		p_light.position = Vector3(side_x, 4.75, 0.2)
		portal_node.add_child(p_light)

	# Overhead Gateway Arch Cross-Beam
	add_box(6.4, 0.6, 0.9, mat_st, Vector3(0.0, 4.3, 0.0), 0.0, true, portal_node)
	add_box(5.6, 0.12, 0.94, mat_hazard, Vector3(0.0, 4.0, 0.0), 0.0, false, portal_node)

	# Dedicated High-Intensity Extraction Floodlight
	exit_beacon_light = OmniLight3D.new()
	exit_beacon_light.light_color = Color(0.25, 0.90, 1.0)
	exit_beacon_light.light_energy = 3.6
	exit_beacon_light.omni_range = 22.0
	exit_beacon_light.position = Vector3(0.0, 4.0, 1.5)
	portal_node.add_child(exit_beacon_light)

	# Floor Approach Runway Chevron Striping (Guiding players straight to the extraction pad)
	for r_step in range(1, 5):
		var z_off = float(r_step) * 1.6
		add_box(4.0, 0.02, 0.4, mat_hazard, Vector3(0.0, 0.02, z_off), 0.0, false, portal_node)

	# Extraction Portal Overhead HUD / 3D Signboard
	var sign_label = Label3D.new()
	sign_label.text = "◄ EXTRACTION GATE // SECTOR EXIT ►"
	sign_label.font_size = 32
	sign_label.outline_size = 8
	sign_label.outline_modulate = Color(0, 0, 0, 0.95)
	sign_label.modulate = Color(0.25, 0.95, 1.0)
	sign_label.billboard = BaseMaterial3D.BILLBOARD_FIXED_Y
	sign_label.position = Vector3(0.0, 4.9, 0.2)
	portal_node.add_child(sign_label)

# ------------------------------------------------------------------------------
# SUBTERRANEAN VAULT 3D BACKDROP & SILO CONTAINMENT
# Completely cures black background void with believable 3D underground structures
# ------------------------------------------------------------------------------
func _build_subterranean_vault_backdrop() -> void:
	var bg_node = Node3D.new()
	add_child(bg_node)

	# Massive surrounding subterranean containment bulkhead silo walls (height 22m, Y=11m)
	add_box(130.0, 22.0, 3.0, mat_side, Vector3(0.0, 11.0, -56.0), 0.0, false, bg_node)
	add_box(130.0, 22.0, 3.0, mat_side, Vector3(0.0, 11.0, 56.0), 0.0, false, bg_node)
	add_box(3.0, 22.0, 130.0, mat_side, Vector3(-54.0, 11.0, 0.0), 0.0, false, bg_node)
	add_box(3.0, 22.0, 130.0, mat_side, Vector3(54.0, 11.0, 0.0), 0.0, false, bg_node)

	# Structural vertical pilasters along outer backdrop walls
	for i in range(-2, 3):
		var p_x = float(i) * 24.0
		add_box(2.4, 22.0, 2.4, mat_gun, Vector3(p_x, 11.0, -54.5), 0.0, false, bg_node)
		add_box(2.4, 22.0, 2.4, mat_gun, Vector3(p_x, 11.0, 54.5), 0.0, false, bg_node)
	for i in range(-2, 3):
		var p_z = float(i) * 24.0
		add_box(2.4, 22.0, 2.4, mat_gun, Vector3(-52.5, 11.0, p_z), 0.0, false, bg_node)
		add_box(2.4, 22.0, 2.4, mat_gun, Vector3(52.5, 11.0, p_z), 0.0, false, bg_node)

	# High-altitude industrial catwalks at Y = 16.0m
	add_box(115.0, 0.4, 3.5, mat_dk, Vector3(0.0, 16.0, -51.0), 0.0, false, bg_node)
	add_box(115.0, 0.4, 3.5, mat_dk, Vector3(0.0, 16.0, 51.0), 0.0, false, bg_node)
	add_box(3.5, 0.4, 115.0, mat_dk, Vector3(-49.0, 16.0, 0.0), 0.0, false, bg_node)
	add_box(3.5, 0.4, 115.0, mat_dk, Vector3(49.0, 16.0, 0.0), 0.0, false, bg_node)

	# Distant atmospheric ventilation exhaust hubs with glowing status lights
	for pos in [Vector3(-36.0, 18.0, -53.0), Vector3(36.0, 18.0, -53.0), Vector3(-36.0, 18.0, 53.0), Vector3(36.0, 18.0, 53.0)]:
		add_cyl(3.2, 2.0, mat_gun, pos, 16, false, bg_node)
		var vent_light = OmniLight3D.new()
		vent_light.light_color = Color(0.2, 0.85, 1.0)
		vent_light.light_energy = 2.2
		vent_light.omni_range = 18.0
		vent_light.position = pos + Vector3(0.0, -1.0, 1.0)
		bg_node.add_child(vent_light)

# ------------------------------------------------------------------------------
# LETHAL LASER GAMEPLAY LOGIC & STATE CYCLING
# ------------------------------------------------------------------------------
func _on_laser_body_entered(body: Node3D, _barrier: Dictionary) -> void:
	if current_laser_state != LaserState.ACTIVE:
		return
	if body is PlayerController:
		if body.is_eliminated:
			return # Single-trigger guard prevents duplicate elimination
		body.eliminate()
		if has_node("/root/AudioManager"):
			get_node("/root/AudioManager").play_sfx("sabotage_activate")
		var arena = get_parent()
		if arena and arena.has_method("_show_notification"):
			arena._show_notification("⚡ ALERT: Player %d Eliminated by Active Complex Laser Barrier! ⚡" % body.player_id)

func process_lasers(delta: float) -> void:
	laser_cycle_timer -= delta
	match current_laser_state:
		LaserState.ACTIVE:
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.WARNING, 1.5)
		LaserState.WARNING:
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.DISARMED, 2.5)
		LaserState.DISARMED:
			if laser_cycle_timer <= 0.0:
				_set_lasers_state(LaserState.ACTIVE, 4.5)

func _set_lasers_state(new_state: LaserState, duration: float) -> void:
	current_laser_state = new_state
	laser_cycle_timer = duration
	for d in laser_barrier_data:
		var mat = mat_laser_active
		var col = Color(1.0, 0.165, 0.165)
		var energy = 1.6
		var col_disabled = false
		if new_state == LaserState.WARNING:
			mat = mat_laser_warning
			col = Color(1.0, 0.7, 0.1)
			energy = 2.5
		elif new_state == LaserState.DISARMED:
			mat = mat_laser_disarmed
			col = Color(0.1, 0.9, 0.5)
			energy = 0.5
			col_disabled = true

		for b in d.beams:
			if b:
				b.material_override = mat
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
