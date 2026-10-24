extends SceneTree

# ==============================================================================
# CORE BREACH — COMPREHENSIVE WALL-BLOCKED SHOOTING & SHATTER FX AUDIT
# ==============================================================================

const CyanPhantomShatterFXClass = preload("res://scripts/characters/cyan_phantom_shatter_fx.gd")

func _init() -> void:
	print("\n=======================================================")
	print("--- STARTING CORE BREACH DEEP AUDIT: WALL & SHATTER ---")
	print("=======================================================")
	call_deferred("_run_all_tests")

func _run_all_tests() -> void:
	var passed: int = 0
	var total: int = 0

	# TEST 1: Clear Line of Sight Shooting
	total += 1
	if await _test_clear_line_of_sight():
		passed += 1
		print("[PASS] Test 1: Clear Line of Sight Shot Hits Runner & Applies Impact")
	else:
		print("[FAIL] Test 1: Clear Line of Sight Shot Failed")

	# TEST 2: Wall Between Characters Blocks Shooting
	total += 1
	if await _test_wall_blocked_shooting():
		passed += 1
		print("[PASS] Test 2: Solid Wall Stops Shot, Runner Receives NO Damage")
	else:
		print("[FAIL] Test 2: Solid Wall Failed to Block Shot")

	# TEST 3: Thin Wall & Barrier Tunneling Prevention
	total += 1
	if await _test_thin_wall_obstruction():
		passed += 1
		print("[PASS] Test 3: Thin Wall (0.6m) Completely Prevents Tunneling")
	else:
		print("[FAIL] Test 3: Thin Wall Failed to Prevent Tunneling")

	# TEST 4: Final Blast Behind Cover Deflects
	total += 1
	if await _test_final_blast_behind_cover():
		passed += 1
		print("[PASS] Test 4: Final Blast Deflects at Wall, Runner NOT Shattered")
	else:
		print("[FAIL] Test 4: Final Blast Behind Cover Failed")

	# TEST 5: Direct Final Blast Causes Physical Shatter
	total += 1
	if await _test_direct_final_blast_shatter():
		passed += 1
		print("[PASS] Test 5: Direct Final Blast Shatters Cyan Phantom into Fragments")
	else:
		print("[FAIL] Test 5: Direct Final Blast Shatter Failed")

	# TEST 6: Respawn Restores Intact Character
	total += 1
	if await _test_respawn_after_shatter():
		passed += 1
		print("[PASS] Test 6: Respawn Restores Intact Cyan Phantom, Clears Shatter State")
	else:
		print("[FAIL] Test 6: Respawn After Shatter Failed")

	# TEST 7: Arena Scenes Geometry & Scripts Load Test
	total += 1
	if await _test_all_arenas_loading():
		passed += 1
		print("[PASS] Test 7: All 3 Arenas (TrainingFacility, GravityCore, NeonReactor) Validated")
	else:
		print("[FAIL] Test 7: Arena Scenes Loading Failed")

	print("\n=======================================================")
	print("AUDIT RESULTS: %d / %d TESTS PASSED" % [passed, total])
	print("=======================================================\n")
	quit(0 if passed == total else 1)

func _test_clear_line_of_sight() -> bool:
	var world_root = Node3D.new()
	root.add_child(world_root)

	var p1 = preload("res://scenes/player.tscn").instantiate()
	p1.player_id = 1
	world_root.add_child(p1)
	p1.global_position = Vector3(0, 1, 0)
	p1.set_role(PlayerController.Role.SABOTEUR)

	var p2 = preload("res://scenes/player.tscn").instantiate()
	p2.player_id = 2
	world_root.add_child(p2)
	p2.global_position = Vector3(0, 1, 10)
	p2.set_role(PlayerController.Role.RUNNER)

	await physics_frame
	await physics_frame

	var target_pt = p2.global_position + Vector3(0, 0.9, 0)
	p1.aim_at_target(target_pt, 0.0)
	await physics_frame

	var muzzle_pos = p1.get_gun_muzzle_position()
	var aim_dir = (target_pt - muzzle_pos).normalized()

	var proj = p1.fire_overdrive_gun(aim_dir)
	if proj == null:
		world_root.queue_free()
		return false

	# Wait for projectile to travel 10 meters and impact
	for i in range(25):
		await physics_frame

	var hit_success = (p2.is_glitched or p2.hazard_timer > 0.0)
	world_root.queue_free()
	await physics_frame
	return hit_success

