extends Node3D
class_name Arena

# Preloaded assets
const HAZARD_SCENE: PackedScene = preload("res://scenes/hazard_zone.tscn")

# Match Configuration
const MAX_ROUNDS: int = 3
const ROUND_TIME_LIMIT: float = 120.0
const COUNTDOWN_TIME: float = 3.0
const TRANSITION_TIME: float = 3.0
const COOLDOWN_DURATION: float = 6.0
const WARNING_DURATION: float = 1.0
const ACTIVE_DURATION: float = 2.0
const RUNNER_COOLDOWN_DURATION: float = 7.0
const RUNNER_SURGE_DURATION: float = 1.4

enum RoundState { ACTIVE, RUNNER_WON, SABOTEUR_WON }

# Node References
@onready var p1: PlayerController = $Players/Player1
@onready var p2: PlayerController = $Players/Player2
@onready var camera: SharedCameraController = $Camera3D
@onready var hud: CanvasLayer = $HUD
@onready var exit_zone: ExitZone = $ExitZone
@onready var control_points_root: Node3D = $ControlPoints

# HUD Nodes
@onready var round_label: Label = $HUD/MarginContainer/TopBar/MatchHeader/RoundPanel/RoundLabel
@onready var score_label: Label = $HUD/MarginContainer/TopBar/MatchHeader/ScorePanel/ScoreLabel
@onready var timer_label: Label = $HUD/MarginContainer/TopBar/MatchHeader/TimerPanel/TimerLabel
@onready var objective_label: Label = $HUD/MarginContainer/TopBar/ObjectivesPanel/ObjectiveLabel
@onready var notification_label: Label = $HUD/MarginContainer/TopBar/NotificationLabel
@onready var countdown_label: Label = $HUD/CountdownLabel

# Player 1 HUD Card
@onready var p1_title: Label = $HUD/MarginContainer/BottomBar/P1Card/VBox/P1Title
@onready var p1_controls: Label = $HUD/MarginContainer/BottomBar/P1Card/VBox/P1Controls
@onready var p1_ability_status: Label = $HUD/MarginContainer/BottomBar/P1Card/VBox/P1AbilityStatus
@onready var p1_cooldown_bar: ProgressBar = $HUD/MarginContainer/BottomBar/P1Card/VBox/P1CooldownBar

# Player 2 HUD Card
@onready var p2_title: Label = $HUD/MarginContainer/BottomBar/P2Card/VBox/P2Title
@onready var p2_controls: Label = $HUD/MarginContainer/BottomBar/P2Card/VBox/P2Controls
@onready var p2_ability_status: Label = $HUD/MarginContainer/BottomBar/P2Card/VBox/P2AbilityStatus
@onready var p2_cooldown_bar: ProgressBar = $HUD/MarginContainer/BottomBar/P2Card/VBox/P2CooldownBar

# Overlays
@onready var round_end_overlay: CenterContainer = $HUD/RoundEndOverlay
@onready var round_end_title: Label = $HUD/RoundEndOverlay/PanelContainer/VBox/RoundEndTitle
@onready var round_end_winner: Label = $HUD/RoundEndOverlay/PanelContainer/VBox/RoundEndWinner
@onready var round_end_score: Label = $HUD/RoundEndOverlay/PanelContainer/VBox/RoundEndScore
@onready var round_end_subtext: Label = $HUD/RoundEndOverlay/PanelContainer/VBox/RoundEndSubtext

@onready var match_results_overlay: CenterContainer = $HUD/MatchResultsOverlay
@onready var match_winner_label: Label = $HUD/MatchResultsOverlay/PanelContainer/VBox/MatchWinnerLabel
@onready var match_score_label: Label = $HUD/MatchResultsOverlay/PanelContainer/VBox/MatchScoreLabel
@onready var play_again_button: Button = $HUD/MatchResultsOverlay/PanelContainer/VBox/PlayAgainButton

# Pause Overlay
@onready var pause_overlay: CenterContainer = $HUD/PauseOverlay
@onready var btn_pause_resume: Button = $HUD/PauseOverlay/PanelContainer/VBox/ResumeButton
@onready var btn_pause_restart: Button = $HUD/PauseOverlay/PanelContainer/VBox/RestartRoundButton
@onready var btn_pause_main_menu: Button = $HUD/PauseOverlay/PanelContainer/VBox/MainMenuButton

@export var arena_name: String = "TRAINING FACILITY"

# Match State
var current_round: int = 1
var p1_score: int = 0
var p2_score: int = 0
var is_match_over: bool = false

# Round Internal State
var round_state: RoundState = RoundState.ACTIVE
var time_remaining: float = ROUND_TIME_LIMIT
var activated_count: int = 0
var total_objectives: int = 3
var notification_timer: float = 0.0

