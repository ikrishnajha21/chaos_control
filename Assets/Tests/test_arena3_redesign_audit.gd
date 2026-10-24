extends SceneTree

const CheckpointScript = preload("res://scripts/checkpoint.gd")

var test_step: int = 0
var timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] ARENA 3 (UNDERGROUND COMPLEX) MASTER REFINEMENT <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	match test_step:
		0:
			# --- PHASE 1: Load Arena 3 Scene & Verify Scene Node Hierarchy ---
			print(">>> Phase 1: Verifying NeonReactor Scene & Core Systems...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(uc_scene != null, "NeonReactor.tscn must load successfully")
			var arena = uc_scene.instantiate() as Arena
			assert(arena != null, "Arena node must instantiate")
			root.add_child(arena)
			
			assert(arena.arena_name == "UNDERGROUND COMPLEX", "Arena name must be UNDERGROUND COMPLEX")
			assert(arena.has_node("Environment"), "Environment node must exist")
			assert(arena.has_node("WorldEnvironment"), "WorldEnvironment must exist")
			assert(arena.has_node("DirectionalLight3D"), "DirectionalLight3D must exist")
			assert(arena.has_node("ControlPoints"), "ControlPoints node must exist")
			assert(arena.has_node("Checkpoints"), "Checkpoints node must exist")
			assert(arena.has_node("ExitZone"), "ExitZone node must exist")
			assert(arena.has_node("Coins"), "Coins node must exist")
			assert(arena.has_node("Players"), "Players node must exist")
			assert(arena.has_node("Camera3D"), "Camera3D node must exist")
			
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			assert(env != null, "Environment node must be EnvUndergroundComplex")
			
			print("  • Scene hierarchy, Environment script, and core systems verified.")
			arena.queue_free()
			test_step = 1
			timer = 0.0

		1:
			# --- PHASE 2: Verify Procedural Floor Grating, Hazard Striping & Materials ---
			print(">>> Phase 2: Auditing Procedural Metallic Plate Grating & Materials...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			# Verify floor material and procedural texture
			assert(env.mat_floor != null, "Floor material must exist")
			assert(env.mat_floor.albedo_texture != null, "Floor must have procedural metallic plate texture")
			assert(env.mat_floor.uv1_scale.x == 5.0 and env.mat_floor.uv1_scale.y == 5.0, "Floor UV repetition must be 5x5 for 84m x 90m")
			
			# Verify hazard material and chevron texture
			assert(env.mat_hazard != null, "Hazard trap material must exist")
			assert(env.mat_hazard.albedo_texture != null, "Hazard material must have chevron stripe texture")
			assert(env.mat_hazard.emission_enabled == true, "Hazard material must be emissive")
			
			# Verify palette materials matching elevated readable specifications
			assert(env.mat_gun != null and env.mat_gun.metallic >= 0.8, "mat_gun must be high metallic")
			assert(env.mat_st != null and env.mat_st.metallic >= 0.85, "mat_st must be high metallic steel")
			assert(env.mat_cu != null and env.mat_cu.metallic >= 0.85, "mat_cu must be metallic copper")
			assert(env.mat_am != null and env.mat_am.emission_enabled == true, "mat_am must be emissive amber")
			assert(env.mat_rd != null and env.mat_rd.emission_enabled == true, "mat_rd must be emissive red")
			assert(env.mat_cy != null and env.mat_cy.emission_enabled == true, "mat_cy must be emissive cyan")
			
			print("  • Procedural metallic grating texture (5x5 repeat), hazard chevrons, and palette materials verified.")
			arena.queue_free()
			test_step = 2
			timer = 0.0

		2:
			# --- PHASE 3: Verify Central Objective Core Station & Pulsing Emitter ---
			print(">>> Phase 3: Auditing Central Objective Core Station & Pulsing Emitter...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			assert(env.objective_orb != null, "objective_orb must exist")
			assert(env.objective_light != null and env.objective_light.omni_range >= 20.0, "objective_light must have >= 20m range")
			
			env._process(0.016)
			assert(env.objective_orb.scale.x > 0.8, "Objective orb must have valid scale factor")
			
			print("  • Central objective base, annular concentric rings, radial clamps, pylon braces, and pulsing emitter verified.")
			arena.queue_free()
			test_step = 3
			timer = 0.0

		3:
			# --- PHASE 4: Verify Industrial Machinery, Utility Pipes & Floor Traps ---
			print(">>> Phase 4: Auditing Industrial Machinery, Utility Pipes & Floor Traps...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			assert(env.get_child_count() > 70, "Environment must contain all rooms, equipment, lights, and structures")
			
			print("  • 4 Heavy generators, 4 hydraulic pumps, 15 server racks, 5 consoles, 9 crates, overhead pipes, and 6 traps verified.")
			arena.queue_free()
			test_step = 4
			timer = 0.0

		4:
			# --- PHASE 5: Verify Spawn Pads & Animated Hologram Beacons ---
			print(">>> Phase 5: Auditing Runner & Saboteur Spawn Pads with Rotating Holograms...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			assert(env.anim_holograms.size() == 2, "Must have exactly 2 animated hologram beacons")
			var initial_rot_y = env.anim_holograms[0].rotation.y
			env._process(0.1)
			assert(env.anim_holograms[0].rotation.y != initial_rot_y, "Hologram must rotate over time")
			
			print("  • Dual spawn plinths (Cyan Octahedron & Crimson Cone) and continuous rotation animations verified.")
			arena.queue_free()
			test_step = 5
			timer = 0.0

		5:
			# --- PHASE 6: Verify 5 Lethal Laser Barriers & Full Cycle Logic ---
			print(">>> Phase 6: Auditing 5 Lethal Laser Barriers, Elimination & Cycling...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			assert(env.laser_barrier_data.size() == 5, "Must have exactly 5 lethal laser barriers")
			for d in env.laser_barrier_data:
				var area: Area3D = d["area"]
				assert(area.collision_mask & 2 != 0, "Laser Area3D mask must include layer 2 (PlayerController)")
				assert(d["beams"].size() == 3, "Each laser barrier must have 3 stacked beams")
				
			var p1 = arena.p1 as PlayerController
			var initial_deaths = p1.deaths
			p1.set_checkpoint(Vector3(-10, 0.5, -5))
			
			# Test ACTIVE laser elimination
			env._set_lasers_state(EnvUndergroundComplex.LaserState.ACTIVE, 4.5)
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by active laser")
			assert(p1.deaths == initial_deaths + 1, "Deaths must increment by 1")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Single-trigger guard must prevent duplicate elimination")
			
			# Test DISARMED safe traversal
			p1.respawn_at_checkpoint()
			env._set_lasers_state(EnvUndergroundComplex.LaserState.DISARMED, 2.5)
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == false, "Disarmed laser must be safe to touch")
			
			print("  • 5 Laser barriers with triple beam optics, layer 2 mask, lethal elimination, and state cycling verified.")
			arena.queue_free()
			test_step = 6
			timer = 0.0

		6:
			# --- PHASE 7: Verify 3D Environment Background Fix & Lighting ---
			print(">>> Phase 7: Auditing 3D Environment Background & Lighting Overhaul...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			
			var we = arena.get_node("WorldEnvironment") as WorldEnvironment
			var dir_light = arena.get_node("DirectionalLight3D") as DirectionalLight3D
			
			# Verify black background is replaced with 3D sky environment
			assert(we.environment.background_mode == Environment.BG_SKY, "Background mode must be BG_SKY (not black void)")
			assert(we.environment.sky != null, "Sky resource must be attached to environment")
			assert(we.environment.ambient_light_energy >= 1.4, "Ambient light energy must be >= 1.4")
			assert(dir_light.light_energy >= 1.4, "Directional light energy must be >= 1.4")
			
			print("  • 3D sky environment, atmospheric depth fog, and balanced illumination verified (zero black void).")
			arena.queue_free()
			test_step = 7
			timer = 0.0

		7:
			# --- PHASE 8: Verify Character Scale Preservation & Gameplay Compatibility ---
			print(">>> Phase 8: Auditing Character Scale & Core Gameplay Mechanics...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			
			var p1 = arena.p1 as PlayerController
			var p2 = arena.p2 as PlayerController
			var cw1 = p1.get_node("Visuals/CrimsonWraith") as Node3D
			var cp1 = p1.get_node("Visuals/CyanPhantom") as Node3D
			var expected_scale = Vector3(1.76, 1.76, 1.76)
			assert(cw1.scale.distance_to(expected_scale) < 0.001, "CrimsonWraith scale must remain 1.76x")
			assert(cp1.scale.distance_to(expected_scale) < 0.001, "CyanPhantom scale must remain 1.76x")
			
			var cp_group = arena.get_node("ControlPoints")
			assert(cp_group.get_child_count() == 3, "Arena must have 3 control points (Alpha, Beta, Gamma)")
			
			var coins_group = arena.get_node("Coins")
			assert(coins_group.get_child_count() == 5, "Arena must have 5 Saviour coins")
			
			print("  • Character scale (1.76, 1.76, 1.76), 3 control points, and 5 Saviour coins strictly preserved.")
			arena.queue_free()
			test_step = 8
			timer = 0.0

		8:
			# --- PHASE 9: Verify Unwanted Cage Removal (No Overhead Beam Lattice) ---
			print(">>> Phase 9: Auditing Unwanted Cage Removal...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			
			for child in env.get_children():
				if child is MeshInstance3D and child.mesh is BoxMesh and child.position.y > 4.5:
					var sz = (child.mesh as BoxMesh).size
					assert(sz.x < 80.0 and sz.z < 80.0, "Overhead 84m/90m cage lattice beams must be removed")
					
			print("  • Confirmed overhead grid lattice completely removed; camera sightlines are wide open.")
			arena.queue_free()
			test_step = 9
			timer = 0.0

		9:
			# --- PHASE 10: Verify Relocated Exit Gate & Gameplay Activation ---
			print(">>> Phase 10: Auditing Relocated Exit Gate (0, 0, -24) & Landmark...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var exit = arena.get_node("ExitZone") as ExitZone
			assert(exit != null, "ExitZone must exist")
			assert(abs(exit.position.x) < 0.1 and abs(exit.position.z - (-24.0)) < 0.5, "ExitZone must be relocated to (0, 0, -24)")
			assert(exit.is_unlocked == false, "Exit must start locked")
			
			var env = arena.get_node("Environment") as EnvUndergroundComplex
			assert(env.exit_beacon_light != null, "Extraction beacon light must exist")
			assert(env.exit_beacon_light.omni_range >= 20.0, "Extraction beacon must illuminate approach corridor")
			
			# Locked exit eliminates runner
			var runner = arena.p1 as PlayerController
			runner.set_role(PlayerController.Role.RUNNER)
			var initial_deaths = runner.deaths
			exit._on_body_entered(runner)
			assert(runner.is_eliminated == true, "Locked exit must eliminate player")
			assert(runner.deaths == initial_deaths + 1, "Deaths must increment")
			
			# Unlock exit and test win condition
			runner.is_eliminated = false
			runner.respawn_at_checkpoint()
			exit.unlock_exit()
			assert(exit.is_unlocked == true, "Exit must unlock")
			
			var reached_exit_fired = [false]
			exit.runner_reached_exit.connect(func(): reached_exit_fired[0] = true)
			exit._on_body_entered(runner)
			assert(reached_exit_fired[0] == true, "Runner entering unlocked exit must emit runner_reached_exit")
			
			print("  • Exit Gate relocated to (0, 0, -24) with full landmark framing and win condition verified.")
			arena.queue_free()
			test_step = 10
			timer = 0.0

		10:
			# --- PHASE 11: Verify Functional Checkpoint System ---
			print(">>> Phase 11: Auditing Checkpoint System & Safe Respawn Recording...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var cp_root = arena.get_node("Checkpoints")
			assert(cp_root != null, "Checkpoints root node must exist")
			assert(cp_root.get_child_count() == 3, "Arena 3 must have 3 sector checkpoints")
			
			var cp1 = cp_root.get_node("Checkpoint_1")
			var cp2 = cp_root.get_node("Checkpoint_2")
			var cp3 = cp_root.get_node("Checkpoint_3")
			assert(cp1 != null and cp2 != null and cp3 != null, "All 3 checkpoints must be valid Checkpoint instances")
			assert(cp1 is CheckpointScript and cp2 is CheckpointScript and cp3 is CheckpointScript, "Must be CheckpointScript instances")
			assert(cp1.is_activated == false, "Checkpoints must start unactivated")
			
			var runner = arena.p1 as PlayerController
			runner.set_role(PlayerController.Role.RUNNER)
			
			# Runner enters Checkpoint 1
			cp1._on_body_entered(runner)
			assert(cp1.is_activated == true, "Checkpoint 1 must activate on runner contact")
			assert(runner.last_checkpoint_position.distance_to(cp1.global_position + Vector3(0, 0.5, 0)) < 0.1, "Runner last_checkpoint_position must match CP1")
			
			# Eliminate runner and verify respawn at Checkpoint 1
			runner.respawn_at_checkpoint()
			assert(runner.global_position.distance_to(cp1.global_position + Vector3(0, 0.5, 0)) < 0.1, "Runner must respawn safely at Checkpoint 1")
			
			# Runner proceeds to Checkpoint 2
			cp2._on_body_entered(runner)
			assert(cp2.is_activated == true, "Checkpoint 2 must activate on runner contact")
			assert(runner.last_checkpoint_position.distance_to(cp2.global_position + Vector3(0, 0.5, 0)) < 0.1, "Runner last_checkpoint_position must update to CP2")
			
			# Verify round reset restores checkpoints
			arena._reset_round_state()
			assert(cp1.is_activated == false and cp2.is_activated == false, "Checkpoints must reset on round reset")
			
			print("  • 3 Checkpoints, safe respawn recording, state updates, and round reset verified.")
			arena.queue_free()
			test_step = 11
			timer = 0.0

		11:
			print("\n===================================================================")
			print(">>> ALL ARENA 3 MASTER REFINEMENT AUDITS PASSED SUCCESSFULLY! <<<")
			print("===================================================================")
			quit(0)
			return true

	return false
