extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var test_arena: Arena = null

func _init() -> void:
	print(">>> [TEST START] Tactical Gameplay & Dual Abilities Verification Suite")

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	match test_phase:
		0:
			# --- PHASE 0: Setup Arena and verify initial states ---
			test_phase = 1
			print(">>> Phase 0: Initializing Arena for Tactical Tests...")
			var scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(scene != null, "TrainingFacility.tscn must load")
			test_arena = scene.instantiate()
			root.add_child(test_arena)

			# Fast-forward countdown so round is active
			test_arena._process_countdown(3.5)
			assert(not test_arena.is_countdown_active, "Countdown should be finished")
			assert(test_arena.round_state == Arena.RoundState.ACTIVE, "Round should be active")
			assert(test_arena.p1.current_role == PlayerController.Role.RUNNER, "P1 should be Runner in Round 1")
			assert(test_arena.p2.current_role == PlayerController.Role.SABOTEUR, "P2 should be Saboteur in Round 1")
			assert(test_arena.runner_cooldown == 0.0, "Runner cooldown should initially be 0")
			assert(test_arena.ability_cooldown == 0.0, "Saboteur cooldown should initially be 0")
			print("✓ Phase 0 Passed: Arena initialized in Round 1 with P1 Runner and P2 Saboteur")

		1:
			# --- PHASE 1: Test Runner Mobility Surge & Pulse ---
			test_phase = 2
			print(">>> Phase 1: Testing Runner Mobility Surge & Tactical Pulse...")
			var runner = test_arena.p1
			assert(runner.move_speed == 8.0, "Base speed must be 8.0")
			assert(runner.speed_multiplier == 1.0, "Initial multiplier must be 1.0")
			assert(runner.surge_multiplier == 1.0, "Initial surge multiplier must be 1.0")
			assert(runner.is_surging == false, "Should not be surging initially")

			# Trigger Runner Surge
			test_arena._trigger_runner_ability()
			assert(runner.is_surging == true, "Runner should be surging after ability triggered")
			assert(runner.surge_multiplier == 1.35, "Surge multiplier should be 1.35 (10.8 speed)")
			assert(test_arena.runner_cooldown == Arena.RUNNER_COOLDOWN_DURATION, "Runner cooldown should be set to 7.0s")
			assert(test_arena.p1_pulses_used == 1, "P1 pulse count should increment to 1")

			# Runner ability should be blocked while on cooldown
			test_arena._trigger_runner_ability()
			assert(test_arena.p1_pulses_used == 1, "P1 pulse count should not increment while on cooldown")

			# Advance surge duration past 1.4s
			runner._physics_process(1.5)
			assert(runner.is_surging == false, "Surge should expire after duration")
			assert(runner.surge_multiplier == 1.0, "Surge multiplier should reset to 1.0")
			print("✓ Phase 1 Passed: Runner Mobility Surge applied 1.35x boost, locked cooldown, and expired cleanly")

		2:
			# --- PHASE 2: Test Saboteur Terminal Scrambling ---
			test_phase = 3
			print(">>> Phase 2: Testing Saboteur Terminal Scrambling...")
			var saboteur = test_arena.p2
			var ctrl_pt: ControlPoint = test_arena.control_points_root.get_child(0) as ControlPoint
			assert(ctrl_pt != null, "Control point must exist")
			assert(ctrl_pt.is_scrambled == false, "Control point should initially not be scrambled")

			# Move Saboteur close to terminal (within 8.5m)
			saboteur.global_position = ctrl_pt.global_position + Vector3(2.0, 0.0, 0.0)
			test_arena.ability_cooldown = 0.0 # Ready ability

			test_arena._trigger_saboteur_ability()
			assert(ctrl_pt.is_scrambled == true, "Terminal within 8.5m should become scrambled")
			assert(ctrl_pt.is_interaction_locked == true, "Scrambled terminal must have interaction locked")
			assert(ctrl_pt.scramble_timer > 0.0, "Scramble timer should be positive")
			assert(test_arena.p2_traps_deployed == 1, "P2 trap count should increment to 1")

			# Verify runner cannot activate scrambled terminal
			ctrl_pt.runner_in_range = true
			ctrl_pt.activate()
			assert(ctrl_pt.is_activated == false, "Runner cannot activate a scrambled terminal")

			# Advance scramble timer
			ctrl_pt._process(3.6)
			assert(ctrl_pt.is_scrambled == false, "Terminal should recover from scramble after duration")
			assert(ctrl_pt.is_interaction_locked == false, "Terminal interaction lock should be released")
			print("✓ Phase 2 Passed: Saboteur scrambled terminal, prevented override, and terminal auto-recovered")

		3:
			# --- PHASE 3: Test Glitch Interrupts Surge ---
			test_phase = 4
			print(">>> Phase 3: Testing Glitch Debuff Interrupts Surge...")
			var runner = test_arena.p1
			test_arena.runner_cooldown = 0.0
			test_arena._trigger_runner_ability()
			assert(runner.is_surging == true, "Runner should be surging")

			# Apply hazard glitch to surging runner
			runner.apply_hazard_effect(1.5, 0.25)
			assert(runner.is_glitched == true, "Runner should be glitched")
			assert(runner.is_surging == false, "Glitch must immediately cancel active surge")
			assert(runner.speed_multiplier == 0.25, "Runner should be slowed by 75%")

			# Attempting to surge while glitched must fail
			test_arena.runner_cooldown = 0.0
			test_arena._trigger_runner_ability()
			assert(runner.is_surging == false, "Runner cannot surge while glitched")

			runner.clear_hazard_effect()
			assert(runner.is_glitched == false, "Glitch cleared")
			print("✓ Phase 3 Passed: Hazard glitch immediately cancelled surge and blocked surging while debuffed")

		4:
			# --- PHASE 4: Test Round Role Switch and HUD Cards ---
			test_phase = 5
			print(">>> Phase 4: Testing Round Role Inversion & Ability Hand-off...")
			# Switch to Round 2
			test_arena._start_round(2)
			test_arena._process_countdown(3.5)

			assert(test_arena.p1.current_role == PlayerController.Role.SABOTEUR, "P1 should now be Saboteur in Round 2")
			assert(test_arena.p2.current_role == PlayerController.Role.RUNNER, "P2 should now be Runner in Round 2")
			assert(test_arena.p1_ability_status.visible == true, "P1 ability status should be visible")
			assert(test_arena.p2_ability_status.visible == true, "P2 ability status should be visible")
			assert(test_arena.p1_cooldown_bar.visible == true, "P1 cooldown bar should be visible")
			assert(test_arena.p2_cooldown_bar.visible == true, "P2 cooldown bar should be visible")

			# Now P2 is Runner -> P2 triggers surge & pulse
			test_arena._trigger_runner_ability()
			assert(test_arena.p2.is_surging == true, "P2 (Runner) should now be surging")
			assert(test_arena.p2_pulses_used == 1, "P2 pulses used should increment to 1")

			# P1 is Saboteur -> P1 triggers trap & scramble
			test_arena._trigger_saboteur_ability()
			assert(test_arena.p1_traps_deployed == 1, "P1 traps deployed should increment to 1")
			print("✓ Phase 4 Passed: Round 2 roles cleanly inverted; abilities correctly routed to respective players")

		5:
			# --- PHASE 5: Test Match Results Telemetry Summary ---
			test_phase = 6
			print(">>> Phase 5: Testing Match Results Telemetry Summary...")
			test_arena._show_final_match_results()
			assert(test_arena.is_match_over == true, "Match should be marked over")
			assert(test_arena.match_results_overlay.visible == true, "Match results overlay should be visible")
			assert("COMBAT TELEMETRY" in test_arena.match_score_label.text, "Match score label should include telemetry")
			assert("Player 1" in test_arena.match_score_label.text, "Match score label should summarize Player 1")
			assert("Player 2" in test_arena.match_score_label.text, "Match score label should summarize Player 2")

			test_arena.queue_free()
			print("✓ Phase 5 Passed: Post-match telemetry compiled and presented accurately")

			print(">>> ALL TACTICAL GAMEPLAY TESTS PASSED WITH ZERO ERRORS! <<<")
			quit(0)
			return true

	return false
