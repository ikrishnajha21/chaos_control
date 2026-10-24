extends Camera3D
class_name SharedCameraController

@export var target_runner: Node3D
@export var target_saboteur: Node3D

@export var min_distance: float = 12.0
@export var max_distance: float = 24.0
@export var min_height: float = 14.0
@export var max_height: float = 22.0
@export var pitch_angle: float = -58.0 # Top-down angled perspective in degrees
@export var smooth_speed: float = 6.0

# Arena boundary limits for camera center
@export var arena_min: Vector2 = Vector2(-12.0, -9.0)
@export var arena_max: Vector2 = Vector2(12.0, 9.0)

func _ready() -> void:
	rotation_degrees.x = pitch_angle

func _physics_process(delta: float) -> void:
	if not is_instance_valid(target_runner) and not is_instance_valid(target_saboteur):
		return
		
	var p1_pos: Vector3
	var p2_pos: Vector3
	
	if is_instance_valid(target_runner) and is_instance_valid(target_saboteur):
		p1_pos = target_runner.global_position
		p2_pos = target_saboteur.global_position
	elif is_instance_valid(target_runner):
		p1_pos = target_runner.global_position
		p2_pos = p1_pos
	else:
		p1_pos = target_saboteur.global_position
		p2_pos = p1_pos

	# Center point between players
	var mid_point := (p1_pos + p2_pos) * 0.5
	mid_point.x = clampf(mid_point.x, arena_min.x, arena_max.x)
	mid_point.z = clampf(mid_point.z, arena_min.y, arena_max.y)
	
	# Distance between players to compute zoom
	var player_dist := p1_pos.distance_to(p2_pos)
	var t := clampf((player_dist - 6.0) / 18.0, 0.0, 1.0)
	
	var desired_height := lerpf(min_height, max_height, t)
	var desired_z_offset := lerpf(8.5, 13.5, t)
	
	var desired_cam_pos := Vector3(mid_point.x, desired_height, mid_point.z + desired_z_offset)
	
	global_position = global_position.lerp(desired_cam_pos, smooth_speed * delta)
	
	# Look smoothly towards mid point
	var look_target := Vector3(mid_point.x, 0.5, mid_point.z)
	var target_transform = global_transform.looking_at(look_target, Vector3.UP)
	global_basis = global_basis.slerp(target_transform.basis, smooth_speed * delta)
