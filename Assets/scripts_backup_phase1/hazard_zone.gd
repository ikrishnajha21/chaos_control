extends Area3D
class_name HazardZone

enum State { WARNING, ACTIVE, EXPIRED }

@export var warning_duration: float = 1.0
@export var active_duration: float = 2.0
@export var stun_duration: float = 1.5
@export var slow_factor: float = 0.25 # 75% speed penalty

var current_state: State = State.WARNING
var state_timer: float = 0.0
var affected_runners: Dictionary = {} # Set of already hit instances

# Visual node references
@onready var collision_shape: CollisionShape3D = $CollisionShape3D
@onready var warning_visuals: Node3D = $WarningVisuals
@onready var active_visuals: Node3D = $ActiveVisuals
@onready var warning_ring: MeshInstance3D = $WarningVisuals/WarningRing
@onready var warning_disc: MeshInstance3D = $WarningVisuals/WarningDisc
@onready var warning_light: OmniLight3D = $WarningVisuals/WarningLight
@onready var warning_label: Label3D = $WarningVisuals/WarningLabel
@onready var active_light: OmniLight3D = $ActiveVisuals/OmniLight3D
@onready var active_field: MeshInstance3D = $ActiveVisuals/ActiveField
@onready var electric_particles: CPUParticles3D = $ActiveVisuals/ElectricParticles
@onready var active_label: Label3D = $ActiveVisuals/ActiveLabel

func _ready() -> void:
	current_state = State.WARNING
	state_timer = warning_duration
	
	warning_visuals.visible = true
	active_visuals.visible = false
	
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("sabotage_warning")
	
	body_entered.connect(_on_body_entered)

func _process(delta: float) -> void:
	state_timer -= delta
	
	match current_state:
		State.WARNING:
			# Pulse the warning visuals
			var pulse = (sin(Time.get_ticks_msec() * 0.02) + 1.0) * 0.5
			if warning_disc and warning_disc.material_override:
				warning_disc.material_override.albedo_color.a = 0.2 + pulse * 0.3
			if warning_ring and warning_ring.material_override:
				warning_ring.material_override.emission_energy_multiplier = 2.0 + pulse * 3.0
			if warning_light:
				warning_light.light_energy = 1.0 + pulse * 3.0
				
			if state_timer <= 0.0:
				_transition_to_active()
				
		State.ACTIVE:
			# Active electric hazard flicker
			var flicker = randf_range(0.8, 1.3)
			if active_light:
				active_light.light_energy = 3.5 * flicker
			if active_field:
				active_field.rotate_y(delta * 4.0)
				
			# Check bodies already inside at activation time
			_check_overlapping_runners()
			
			if state_timer <= 0.0:
				_transition_to_expired()
				
		State.EXPIRED:
			# Smooth fade out before removal
			queue_free()

func _transition_to_active() -> void:
	current_state = State.ACTIVE
	state_timer = active_duration
	warning_visuals.visible = false
	active_visuals.visible = true
	if electric_particles:
		electric_particles.emitting = true
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("sabotage_activate")
	_check_overlapping_runners()

func _transition_to_expired() -> void:
	current_state = State.EXPIRED
	queue_free()

func _check_overlapping_runners() -> void:
	if current_state != State.ACTIVE:
		return
		
	var bodies = get_overlapping_bodies()
	for body in bodies:
		_try_apply_hazard(body)

func _on_body_entered(body: Node3D) -> void:
	if current_state == State.ACTIVE:
		_try_apply_hazard(body)

func _try_apply_hazard(body: Node3D) -> void:
	if current_state != State.ACTIVE:
		return
		
	if body is PlayerController:
		# Only affect the Runner
		if body.current_role == PlayerController.Role.RUNNER:
			var body_id = body.get_instance_id()
			# Prevent applying every frame
			if not affected_runners.has(body_id):
				affected_runners[body_id] = true
				if body.has_method("apply_hazard_effect"):
					body.apply_hazard_effect(stun_duration, slow_factor)
