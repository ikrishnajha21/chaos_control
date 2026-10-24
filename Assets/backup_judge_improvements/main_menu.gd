extends Control
class_name MainMenu

# Preloaded arena scene paths
const ARENA_TRAINING_PATH: String = "res://scenes/arenas/TrainingFacility.tscn"
const ARENA_GRAVITY_PATH: String = "res://scenes/arenas/GravityCore.tscn"
const ARENA_REACTOR_PATH: String = "res://scenes/arenas/NeonReactor.tscn"

# Visual & Background Nodes
@onready var menu_background: Control = $MenuBackground
@onready var post_process_overlay: ColorRect = $PostProcessOverlay
@onready var fade_overlay: ColorRect = $FadeOverlay

# Navigation Panes
@onready var header_box: VBoxContainer = $MainContainer/ContentBox/HeaderBox
@onready var main_nav: VBoxContainer = $MainContainer/ContentBox/NavButtons
@onready var footer_info: Label = $MainContainer/ContentBox/FooterInfo

# Overlay Panels
@onready var arena_select_panel: PanelContainer = $Overlays/ArenaSelectPanel
@onready var how_to_play_panel: PanelContainer = $Overlays/HowToPlayPanel
@onready var settings_panel: PanelContainer = $Overlays/SettingsPanel

# Main Menu Buttons
@onready var btn_play: Button = $MainContainer/ContentBox/NavButtons/PlayButton
@onready var btn_arena_select: Button = $MainContainer/ContentBox/NavButtons/ArenaSelectButton
@onready var btn_how_to_play: Button = $MainContainer/ContentBox/NavButtons/HowToPlayButton
@onready var btn_settings: Button = $MainContainer/ContentBox/NavButtons/SettingsButton
@onready var btn_quit: Button = $MainContainer/ContentBox/NavButtons/QuitButton

# Arena Select Buttons
@onready var card_training: Button = $Overlays/ArenaSelectPanel/VBox/ArenaCards/CardTraining
@onready var card_gravity: Button = $Overlays/ArenaSelectPanel/VBox/ArenaCards/CardGravity
@onready var card_reactor: Button = $Overlays/ArenaSelectPanel/VBox/ArenaCards/CardReactor
@onready var btn_start_arena: Button = $Overlays/ArenaSelectPanel/VBox/BottomActions/StartMatchButton
@onready var btn_back_arena: Button = $Overlays/ArenaSelectPanel/VBox/BottomActions/BackArenaButton
@onready var arena_desc_label: Label = $Overlays/ArenaSelectPanel/VBox/SelectedDescLabel

# How to Play Buttons
@onready var btn_back_how_to_play: Button = $Overlays/HowToPlayPanel/VBox/BackHowToPlayButton

# Settings Controls
@onready var btn_fullscreen: CheckButton = $Overlays/SettingsPanel/VBox/SettingsList/FullscreenRow/FullscreenCheck
@onready var btn_mute: CheckButton = $Overlays/SettingsPanel/VBox/SettingsList/AudioRow/MuteCheck
@onready var slider_music: HSlider = $Overlays/SettingsPanel/VBox/SettingsList/MusicRow/MusicSlider
@onready var slider_sfx: HSlider = $Overlays/SettingsPanel/VBox/SettingsList/SfxRow/SfxSlider
@onready var btn_back_settings: Button = $Overlays/SettingsPanel/VBox/BackSettingsButton

var selected_arena_path: String = ARENA_TRAINING_PATH
var selected_arena_name: String = "RESEARCH FACILITY"
var is_transitioning: bool = false
var button_base_x: Dictionary = {}

func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	_close_all_overlays()
	_connect_buttons()
	_setup_button_hover_effects()
	_update_arena_selection(ARENA_TRAINING_PATH, "RESEARCH FACILITY")
	_init_settings_state()
	_play_cinematic_awakening()

func _play_click(pitch: float = 1.0) -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click", pitch)

func _setup_button_hover_effects() -> void:
	var buttons = [
		btn_play, btn_arena_select, btn_how_to_play, btn_settings, btn_quit,
		card_training, card_gravity, card_reactor, btn_start_arena, btn_back_arena,
		btn_back_how_to_play, btn_back_settings
	]
	for btn in buttons:
		if btn:
			button_base_x[btn] = btn.position.x
			btn.mouse_entered.connect(func(): _on_button_hover(btn))
			btn.mouse_exited.connect(func(): _on_button_unhover(btn))

func _on_button_hover(btn: Button) -> void:
	btn.pivot_offset = btn.size * 0.5
	var tw = create_tween().set_parallel(true)
	tw.tween_property(btn, "scale", Vector2(1.028, 1.028), 0.12).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	
	# Slight tactical offset for main navigation buttons
	if btn.get_parent() == main_nav:
		var base_x = button_base_x.get(btn, 0.0)
		tw.tween_property(btn, "position:x", base_x + 6.0, 0.12).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
		
	# Subtle micro-glitch impulse on hover
	_pulse_glitch(0.08, 0.1)
	
	_play_click(1.35)