var is_countdown_active: bool = true
var countdown_timer: float = COUNTDOWN_TIME
var last_countdown_step: String = ""

var is_transition_active: bool = false
var transition_timer: float = 0.0

var ability_cooldown: float = 0.0
var runner_cooldown: float = 0.0
var round_time_elapsed: float = 0.0
var active_hazard_instance: HazardZone = null

# Match & Round Performance Statistics
var p1_terminals_hacked: int = 0
var p2_terminals_hacked: int = 0
var p1_traps_deployed: int = 0
var p2_traps_deployed: int = 0
var p1_traps_hit: int = 0
var p2_traps_hit: int = 0
var p1_pulses_used: int = 0
var p2_pulses_used: int = 0

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	_ensure_input_mappings()
	_setup_control_points()
	_setup_exit_zone()
	_setup_ui_connections()
	_setup_arena_hazards()
	_start_round(1)

func _ensure_input_mappings() -> void:
	var mapping = {
		"p1_up": KEY_W,
		"p1_down": KEY_S,
		"p1_left": KEY_A,
		"p1_right": KEY_D,
		"p1_interact": KEY_E,
		"p1_pulse": KEY_Q,
		"p2_up": KEY_UP,
		"p2_down": KEY_DOWN,
		"p2_left": KEY_LEFT,
		"p2_right": KEY_RIGHT,
		"p2_action": KEY_SPACE,
		"p2_pulse": KEY_SHIFT,
		"game_restart": KEY_R,
		"game_pause": KEY_ESCAPE
	}

	for action_name in mapping.keys():
		if not InputMap.has_action(action_name):
			InputMap.add_action(action_name)
		
		var events = InputMap.action_get_events(action_name)
		var has_key = false
		for ev in events:
			if ev is InputEventKey and ev.physical_keycode == mapping[action_name]:
				has_key = true
				break
		if not has_key:
			var key_ev = InputEventKey.new()
			key_ev.physical_keycode = mapping[action_name]
			InputMap.action_add_event(action_name, key_ev)

	# Additional secondary key binding for p2_pulse (Enter)
	if InputMap.has_action("p2_pulse"):
		var p2_events = InputMap.action_get_events("p2_pulse")
		var has_enter = false
		for ev in p2_events:
			if ev is InputEventKey and ev.physical_keycode == KEY_ENTER:
				has_enter = true
				break
		if not has_enter:
			var enter_ev = InputEventKey.new()
			enter_ev.physical_keycode = KEY_ENTER
			InputMap.action_add_event("p2_pulse", enter_ev)

func _setup_control_points() -> void:
	if not control_points_root:
		return
		
	total_objectives = control_points_root.get_child_count()
	for child in control_points_root.get_children():
		if child is ControlPoint:
			child.point_activated.connect(_on_control_point_activated)

func _setup_exit_zone() -> void:
	if exit_zone:
		exit_zone.lock_exit()
		if not exit_zone.runner_reached_exit.is_connected(_on_runner_reached_exit):
			exit_zone.runner_reached_exit.connect(_on_runner_reached_exit)

func _setup_ui_connections() -> void:
	if has_node("HUD/MatchResultsOverlay/PanelContainer/VBox/PlayAgainButton"):
		var btn = get_node("HUD/MatchResultsOverlay/PanelContainer/VBox/PlayAgainButton") as Button
		if btn and not btn.pressed.is_connected(_on_play_again_pressed):
			btn.pressed.connect(_on_play_again_pressed)
	if has_node("HUD/MatchResultsOverlay/PanelContainer/VBox/ChangeArenaButton"):
		var btn = get_node("HUD/MatchResultsOverlay/PanelContainer/VBox/ChangeArenaButton") as Button
		if btn and not btn.pressed.is_connected(_on_change_arena_pressed):
			btn.pressed.connect(_on_change_arena_pressed)

	# Pause Overlay buttons
	if has_node("HUD/PauseOverlay/PanelContainer/VBox/ResumeButton"):
		var btn = get_node("HUD/PauseOverlay/PanelContainer/VBox/ResumeButton") as Button
		if btn and not btn.pressed.is_connected(_on_pause_resume_pressed):
			btn.pressed.connect(_on_pause_resume_pressed)
	if has_node("HUD/PauseOverlay/PanelContainer/VBox/RestartRoundButton"):
		var btn = get_node("HUD/PauseOverlay/PanelContainer/VBox/RestartRoundButton") as Button
		if btn and not btn.pressed.is_connected(_on_pause_restart_pressed):
			btn.pressed.connect(_on_pause_restart_pressed)
	if has_node("HUD/PauseOverlay/PanelContainer/VBox/MainMenuButton"):
		var btn = get_node("HUD/PauseOverlay/PanelContainer/VBox/MainMenuButton") as Button
		if btn and not btn.pressed.is_connected(_on_pause_main_menu_pressed):
			btn.pressed.connect(_on_pause_main_menu_pressed)
	if has_node("HUD/MarginContainer/TopBar/MatchHeader/PauseButton"):
		var btn = get_node("HUD/MarginContainer/TopBar/MatchHeader/PauseButton") as Button
		if btn and not btn.pressed.is_connected(func(): toggle_pause(true)):
			btn.pressed.connect(func(): toggle_pause(true))

