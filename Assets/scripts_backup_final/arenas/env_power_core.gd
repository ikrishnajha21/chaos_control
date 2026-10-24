extends Node3D
class_name EnvPowerCore

# Materials
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

var energy_core_group: Node3D
var impellers: Array[Node3D] = []

func _init() -> void:
	_init_materials()

func _ready() -> void:
	_build_environment()

func _process(delta: float) -> void:
	if energy_core_group:
		energy_core_group.rotate_y(delta * 0.6)
		var t = Time.get_ticks_msec() / 1000.0
		energy_core_group.position.y = 4.3 + sin(t * 1.5) * 0.12

	for i in range(impellers.size()):
		var imp = impellers[i]
		if is_instance_valid(imp):
			var dir = 1.0 if (i % 2 == 1) else -1.0
			imp.rotate_y(delta * 2.5 * dir)

func _init_materials() -> void:
	mat_gun = StandardMaterial3D.new()
	mat_gun.albedo_color = Color(0.165, 0.18, 0.204)
	mat_gun.roughness = 0.55
	mat_gun.metallic = 0.85

	mat_dk = StandardMaterial3D.new()
	mat_dk.albedo_color = Color(0.071, 0.075, 0.086)
	mat_dk.roughness = 0.8
	mat_dk.metallic = 0.4

	mat_al = StandardMaterial3D.new()
	mat_al.albedo_color = Color(0.541, 0.561, 0.588)
	mat_al.roughness = 0.35
	mat_al.metallic = 0.9

	mat_cu = StandardMaterial3D.new()
	mat_cu.albedo_color = Color(0.604, 0.353, 0.208)
	mat_cu.roughness = 0.5
	mat_cu.metallic = 0.85

	mat_st = StandardMaterial3D.new()
	mat_st.albedo_color = Color(0.231, 0.251, 0.282)
	mat_st.roughness = 0.5
	mat_st.metallic = 0.85

	mat_am = StandardMaterial3D.new()
	mat_am.albedo_color = Color(1.0, 0.541, 0.122)
	mat_am.emission_enabled = true
	mat_am.emission = Color(1.0, 0.541, 0.122)
	mat_am.emission_energy_multiplier = 2.0

	mat_rd = StandardMaterial3D.new()
	mat_rd.albedo_color = Color(1.0, 0.165, 0.102)
	mat_rd.emission_enabled = true
	mat_rd.emission = Color(1.0, 0.165, 0.102)
	mat_rd.emission_energy_multiplier = 2.4

	mat_cy = StandardMaterial3D.new()
	mat_cy.albedo_color = Color(0.125, 0.784, 1.0)
	mat_cy.emission_enabled = true
	mat_cy.emission = Color(0.125, 0.784, 1.0)
	mat_cy.emission_energy_multiplier = 2.2

	mat_yl = StandardMaterial3D.new()
	mat_yl.albedo_color = Color(1.0, 0.878, 0.439)
	mat_yl.emission_enabled = true
	mat_yl.emission = Color(1.0, 0.878, 0.439)
	mat_yl.emission_energy_multiplier = 2.2

	mat_lane = StandardMaterial3D.new()
	mat_lane.albedo_color = Color(0.275, 0.29, 0.318)
	mat_lane.roughness = 0.6
	mat_lane.metallic = 0.6

	mat_floor = StandardMaterial3D.new()
	mat_floor.albedo_color = Color(0.08, 0.086, 0.102)
	mat_floor.roughness = 0.6
	mat_floor.metallic = 0.5

	mat_barrier = StandardMaterial3D.new()
	mat_barrier.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_barrier.albedo_color = Color(1.0, 0.541, 0.122, 0.3)
	mat_barrier.emission_enabled = true
	mat_barrier.emission = Color(1.0, 0.541, 0.122)
	mat_barrier.emission_energy_multiplier = 1.6

	mat_hazard = StandardMaterial3D.new()
	mat_hazard.albedo_color = Color(0.85, 0.635, 0.102)
	mat_hazard.emission_enabled = true
	mat_hazard.emission = Color(0.85, 0.635, 0.102)
	mat_hazard.emission_energy_multiplier = 0.8

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

func add_cyl(r: float, h: float, mat: Material, pos: Vector3, n: int = 32, collide: bool = true) -> MeshInstance3D:
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

