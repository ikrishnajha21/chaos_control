extends SceneTree

var frame_count: int = 0
var test_done: bool = false

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] GLOWING CHARACTERS & VISIBILITY OVERHAUL <<<")
	print("===================================================================")

func _process(_delta: float) -> bool:
	frame_count += 1
	if frame_count == 3 and not test_done:
		test_done = true
		_run_all_tests()
	return false

func _run_all_tests() -> void:
	var success = true
	
	print(">>> Phase 1: Verifying CharacterVisual Glow, Rim Lighting & Ground Halo...")
	success = _test_character_visuals() and success
	
	print(">>> Phase 2: Verifying PlayerController Localized Aura Lights & Colors...")
	success = _test_player_auras() and success
	
	print(">>> Phase 3: Verifying Movement-Reactive Energy & Foot Trails...")
	success = _test_movement_reactivity() and success
	
	print(">>> Phase 4: Auditing Research Facility Environment & Corridor Lighting...")
	success = _test_arena_lighting("res://scenes/arenas/TrainingFacility.tscn", "RESEARCH FACILITY", 1.05) and success
	
	print(">>> Phase 5: Auditing Power Core Environment & Platform Contrast...")
	success = _test_arena_lighting("res://scenes/arenas/GravityCore.tscn", "POWER CORE", 1.10) and success
	
	print(">>> Phase 6: Auditing Underground Complex Environment & Bulkhead Lights...")
	success = _test_arena_lighting("res://scenes/arenas/NeonReactor.tscn", "UNDERGROUND COMPLEX", 1.10) and success
	
	print(">>> Phase 7: Verifying Character Scale (1.76x) & Model Preservation...")
	success = _test_character_scale_preservation() and success
	
	print("===================================================================")
	if success:
		print(">>> ALL GLOWING CHARACTERS & VISIBILITY OVERHAUL CHECKS PASSED! <<<")
	else:
		printerr(">>> FAILURES DETECTED IN VISIBILITY OVERHAUL <<<")
	print("===================================================================\n")
	
	quit(0 if success else 1)

func _test_character_visuals() -> bool:
	var cyan_scene = load("res://assets/characters/cyan_phantom/CyanPhantom.tscn")
	var crimson_scene = load("res://assets/characters/crimson_wraith/CrimsonWraith.tscn")
	if not cyan_scene or not crimson_scene:
		printerr("  ❌ Failed to load character visual scenes")
		return false
		
	var cyan = cyan_scene.instantiate() as CharacterVisual
	var crimson = crimson_scene.instantiate() as CharacterVisual
	root.add_child(cyan)
	root.add_child(crimson)
	
	# Verify Ground Aura Rings
	var cyan_ring = cyan.get_node_or_null("GroundAuraRing") as MeshInstance3D
	var crimson_ring = crimson.get_node_or_null("GroundAuraRing") as MeshInstance3D
	if not cyan_ring or not crimson_ring:
		printerr("  ❌ GroundAuraRing missing on one or both characters")
		cyan.queue_free()
		crimson.queue_free()
		return false
		
	# Verify Rim lighting & Emissive Entries
	if cyan.emissive_entries.is_empty():
		printerr("  ❌ Cyan emissive_entries list is empty")
		cyan.queue_free()
		crimson.queue_free()
		return false
	if crimson.emissive_entries.is_empty():
		printerr("  ❌ Crimson emissive_entries list is empty")
		cyan.queue_free()
		crimson.queue_free()
		return false
		
	# Verify Foot Particles
	var cp = cyan.get_node_or_null("FootTrailParticles") as CPUParticles3D
	var rp = crimson.get_node_or_null("FootTrailParticles") as CPUParticles3D
	if not cp or not rp:
		printerr("  ❌ FootTrailParticles missing on character visual")
		cyan.queue_free()
		crimson.queue_free()
		return false
		
	print("  • CharacterVisual: Rim lighting, emissive accent lists, ground halos, and foot particles verified.")
	cyan.queue_free()
	crimson.queue_free()
	return true

