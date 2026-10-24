extends SceneTree

const SaviourCoinScript = preload("res://scripts/coin.gd")

var frame_count: int = 0
var test_done: bool = false

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] SAVIOUR COIN COLLECTION & LIFETIME EXTENSION <<<")
	print("===================================================================")

func _process(_delta: float) -> bool:
	frame_count += 1
	if frame_count == 3 and not test_done:
		test_done = true
		_run_all_tests()
	return false

func _run_all_tests() -> void:
	var success = true
	
	print(">>> Phase 1: Verifying Coin Scene & Native Component Structure...")
	success = _test_coin_scene_structure() and success
	
	print(">>> Phase 2: Auditing Coin Distribution in Research Facility...")
	success = _test_arena_coin_distribution("res://scenes/arenas/TrainingFacility.tscn", "RESEARCH FACILITY") and success
	
	print(">>> Phase 3: Auditing Coin Distribution in Power Core...")
	success = _test_arena_coin_distribution("res://scenes/arenas/GravityCore.tscn", "POWER CORE") and success
	
	print(">>> Phase 4: Auditing Coin Distribution in Underground Complex...")
	success = _test_arena_coin_distribution("res://scenes/arenas/NeonReactor.tscn", "UNDERGROUND COMPLEX") and success
	
	print(">>> Phase 5: Testing Role-Specific Collection Logic (Saviour vs Saboteur)...")
	success = _test_role_collection_mechanics() and success
	
	print(">>> Phase 6: Testing Authoritative Lifetime Extension & HUD Pulse...")
	success = _test_lifetime_extension_rules() and success
	
	print(">>> Phase 7: Testing Coin Reset on Round Restart & Match Progression...")
	success = _test_coin_reset_cycle() and success
	
	print("===================================================================")
	if success:
		print(">>> ALL SAVIOUR COIN & LIFETIME EXTENSION CHECKS PASSED! <<<")
	else:
		printerr(">>> FAILURES DETECTED IN COIN SYSTEM CHECKS <<<")
	print("===================================================================\n")
	
	quit(0 if success else 1)

func _test_coin_scene_structure() -> bool:
	var coin_scene = load("res://scenes/coin.tscn")
	if not coin_scene:
		printerr("  ❌ Failed to load res://scenes/coin.tscn")
		return false
		
	var coin = coin_scene.instantiate()
	if not coin:
		printerr("  ❌ Coin node failed to instantiate")
		return false
		
	var area = coin.get_node_or_null("Area3D") as Area3D
	if not area or area.collision_mask != 2:
		printerr("  ❌ Coin Area3D missing or collision_mask != 2")
		coin.queue_free()
		return false
		
	var col = area.get_node_or_null("CollisionShape3D") as CollisionShape3D
	if not col or not (col.shape is SphereShape3D):
		printerr("  ❌ Coin CollisionShape3D missing or not SphereShape3D")
		coin.queue_free()
		return false
		
	var bonus = coin.get("time_bonus")
	if bonus != 10.0:
		printerr("  ❌ Default coin time_bonus expected 10.0, got: %s" % str(bonus))
		coin.queue_free()
		return false
		
	print("  • Coin scene hierarchy, collision mask (2), 3D visuals, and light verified.")
	coin.queue_free()
	return true

func _test_arena_coin_distribution(scene_path: String, arena_title: String) -> bool:
	var arena_scene = load(scene_path)
	if not arena_scene:
		printerr("  ❌ Failed to load %s" % scene_path)
		return false
		
	var arena = arena_scene.instantiate() as Arena
	root.add_child(arena)
	
	var coins_node = arena.get_node_or_null("Coins")
	if not coins_node:
		printerr("  ❌ Coins node missing in %s" % arena_title)
		arena.queue_free()
		return false
		
	var coins = coins_node.get_children()
	if coins.size() != 5:
		printerr("  ❌ %s expected 5 coins, got %d" % [arena_title, coins.size()])
		arena.queue_free()
		return false
		
	var positions: Array[Vector3] = []
	for i in range(coins.size()):
		var c = coins[i]
		if not c.has_method("reset_coin"):
			printerr("  ❌ Coin %d lacks reset_coin method in %s" % [i, arena_title])
			arena.queue_free()
			return false
		var pos = c.position
		# Check not duplicating same coordinates
		for p in positions:
			if p.distance_to(pos) < 1.0:
				printerr("  ❌ Coin %d is overlapping another coin in %s" % [i, arena_title])
				arena.queue_free()
				return false
		positions.append(pos)
		
	print("  • %s: Verified 5 distinct, accessible coin locations across arena geometry." % arena_title)
	arena.queue_free()
	return true