func add_torus(r_outer: float, r_tube: float, mat: Material, pos: Vector3) -> MeshInstance3D:
	var mi = MeshInstance3D.new()
	var t_mesh = TorusMesh.new()
	t_mesh.inner_radius = r_outer - r_tube
	t_mesh.outer_radius = r_outer + r_tube
	mi.mesh = t_mesh
	mi.material_override = mat
	mi.position = pos
	add_child(mi)
	return mi

func _build_environment() -> void:
	# Floor (100m x 100m)
	add_box(100.0, 1.0, 100.0, mat_floor, Vector3(0.0, -0.5, 0.0), 0.0, true)

	# Central Reactor Rings & Platforms
	# Tier 1 (r=17, h=0.5)
	add_cyl(17.0, 0.5, mat_st, Vector3(0.0, 0.25, 0.0), 48, false)
	# Tier 2 (r=15, h=0.9)
	add_cyl(15.0, 0.9, mat_gun, Vector3(0.0, 0.45, 0.0), 48, false)
	# Tier 3 (r=12.4, h=0.5)
	add_cyl(12.4, 0.5, mat_dk, Vector3(0.0, 0.25, 0.0), 40, false)
	# Tier 4 (r=10.2, h=1.1)
	add_cyl(10.2, 1.1, mat_st, Vector3(0.0, 0.55, 0.0), 40, false)
	# Tier 5 (r=8, h=0.7)
	add_cyl(8.0, 0.7, mat_gun, Vector3(0.0, 0.35, 0.0), 36, false)

	# Stepped Collision Shape for central platform (walkable concentric tiers)
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

	# Glowing amber rings
	for r in [12.6, 10.3, 8.2]:
		add_torus(r, 0.08, mat_am, Vector3(0.0, 0.55, 0.0))
	add_torus(15.25, 0.08, mat_am, Vector3(0.0, 0.5, 0.0))

	# Radial clamps around reactor tiers
	for k in range(24):
		var a = k / 24.0 * PI * 2.0
		var pos = Vector3(9.3 * cos(a), 1.25, 9.3 * sin(a))
		add_box(1.1, 0.35, 0.5, mat_al, pos, -a, false)

	for k in range(18):
		var a = k / 18.0 * PI * 2.0
		var pos = Vector3(7.0 * cos(a), 0.82, 7.0 * sin(a))
		add_box(0.9, 0.25, 0.5, mat_cu, pos, -a, false)

	for k in range(10):
		var a = k / 10.0 * PI * 2.0 + PI / 10.0
		var pos = Vector3(10.2 * cos(a), 0.65, 10.2 * sin(a))
		add_box(10.6 * 0.3, 0.7, 1.0, mat_gun, pos, -a, true)
		var cl_pos = Vector3(12.5 * cos(a), 0.75, 12.5 * sin(a))
		add_box(0.7, 0.9, 1.5, mat_al, cl_pos, -a, true)

	# Reactor Core Column
	add_cyl(4.4, 2.6, mat_dk, Vector3(0.0, 1.3, 0.0), 32, true)
	add_cyl(3.2, 0.5, mat_st, Vector3(0.0, 2.75, 0.0), 28, false)
	add_torus(3.1, 0.1, mat_am, Vector3(0.0, 2.9, 0.0))

	# 4 Reactor Columns
	for k in range(4):
		var a = k / 4.0 * PI * 2.0 + PI / 4.0
		var pos = Vector3(3.6 * cos(a), 3.2, 3.6 * sin(a))
		add_cyl(0.35, 4.4, mat_gun, pos, 16, true)
		add_box(0.5, 0.5, 0.5, mat_al, Vector3(3.6 * cos(a), 5.4, 3.6 * sin(a)), 0.0, false)
	add_torus(3.6, 0.18, mat_gun, Vector3(0.0, 5.4, 0.0))

	# Floating Energy Core (Group E)
	energy_core_group = Node3D.new()
	energy_core_group.position = Vector3(0.0, 4.3, 0.0)
	add_child(energy_core_group)

	var core_inner = MeshInstance3D.new()
	var core_inner_mesh = SphereMesh.new()
	core_inner_mesh.radius = 1.1
	core_inner_mesh.height = 2.2
	core_inner.mesh = core_inner_mesh
	core_inner.material_override = mat_yl
	energy_core_group.add_child(core_inner)

	var core_outer = MeshInstance3D.new()
	var core_outer_mesh = SphereMesh.new()
	core_outer_mesh.radius = 2.1
	core_outer_mesh.height = 4.2
	core_outer.mesh = core_outer_mesh
	core_outer.material_override = mat_barrier
	energy_core_group.add_child(core_outer)

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

	var rl = OmniLight3D.new()
	rl.light_color = Color(1.0, 0.541, 0.188)
	rl.light_energy = 3.4
	rl.omni_range = 45.0
	rl.position = Vector3(0.0, 4.3, 0.0)
	add_child(rl)

	var fl2 = OmniLight3D.new()
	fl2.light_color = Color(1.0, 0.416, 0.125)
	fl2.light_energy = 1.4
	fl2.omni_range = 20.0
	fl2.position = Vector3(0.0, 1.2, 0.0)
	add_child(fl2)

	# 4 Massive Generators
	var gen_positions = [[-28.0, -34.0], [28.0, -34.0], [-28.0, 34.0], [28.0, 34.0]]
	for i in range(gen_positions.size()):
		var gp = gen_positions[i]
		_build_generator(gp[0], gp[1], i)

	# Curved Blast Barriers in 4 Quadrants
	for q in range(4):
		var r_rot = q * PI * 0.5
		var a0 = r_rot + 15.0 * PI / 180.0
		var a1 = r_rot + 75.0 * PI / 180.0
		_build_curved_barrier_quadrant(a0, a1)

	# 4 Cardinal Lanes & Perimeter Walls
	_build_lane(0, false)
	_build_lane(1, true)
	_build_lane(2, false)
	_build_lane(3, true)

	# 4 Corner Fortification Towers
	for p in [[-1.0, -1.0], [1.0, -1.0], [-1.0, 1.0], [1.0, 1.0]]:
		add_box(6.0, 9.0, 6.0, mat_st, Vector3(p[0] * 47.0, 4.5, p[1] * 47.0), 0.0, true)
		add_box(1.0, 1.0, 1.0, mat_rd, Vector3(p[0] * 43.9, 7.8, p[1] * 43.9), 0.0, false)

	# Industrial Platform
	var pf_pos = Vector3(14.0, 0.0, -38.0)
	add_box(7.4, 0.5, 7.4, mat_st, Vector3(pf_pos.x, 0.25, pf_pos.z), 0.0, true)
	add_box(6.0, 0.5, 6.0, mat_al, Vector3(pf_pos.x, 0.9, pf_pos.z), 0.0, true)
	for x_off in [-3.4, 3.4]:
		add_box(0.4, 1.2, 7.4, mat_gun, Vector3(pf_pos.x + x_off, 0.6, pf_pos.z), 0.0, true)
		add_cyl(0.3, 1.6, mat_cu, Vector3(pf_pos.x + x_off, 0.5, pf_pos.z + 2.5), 12, true)
		add_cyl(0.3, 1.6, mat_cu, Vector3(pf_pos.x + x_off, 0.5, pf_pos.z - 2.5), 12, true)

	# Spawn Indicators
	# West Spawn [-43, 12]
	add_cyl(3.0, 0.3, mat_dk, Vector3(-43.0, 0.15, 12.0), 32, false)
	add_torus(2.6, 0.12, mat_cy, Vector3(-43.0, 0.34, 12.0))
	var sp_light1 = OmniLight3D.new()
	sp_light1.light_color = Color(0.125, 0.784, 1.0)
	sp_light1.light_energy = 2.2
	sp_light1.omni_range = 14.0
	sp_light1.position = Vector3(-43.0, 2.5, 12.0)
	add_child(sp_light1)

	# East Spawn [43, 12]
	add_cyl(3.0, 0.3, mat_dk, Vector3(43.0, 0.15, 12.0), 32, false)
	add_torus(2.6, 0.12, mat_rd, Vector3(43.0, 0.34, 12.0))
	var sp_light2 = OmniLight3D.new()
	sp_light2.light_color = Color(1.0, 0.165, 0.102)
	sp_light2.light_energy = 2.2
	sp_light2.omni_range = 14.0
	sp_light2.position = Vector3(43.0, 2.5, 12.0)
	add_child(sp_light2)

