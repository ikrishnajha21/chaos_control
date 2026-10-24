extends Control
class_name ArenaSelectMenu

@onready var btn_training: Button = $MarginContainer/VBox/ArenaList/CardTraining/VBox/SelectButton
@onready var btn_gravity: Button = $MarginContainer/VBox/ArenaList/CardGravity/VBox/SelectButton
@onready var btn_reactor: Button = $MarginContainer/VBox/ArenaList/CardReactor/VBox/SelectButton

const ARENA_TRAINING_PATH: String = "res://scenes/arenas/TrainingFacility.tscn"
const ARENA_GRAVITY_PATH: String = "res://scenes/arenas/GravityCore.tscn"
const ARENA_REACTOR_PATH: String = "res://scenes/arenas/NeonReactor.tscn"

func _ready() -> void:
	if btn_training:
		btn_training.pressed.connect(_on_select_training)
	if btn_gravity:
		btn_gravity.pressed.connect(_on_select_gravity)
	if btn_reactor:
		btn_reactor.pressed.connect(_on_select_reactor)

func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo:
		if event.physical_keycode == KEY_1:
			_on_select_training()
		elif event.physical_keycode == KEY_2:
			_on_select_gravity()
		elif event.physical_keycode == KEY_3:
			_on_select_reactor()

func _on_select_training() -> void:
	get_tree().change_scene_to_file(ARENA_TRAINING_PATH)

func _on_select_gravity() -> void:
	get_tree().change_scene_to_file(ARENA_GRAVITY_PATH)

func _on_select_reactor() -> void:
	get_tree().change_scene_to_file(ARENA_REACTOR_PATH)
