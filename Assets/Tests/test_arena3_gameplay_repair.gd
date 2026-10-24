extends SceneTree

const CheckpointScript = preload("res://scripts/checkpoint.gd")
const ControlPointScript = preload("res://scripts/control_point.gd")

var test_step: int = 0
var timer: float = 0.0

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] ARENA 3 GAMEPLAY REPAIR & RIGOROUS VERIFICATION <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	timer += delta
	match test_step:
		0:
			# --- TEST 1: Checkpoint Count, Naming & Spatial Configuration ---
			print(">>> Test 1: Verifying Exact 3 Checkpoints & Spatial Layout...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(uc_scene != null, "NeonReactor.tscn must load")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			
			var cp_root = arena.get_node_or_null("Checkpoints")
			assert(cp_root != null, "Checkpoints container node must exist")
			assert(cp_root.get_child_count() == 3, "Arena 3 must have exactly THREE checkpoints")
			
			var cp1 = cp_root.get_node_or_null("Checkpoint_1") as CheckpointScript
			var cp2 = cp_root.get_node_or_null("Checkpoint_2") as CheckpointScript
			var cp3 = cp_root.get_node_or_null("Checkpoint_3") as CheckpointScript
			assert(cp1 != null and cp2 != null and cp3 != null, "All 3 checkpoints must exist as Checkpoint instances")
			
			# Verify coordinates match logical progression
			# CP1: Entry Waypoint near Runner Spawn (-30.8, -31.1)
			assert(cp1.position.distance_to(Vector3(-24, 0.1, -26)) < 1.0, "CP1 must be located at Entry Waypoint (-24, 0.1, -26)")
			assert("ENTRY" in cp1.checkpoint_title.to_upper(), "CP1 must be Entry Checkpoint")
			
			# CP2: Central concourse
			assert(cp2.position.distance_to(Vector3(1.2, 0.1, 8.0)) < 1.0, "CP2 must be located at Central Concourse (1.2, 0.1, 8)")
			assert("CENTRAL" in cp2.checkpoint_title.to_upper() or "BETA" in cp2.checkpoint_title.to_upper(), "CP2 must be Midpoint Checkpoint")
			
			# CP3: Approach corridor leading to Exit Gate (0, 0, -24)
			assert(cp3.position.distance_to(Vector3(0.0, 0.1, -12.0)) < 1.0, "CP3 must be located at Exit Approach (0, 0.1, -12)")
			assert("EXIT" in cp3.checkpoint_title.to_upper() or "APPROACH" in cp3.checkpoint_title.to_upper(), "CP3 must be Exit Approach Checkpoint")
			
			print("  • Exactly 3 Checkpoints verified: Entry (-24, -26), Midpoint (1.2, 8), Exit Approach (0, -12).")
			arena.queue_free()
			test_step = 1
			timer = 0.0

		1:
			# --- TEST 2: Checkpoint Activation, Safe Respawn & Saboteur Rejection ---
			print(">>> Test 2: Auditing Checkpoint Activation & Safe Respawn Recording...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var cp_root = arena.get_node("Checkpoints")
			var cp1 = cp_root.get_node("Checkpoint_1") as CheckpointScript
			var cp2 = cp_root.get_node("Checkpoint_2") as CheckpointScript
			
			var runner = arena.p1 as PlayerController
			var saboteur = arena.p2 as PlayerController
			runner.set_role(PlayerController.Role.RUNNER)
			saboteur.set_role(PlayerController.Role.SABOTEUR)
			
			# Saboteur entering does NOT activate checkpoint
			cp1._on_body_entered(saboteur)
			assert(cp1.is_activated == false, "Saboteur must NOT activate checkpoint")
			
			# Runner entering activates checkpoint
			cp1._on_body_entered(runner)
			assert(cp1.is_activated == true, "Runner MUST activate checkpoint")
			var expected_respawn = cp1.global_position + Vector3(0.0, 0.5, 0.0)
			assert(runner.last_checkpoint_position.distance_to(expected_respawn) < 0.1, "Runner safe respawn position must be recorded")
			
			# Eliminate runner and verify respawn at CP1
			runner.eliminate()
			assert(runner.is_eliminated == true, "Runner eliminated")
			runner.respawn_at_checkpoint()
			assert(runner.is_eliminated == false, "Runner uneliminated after respawn")
			assert(runner.global_position.distance_to(expected_respawn) < 0.1, "Runner must respawn safely at CP1")
			
			# Runner advances to CP2
			cp2._on_body_entered(runner)
			assert(cp2.is_activated == true, "CP2 activates on runner contact")
			var expected_respawn_2 = cp2.global_position + Vector3(0.0, 0.5, 0.0)
			assert(runner.last_checkpoint_position.distance_to(expected_respawn_2) < 0.1, "Runner safe respawn position must update to CP2")
			
			# Test round reset restores checkpoints
			arena._reset_round_state()
			assert(cp1.is_activated == false and cp2.is_activated == false, "Checkpoints must reset cleanly on round reset")
			
			print("  • Checkpoint activation, safe respawn recording, saboteur rejection, and round reset verified.")
			arena.queue_free()
			test_step = 2
			timer = 0.0

		2:
			# --- TEST 3: Control Point Taking, Progression & Anti-Duplication ---
			print(">>> Test 3: Auditing Control Point Capture, HUD Progression & Scoring...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var pt_alpha = arena.get_node("ControlPoints/PointAlpha") as ControlPoint
			var pt_beta = arena.get_node("ControlPoints/PointBeta") as ControlPoint
			var pt_gamma = arena.get_node("ControlPoints/PointGamma") as ControlPoint
			assert(pt_alpha != null and pt_beta != null and pt_gamma != null, "Control points Alpha, Beta, Gamma must exist")
			
			assert(arena.activated_count == 0, "Initial objective count must be 0")
			assert(arena.exit_zone.is_unlocked == false, "Exit must start locked")
			
			# Activate Point Alpha
			pt_alpha.activate()
			assert(pt_alpha.is_activated == true, "Point Alpha must be activated")
			assert(arena.activated_count == 1, "Objectives count must be 1 after Point Alpha")
			assert(arena.objective_label.text == "Objectives: 1/3", "HUD objective label must show 1/3")
			assert(arena.shield_west_lowered == true, "West blast shield must lower on Alpha capture")
			
			# Duplicate activation attempt must NOT increment score/count
			pt_alpha.activate()
			assert(arena.activated_count == 1, "Duplicate activation of Point Alpha must NOT increment count")
			
			# Activate Point Beta
			pt_beta.activate()
			assert(pt_beta.is_activated == true, "Point Beta must be activated")
			assert(arena.activated_count == 2, "Objectives count must be 2 after Point Beta")
			assert(arena.objective_label.text == "Objectives: 2/3", "HUD objective label must show 2/3")
			assert(arena.shield_east_lowered == true, "East blast shield must lower on Beta capture")
			assert(arena.exit_zone.is_unlocked == false, "Exit must remain locked at 2/3")
			assert(arena.round_state == Arena.RoundState.ACTIVE, "Round must NOT end prematurely")
			
			# Activate Point Gamma
			pt_gamma.activate()
			assert(pt_gamma.is_activated == true, "Point Gamma must be activated")
			assert(arena.activated_count == 3, "Objectives count must be 3 after Point Gamma")
			assert(arena.objective_label.text == "Objectives: 3/3", "HUD objective label must show 3/3")
			assert(arena.exit_zone.is_unlocked == true, "Exit Zone must unlock when all 3 points captured")
			assert(arena.round_state == Arena.RoundState.ACTIVE, "Round must NOT end until runner reaches exit")
			
			print("  • Control point captures, HUD (1/3 -> 2/3 -> 3/3), blast shield reconfigurations, duplicate prevention, and exit unlock verified.")
			arena.queue_free()
			test_step = 3
			timer = 0.0

		3:
			# --- TEST 4: Exit Gate Win Condition & Round Outcome ---
			print(">>> Test 4: Auditing Exit Gate Trigger & Round Win Progression...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			arena._process_countdown(3.5)
			
			var runner = arena.p1 as PlayerController
			runner.set_role(PlayerController.Role.RUNNER)
			var exit = arena.exit_zone
			
			# While locked, eliminates player
			assert(exit.is_unlocked == false, "Exit starts locked")
			exit._on_body_entered(runner)
			assert(runner.is_eliminated == true, "Touching locked exit eliminates runner")
			
			# Restore runner, unlock exit, and trigger win
			runner.respawn_at_checkpoint()
			exit.unlock_exit()
			assert(exit.is_unlocked == true, "Exit unlocked")
			
			exit._on_body_entered(runner)
			assert(arena.round_state == Arena.RoundState.RUNNER_WON, "Runner entering unlocked exit must award RUNNER_WON")
			assert(arena.p1_score == 1, "Player 1 score must increment to 1")
			
			print("  • Exit Gate locked elimination, unlock sequence, win condition trigger, and scoreboard update verified.")
			arena.queue_free()
			test_step = 4
			timer = 0.0

		4:
			# --- TEST 5: Gate Stability & Flickering Prevention ---
			print(">>> Test 5: Auditing Gate Geometry, Alignment & Stability...")
			var uc_scene = load("res://scenes/arenas/NeonReactor.tscn")
			var arena = uc_scene.instantiate() as Arena
			root.add_child(arena)
			
			var exit = arena.exit_zone
			assert(abs(exit.position.x) < 0.01 and abs(exit.position.z - (-24.0)) < 0.01, "Exit Zone strictly at (0, 0, -24)")
			
			# Laser barrier must NOT have rotating horizontal animation clipping through pillars
			exit.lock_exit()
			exit._process(0.016)
			assert(exit.laser_barrier.rotation == Vector3.ZERO, "Locked laser barrier must NOT rotate horizontally")
			assert(exit.laser_barrier.visible == true, "Locked laser barrier must be visible")
			
			exit.unlock_exit()
			exit._process(0.016)
			assert(exit.laser_barrier.rotation == Vector3.ZERO, "Unlocked laser barrier must NOT rotate horizontally into frame")
			
			# Blast shield sizes must fit doorway (width 4.0m, not 10.0m)
			var west_col = arena.get_node("Environment/BlastShieldWest/Collision") as CollisionShape3D
			var west_box = west_col.shape as BoxShape3D
			assert(west_box.size.z <= 4.5, "Blast shield size must be <= 4.5m to fit doorway without wall clipping")
			
			print("  • Gate geometry, alignment, zero horizontal rotation jitter, and blast shield dimensions verified.")
			arena.queue_free()
			test_step = 5
			timer = 0.0

		5:
			print("\n===================================================================")
			print(">>> ALL ARENA 3 GAMEPLAY REPAIR AUDITS PASSED WITH FLYING COLORS! <<<")
			print("===================================================================")
			quit(0)
			return true

	return false
