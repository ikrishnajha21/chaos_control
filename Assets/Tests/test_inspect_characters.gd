extends SceneTree

func _init():
	print(">>> [TEST] Verifying Character Assets Import & Structure...")
	
	var cw_res = load("res://assets/characters/crimson_wraith/crimson_wraith.glb")
	assert(cw_res != null, "crimson_wraith.glb must load")
	var cw = cw_res.instantiate()
	assert(cw != null, "crimson_wraith instance must be created")
	print("✓ Crimson Wraith GLB loaded successfully. Root name: ", cw.name)
	
	var cp_res = load("res://assets/characters/cyan_phantom/cyan_phantom.glb")
	assert(cp_res != null, "cyan_phantom.glb must load")
	var cp = cp_res.instantiate()
	assert(cp != null, "cyan_phantom instance must be created")
	print("✓ Cyan Phantom GLB loaded successfully. Root name: ", cp.name)
	
	# Verify distinct hierarchy and components
	var cw_head = cw.find_child("Head", true, false)
	var cw_torso = cw.find_child("Torso", true, false)
	var cw_arm_l = cw.find_child("Arm_L", true, false)
	var cw_arm_r = cw.find_child("Arm_R", true, false)
	var cw_leg_l = cw.find_child("Leg_L", true, false)
	var cw_leg_r = cw.find_child("Leg_R", true, false)
	assert(cw_head != null and cw_torso != null and cw_arm_l != null and cw_leg_l != null, "Crimson Wraith must have anatomical nodes")
	print("✓ Crimson Wraith anatomical nodes verified: Head, Torso, Arms, Legs present")

	var cp_head = cp.find_child("Head", true, false)
	var cp_torso = cp.find_child("Torso", true, false)
	var cp_arm_l = cp.find_child("Arm_L", true, false)
	var cp_arm_r = cp.find_child("Arm_R", true, false)
	var cp_leg_l = cp.find_child("Leg_L", true, false)
	var cp_leg_r = cp.find_child("Leg_R", true, false)
	assert(cp_head != null and cp_torso != null and cp_arm_l != null and cp_leg_l != null, "Cyan Phantom must have anatomical nodes")
	print("✓ Cyan Phantom anatomical nodes verified: Head, Torso, Arms, Legs present")
	
	# Verify distinct features
	assert(cw.find_child("Pointed_Hood_Peak", true, false) != null, "Crimson Wraith must have Pointed_Hood_Peak")
	assert(cw.find_child("Crimson_Centre_Strip", true, false) != null, "Crimson Wraith must have Crimson_Centre_Strip")
	assert(cp.find_child("Helmet_Visor_Curved", true, false) != null, "Cyan Phantom must have Helmet_Visor_Curved")
	assert(cp.find_child("Jacket_Main", true, false) != null, "Cyan Phantom must have Jacket_Main")
	print("✓ Distinct signature components verified on both characters")
	
	print(">>> ALL CHARACTER IMPORT CHECKS PASSED!")
	quit(0)