func _build_generator(gx: float, gz: float, idx: int) -> void:
	var g_node = Node3D.new()
	g_node.position = Vector3(gx, 0.0, gz)
	add_child(g_node)

	add_cyl(7.4, 0.8, mat_dk, Vector3(gx, 0.4, gz), 32, true)
	add_cyl(6.4, 5.6, mat_gun, Vector3(gx, 3.6, gz), 32, true)

	for h in [1.5, 2.7, 3.9, 5.1]:
		add_torus(6.5, 0.18, mat_al, Vector3(gx, h + 0.4, gz))

	for k in range(8):
		var a = k / 8.0 * PI * 2.0 + PI / 8.0
		var m = mat_cu if ((k % 2) ^ (idx % 2) != 0) else mat_st
		var f_pos = Vector3(gx + 6.6 * cos(a), 3.0, gz + 6.6 * sin(a))
		add_box(2.3, 3.0, 0.6, m, f_pos, -a, true)

	add_cyl(5.6, 0.5, mat_al, Vector3(gx, 6.65, gz), 24, true)
	add_torus(4.8, 0.25, mat_cu, Vector3(gx, 6.95, gz))
	add_cyl(3.6, 0.3, mat_dk, Vector3(gx, 6.95, gz), 20, false)

	# Impeller
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

	# Heavy Conduit linking generator to center
	var u = Vector3(-gx, 0.0, -gz).normalized()
	var p0 = Vector3(gx, 0.4, gz) + u * 7.6
	var p1 = Vector3(0.0, 0.4, 0.0) - u * 17.0
	var dist = p0.distance_to(p1)
	var mid = (p0 + p1) * 0.5
	var angle = -atan2(p1.z - p0.z, p1.x - p0.x)
	add_box(dist, 0.8, 0.8, mat_dk, mid, angle, true)