func _on_change_arena_pressed() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	get_tree().paused = false
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")

func toggle_pause(should_pause: bool) -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	get_tree().paused = should_pause
	if pause_overlay:
		pause_overlay.visible = should_pause
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE

func _on_pause_resume_pressed() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	toggle_pause(false)

func _on_pause_restart_pressed() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	toggle_pause(false)
	_reset_positions()

func _on_pause_main_menu_pressed() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	get_tree().paused = false
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")

func _start_round(round_num: int) -> void:
	current_round = round_num
	round_state = RoundState.ACTIVE
	time_remaining = ROUND_TIME_LIMIT
	round_time_elapsed = 0.0
	activated_count = 0
	ability_cooldown = 0.0
	runner_cooldown = 0.0
	is_transition_active = false
	transition_timer = 0.0
	is_countdown_active = true
	countdown_timer = COUNTDOWN_TIME
	last_countdown_step = ""

	# Hide Overlays
	if pause_overlay:
		pause_overlay.visible = false
	get_tree().paused = false
	if round_end_overlay:
		round_end_overlay.visible = false
	if match_results_overlay:
		match_results_overlay.visible = false

	# Setup Roles & Spawn Positions based on round
	# Round 1: P1 Runner, P2 Saboteur
	# Round 2: P2 Runner, P1 Saboteur
	# Round 3: P1 Runner, P2 Saboteur
	var p1_is_runner: bool = (round_num != 2)
	
	if p1:
		p1.set_role(PlayerController.Role.RUNNER if p1_is_runner else PlayerController.Role.SABOTEUR)
		p1.global_position = Vector3(-8.0, 0.5, 4.0) if p1_is_runner else Vector3(8.0, 0.5, -4.0)
		p1.velocity = Vector3.ZERO
		p1.clear_hazard_effect()
		p1.freeze()
		if not p1.hazard_effect_applied.is_connected(_on_p1_hazard_applied):
			p1.hazard_effect_applied.connect(_on_p1_hazard_applied)

	if p2:
		p2.set_role(PlayerController.Role.SABOTEUR if p1_is_runner else PlayerController.Role.RUNNER)
		p2.global_position = Vector3(8.0, 0.5, -4.0) if p1_is_runner else Vector3(-8.0, 0.5, 4.0)
		p2.velocity = Vector3.ZERO
		p2.clear_hazard_effect()
		p2.freeze()
		if not p2.hazard_effect_applied.is_connected(_on_p2_hazard_applied):
			p2.hazard_effect_applied.connect(_on_p2_hazard_applied)

	# Clear any active hazard zones
	for child in get_children():
		if child is HazardZone:
			child.queue_free()
	active_hazard_instance = null

	# Reset all control points and exit
	if control_points_root:
		for child in control_points_root.get_children():
			if child is ControlPoint:
				child.reset_point()
				child.set_interaction_locked(true) # locked during countdown

	if exit_zone:
		exit_zone.lock_exit()

	_reset_arena_hazards()

	# Reset camera
	if camera:
		camera.target_runner = p1 if p1_is_runner else p2
		camera.target_saboteur = p2 if p1_is_runner else p1

	# Show Countdown Label
	if countdown_label:
		countdown_label.visible = true
		countdown_label.text = "3"
		countdown_label.modulate = Color(1.0, 0.35, 0.2)

	_update_hud_all()
	_show_notification("ROUND %d BEGINS! GET READY..." % current_round)

func _on_p1_hazard_applied() -> void:
	p1_traps_hit += 1

func _on_p2_hazard_applied() -> void:
	p2_traps_hit += 1

func _update_hud_all() -> void:
	# Round & Scoreboard
	if round_label:
		round_label.text = "ROUND %d/%d" % [current_round, MAX_ROUNDS]
	if score_label:
		score_label.text = "PLAYER 1: %d  |  PLAYER 2: %d" % [p1_score, p2_score]
		
	_update_objective_hud()
	_update_timer_hud()
	_update_player_cards()
	_update_ability_hud()

