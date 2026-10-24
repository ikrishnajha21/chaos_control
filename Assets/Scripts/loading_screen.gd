extends Control
class_name LoadingScreen

static var target_scene_path: String = "res://scenes/arenas/TrainingFacility.tscn"
static var target_arena_name: String = "RESEARCH FACILITY"

static func transition_to(tree: SceneTree, path: String, arena_title: String = "") -> void:
	target_scene_path = path
	target_arena_name = arena_title if arena_title != "" else _deduce_arena_name(path)
	tree.change_scene_to_file("res://scenes/loading_screen.tscn")

static func _deduce_arena_name(path: String) -> String:
	var path_lower = path.to_lower()
	if "gravity" in path_lower or "power" in path_lower:
		return "POWER CORE"
	elif "neon" in path_lower or "underground" in path_lower:
		return "UNDERGROUND COMPLEX"
	elif "training" in path_lower or "research" in path_lower:
		return "RESEARCH FACILITY"
	return "ACTIVE SECTOR"

# Node references
@onready var menu_background: Control = $MenuBackground
@onready var post_process: ColorRect = $PostProcessOverlay
@onready var fade_overlay: ColorRect = $FadeOverlay
@onready var destination_label: Label = $MainContainer/ContentBox/DestinationLabel
@onready var status_label: Label = $MainContainer/ContentBox/StatusLabel
@onready var progress_bar: ProgressBar = $MainContainer/ContentBox/ProgressContainer/ProgressBar
@onready var percentage_label: Label = $MainContainer/ContentBox/ProgressContainer/PercentageLabel
@onready var sweep_highlight: ColorRect = $MainContainer/ContentBox/ProgressContainer/ProgressBar/SweepHighlight
@onready var error_box: VBoxContainer = $MainContainer/ContentBox/ErrorBox
@onready var error_label: Label = $MainContainer/ContentBox/ErrorBox/ErrorLabel
@onready var btn_retry: Button = $MainContainer/ContentBox/ErrorBox/Buttons/RetryButton
@onready var btn_back: Button = $MainContainer/ContentBox/ErrorBox/Buttons/BackButton

var progress_array: Array = []
var visual_progress: float = 0.0
var is_loading_complete: bool = false
var sweep_x: float = 0.0
var load_error: bool = false
var min_display_time: float = 0.4
var elapsed_time: float = 0.0

func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	if error_box:
		error_box.visible = false
	if fade_overlay:
		fade_overlay.color.a = 1.0
		var tw = create_tween()
		tw.tween_property(fade_overlay, "color:a", 0.0, 0.25).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
		
	if destination_label:
		destination_label.text = "DESTINATION SECTOR: [ %s ]" % target_arena_name.to_upper()
		
	if btn_retry:
		btn_retry.pressed.connect(_on_retry_pressed)
	if btn_back:
		btn_back.pressed.connect(_on_back_pressed)
		
	_start_threaded_loading()

func _start_threaded_loading() -> void:
	load_error = false
	if error_box:
		error_box.visible = false
	progress_array.clear()
	visual_progress = 0.0
	is_loading_complete = false
	elapsed_time = 0.0
	
	if target_scene_path == "" or not ResourceLoader.exists(target_scene_path):
		_handle_load_error("ERR_INVALID_PATH: Resource '%s' does not exist." % target_scene_path)
		return
		
	var err = ResourceLoader.load_threaded_request(target_scene_path, "", false)
	if err != OK:
		_handle_load_error("ERR_REQUEST_FAILED: ResourceLoader returned error code %d." % err)

func _process(delta: float) -> void:
	elapsed_time += delta
	
	# Animate the traveling energy sweep inside the progress bar
	if sweep_highlight and progress_bar:
		var bar_w = progress_bar.size.x
		sweep_x += delta * 450.0
		if sweep_x > bar_w + 60.0:
			sweep_x = -60.0
		sweep_highlight.position.x = sweep_x
		
	if load_error or is_loading_complete:
		return
		
	# Query real threaded loading status
	var status = ResourceLoader.load_threaded_get_status(target_scene_path, progress_array)
	var real_progress = 0.0
	if progress_array.size() > 0:
		real_progress = float(progress_array[0])
		
	match status:
		ResourceLoader.THREAD_LOAD_IN_PROGRESS:
			# Smoothly advance progress bar to real progress
			visual_progress = move_toward(visual_progress, maxf(real_progress, 0.15), delta * 2.2)
			_update_progress_display(visual_progress)
			
		ResourceLoader.THREAD_LOAD_LOADED:
			# Progress complete, ensure minimum display time for smooth visual transition
			visual_progress = move_toward(visual_progress, 1.0, delta * 3.5)
			_update_progress_display(visual_progress)
			
			if visual_progress >= 0.999 and elapsed_time >= min_display_time:
				is_loading_complete = true
				_finalize_scene_transition()
				
		ResourceLoader.THREAD_LOAD_FAILED, ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
			_handle_load_error("ERR_LOAD_FAILED: Destination arena could not be loaded (Status %d)." % status)

func _update_progress_display(prog: float) -> void:
	var percent_val = int(clampf(prog * 100.0, 0.0, 100.0))
	if progress_bar:
		progress_bar.value = percent_val
	if percentage_label:
		percentage_label.text = "%02d%%" % percent_val
		
	# Update contextual status label
	if status_label:
		if prog < 0.25:
			status_label.text = "[ INITIALIZING SYSTEM BUS & MEMORY ALLOCATION ]"
			status_label.modulate = Color(0.2, 0.9, 1.0)
		elif prog < 0.55:
			status_label.text = "[ LOADING ARENA GEOMETRY & ARCHIVES ]"
			status_label.modulate = Color(0.3, 0.95, 1.0)
		elif prog < 0.82:
			status_label.text = "[ SYNCHRONIZING ENVIRONMENT & SHADERS ]"
			status_label.modulate = Color(0.4, 0.95, 0.85)
		elif prog < 0.99:
			status_label.text = "[ PREPARING PLAYGROUND & PHYSICS ENGINE ]"
			status_label.modulate = Color(1.0, 0.85, 0.2)
		else:
			status_label.text = "[ FINALIZING ENTRY // SYSTEMS GO ]"
			status_label.modulate = Color(0.2, 1.0, 0.5)

func _finalize_scene_transition() -> void:
	var packed_scene = ResourceLoader.load_threaded_get(target_scene_path) as PackedScene
	if not packed_scene:
		_handle_load_error("ERR_NULL_SCENE: Loaded scene package was null.")
		return
		
	if fade_overlay:
		fade_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
		var tw = create_tween()
		tw.tween_property(fade_overlay, "color:a", 1.0, 0.22).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_IN)
		tw.tween_callback(func():
			get_tree().change_scene_to_packed(packed_scene)
		)
	else:
		get_tree().change_scene_to_packed(packed_scene)

func _handle_load_error(msg: String) -> void:
	load_error = true
	if status_label:
		status_label.text = "[ SYSTEM HALTED // CRITICAL LOAD ERROR ]"
		status_label.modulate = Color(1.0, 0.25, 0.25)
	if error_box and error_label:
		error_box.visible = true
		error_label.text = msg

func _on_retry_pressed() -> void:
	_start_threaded_loading()

func _on_back_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
