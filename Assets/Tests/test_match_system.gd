extends SceneTree

var arena: Arena
var frame_count: int = 0
var test_stage: int = 0

func _init() -> void:
	print(">>> [TEST START] Multi-Round Match System Verification")
	var scene = load("res://scenes/arenas/TrainingFacility.tscn")
	arena = scene.instantiate()
	root.add_child(arena)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	var p1: PlayerController = arena.p1
	var p2: PlayerController = arena.p2
	var exit: ExitZone = arena.exit_zone

	if test_stage == 0:
		test_stage = 1

		# --- TEST 1: Initial Round 1 Setup ---
		assert(arena.current_round == 1, "Should start at Round 1")
		assert(arena.round_label.text == "ROUND 1/3", "HUD should display ROUND 1/3")
		assert(arena.p1_score == 0 and arena.p2_score == 0, "Scores should start at 0-0")
		assert(p1.current_role == PlayerController.Role.RUNNER, "P1 must be RUNNER in Round 1")
		assert(p2.current_role == PlayerController.Role.SABOTEUR, "P2 must be SABOTEUR in Round 1")
		assert(arena.is_countdown_active == true, "Pre-round countdown should be active")
		assert(p1.is_frozen == true and p2.is_frozen == true, "Players should be frozen during countdown")
		print("✓ Test 1: Round 1 initial state verified (P1 Runner, P2 Saboteur, 3s countdown active)")

		# --- TEST 2: Pre-round Countdown finishes ---
		arena._process_countdown(3.5) # Simulate 3.5s elapsed
		assert(arena.is_countdown_active == false, "Countdown should finish")
		assert(p1.is_frozen == false and p2.is_frozen == false, "Players should unfreeze after countdown")
		print("✓ Test 2: Pre-round countdown completes, gameplay enabled")

		# --- TEST 3: Round 1 Victory (P1 Runner Escapes) ---
		var pt_a: ControlPoint = arena.get_node("ControlPoints/PointAlpha")
		var pt_b: ControlPoint = arena.get_node("ControlPoints/PointBeta")
		var pt_c: ControlPoint = arena.get_node("ControlPoints/PointGamma")
		var ev_e = InputEventAction.new()
		ev_e.action = "p1_interact"
		ev_e.pressed = true

		pt_a._on_body_entered(p1)
		pt_a._unhandled_input(ev_e)
		pt_b._on_body_entered(p1)
		pt_b._unhandled_input(ev_e)
		pt_c._on_body_entered(p1)
		pt_c._unhandled_input(ev_e)
		assert(exit.is_unlocked == true, "Exit should unlock after 3 objectives")

		exit._on_body_entered(p1)
		assert(arena.round_state == Arena.RoundState.RUNNER_WON, "Round state should be RUNNER_WON")
		assert(arena.p1_score == 1, "Player 1 should receive 1 point for winning Round 1")
		assert(arena.p2_score == 0, "Player 2 score should remain 0")
		assert(arena.score_label.text == "PLAYER 1: 1  |  PLAYER 2: 0", "Scoreboard should show 1 - 0")
		assert(arena.is_transition_active == true, "Transition to Round 2 should be active")
		print("✓ Test 3: Round 1 complete -> P1 scores +1 (Score: 1 - 0). Intermission overlay visible")

		# --- TEST 4: Round 2 Transition & Role Switching ---
		arena.transition_timer = 0.05
		arena._process(0.1) # Trigger transition completion
		assert(arena.current_round == 2, "Current round should now be 2")
		assert(arena.round_label.text == "ROUND 2/3", "HUD should display ROUND 2/3")
		
		# Role Inversion Verification
		assert(p2.current_role == PlayerController.Role.RUNNER, "Player 2 MUST now be RUNNER in Round 2")
		assert(p1.current_role == PlayerController.Role.SABOTEUR, "Player 1 MUST now be SABOTEUR in Round 2")
		assert(p2.global_position.distance_to(Vector3(-8.0, 0.5, 4.0)) < 0.1, "P2 should spawn at Runner position")
		assert(p1.global_position.distance_to(Vector3(8.0, 0.5, -4.0)) < 0.1, "P1 should spawn at Saboteur position")
		assert(arena.activated_count == 0, "Objectives must reset to 0/3 for Round 2")
		assert(not exit.is_unlocked, "Exit must be locked again for Round 2")
		assert(arena.p1_score == 1 and arena.p2_score == 0, "Scores must be preserved across rounds")
		print("✓ Test 4: Roles inverted for Round 2 -> P2 is RUNNER, P1 is SABOTEUR")

		# --- TEST 5: Player 2 (Runner) can interact with terminals in Round 2 ---
		arena._process_countdown(3.5) # Finish countdown for Round 2
		var ev_space = InputEventAction.new()
		ev_space.action = "p2_action"
		ev_space.pressed = true

		pt_a._on_body_entered(p2)
		pt_a._unhandled_input(ev_space)
		assert(pt_a.is_activated == true, "Player 2 (Runner) must be able to activate control points with Space")
		assert(arena.activated_count == 1, "Objective counter should be 1/3")
		print("✓ Test 5: Player 2 successfully activates terminal as Runner")

		# --- TEST 6: Player 1 (Saboteur) can trigger sabotage in Round 2 ---
		assert(arena.ability_cooldown == 0.0, "Saboteur ability should be ready")
		arena._unhandled_input(ev_e) # P1 presses E (Saboteur action)
		assert(arena.ability_cooldown > 5.8, "P1 as Saboteur must trigger sabotage trap with E")
		assert(arena.active_hazard_instance != null, "Hazard zone must be created targeting P2")
		print("✓ Test 6: Player 1 triggers sabotage trap against Player 2")

		# --- TEST 7: Round 2 Saboteur Timeout Victory ---
		arena.time_remaining = 0.05
		arena._process(0.1) # Timeout expires
		assert(arena.round_state == Arena.RoundState.SABOTEUR_WON, "Round 2 ends by timeout")
		assert(arena.p1_score == 2, "P1 (Saboteur in Round 2) should receive 1 point, total 2")
		assert(arena.p2_score == 0, "P2 score remains 0")
		print("✓ Test 7: Timeout triggers Saboteur victory -> P1 scores again (Score: 2 - 0)")

		# --- TEST 8: Round 3 Transition (Roles Switch Back) ---
		arena.transition_timer = 0.05
		arena._process(0.1) # Trigger transition to Round 3
		assert(arena.current_round == 3, "Current round should now be 3")
		assert(arena.round_label.text == "ROUND 3/3", "HUD should display ROUND 3/3")
		assert(p1.current_role == PlayerController.Role.RUNNER, "P1 MUST be RUNNER again in Round 3")
		assert(p2.current_role == PlayerController.Role.SABOTEUR, "P2 MUST be SABOTEUR again in Round 3")
		print("✓ Test 8: Round 3 roles switched back -> P1 Runner, P2 Saboteur")

		# --- TEST 9: Round 3 Ends -> Final Match Results Screen ---
		arena._process_countdown(3.5)
		arena.time_remaining = 0.05
		arena._process(0.1) # Timeout expires in Round 3 (P2 Saboteur wins)
		assert(arena.p2_score == 1, "P2 receives 1 point for winning Round 3")
		assert(arena.p1_score == 2, "P1 finishes with 2 points")
		assert(arena.is_match_over == true, "Match must be declared complete after Round 3")
		assert(arena.match_results_overlay.visible == true, "Match results overlay must appear")
		assert("PLAYER 1 WINS THE MATCH!" in arena.match_winner_label.text, "P1 should be declared match winner (2-1)")
		print("✓ Test 9: Match completes after Round 3 -> Final Results Screen displayed (P1 Wins 2-1)")

		# --- TEST 10: Play Again Button Resets Match ---
		arena.play_again_button.emit_signal("pressed")
		assert(arena.current_round == 1, "Round should reset to 1")
		assert(arena.p1_score == 0 and arena.p2_score == 0, "Scores should reset to 0-0")
		assert(arena.is_match_over == false, "Match over flag reset")
		assert(arena.match_results_overlay.visible == false, "Match overlay hidden")
		assert(p1.current_role == PlayerController.Role.RUNNER, "P1 is Runner again")
		assert(p2.current_role == PlayerController.Role.SABOTEUR, "P2 is Saboteur again")
		print("✓ Test 10: Play Again button resets scores, round number, roles, and starts Round 1")

		print(">>> ALL 10 MULTI-ROUND MATCH TESTS PASSED SUCCESSFULLY! <<<")
		quit(0)
		return true

	return false