func _on_button_unhover(btn: Button) -> void:
	var tw = create_tween().set_parallel(true)
	tw.tween_property(btn, "scale", Vector2.ONE, 0.1).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	if btn.get_parent() == main_nav:
		var base_x = button_base_x.get(btn, 0.0)
		tw.tween_property(btn, "position:x", base_x, 0.1).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)

func _pulse_glitch(amount: float, duration: float) -> void:
	if post_process_overlay and post_process_overlay.material:
		var mat = post_process_overlay.material as ShaderMaterial
		if mat:
			mat.set_shader_parameter("glitch_intensity", amount)
			var tw = create_tween()
			tw.tween_method(func(val: float): mat.set_shader_parameter("glitch_intensity", val), amount, 0.0, duration).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)

func _play_cinematic_awakening() -> void:
	# -------------------------------------------------------------
	# STAGE 1 & 2: Blackout fade & Background Reactor Spin-Up
	# -------------------------------------------------------------
	if fade_overlay:
		fade_overlay.color.a = 1.0
		var tw_fade = create_tween()
		tw_fade.tween_property(fade_overlay, "color:a", 0.0, 0.25).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

	if menu_background:
		menu_background.core_scale = 0.2
		menu_background.core_alpha = 0.0
		var tw_bg = create_tween().set_parallel(true)
		tw_bg.tween_property(menu_background, "core_scale", 1.0, 0.45).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
		tw_bg.tween_property(menu_background, "core_alpha", 1.0, 0.35).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

	# -------------------------------------------------------------
	# STAGE 3: Title Reveal & System Glitch Spike
	# -------------------------------------------------------------
	if header_box:
		header_box.modulate.a = 0.0
		header_box.position.y = -22.0
		var tw_h = create_tween().set_parallel(true)
		tw_h.tween_property(header_box, "modulate:a", 1.0, 0.38).set_delay(0.12).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
		tw_h.tween_property(header_box, "position:y", 0.0, 0.38).set_delay(0.12).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

	_pulse_glitch(0.2, 0.3)

	# -------------------------------------------------------------
	# STAGE 4: Staggered Cascade of Control Modules
	# -------------------------------------------------------------
	if main_nav:
		var children = main_nav.get_children()
		for i in range(children.size()):
			var child = children[i] as Control
			if child:
				child.modulate.a = 0.0
				var base_x = child.position.x
				button_base_x[child] = base_x
				child.position.x = base_x - 22.0
				var delay = 0.16 + (i * 0.05)
				var tw_b = create_tween().set_parallel(true)
				tw_b.tween_property(child, "modulate:a", 1.0, 0.3).set_delay(delay).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
				tw_b.tween_property(child, "position:x", base_x, 0.3).set_delay(delay).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

	# -------------------------------------------------------------
	# STAGE 5: Telemetry Footer Info
	# -------------------------------------------------------------
	if footer_info:
		footer_info.modulate.a = 0.0
		var tw_f = create_tween()
		tw_f.tween_property(footer_info, "modulate:a", 1.0, 0.4).set_delay(0.38).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)

func _connect_buttons() -> void:
	# Main Nav
	if btn_play:
		btn_play.pressed.connect(func(): _play_click(1.0); _on_play_pressed())
	if btn_arena_select:
		btn_arena_select.pressed.connect(func(): _play_click(1.0); _on_arena_select_pressed())
	if btn_how_to_play:
		btn_how_to_play.pressed.connect(func(): _play_click(1.0); _on_how_to_play_pressed())
	if btn_settings:
		btn_settings.pressed.connect(func(): _play_click(1.0); _on_settings_pressed())
	if btn_quit:
		btn_quit.pressed.connect(func(): _play_click(1.0); _on_quit_pressed())

	# Arena Select
	if card_training:
		card_training.pressed.connect(func(): _play_click(1.0); _update_arena_selection(ARENA_TRAINING_PATH, "RESEARCH FACILITY"))
	if card_gravity:
		card_gravity.pressed.connect(func(): _play_click(1.0); _update_arena_selection(ARENA_GRAVITY_PATH, "POWER CORE"))
	if card_reactor:
		card_reactor.pressed.connect(func(): _play_click(1.0); _update_arena_selection(ARENA_REACTOR_PATH, "UNDERGROUND COMPLEX"))
		
	if btn_start_arena:
		btn_start_arena.pressed.connect(func(): _play_click(1.0); _on_start_match_pressed())
	if btn_back_arena:
		btn_back_arena.pressed.connect(func(): _play_click(1.0); _close_all_overlays())

	# How to Play
	if btn_back_how_to_play:
		btn_back_how_to_play.pressed.connect(func(): _play_click(1.0); _close_all_overlays())

	# Settings
	if btn_fullscreen:
		btn_fullscreen.toggled.connect(_on_fullscreen_toggled)
	if btn_mute:
		btn_mute.toggled.connect(_on_mute_toggled)
	if slider_music:
		slider_music.value_changed.connect(_on_music_slider_changed)
	if slider_sfx:
		slider_sfx.value_changed.connect(_on_sfx_slider_changed)
	if btn_back_settings:
		btn_back_settings.pressed.connect(func(): _play_click(1.0); _close_all_overlays())

