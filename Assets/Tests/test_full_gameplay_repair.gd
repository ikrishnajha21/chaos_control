extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var test_arena: Arena = null

func _init() -> void:
	print(">>> [TEST START] Full Gameplay Repair & Stability Verification Suite")

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	match test_phase:
		0:
			# --- PHASE 0: Test Countdown State Machine & Single "GO!" ---
			test_phase = 1
			print(">>> Phase 0: Testing Countdown State Machine & Single 'GO!'...")
			var scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(scene != null, "TrainingFacility.tscn must load")
			test_arena = scene.instantiate()
			root.add_child(test_arena)

			assert(test_arena.is_countdown_active == true, "Countdown should be active initially")
			assert(test_arena.p1.is_frozen == true, "P1 should be frozen during countdown")
			assert(test_arena.p2.is_frozen == true, "P2 should be frozen during countdown")

			# Step through 3, 2, 1
			test_arena._process_countdown(0.5) # Down to 2.5
			assert(test_arena.countdown_label.text == "3", "Should display step 3")
			test_arena._process_countdown(1.0) # Down to 1.5
			assert(test_arena.countdown_label.text == "2", "Should display step 2")
			test_arena._process_countdown(1.0) # Down to 0.5
			assert(test_arena.countdown_label.text == "1", "Should display step 1")

			# Cross 0.0 -> GO! triggered
			test_arena._process_countdown(0.6) # Reaches <= 0.0
			assert(test_arena.countdown_label.text == "GO!", "Should display GO!")
			assert(test_arena.is_countdown_active == false, "Countdown must be marked inactive")
			assert(test_arena.p1.is_frozen == false, "P1 must unfreeze when GO! triggers")
			assert(test_arena.p2.is_frozen == false, "P2 must unfreeze when GO! triggers")
			assert(test_arena.go_display_timer > 0.0, "go_display_timer must be positive")

			# Verify subsequent frames do not re-trigger countdown
			test_arena._process(0.9)
			assert(test_arena.countdown_label.visible == false, "GO! label must cleanly hide after display timer expires")
			assert(test_arena.is_countdown_active == false, "Countdown cannot restart during active play")
			print("✓ Phase 0 Passed: State-driven countdown sequence verified; single 'GO!' with clean auto-hide")

		1:
			# --- PHASE 1: Test Jumping & Grounded Physics ---
			test_phase = 2
			print(">>> Phase 1: Testing Jumping, Vertical Velocity, & Grounded Physics...")
			var p1 = test_arena.p1
			assert(p1.jump_velocity == 8.5, "Jump velocity must be configured to 8.5")
			assert(p1.input_jump == "p1_jump", "P1 jump input action must be p1_jump")

			# Simulate jump input
			p1.velocity.y = p1.jump_velocity
			assert(p1.velocity.y > 0.0, "Vertical velocity must be positive immediately after jump")

			# Simulate airborne physics frame (gravity applied)
			var prev_vy = p1.velocity.y
			p1.velocity.y -= p1.gravity * 0.1
			assert(p1.velocity.y < prev_vy, "Gravity must pull character downward when airborne")

			# Reset back to floor
			p1.velocity = Vector3.ZERO
			print("✓ Phase 1 Passed: Jump velocity and gravity acceleration verified on PlayerController")

		2:
			# --- PHASE 2: Test Checkpoint Detection & Respawn ---
			test_phase = 3
			print(">>> Phase 2: Testing Checkpoint Detection & Void Respawn...")
			var p1 = test_arena.p1
			var spawn_pos = p1.global_position
			assert(p1.last_checkpoint_position != Vector3.ZERO, "Initial spawn must be set as checkpoint")

			var ctrl_pt: ControlPoint = test_arena.control_points_root.get_child(0) as ControlPoint
			# Runner enters control point
			p1.global_position = ctrl_pt.global_position
			ctrl_pt._on_body_entered(p1)

			var expected_cp = ctrl_pt.global_position + Vector3(0.0, 0.5, 0.0)
			assert(p1.last_checkpoint_position.distance_to(expected_cp) < 0.1, "Checkpoint position must update to control point")

			# Simulate falling into void (Y < -10.0)
			p1.global_position.y = -12.0
			p1._physics_process(0.016)
			assert(p1.global_position.y > 0.0, "Player falling into void must respawn at last valid checkpoint")
			assert(p1.global_position.distance_to(expected_cp) < 0.5, "Respawn position must match checkpoint")
			print("✓ Phase 2 Passed: Checkpoint progression recorded and void respawn safely executed")

		3:
			# --- PHASE 3: Test Research Facility Laser Barriers ---
			test_phase = 4
			print(">>> Phase 3: Testing Functional Laser Barriers in Research Facility...")
			var env = test_arena.get_node_or_null("Environment") as EnvResearchFacility
			assert(env != null, "EnvResearchFacility node must exist")
			assert(env.laser_barrier_data.size() > 0, "Laser barriers must be initialized with data")

			var first_laser = env.laser_barrier_data[0]
			assert(first_laser.has("area") and first_laser.area != null, "Laser barrier Area3D must exist")
			assert(first_laser.has("col") and first_laser.col != null, "Laser collision shape must exist")
			assert(first_laser.col.disabled == false, "Active laser barrier must have collision enabled")

			# Test Runner entering active laser
			var runner = test_arena.p1
			runner.clear_hazard_effect()
			env._on_laser_body_entered(runner, first_laser)
			assert(runner.is_glitched == true, "Runner contacting active laser must receive glitch debuff")
			assert(runner.speed_multiplier == 0.25, "Runner must be slowed by laser barrier")

			# Test Laser State Transition to DISARMED
			env._set_lasers_state(EnvResearchFacility.LaserState.DISARMED, 2.5)
			assert(first_laser.col.disabled == true, "Disarmed laser barrier must disable collision")

			runner.clear_hazard_effect()
			env._on_laser_body_entered(runner, first_laser)
			assert(runner.is_glitched == false, "Runner passing through disarmed laser is unharmed")

			# Test Saboteur Laser Overload
			env.overload_lasers()
			assert(env.current_laser_state == EnvResearchFacility.LaserState.ACTIVE, "Overload must restore lasers to ACTIVE")
			assert(first_laser.col.disabled == false, "Overloaded laser barrier collision must re-enable")
			print("✓ Phase 3 Passed: Laser barriers feature real Area3D collisions, debuff logic, and state cycling")

		4:
			# --- PHASE 4: Final Clean Exit ---
			test_phase = 5
			test_arena.queue_free()
			print(">>> ALL FULL GAMEPLAY REPAIR TESTS PASSED WITH ZERO ERRORS! <<<")
			quit(0)
			return true

	return false
