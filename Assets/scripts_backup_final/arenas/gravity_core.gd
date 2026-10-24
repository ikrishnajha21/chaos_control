extends Arena
class_name GravityCoreArena

enum BridgeState { ONLINE, WARNING, DISABLED }

const BRIDGE_WARNING_TIME: float = 1.5
const BRIDGE_DISABLED_TIME: float = 4.0

var bridge_state: BridgeState = BridgeState.ONLINE
var bridge_timer: float = 0.0

@onready var energy_bridge: StaticBody3D = $Environment/Bridges/CentralEnergyBridge
@onready var bridge_collision: CollisionShape3D = $Environment/Bridges/CentralEnergyBridge/CollisionShape3D
@onready var bridge_mesh: MeshInstance3D = $Environment/Bridges/CentralEnergyBridge/BridgeMesh
@onready var bridge_label: Label3D = $Environment/Bridges/CentralEnergyBridge/BridgeLabel
@onready var bridge_light_w: OmniLight3D = $Environment/Bridges/CentralEnergyBridge/LightWest
@onready var bridge_light_e: OmniLight3D = $Environment/Bridges/CentralEnergyBridge/LightEast

var bridge_online_mat: StandardMaterial3D
var bridge_warning_mat: StandardMaterial3D
var bridge_offline_mat: StandardMaterial3D

func _setup_arena_hazards() -> void:
	arena_name = "POWER CORE"
	_setup_bridge_materials()
	_restore_bridge()

func _setup_bridge_materials() -> void:
	bridge_online_mat = StandardMaterial3D.new()
	bridge_online_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	bridge_online_mat.albedo_color = Color(0.1, 0.7, 1.0, 0.7)
	bridge_online_mat.emission_enabled = true
	bridge_online_mat.emission = Color(0.1, 0.8, 1.0)
	bridge_online_mat.emission_energy_multiplier = 3.0

	bridge_warning_mat = StandardMaterial3D.new()
	bridge_warning_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	bridge_warning_mat.albedo_color = Color(1.0, 0.6, 0.1, 0.6)
	bridge_warning_mat.emission_enabled = true
	bridge_warning_mat.emission = Color(1.0, 0.5, 0.1)
	bridge_warning_mat.emission_energy_multiplier = 3.5

	bridge_offline_mat = StandardMaterial3D.new()
	bridge_offline_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	bridge_offline_mat.albedo_color = Color(1.0, 0.15, 0.15, 0.2)
	bridge_offline_mat.emission_enabled = true
	bridge_offline_mat.emission = Color(1.0, 0.1, 0.1)
	bridge_offline_mat.emission_energy_multiplier = 1.0

func _trigger_saboteur_ability() -> void:
	super._trigger_saboteur_ability()
	# In Gravity Core, Saboteur's EMP surge destabilizes the Central Energy Bridge!
	if bridge_state == BridgeState.ONLINE and round_state == RoundState.ACTIVE and not is_countdown_active:
		_start_bridge_destabilization()

func _start_bridge_destabilization() -> void:
	bridge_state = BridgeState.WARNING
	bridge_timer = BRIDGE_WARNING_TIME
	if bridge_mesh:
		bridge_mesh.material_override = bridge_warning_mat
	if bridge_label:
		bridge_label.text = "⚠ BRIDGE DESTABILIZING ⚠\n[ COLLAPSE IMMINENT ]"
		bridge_label.modulate = Color(1.0, 0.85, 0.2)
	_set_bridge_lights(Color(1.0, 0.65, 0.1), 4.0)
	_show_notification("⚠ GRAVITY BRIDGE DESTABILIZING — FLANK ROUTES OPEN! ⚠")

func _disable_bridge() -> void:
	bridge_state = BridgeState.DISABLED
	bridge_timer = BRIDGE_DISABLED_TIME
	if bridge_collision:
		bridge_collision.disabled = true
	if bridge_mesh:
		bridge_mesh.material_override = bridge_offline_mat
	if bridge_label:
		bridge_label.text = "⚡ BRIDGE OFFLINE ⚡\n[ USE FLANK CATWALKS ]"
		bridge_label.modulate = Color(1.0, 0.2, 0.2)
	_set_bridge_lights(Color(1.0, 0.1, 0.1), 3.0)
	_show_notification("⚡ CENTRAL BRIDGE OFFLINE — USE FLANK CATWALKS! ⚡")

func _restore_bridge() -> void:
	bridge_state = BridgeState.ONLINE
	bridge_timer = 0.0
	if bridge_collision:
		bridge_collision.disabled = false
	if bridge_mesh:
		bridge_mesh.material_override = bridge_online_mat
	if bridge_label:
		bridge_label.text = "ENERGY BRIDGE\n[ ONLINE ]"
		bridge_label.modulate = Color(0.2, 0.85, 1.0)
	_set_bridge_lights(Color(0.1, 0.8, 1.0), 2.0)

func _set_bridge_lights(col: Color, energy: float) -> void:
	if bridge_light_w:
		bridge_light_w.light_color = col
		bridge_light_w.light_energy = energy
	if bridge_light_e:
		bridge_light_e.light_color = col
		bridge_light_e.light_energy = energy

func _process_arena_hazards(delta: float) -> void:
	if bridge_state == BridgeState.ONLINE:
		return
		
	bridge_timer -= delta
	
	if bridge_state == BridgeState.WARNING:
		# Rapid pulse for warning lights
		var pulse = (sin(Time.get_ticks_msec() * 0.03) + 1.0) * 0.5
		_set_bridge_lights(Color(1.0, 0.7, 0.1), 2.0 + pulse * 3.0)
		if bridge_timer <= 0.0:
			_disable_bridge()
	elif bridge_state == BridgeState.DISABLED:
		# Flicker for offline bridge
		var flicker = randf_range(0.8, 2.0)
		_set_bridge_lights(Color(1.0, 0.1, 0.1), flicker)
		if bridge_timer <= 0.0:
			_restore_bridge()

func _reset_arena_hazards() -> void:
	_restore_bridge()

func _on_runner_ability_activated(_runner: PlayerController, _saboteur: PlayerController) -> void:
	if bridge_state != BridgeState.ONLINE:
		_show_notification("📡 [TACTICAL PULSE] CATWALK BYPASS ROUTES ILLUMINATED! 📡")
