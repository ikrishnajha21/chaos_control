extends Node3D
class_name EnvUndergroundComplex

const S: float = 0.296
const H: float = 4.8
const TH: float = 0.5

# Materials
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

# Laser Materials & State
var mat_laser_active: StandardMaterial3D
var mat_laser_warning: StandardMaterial3D
var mat_laser_disarmed: StandardMaterial3D

enum LaserState { ACTIVE, WARNING, DISARMED }
var laser_barrier_data: Array[Dictionary] = []
var laser_cycle_timer: float = 4.5
var current_laser_state: LaserState = LaserState.ACTIVE
var player_laser_cooldowns: Dictionary = {}

var objective_orb: MeshInstance3D

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func _process(delta: float) -> void:
	if objective_orb:
		var t = Time.get_ticks_msec() / 1000.0
		var s_factor = 1.0 + sin(t * 3.3) * 0.12
		objective_orb.scale = Vector3(s_factor, s_factor, s_factor)

func x_coord(p: float) -> float:
	return (p - 146.0) * S

func z_coord(p: float) -> float:
	return (p - 210.0) * S

func _init_materials() -> void:
	mat_side = StandardMaterial3D.new()
	mat_side.albedo_color = Color(0.149, 0.173, 0.204)
	mat_side.roughness = 0.65
	mat_side.metallic = 0.55

	mat_top = StandardMaterial3D.new()
	mat_top.albedo_color = Color(0.29, 0.325, 0.376)
	mat_top.roughness = 0.55
	mat_top.metallic = 0.4

	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.188, 0.208, 0.235)
	mat_gun.roughness = 0.5
	mat_gun.metallic = 0.8

	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.059, 0.067, 0.078)
	mat_dk.roughness = 0.8
	mat_dk.metallic = 0.4

	mat_st = StandardMaterial3D.new()
	mat_st.albedo_color = Color(0.29, 0.314, 0.345)
	mat_st.roughness = 0.45
	mat_st.metallic = 0.85

	mat_cu = StandardMaterial3D.new()
	mat_cu.albedo_color = Color(0.541, 0.322, 0.188)
	mat_cu.roughness = 0.5
	mat_cu.metallic = 0.85

	mat_am = StandardMaterial3D.new()
	mat_am.albedo_color = Color(1.0, 0.604, 0.165)
	mat_am.emission_enabled = true
	mat_am.emission = Color(1.0, 0.604, 0.165)
	mat_am.emission_energy_multiplier = 2.0

	mat_rd = StandardMaterial3D.new()
	mat_rd.albedo_color = Color(1.0, 0.165, 0.102)
	mat_rd.emission_enabled = true
	mat_rd.emission = Color(1.0, 0.165, 0.102)
	mat_rd.emission_energy_multiplier = 2.2

	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.125, 0.784, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.125, 0.784, 1.0)
	mat_cy.emission_energy_multiplier = 2.0

	mat_yl = StandardMaterial3D.new()
	mat_yl.albedo_color = Color(1.0, 0.816, 0.439)
	mat_yl.emission_enabled = true
	mat_yl.emission = Color(1.0, 0.816, 0.439)
	mat_yl.emission_energy_multiplier = 2.0

	mat_rm = StandardMaterial3D.new()
	mat_rm.albedo_color = Color(0.137, 0.149, 0.173)
	mat_rm.roughness = 0.7
	mat_rm.metallic = 0.5

	mat_floor = StandardMaterial3D.new()
	mat_floor.albedo_color = Color(0.063, 0.071, 0.078)
	mat_floor.roughness = 0.65
	mat_floor.metallic = 0.5

	mat_hazard = StandardMaterial3D.new()
	mat_hazard.albedo_color = Color(0.788, 0.588, 0.094)
	mat_hazard.emission_enabled = true
	mat_hazard.emission = Color(0.788, 0.588, 0.094)
	mat_hazard.emission_energy_multiplier = 0.7

	mat_laser_active = StandardMaterial3D.new()
	mat_laser_active.albedo_color = Color(1.0, 0.1, 0.1)
	mat_laser_active.emission_enabled = true
	mat_laser_active.emission = Color(1.0, 0.1, 0.1)
	mat_laser_active.emission_energy_multiplier = 3.5

	mat_laser_warning = StandardMaterial3D.new()
	mat_laser_warning.albedo_color = Color(1.0, 0.7, 0.1)
	mat_laser_warning.emission_enabled = true
	mat_laser_warning.emission = Color(1.0, 0.6, 0.1)
	mat_laser_warning.emission_energy_multiplier = 2.8

	mat_laser_disarmed = StandardMaterial3D.new()
	mat_laser_disarmed.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_laser_disarmed.albedo_color = Color(0.1, 0.9, 0.5, 0.2)
	mat_laser_disarmed.emission_enabled = true
	mat_laser_disarmed.emission = Color(0.1, 0.9, 0.5)
	mat_laser_disarmed.emission_energy_multiplier = 0.6

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

