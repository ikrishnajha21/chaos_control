extends SceneTree

func create_character_scene(char_name: String, glb_path: String, tscn_path: String) -> void:
	print("Creating character scene for: ", char_name)
	var glb_packed = load(glb_path)
	if not glb_packed:
		printerr("Failed to load: ", glb_path)
		return
		
	var root = Node3D.new()
	root.name = char_name
	
	var model_inst = glb_packed.instantiate()
	model_inst.name = "Model"
	root.add_child(model_inst)
	model_inst.owner = root
	
	# Helper recursive ownership
	_set_owner_recursive(model_inst, root)
	
	# Create AnimationPlayer
	var anim_player = AnimationPlayer.new()
	anim_player.name = "AnimationPlayer"
	root.add_child(anim_player)
	anim_player.owner = root
	
	var lib = AnimationLibrary.new()
	
	# --- IDLE ANIMATION ---
	var anim_idle = Animation.new()
	anim_idle.length = 2.0
	anim_idle.loop_mode = Animation.LOOP_LINEAR
	
	# Prefix path to joints inside Model
	# Path structure: Model/CrimsonWraith/CharacterRoot/...
	var char_root_path = "Model/" + char_name + "/CharacterRoot/"
	
	# Torso breathing
	var t_torso = anim_idle.add_track(Animation.TYPE_VALUE)
	anim_idle.track_set_path(t_torso, char_root_path + "Torso:position:y")
	anim_idle.track_insert_key(t_torso, 0.0, 0.0)
	anim_idle.track_insert_key(t_torso, 1.0, 0.012)
	anim_idle.track_insert_key(t_torso, 2.0, 0.0)
	
	# Head idle tilt
	var t_head = anim_idle.add_track(Animation.TYPE_VALUE)
	anim_idle.track_set_path(t_head, char_root_path + "Head:rotation:x")
	anim_idle.track_insert_key(t_head, 0.0, 0.0)
	anim_idle.track_insert_key(t_head, 1.0, -0.04)
	anim_idle.track_insert_key(t_head, 2.0, 0.0)
	
	# Left arm breathing sway
	var t_arm_l = anim_idle.add_track(Animation.TYPE_VALUE)
	anim_idle.track_set_path(t_arm_l, char_root_path + "Shoulder_L/Arm_L:rotation:x")
	anim_idle.track_insert_key(t_arm_l, 0.0, 0.0)
	anim_idle.track_insert_key(t_arm_l, 1.0, 0.035)
	anim_idle.track_insert_key(t_arm_l, 2.0, 0.0)
	
	# Right arm breathing sway
	var t_arm_r = anim_idle.add_track(Animation.TYPE_VALUE)
	anim_idle.track_set_path(t_arm_r, char_root_path + "Shoulder_R/Arm_R:rotation:x")
	anim_idle.track_insert_key(t_arm_r, 0.0, 0.0)
	anim_idle.track_insert_key(t_arm_r, 1.0, 0.035)
	anim_idle.track_insert_key(t_arm_r, 2.0, 0.0)
	
	lib.add_animation("idle", anim_idle)
	
	# --- RUN ANIMATION ---
	var anim_run = Animation.new()
	anim_run.length = 0.6
	anim_run.loop_mode = Animation.LOOP_LINEAR
	
	# Left Arm swing
	var r_arm_l = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_arm_l, char_root_path + "Shoulder_L/Arm_L:rotation:x")
	anim_run.track_insert_key(r_arm_l, 0.0, -0.55)
	anim_run.track_insert_key(r_arm_l, 0.3, 0.45)
	anim_run.track_insert_key(r_arm_l, 0.6, -0.55)
	
	# Right Arm swing
	var r_arm_r = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_arm_r, char_root_path + "Shoulder_R/Arm_R:rotation:x")
	anim_run.track_insert_key(r_arm_r, 0.0, 0.45)
	anim_run.track_insert_key(r_arm_r, 0.3, -0.55)
	anim_run.track_insert_key(r_arm_r, 0.6, 0.45)
	
	# Left Forearm flex
	var r_fore_l = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_fore_l, char_root_path + "Shoulder_L/Arm_L/Forearm_L:rotation:x")
	anim_run.track_insert_key(r_fore_l, 0.0, 0.3)
	anim_run.track_insert_key(r_fore_l, 0.3, 0.05)
	anim_run.track_insert_key(r_fore_l, 0.6, 0.3)
	
	# Right Forearm flex
	var r_fore_r = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_fore_r, char_root_path + "Shoulder_R/Arm_R/Forearm_R:rotation:x")
	anim_run.track_insert_key(r_fore_r, 0.0, 0.05)
	anim_run.track_insert_key(r_fore_r, 0.3, 0.3)
	anim_run.track_insert_key(r_fore_r, 0.6, 0.05)
	
	# Left Leg swing
	var r_leg_l = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_leg_l, char_root_path + "Leg_L:rotation:x")
	anim_run.track_insert_key(r_leg_l, 0.0, 0.50)
	anim_run.track_insert_key(r_leg_l, 0.3, -0.42)
	anim_run.track_insert_key(r_leg_l, 0.6, 0.50)
	
	# Right Leg swing
	var r_leg_r = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_leg_r, char_root_path + "Leg_R:rotation:x")
	anim_run.track_insert_key(r_leg_r, 0.0, -0.42)
	anim_run.track_insert_key(r_leg_r, 0.3, 0.50)
	anim_run.track_insert_key(r_leg_r, 0.6, -0.42)
	
	# Left Shin knee bend (bends back when trailing)
	var r_shin_l = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_shin_l, char_root_path + "Leg_L/Shin_L:rotation:x")
	anim_run.track_insert_key(r_shin_l, 0.0, 0.05)
	anim_run.track_insert_key(r_shin_l, 0.3, 0.45)
	anim_run.track_insert_key(r_shin_l, 0.6, 0.05)
	
	# Right Shin knee bend
	var r_shin_r = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_shin_r, char_root_path + "Leg_R/Shin_R:rotation:x")
	anim_run.track_insert_key(r_shin_r, 0.0, 0.45)
	anim_run.track_insert_key(r_shin_r, 0.3, 0.05)
	anim_run.track_insert_key(r_shin_r, 0.6, 0.45)
	
	# Torso stride bounce
	var r_torso = anim_run.add_track(Animation.TYPE_VALUE)
	anim_run.track_set_path(r_torso, char_root_path + "Torso:position:y")
	anim_run.track_insert_key(r_torso, 0.0, 0.0)
	anim_run.track_insert_key(r_torso, 0.15, 0.035)
	anim_run.track_insert_key(r_torso, 0.3, 0.0)
	anim_run.track_insert_key(r_torso, 0.45, 0.035)
	anim_run.track_insert_key(r_torso, 0.6, 0.0)
	
	lib.add_animation("run", anim_run)
	
	# --- HAZARD GLITCH ANIMATION ---
	var anim_glitch = Animation.new()
	anim_glitch.length = 0.2
	anim_glitch.loop_mode = Animation.LOOP_LINEAR
	var g_torso = anim_glitch.add_track(Animation.TYPE_VALUE)
	anim_glitch.track_set_path(g_torso, char_root_path + "Torso:position:x")
	anim_glitch.track_insert_key(g_torso, 0.0, -0.04)
	anim_glitch.track_insert_key(g_torso, 0.05, 0.04)
	anim_glitch.track_insert_key(g_torso, 0.1, -0.03)
	anim_glitch.track_insert_key(g_torso, 0.15, 0.03)
	anim_glitch.track_insert_key(g_torso, 0.2, -0.04)
	lib.add_animation("glitch", anim_glitch)
	
	anim_player.add_animation_library("", lib)
	
	# Attach controller script
	var script = load("res://scripts/character_visual.gd")
	root.set_script(script)
	
	# Pack and save scene
	var packed = PackedScene.new()
	var pack_err = packed.pack(root)
	if pack_err != OK:
		printerr("Failed to pack scene: ", pack_err)
		return
		
	var save_err = ResourceSaver.save(packed, tscn_path)
	if save_err != OK:
		printerr("Failed to save scene: ", save_err)
		return
		
	print("✓ Successfully saved scene: ", tscn_path)

func _set_owner_recursive(node: Node, new_owner: Node) -> void:
	for child in node.get_children():
		child.owner = new_owner
		_set_owner_recursive(child, new_owner)

func _init() -> void:
	print(">>> Building native Godot character scenes...")
	create_character_scene(
		"CrimsonWraith",
		"res://assets/characters/crimson_wraith/crimson_wraith.glb",
		"res://assets/characters/crimson_wraith/CrimsonWraith.tscn"
	)
	create_character_scene(
		"CyanPhantom",
		"res://assets/characters/cyan_phantom/cyan_phantom.glb",
		"res://assets/characters/cyan_phantom/CyanPhantom.tscn"
	)
	print(">>> Character scene generation complete!")
	quit(0)
