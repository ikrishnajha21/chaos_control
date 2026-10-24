extends Arena
class_name NeonReactorArena

enum PurgeState { STANDBY, WARNING, PURGING }

const PURGE_STANDBY_TIME: float = 9.0
const PURGE_WARNING_TIME: float = 3.0
const PURGE_ACTIVE_TIME: float = 2.5

var purge_state: PurgeState = PurgeState.STANDBY
var purge_timer: float = PURGE_STANDBY_TIME
var affected_in_current_purge: Dictionary = {}

@onready var reactor_hazard_area: Area3D = $Environment/ReactorChamberHazard
@onready var hazard_collision: CollisionShape3D = $Environment/ReactorChamberHazard/CollisionShape3D
@onready var purge_field_mesh: MeshInstance3D = $Environment/ReactorChamberHazard/PurgeFieldMesh
@onready var hazard_label: Label3D = $Environment/ReactorChamberHazard/HazardLabel
@onready var core_light: OmniLight3D = $Environment/ReactorCore/CoreLight
@onready var blast_shield_west: StaticBody3D = $Environment/BlastShieldWest
@onready var blast_shield_east: StaticBody3D = $Environment/BlastShieldEast
@onready var checkpoints_root: Node3D = $Checkpoints if has_node("Checkpoints") else null

const CheckpointScript = preload("res://scripts/checkpoint.gd")

var shield_west_lowered: bool = false
var shield_east_lowered: bool = false

var core_standby_mat: StandardMaterial3D
var core_warning_mat: StandardMaterial3D
var core_purge_mat: StandardMaterial3D

func _setup_arena_hazards() -> void:
	arena_name = "UNDERGROUND COMPLEX"
	super._setup_arena_hazards()
	_setup_materials()
	_reset_purge_state()
	if reactor_hazard_area and not reactor_hazard_area.body_entered.is_connected(_on_purge_body_entered):
		reactor_hazard_area.body_entered.connect(_on_purge_body_entered)
	_setup_checkpoints()

func _setup_checkpoints() -> void:
	if has_node("Checkpoints"):
		for cp in $Checkpoints.get_children():
			if cp is CheckpointScript and not cp.checkpoint_activated.is_connected(_on_checkpoint_activated):
				cp.checkpoint_activated.connect(_on_checkpoint_activated)

func _on_checkpoint_activated(cp, _player: PlayerController) -> void:
	_show_notification("⚡ CHECKPOINT ACTIVATED: %s — RESPAWN ANCHOR SET! ⚡" % cp.checkpoint_title)

func _setup_materials() -> void:
	core_standby_mat = StandardMaterial3D.new()
	core_standby_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	core_standby_mat.albedo_color = Color(0.1, 0.8, 1.0, 0.15)
	core_standby_mat.emission_enabled = true
	core_standby_mat.emission = Color(0.1, 0.6, 1.0)
	core_standby_mat.emission_energy_multiplier = 1.0

	core_warning_mat = StandardMaterial3D.new()
	core_warning_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	core_warning_mat.albedo_color = Color(1.0, 0.4, 0.1, 0.35)
	core_warning_mat.emission_enabled = true
	core_warning_mat.emission = Color(1.0, 0.4, 0.1)
	core_warning_mat.emission_energy_multiplier = 2.5

	core_purge_mat = StandardMaterial3D.new()
	core_purge_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	core_purge_mat.albedo_color = Color(1.0, 0.05, 0.1, 0.6)
	core_purge_mat.emission_enabled = true
	core_purge_mat.emission = Color(1.0, 0.05, 0.1)
	core_purge_mat.emission_energy_multiplier = 4.5

func _process_arena_hazards(delta: float) -> void:
	super._process_arena_hazards(delta)
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active:
		return

	purge_timer -= delta

	match purge_state:
		PurgeState.STANDBY:
			if purge_timer <= 0.0:
				_transition_to_warning()

		PurgeState.WARNING:
			if purge_timer <= 0.0:
				_transition_to_purging()

		PurgeState.PURGING:
			# Check bodies overlapping every frame during active purge
			_check_purge_overlap()
			if purge_timer <= 0.0:
				_reset_purge_state()

func _transition_to_warning() -> void:
	purge_state = PurgeState.WARNING
	purge_timer = PURGE_WARNING_TIME
	if purge_field_mesh:
		purge_field_mesh.visible = true
		purge_field_mesh.material_override = core_warning_mat
	if core_light:
		core_light.light_color = Color(1.0, 0.35, 0.1)
		core_light.light_energy = 3.2
	if hazard_label:
		hazard_label.text = "⚠ CORE PURGE IMMINENT ⚠\n[ EVACUATE CHAMBER ]"
		hazard_label.modulate = Color(1.0, 0.8, 0.2)
	_show_notification("⚠ REACTOR CORE WARNING: Plasma purge in 3s! Flank routes safe. ⚠")