func add_cyl(r: float, h: float, mat: Material, pos: Vector3, n: int = 24, collide: bool = true) -> MeshInstance3D:
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
	
	# Orient cylinder along direction vector d
	var up = Vector3.UP
	var dir = d.normalized()
	if abs(up.dot(dir)) < 0.999:
		var axis = up.cross(dir).normalized()
		var angle = acos(clamp(up.dot(dir), -1.0, 1.0))
		mi.basis = Basis(axis, angle)
	add_child(mi)

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
	add_box(l + TH * 0.9, H, TH, mat_side, center, angle, true)

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

func blast_door(px: float, py: float, hor: bool, w: float) -> void:
	var l_len = w * S
	if hor:
		add_box(l_len, H - 0.7, 0.5, mat_rm, Vector3(x_coord(px), (H - 0.7) * 0.5, z_coord(py)), 0.0, true)
		add_box(l_len, 0.15, 0.54, mat_am, Vector3(x_coord(px), 1.4, z_coord(py)), 0.0, false)
		add_box(l_len, 0.8, 0.9, mat_gun, Vector3(x_coord(px), H - 0.4, z_coord(py)), 0.0, false)
		add_box(0.2, 0.2, 0.2, mat_rd, Vector3(x_coord(px), 2.6, z_coord(py) + 0.4), 0.0, false)
	else:
		add_box(0.5, H - 0.7, l_len, mat_rm, Vector3(x_coord(px), (H - 0.7) * 0.5, z_coord(py)), 0.0, true)
		add_box(0.54, 0.15, l_len, mat_am, Vector3(x_coord(px), 1.4, z_coord(py)), 0.0, false)
		add_box(0.9, 0.8, l_len, mat_gun, Vector3(x_coord(px), H - 0.4, z_coord(py)), 0.0, false)
		add_box(0.2, 0.2, 0.2, mat_rd, Vector3(x_coord(px), 2.6, z_coord(py) + 0.4), 0.0, false)

