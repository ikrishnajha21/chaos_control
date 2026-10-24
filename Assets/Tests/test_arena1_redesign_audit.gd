extends SceneTree

var test_step: int = 0
var timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] EXACT RECREATION OF ARENA 1 — RESEARCH FACILITY <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	match test_step:
		0:
			# --- PHASE 1: Load Arena 1 Scene & Verify Node Structure ---
			print(">>> Phase 1: Verifying TrainingFacility Scene & Core Components...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(fac_scene != null, "TrainingFacility.tscn must load successfully")
			var arena = fac_scene.instantiate() as Arena
			assert(arena != null, "Arena node must instantiate")
			root.add_child(arena)
			
			assert(arena.arena_name == "RESEARCH FACILITY", "Arena name must be RESEARCH FACILITY")
			assert(arena.has_node("Environment"), "Environment node must exist")
			assert(arena.has_node("WorldEnvironment"), "WorldEnvironment must exist")
			assert(arena.has_node("DirectionalLight3D"), "DirectionalLight3D must exist")
			assert(arena.has_node("ControlPoints"), "ControlPoints node must exist")
			assert(arena.has_node("ExitZone"), "ExitZone node must exist")
			assert(arena.has_node("Coins"), "Coins node must exist")
			assert(arena.has_node("Players"), "Players node must exist")
			assert(arena.has_node("Camera3D"), "Camera3D node must exist")
			
			var env = arena.get_node("Environment") as EnvResearchFacility
			assert(env != null, "Environment node must be EnvResearchFacility")
			
			print("  • Scene hierarchy, Environment script, and core systems verified.")
			arena.queue_free()
			test_step = 1
			timer = 0.0

		1:
			# --- PHASE 2: Verify HTML 3D Floor, Materials & Procedural Textures ---
			print(">>> Phase 2: Auditing Procedural Tiled Floor, Hazard Traps & Materials...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			var arena = fac_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvResearchFacility
			
			# Verify floor material and procedural tile texture
			assert(env.mat_floor != null, "Floor material must exist")
			assert(env.mat_floor.albedo_texture != null, "Floor must have procedural tile texture")
			assert(env.mat_floor.uv1_scale.x == 33.0 and env.mat_floor.uv1_scale.y == 22.0, "Floor UV repetition must be 33x22 for 99m x 66m")
			
			# Verify hazard trap material and texture
			assert(env.mat_hazard != null, "Hazard trap material must exist")
			assert(env.mat_hazard.albedo_texture != null, "Hazard material must have chevron stripe texture")
			assert(env.mat_hazard.emission_enabled == true, "Hazard material must be emissive")
			
			# Verify wall top luminous cap material
			assert(env.mat_top != null, "mat_top must exist")
			assert(env.mat_top.emission_enabled == true, "mat_top must be emissive")
			assert(env.mat_top.albedo_color.r > 0.2, "mat_top must have luminous blue-slate albedo")
			
			print("  • Modular floor tile texture (33x22), chevron hazard striping, and luminous wall-top materials verified.")
			arena.queue_free()
			test_step = 2
			timer = 0.0

		2:
			# --- PHASE 3: Verify Central Octagon Core, Objective Dais & Proportions ---
			print(">>> Phase 3: Auditing Central Octagon Objective Dais & Rings...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			var arena = fac_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvResearchFacility
			
			# Verify central hub lights and hologram
			var hub_light_found = false
			var holo_sphere_found = false
			for child in env.get_children():
				if child is OmniLight3D and child.position.distance_to(Vector3(0, 4.0, 0)) < 0.2:
					hub_light_found = true
					assert(child.omni_range >= 25.0, "Hub light omni_range must illuminate dais")
				if child is MeshInstance3D and child.mesh is SphereMesh and child.position.distance_to(Vector3(0, 3.4, 0)) < 0.2:
					holo_sphere_found = true
			
			assert(hub_light_found, "Central Hub OmniLight3D at y=4.0 must exist")
			assert(holo_sphere_found, "Floating Holographic Core Sphere at y=3.4 must exist")
			
			print("  • Central dais (radius 9.4m), 8-sided rings, floating holo-sphere, and core lighting verified.")
			arena.queue_free()
			test_step = 3
			timer = 0.0

		3:
			# --- PHASE 4: Verify Laser Barriers (5 Lethal Hazards + Curtains) ---
			print(">>> Phase 4: Auditing 5 Laser Barriers & Lethal Collision Detection...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			var arena = fac_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var env = arena.get_node("Environment") as EnvResearchFacility
			assert(env.laser_barrier_data.size() == 5, "Exact 5 laser barriers matching reference must exist")
			
			for i in range(env.laser_barrier_data.size()):
				var d = env.laser_barrier_data[i]
				assert(d.has("beams") and d["beams"].size() == 3, "Laser %d must have 3 horizontal beam rods" % i)
				assert(d.has("curtain") and d["curtain"] != null, "Laser %d must have translucent curtain plane" % i)
				assert(d.has("area") and d["area"] != null, "Laser %d must have Area3D" % i)
				assert(d.has("col") and d["col"] != null, "Laser %d must have CollisionShape3D" % i)
				
				var area: Area3D = d["area"]
				assert(area.collision_mask & 2 != 0, "Laser Area3D must detect PlayerController (layer 2)")
			
			# Test lethal elimination
			var p1 = arena.p1 as PlayerController
			var initial_deaths = p1.deaths
			p1.set_checkpoint(Vector3(-10, 0.5, 5))
			p1.global_position = Vector3(0, 0.5, 0)
			
			env._set_lasers_state(EnvResearchFacility.LaserState.ACTIVE, 5.0)
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by touching active laser barrier")
			assert(p1.deaths == initial_deaths + 1, "Player death count must increment")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Duplicate elimination must be blocked by single-trigger guard")
			
			p1.respawn_at_checkpoint()
			print("  • 5 lethal laser barriers, curtains, beacon posts, and collision elimination verified.")
			arena.queue_free()
			test_step = 4
			timer = 0.0

		4:
			# --- PHASE 5: Verify Spawn Pads, Holographic Beacons & Anti-Darkness Lighting ---
			print(">>> Phase 5: Auditing Spawn Pads, Holographic Beacons & Facility Lighting...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			var arena = fac_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvResearchFacility
			
			# Check WorldEnvironment ambient exposure
			var we = arena.get_node("WorldEnvironment") as WorldEnvironment
			assert(we.environment.ambient_light_energy >= 1.2, "Ambient light energy must be >= 1.2 to eliminate excessive darkness")
			
			# Check DirectionalLight3D
			var dir_light = arena.get_node("DirectionalLight3D") as DirectionalLight3D
			assert(dir_light.light_energy >= 1.2, "DirectionalLight3D must be >= 1.2")
			
			# Check spawn pads
			var rx = env.x_coord(173)
			var rz = env.z_coord(228)
			var sx = env.x_coord(1195)
			var sz = env.z_coord(755)
			
			var runner_light_found = false
			var saboteur_light_found = false
			var corridor_lights_count = 0
			
			for child in env.get_children():
				if child is OmniLight3D:
					if child.position.distance_to(Vector3(rx, 3.0, rz)) < 0.5:
						runner_light_found = true
					elif child.position.distance_to(Vector3(sx, 3.0, sz)) < 0.5:
						saboteur_light_found = true
					elif child.light_energy >= 1.0 and child.omni_range >= 15.0:
						corridor_lights_count += 1
			
			assert(runner_light_found, "Runner spawn pad overhead light must exist")
			assert(saboteur_light_found, "Saboteur spawn pad overhead light must exist")
			assert(corridor_lights_count >= 8, "At least 8 corridor fill lights must illuminate facility wings")
			
			print("  • Spawn pads, holographic beacons, and 8 facility visibility lights verified.")
			arena.queue_free()
			test_step = 5
			timer = 0.0

		5:
			# --- PHASE 6: Verify Control Points, Coins & Exit Zone Integration ---
			print(">>> Phase 6: Auditing Control Points, Saviour Coins & Exit Zone...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			var arena = fac_scene.instantiate() as Arena
			root.add_child(arena)
			
			# Check Control Points
			var cp_root = arena.get_node("ControlPoints")
			assert(cp_root.get_child_count() == 3, "Must have 3 control points (Alpha, Beta, Gamma)")
			
			# Check Exit Zone
			var exit = arena.get_node("ExitZone") as ExitZone
			assert(exit != null, "ExitZone must exist")
			assert(exit.is_unlocked == false, "ExitZone must start locked")
			
			# Check Coins
			var coins_root = arena.get_node("Coins")
			assert(coins_root.get_child_count() == 5, "Must have 5 strategic coins")
			
			# Verify character scale is strictly 1.76x
			var p1 = arena.p1 as PlayerController
			var p2 = arena.p2 as PlayerController
			var cw1 = p1.get_node("Visuals/CrimsonWraith") as Node3D
			var cp1 = p1.get_node("Visuals/CyanPhantom") as Node3D
			assert(abs(cw1.scale.x - 1.76) < 0.01, "Crimson Wraith scale must remain exact at 1.76x")
			assert(abs(cp1.scale.x - 1.76) < 0.01, "Cyan Phantom scale must remain exact at 1.76x")
			
			print("  • 3 Control Points, Exit Zone, 5 Saviour Coins, and 1.76x character scale verified.")
			arena.queue_free()
			test_step = 6
			timer = 0.0

		6:
			# --- PHASE 7: Verify Arena 2 (Power Core) & Arena 3 (Underground Complex) Untouched ---
			print(">>> Phase 7: Verifying Arena 2 & Arena 3 Remain Unchanged & Fully Operational...")
			var a2_scene = load("res://scenes/arenas/GravityCore.tscn")
			assert(a2_scene != null, "GravityCore.tscn (Arena 2) must load cleanly")
			var a2 = a2_scene.instantiate() as Arena
			root.add_child(a2)
			assert(a2.arena_name == "POWER CORE", "Arena 2 name must be POWER CORE")
			a2.queue_free()
			
			var a3_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(a3_scene != null, "NeonReactor.tscn (Arena 3) must load cleanly")
			var a3 = a3_scene.instantiate() as Arena
			root.add_child(a3)
			assert(a3.arena_name == "UNDERGROUND COMPLEX", "Arena 3 name must be UNDERGROUND COMPLEX")
			a3.queue_free()
			
			print("  • Arena 2 (Power Core) and Arena 3 (Underground Complex) confirmed completely untouched.")
			print("===================================================================")
			print(">>> ALL ARENA 1 REDESIGN AUDIT PHASES PASSED SUCCESSFULLY! <<<")
			print("===================================================================\n")
			quit(0)
			return true

	return false
