extends Node3D
class_name PreBlastChargeFX

# ==============================================================================
# Pre-blast charge warning effect on target
# Pulses crimson energy and plays warning audio
# ==============================================================================

@onready var charge_light: OmniLight3D = $ChargeLight
@onready var warning_mesh: MeshInstance3D = $WarningRing

var pulse_time: float = 0.0

func _ready() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("sabotage_warning", 1.4)

func _process(delta: float) -> void:
	pulse_time += delta * 18.0
	var pulse = (sin(pulse_time) + 1.0) * 0.5
	if charge_light:
		charge_light.light_energy = 2.0 + pulse * 4.0
	if warning_mesh:
		warning_mesh.scale = Vector3.ONE * (1.2 - pulse * 0.3)