func _build_environment() -> void:
	# Main Floor (84m x 90m)
	add_box(84.0, 1.0, 90.0, mat_floor, Vector3(x_coord(146), -0.5, z_coord(210)), 0.0, true)

	# 13 Complex Rooms
	var room_data = [
		[20, 75, 75, 135, {"S": [[48, 14]], "E": [[105, 14]]}],
		[85, 75, 150, 125, {"S": [[118, 14]], "W": [[100, 12]]}],
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

	# Perimeter Enclosure Walls
	wl(12, 65, 280, 65)
	wl(12, 355, 280, 355)
	wl(12, 65, 12, 355)
	wl(280, 65, 280, 355)

	# Structural Perimeter Buttress Columns
	for i in range(9):
		var x_pos = 12.0 + i * 33.5
		add_box(0.9, H + 0.4, 0.9, mat_st, Vector3(x_coord(x_pos), H * 0.5, z_coord(65) + 0.7), 0.0, true)
		add_box(0.9, H + 0.4, 0.9, mat_st, Vector3(x_coord(x_pos), H * 0.5, z_coord(355) - 0.7), 0.0, true)

	# Blast Doors
	blast_door(80, 95, true, 10)
	blast_door(155, 100, true, 10)
	blast_door(145, 300, true, 10)

	# Central Objective Core (at X(150), Z(201))
	var oc_x = x_coord(150)
	var oc_z = z_coord(201)
	add_box(12.0, 0.35, 12.0, mat_dk, Vector3(oc_x, 0.18, oc_z), 0.0, true)
	add_cyl(5.0 * 0.5, 0.6, mat_st, Vector3(oc_x, 0.5, oc_z), 8, true)
	add_cyl(4.0 * 0.5, 0.2, mat_am, Vector3(oc_x, 0.8, oc_z), 16, false)
	add_cyl(0.9 * 0.5, 1.1, mat_gun, Vector3(oc_x, 1.5, oc_z), 16, true)
	add_cyl(0.62 * 0.5, 1.4, mat_dk, Vector3(oc_x, 2.4, oc_z), 16, true)

	# Floating Objective Orb
	objective_orb = MeshInstance3D.new()
	var orb_mesh = SphereMesh.new()
	orb_mesh.radius = 0.38
	orb_mesh.height = 0.76
	objective_orb.mesh = orb_mesh
	objective_orb.material_override = mat_am
	objective_orb.position = Vector3(oc_x, 3.4, oc_z)
	add_child(objective_orb)

	var ol = OmniLight3D.new()
	ol.light_color = Color(1.0, 0.604, 0.188)
	ol.light_energy = 2.6
	ol.omni_range = 24.0
	ol.position = Vector3(oc_x, 3.4, oc_z)
	add_child(ol)

	# 15 Computer Cabinets / Server Racks
	var cabs = [
		[170, 80], [185, 80], [200, 80], [30, 310], [30, 325], [30, 340],
		[250, 258], [255, 170], [265, 170], [232, 255], [245, 255], [258, 255],
		[30, 160], [30, 175], [160, 262]
	]
	for i in range(cabs.size()):
		var cp = cabs[i]
		var cx = x_coord(cp[0])
		var cz = z_coord(cp[1])
		add_box(1.1, 2.3, 0.8, mat_gun, Vector3(cx, 1.15, cz), 0.0, true)
		var led_mat = mat_cy if (i % 3 != 0) else mat_am
		add_box(0.7, 0.1, 0.04, led_mat, Vector3(cx, 1.9, cz + 0.41), 0.0, false)

	# 4 Heavy Power Generators
	for gp in [[117, 100], [235, 195], [175, 310], [100, 300]]:
		var gx = x_coord(gp[0])
		var gz = z_coord(gp[1])
		add_cyl(1.7, 0.4, mat_dk, Vector3(gx, 0.2, gz), 20, true)
		add_cyl(1.5, 3.0, mat_gun, Vector3(gx, 1.9, gz), 20, true)
		add_cyl(1.2, 0.3, mat_st, Vector3(gx, 3.5, gz), 16, false)
		add_box(0.2, 0.2, 0.2, mat_am, Vector3(gx, 3.2, gz + 1.52), 0.0, false)

	# 4 Hydraulic Pumps
	for pp in [[40, 300], [225, 110], [47, 205], [240, 115]]:
		var px_pos = x_coord(pp[0])
		var pz_pos = z_coord(pp[1])
		add_box(2.4, 0.3, 1.2, mat_dk, Vector3(px_pos, 0.15, pz_pos), 0.0, true)
		add_cyl(0.55, 2.2, mat_gun, Vector3(px_pos, 0.9, pz_pos), 16, true)

	# 5 Consoles
	for cnp in [[250, 100], [265, 100], [100, 170], [230, 275], [240, 140]]:
		var cx = x_coord(cnp[0])
		var cz = z_coord(cnp[1])
		add_box(1.8, 1.0, 0.8, mat_gun, Vector3(cx, 0.5, cz), 0.0, true)
		add_box(1.4, 0.5, 0.06, mat_cy, Vector3(cx, 1.3, cz - 0.2), 0.0, false)

	# 9 Crate Stacks
	for cr in [[30, 100], [45, 125], [100, 110], [110, 330], [130, 335], [190, 335], [60, 285], [65, 330], [265, 285]]:
		var cx = x_coord(cr[0])
		var cz = z_coord(cr[1])
		add_box(1.2, 1.0, 1.2, mat_rm, Vector3(cx, 0.5, cz), 0.0, true)
		add_box(1.25, 0.1, 1.25, mat_st, Vector3(cx, 1.02, cz), 0.0, false)

	# Heavy Wall Pipelines
	add_pipe(16, 70, 16, 350, 4.1, 0.18, mat_cu)
	add_pipe(16, 70, 16, 350, 3.7, 0.12, mat_st)
	add_pipe(18, 69, 275, 69, 4.1, 0.2, mat_cu)
	add_pipe(18, 351, 275, 351, 4.1, 0.2, mat_cu)
	add_pipe(276, 70, 276, 350, 4.0, 0.16, mat_st)
	add_pipe(146, 128, 146, 168, 4.2, 0.14, mat_cu)
	add_pipe(80, 250, 80, 290, 4.2, 0.14, mat_st)

	# 6 Floor Traps
	for tp in [[148, 142], [103, 200], [197, 200], [148, 250], [240, 297], [80, 185]]:
		var tx = x_coord(tp[0])
		var tz = z_coord(tp[1])
		add_box(3.4, 0.06, 3.4, mat_dk, Vector3(tx, 0.03, tz), 0.0, false)
		add_box(3.4, 0.02, 0.35, mat_hazard, Vector3(tx, 0.07, tz - 1.9), 0.0, false)

	# Practical Overhead Lights
	var lights_data = [
		[40, 200, Color(1.0, 0.165, 0.102)], [47, 310, Color(1.0, 0.604, 0.188)],
		[190, 100, Color(1.0, 0.604, 0.188)], [235, 195, Color(1.0, 0.165, 0.102)],
		[175, 300, Color(1.0, 0.604, 0.188)], [110, 100, Color(1.0, 0.604, 0.188)],
		[100, 300, Color(1.0, 0.165, 0.102)]
	]
	for lp in lights_data:
		var lx = x_coord(lp[0])
		var lz = z_coord(lp[1])
		var pl = OmniLight3D.new()
		pl.light_color = lp[2]
		pl.light_energy = 1.5
		pl.omni_range = 18.0
		pl.position = Vector3(lx, 3.4, lz)
		add_child(pl)
		add_box(0.4, 0.12, 0.4, mat_rd if lp[2].r > 0.9 and lp[2].g < 0.2 else mat_yl, Vector3(lx, H - 0.1, lz), 0.0, false)

	# Spawn Indicators
	# Runner Spawn [42, 105]
	var rx = x_coord(42)
	var rz = z_coord(105)
	add_cyl(2.4 * 0.5, 0.25, mat_dk, Vector3(rx, 0.13, rz), 24, false)
	var sl1 = OmniLight3D.new()
	sl1.light_color = Color(0.125, 0.784, 1.0)
	sl1.light_energy = 2.4
	sl1.omni_range = 14.0
	sl1.position = Vector3(rx, 2.6, rz)
	add_child(sl1)

	# Saboteur Spawn [255, 318]
	var sx = x_coord(255)
	var sz = z_coord(318)
	add_cyl(2.4 * 0.5, 0.25, mat_dk, Vector3(sx, 0.13, sz), 24, false)
	var sl2 = OmniLight3D.new()
	sl2.light_color = Color(1.0, 0.165, 0.102)
	sl2.light_energy = 2.4
	sl2.omni_range = 14.0
	sl2.position = Vector3(sx, 2.6, sz)
	add_child(sl2)

	# --- Functional Lethal Laser Barriers ---
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

		# Functional trigger area with collision shape
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
			arena._show_notification("⚡ ALERT: Player %d Eliminated by Active Complex Laser Barrier! ⚡" % body.player_id)

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
