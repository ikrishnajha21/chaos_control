extends SceneTree

# Comprehensive Test Suite for Loading Screen, Lethal Lasers & Judge Feedback
# Tests all requirements across Phase 1 - 9

const LoadingScreenScript = preload("res://scripts/loading_screen.gd")

var test_step: int = 0
var timer: float = 0.0
var test_arena: Node = null
var current_test_name: String = ""

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] LOADING SCREEN, LETHAL LASERS & JUDGE FEEDBACK <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	
	match test_step:
		0:
			# --- PHASE 2 TEST: Cinematic Loading Screen Scene & Components ---
			print(">>> Phase 1: Testing Cinematic Loading Screen Scene & Node Hierarchy...")
			var loading_scene = load("res://scenes/loading_screen.tscn")
			assert(loading_scene != null, "loading_screen.tscn must load successfully")
			var ls = loading_scene.instantiate()
			assert(ls != null, "LoadingScreen instance must be valid")
			root.add_child(ls)
			
			assert(ls.destination_label != null, "DestinationLabel must exist")
			assert(ls.status_label != null, "StatusLabel must exist")
			assert(ls.progress_bar != null, "ProgressBar must exist")
			assert(ls.percentage_label != null, "PercentageLabel must exist")
			assert(ls.sweep_highlight != null, "SweepHighlight must exist")
			assert(ls.error_box != null, "ErrorBox must exist")
			assert(ls.btn_retry != null, "RetryButton must exist")
			assert(ls.btn_back != null, "BackButton must exist")
			
			# Verify destination deducing logic for all 3 arenas
			assert(LoadingScreenScript._deduce_arena_name("res://scenes/arenas/TrainingFacility.tscn") == "RESEARCH FACILITY", "Must deduce Research Facility")
			assert(LoadingScreenScript._deduce_arena_name("res://scenes/arenas/GravityCore.tscn") == "POWER CORE", "Must deduce Power Core")
			assert(LoadingScreenScript._deduce_arena_name("res://scenes/arenas/NeonReactor.tscn") == "UNDERGROUND COMPLEX", "Must deduce Underground Complex")
			
			# Verify dynamic contextual progress status update
			ls._update_progress_display(0.1)
			assert("INITIALIZING" in ls.status_label.text, "0.1 progress must show INITIALIZING")
			ls._update_progress_display(0.4)
			assert("LOADING" in ls.status_label.text, "0.4 progress must show LOADING")
			ls._update_progress_display(0.7)
			assert("SYNCHRONIZING" in ls.status_label.text, "0.7 progress must show SYNCHRONIZING")
			ls._update_progress_display(0.9)
			assert("PREPARING" in ls.status_label.text, "0.9 progress must show PREPARING")
			ls._update_progress_display(1.0)
			assert("FINALIZING" in ls.status_label.text, "1.0 progress must show FINALIZING")
			
			ls.queue_free()
			print("  • Cinematic loading screen hierarchy, styles, progress bar, and status labels verified")
			test_step = 1
			timer = 0.0

		1:
			# --- PHASE 3A TEST: Research Facility Lethal Lasers ---
			print(">>> Phase 2: Auditing & Testing Lasers in Arena 1 (Research Facility)...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(fac_scene != null, "TrainingFacility.tscn must load")
			test_arena = fac_scene.instantiate()
			root.add_child(test_arena)
			test_arena._process_countdown(3.5)
			
			var env = test_arena.get_node("Environment")
			assert(env.laser_barrier_data.size() == 5, "Research Facility must have 5 laser barriers")
			
			var p1 = test_arena.p1 as PlayerController
			var initial_deaths = p1.deaths
			p1.set_checkpoint(Vector3(-10, 0.5, 5))
			p1.global_position = Vector3(0, 0.5, 0)
			
			# Check Area3D collision layer and mask
			for d in env.laser_barrier_data:
				var area: Area3D = d["area"]
				assert(area.collision_mask & 2 != 0, "Laser Area3D must have mask bit 2 for PlayerController")
				
			# Test active laser elimination
			env._set_lasers_state(0, 5.0) # 0 is ACTIVE
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by active laser")
			assert(p1.deaths == initial_deaths + 1, "Deaths must increment by 1")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Single-trigger guard must prevent duplicate elimination")
			
			# Disarmed laser must be safe
			p1.respawn_at_checkpoint()
			env._set_lasers_state(2, 5.0) # 2 is DISARMED
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == false, "Disarmed laser must not eliminate player")
			
			test_arena.queue_free()
			print("  • Research Facility (5 laser barriers) verified lethal and synchronized")
			test_step = 2
			timer = 0.0

		2:
			# --- PHASE 3B TEST: Power Core Lethal Lasers ---
			print(">>> Phase 3: Auditing & Testing Lasers in Arena 2 (Power Core)...")
			var pc_scene = load("res://scenes/arenas/GravityCore.tscn")
			assert(pc_scene != null, "GravityCore.tscn must load")
			test_arena = pc_scene.instantiate()
			root.add_child(test_arena)
			test_arena._process_countdown(3.5)
			
			var env = test_arena.get_node("Environment")
			assert(env.laser_barrier_data.size() == 6, "Power Core must have 6 laser barriers")
			
			var p1 = test_arena.p1 as PlayerController
			var initial_deaths = p1.deaths
			p1.set_checkpoint(Vector3(-15, 0.5, 0))
			p1.global_position = Vector3(0, 0.5, 0)
			
			for d in env.laser_barrier_data:
				var area: Area3D = d["area"]
				assert(area.collision_mask & 2 != 0, "Laser Area3D must have mask bit 2 for PlayerController")
				
			# Test active laser elimination in Power Core
			env._set_lasers_state(0, 5.0) # ACTIVE
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by active Power Core laser")
			assert(p1.deaths == initial_deaths + 1, "Deaths must increment by 1")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Single-trigger guard must prevent duplicate elimination")
			
			# Disarmed laser safe test
			p1.respawn_at_checkpoint()
			env._set_lasers_state(2, 5.0) # DISARMED
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == false, "Disarmed laser must not eliminate player")
			
			test_arena.queue_free()
			print("  • Power Core (6 laser barriers) verified lethal and synchronized")
			test_step = 3
			timer = 0.0

		3:
			# --- PHASE 3C TEST: Underground Complex Lethal Lasers ---
			print(">>> Phase 4: Auditing & Testing Lasers in Arena 3 (Underground Complex)...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(uc_scene != null, "NeonReactor.tscn must load")
			test_arena = uc_scene.instantiate()
			root.add_child(test_arena)
			test_arena._process_countdown(3.5)
			
			var env = test_arena.get_node("Environment")
			assert(env.laser_barrier_data.size() == 5, "Underground Complex must have 5 laser barriers")
			
			var p1 = test_arena.p1 as PlayerController
			var initial_deaths = p1.deaths
			p1.set_checkpoint(Vector3(-10, 0.5, -5))
			p1.global_position = Vector3(0, 0.5, 0)
			
			for d in env.laser_barrier_data:
				var area: Area3D = d["area"]
				assert(area.collision_mask & 2 != 0, "Laser Area3D must have mask bit 2 for PlayerController")
				
			# Test active laser elimination in Underground Complex
			env._set_lasers_state(0, 5.0) # ACTIVE
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == true, "Player must be eliminated by active Underground Complex laser")
			assert(p1.deaths == initial_deaths + 1, "Deaths must increment by 1")
			
			# Single-trigger guard
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.deaths == initial_deaths + 1, "Single-trigger guard must prevent duplicate elimination")
			
			# Disarmed laser safe test
			p1.respawn_at_checkpoint()
			env._set_lasers_state(2, 5.0) # DISARMED
			env._on_laser_body_entered(p1, env.laser_barrier_data[0])
			assert(p1.is_eliminated == false, "Disarmed laser must not eliminate player")
			
			# Test Exit Zone locked laser barrier
			var exit_zone = test_arena.exit_zone as ExitZone
			assert(exit_zone != null, "ExitZone must exist")
			assert(exit_zone.is_unlocked == false, "ExitZone must start locked")
			exit_zone._on_body_entered(p1)
			assert(p1.is_eliminated == true, "Touching locked ExitZone laser barrier must eliminate player")
			
			test_arena.queue_free()
			print("  • Underground Complex (5 laser barriers + locked exit laser) verified lethal and synchronized")
			test_step = 4
			timer = 0.0

		4:
			# --- PHASE 4 TEST: Negative Character Readability (Crimson Wraith / Saboteur) ---
			print(">>> Phase 5: Verifying Negative Character Visibility & Scaling...")
			var player_scene = load("res://scenes/player.tscn")
			var player = player_scene.instantiate() as PlayerController
			root.add_child(player)
			
			# Switch to Saboteur (Crimson Wraith)
			player.set_role(PlayerController.Role.SABOTEUR)
			assert(player.crimson_wraith.visible == true, "Crimson Wraith must be visible for Saboteur")
			assert(player.cyan_phantom.visible == false, "Cyan Phantom must be hidden for Saboteur")
			
			# Verify Saboteur Visibility Enhancement Light
			var aura_light = player.get_node_or_null("SaboteurVisibilityLight") as OmniLight3D
			assert(aura_light != null, "SaboteurVisibilityLight must exist")
			assert(aura_light.visible == true, "Saboteur aura light must be visible")
			assert(aura_light.light_energy >= 1.5, "Saboteur aura light must have prominent energy for readability")
			assert(aura_light.light_color.r > 0.8 and aura_light.light_color.b < 0.3, "Aura light must be ember crimson")
			
			# Verify character model scale strictly preserved at 1.76x
			var cw_scale = player.crimson_wraith.scale
			assert(abs(cw_scale.x - 1.76) < 0.01, "Crimson Wraith scale must remain exact at 1.76x")
			assert(abs(cw_scale.y - 1.76) < 0.01, "Crimson Wraith scale must remain exact at 1.76x")
			assert(abs(cw_scale.z - 1.76) < 0.01, "Crimson Wraith scale must remain exact at 1.76x")
			
			# Switch to Runner and verify aura light is disabled
			player.set_role(PlayerController.Role.RUNNER)
			assert(aura_light.visible == false, "Saboteur aura light must be hidden when role is Runner")
			
			var cp_scale = player.cyan_phantom.scale
			assert(abs(cp_scale.x - 1.76) < 0.01, "Cyan Phantom scale must remain exact at 1.76x")
			
			player.queue_free()
			print("  • Saboteur visibility enhancement verified with 1.76x scale strictly preserved")
			test_step = 5
			timer = 0.0

		5:
			# --- PHASE 5 TEST: Positive Character Perks (Cyan Phantom / Runner) ---
			print(">>> Phase 6: Verifying Positive Character Perks & Balance...")
			var fac_scene = load("res://scenes/arenas/TrainingFacility.tscn")
			test_arena = fac_scene.instantiate()
			root.add_child(test_arena)
			test_arena._process_countdown(3.5)
			
			var runner = test_arena.p1 as PlayerController
			assert(runner.current_role == PlayerController.Role.RUNNER, "P1 must be Runner in Round 1")
			
			# Perk 1: Cybernetic Resilience (25% faster glitch recovery)
			runner.apply_hazard_effect(1.5, 0.25)
			assert(runner.is_glitched == true, "Runner must be glitched")
			assert(abs(runner.hazard_timer - 1.125) < 0.01, "Runner glitch duration must be reduced by 25% (1.125s vs 1.5s)")
			
			# Perk 2: Threat Awareness Proximity Sensor
			# Position runner near active laser (within 5.0m)
			var env = test_arena.get_node("Environment")
			env._set_lasers_state(0, 5.0) # ACTIVE
			var laser_pos = env.laser_barrier_data[0]["area"].global_position
			runner.global_position = laser_pos + Vector3(3.0, 0.5, 0.0)
			test_arena.threat_alert_cooldown = 0.0
			test_arena._process_runner_threat_awareness(0.016)
			assert("THREAT AWARENESS" in test_arena.notification_label.text or "ALERT" in test_arena.notification_label.text, "Threat awareness proximity sensor must notify player near active laser")
			
			# Perk 3: Mobility Surge
			runner.clear_hazard_effect()
			test_arena._trigger_runner_ability()
			assert(runner.is_surging == true, "Runner must be surging")
			assert(runner.surge_multiplier > 1.2, "Surge speed multiplier must be active")
			assert(test_arena.runner_cooldown > 0.0, "Runner surge cooldown must be active")
			
			test_arena.queue_free()
			print("  • Positive character perks (Cybernetic Resilience, Threat Sensor, Mobility Surge) verified")
			test_step = 6
			timer = 0.0

		6:
			print("===================================================================")
			print(">>> ALL LOADING, LASER & JUDGE FEEDBACK CHECKS PASSED! <<<")
			print("===================================================================\n")
			quit(0)
			return true
			
	return false
