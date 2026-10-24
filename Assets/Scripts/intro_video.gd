extends Control
class_name IntroVideo

# ==============================================================================
# CORE BREACH — CINEMATIC INTRO VIDEO STARTUP CONTROLLER
# - Plays the native Godot 4 cinematic intro video full-screen on game launch
# - Preserves original 848x488 aspect ratio without stretching (letterboxed)
# - Plays original video audio through Master audio bus
# - Displays a sleek, unobtrusive SKIP button in the bottom-right corner
# - Supports skipping via mouse click, ESC, SPACE, or ENTER
# - Stops playback and audio immediately on skip
# - Automatically transitions to res://scenes/main_menu.tscn upon completion
# - Guaranteed single execution per game launch (no duplicate instances)
# ==============================================================================

const MAIN_MENU_SCENE_PATH: String = "res://scenes/main_menu.tscn"
static var has_played: bool = false

@onready var video_player: VideoStreamPlayer = $AspectRatioContainer/VideoStreamPlayer
@onready var skip_button: Button = $UI/SkipButton
@onready var fade_overlay: ColorRect = $FadeOverlay

var is_transitioning: bool = false

func _ready() -> void:
	# Single execution guard: if already played this game session, skip directly
	if has_played:
		_instant_transition_to_menu()
		return
	has_played = true

	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE

	# Silence any background music so the video's original audio is crystal clear
	if has_node("/root/AudioManager"):
		var am = get_node("/root/AudioManager")
		if am.music_player and am.music_player.playing:
			am.music_player.stop()

	# Connect playback completion and skip button
	if video_player:
		video_player.finished.connect(_on_video_finished)
		# Start playback automatically
		video_player.play()

	if skip_button:
		skip_button.pressed.connect(_on_skip_pressed)
		_style_skip_button()

func _input(event: InputEvent) -> void:
	if is_transitioning:
		return

	if event is InputEventKey and event.pressed and not event.echo:
		if event.keycode in [KEY_ESCAPE, KEY_SPACE, KEY_ENTER]:
			_on_skip_pressed()
			get_viewport().set_input_as_handled()
	elif event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		# Clicking anywhere on the screen also highlights the skip button or can skip
		pass

func _style_skip_button() -> void:
	if not skip_button:
		return
		
	var sb_normal = StyleBoxFlat.new()
	sb_normal.bg_color = Color(0.02, 0.05, 0.1, 0.55)
	sb_normal.border_color = Color(0.2, 0.85, 1.0, 0.45)
	sb_normal.border_width_left = 1
	sb_normal.border_width_top = 1
	sb_normal.border_width_right = 1
	sb_normal.border_width_bottom = 1
	sb_normal.corner_radius_top_left = 4
	sb_normal.corner_radius_bottom_right = 4
	sb_normal.corner_radius_top_right = 2
	sb_normal.corner_radius_bottom_left = 2
	sb_normal.content_margin_left = 14.0
	sb_normal.content_margin_right = 14.0
	sb_normal.content_margin_top = 6.0
	sb_normal.content_margin_bottom = 6.0
	skip_button.add_theme_stylebox_override("normal", sb_normal)

	var sb_hover = sb_normal.duplicate() as StyleBoxFlat
	sb_hover.bg_color = Color(0.04, 0.1, 0.18, 0.8)
	sb_hover.border_color = Color(0.3, 0.95, 1.0, 0.9)
	skip_button.add_theme_stylebox_override("hover", sb_hover)

	var sb_pressed = sb_normal.duplicate() as StyleBoxFlat
	sb_pressed.bg_color = Color(0.1, 0.25, 0.4, 0.9)
	skip_button.add_theme_stylebox_override("pressed", sb_pressed)

func _on_skip_pressed() -> void:
	if is_transitioning:
		return
	is_transitioning = true

	# Immediately silence and halt video playback
	_halt_playback()
	_transition_to_menu()

func _on_video_finished() -> void:
	if is_transitioning:
		return
	is_transitioning = true

	_halt_playback()
	_transition_to_menu()

func _halt_playback() -> void:
	if video_player:
		video_player.stop()

func _transition_to_menu() -> void:
	if fade_overlay:
		fade_overlay.visible = true
		var tw = create_tween()
		tw.tween_property(fade_overlay, "color:a", 1.0, 0.15)
		tw.tween_callback(func():
			get_tree().change_scene_to_file(MAIN_MENU_SCENE_PATH)
		)
	else:
		get_tree().change_scene_to_file(MAIN_MENU_SCENE_PATH)

func _instant_transition_to_menu() -> void:
	_halt_playback()
	get_tree().change_scene_to_file(MAIN_MENU_SCENE_PATH)