func _transition_to_purging() -> void:
	purge_state = PurgeState.PURGING
	purge_timer = PURGE_ACTIVE_TIME
	affected_in_current_purge.clear()
	if hazard_collision:
		hazard_collision.disabled = false
	if purge_field_mesh:
		purge_field_mesh.visible = true
		purge_field_mesh.material_override = core_purge_mat
	if core_light:
		core_light.light_color = Color(1.0, 0.05, 0.1)
		core_light.light_energy = 4.5
	if hazard_label:
		hazard_label.text = "⚡ PLASMA PURGE ACTIVE ⚡\n[ HIGH RADIATION ]"
		hazard_label.modulate = Color(1.0, 0.2, 0.2)
	_show_notification("⚡ REACTOR PURGING — CENTRAL CHAMBER COMPROMISED! ⚡")
	_check_purge_overlap()

func _reset_purge_state() -> void:
	purge_state = PurgeState.STANDBY
	purge_timer = PURGE_STANDBY_TIME
	affected_in_current_purge.clear()
	if hazard_collision:
		hazard_collision.disabled = true
	if purge_field_mesh:
		purge_field_mesh.visible = false
	if core_light:
		core_light.light_color = Color(0.1, 0.8, 1.0)
		core_light.light_energy = 2.0
	if hazard_label:
		hazard_label.text = "REACTOR CORE\n[ CONTAINMENT NOMINAL ]"
		hazard_label.modulate = Color(0.2, 0.8, 1.0)

func _check_purge_overlap() -> void:
	if not reactor_hazard_area or purge_state != PurgeState.PURGING:
		return
	var bodies = reactor_hazard_area.get_overlapping_bodies()
	for body in bodies:
		_apply_purge_effect(body)

func _on_purge_body_entered(body: Node3D) -> void:
	if purge_state == PurgeState.PURGING:
		_apply_purge_effect(body)

func _apply_purge_effect(body: Node3D) -> void:
	if body is PlayerController and body.current_role == PlayerController.Role.RUNNER:
		var id = body.get_instance_id()
		if not affected_in_current_purge.has(id):
			affected_in_current_purge[id] = true
			if body.has_method("apply_hazard_effect"):
				body.apply_hazard_effect(1.5, 0.25)

func _reset_round_state() -> void:
	activated_count = 0
	if control_points_root:
		for child in control_points_root.get_children():
			if child is ControlPoint:
				child.reset_point()
	if exit_zone:
		exit_zone.lock_exit()
	_reset_arena_hazards()
	_reset_arena_rearrangement()
	_reset_coins()

func _reset_arena_hazards() -> void:
	super._reset_arena_hazards()
	_reset_purge_state()
	if has_node("Checkpoints"):
		for cp in $Checkpoints.get_children():
			if cp.has_method("reset_checkpoint"):
				cp.reset_checkpoint()

func _on_arena_rearranged(point_title: String, _count: int) -> void:
	var title_upper = point_title.to_upper()
	if "ALPHA" in title_upper:
		shield_west_lowered = true
		if blast_shield_west:
			var tw = create_tween()
			tw.tween_property(blast_shield_west, "position", Vector3(-7.5, -2.5, -2.7), 0.7).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
			var col = blast_shield_west.get_node_or_null("Collision")
			if col:
				col.disabled = true
		_show_notification("⚡ ARENA RECONFIGURATION: West Blast Shield Lowered — Bypass Open! ⚡")
	elif "BETA" in title_upper:
		shield_east_lowered = true
		if blast_shield_east:
			var tw = create_tween()
			tw.tween_property(blast_shield_east, "position", Vector3(9.5, -2.5, -2.7), 0.7).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
			var col = blast_shield_east.get_node_or_null("Collision")
			if col:
				col.disabled = true
		_show_notification("⚡ ARENA RECONFIGURATION: East Blast Shield Lowered — Flank Clear! ⚡")
	elif "GAMMA" in title_upper:
		_show_notification("⚡ ARENA RECONFIGURATION: Primary Blast Route Unlocked — Reach Exit! ⚡")

func _on_reset_arena_rearrangement() -> void:
	shield_west_lowered = false
	shield_east_lowered = false
	if blast_shield_west:
		blast_shield_west.position = Vector3(-7.5, 1.25, -2.7)
		var col = blast_shield_west.get_node_or_null("Collision")
		if col:
			col.disabled = false
	if blast_shield_east:
		blast_shield_east.position = Vector3(9.5, 1.25, -2.7)
		var col = blast_shield_east.get_node_or_null("Collision")
		if col:
			col.disabled = false

func _on_saboteur_ability_activated(saboteur: PlayerController, _runner: PlayerController) -> void:
	# If saboteur activates near reactor core while on standby, accelerate purge warning!
	if purge_state == PurgeState.STANDBY and round_state == RoundState.ACTIVE and not is_countdown_active:
		if saboteur and reactor_hazard_area:
			var dist = saboteur.global_position.distance_to(reactor_hazard_area.global_position)
			if dist <= 18.0:
				_transition_to_warning()
				_show_notification("⚠ REACTOR OVERLOAD TRIGGERED BY SABOTEUR! ⚠")

func _get_runner_spawn_position() -> Vector3:
	return Vector3(-8.0, 0.5, 4.0)

func _get_saboteur_spawn_position() -> Vector3:
	return Vector3(8.0, 0.5, -4.0)
