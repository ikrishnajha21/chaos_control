extends Node3D
class_name EnvResearchFacility

const S: float = 0.0787
const H: float = 4.6
const TH: float = 0.6

# Materials
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

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func x_coord(p: float) -> float:
	return (p - 707.0) * S

func z_coord(p: float) -> float:
	return (p - 490.0) * S

func _init_materials() -> void:
	mat_side = StandardMaterial3D.new()
	mat_side.albedo_color = Color(0.106, 0.125, 0.157)
	mat_side.roughness = 0.6
	mat_side.metallic = 0.5

	mat_top = StandardMaterial3D.new()
	mat_top.albedo_color = Color(0.275, 0.325, 0.416)
	mat_top.roughness = 0.5
	mat_top.metallic = 0.4
	mat_top.emission_enabled = true
	mat_top.emission = Color(0.04, 0.165, 0.25)
	mat_top.emission_energy_multiplier = 0.5

	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.173, 0.2, 0.239)
	mat_gun.roughness = 0.45
	mat_gun.metallic = 0.8

	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.078, 0.094, 0.118)
	mat_dk.roughness = 0.7
	mat_dk.metallic = 0.4

	mat_al = StandardMaterial3D.new()
	mat_al.albedo_color = Color(0.49, 0.529, 0.58)
	mat_al.roughness = 0.35
	mat_al.metallic = 0.85

	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.102, 0.627, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.102, 0.627, 1.0)
	mat_cy.emission_energy_multiplier = 1.6

	mat_red = StandardMaterial3D.new()
	mat_red.albedo_color = Color(1.0, 0.165, 0.165)
	mat_red.emission_enabled = true
	mat_red.emission = Color(1.0, 0.165, 0.165)
	mat_red.emission_energy_multiplier = 2.0

	mat_amb = StandardMaterial3D.new()
	mat_amb.albedo_color = Color(1.0, 0.698, 0.102)
	mat_amb.emission_enabled = true
	mat_amb.emission = Color(1.0, 0.698, 0.102)
	mat_amb.emission_energy_multiplier = 1.2

	mat_grn = StandardMaterial3D.new()
	mat_grn.albedo_color = Color(0.173, 0.416, 0.204)
	mat_grn.roughness = 0.9

	mat_glass = StandardMaterial3D.new()
	mat_glass.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_glass.albedo_color = Color(0.337, 0.784, 1.0, 0.35)
	mat_glass.roughness = 0.1
	mat_glass.metallic = 0.2
	mat_glass.emission_enabled = true
	mat_glass.emission = Color(0.04, 0.35, 0.56)
	mat_glass.emission_energy_multiplier = 0.5

	mat_holo = StandardMaterial3D.new()
	mat_holo.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_holo.albedo_color = Color(0.102, 0.627, 1.0, 0.55)
	mat_holo.emission_enabled = true
	mat_holo.emission = Color(0.102, 0.627, 1.0)
	mat_holo.emission_energy_multiplier = 1.5

	mat_holr = StandardMaterial3D.new()
	mat_holr.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_holr.albedo_color = Color(1.0, 0.165, 0.165, 0.55)
	mat_holr.emission_enabled = true
	mat_holr.emission = Color(1.0, 0.165, 0.165)
	mat_holr.emission_energy_multiplier = 1.5

	mat_floor = StandardMaterial3D.new()
	mat_floor.albedo_color = Color(0.13, 0.16, 0.21)
	mat_floor.roughness = 0.65
	mat_floor.metallic = 0.35

	mat_hazard = StandardMaterial3D.new()
	mat_hazard.albedo_color = Color(1.0, 0.76, 0.1)
	mat_hazard.emission_enabled = true
	mat_hazard.emission = Color(0.9, 0.65, 0.05)
	mat_hazard.emission_energy_multiplier = 0.7

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

