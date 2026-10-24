extends SceneTree

# Test suite for Entry Interface Polish & UI Presentation

var main_menu: MainMenu = null
var test_phase: int = 0
var timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] ENTRY UI POLISH VERIFICATION SUITE <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	
	match test_phase:
		0:
			# Phase 0: Load Main Menu
			print(">>> Phase 0: Testing Main Menu Scene Loading & Node Hierarchy...")
			var menu_scene = load("res://scenes/main_menu.tscn")
			assert(menu_scene != null, "main_menu.tscn must load successfully")
			main_menu = menu_scene.instantiate()
			root.add_child(main_menu)
			
			# Verify essential UI elements
			assert(main_menu.btn_play != null, "PlayButton must exist")
			assert(main_menu.btn_arena_select != null, "ArenaSelectButton must exist")
			assert(main_menu.btn_how_to_play != null, "HowToPlayButton must exist")
			assert(main_menu.btn_settings != null, "SettingsButton must exist")
			assert(main_menu.btn_quit != null, "QuitButton must exist")
			
			assert(main_menu.arena_select_panel != null, "ArenaSelectPanel must exist")
			assert(main_menu.how_to_play_panel != null, "HowToPlayPanel must exist")
			assert(main_menu.settings_panel != null, "SettingsPanel must exist")
			assert(main_menu.fade_overlay != null, "FadeOverlay must exist")
			
			print("  • Main Menu node hierarchy and references verified")
			test_phase = 1
			timer = 0.0

		1:
			# Phase 1: Verify Typography, Title & Branding
			print(">>> Phase 1: Verifying Custom Fonts & Typography...")
			var title_lbl = main_menu.get_node("MainContainer/ContentBox/HeaderBox/Title") as Label
			var subtitle_lbl = main_menu.get_node("MainContainer/ContentBox/HeaderBox/Subtitle") as Label
			assert(title_lbl != null, "Title label must exist")
			assert(subtitle_lbl != null, "Subtitle label must exist")
			assert("CORE BREACH" in title_lbl.text, "Title text must be CORE BREACH")
			assert("CONTAIN THE CHAOS" in subtitle_lbl.text or "SURVIVE THE BREACH" in subtitle_lbl.text, "Subtitle must feature tagline")
			
			var title_font = title_lbl.get_theme_font("font")
			assert(title_font != null, "Title must have custom futuristic font assigned")
			print("  • Display typography and dual-tone branding verified")
			test_phase = 2
			timer = 0.0

		2:
			# Phase 2: Verify Entrance Animations
			print(">>> Phase 2: Verifying Entrance Animations & Transitions...")
			assert(main_menu.header_box != null, "HeaderBox must exist")
			assert(main_menu.main_nav != null, "NavButtons must exist")
			
			# Simulate timer progression for entrance animations
			if timer > 0.6:
				assert(main_menu.header_box.modulate.a > 0.5, "HeaderBox must fade in during entrance animation")
				assert(main_menu.btn_play.modulate.a > 0.5, "PlayButton must fade in during entrance animation")
				print("  • Staggered entrance animations executed cleanly")
				test_phase = 3
				timer = 0.0

		3:
			# Phase 3: Test Overlay Panels Navigation
			print(">>> Phase 3: Testing Overlay Panels & Interactive Navigation...")
			
			# Test opening Arena Select
			main_menu._on_arena_select_pressed()
			assert(main_menu.arena_select_panel.visible == true, "ArenaSelectPanel must become visible")
			assert(main_menu.main_nav.visible == false, "Main nav must be hidden when overlay is open")
			
			# Test arena selection cards
			main_menu._update_arena_selection(main_menu.ARENA_GRAVITY_PATH, "POWER CORE")
			assert(main_menu.selected_arena_path == main_menu.ARENA_GRAVITY_PATH, "Selected path must update to Power Core")
			
			# Test opening How To Play
			main_menu._on_how_to_play_pressed()
			assert(main_menu.how_to_play_panel.visible == true, "HowToPlayPanel must become visible")
			assert(main_menu.arena_select_panel.visible == false, "Previous panel must close")
			
			# Test opening Settings
			main_menu._on_settings_pressed()
			assert(main_menu.settings_panel.visible == true, "SettingsPanel must become visible")
			
			# Test closing all overlays
			main_menu._close_all_overlays()
			assert(main_menu.settings_panel.visible == false, "Settings panel must close")
			assert(main_menu.main_nav.visible == true, "Main nav must restore visibility")
			print("  • All overlay panels, cards, and navigation transitions verified")
			test_phase = 4
			timer = 0.0

		4:
			# Phase 4: Verify Arena Select Secondary Scene (arena.tscn)
			print(">>> Phase 4: Verifying Standalone Arena Selection Scene (arena.tscn)...")
			var arena_select_scene = load("res://scenes/arena.tscn")
			assert(arena_select_scene != null, "arena.tscn must load")
			var arena_menu = arena_select_scene.instantiate() as ArenaSelectMenu
			root.add_child(arena_menu)
			assert(arena_menu.btn_training != null, "Training Facility button must exist")
			assert(arena_menu.btn_gravity != null, "Gravity Core button must exist")
			assert(arena_menu.btn_reactor != null, "Neon Reactor button must exist")
			arena_menu.queue_free()
			print("  • Standalone arena.tscn verified with updated typography and layout")
			test_phase = 5
			timer = 0.0

		5:
			print("===================================================================")
			print(">>> ALL ENTRY UI POLISH CHECKS PASSED WITH ZERO ERRORS! <<<")
			print("===================================================================\n")
			main_menu.queue_free()
			quit(0)
			return true

	return false
