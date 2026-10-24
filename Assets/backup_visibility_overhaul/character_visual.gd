extends Node3D
class_name CharacterVisual

@onready var anim_player: AnimationPlayer = $AnimationPlayer
@onready var model: Node3D = $Model

var current_anim: String = ""
var is_glitching: bool = false
var original_materials: Dictionary = {}

func _enter_tree() -> void:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
	if not model:
		model = get_node_or_null("Model")

func _ready() -> void:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
	# Cache original materials in case of hazard glitch effects
	_cache_materials(self)
	play_idle()

func _cache_materials(node: Node) -> void:
	if node is MeshInstance3D:
		original_materials[node] = node.material_override
	for child in node.get_children():
		_cache_materials(child)

func get_anim_player() -> AnimationPlayer:
	if not anim_player:
		anim_player = get_node_or_null("AnimationPlayer")
	return anim_player

func play_idle() -> void:
	if is_glitching:
		return
	var ap = get_anim_player()
	if ap and ap.has_animation("idle"):
		if current_anim != "idle":
			current_anim = "idle"
			ap.play("idle", 0.2)

func play_run(speed_factor: float = 1.0) -> void:
	if is_glitching:
		return
	var ap = get_anim_player()
	if ap and ap.has_animation("run"):
		if current_anim != "run":
			current_anim = "run"
			ap.play("run", 0.15)
		ap.speed_scale = clampf(speed_factor, 0.5, 2.5)

func apply_hazard_glitch(enabled: bool) -> void:
	is_glitching = enabled
	var ap = get_anim_player()
	if enabled:
		if ap and ap.has_animation("glitch"):
			current_anim = "glitch"
			ap.play("glitch", 0.05)
	else:
		current_anim = ""
		play_idle()

func update_movement(speed: float) -> void:
	if is_glitching:
		return
	if speed > 0.1:
		var factor = speed / 8.0 # Normal speed is 8.0
		play_run(factor)
	else:
		play_idle()
