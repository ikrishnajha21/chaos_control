extends Node

# Audio Assets
var sfx_streams: Dictionary = {}
var menu_music_stream: AudioStream = preload("res://audio/music/core_breach_menu_theme.wav")
var gameplay_music_stream: AudioStream = preload("res://audio/music/music_cyber_loop.wav")

var music_player: AudioStreamPlayer
var sfx_players: Array[AudioStreamPlayer] = []
var max_sfx_players: int = 8
var current_sfx_idx: int = 0

var music_volume_linear: float = 0.85
var sfx_volume_linear: float = 0.85
var music_fade_tween: Tween = null
var is_menu_music_active: bool = false

func _init() -> void:
	_setup_buses()

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	_setup_buses()
	_populate_sfx_dictionary()
	_create_players()
	play_menu_music(1.2)

func _setup_buses() -> void:
	# Ensure Music bus exists and routes to Master
	var music_idx = AudioServer.get_bus_index("Music")
	if music_idx == -1:
		AudioServer.add_bus(-1)
		music_idx = AudioServer.bus_count - 1
		AudioServer.set_bus_name(music_idx, "Music")
		AudioServer.set_bus_send(music_idx, "Master")

	# Ensure SFX bus exists and routes to Master
	var sfx_idx = AudioServer.get_bus_index("SFX")
	if sfx_idx == -1:
		AudioServer.add_bus(-1)
		sfx_idx = AudioServer.bus_count - 1
		AudioServer.set_bus_name(sfx_idx, "SFX")
		AudioServer.set_bus_send(sfx_idx, "Master")

	# Ensure Master bus is unmuted
	var master_idx = AudioServer.get_bus_index("Master")
	if master_idx != -1:
		AudioServer.set_bus_mute(master_idx, false)

	set_music_volume(music_volume_linear)
	set_sfx_volume(sfx_volume_linear)

func _populate_sfx_dictionary() -> void:
	sfx_streams = {
		"menu_click": preload("res://audio/sfx/menu_click.wav"),
		"objective_activate": preload("res://audio/sfx/objective_activate.wav"),
		"sabotage_warning": preload("res://audio/sfx/sabotage_warning.wav"),
		"sabotage_activate": preload("res://audio/sfx/sabotage_activate.wav"),
		"countdown_tick": preload("res://audio/sfx/countdown_tick.wav"),
		"countdown_go": preload("res://audio/sfx/countdown_go.wav"),
		"exit_unlocked": preload("res://audio/sfx/exit_unlocked.wav"),
		"round_win": preload("res://audio/sfx/round_win.wav"),
		"round_loss": preload("res://audio/sfx/round_loss.wav")
	}
	if ResourceLoader.exists("res://audio/sfx/runner_surge.wav"):
		sfx_streams["runner_surge"] = load("res://audio/sfx/runner_surge.wav")
	if ResourceLoader.exists("res://audio/sfx/runner_pulse.wav"):
		sfx_streams["runner_pulse"] = load("res://audio/sfx/runner_pulse.wav")
	if ResourceLoader.exists("res://audio/sfx/terminal_scramble.wav"):
		sfx_streams["terminal_scramble"] = load("res://audio/sfx/terminal_scramble.wav")
	if ResourceLoader.exists("res://audio/sfx/arena_shift.wav"):
		sfx_streams["arena_shift"] = load("res://audio/sfx/arena_shift.wav")
	if ResourceLoader.exists("res://audio/sfx/coin_pickup.wav"):
		sfx_streams["coin_pickup"] = load("res://audio/sfx/coin_pickup.wav")

func _configure_stream_loop(stream: AudioStream) -> void:
	if stream is AudioStreamWAV:
		var wav = stream as AudioStreamWAV
		wav.loop_mode = AudioStreamWAV.LOOP_FORWARD
		wav.loop_begin = 0
		var total_samples = int(wav.get_length() * wav.mix_rate)
		if total_samples > 0:
			wav.loop_end = total_samples