func _update_player_cards() -> void:
	var p1_is_runner: bool = (p1 and p1.current_role == PlayerController.Role.RUNNER)
	
	if p1_title:
		if p1_is_runner:
			p1_title.text = "PLAYER 1: RUNNER (CYAN)"
			p1_title.modulate = Color(0.12, 0.72, 1.0)
		else:
			p1_title.text = "PLAYER 1: SABOTEUR (CRIMSON)"
			p1_title.modulate = Color(1.0, 0.28, 0.15)
			
	if p1_controls:
		if p1_is_runner:
			p1_controls.text = "Move: [W] [A] [S] [D] | Override: [E] | Surge: [Q]"
		else:
			p1_controls.text = "Move: [W] [A] [S] [D] | Trap/Scramble: [E]"
			
	if p1_ability_status:
		p1_ability_status.visible = true
	if p1_cooldown_bar:
		p1_cooldown_bar.visible = true

	var p2_is_runner: bool = (p2 and p2.current_role == PlayerController.Role.RUNNER)
	
	if p2_title:
		if p2_is_runner:
			p2_title.text = "PLAYER 2: RUNNER (CYAN)"
			p2_title.modulate = Color(0.12, 0.72, 1.0)
		else:
			p2_title.text = "PLAYER 2: SABOTEUR (CRIMSON)"
			p2_title.modulate = Color(1.0, 0.28, 0.15)
			
	if p2_controls:
		if p2_is_runner:
			p2_controls.text = "Move: [↑] [←] [↓] [→] | Override: [SPACE] | Surge: [SHIFT]"
		else:
			p2_controls.text = "Move: [↑] [←] [↓] [→] | Trap/Scramble: [SPACE]"
			
	if p2_ability_status:
		p2_ability_status.visible = true
	if p2_cooldown_bar:
		p2_cooldown_bar.visible = true

func _process(delta: float) -> void:
	if get_tree().paused:
		return

	# Toast Notification timer
	if notification_timer > 0.0:
		notification_timer -= delta
		if notification_timer <= 0.0 and notification_label:
			notification_label.visible = false

	# Pre-round Countdown (3, 2, 1, GO!)
	if is_countdown_active:
		_process_countdown(delta)
		return

	# Intermission transition timer between rounds
	if is_transition_active:
		transition_timer -= delta
		if round_end_subtext:
			round_end_subtext.text = "Next round starting in %.1fs..." % maxf(0.0, transition_timer)
		if transition_timer <= 0.0:
			is_transition_active = false
			if current_round < MAX_ROUNDS:
				_start_round(current_round + 1)
			else:
				_show_final_match_results()
		return

	# Active Round Countdown
	if round_state == RoundState.ACTIVE and not is_match_over:
		time_remaining = maxf(0.0, time_remaining - delta)
		round_time_elapsed += delta
		_update_timer_hud()
		if time_remaining <= 0.0:
			_end_round(RoundState.SABOTEUR_WON)

	# Saboteur Ability Cooldown
	var hud_needs_update: bool = false
	if ability_cooldown > 0.0:
		ability_cooldown = maxf(0.0, ability_cooldown - delta)
		hud_needs_update = true

	# Runner Ability Cooldown
	if runner_cooldown > 0.0:
		runner_cooldown = maxf(0.0, runner_cooldown - delta)
		hud_needs_update = true

	if hud_needs_update:
		_update_ability_hud()

	# Arena-specific custom hazard processing
	_process_arena_hazards(delta)

func _process_countdown(delta: float) -> void:
	countdown_timer -= delta
	
	if countdown_timer <= 0.0 and is_countdown_active:
		is_countdown_active = false
		if p1:
			p1.unfreeze()
		if p2:
			p2.unfreeze()
		if control_points_root:
			for child in control_points_root.get_children():
				if child is ControlPoint:
					child.set_interaction_locked(false)

	if not countdown_label:
		return

	var current_step: String = ""
	var step_color: Color = Color.WHITE
	var pitch: float = 1.0

	if countdown_timer > 2.0:
		current_step = "3"
		step_color = Color(1.0, 0.25, 0.2)
		pitch = 0.95
	elif countdown_timer > 1.0:
		current_step = "2"
		step_color = Color(1.0, 0.7, 0.2)
		pitch = 1.05
	elif countdown_timer > 0.0:
		current_step = "1"
		step_color = Color(1.0, 0.95, 0.2)
		pitch = 1.2
	elif countdown_timer > -0.6:
		current_step = "GO!"
		step_color = Color(0.2, 1.0, 0.4)
		pitch = 1.0
	else:
		countdown_label.visible = false
		return

	if current_step != last_countdown_step:
		last_countdown_step = current_step
		countdown_label.visible = true
		countdown_label.text = current_step
		countdown_label.modulate = step_color
		countdown_label.pivot_offset = countdown_label.size * 0.5
		
		# Animate punch scale
		var tw = create_tween()
		if current_step == "GO!":
			countdown_label.scale = Vector2(1.8, 1.8)
			tw.tween_property(countdown_label, "scale", Vector2(1.0, 1.0), 0.35).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
			if has_node("/root/AudioManager"):
				get_node("/root/AudioManager").play_sfx("countdown_go")
		else:
			countdown_label.scale = Vector2(1.5, 1.5)
			tw.tween_property(countdown_label, "scale", Vector2(1.0, 1.0), 0.25).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
			if has_node("/root/AudioManager"):
				get_node("/root/AudioManager").play_sfx("countdown_tick", pitch)