func _test_wall_blocked_shooting() -> bool:
	var world_root = Node3D.new()
	root.add_child(world_root)

	# Floor
	var floor_body = StaticBody3D.new()
	floor_body.collision_layer = 1
	var floor_col = CollisionShape3D.new()
	var box = BoxShape3D.new()
	box.size = Vector3(50, 1, 50)
	floor_col.shape = box
	floor_body.add_child(floor_col)
	world_root.add_child(floor_body)
	floor_body.global_position = Vector3(0, -0.5, 0)

	# Wall between them
	var wall = StaticBody3D.new()
	wall.collision_layer = 1
	var wall_col = CollisionShape3D.new()
	var wall_box = BoxShape3D.new()
	wall_box.size = Vector3(10, 4, 1.0)
	wall_col.shape = wall_box
	wall.add_child(wall_col)
	world_root.add_child(wall)
	wall.global_position = Vector3(0, 2, 5) # Placed at z = 5

	var p1 = preload("res://scenes/player.tscn").instantiate()
	p1.player_id = 1
	world_root.add_child(p1)
	p1.global_position = Vector3(0, 1, 0)
	p1.set_role(PlayerController.Role.SABOTEUR)

	var p2 = preload("res://scenes/player.tscn").instantiate()
	p2.player_id = 2
	world_root.add_child(p2)
	p2.global_position = Vector3(0, 1, 10)
	p2.set_role(PlayerController.Role.RUNNER)

	await physics_frame
	await physics_frame

	var target_pt = p2.global_position + Vector3(0, 0.9, 0)
	p1.aim_at_target(target_pt, 0.0)
	await physics_frame

	var muzzle_pos = p1.get_gun_muzzle_position()
	var aim_dir = (target_pt - muzzle_pos).normalized()

	var proj = p1.fire_overdrive_gun(aim_dir)
	if proj == null:
		world_root.queue_free()
		return false

	# Wait for projectile to impact wall
	for i in range(25):
		await physics_frame

	# Check that projectile stopped at wall and p2 was NEVER touched
	var p2_untouched = (not p2.is_eliminated and not p2.is_glitched and p2.hazard_timer == 0.0)
	world_root.queue_free()
	await physics_frame
	return p2_untouched

func _test_thin_wall_obstruction() -> bool:
	var world_root = Node3D.new()
	root.add_child(world_root)

	# Thin Arena Wall (0.6m thick)
	var thin_wall = StaticBody3D.new()
	thin_wall.collision_layer = 1
	var col = CollisionShape3D.new()
	var box = BoxShape3D.new()
	box.size = Vector3(12, 4, 0.6)
	col.shape = box
	thin_wall.add_child(col)
	world_root.add_child(thin_wall)
	thin_wall.global_position = Vector3(0, 2, 4.0)

	var p1 = preload("res://scenes/player.tscn").instantiate()
	p1.player_id = 1
	world_root.add_child(p1)
	p1.global_position = Vector3(0, 1, 0)
	p1.set_role(PlayerController.Role.SABOTEUR)

	var p2 = preload("res://scenes/player.tscn").instantiate()
	p2.player_id = 2
	world_root.add_child(p2)
	p2.global_position = Vector3(0, 1, 6.0) # 1.4m behind the thin wall
	p2.set_role(PlayerController.Role.RUNNER)

	await physics_frame
	await physics_frame

	var target_pt = p2.global_position + Vector3(0, 0.9, 0)
	p1.aim_at_target(target_pt, 0.0)
	await physics_frame

	var muzzle_pos = p1.get_gun_muzzle_position()
	var aim_dir = (target_pt - muzzle_pos).normalized()

	# Fire 3 rapid shots
	for s in range(3):
		p1.fire_overdrive_gun(aim_dir)
		for f in range(4):
			await physics_frame

	for f in range(25):
		await physics_frame

	var p2_safe = (not p2.is_eliminated and not p2.is_glitched and p2.hazard_timer == 0.0)
	world_root.queue_free()
	await physics_frame
	return p2_safe