func _create_players() -> void:
	# Single dedicated Music player
	if not music_player:
		music_player = AudioStreamPlayer.new()
		music_player.name = "MusicPlayer"
		music_player.bus = "Music"
		_configure_stream_loop(menu_music_stream)
		music_player.stream = menu_music_stream
		music_player.finished.connect(_on_music_player_finished)
		add_child(music_player)

	# SFX player pool
	if sfx_players.is_empty():
		for i in range(max_sfx_players):
			var p = AudioStreamPlayer.new()
			p.name = "SFXPlayer_%d" % i
			p.bus = "SFX"
			add_child(p)
			sfx_players.append(p)

func _on_music_player_finished() -> void:
	# Fallback safety restart if a loop boundary ever signals completion
	if is_menu_music_active and music_player:
		music_player.play()

func play_sfx(sfx_name: String, pitch_scale: float = 1.0) -> void:
	if not sfx_streams.has(sfx_name):
		return
	
	var stream = sfx_streams[sfx_name]
	var player = sfx_players[current_sfx_idx]
	current_sfx_idx = (current_sfx_idx + 1) % max_sfx_players

	player.stop()
	player.stream = stream
	player.pitch_scale = pitch_scale
	player.play()

func play_menu_music(fade_in_duration: float = 1.2) -> void:
	if not music_player:
		return

	is_menu_music_active = true

	if music_player.stream != menu_music_stream:
		music_player.stream = menu_music_stream

	_configure_stream_loop(menu_music_stream)

	# If already playing and healthy, do not abruptly reset volume
	if music_player.playing:
		if music_fade_tween and music_fade_tween.is_valid():
			return # Fade-in is already gracefully running
		if music_player.volume_db >= -4.0:
			return # Already audible and playing at full volume
		# If playing at low volume, smoothly ramp up
		var cur_db = music_player.volume_db
		music_fade_tween = create_tween()
		music_fade_tween.tween_property(music_player, "volume_db", 0.0, fade_in_duration).from(cur_db).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
		return

	# Start playback from low volume and fade in smoothly
	music_player.volume_db = -50.0
	music_player.play()

	if music_fade_tween and music_fade_tween.is_valid():
		music_fade_tween.kill()

	music_fade_tween = create_tween()
	music_fade_tween.tween_property(music_player, "volume_db", 0.0, fade_in_duration).from(-50.0).set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)

func fade_out_menu_music(fade_out_duration: float = 1.0) -> void:
	is_menu_music_active = false
	if not music_player or not music_player.playing:
		return

	if music_fade_tween and music_fade_tween.is_valid():
		music_fade_tween.kill()

	music_fade_tween = create_tween()
	music_fade_tween.tween_property(music_player, "volume_db", -60.0, fade_out_duration).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	music_fade_tween.tween_callback(func():
		if music_player and not is_menu_music_active:
			music_player.stop()
	)

func play_music() -> void:
	play_menu_music(1.0)

func stop_music() -> void:
	fade_out_menu_music(0.6)

func set_music_volume(linear_val: float) -> void:
	music_volume_linear = clampf(linear_val, 0.0, 1.0)
	var bus_idx = AudioServer.get_bus_index("Music")
	if bus_idx != -1:
		if music_volume_linear <= 0.001:
			AudioServer.set_bus_mute(bus_idx, true)
		else:
			AudioServer.set_bus_mute(bus_idx, false)
			AudioServer.set_bus_volume_db(bus_idx, linear_to_db(music_volume_linear))

func set_sfx_volume(linear_val: float) -> void:
	sfx_volume_linear = clampf(linear_val, 0.0, 1.0)
	var bus_idx = AudioServer.get_bus_index("SFX")
	if bus_idx != -1:
		if sfx_volume_linear <= 0.001:
			AudioServer.set_bus_mute(bus_idx, true)
		else:
			AudioServer.set_bus_mute(bus_idx, false)
			AudioServer.set_bus_volume_db(bus_idx, linear_to_db(sfx_volume_linear))

func get_music_volume() -> float:
	return music_volume_linear

func get_sfx_volume() -> float:
	return sfx_volume_linear
