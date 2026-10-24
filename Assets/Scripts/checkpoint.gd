extends Area3D
class_name Checkpoint

# ==============================================================================
# FUNCTIONAL CHECKPOINT SYSTEM — CORE BREACH
# - Detects PlayerController (Runner) entering activation perimeter
# - Calls player.set_checkpoint(position) to record safe respawn coordinates
# - Changes visual illumination from Standby (Amber) to Active (Electric Cyan)
# - Triggers vertical holographic beam, pulsing rings, burst particles & audio chime
# - Displays 3D billboard status label ("CHECKPOINT X // STATUS")
# - Resets cleanly on round restart / arena re-initialization
# ==============================================================================

signal checkpoint_activated(checkpoint: Checkpoint, player: PlayerController)

@export var checkpoint_id: String = "CHECKPOINT_1"
@export var checkpoint_title: String = "CHECKPOINT 1"

var is_activated: bool = false
var time_elapsed: float = 0.0

# Node References
@onready var plinth_mesh: MeshInstance3D = $Visuals/PlinthMesh
@onready var ring_mesh: MeshInstance3D = $Visuals/RingMesh
@onready var beacon_mesh: MeshInstance3D = $Visuals/BeaconMesh
@onready var beam_mesh: MeshInstance3D = $Visuals.get_node_or_null("BeamMesh")
@onready var point_light: OmniLight3D = $Visuals/OmniLight3D
@onready var burst_particles: CPUParticles3D = $Visuals.get_node_or_null("BurstParticles")
@onready var status_label: Label3D = $StatusLabel3D

# Materials
var mat_standby_ring: StandardMaterial3D
var mat_standby_core: StandardMaterial3D
var mat_standby_beam: StandardMaterial3D
var mat_active_ring: StandardMaterial3D
var mat_active_core: StandardMaterial3D
var mat_active_beam: StandardMaterial3D

func _ready() -> void:
	_init_materials()
	reset_checkpoint()
	if not body_entered.is_connected(_on_body_entered):
		body_entered.connect(_on_body_entered)

func _init_materials() -> void:
	# Standby: Industrial Amber Luminescence
	mat_standby_ring = StandardMaterial3D.new()
	mat_standby_ring.albedo_color = Color(1.0, 0.65, 0.15)
	mat_standby_ring.emission_enabled = true
	mat_standby_ring.emission = Color(1.0, 0.65, 0.15)
	mat_standby_ring.emission_energy_multiplier = 2.2

	mat_standby_core = StandardMaterial3D.new()
	mat_standby_core.albedo_color = Color(1.0, 0.75, 0.25)
	mat_standby_core.emission_enabled = true
	mat_standby_core.emission = Color(1.0, 0.75, 0.25)
	mat_standby_core.emission_energy_multiplier = 2.8

	mat_standby_beam = StandardMaterial3D.new()
	mat_standby_beam.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_standby_beam.albedo_color = Color(1.0, 0.7, 0.15, 0.25)
	mat_standby_beam.emission_enabled = true
	mat_standby_beam.emission = Color(1.0, 0.65, 0.15)
	mat_standby_beam.emission_energy_multiplier = 1.8

	# Active: High-Tech Electric Cyan / Emerald Pulse
	mat_active_ring = StandardMaterial3D.new()
	mat_active_ring.albedo_color = Color(0.15, 0.95, 1.0)
	mat_active_ring.emission_enabled = true
	mat_active_ring.emission = Color(0.15, 0.95, 1.0)
	mat_active_ring.emission_energy_multiplier = 4.0

	mat_active_core = StandardMaterial3D.new()
	mat_active_core.albedo_color = Color(0.3, 1.0, 0.8)
	mat_active_core.emission_enabled = true
	mat_active_core.emission = Color(0.3, 1.0, 0.8)
	mat_active_core.emission_energy_multiplier = 4.5

	mat_active_beam = StandardMaterial3D.new()
	mat_active_beam.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat_active_beam.albedo_color = Color(0.15, 0.95, 1.0, 0.45)
	mat_active_beam.emission_enabled = true
	mat_active_beam.emission = Color(0.15, 0.95, 1.0)
	mat_active_beam.emission_energy_multiplier = 3.2

func _process(delta: float) -> void:
	time_elapsed += delta
	# Continuous smooth rotation and vertical hover bob
	if beacon_mesh:
		beacon_mesh.rotate_y(1.8 * delta)
		beacon_mesh.position.y = 1.1 + sin(time_elapsed * 3.0) * 0.12
	if ring_mesh:
		ring_mesh.rotate_y(-0.8 * delta)

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

	# Emit particle burst on activation
	if burst_particles:
		burst_particles.restart()
		burst_particles.emitting = true

	# Audio confirmation
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("objective_claimed")

	# HUD Notification
	var arena = get_tree().current_scene
	if arena and arena.has_method("_show_notification"):
		arena._show_notification("⚡ %s ACTIVATED — RESPAWN POSITION SAVED ⚡" % checkpoint_title)

	checkpoint_activated.emit(self, player)

func _update_visuals() -> void:
	if not is_inside_tree():
		return

	if ring_mesh:
		ring_mesh.material_override = mat_active_core if is_activated else mat_standby_ring
	if beacon_mesh:
		beacon_mesh.material_override = mat_active_core if is_activated else mat_standby_core
	if beam_mesh:
		beam_mesh.material_override = mat_active_beam if is_activated else mat_standby_beam
	if point_light:
		point_light.light_color = Color(0.15, 0.95, 1.0) if is_activated else Color(1.0, 0.7, 0.18)
		point_light.light_energy = 3.6 if is_activated else 2.2
		point_light.omni_range = 12.0
	if status_label:
		if is_activated:
			status_label.text = "%s\n[ ACTIVE — RESPAWN SAVED ]" % checkpoint_title
			status_label.modulate = Color(0.2, 1.0, 0.6)
		else:
			status_label.text = "%s\n[ READY — WALK TO SAVE ]" % checkpoint_title
			status_label.modulate = Color(1.0, 0.8, 0.25)

func reset_checkpoint() -> void:
	is_activated = false
	if burst_particles:
		burst_particles.emitting = false
	_update_visuals()