func _on_control_point_activated(point_title: String) -> void:
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active:
		return
		
	activated_count += 1
	var p1_is_runner: bool = (p1 and p1.current_role == PlayerController.Role.RUNNER)
	if p1_is_runner:
		p1_terminals_hacked += 1
	else:
		p2_terminals_hacked += 1

	_update_objective_hud()
	
	if activated_count >= total_objectives:
		if exit_zone:
			exit_zone.unlock_exit()
		_show_notification("EXIT UNLOCKED — REACH THE EXTRACTION GATE!")
	else:
		_show_notification("Control Point Activated! [%s]" % point_title)

func _on_runner_reached_exit() -> void:
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active:
		return
		
	_end_round(RoundState.RUNNER_WON)

func _end_round(winner: RoundState) -> void:
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active or is_match_over:
		return
		
	round_state = winner
	
	# Freeze both players
	if p1:
		p1.freeze()
	if p2:
		p2.freeze()
		
	# Lock objective terminals
	if control_points_root:
		for child in control_points_root.get_children():
			if child is ControlPoint:
				child.set_interaction_locked(true)

	# Determine round winner and update score
	var p1_is_runner: bool = (p1 and p1.current_role == PlayerController.Role.RUNNER)
	var round_winner_name: String = ""
	
	if winner == RoundState.RUNNER_WON:
		if p1_is_runner:
			p1_score += 1
			round_winner_name = "PLAYER 1 (RUNNER)"
		else:
			p2_score += 1
			round_winner_name = "PLAYER 2 (RUNNER)"
	else: # SABOTEUR_WON
		if p1_is_runner:
			p2_score += 1 # P2 was Saboteur
			round_winner_name = "PLAYER 2 (SABOTEUR)"
		else:
			p1_score += 1 # P1 was Saboteur
			round_winner_name = "PLAYER 1 (SABOTEUR)"

	_update_hud_all()

	# Audio feedback for round outcome
	if has_node("/root/AudioManager"):
		if winner == RoundState.RUNNER_WON:
			get_node("/root/AudioManager").play_sfx("round_win")
		else:
			get_node("/root/AudioManager").play_sfx("round_loss")

	# Show Round End Overlay and start 3s intermission transition
	if current_round < MAX_ROUNDS:
		is_transition_active = true
		transition_timer = TRANSITION_TIME
		if round_end_overlay and round_end_title and round_end_winner and round_end_score:
			round_end_overlay.visible = true
			round_end_title.text = "ROUND %d COMPLETE" % current_round
			round_end_winner.text = "%s WINS THE ROUND!" % round_winner_name
			round_end_score.text = "SCORE: PLAYER 1: %d  |  PLAYER 2: %d" % [p1_score, p2_score]
			_show_notification("%s WINS ROUND %d!" % [round_winner_name, current_round])
			
			# Winner announcement animation
			var panel = round_end_overlay.get_node_or_null("PanelContainer") as Control
			if panel:
				panel.pivot_offset = panel.size * 0.5
				panel.scale = Vector2(0.8, 0.8)
				var tw = create_tween()
				tw.tween_property(panel, "scale", Vector2(1.0, 1.0), 0.35).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	else:
		# Match complete after Round 3!
		_show_final_match_results()