func post(px: float, py: float) -> void:
	var pos = Vector3(x_coord(px), (H + 0.2) * 0.5, z_coord(py))
	add_box(0.7, H + 0.2, 0.7, mat_gun, pos, 0.0, true)
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
	# Floor (99m x 66m)
	var floor_pos = Vector3(x_coord(670), -0.5, z_coord(505))
	add_box(99.0, 1.0, 66.0, mat_floor, floor_pos, 0.0, true)

	# Traps
	var traps_data = [
		[470, 415, 3.0, 1.6], [1190, 490, 4.0, 1.6], [490, 622, 1.6, 3.0],
		[1100, 395, 3.0, 1.4], [210, 700, 4.0, 1.4], [1040, 540, 1.6, 3.0]
	]
	for t in traps_data:
		add_box(t[2], 0.04, t[3], mat_hazard, Vector3(x_coord(t[0]), 0.02, z_coord(t[1])), 0.0, false)

	# Rooms & Layout Architecture
	room(35, 90, 1300, 920)
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

	# Central Octagon
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

	# Central Octagon Platform & Objective Core
	add_cyl(9.4 * 0.5, 0.5, mat_dk, Vector3(0.0, 0.25, 0.0), 8, true)
	add_cyl(3.4 * 0.5, 0.9, mat_gun, Vector3(0.0, 0.95, 0.0), 6, true)
	add_cyl(2.4 * 0.5, 1.8, mat_cy, Vector3(0.0, 1.4, 0.0), 6, true)
	
	var sph = MeshInstance3D.new()
	var sph_mesh = SphereMesh.new()
	sph_mesh.radius = 1.3
	sph_mesh.height = 2.6
	sph.mesh = sph_mesh
	sph.material_override = mat_holo
	sph.position = Vector3(0.0, 3.4, 0.0)
	add_child(sph)

	var cl = OmniLight3D.new()
	cl.light_color = Color(0.102, 0.627, 1.0)
	cl.light_energy = 2.2
	cl.omni_range = 25.0
	cl.position = Vector3(0.0, 4.0, 0.0)
	add_child(cl)

	# Central Hub Consoles
	var c_offsets = [[0.0, -9.5], [0.0, 9.5]]
	for p in c_offsets:
		add_box(8.0, 1.1, 1.2, mat_gun, Vector3(p[0], 0.6, p[1]), 0.0, true)
		var sign_z = 0.2 if p[1] < 0 else -0.2
		add_box(7.0, 0.6, 0.5, mat_cy, Vector3(p[0], 1.25, p[1] + sign_z), 0.0, false)
		
	var c_offsets_x = [[-9.5, 0.0], [9.5, 0.0]]
	for p in c_offsets_x:
		add_box(1.2, 1.1, 8.0, mat_gun, Vector3(p[0], 0.6, p[1]), 0.0, true)
		var sign_x = 0.2 if p[0] < 0 else -0.2
		add_box(0.5, 0.6, 7.0, mat_cy, Vector3(p[0] + sign_x, 1.25, p[1]), 0.0, false)

	# Props: Containment Vessels
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

	# Chemical reactors in SW room
	var reactors = [[380, 775, 3.2], [440, 768, 2.4]]
	for r in reactors:
		var rx = x_coord(r[0])
		var rz = z_coord(r[1])
		var rad = r[2]
		add_cyl(rad, 0.8, mat_gun, Vector3(rx, 0.4, rz), 16, true)
		add_cyl(rad * 0.8, 2.6, mat_glass, Vector3(rx, 2.0, rz), 16, false)
		add_cyl(rad * 0.45, 2.4, mat_cy, Vector3(rx, 2.0, rz), 12, false)
		add_cyl(rad * 0.9, 0.5, mat_al, Vector3(rx, 3.4, rz), 16, false)

	# Consoles
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

	# Server Racks
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

	# Planters / Biomass specimens
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

	# Laser Barriers
	var lasers = [
		[662, 210, 762, 210], [662, 750, 762, 750], [250, 448, 250, 532],
		[350, 452, 350, 528], [1046, 460, 1046, 526]
	]
	for ls in lasers:
		var lax = x_coord(ls[0])
		var laz = z_coord(ls[1])
		var lbx = x_coord(ls[2])
		var lbz = z_coord(ls[3])
		var ll = sqrt((lbx - lax) * (lbx - lax) + (lbz - laz) * (lbz - laz))
		var la = -atan2(lbz - laz, lbx - lax)
		var l_center = Vector3((lax + lbx) * 0.5, 0.0, (laz + lbz) * 0.5)

		for ly in [0.5, 1.2, 1.9]:
			add_box(ll, 0.07, 0.07, mat_red, Vector3(l_center.x, ly, l_center.z), la, false)

		# End posts
		for pt in [Vector3(lax, 0.0, laz), Vector3(lbx, 0.0, lbz)]:
			add_box(0.5, 2.4, 0.5, mat_gun, Vector3(pt.x, 1.2, pt.z), 0.0, true)
			add_box(0.25, 0.25, 0.25, mat_red, Vector3(pt.x, 2.5, pt.z), 0.0, false)

		var l_light = OmniLight3D.new()
		l_light.light_color = Color(1.0, 0.165, 0.165)
		l_light.light_energy = 1.6
		l_light.omni_range = 10.0
		l_light.position = Vector3(l_center.x, 1.5, l_center.z)
		add_child(l_light)

	# Spawn Pads
	# Runner Pad [173, 228]
	var rx = x_coord(173)
	var rz = z_coord(228)
	add_cyl(60.0 * S * 0.85, 0.04, mat_cy, Vector3(rx, 0.02, rz), 24, false)
	var r_light = OmniLight3D.new()
	r_light.light_color = Color(0.102, 0.627, 1.0)
	r_light.light_energy = 2.0
	r_light.omni_range = 12.0
	r_light.position = Vector3(rx, 2.5, rz)
	add_child(r_light)

	# Saboteur Pad [1195, 755]
	var sx = x_coord(1195)
	var sz = z_coord(755)
	add_cyl(60.0 * S * 0.85, 0.04, mat_red, Vector3(sx, 0.02, sz), 24, false)
	var s_light = OmniLight3D.new()
	s_light.light_color = Color(1.0, 0.165, 0.165)
	s_light.light_energy = 2.0
	s_light.omni_range = 12.0
	s_light.position = Vector3(sx, 2.5, sz)
	add_child(s_light)
