extends SceneTree

var arena: Arena
var frame_count: int = 0
var test_stage: int = 0

func _init() -> void:
	print(">>> [TEST START] Objective System Verification")
	var scene = load("res://scenes/arenas/TrainingFacility.tscn")
	arena = scene.instantiate()
	root.add_child(arena)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false # wait for ready & physics steps
		
	var pt_a: ControlPoint = arena.get_node("ControlPoints/PointAlpha")
	var pt_b: ControlPoint = arena.get_node("ControlPoints/PointBeta")
	var pt_c: ControlPoint = arena.get_node("ControlPoints/PointGamma")
	var p1: PlayerController = arena.p1
	var p2: PlayerController = arena.p2

	if test_stage == 0:
		test_stage = 1
		# Advance countdown so interaction is unlocked
		arena._process_countdown(3.5)
		# Test 1: Initial state
		assert(arena.activated_count == 0, "Initial activated count must be 0")
		assert(arena.objective_label.text == "Objectives: 0/3", "HUD should show Objectives: 0/3")
		assert(not pt_a.is_activated and not pt_b.is_activated and not pt_c.is_activated, "All points must be inactive initially")
		print("✓ Test 1 Passed: Initial state is 0/3 and all points standby")
		
		# Test 2: P1 far away pressing E should NOT activate Point A
		p1.global_position = Vector3(0, 0.5, 0) # Far from Point A (-10, 0, -6.5)
		var ev = InputEventAction.new()
		ev.action = "p1_interact"
		ev.pressed = true
		pt_a._unhandled_input(ev)
		assert(not pt_a.is_activated, "P1 from distance should NOT activate Point A")
		print("✓ Test 2 Passed: Distant interaction rejected")

		# Test 3: P2 (Saboteur) moving into Point B and pressing E/Action
		pt_b.global_position = Vector3(0, 0, 0)
		p2.global_position = Vector3(0, 0.5, 0)
		pt_b._on_body_entered(p2)
		assert(not pt_b.runner_in_range, "P2 should NOT register as runner_in_range")
		pt_b._unhandled_input(ev)
		assert(not pt_b.is_activated, "P2 must NOT be able to activate control point")
		assert(arena.activated_count == 0, "Activated count should still be 0 after P2 attempts")
		print("✓ Test 3 Passed: P2 Saboteur cannot activate control point")

		# Test 4: P1 (Runner) enters Point A and presses E
		p1.global_position = pt_a.global_position
		pt_a._on_body_entered(p1)
		assert(pt_a.runner_in_range, "P1 should register as runner_in_range")
		pt_a._unhandled_input(ev)
		assert(pt_a.is_activated, "Point A should be activated by P1")
		assert(arena.activated_count == 1, "Activated count should be 1")
		assert(arena.objective_label.text == "Objectives: 1/3", "HUD should update to Objectives: 1/3")
		print("✓ Test 4 Passed: P1 activates Point A -> HUD: 1/3, notification: ", arena.notification_label.text)

		# Test 5: Activating Point A again should do nothing (only once per round)
		pt_a._unhandled_input(ev)
		assert(arena.activated_count == 1, "Duplicate activation must be ignored")
		print("✓ Test 5 Passed: Point cannot be activated multiple times")

		# Test 6: Activate Point B and Point C
		p1.global_position = pt_b.global_position
		pt_b._on_body_entered(p1)
		pt_b._unhandled_input(ev)
		assert(arena.activated_count == 2, "Activated count should be 2")
		assert(arena.objective_label.text == "Objectives: 2/3", "HUD should update to Objectives: 2/3")

		p1.global_position = pt_c.global_position
		pt_c._on_body_entered(p1)
		pt_c._unhandled_input(ev)
		assert(arena.activated_count == 3, "Activated count should be 3")
		assert(arena.objective_label.text == "Objectives: 3/3", "HUD should update to Objectives: 3/3")
		print("✓ Test 6 Passed: Points B and C activated -> HUD: 3/3")

		# Test 7: Reset round (R key / _reset_positions)
		arena._reset_positions()
		assert(arena.activated_count == 0, "Activated count should reset to 0")
		assert(arena.objective_label.text == "Objectives: 0/3", "HUD should reset to Objectives: 0/3")
		assert(not pt_a.is_activated and not pt_b.is_activated and not pt_c.is_activated, "Points should reset to standby")
		print("✓ Test 7 Passed: Round reset reinitializes all points and HUD to 0/3")

		print(">>> ALL 7 OBJECTIVE TESTS PASSED SUCCESSFULLY! <<<")
		quit(0)
		return true

	return false