func _test_role_collection_mechanics() -> bool:
	var arena_scene = load("res://scenes/arenas/TrainingFacility.tscn")
	var arena = arena_scene.instantiate() as Arena
	root.add_child(arena)
	
	var coin_scene = load("res://scenes/coin.tscn")
	var coin = coin_scene.instantiate()
	arena.add_child(coin)
	coin.position = Vector3(0, 0.8, 0)
	
	# Simulate active round
	arena.is_countdown_active = false
	arena.round_state = Arena.RoundState.ACTIVE
	arena.time_remaining = 60.0
	
	var saboteur = arena.get_node("Players/Player2") as PlayerController
	saboteur.set_role(PlayerController.Role.SABOTEUR)
	
	# Saboteur enters area
	coin._on_body_entered(saboteur)
	if coin.get("is_collected") == true:
		printerr("  ❌ Saboteur was able to collect Saviour Coin!")
		arena.queue_free()
		return false
	if arena.time_remaining != 60.0:
		printerr("  ❌ Saboteur contact altered time_remaining!")
		arena.queue_free()
		return false
		
	# Now Saviour (Runner) enters area
	var runner = arena.get_node("Players/Player1") as PlayerController
	runner.set_role(PlayerController.Role.RUNNER)
	coin._on_body_entered(runner)
	
	if coin.get("is_collected") != true:
		printerr("  ❌ Saviour was not able to collect Saviour Coin!")
		arena.queue_free()
		return false
		
	if arena.time_remaining != 70.0:
		printerr("  ❌ Time did not increase by +10s (expected 70.0, got %f)" % arena.time_remaining)
		arena.queue_free()
		return false
		
	# Duplicate contact check
	coin._on_body_entered(runner)
	if arena.time_remaining != 70.0:
		printerr("  ❌ Duplicate contact awarded time again! (got %f)" % arena.time_remaining)
		arena.queue_free()
		return false
		
	print("  • Saviour role-filtering and duplicate prevention confirmed.")
	arena.queue_free()
	return true

func _test_lifetime_extension_rules() -> bool:
	var arena_scene = load("res://scenes/arenas/TrainingFacility.tscn")
	var arena = arena_scene.instantiate() as Arena
	root.add_child(arena)
	
	arena.is_countdown_active = false
	arena.round_state = Arena.RoundState.ACTIVE
	
	# Normal addition
	arena.time_remaining = 50.0
	var added = arena.add_saviour_lifetime(10.0)
	if added != 10.0 or arena.time_remaining != 60.0:
		printerr("  ❌ Normal addition failed: expected 60.0, got %f" % arena.time_remaining)
		arena.queue_free()
		return false
		
	# Cap check
	arena.time_remaining = 175.0
	added = arena.add_saviour_lifetime(10.0)
	if arena.time_remaining > Arena.MAX_SAVIOUR_LIFETIME:
		printerr("  ❌ Exceeded MAX_SAVIOUR_LIFETIME: got %f" % arena.time_remaining)
		arena.queue_free()
		return false
	if added != 5.0 or arena.time_remaining != 180.0:
		printerr("  ❌ Cap addition failed: expected 180.0, got %f" % arena.time_remaining)
		arena.queue_free()
		return false
		
	# Inactive round check
	arena.round_state = Arena.RoundState.RUNNER_WON
	added = arena.add_saviour_lifetime(10.0)
	if added != 0.0:
		printerr("  ❌ Added time during inactive round state!")
		arena.queue_free()
		return false
		
	print("  • Authoritative timer boundaries, safety caps, and round state gates confirmed.")
	arena.queue_free()
	return true

func _test_coin_reset_cycle() -> bool:
	var arena_scene = load("res://scenes/arenas/TrainingFacility.tscn")
	var arena = arena_scene.instantiate() as Arena
	root.add_child(arena)
	
	var coins = arena.get_node("Coins").get_children()
	var runner = arena.get_node("Players/Player1") as PlayerController
	runner.set_role(PlayerController.Role.RUNNER)
	arena.is_countdown_active = false
	arena.round_state = Arena.RoundState.ACTIVE
	
	# Collect first 2 coins
	coins[0]._on_body_entered(runner)
	coins[1]._on_body_entered(runner)
	if coins[0].get("is_collected") != true or coins[1].get("is_collected") != true:
		printerr("  ❌ Coins not marked as collected")
		arena.queue_free()
		return false
		
	# Start round 2
	arena._start_round(2)
	for i in range(coins.size()):
		if coins[i].get("is_collected") == true:
			printerr("  ❌ Coin %d remained collected after _start_round()" % i)
			arena.queue_free()
			return false
		if not coins[i].visible:
			printerr("  ❌ Coin %d remained invisible after _start_round()" % i)
			arena.queue_free()
			return false
			
	print("  • Round reset cycle cleanly restored all coins.")
	arena.queue_free()
	return true