func _show_final_match_results() -> void:
	is_match_over = true
	is_transition_active = false
	if round_end_overlay:
		round_end_overlay.visible = false
		
	if match_results_overlay and match_winner_label and match_score_label:
		match_results_overlay.visible = true
		if p1_score > p2_score:
			match_winner_label.text = "PLAYER 1 WINS THE MATCH!"
			match_winner_label.modulate = Color(0.12, 0.72, 1.0)
		elif p2_score > p1_score:
			match_winner_label.text = "PLAYER 2 WINS THE MATCH!"
			match_winner_label.modulate = Color(1.0, 0.28, 0.15)
		else:
			match_winner_label.text = "MATCH DRAW!"
			match_winner_label.modulate = Color(1.0, 0.85, 0.2)
			
		match_score_label.text = "FINAL SCORE: PLAYER 1: %d  |  PLAYER 2: %d\n\n[ COMBAT TELEMETRY ]\nPlayer 1: %d Nodes Overridden • %d Traps Deployed • %d Surges Used\nPlayer 2: %d Nodes Overridden • %d Traps Deployed • %d Surges Used" % [
			p1_score, p2_score,
			p1_terminals_hacked, p1_traps_deployed, p1_pulses_used,
			p2_terminals_hacked, p2_traps_deployed, p2_pulses_used
		]
		_show_notification("MATCH OVER! FINAL SCORE: %d - %d" % [p1_score, p2_score])

		if has_node("/root/AudioManager"):
			get_node("/root/AudioManager").play_sfx("round_win")

		var panel = match_results_overlay.get_node_or_null("PanelContainer") as Control
		if panel:
			panel.pivot_offset = panel.size * 0.5
			panel.scale = Vector2(0.85, 0.85)
			var tw = create_tween()
			tw.tween_property(panel, "scale", Vector2(1.0, 1.0), 0.4).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)

func _on_play_again_pressed() -> void:
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("menu_click")
	p1_score = 0
	p2_score = 0
	p1_terminals_hacked = 0
	p2_terminals_hacked = 0
	p1_traps_deployed = 0
	p2_traps_deployed = 0
	p1_traps_hit = 0
	p2_traps_hit = 0
	p1_pulses_used = 0
	p2_pulses_used = 0
	is_match_over = false
	_start_round(1)

func _reset_positions() -> void:
	if not is_match_over:
		_start_round(current_round)
	else:
		_on_play_again_pressed()

func _update_objective_hud() -> void:
	if objective_label:
		objective_label.text = "Objectives: %d/%d" % [activated_count, total_objectives]
		if activated_count >= total_objectives:
			objective_label.modulate = Color(0.2, 1.0, 0.5)
		else:
			objective_label.modulate = Color(0.15, 0.85, 1.0)

func _update_timer_hud() -> void:
	if not timer_label:
		return
		
	var mins = int(time_remaining) / 60
	var secs = int(time_remaining) % 60
	timer_label.text = "TIME: %02d:%02d" % [mins, secs]
	
	if time_remaining <= 20.0:
		timer_label.modulate = Color(1.0, 0.2, 0.2)
	elif time_remaining <= 45.0:
		timer_label.modulate = Color(1.0, 0.85, 0.2)
	else:
		timer_label.modulate = Color(1.0, 1.0, 1.0)

func _show_notification(text: String) -> void:
	if notification_label:
		notification_label.text = text
		notification_label.visible = true
		notification_timer = 3.5

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("game_pause") or (event is InputEventKey and event.pressed and not event.echo and event.physical_keycode == KEY_ESCAPE):
		if pause_overlay and pause_overlay.visible:
			toggle_pause(false)
		elif not is_match_over:
			toggle_pause(true)
		get_viewport().set_input_as_handled()
		return

	if get_tree().paused:
		return

	if event is InputEventKey and event.pressed and not event.echo and event.physical_keycode == KEY_M:
		_on_change_arena_pressed()
		return

	if event.is_action_pressed("game_restart"):
		# Restart current round without resetting match score
		if not is_match_over:
			_start_round(current_round)
		else:
			_on_play_again_pressed()
		return

	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active or is_match_over:
		return

	# Determine which player is the Saboteur
	var p1_is_saboteur = (p1 and p1.current_role == PlayerController.Role.SABOTEUR)
	var saboteur_action = "p1_interact" if p1_is_saboteur else "p2_action"
	var runner_pulse_action = "p2_pulse" if p1_is_saboteur else "p1_pulse"
	var runner_action = "p1_interact" if (not p1_is_saboteur) else "p2_action"
	
	# Saboteur Ability Trigger
	if event.is_action_pressed(saboteur_action):
		_trigger_saboteur_ability()
		return

	# Dedicated Runner Pulse/Surge Trigger
	if event.is_action_pressed(runner_pulse_action):
		_trigger_runner_ability()
		return

	# Keyboard fallbacks for Runner Pulse/Surge
	if event is InputEventKey and event.pressed and not event.echo:
		if (not p1_is_saboteur) and event.physical_keycode == KEY_Q:
			_trigger_runner_ability()
			return
		elif p1_is_saboteur and (event.physical_keycode in [KEY_SHIFT, KEY_ENTER, KEY_KP_ENTER, KEY_SLASH]):
			_trigger_runner_ability()
			return

	# Ergonomic Dual-Binding: If Runner presses action button while NOT in range of an active terminal
	if event.is_action_pressed(runner_action):
		var runner_near_point: bool = false
		if control_points_root:
			for child in control_points_root.get_children():
				if child is ControlPoint and child.runner_in_range and not child.is_activated:
					runner_near_point = true
					break
		if not runner_near_point:
			_trigger_runner_ability()

