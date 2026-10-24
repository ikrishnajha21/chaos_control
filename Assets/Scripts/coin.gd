extends Node3D
class_name SaviourCoin

signal coin_collected(coin: SaviourCoin, collector: PlayerController)

@export var time_bonus: float = 10.0
@export var coin_id: String = ""

var is_collected: bool = false
var base_y: float = 0.8
var rotation_speed: float = 2.6
var bob_amplitude: float = 0.12
var bob_frequency: float = 3.2
var time_elapsed: float = 0.0

@onready var visuals: Node3D = $Visuals
@onready var area: Area3D = $Area3D
@onready var col_shape: CollisionShape3D = $Area3D/CollisionShape3D
@onready var coin_light: OmniLight3D = $Visuals/OmniLight3D

var active_tween: Tween = null

func _ready() -> void:
	base_y = position.y
	time_elapsed = randf() * PI * 2.0
	
	if area and not area.body_entered.is_connected(_on_body_entered):
		area.body_entered.connect(_on_body_entered)

func _process(delta: float) -> void:
	if is_collected:
		return
		
	time_elapsed += delta
	if visuals:
		visuals.rotation.y += rotation_speed * delta
		visuals.position.y = sin(time_elapsed * bob_frequency) * bob_amplitude

func _on_body_entered(body: Node3D) -> void:
	if is_collected:
		return
		
	if not (body is PlayerController):
		return
		
	var player = body as PlayerController
	# Strictly require Saviour / Runner role
	if not player.is_saviour():
		return
		
	_collect(player)

func _collect(player: PlayerController) -> void:
	is_collected = true
	
	if col_shape:
		col_shape.set_deferred("disabled", true)
		
	# Play localized audio
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("coin_pickup")
		
	# Notify arena directly or through signal
	var arena = _find_arena()
	if arena and arena.has_method("add_saviour_lifetime"):
		arena.add_saviour_lifetime(time_bonus)
		
	coin_collected.emit(self, player)
	
	# Visual pickup animation
	if visuals:
		if active_tween and active_tween.is_valid():
			active_tween.kill()
		active_tween = create_tween().set_parallel(true)
		active_tween.tween_property(visuals, "position:y", visuals.position.y + 0.9, 0.28).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
		active_tween.tween_property(visuals, "scale", Vector3.ZERO, 0.28).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
		if coin_light:
			active_tween.tween_property(coin_light, "light_energy", 0.0, 0.28)
		active_tween.chain().tween_callback(func():
			visible = false
		)
	else:
		visible = false

func reset_coin() -> void:
	if active_tween and active_tween.is_valid():
		active_tween.kill()
		active_tween = null
		
	is_collected = false
	visible = true
	
	if visuals:
		visuals.scale = Vector3.ONE
		visuals.position = Vector3.ZERO
		
	if coin_light:
		coin_light.light_energy = 1.3
		
	if col_shape:
		col_shape.set_deferred("disabled", false)

func _find_arena() -> Arena:
	var cur: Node = get_parent()
	while cur != null:
		if cur is Arena:
			return cur as Arena
		cur = cur.get_parent()
	return null
