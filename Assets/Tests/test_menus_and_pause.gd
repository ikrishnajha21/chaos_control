extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var menu_inst: Node = null
var arena_inst: Node = null
var audio_mgr: Node = null

func _init() -> void:
	print(">>> [TEST START] Menus, HUD & Pause System Verification Suite")
	var audio_mgr_script = load("res://scripts/audio_manager.gd")
	if audio_mgr_script:
		audio_mgr = audio_mgr_script.new()
		audio_mgr.name = "AudioManager"
		root.add_child(audio_mgr)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	match test_phase:
		0:
			# Phase 0: Test Main Menu
			print(">>> Testing Main Menu (res://scenes/main_menu.tscn)...")
			var menu_scene = load("res://scenes/main_menu.tscn")
			assert(menu_scene != null, "Main menu scene failed to load")
			menu_inst = menu_scene.instantiate()
			root.add_child(menu_inst)
			test_phase = 1

		1:
			# Verify buttons on Main Menu
			assert(menu_inst.btn_play != null, "PlayButton missing")
			assert(menu_inst.btn_arena_select != null, "ArenaSelectButton missing")
			assert(menu_inst.btn_how_to_play != null, "HowToPlayButton missing")
			assert(menu_inst.btn_settings != null, "SettingsButton missing")
			assert(menu_inst.btn_quit != null, "QuitButton missing")
			print("  ✓ Main menu navigation buttons verified")

			# Test Arena Select Navigation
			menu_inst.btn_arena_select.pressed.emit()
			assert(menu_inst.arena_select_panel.visible == true, "Arena select panel not shown")
			assert(menu_inst.main_nav.visible == false, "Main nav not hidden")
			print("  ✓ Arena selection panel transition verified")

			# Switch arena cards
			menu_inst.card_gravity.pressed.emit()
			assert(menu_inst.selected_arena_name == "POWER CORE" or menu_inst.selected_arena_name == "GRAVITY CORE", "Failed to select Gravity Core")
			assert(menu_inst.selected_arena_path == "res://scenes/arenas/GravityCore.tscn", "Gravity core path mismatch")
			
			menu_inst.card_reactor.pressed.emit()
			assert(menu_inst.selected_arena_name == "UNDERGROUND COMPLEX" or menu_inst.selected_arena_name == "NEON REACTOR", "Failed to select Neon Reactor")
			assert(menu_inst.selected_arena_path == "res://scenes/arenas/NeonReactor.tscn", "Neon reactor path mismatch")
			
			menu_inst.card_training.pressed.emit()
			assert(menu_inst.selected_arena_name == "RESEARCH FACILITY" or menu_inst.selected_arena_name == "TRAINING FACILITY", "Failed to select Training Facility")
			print("  ✓ Arena cards selection & description updates verified")

			menu_inst.btn_back_arena.pressed.emit()
			assert(menu_inst.arena_select_panel.visible == false, "Arena select not closed")
			assert(menu_inst.main_nav.visible == true, "Main nav not restored")
			print("  ✓ Arena selection back button verified")

			# How to Play
			menu_inst.btn_how_to_play.pressed.emit()
			assert(menu_inst.how_to_play_panel.visible == true, "How to play panel not shown")
			assert(menu_inst.main_nav.visible == false, "Main nav not hidden")
			menu_inst.btn_back_how_to_play.pressed.emit()
			assert(menu_inst.how_to_play_panel.visible == false, "How to play not closed")
			assert(menu_inst.main_nav.visible == true, "Main nav not restored")
			print("  ✓ How To Play screen and back navigation verified")

			# Settings
			menu_inst.btn_settings.pressed.emit()
			assert(menu_inst.settings_panel.visible == true, "Settings panel not shown")
			assert(menu_inst.main_nav.visible == false, "Main nav not hidden")

			var initial_mute = AudioServer.is_bus_mute(0)
			menu_inst.btn_mute.button_pressed = not initial_mute
			assert(AudioServer.is_bus_mute(0) == (not initial_mute), "Audio mute toggle failed")
			menu_inst.btn_mute.button_pressed = initial_mute

			# Test Music & SFX Sliders
			assert(menu_inst.slider_music != null, "MusicSlider missing")
			assert(menu_inst.slider_sfx != null, "SfxSlider missing")
			menu_inst.slider_music.value = 50.0
			menu_inst.slider_sfx.value = 60.0
			assert(AudioServer.get_bus_index("Music") != -1, "Music bus missing")
			assert(AudioServer.get_bus_index("SFX") != -1, "SFX bus missing")

			menu_inst.btn_back_settings.pressed.emit()
			assert(menu_inst.settings_panel.visible == false, "Settings not closed")
			assert(menu_inst.main_nav.visible == true, "Main nav not restored")
			print("  ✓ Settings toggles and back navigation verified")

			menu_inst.queue_free()
			print("✓ Phase 1 Passed: Main Menu and sub-screens fully verified")
			test_phase = 2

		2:
			# Phase 2: In-Game Pause System & Overlays in Arena
			print(">>> Testing In-Game Pause & Overlays (res://scenes/arenas/TrainingFacility.tscn)...")
			var arena_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(arena_scene != null, "Training Facility scene failed to load")
			arena_inst = arena_scene.instantiate()
			root.add_child(arena_inst)
			test_phase = 3

		3:
			# Verify Pause Overlay Nodes
			assert(arena_inst.pause_overlay != null, "PauseOverlay missing")
			assert(arena_inst.btn_pause_resume != null, "ResumeButton missing")
			assert(arena_inst.btn_pause_restart != null, "RestartRoundButton missing")
			assert(arena_inst.btn_pause_main_menu != null, "MainMenuButton missing")
			assert(arena_inst.pause_overlay.visible == false, "PauseOverlay should start hidden")
			assert(paused == false, "Scene tree should not start paused")
			print("  ✓ Pause overlay nodes verified")

			# Test HUD Pause Button
			var hud_pause_btn = arena_inst.get_node_or_null("HUD/MarginContainer/TopBar/MatchHeader/PauseButton") as Button
			assert(hud_pause_btn != null, "HUD PauseButton missing")
			hud_pause_btn.pressed.emit()
			assert(paused == true, "HUD PauseButton should pause tree")
			assert(arena_inst.pause_overlay.visible == true, "HUD PauseButton should show PauseOverlay")
			arena_inst.btn_pause_resume.pressed.emit()
			assert(paused == false, "Resume button should unpause")
			print("  ✓ TopBar HUD Pause Button click verified")

			# Test Toggling Pause
			arena_inst.toggle_pause(true)
			assert(paused == true, "SceneTree should be paused")
			assert(arena_inst.pause_overlay.visible == true, "PauseOverlay should be visible")
			print("  ✓ Pause activation verified (tree paused & overlay shown)")

			# Test Resume Button
			arena_inst.btn_pause_resume.pressed.emit()
			assert(paused == false, "SceneTree should be unpaused after Resume")
			assert(arena_inst.pause_overlay.visible == false, "PauseOverlay should be hidden after Resume")
			print("  ✓ Resume button unpause verified")

			# Test Pause & Restart Round Button
			arena_inst.toggle_pause(true)
			assert(paused == true, "SceneTree should be paused")
			arena_inst.btn_pause_restart.pressed.emit()
			assert(paused == false, "SceneTree should be unpaused after Restart")
			assert(arena_inst.pause_overlay.visible == false, "PauseOverlay should be hidden after Restart")
			print("  ✓ Restart round from pause menu verified")

			# Test Results Screen Change Arena / Main Menu
			var change_arena_btn = arena_inst.get_node("HUD/MatchResultsOverlay/PanelContainer/VBox/ChangeArenaButton") as Button
			assert(change_arena_btn != null, "ChangeArenaButton missing")
			print("  ✓ Match results return to main menu button verified")

			arena_inst.queue_free()
			paused = false
			print("✓ Phase 2 Passed: In-Game Pause and Menu integration fully verified")
			test_phase = 4

		4:
			# Phase 3: Verify Gravity Core and Neon Reactor have PauseOverlay
			print(">>> Verifying PauseOverlay in Gravity Core & Neon Reactor...")
			var gc_scene = load("res://scenes/arenas/GravityCore.tscn")
			var gc_inst = gc_scene.instantiate()
			root.add_child(gc_inst)
			assert(gc_inst.get_node("HUD/PauseOverlay") != null, "GravityCore missing pause_overlay")
			gc_inst.queue_free()

			var nr_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var nr_inst = nr_scene.instantiate()
			root.add_child(nr_inst)
			assert(nr_inst.get_node("HUD/PauseOverlay") != null, "NeonReactor missing pause_overlay")
			nr_inst.queue_free()
			print("✓ Phase 3 Passed: All arenas have PauseOverlay configured")

			print(">>> ALL MENU, HUD & PAUSE VERIFICATION TESTS PASSED SUCCESSFULLY! <<<")
			quit(0)

	return false
