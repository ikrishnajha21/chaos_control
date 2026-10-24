extends SceneTree

# Automated Test Suite for Lethal Lasers & Control-Point Arena Rearrangement
# Tests all requirements from Master Prompt Phase 1 & 2

var test_arena: Node = null
var current_test_step: int = 0
var step_timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] LETHAL LASERS & ARENA REARRANGEMENT SUITE <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	step_timer += delta

	match current_test_step:
		0:
			# Step 0: Load Training Facility (Research Facility)
			print(">>> Phase 1: Loading Research Facility...")
			var facility_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(facility_scene != null, "TrainingFacility.tscn must exist and load")
			test_arena = facility_scene.instantiate()
			root.add_child(test_arena)
			
			# Advance countdown to start round
			test_arena._process_countdown(3.5)
			current_test_step = 1
			step_timer = 0.0

		1:
			# Step 1: Verify Active Laser Elimination & Single-Trigger Guard
			print(">>> Phase 2: Testing Active Laser Elimination & Single-Trigger Guard...")
			var env = test_arena.get_node("Environment")
			var p1 = test_arena.p1 as PlayerController
			assert(p1 != null, "Player 1 must exist")
			assert(env.laser_barrier_data.size() > 0, "Laser barriers must be initialized")
			
			var laser = env.laser_barrier_data[0]
			var initial_deaths = p1.deaths
			var checkpoint_pos = p1.global_position
			p1.set_checkpoint(checkpoint_pos)
			p1.global_position = Vector3(0.0, 0.5, 0.0)
			
			# Ensure laser is ACTIVE
			env._set_lasers_state(EnvResearchFacility.LaserState.ACTIVE, 5.0)
			assert(env.current_laser_state == EnvResearchFacility.LaserState.ACTIVE, "Laser must be ACTIVE")
			
			# Trigger laser hit
			env._on_laser_body_entered(p1, laser)
			assert(p1.is_eliminated == true, "Player must be eliminated on active laser contact")
			assert(p1.deaths == initial_deaths + 1, "Player death count must increment by 1")
			assert(p1.elimination_timer > 0.0, "Elimination timer must be positive")
			assert(p1.velocity == Vector3.ZERO, "Velocity must be stopped during elimination")
			assert("ELIMINATED" in p1.label_3d.text, "Label must display ELIMINATED feedback")
			
			# Test Single-Trigger Guard: Repeated triggers while eliminated must be ignored
			env._on_laser_body_entered(p1, laser)
			assert(p1.deaths == initial_deaths + 1, "Single-trigger guard must prevent duplicate death triggers")
			print("  • Active laser elimination and single-trigger guard verified successfully")
			
			current_test_step = 2
			step_timer = 0.0

		2:
			# Step 2: Test Respawn at Checkpoint after Elimination Delay
			print(">>> Phase 3: Testing Checkpoint Respawn & Gameplay Control Restoration...")
			var p1 = test_arena.p1 as PlayerController
			
			# Advance physics process past elimination timer (1.2s)
			p1._physics_process(1.3)
			assert(p1.is_eliminated == false, "Player must no longer be eliminated after respawn")
			assert(p1.global_position.distance_to(p1.last_checkpoint_position) < 0.1, "Player must be respawned at last valid checkpoint")
			assert(p1.is_glitched == false, "Glitched status must be cleared upon respawn")
			assert(p1.speed_multiplier == 1.0, "Speed multiplier must be restored to 1.0")
			print("  • Respawn at checkpoint and control restoration verified successfully")
			
			current_test_step = 3
			step_timer = 0.0

		3:
			# Step 3: Verify Inactive/Disarmed Laser does NOT Eliminate
			print(">>> Phase 4: Testing Disarmed / Warning Laser Safety...")
			var env = test_arena.get_node("Environment")
			var p1 = test_arena.p1 as PlayerController
			var laser = env.laser_barrier_data[0]
			var deaths_before = p1.deaths
			
			# Disarm lasers
			env._set_lasers_state(EnvResearchFacility.LaserState.DISARMED, 3.0)
			assert(env.current_laser_state == EnvResearchFacility.LaserState.DISARMED, "Lasers must be DISARMED")
			
			# Contact disarmed laser
			env._on_laser_body_entered(p1, laser)
			assert(p1.is_eliminated == false, "Disarmed laser must NOT eliminate player")
			assert(p1.deaths == deaths_before, "Deaths must not increment on disarmed laser contact")
			
			# Warning state safety
			env._set_lasers_state(EnvResearchFacility.LaserState.WARNING, 2.0)
			env._on_laser_body_entered(p1, laser)
			assert(p1.is_eliminated == false, "Warning laser must NOT eliminate player")
			assert(p1.deaths == deaths_before, "Deaths must not increment on warning laser contact")
			print("  • Disarmed and warning laser safety verified successfully")
			
			current_test_step = 4
			step_timer = 0.0

		4:
			# Step 4: Test Control-Point 1, 2, 3 Sequential Arena Rearrangement (Research Facility)
			print(">>> Phase 5: Testing Research Facility Dynamic Arena Rearrangement...")
			var env = test_arena.get_node("Environment")
			assert(env.gates_data.has("gate_alpha"), "gate_alpha must exist")
			assert(env.gates_data.has("gate_beta"), "gate_beta must exist")
			assert(env.gates_data.has("gate_gamma"), "gate_gamma must exist")
			
			var gate_a = env.gates_data["gate_alpha"]
			var gate_b = env.gates_data["gate_beta"]
			var gate_c = env.gates_data["gate_gamma"]
			
			# Verify initial gate positions (raised and closed)
			assert(gate_a["is_open"] == false, "Gate Alpha must start closed")
			assert(gate_b["is_open"] == false, "Gate Beta must start closed")
			assert(gate_c["is_open"] == false, "Gate Gamma must start closed")
			assert(gate_a["body"].position.y > 1.0, "Gate Alpha must be raised initially")
			
			# Activate Control Point 1 (Node Alpha)
			test_arena._on_control_point_activated("NODE ALPHA")
			assert(gate_a["is_open"] == true, "Gate Alpha must open on Node Alpha activation")
			assert(gate_b["is_open"] == false, "Gate Beta must remain closed")
			print("  • Control Point Alpha rearrangement verified: Gate Alpha opened")
			
			# Activate Control Point 2 (Node Beta)
			test_arena._on_control_point_activated("NODE BETA")
			assert(gate_b["is_open"] == true, "Gate Beta must open on Node Beta activation")
			assert(gate_c["is_open"] == false, "Gate Gamma must remain closed")
			print("  • Control Point Beta rearrangement verified: Gate Beta opened")
			
			# Activate Control Point 3 (Node Gamma)
			test_arena._on_control_point_activated("NODE GAMMA")
			assert(gate_c["is_open"] == true, "Gate Gamma must open on Node Gamma activation")
			assert(test_arena.exit_zone.is_unlocked == true, "Exit Zone must unlock when all points activated")
			print("  • Control Point Gamma rearrangement verified: Gate Gamma opened and Exit Zone unlocked")
			
			current_test_step = 5
			step_timer = 0.0

		5:
			# Step 5: Test Clean Arena Rearrangement Reset Between Rounds
			print(">>> Phase 6: Testing Arena Rearrangement Round Reset...")
			test_arena._reset_arena_rearrangement()
			var env = test_arena.get_node("Environment")
			assert(env.gates_data["gate_alpha"]["is_open"] == false, "Gate Alpha must reset to closed")
			assert(env.gates_data["gate_beta"]["is_open"] == false, "Gate Beta must reset to closed")
			assert(env.gates_data["gate_gamma"]["is_open"] == false, "Gate Gamma must reset to closed")
			assert(env.gates_data["gate_alpha"]["body"].position == env.gates_data["gate_alpha"]["initial_pos"], "Gate Alpha position must reset")
			print("  • Round reset verified: All rearranged geometry restored to default configuration")
			
			test_arena.queue_free()
			current_test_step = 6
			step_timer = 0.0

		6:
			# Step 6: Test Underground Complex (Neon Reactor) Rearrangement
			print(">>> Phase 7: Testing Underground Complex Blast Shield Rearrangement...")
			var reactor_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(reactor_scene != null, "NeonReactor.tscn must exist")
			test_arena = reactor_scene.instantiate()
			root.add_child(test_arena)
			test_arena._process_countdown(3.5)
			
			assert(test_arena.blast_shield_west != null, "BlastShieldWest must exist")
			assert(test_arena.blast_shield_east != null, "BlastShieldEast must exist")
			assert(test_arena.blast_shield_west.position.y > 0.0, "West shield must start raised")
			
			# Activate Point Alpha -> West shield lowers
			test_arena._on_control_point_activated("NODE ALPHA")
			assert(test_arena.shield_west_lowered == true, "West blast shield must lower on Node Alpha")
			
			# Activate Point Beta -> East shield lowers
			test_arena._on_control_point_activated("NODE BETA")
			assert(test_arena.shield_east_lowered == true, "East blast shield must lower on Node Beta")
			
			# Reset
			test_arena._reset_arena_rearrangement()
			assert(test_arena.shield_west_lowered == false, "West shield must reset to raised")
			assert(test_arena.shield_east_lowered == false, "East shield must reset to raised")
			print("  • Underground Complex blast shield rearrangement and reset verified")
			
			test_arena.queue_free()
			current_test_step = 7
			step_timer = 0.0

		7:
			# Step 7: Verify Character Model Scale Remains Strictly 1.76x
			print(">>> Phase 8: Verifying Character Model 1.76x Visual Scale Preservation...")
			var player_scene = load("res://scenes/player.tscn")
			var p = player_scene.instantiate()
			root.add_child(p)
			
			var cw = p.get_node("Visuals/CrimsonWraith")
			var cp = p.get_node("Visuals/CyanPhantom")
			assert(cw != null and cp != null, "Character visual models must exist")
			
			var expected_scale = Vector3(1.76, 1.76, 1.76)
			assert(cw.scale.is_equal_approx(expected_scale), "Crimson Wraith scale must remain exactly 1.76x")
			assert(cp.scale.is_equal_approx(expected_scale), "Cyan Phantom scale must remain exactly 1.76x")
			print("  • Character scale preserved at exactly 1.76x with zero regressions")
			
			p.queue_free()
			current_test_step = 8
			step_timer = 0.0

		8:
			print("===================================================================")
			print(">>> ALL LETHAL LASER & ARENA REARRANGEMENT TESTS PASSED! <<<")
			print("===================================================================\n")
			quit(0)
			return true

	return false
