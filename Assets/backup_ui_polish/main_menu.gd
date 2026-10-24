extends Control
class_name MainMenu

# Preloaded arena scene paths
const ARENA_TRAINING_PATH: String = "res://scenes/arenas/TrainingFacility.tscn"
const ARENA_GRAVITY_PATH: String = "res://scenes/arenas/GravityCore.tscn"
const ARENA_REACTOR_PATH: String = "res://scenes/arenas/NeonReactor.tscn"

# Navigation Panes
@onready var main_nav: VBoxContainer = $MainContainer/ContentBox/NavButtons
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

func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	_close_all_overlays()
	_connect_buttons()
	_update_arena_selection(ARENA_TRAINING_PATH, "RESEARCH FACILITY")
	_init_settings_state()

func _play_click() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")

func _connect_buttons() -> void:
	# Main Nav
	if btn_play:
		btn_play.pressed.connect(func(): _play_click(); _on_play_pressed())
	if btn_arena_select:
		btn_arena_select.pressed.connect(func(): _play_click(); _on_arena_select_pressed())
	if btn_how_to_play:
		btn_how_to_play.pressed.connect(func(): _play_click(); _on_how_to_play_pressed())
	if btn_settings:
		btn_settings.pressed.connect(func(): _play_click(); _on_settings_pressed())
	if btn_quit:
		btn_quit.pressed.connect(func(): _play_click(); _on_quit_pressed())

	# Arena Select
	if card_training:
		card_training.pressed.connect(func(): _play_click(); _update_arena_selection(ARENA_TRAINING_PATH, "RESEARCH FACILITY"))
	if card_gravity:
		card_gravity.pressed.connect(func(): _play_click(); _update_arena_selection(ARENA_GRAVITY_PATH, "POWER CORE"))
	if card_reactor:
		card_reactor.pressed.connect(func(): _play_click(); _update_arena_selection(ARENA_REACTOR_PATH, "UNDERGROUND COMPLEX"))
		
	if btn_start_arena:
		btn_start_arena.pressed.connect(func(): _play_click(); _on_start_match_pressed())
	if btn_back_arena:
		btn_back_arena.pressed.connect(func(): _play_click(); _close_all_overlays())

	# How to Play
	if btn_back_how_to_play:
		btn_back_how_to_play.pressed.connect(func(): _play_click(); _close_all_overlays())

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
		btn_back_settings.pressed.connect(func(): _play_click(); _close_all_overlays())

func _close_all_overlays() -> void:
	if arena_select_panel:
		arena_select_panel.visible = false
	if how_to_play_panel:
		how_to_play_panel.visible = false
	if settings_panel:
		settings_panel.visible = false
	if main_nav:
		main_nav.visible = true

func _on_play_pressed() -> void:
	# Starts directly with current selected arena
	get_tree().change_scene_to_file(selected_arena_path)

func _on_arena_select_pressed() -> void:
	_close_all_overlays()
	main_nav.visible = false
	arena_select_panel.visible = true

func _on_how_to_play_pressed() -> void:
	_close_all_overlays()
	main_nav.visible = false
	how_to_play_panel.visible = true

func _on_settings_pressed() -> void:
	_close_all_overlays()
	main_nav.visible = false
	settings_panel.visible = true

func _on_quit_pressed() -> void:
	get_tree().quit()

func _update_arena_selection(path: String, title: String) -> void:
	selected_arena_path = path
	selected_arena_name = title
	
	if arena_desc_label:
		match title:
			"RESEARCH FACILITY", "TRAINING FACILITY":
				arena_desc_label.text = "SELECTED: [ RESEARCH FACILITY ]\nBio-containment research facility with 14 partitioned labs, server clusters, and central hologram core."
				arena_desc_label.modulate = Color(0.2, 0.85, 1.0)
			"POWER CORE", "GRAVITY CORE":
				arena_desc_label.text = "SELECTED: [ POWER CORE ]\nHigh-output energy facility featuring stepped reactor tiers, 4 massive generators with rotating impellers, and cardinal corridors."
				arena_desc_label.modulate = Color(0.3, 0.75, 1.0)
			"UNDERGROUND COMPLEX", "NEON REACTOR":
				arena_desc_label.text = "SELECTED: [ UNDERGROUND COMPLEX ]\nSubterranean bunker network featuring 13 fortified chambers, heavy blast doors, hydraulic pumps, and central core vault."
				arena_desc_label.modulate = Color(1.0, 0.35, 0.2)

func _on_start_match_pressed() -> void:
	get_tree().change_scene_to_file(selected_arena_path)

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