func _test_final_blast_behind_cover() -> bool:
	var arena = preload("res://scenes/arenas/TrainingFacility.tscn").instantiate()
	root.add_child(arena)
	await physics_frame
	await physics_frame

	var saboteur = arena._get_active_saboteur()
	var runner = arena._get_active_runner()
	if not saboteur or not runner:
		arena.queue_free()
		return false

	# Position runner behind an environment wall
	var wall = StaticBody3D.new()
	wall.collision_layer = 1
	var col = CollisionShape3D.new()
	var box = BoxShape3D.new()
	box.size = Vector3(8, 4, 1.0)
	col.shape = box
	wall.add_child(col)
	arena.add_child(wall)
	wall.global_position = Vector3(0, 2, 5)

	saboteur.global_position = Vector3(0, 0.5, 0)
	runner.global_position = Vector3(0, 0.5, 10)
	runner.is_eliminated = false
	runner.is_shattered = false

	await physics_frame
	await physics_frame

	var has_los = arena.has_line_of_sight_to_runner(saboteur, runner)
	if has_los:
		arena.queue_free()
		return false

	var initial_time = arena.time_remaining
	arena._trigger_final_blast(saboteur, runner)
	await physics_frame

	var success = (not runner.is_shattered and not runner.is_eliminated and arena.time_remaining == initial_time)
	arena.queue_free()
	await physics_frame
	return success

func _test_direct_final_blast_shatter() -> bool:
	var arena = preload("res://scenes/arenas/TrainingFacility.tscn").instantiate()
	root.add_child(arena)
	await physics_frame
	await physics_frame

	var saboteur = arena._get_active_saboteur()
	var runner = arena._get_active_runner()
	if not saboteur or not runner:
		arena.queue_free()
		return false

	saboteur.global_position = Vector3(0, 0.5, 0)
	runner.global_position = Vector3(0, 0.5, 6)
	runner.is_eliminated = false
	runner.is_shattered = false
	if runner.visual_root:
		runner.visual_root.visible = true

	await physics_frame
	await physics_frame

	var has_los = arena.has_line_of_sight_to_runner(saboteur, runner)
	if not has_los:
		arena.queue_free()
		return false

	var initial_time = arena.time_remaining
	arena._trigger_final_blast(saboteur, runner)
	await physics_frame
	await physics_frame

	# Verify:
	# 1. Match time reduced by 2.0s
	var time_reduced = (arena.time_remaining <= initial_time - 1.9)
	# 2. Runner is marked shattered
	var is_shattered = runner.is_shattered
	# 3. Runner is eliminated
	var is_elim = runner.is_eliminated
	# 4. Runner's visual mesh is hidden
	var visuals_hidden = (runner.visual_root != null and not runner.visual_root.visible)
	# 5. CyanPhantomShatterFX exists
	var shatter_fx_found = false
	for node in arena.find_children("*", "", true, false):
		if node is CyanPhantomShatterFXClass or node.has_method("explode_shatter"):
			shatter_fx_found = true
			break

	var all_ok = time_reduced and is_shattered and is_elim and visuals_hidden and shatter_fx_found
	arena.queue_free()
	await physics_frame
	return all_ok

func _test_respawn_after_shatter() -> bool:
	var world_root = Node3D.new()
	root.add_child(world_root)

	var p2 = preload("res://scenes/player.tscn").instantiate()
	p2.player_id = 2
	world_root.add_child(p2)
	p2.global_position = Vector3(0, 1, 0)
	p2.set_role(PlayerController.Role.RUNNER)

	await physics_frame
	await physics_frame

	# Trigger shatter
	p2.trigger_shatter_destruction(Vector3(0, 1, -2))
	await physics_frame

	if not p2.is_shattered or not p2.is_eliminated or p2.visual_root.visible:
		world_root.queue_free()
		return false

	# Respawn
	p2.respawn_at_checkpoint()
	await physics_frame

	var restored = (not p2.is_shattered and not p2.is_eliminated and p2.visual_root.visible and p2.visual_root.position == Vector3.ZERO)
	world_root.queue_free()
	await physics_frame
	return restored

func _test_all_arenas_loading() -> bool:
	var arena_scenes = [
		"res://scenes/arenas/TrainingFacility.tscn",
		"res://scenes/arenas/GravityCore.tscn",
		"res://scenes/arenas/NeonReactor.tscn"
	]

	for scene_path in arena_scenes:
		var scene_res = load(scene_path)
		if not scene_res:
			print("Failed to load: ", scene_path)
			return false
		var inst = scene_res.instantiate()
		root.add_child(inst)
		await physics_frame
		await physics_frame

		var saboteur = inst._get_active_saboteur()
		var runner = inst._get_active_runner()
		if not saboteur or not runner:
			print("Missing saboteur or runner in: ", scene_path)
			inst.queue_free()
			return false

		# Verify muzzle and character nodes
		var muzzle = saboteur.get_gun_muzzle_position()
		if muzzle == Vector3.ZERO:
			print("Muzzle position is zero in: ", scene_path)
			inst.queue_free()
			return false

		inst.queue_free()
		await physics_frame

	return true