func _close_all_overlays() -> void:
	if arena_select_panel:
		arena_select_panel.visible = false
	if how_to_play_panel:
		how_to_play_panel.visible = false
	if settings_panel:
		settings_panel.visible = false
	if main_nav:
		main_nav.visible = true
		main_nav.modulate.a = 1.0

func _open_overlay(panel: PanelContainer) -> void:
	_close_all_overlays()
	main_nav.visible = false
	panel.visible = true
	panel.modulate.a = 0.0
	panel.scale = Vector2(0.96, 0.96)
	panel.pivot_offset = panel.size * 0.5
	var tw = create_tween().set_parallel(true)
	tw.tween_property(panel, "modulate:a", 1.0, 0.2).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
	tw.tween_property(panel, "scale", Vector2.ONE, 0.2).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	_pulse_glitch(0.12, 0.15)

func _on_play_pressed() -> void:
	_transition_to_scene(selected_arena_path)

func _on_arena_select_pressed() -> void:
	_open_overlay(arena_select_panel)

func _on_how_to_play_pressed() -> void:
	_open_overlay(how_to_play_panel)

func _on_settings_pressed() -> void:
	_open_overlay(settings_panel)

func _on_quit_pressed() -> void:
	get_tree().quit()

func _transition_to_scene(scene_path: String) -> void:
	if is_transitioning:
		return
	is_transitioning = true
	
	_pulse_glitch(0.35, 0.25)
	
	if fade_overlay:
		fade_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
		var tw = create_tween()
		tw.tween_property(fade_overlay, "color:a", 1.0, 0.28).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_IN_OUT)
		tw.tween_callback(func(): get_tree().change_scene_to_file(scene_path))
	else:
		get_tree().change_scene_to_file(scene_path)

func _update_arena_selection(path: String, title: String) -> void:
	selected_arena_path = path
	selected_arena_name = title
	
	# Update active card highlight visual state
	if card_training:
		card_training.modulate = Color(1.1, 1.1, 1.1) if (title in ["RESEARCH FACILITY", "TRAINING FACILITY"]) else Color(0.7, 0.75, 0.8)
	if card_gravity:
		card_gravity.modulate = Color(1.1, 1.1, 1.1) if (title in ["POWER CORE", "GRAVITY CORE"]) else Color(0.7, 0.75, 0.8)
	if card_reactor:
		card_reactor.modulate = Color(1.1, 1.1, 1.1) if (title in ["UNDERGROUND COMPLEX", "NEON REACTOR"]) else Color(0.7, 0.75, 0.8)
	
	if arena_desc_label:
		match title:
			"RESEARCH FACILITY", "TRAINING FACILITY":
				arena_desc_label.text = "ACTIVE SECTOR: [ RESEARCH FACILITY ]\nBio-containment facility with 14 partitioned labs, server clusters, and central hologram core."
				arena_desc_label.modulate = Color(0.2, 0.95, 1.0)
			"POWER CORE", "GRAVITY CORE":
				arena_desc_label.text = "ACTIVE SECTOR: [ POWER CORE ]\nHigh-output energy facility featuring stepped reactor tiers, 4 massive generators with rotating impellers, and cardinal corridors."
				arena_desc_label.modulate = Color(0.35, 0.9, 1.0)
			"UNDERGROUND COMPLEX", "NEON REACTOR":
				arena_desc_label.text = "ACTIVE SECTOR: [ UNDERGROUND COMPLEX ]\nSubterranean bunker network featuring 13 fortified chambers, heavy blast doors, hydraulic pumps, and central core vault."
				arena_desc_label.modulate = Color(1.0, 0.38, 0.25)

func _on_start_match_pressed() -> void:
	_transition_to_scene(selected_arena_path)

func _init_settings_state() -> void:
	if btn_fullscreen:
		btn_fullscreen.button_pressed = (DisplayServer.window_get_mode() == DisplayServer.WINDOW_MODE_FULLSCREEN)
	if btn_mute:
		var master_idx = AudioServer.get_bus_index("Master")
		if master_idx >= 0:
			btn_mute.button_pressed = AudioServer.is_bus_mute(master_idx)
	if has_node("/root/AudioManager"):
		var am = get_node("/root/AudioManager")
		if slider_music:
			slider_music.value = am.get_music_volume() * 100.0
		if slider_sfx:
			slider_sfx.value = am.get_sfx_volume() * 100.0

func _on_music_slider_changed(value: float) -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").set_music_volume(value / 100.0)

func _on_sfx_slider_changed(value: float) -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").set_sfx_volume(value / 100.0)

func _on_fullscreen_toggled(button_pressed: bool) -> void:
	if button_pressed:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

func _on_mute_toggled(button_pressed: bool) -> void:
	var master_idx = AudioServer.get_bus_index("Master")
	if master_idx >= 0:
		AudioServer.set_bus_mute(master_idx, button_pressed)
