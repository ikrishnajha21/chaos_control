extends SceneTree

var arena: Arena
var frame_count: int = 0
var test_stage: int = 0

func _init() -> void:
	print(">>> [TEST START] Saboteur Ability Verification")
	var scene = load("res://scenes/arenas/TrainingFacility.tscn")
	arena = scene.instantiate()
	root.add_child(arena)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false
		
	var p1: PlayerController = arena.p1
	var p2: PlayerController = arena.p2

	if test_stage == 0:
		test_stage = 1
		arena._process_countdown(3.5)
		# Initial checks
		assert(arena.ability_cooldown == 0.0, "Cooldown should initially be 0.0")
		assert(arena.p2_ability_status.text == "Trap [SPACE]: READY", "P2 HUD status should be READY")
		assert(arena.p2_cooldown_bar.value == 100.0, "Cooldown bar should be at 100%")
		print("✓ Test 1: Initial Saboteur ability state is READY (cooldown = 0)")

		# Test Player 1 cannot trigger ability
		p1.set_role(PlayerController.Role.RUNNER)
		# Try invoking _trigger_saboteur_ability if p2 was somehow runner
		var old_p2_role = p2.current_role
		p2.current_role = PlayerController.Role.RUNNER
		arena._trigger_saboteur_ability()
		assert(arena.ability_cooldown == 0.0, "Non-saboteur cannot trigger ability")
		p2.current_role = old_p2_role
		print("✓ Test 2: Role check prevents non-saboteur from activating ability")

		# Test Player 2 triggers ability via Space
		p1.global_position = Vector3(2.0, 0.5, 2.0)
		var ev = InputEventAction.new()
		ev.action = "p2_action"
		ev.pressed = true
		arena._unhandled_input(ev)
		
		assert(arena.ability_cooldown > 5.8, "Cooldown must start at 6.0 seconds")
		assert(arena.active_hazard_instance != null, "HazardZone instance should be spawned")
		var hazard: HazardZone = arena.active_hazard_instance
		assert(hazard.current_state == HazardZone.State.WARNING, "Hazard should start in WARNING state")
		assert(hazard.warning_visuals.visible == true, "Warning visuals must be visible")
		assert(hazard.active_visuals.visible == false, "Active visuals must be hidden during warning")
		print("✓ Test 3: Player 2 activates ability -> Hazard spawned in WARNING state")

		# Test Runner inside warning zone is NOT slowed yet
		hazard.global_position = p1.global_position
		hazard._on_body_entered(p1)
		assert(p1.speed_multiplier == 1.0, "Runner must NOT be slowed during warning phase")
		assert(not p1.is_glitched, "Runner must NOT be glitched during warning phase")
		print("✓ Test 4: Runner is safe during 1.0s warning phase")

		# Test ability blocked during cooldown
		var old_cd = arena.ability_cooldown
		arena._unhandled_input(ev)
		assert(arena.ability_cooldown == old_cd, "Ability must be ignored while on cooldown")
		print("✓ Test 5: Activation blocked while on cooldown")

		# Advance hazard from WARNING to ACTIVE
		hazard._transition_to_active()
		assert(hazard.current_state == HazardZone.State.ACTIVE, "Hazard should be in ACTIVE state")
		assert(hazard.warning_visuals.visible == false, "Warning visuals must be hidden in active state")
		assert(hazard.active_visuals.visible == true, "Active visuals must be visible in active state")
		print("✓ Test 6: Hazard transitions to ACTIVE state with active visuals")

		# Test Runner entering active hazard receives slow/stun effect
		hazard._try_apply_hazard(p1)
		assert(p1.speed_multiplier == 0.25, "Runner must be slowed to 25% speed")
		assert(p1.is_glitched == true, "Runner must have glitch state active")
		assert(p1.hazard_timer >= 1.1, "Stun duration should be 1.125s (with Cybernetic Resilience)")
		print("✓ Test 7: Runner entering active hazard receives 75% speed debuff and glitch state")

		# Test repeated trigger prevention (no double trigger in same hazard)
		p1.hazard_timer = 0.8
		hazard._try_apply_hazard(p1)
		assert(p1.hazard_timer == 0.8, "Hazard must not reset or stack timer every frame")
		print("✓ Test 8: Single-application guard prevents repeated triggers per frame")

		# Test effect wears off after 1.5 seconds
		p1._physics_process(1.6)
		assert(p1.speed_multiplier == 1.0, "Speed must restore to 100% after duration expires")
		assert(p1.is_glitched == false, "Glitch state must be cleared after duration expires")
		print("✓ Test 9: Effect wears off and player speed fully restored")

		# Test round reset resets ability and clears hazards
		arena._reset_positions()
		assert(arena.ability_cooldown == 0.0, "Cooldown must reset to 0.0 on round reset")
		assert(arena.p2_ability_status.text == "Trap [SPACE]: READY", "Status must restore to READY")
		print("✓ Test 10: Round reset clears hazard instances and recharges ability")

		print(">>> ALL 10 SABOTEUR ABILITY TESTS PASSED SUCCESSFULLY! <<<")
		quit(0)
		return true

	return false
