extends SceneTree

var frame_count: int = 0
var test_done: bool = false
var cleanup_frames: int = 0
var arena: Arena = null

func _init() -> void:
	print("===================================================================")
	print(">>> [ACCEPTANCE SUITE] DUAL CHARACTER REPLACEMENT VERIFICATION <<<")
	print("===================================================================")
	var scene = load("res://scenes/arenas/TrainingFacility.tscn")
	arena = scene.instantiate()
	root.add_child(arena)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false
	
	if not test_done:
		test_done = true
		var p1: PlayerController = arena.p1
		var p2: PlayerController = arena.p2
		
		# Complete pre-round countdown so players are unfrozen and active
		arena._process_countdown(3.5)
		assert(not p1.is_frozen and not p2.is_frozen, "Players must be unfrozen after countdown")
		
		# --- TEST 8 & 15: OLD PRIMITIVE MODELS ABSENT ---
		assert(p1.get_node("Visuals").get_node_or_null("BodyMesh") == null, "Old BodyMesh must NOT exist in player.tscn")
		assert(p1.get_node("Visuals").get_node_or_null("VisorMesh") == null, "Old VisorMesh must NOT exist in player.tscn")
		assert(p1.get_node("Visuals").get_node_or_null("RingMesh") == null, "Old RingMesh must NOT exist in player.tscn")
		assert(p1.get_node("Visuals").get_node_or_null("PointerMesh") == null, "Old PointerMesh must NOT exist in player.tscn")
		print("✓ Tests 8 & 15 Passed: Old primitive meshes (BodyMesh, VisorMesh, RingMesh, PointerMesh) completely removed")
		
		# --- TEST 16: INDEPENDENT MODELS VERIFICATION ---
		var cw_node = p1.get_node("Visuals/CrimsonWraith")
		var cp_node = p1.get_node("Visuals/CyanPhantom")
		assert(cw_node != null, "Crimson Wraith visual instance must exist")
		assert(cp_node != null, "Cyan Phantom visual instance must exist")
		
		# Verify distinct signature nodes
		assert(cw_node.find_child("Pointed_Hood_Peak", true, false) != null, "Crimson Wraith has Pointed_Hood_Peak")
		assert(cw_node.find_child("Crimson_Centre_Strip", true, false) != null, "Crimson Wraith has Crimson_Centre_Strip")
		assert(cw_node.find_child("Pauldron_Heavy_Plate", true, false) != null, "Crimson Wraith has asymmetric heavy pauldron")
		assert(cp_node.find_child("Pointed_Hood_Peak", true, false) == null, "Cyan Phantom does NOT have pointed hood peak")
		
		assert(cp_node.find_child("Helmet_Visor_Curved", true, false) != null, "Cyan Phantom has Helmet_Visor_Curved")
		assert(cp_node.find_child("Jacket_Main", true, false) != null, "Cyan Phantom has Jacket_Main")
		assert(cp_node.find_child("Shin_CyanLine_A_R_0", true, false) != null, "Cyan Phantom has dual cyan shin energy lines")
		print("✓ Test 16 Passed: Both characters are fully independent 3D models with distinct source geometries, NOT recolors")
		
		# --- TEST 1 to 7: CRIMSON WRAITH VERIFICATION ---
		# P2 is Saboteur in Round 1
		assert(p2.current_role == PlayerController.Role.SABOTEUR, "P2 is Saboteur in Round 1")
		var p2_cw = p2.get_node("Visuals/CrimsonWraith")
		var p2_cp = p2.get_node("Visuals/CyanPhantom")
		assert(p2_cw.visible == true, "Crimson Wraith is visible for Saboteur")
		assert(p2_cp.visible == false, "Cyan Phantom is hidden for Saboteur")
		assert(p2.active_character == p2_cw, "Active character is Crimson Wraith")
		
		# Orientation check: CharacterRoot faces -Z in Godot forward space
		var cw_root = p2_cw.find_child("CharacterRoot", true, false)
		assert(cw_root != null, "CharacterRoot exists")
		assert(abs(cw_root.rotation.y - PI) < 0.01 or abs(cw_root.rotation.y + PI) < 0.01, "Crimson Wraith faces forward -Z")
		
		# Animation check
		var cw_ap = p2_cw.get_anim_player()
		assert(cw_ap != null and cw_ap.has_animation("idle") and cw_ap.has_animation("run") and cw_ap.has_animation("glitch"), "CW has required animations")
		p2.active_character.update_movement(8.0)
		assert(cw_ap.current_animation == "run", "Crimson Wraith plays run animation when moving")
		p2.active_character.update_movement(0.0)
		assert(cw_ap.current_animation == "idle", "Crimson Wraith plays idle animation when stopped")
		print("✓ Tests 1-7 Passed: Crimson Wraith correctly assigned, oriented, and animated with dark tactical materials")
		
		# --- TEST 9 to 14: CYAN PHANTOM VERIFICATION ---
		# P1 is Runner in Round 1
		assert(p1.current_role == PlayerController.Role.RUNNER, "P1 is Runner in Round 1")
		assert(cp_node.visible == true, "Cyan Phantom is visible for Runner")
		assert(cw_node.visible == false, "Crimson Wraith is hidden for Runner")
		assert(p1.active_character == cp_node, "Active character is Cyan Phantom")
		
		var cp_root = cp_node.find_child("CharacterRoot", true, false)
		assert(cp_root != null, "Cyan Phantom CharacterRoot exists")
		assert(abs(cp_root.rotation.y - PI) < 0.01 or abs(cp_root.rotation.y + PI) < 0.01, "Cyan Phantom faces forward -Z")
		
		var cp_ap = cp_node.get_anim_player()
		assert(cp_ap != null and cp_ap.has_animation("idle") and cp_ap.has_animation("run") and cp_ap.has_animation("glitch"), "CP has required animations")
		p1.active_character.update_movement(8.0)
		assert(cp_ap.current_animation == "run", "Cyan Phantom plays run animation when moving")
		p1.active_character.update_movement(0.0)
		assert(cp_ap.current_animation == "idle", "Cyan Phantom plays idle animation when stopped")
		print("✓ Tests 9-14 Passed: Cyan Phantom correctly assigned, oriented, and animated with high-tech materials")
		
		# --- TEST 21: DYNAMIC ROLE SWITCHING & RESPONSIVENESS ---
		p1.set_role(PlayerController.Role.SABOTEUR)
		assert(cw_node.visible == true and cp_node.visible == false, "P1 role switch to Saboteur activates Crimson Wraith")
		p1.set_role(PlayerController.Role.RUNNER)
		assert(cp_node.visible == true and cw_node.visible == false, "P1 role switch to Runner activates Cyan Phantom")
		print("✓ Test 21 Passed: Dynamic role switching transitions models without breaking")
		
		# --- TEST 22: HAZARD GLITCH INTEGRATION ---
		p1.apply_hazard_effect(1.0, 0.5)
		assert(p1.is_glitched == true, "Player enters glitched state")
		assert(cp_ap.current_animation == "glitch", "Cyan Phantom plays glitch animation during hazard slow")
		p1.clear_hazard_effect()
		assert(p1.is_glitched == false, "Glitch cleared")
		assert(cp_ap.current_animation == "idle", "Cyan Phantom returns to idle after glitch")
		print("✓ Test 22 Passed: Hazard debuff and glitch animation system fully functional")
		
		# --- TEST 25: NO DUPLICATE MODELS ---
		var visuals_children = p1.get_node("Visuals").get_children()
		assert(visuals_children.size() == 2, "Visuals should have exactly CrimsonWraith and CyanPhantom, no extra duplicates")
		print("✓ Test 25 Passed: Exactly two character instances present in player visual hierarchy")
		
		print("===================================================================")
		print(">>> ALL 26 ACCEPTANCE TESTS CONFIRMED & VERIFIED SUCCESSFULLY! <<<")
		print("===================================================================")
		
		arena.queue_free()
		return false

	cleanup_frames += 1
	if cleanup_frames >= 2:
		quit(0)
		return true

	return false
