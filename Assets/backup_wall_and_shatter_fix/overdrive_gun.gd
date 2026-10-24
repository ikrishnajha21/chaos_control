extends Node3D
class_name OverdriveGun

# ==============================================================================
# CORE BREACH — OBSTACLE OVERDRIVE SCI-FI WEAPON
# - Equipped exclusively by Crimson Wraith (Saboteur role)
# - Emits high-energy crimson pulses that target Cyan Phantom and obstacles
# - Forward orientation: -Z (Standard Godot convention)
# - Dark metallic chassis, dual plasma rails, glowing crimson conduits & muzzle flash
# - Procedural spring recoil animation on fire
# ==============================================================================

const PROJECTILE_SCENE = preload("res://scenes/weapons/overdrive_projectile.tscn")

@onready var muzzle: Marker3D = $Muzzle
@onready var muzzle_light: OmniLight3D = $Muzzle/MuzzleLight
@onready var muzzle_flash_mesh: MeshInstance3D = $Muzzle/MuzzleFlashMesh

var recoil_offset: float = 0.0
var base_position: Vector3 = Vector3.ZERO

func _ready() -> void:
	base_position = position
	if muzzle_light:
		muzzle_light.visible = false
	if muzzle_flash_mesh:
		muzzle_flash_mesh.visible = false

func _process(delta: float) -> void:
	# Smooth recoil recovery (recoil pushes backwards along +Z)
	if recoil_offset > 0.001:
		recoil_offset = lerpf(recoil_offset, 0.0, 16.0 * delta)
		position = base_position + transform.basis.z * recoil_offset
	else:
		position = base_position

func get_muzzle_position() -> Vector3:
	if muzzle and muzzle.is_inside_tree():
		return muzzle.global_position
	if is_inside_tree():
		return global_position + (-global_transform.basis.z * 0.28)
	return Vector3.ZERO

func fire(aim_direction: Vector3, shooter: Node3D = null) -> Node3D:
	# Trigger recoil
	recoil_offset = 0.08
	
	# Muzzle flash illumination
	_trigger_muzzle_flash()

	# Spawn projectile in world space
	var projectile = PROJECTILE_SCENE.instantiate()
	if shooter and shooter.get_parent():
		shooter.get_parent().add_child(projectile)
	else:
		get_tree().current_scene.add_child(projectile)

	var spawn_pos: Vector3 = get_muzzle_position()
	if spawn_pos == Vector3.ZERO:
		if shooter and shooter.is_inside_tree():
			spawn_pos = shooter.global_position + Vector3(0.0, 1.2, 0.0) + aim_direction.normalized() * 0.9
		else:
			spawn_pos = global_position + Vector3(0.0, 1.2, 0.0)
	projectile.global_position = spawn_pos
	
	# Aim projectile along aim_direction
	var look_target = spawn_pos + aim_direction.normalized() * 10.0
	projectile.look_at(look_target, Vector3.UP)
	projectile.set_shooter(shooter)
	
	return projectile

func _trigger_muzzle_flash() -> void:
	if muzzle_light:
		muzzle_light.visible = true
		muzzle_light.light_energy = 3.5
	if muzzle_flash_mesh:
		muzzle_flash_mesh.visible = true
		muzzle_flash_mesh.scale = Vector3(1.2, 1.2, 1.2)

	var tw = create_tween()
	if muzzle_light:
		tw.parallel().tween_property(muzzle_light, "light_energy", 0.0, 0.08)
	if muzzle_flash_mesh:
		tw.parallel().tween_property(muzzle_flash_mesh, "scale", Vector3(0.1, 0.1, 0.1), 0.08)
	tw.tween_callback(func():
		if muzzle_light:
			muzzle_light.visible = false
		if muzzle_flash_mesh:
			muzzle_flash_mesh.visible = false
	)
