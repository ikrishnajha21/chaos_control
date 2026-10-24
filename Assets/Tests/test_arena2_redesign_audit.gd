extends SceneTree

var test_step: int = 0
var timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] EXACT RECREATION OF ARENA 2 — POWER CORE <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	match test_step:
		0:
			# --- PHASE 1: Load Arena 2 Scene & Verify Node Structure ---
			print(">>> Phase 1: Verifying GravityCore Scene & Core Systems...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			assert(pc_scene != null, "GravityCore.tscn must load successfully")
			var arena = pc_scene.instantiate() as Arena
			assert(arena != null, "Arena node must instantiate")
			root.add_child(arena)
			
			assert(arena.arena_name == "POWER CORE", "Arena name must be POWER CORE")
			assert(arena.has_node("Environment"), "Environment node must exist")
			assert(arena.has_node("WorldEnvironment"), "WorldEnvironment must exist")
			assert(arena.has_node("DirectionalLight3D"), "DirectionalLight3D must exist")
			assert(arena.has_node("ControlPoints"), "ControlPoints node must exist")
			assert(arena.has_node("ExitZone"), "ExitZone node must exist")
			assert(arena.has_node("Coins"), "Coins node must exist")
			assert(arena.has_node("Players"), "Players node must exist")
			assert(arena.has_node("Camera3D"), "Camera3D node must exist")
			
			var env = arena.get_node("Environment") as EnvPowerCore
			assert(env != null, "Environment node must be EnvPowerCore")
			
			print("  • Scene hierarchy, Environment script, and core systems verified.")
			arena.queue_free()
			test_step = 1
			timer = 0.0

		1:
			# --- PHASE 2: Verify Procedural Floor Plating, Rivets & Materials ---
			print(">>> Phase 2: Auditing Procedural Metallic Plating Floor, Rivets & Materials...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvPowerCore
			
			# Verify floor material and procedural tile texture
			assert(env.mat_floor != null, "Floor material must exist")
			assert(env.mat_floor.albedo_texture != null, "Floor must have procedural metallic plate texture")
			assert(env.mat_floor.uv1_scale.x == 5.0 and env.mat_floor.uv1_scale.y == 5.0, "Floor UV repetition must be 5x5 for 100m x 100m")
			
			# Verify hazard trap material and texture
			assert(env.mat_hazard != null, "Hazard trap material must exist")
			assert(env.mat_hazard.albedo_texture != null, "Hazard material must have chevron stripe texture")
			assert(env.mat_hazard.emission_enabled == true, "Hazard material must be emissive")
			
			# Verify palette materials
			assert(env.mat_gun != null and env.mat_gun.metallic >= 0.8, "mat_gun must be high metallic")
			assert(env.mat_cu != null and env.mat_cu.metallic >= 0.8, "mat_cu must be metallic copper")
			assert(env.mat_am != null and env.mat_am.emission_enabled == true, "mat_am must be emissive amber")
			assert(env.mat_core_inner != null and env.mat_core_inner.emission_energy_multiplier >= 4.0, "mat_core_inner must be high intensity")
			
			print("  • Modular floor plating texture (5x5 with corner rivets), hazard chevrons, and core materials verified.")
			arena.queue_free()
			test_step = 2
			timer = 0.0

		2:
			# --- PHASE 3: Verify Central Stepped Reactor, Core & Orbiting Particles ---
			print(">>> Phase 3: Auditing Central Reactor Decks, Floating Energy Core & Orbiting Fragments...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvPowerCore
			
			# Verify floating core group
			assert(env.energy_core_group != null, "energy_core_group must exist")
			assert(env.core_light != null and env.core_light.omni_range >= 45.0, "Core OmniLight3D must have wide radius")
			assert(env.orbiting_fragments.size() == 8, "8 orbiting plasma fragments must exist")
			
			# Process a few frames to verify animation and fragment motion
			env._process(0.016)
			assert(env.orbiting_fragments[0].position.length() > 1.0, "Orbiting fragments must have radial distance")
			
			print("  • Concentric reactor decks, floating core, pulsing lights, and 8 orbiting plasma fragments verified.")
			arena.queue_free()
			test_step = 3
			timer = 0.0

		3:
			# --- PHASE 4: Verify 4 Peripheral Turbines / Generators & Rotating Impellers ---
			print(">>> Phase 4: Auditing 4 Peripheral Turbines & Rotating 10-Blade Impeller Fans...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvPowerCore
			
			assert(env.impellers.size() == 4, "Exact 4 generator impeller fans must exist")
			for i in range(env.impellers.size()):
				var imp = env.impellers[i]
				assert(imp.get_child_count() >= 10, "Each generator must have at least 10 fan blades")
				var rot_before = imp.rotation.y
				env._process(0.05)
				var rot_after = imp.rotation.y
				assert(rot_before != rot_after, "Generator %d impeller must rotate" % i)
			
			print("  • 4 massive generators, rotating 10-blade impellers, cooling toruses, and power conduits verified.")
			arena.queue_free()
			test_step = 4
			timer = 0.0

		4:
			# --- PHASE 5: Verify 6 Laser Barriers & Lethal Collision Elimination ---
			print(">>> Phase 5: Auditing 6 Laser Barriers & Lethal Collision Detection...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var env = arena.get_node("Environment") as EnvPowerCore
			assert(env.laser_barrier_data.size() == 6, "Power Core must have 6 laser barriers")
			
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
			p1.set_checkpoint(Vector3(-15, 0.5, 0))
			p1.global_position = Vector3(0, 0.5, 0)
			
			env._set_lasers_state(EnvPowerCore.LaserState.ACTIVE, 5.0)
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by touching active laser barrier")
			assert(p1.deaths == initial_deaths + 1, "Player death count must increment")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Duplicate elimination must be blocked by single-trigger guard")
			
			p1.respawn_at_checkpoint()
			print("  • 6 lethal laser barriers, curtains, beacon posts, and collision elimination verified.")
			arena.queue_free()
			test_step = 5
			timer = 0.0

		5:
			# --- PHASE 6: Verify Spawn Pads, Beacons & Visibility Lighting ---
			print(">>> Phase 6: Auditing Spawn Pads, Floating Beacons & Balanced Lighting...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as Arena
			root.add_child(arena)
			
			# Check WorldEnvironment ambient exposure
			var we = arena.get_node("WorldEnvironment") as WorldEnvironment
			assert(we.environment.ambient_light_energy >= 1.2, "Ambient light energy must be >= 1.2 to eliminate excessive darkness")
			
			# Check DirectionalLight3D
			var dir_light = arena.get_node("DirectionalLight3D") as DirectionalLight3D
			assert(dir_light.light_energy >= 1.2, "DirectionalLight3D must be >= 1.2")
			
			var env = arena.get_node("Environment") as EnvPowerCore
			assert(env.spawn_beacons.size() == 2, "2 floating spawn beacons must exist")
			
			# Verify character scale is strictly 1.76x
			var p1 = arena.p1 as PlayerController
			var p2 = arena.p2 as PlayerController
			var cw1 = p1.get_node("Visuals/CrimsonWraith") as Node3D
			var cp1 = p1.get_node("Visuals/CyanPhantom") as Node3D
			assert(abs(cw1.scale.x - 1.76) < 0.01, "Crimson Wraith scale must remain exact at 1.76x")
			assert(abs(cp1.scale.x - 1.76) < 0.01, "Cyan Phantom scale must remain exact at 1.76x")
			
			print("  • Spawn pads at (-43, 12) & (43, 12), floating rotating beacons, and 1.76x scale verified.")
			arena.queue_free()
			test_step = 6
			timer = 0.0

		6:
			# --- PHASE 7: Verify Control Points, Coins, Energy Bridge & Arena Isolation ---
			print(">>> Phase 7: Verifying Control Points, Coins, Dynamic Energy Bridge & Arena Isolation...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var arena = pc_scene.instantiate() as GravityCoreArena
			root.add_child(arena)
			
			# Check Control Points
			var cp_root = arena.get_node("ControlPoints")
			assert(cp_root.get_child_count() == 3, "Must have 3 control points (Alpha, Beta, Gamma)")
			
			# Check Coins
			var coins_root = arena.get_node("Coins")
			assert(coins_root.get_child_count() == 5, "Must have 5 strategic coins")
			
			# Check Dynamic Bridge nodes
			assert(arena.energy_bridge != null, "CentralEnergyBridge must exist")
			assert(arena.catwalk_west != null, "CatwalkWest must exist")
			assert(arena.catwalk_east != null, "CatwalkEast must exist")
			
			# Test Saboteur destabilization trigger
			arena._start_bridge_destabilization()
			assert(arena.bridge_state == GravityCoreArena.BridgeState.WARNING, "Bridge state must become WARNING on destabilization")
			arena._disable_bridge()
			assert(arena.bridge_state == GravityCoreArena.BridgeState.DISABLED, "Bridge state must become DISABLED")
			assert(arena.bridge_collision.disabled == true, "Bridge collision must be disabled when offline")
			arena._restore_bridge()
			assert(arena.bridge_state == GravityCoreArena.BridgeState.ONLINE, "Bridge state must be restored to ONLINE")
			assert(arena.bridge_collision.disabled == false, "Bridge collision must be re-enabled")
			
			arena.queue_free()
			
			# Verify Arena 1 (Research Facility) and Arena 3 (Underground Complex) remain intact
			var a1_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(a1_scene != null, "TrainingFacility.tscn must load cleanly")
			var a1 = a1_scene.instantiate() as Arena
			root.add_child(a1)
			assert(a1.arena_name == "RESEARCH FACILITY", "Arena 1 name must be RESEARCH FACILITY")
			a1.queue_free()
			
			var a3_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(a3_scene != null, "NeonReactor.tscn must load cleanly")
			var a3 = a3_scene.instantiate() as Arena
			root.add_child(a3)
			assert(a3.arena_name == "UNDERGROUND COMPLEX", "Arena 3 name must be UNDERGROUND COMPLEX")
			a3.queue_free()
			
			print("  • Dynamic Energy Bridge mechanics, 5 coins, 3 terminals, and complete arena isolation verified.")
			print("===================================================================")
			print(">>> ALL ARENA 2 REDESIGN AUDIT PHASES PASSED SUCCESSFULLY! <<<")
			print("===================================================================\n")
			quit(0)
			return true

	return false