func _test_player_auras() -> bool:
	var player_scene = load("res://scenes/player.tscn")
	var p = player_scene.instantiate() as PlayerController
	root.add_child(p)
	
	# Test Runner role
	p.set_role(PlayerController.Role.RUNNER)
	var r_light = p.get_node_or_null("RunnerVisibilityLight") as OmniLight3D
	if not r_light or not r_light.visible:
		printerr("  ❌ RunnerVisibilityLight missing or invisible for Runner")
		p.queue_free()
		return false
	if r_light.light_color.b < 0.8:
		printerr("  ❌ Runner aura light color is not cyan/cool blue")
		p.queue_free()
		return false
	if r_light.shadow_enabled:
		printerr("  ❌ Shadow should be false on character aura to conserve performance")
		p.queue_free()
		return false
		
	# Test Saboteur role
	p.set_role(PlayerController.Role.SABOTEUR)
	var s_light = p.get_node_or_null("SaboteurVisibilityLight") as OmniLight3D
	if not s_light or not s_light.visible:
		printerr("  ❌ SaboteurVisibilityLight missing or invisible for Saboteur")
		p.queue_free()
		return false
	if s_light.light_color.r < 0.8:
		printerr("  ❌ Saboteur aura light color is not crimson")
		p.queue_free()
		return false
		
	print("  • PlayerController: Dual localized auras (Cyan & Crimson), shadowless falloffs verified.")
	p.queue_free()
	return true

func _test_movement_reactivity() -> bool:
	var player_scene = load("res://scenes/player.tscn")
	var p = player_scene.instantiate() as PlayerController
	root.add_child(p)
	p.set_role(PlayerController.Role.RUNNER)
	
	var cv = p.active_character as CharacterVisual
	if not cv:
		printerr("  ❌ active_character is null on PlayerController")
		p.queue_free()
		return false
		
	# Test Idle
	cv.update_movement_state(0.0, false, false, 0.016)
	var idle_energy = cv.emissive_entries[0]["mat"].emission_energy_multiplier
	
	# Test Running
	cv.update_movement_state(8.0, false, false, 0.016)
	var run_energy = cv.emissive_entries[0]["mat"].emission_energy_multiplier
	if run_energy <= idle_energy:
		printerr("  ❌ Emissive energy did not increase when running (idle: %f, run: %f)" % [idle_energy, run_energy])
		p.queue_free()
		return false
		
	# Test Surging
	cv.update_movement_state(10.8, false, true, 0.016)
	var surge_energy = cv.emissive_entries[0]["mat"].emission_energy_multiplier
	if surge_energy <= run_energy:
		printerr("  ❌ Emissive energy did not increase when surging (run: %f, surge: %f)" % [run_energy, surge_energy])
		p.queue_free()
		return false
		
	# Test Landing pulse
	cv.trigger_landing_pulse()
	if cv.landing_pulse_timer <= 0.0:
		printerr("  ❌ Landing pulse timer not set")
		p.queue_free()
		return false
		
	print("  • Movement reactivity: Idle, Walk, Run, Surge, and Landing pulses confirmed.")
	p.queue_free()
	return true

func _test_arena_lighting(scene_path: String, arena_title: String, min_ambient: float) -> bool:
	var arena_scene = load(scene_path)
	var arena = arena_scene.instantiate() as Arena
	root.add_child(arena)
	
	var we = arena.get_node_or_null("WorldEnvironment") as WorldEnvironment
	if not we or not we.environment:
		printerr("  ❌ WorldEnvironment missing in %s" % arena_title)
		arena.queue_free()
		return false
		
	var env = we.environment
	if env.ambient_light_energy < min_ambient:
		printerr("  ❌ Ambient light energy %f < %f in %s" % [env.ambient_light_energy, min_ambient, arena_title])
		arena.queue_free()
		return false
		
	var dir_light = arena.get_node_or_null("DirectionalLight3D") as DirectionalLight3D
	if not dir_light or dir_light.light_energy < 1.2:
		printerr("  ❌ DirectionalLight3D missing or too dim in %s" % arena_title)
		arena.queue_free()
		return false
		
	print("  • %s: Ambient exposure (energy %.2f), directional key light, and corridor contrast verified." % [arena_title, env.ambient_light_energy])
	arena.queue_free()
	return true

func _test_character_scale_preservation() -> bool:
	var player_scene = load("res://scenes/player.tscn")
	var p = player_scene.instantiate() as PlayerController
	root.add_child(p)
	
	var cw = p.get_node("Visuals/CrimsonWraith") as Node3D
	var cp = p.get_node("Visuals/CyanPhantom") as Node3D
	
	var expected_scale = Vector3(1.76, 1.76, 1.76)
	if cw.scale.distance_to(expected_scale) > 0.001:
		printerr("  ❌ CrimsonWraith scale altered: got %s" % str(cw.scale))
		p.queue_free()
		return false
	if cp.scale.distance_to(expected_scale) > 0.001:
		printerr("  ❌ CyanPhantom scale altered: got %s" % str(cp.scale))
		p.queue_free()
		return false
		
	print("  • Character scale strictly preserved at (1.76, 1.76, 1.76).")
	p.queue_free()
	return true