func _trigger_saboteur_ability() -> void:
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active or is_match_over:
		return

	if ability_cooldown > 0.0:
		return

	var saboteur_player: PlayerController = null
	var runner_player: PlayerController = null
	if p1 and p1.current_role == PlayerController.Role.SABOTEUR:
		saboteur_player = p1
		runner_player = p2
	elif p2 and p2.current_role == PlayerController.Role.SABOTEUR:
		saboteur_player = p2
		runner_player = p1

	if not saboteur_player or not runner_player:
		return

	# Spawn Spatial Disruption Hazard trap at runner location
	var spawn_pos = Vector3(runner_player.global_position.x, 0.0, runner_player.global_position.z)
	var hazard = HAZARD_SCENE.instantiate() as HazardZone
	add_child(hazard)
	hazard.global_position = spawn_pos
	active_hazard_instance = hazard

	# Scramble nearby terminals if within 8.5m
	var scrambled_any: bool = false
	if control_points_root:
		for child in control_points_root.get_children():
			if child is ControlPoint and not child.is_activated:
				var dist = saboteur_player.global_position.distance_to(child.global_position)
				if dist <= 8.5:
					child.scramble(3.5)
					scrambled_any = true
					_show_notification("⚡ SABOTEUR SCRAMBLED %s! OVERRIDE LOCKED (3.5s)! ⚡" % child.point_title)

	if saboteur_player == p1:
		p1_traps_deployed += 1
	else:
		p2_traps_deployed += 1

	ability_cooldown = COOLDOWN_DURATION
	_update_ability_hud()

	if not scrambled_any:
		_show_notification("⚠ WARNING: Saboteur Initiated Area Override! ⚠")

	_on_saboteur_ability_activated(saboteur_player, runner_player)

func _trigger_runner_ability() -> void:
	if round_state != RoundState.ACTIVE or is_countdown_active or is_transition_active or is_match_over:
		return

	if runner_cooldown > 0.0:
		return

	var runner_player: PlayerController = null
	var saboteur_player: PlayerController = null
	if p1 and p1.current_role == PlayerController.Role.RUNNER:
		runner_player = p1
		saboteur_player = p2
	elif p2 and p2.current_role == PlayerController.Role.RUNNER:
		runner_player = p2
		saboteur_player = p1

	if not runner_player:
		return

	# Apply Mobility Surge speed boost (1.35x speed for 1.4s)
	runner_player.apply_mobility_surge(RUNNER_SURGE_DURATION, 1.35)
	runner_cooldown = RUNNER_COOLDOWN_DURATION

	if runner_player == p1:
		p1_pulses_used += 1
	else:
		p2_pulses_used += 1

	# Play pulse sound
	if has_node("/root/AudioManager"):
		get_node("/root/AudioManager").play_sfx("runner_pulse")

	# Spawn visual Sonar Wave shockwave in the arena
	_spawn_sonar_wave(runner_player.global_position)

	# Radar scan: Find closest unactivated terminal
	var nearest_point: ControlPoint = null
	var min_dist: float = 9999.0
	if control_points_root:
		for child in control_points_root.get_children():
			if child is ControlPoint and not child.is_activated:
				var dist = runner_player.global_position.distance_to(child.global_position)
				if dist < min_dist:
					min_dist = dist
					nearest_point = child

	# Radar scan: Detect active hazards within 14m
	var hazard_in_range: bool = false
	var hazard_dist: float = 9999.0
	for child in get_children():
		if child is HazardZone and child.current_state == HazardZone.State.ACTIVE:
			var d = runner_player.global_position.distance_to(child.global_position)
			if d <= 14.0:
				hazard_in_range = true
				hazard_dist = minf(hazard_dist, d)

	if hazard_in_range:
		_show_notification("⚡ [TACTICAL ALERT] ACTIVE HAZARD DETECTED WITHIN %.1fm! EVADE! ⚡" % hazard_dist)
	elif nearest_point:
		_show_notification("📡 [SONAR SCAN] TARGET LOCK: %s (%.1fm) 📡" % [nearest_point.point_title, min_dist])
	else:
		_show_notification("📡 [SONAR SCAN] ALL OBJECTIVES CLEAR — EXTRACTION GATE READY! 📡")

	_update_ability_hud()
	_on_runner_ability_activated(runner_player, saboteur_player)

