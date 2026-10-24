extends SceneTree

var frame_count: int = 0
var test_done: bool = false
var arena: Arena = null

func _init() -> void:
	print("===================================================================")
	print(">>> [VALIDATION] 0.8x CHARACTER MODEL SCALE VERIFICATION SUITE <<<")
	print("===================================================================")
	var scene = load("res://scenes/arenas/TrainingFacility.tscn")
	arena = scene.instantiate()
	root.add_child(arena)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3 or test_done:
		return false
	
	test_done = true
	var p1: PlayerController = arena.p1
	var p2: PlayerController = arena.p2
	
	# --- VERIFY MODEL SCALES (EXACTLY 0.8x of 2.2 = 1.76) ---
	var cw1 = p1.get_node("Visuals/CrimsonWraith")
	var cp1 = p1.get_node("Visuals/CyanPhantom")
	var cw2 = p2.get_node("Visuals/CrimsonWraith")
	var cp2 = p2.get_node("Visuals/CyanPhantom")
	
	print("Player 1 Crimson Wraith scale: ", cw1.scale)
	print("Player 1 Cyan Phantom scale: ", cp1.scale)
	print("Player 2 Crimson Wraith scale: ", cw2.scale)
	print("Player 2 Cyan Phantom scale: ", cp2.scale)
	
	assert(cw1.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "Crimson Wraith visual scale must be 1.76 (0.8x of 2.2)")
	assert(cp1.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "Cyan Phantom visual scale must be 1.76 (0.8x of 2.2)")
	assert(cw2.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "Player 2 Crimson Wraith scale must be 1.76")
	assert(cp2.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "Player 2 Cyan Phantom scale must be 1.76")
	print("✓ Check 1 Passed: Both Crimson Wraith and Cyan Phantom models are scaled to 0.8x current size (1.76)")
	
	# --- VERIFY GAMEPLAY & COLLISION NODES ARE UNTOUCHED ---
	var p1_col: CollisionShape3D = p1.get_node("CollisionShape3D")
	var p2_col: CollisionShape3D = p2.get_node("CollisionShape3D")
	assert(p1.scale.is_equal_approx(Vector3.ONE), "Player 1 CharacterBody3D scale must remain (1, 1, 1)")
	assert(p2.scale.is_equal_approx(Vector3.ONE), "Player 2 CharacterBody3D scale must remain (1, 1, 1)")
	assert(p1_col.scale.is_equal_approx(Vector3.ONE), "Player 1 CollisionShape3D scale must remain (1, 1, 1)")
	assert(p2_col.scale.is_equal_approx(Vector3.ONE), "Player 2 CollisionShape3D scale must remain (1, 1, 1)")
	assert(is_equal_approx(p1_col.shape.radius, 0.45) and is_equal_approx(p1_col.shape.height, 1.4), "Collision shape dimensions must remain unchanged")
	print("✓ Check 2 Passed: Physics body, collision shape, and gameplay nodes remain completely untouched at (1, 1, 1)")
	
	# --- VERIFY GROUNDING & POSITION ---
	assert(cw1.position.is_equal_approx(Vector3.ZERO), "Crimson Wraith origin remains grounded at (0, 0, 0)")
	assert(cp1.position.is_equal_approx(Vector3.ZERO), "Cyan Phantom origin remains grounded at (0, 0, 0)")
	print("✓ Check 3 Passed: Both character models remain grounded at local origin (0, 0, 0)")
	
	# --- VERIFY MOVEMENT & PHYSICS SCRIPTS UNTOUCHED ---
	assert(p1.move_speed == 8.0, "Player move_speed must remain 8.0")
	assert(p1.acceleration == 35.0, "Player acceleration must remain 35.0")
	assert(p1.friction == 30.0, "Player friction must remain 30.0")
	assert(p1.rotation_speed == 14.0, "Player rotation_speed must remain 14.0")
	print("✓ Check 4 Passed: Movement speed, acceleration, friction, and rotation speed completely untouched")
	
	# --- VERIFY ANIMATIONS WORK WITH 0.8x SCALE ---
	arena._process_countdown(3.5)
	p1.active_character.update_movement(8.0)
	var cp_ap = cp1.get_anim_player()
	assert(cp_ap.current_animation == "run", "Cyan Phantom plays run animation at 1.76 scale")
	p1.active_character.update_movement(0.0)
	assert(cp_ap.current_animation == "idle", "Cyan Phantom plays idle animation at 1.76 scale")
	
	p2.active_character.update_movement(8.0)
	var cw_ap = cw2.get_anim_player()
	assert(cw_ap.current_animation == "run", "Crimson Wraith plays run animation at 1.76 scale")
	p2.active_character.update_movement(0.0)
	assert(cw_ap.current_animation == "idle", "Crimson Wraith plays idle animation at 1.76 scale")
	print("✓ Check 5 Passed: Animations run smoothly at 1.76 scale")
	
	# --- VERIFY ROLE SWITCHING ---
	p1.set_role(PlayerController.Role.SABOTEUR)
	assert(cw1.visible and not cp1.visible, "Role switch to Saboteur properly displays Crimson Wraith")
	assert(cw1.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "1.76 scale preserved on role switch")
	p1.set_role(PlayerController.Role.RUNNER)
	assert(cp1.visible and not cw1.visible, "Role switch to Runner properly displays Cyan Phantom")
	assert(cp1.scale.is_equal_approx(Vector3(1.76, 1.76, 1.76)), "1.76 scale preserved on role switch")
	print("✓ Check 6 Passed: Dynamic role switching functions perfectly with 1.76 scale models")
	
	print("===================================================================")
	print(">>> ALL 0.8x SCALE VALIDATION CHECKS PASSED WITH ZERO ERRORS! <<<")
	print("===================================================================")
	quit(0)
	return true