func _build_curved_barrier_quadrant(a0: float, a1: float) -> void:
	# Approximate curved sector barrier with 6 segmented solid blocks
	var num_segs = 6
	for s in range(num_segs):
		var t0 = a0 + (a1 - a0) * (s / float(num_segs))
		var t1 = a0 + (a1 - a0) * ((s + 1) / float(num_segs))
		var mid_a = (t0 + t1) * 0.5
		var seg_len = (t1 - t0) * 22.5
		var pos = Vector3(22.5 * cos(mid_a), 1.4, 22.5 * sin(mid_a))
		add_box(seg_len, 2.8, 3.0, mat_gun, pos, -mid_a, true)

	# End pylons at a0 and a1
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

	# Walkway
	add_box(10.0, 0.12, 28.0, mat_lane, lane_center, rot_y, true)
	add_box(0.6, 0.2, 26.0, mat_st, lane_center - right * 5.3, rot_y, true)
	add_box(0.6, 0.2, 26.0, mat_st, lane_center + right * 5.3, rot_y, true)

	# Hazard stripe at entrance
	add_box(10.0, 0.04, 2.0, mat_hazard, forward * 44.0 + Vector3(0, 0.14, 0), rot_y, false)

	if has_bar:
		# Barrier pylons
		for x_sign in [-5.4, 5.4]:
			var bp = forward * 38.0 + right * x_sign
			add_box(1.4, 1.4, 1.4, mat_gun, Vector3(bp.x, 0.7, bp.z), rot_y, true)
			add_cyl(0.25, 2.6, mat_st, Vector3(bp.x, 2.2, bp.z), 12, true)
		# Forcefield
		add_box(10.8, 2.8, 0.2, mat_barrier, forward * 38.0 + Vector3(0, 1.9, 0), rot_y, true)

	# Outer Wall at 50m
	var wall_center = forward * 50.0
	wall_center.y = 3.25
	# Left and Right wall flanks around doorway
	add_box(38.0, 6.5, 3.2, mat_gun, wall_center - right * 26.0, rot_y, true)
	add_box(38.0, 6.5, 3.2, mat_gun, wall_center + right * 26.0, rot_y, true)
	# Header beam over doorway
	add_box(14.0, 1.5, 3.4, mat_st, forward * 50.0 + Vector3(0, 6.0, 0), rot_y, true)