func _spawn_sonar_wave(pos: Vector3) -> void:
	var wave_root = Node3D.new()
	add_child(wave_root)
	wave_root.global_position = Vector3(pos.x, 0.15, pos.z)
	
	var mi = MeshInstance3D.new()
	var ring = TorusMesh.new()
	ring.inner_radius = 0.85
	ring.outer_radius = 1.0
	ring.rings = 32
	ring.ring_segments = 16
	mi.mesh = ring
	
	var mat = StandardMaterial3D.new()
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.albedo_color = Color(0.12, 0.95, 1.0, 0.8)
	mat.emission_enabled = true
	mat.emission = Color(0.12, 0.95, 1.0)
	mat.emission_energy_multiplier = 4.0
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mi.material_override = mat
	
	wave_root.add_child(mi)
	wave_root.scale = Vector3(0.5, 1.0, 0.5)
	
	var tw = create_tween().set_parallel(true)
	tw.tween_property(wave_root, "scale", Vector3(14.0, 1.0, 14.0), 0.65).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)
	tw.tween_property(mat, "albedo_color:a", 0.0, 0.65).set_ease(Tween.EASE_IN)
	tw.chain().tween_callback(wave_root.queue_free)

func _update_ability_hud() -> void:
	var p1_is_saboteur = (p1 and p1.current_role == PlayerController.Role.SABOTEUR)
	var saboteur_status = p1_ability_status if p1_is_saboteur else p2_ability_status
	var saboteur_bar = p1_cooldown_bar if p1_is_saboteur else p2_cooldown_bar
	var runner_status = p2_ability_status if p1_is_saboteur else p1_ability_status
	var runner_bar = p2_cooldown_bar if p1_is_saboteur else p1_cooldown_bar

	# 1. Update Saboteur Ability HUD
	if saboteur_status and saboteur_bar:
		var key_prompt = "[E]" if p1_is_saboteur else "[SPACE]"
		if ability_cooldown <= 0.0:
			saboteur_status.text = "Trap %s: READY" % key_prompt
			saboteur_status.modulate = Color(0.2, 1.0, 0.5)
			saboteur_bar.value = 100.0
		else:
			var elapsed = COOLDOWN_DURATION - ability_cooldown
			if elapsed < WARNING_DURATION:
				saboteur_status.text = "Trap: CHARGING HAZARD (%.1fs)" % (WARNING_DURATION - elapsed)
				saboteur_status.modulate = Color(1.0, 0.85, 0.2)
			elif elapsed < (WARNING_DURATION + ACTIVE_DURATION):
				saboteur_status.text = "Trap: OVERRIDE ACTIVE! (%.1fs)" % ((WARNING_DURATION + ACTIVE_DURATION) - elapsed)
				saboteur_status.modulate = Color(1.0, 0.2, 0.2)
			else:
				saboteur_status.text = "Trap Cooldown: %.1fs" % ability_cooldown
				saboteur_status.modulate = Color(0.8, 0.8, 0.8, 0.7)
			saboteur_bar.value = ((COOLDOWN_DURATION - ability_cooldown) / COOLDOWN_DURATION) * 100.0

	# 2. Update Runner Ability HUD
	if runner_status and runner_bar:
		var runner_key = "[Q]" if not p1_is_saboteur else "[SHIFT]"
		if runner_cooldown <= 0.0:
			runner_status.text = "Surge & Pulse %s: READY" % runner_key
			runner_status.modulate = Color(0.15, 0.9, 1.0)
			runner_bar.value = 100.0
		else:
			var elapsed_r = RUNNER_COOLDOWN_DURATION - runner_cooldown
			if elapsed_r < RUNNER_SURGE_DURATION:
				runner_status.text = "SURGE ACTIVE! (%.1fs)" % (RUNNER_SURGE_DURATION - elapsed_r)
				runner_status.modulate = Color(0.2, 1.0, 0.8)
			else:
				runner_status.text = "Surge Cooldown: %.1fs" % runner_cooldown
				runner_status.modulate = Color(0.8, 0.8, 0.8, 0.7)
			runner_bar.value = ((RUNNER_COOLDOWN_DURATION - runner_cooldown) / RUNNER_COOLDOWN_DURATION) * 100.0

# Virtual hooks for arena-specific hazard behavior
func _setup_arena_hazards() -> void:
	pass

func _process_arena_hazards(_delta: float) -> void:
	pass

func _reset_arena_hazards() -> void:
	pass

func _on_saboteur_ability_activated(_saboteur: PlayerController, _runner: PlayerController) -> void:
	pass

func _on_runner_ability_activated(_runner: PlayerController, _saboteur: PlayerController) -> void:
	pass
