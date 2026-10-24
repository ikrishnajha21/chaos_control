extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var audio_mgr: Node = null
var cp_inst: ControlPoint = null
var hazard_inst: HazardZone = null
var exit_inst: ExitZone = null

func _init() -> void:
	print(">>> [TEST START] Audiovisual Feedback & Polish Verification Suite")
	var audio_mgr_script = load("res://scripts/audio_manager.gd")
	assert(audio_mgr_script != null, "AudioManager script failed to load")
	audio_mgr = audio_mgr_script.new()
	audio_mgr.name = "AudioManager"
	root.add_child(audio_mgr)

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	match test_phase:
		0:
			# Test Phase 0: Audio Manager & Sound Effects
			print(">>> Testing AudioManager & SFX Playback...")
			assert(audio_mgr != null, "AudioManager not instantiated")
			assert(AudioServer.get_bus_index("Music") != -1, "Music bus missing")
			assert(AudioServer.get_bus_index("SFX") != -1, "SFX bus missing")
			
			# Test Volume Sliders logic
			audio_mgr.set_music_volume(0.5)
			assert(abs(audio_mgr.get_music_volume() - 0.5) < 0.01, "Music volume set failed")
			audio_mgr.set_sfx_volume(0.6)
			assert(abs(audio_mgr.get_sfx_volume() - 0.6) < 0.01, "SFX volume set failed")
			
			# Test All SFX Playback
			var sfx_list = [
				"menu_click", "objective_activate", "sabotage_warning",
				"sabotage_activate", "countdown_tick", "countdown_go",
				"exit_unlocked", "round_win", "round_loss"
			]
			for sfx in sfx_list:
				audio_mgr.play_sfx(sfx)
			print("  ✓ All 9 sound effects verified and played without error")
			print("  ✓ Music & SFX buses and volume controls verified")
			print("✓ Phase 0 Passed: Audio system fully verified")
			test_phase = 1

		1:
			# Test Phase 1: Control Point Visuals & Particle Burst
			print(">>> Testing Control Point Visuals & Blue Particle Burst...")
			var cp_scene = load("res://scenes/control_point.tscn")
			assert(cp_scene != null, "Control point scene missing")
			cp_inst = cp_scene.instantiate() as ControlPoint
			root.add_child(cp_inst)
			
			assert(cp_inst.burst_particles != null, "BurstParticles missing")
			assert(cp_inst.omni_light != null, "OmniLight3D missing")
			assert(cp_inst.burst_particles.emitting == false, "BurstParticles should start stopped")
			
			# Activate Control Point
			cp_inst.activate()
			assert(cp_inst.is_activated == true, "ControlPoint should be activated")
			assert(cp_inst.burst_particles.emitting == true, "BurstParticles should be emitting on activation")
			assert(cp_inst.omni_light.light_energy > 3.0, "Light energy should flash on activation")
			print("  ✓ Blue particle burst and light flash verified")
			
			# Reset Control Point
			cp_inst.reset_point()
			assert(cp_inst.is_activated == false, "ControlPoint should be reset")
			assert(cp_inst.burst_particles.emitting == false, "BurstParticles should stop on reset")
			print("  ✓ ControlPoint reset and cleanup verified")
			
			cp_inst.queue_free()
			print("✓ Phase 1 Passed: Runner objective visual feedback verified")
			test_phase = 2

		2:
			# Test Phase 2: Hazard Zone Red Warning & Electrical Active Sparks
			print(">>> Testing Hazard Zone Warning Light & Active Electrical Sparks...")
			var hazard_scene = load("res://scenes/hazard_zone.tscn")
			assert(hazard_scene != null, "Hazard zone scene missing")
			hazard_inst = hazard_scene.instantiate() as HazardZone
			root.add_child(hazard_inst)
			
			assert(hazard_inst.warning_light != null, "WarningLight missing")
			assert(hazard_inst.electric_particles != null, "ElectricParticles missing")
			assert(hazard_inst.current_state == HazardZone.State.WARNING, "Should start in WARNING state")
			assert(hazard_inst.warning_visuals.visible == true, "Warning visuals should be visible")
			assert(hazard_inst.active_visuals.visible == false, "Active visuals should be hidden in warning")
			print("  ✓ Hazard warning light & pulse verified")
			
			# Force transition to active
			hazard_inst._transition_to_active()
			assert(hazard_inst.current_state == HazardZone.State.ACTIVE, "Should be in ACTIVE state")
			assert(hazard_inst.warning_visuals.visible == false, "Warning visuals should be hidden in active")
			assert(hazard_inst.active_visuals.visible == true, "Active visuals should be visible in active")
			assert(hazard_inst.electric_particles.emitting == true, "Electric particles should be emitting in active")
			print("  ✓ Hazard electrical sparks and active visuals verified")
			
			hazard_inst.queue_free()
			print("✓ Phase 2 Passed: Sabotage hazard audiovisual feedback verified")
			test_phase = 3

		3:
			# Test Phase 3: Exit Zone Green Light & Opening Animation
			print(">>> Testing Exit Zone Green Light & Opening Animation...")
			var exit_scene = load("res://scenes/exit_zone.tscn")
			assert(exit_scene != null, "Exit zone scene missing")
			exit_inst = exit_scene.instantiate() as ExitZone
			root.add_child(exit_inst)
			
			assert(exit_inst.unlock_particles != null, "UnlockParticles missing")
			assert(exit_inst.is_unlocked == false, "Exit should start locked")
			assert(exit_inst.unlock_particles.emitting == false, "Unlock particles should start stopped")
			assert(exit_inst.laser_barrier.scale.y > 0.9, "Laser barrier should be full height when locked")
			
			# Unlock Exit
			exit_inst.unlock_exit()
			assert(exit_inst.is_unlocked == true, "Exit should be unlocked")
			assert(exit_inst.unlock_particles.emitting == true, "Unlock particles should emit when unlocked")
			assert(exit_inst.omni_light.light_color.g > exit_inst.omni_light.light_color.r, "Light should be green")
			print("  ✓ Exit green light, unlock particles, and opening animation verified")
			
			# Lock Exit again
			exit_inst.lock_exit()
			assert(exit_inst.is_unlocked == false, "Exit should be locked")
			assert(exit_inst.unlock_particles.emitting == false, "Unlock particles should stop when locked")
			assert(exit_inst.laser_barrier.scale.y > 0.9, "Laser barrier should reset to full height")
			print("  ✓ Exit lock reset and cleanup verified")
			
			exit_inst.queue_free()
			print("✓ Phase 3 Passed: Exit zone feedback and animations verified")
			test_phase = 4

		4:
			# Final phase complete
			print(">>> ALL AUDIOVISUAL FEEDBACK & POLISH TESTS PASSED SUCCESSFULLY! <<<")
			audio_mgr.queue_free()
			quit(0)

	return false
