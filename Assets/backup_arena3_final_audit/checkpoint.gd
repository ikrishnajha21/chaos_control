extends Area3D
class_name Checkpoint

# ==============================================================================
# FUNCTIONAL CHECKPOINT SYSTEM — ARENA 3: UNDERGROUND COMPLEX
# - Detects PlayerController (Runner) entering activation perimeter
# - Calls player.set_checkpoint(position) to record safe respawn coordinates
# - Changes visual illumination from Standby (Amber) to Active (Electric Cyan)
# - Plays audio confirmation & shows HUD alert
# - Resets cleanly on round restart / arena re-initialization
# ==============================================================================

signal checkpoint_activated(checkpoint: Checkpoint, player: PlayerController)

@export var checkpoint_id: String = "CHECKPOINT_1"
@export var checkpoint_title: String = "SECTOR CHECKPOINT"

var is_activated: bool = false
var time_elapsed: float = 0.0

# Node References
@onready var plinth_mesh: MeshInstance3D = $Visuals/PlinthMesh
@onready var ring_mesh: MeshInstance3D = $Visuals/RingMesh
@onready var beacon_mesh: MeshInstance3D = $Visuals/BeaconMesh
@onready var point_light: OmniLight3D = $Visuals/OmniLight3D
@onready var status_label: Label3D = $StatusLabel3D

# Materials
var mat_standby_ring: StandardMaterial3D
var mat_standby_core: StandardMaterial3D
var mat_active_ring: StandardMaterial3D
var mat_active_core: StandardMaterial3D

func _ready() -> void:
	_init_materials()
	reset_checkpoint()
	body_entered.connect(_on_body_entered)

func _init_materials() -> void:
	# Standby: Industrial Amber Luminescence
	mat_standby_ring = StandardMaterial3D.new()
	mat_standby_ring.albedo_color = Color(1.0, 0.65, 0.15)
	mat_standby_ring.emission_enabled = true
	mat_standby_ring.emission = Color(1.0, 0.65, 0.15)
	mat_standby_ring.emission_energy_multiplier = 1.8

	mat_standby_core = StandardMaterial3D.new()
	mat_standby_core.albedo_color = Color(1.0, 0.75, 0.25)
	mat_standby_core.emission_enabled = true
	mat_standby_core.emission = Color(1.0, 0.75, 0.25)
	mat_standby_core.emission_energy_multiplier = 2.4

	# Active: High-Tech Electric Cyan / Emerald Pulse
	mat_active_ring = StandardMaterial3D.new()
	mat_active_ring.albedo_color = Color(0.15, 0.95, 1.0)
	mat_active_ring.emission_enabled = true
	mat_active_ring.emission = Color(0.15, 0.95, 1.0)
	mat_active_ring.emission_energy_multiplier = 3.5

	mat_active_core = StandardMaterial3D.new()
	mat_active_core.albedo_color = Color(0.3, 1.0, 0.8)
	mat_active_core.emission_enabled = true
	mat_active_core.emission = Color(0.3, 1.0, 0.8)
	mat_active_core.emission_energy_multiplier = 4.2

func _process(delta: float) -> void:
	time_elapsed += delta
	# Continuous smooth rotation and vertical hover bob
	if beacon_mesh:
		beacon_mesh.rotate_y(1.5 * delta)
		beacon_mesh.position.y = 0.9 + sin(time_elapsed * 3.0) * 0.08

	if is_activated and point_light:
		point_light.light_energy = 2.6 + sin(time_elapsed * 4.0) * 0.4

func _on_body_entered(body: Node3D) -> void:
	if is_activated:
		return
	if not (body is PlayerController or body.has_method("set_checkpoint")):
		return

	var player = body as PlayerController
	if player.is_eliminated:
		return

	# Only Runner / Saviour updates their field checkpoint
	if player.current_role != PlayerController.Role.RUNNER:
		return

	activate(player)

func activate(player: PlayerController) -> void:
	if is_activated:
		return

	is_activated = true

	# Set authoritative safe respawn position on player
	var safe_respawn = global_position + Vector3(0.0, 0.5, 0.0)
	player.set_checkpoint(safe_respawn)

	# Update visual illumination
	_update_visuals()

	# Audio confirmation
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("objective_claimed")

	# HUD Notification
	var arena = get_tree().current_scene
	if arena and arena.has_method("_show_notification"):
		arena._show_notification("⚡ CHECKPOINT ACTIVATED: %s — RESPAWN POSITION SAVED ⚡" % checkpoint_title)

	checkpoint_activated.emit(self, player)

func _update_visuals() -> void:
	if not is_inside_tree():
		return

	if ring_mesh:
		ring_mesh.material_override = mat_active_core if is_activated else mat_standby_ring
	if beacon_mesh:
		beacon_mesh.material_override = mat_active_core if is_activated else mat_standby_core
	if point_light:
		point_light.light_color = Color(0.15, 0.95, 1.0) if is_activated else Color(1.0, 0.7, 0.18)
		point_light.light_energy = 2.8 if is_activated else 1.8
	if status_label:
		if is_activated:
			status_label.text = "%s\n[ ACTIVE — RESPAWN SAVED ]" % checkpoint_title
			status_label.modulate = Color(0.2, 1.0, 0.6)
		else:
			status_label.text = "%s\n[ READY ]" % checkpoint_title
			status_label.modulate = Color(1.0, 0.8, 0.25)

func reset_checkpoint() -> void:
	is_activated = false
	_update_visuals()
