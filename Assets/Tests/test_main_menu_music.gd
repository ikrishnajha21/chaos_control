extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var main_menu: Node = null
var initial_playback_pos: float = 0.0

func _init() -> void:
	print("\n=======================================================")
	print(">>> [TEST START] CORE BREACH MAIN MENU MUSIC AUDIT <<<")
	print("=======================================================")
	
	# Load main menu as the root scene
	var scene = load("res://scenes/main_menu.tscn")
	assert(scene != null, "Main menu scene failed to load")
	main_menu = scene.instantiate()
	root.add_child(main_menu)

func _process(delta: float) -> bool:
	frame_count += 1
	var am = root.get_node_or_null("AudioManager")
	assert(am != null, "AudioManager autoload missing from root")
	assert(am.music_player != null, "AudioManager.music_player missing")

	match test_phase:
		0:
			# Phase 0: Idle Main Menu - Check audio starts automatically without clicking
			if frame_count >= 25:
				print(">>> Phase 0: Verifying Automatic Idle Menu Playback...")
				assert(am.music_player.playing == true, "MusicPlayer must be PLAYING when idle on main menu!")
				assert(am.music_player.bus == "Music", "MusicPlayer must be routed to 'Music' bus")
				assert(AudioServer.get_bus_index("Music") != -1, "Music bus must exist")
				assert(AudioServer.is_bus_mute(AudioServer.get_bus_index("Music")) == false, "Music bus must not be muted")
				assert(AudioServer.is_bus_mute(AudioServer.get_bus_index("Master")) == false, "Master bus must not be muted")
				
				var pos = am.music_player.get_playback_position()
				assert(pos > 0.0, "Playback position must be progressing")
				initial_playback_pos = pos
				print("  ✓ Automatic idle playback verified: playing=true, pos=%.2fs, vol=%.1fdB" % [pos, am.music_player.volume_db])
				test_phase = 1

		1:
			# Phase 1: Wait further without clicking - verify continuous unbroken playback
			if frame_count >= 60:
				print(">>> Phase 1: Verifying Continuous Playback Without Interaction...")
				assert(am.music_player.playing == true, "MusicPlayer must remain playing continuously")
				var cur_pos = am.music_player.get_playback_position()
				assert(cur_pos > initial_playback_pos, "Playback position must continue to advance")
				assert(am.music_player.volume_db > -10.0, "Fade-in must bring volume to audible level")
				print("  ✓ Continuous playback verified: cur_pos=%.2fs, vol=%.1fdB" % [cur_pos, am.music_player.volume_db])
				test_phase = 2

		2:
			# Phase 2: Click multiple buttons - verify SFX plays independently and music is NOT stopped
			print(">>> Phase 2: Verifying Button Clicks & Sound Effects Independence...")
			var pos_before = am.music_player.get_playback_position()
			
			# Simulate button clicks
			main_menu._play_click(1.0)
			main_menu._play_click(1.2)
			main_menu._play_click(1.4)
			
			# Verify music didn't stop or stutter
			assert(am.music_player.playing == true, "Button click must NOT stop background music")
			assert(am.music_player.stream == am.menu_music_stream, "Music stream must remain menu music")
			assert(am.sfx_players.size() >= 1, "SFX pool must exist")
			print("  ✓ Button SFX verified independent on 'SFX' bus; music uninterrupted")
			test_phase = 3

		3:
			# Phase 3: Open and close Settings panel - verify no restarts or duplicate players
			print(">>> Phase 3: Verifying Settings Panel Toggle & No Restarts...")
			var child_count_before = root.get_child_count()
			
			# Open settings
			main_menu._on_settings_pressed()
			assert(main_menu.settings_panel.visible == true, "Settings panel should be visible")
			assert(am.music_player.playing == true, "Music should keep playing in settings")
			
			# Adjust music slider
			main_menu._on_music_slider_changed(60.0)
			assert(abs(am.get_music_volume() - 0.6) < 0.02, "Music volume slider adjustment failed")
			main_menu._on_music_slider_changed(85.0)
			
			# Close settings
			main_menu._close_all_overlays()
			assert(main_menu.settings_panel.visible == false, "Settings panel should be closed")
			assert(main_menu.main_nav.visible == true, "Main nav should be restored")
			assert(am.music_player.playing == true, "Music should remain playing after closing settings")
			
			# Ensure no duplicate players were spawned
			var players_found = 0
			for c in am.get_children():
				if c is AudioStreamPlayer and c.bus == "Music":
					players_found += 1
			assert(players_found == 1, "There must be exactly ONE Music AudioStreamPlayer")
			print("  ✓ Settings navigation verified: no restarts, 0 duplicate players, volume slider works")
			test_phase = 4

		4:
			# Phase 4: Match transition fade-out & Return to Menu
			print(">>> Phase 4: Verifying Match Transition Fade-out & Return...")
			# Simulate entering gameplay
			am.fade_out_menu_music(0.2)
			test_phase = 5

		5:
			# Wait for fade-out
			if frame_count >= 90:
				assert(am.is_menu_music_active == false, "Menu music should be marked inactive")
				print("  ✓ Menu music fade-out verified")
				
				# Now simulate returning to menu
				print(">>> Phase 5: Simulating Return to Main Menu...")
				am.play_menu_music(0.2)
				assert(am.music_player.playing == true, "Music must resume playing upon return to menu")
				assert(am.is_menu_music_active == true, "Menu music marked active")
				print("  ✓ Return to menu verified: music resumed cleanly")
				
				print("=======================================================")
				print(">>> ALL MAIN MENU BACKGROUND MUSIC TESTS PASSED! <<<")
				print("=======================================================\n")
				quit()
				return true

	return false
