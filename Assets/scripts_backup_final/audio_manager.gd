extends Node

# Audio Assets
var sfx_streams: Dictionary = {}
var music_stream: AudioStream = preload("res://audio/music/music_cyber_loop.wav")

var music_player: AudioStreamPlayer
var sfx_players: Array[AudioStreamPlayer] = []
var max_sfx_players: int = 8
var current_sfx_idx: int = 0

var music_volume_linear: float = 0.75
var sfx_volume_linear: float = 0.85

func _init() -> void:
	_setup_buses()

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	_setup_buses()
	_populate_sfx_dictionary()
	_create_players()
	play_music()

func _setup_buses() -> void:
	# Ensure Music bus exists
	if AudioServer.get_bus_index("Music") == -1:
		AudioServer.add_bus(-1)
		var music_idx = AudioServer.bus_count - 1
		AudioServer.set_bus_name(music_idx, "Music")
		AudioServer.set_bus_send(music_idx, "Master")

	# Ensure SFX bus exists
	if AudioServer.get_bus_index("SFX") == -1:
		AudioServer.add_bus(-1)
		var sfx_idx = AudioServer.bus_count - 1
		AudioServer.set_bus_name(sfx_idx, "SFX")
		AudioServer.set_bus_send(sfx_idx, "Master")

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
	# Add runner and tactical sfx if available
	if ResourceLoader.exists("res://audio/sfx/runner_surge.wav"):
		sfx_streams["runner_surge"] = load("res://audio/sfx/runner_surge.wav")
	if ResourceLoader.exists("res://audio/sfx/runner_pulse.wav"):
		sfx_streams["runner_pulse"] = load("res://audio/sfx/runner_pulse.wav")
	if ResourceLoader.exists("res://audio/sfx/terminal_scramble.wav"):
		sfx_streams["terminal_scramble"] = load("res://audio/sfx/terminal_scramble.wav")

func _create_players() -> void:
	# Music player
	music_player = AudioStreamPlayer.new()
	music_player.name = "MusicPlayer"
	music_player.bus = "Music"
	if music_stream is AudioStreamWAV:
		var wav = music_stream as AudioStreamWAV
		wav.loop_mode = AudioStreamWAV.LOOP_FORWARD
	music_player.stream = music_stream
	add_child(music_player)

	# SFX player pool
	for i in range(max_sfx_players):
		var p = AudioStreamPlayer.new()
		p.name = "SFXPlayer_%d" % i
		p.bus = "SFX"
		add_child(p)
		sfx_players.append(p)

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

func play_music() -> void:
	if music_player and not music_player.playing:
		music_player.play()

func stop_music() -> void:
	if music_player:
		music_player.stop()

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
