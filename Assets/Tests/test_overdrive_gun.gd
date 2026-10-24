extends SceneTree

const OverdriveProjectileScript = preload("res://scripts/weapons/overdrive_projectile.gd")
const OverdriveGunScript = preload("res://scripts/weapons/overdrive_gun.gd")

var frame_count: int = 0
var test_phase: int = 0
var test_player: PlayerController = null
var current_arena: Arena = null

func _init() -> void:
	print("==================================================")
	print("STARTING TEST SUITE: OVERDRIVE GUN FOR CRIMSON WRAITH")
	print("==================================================")

func _process(delta: float) -> bool:
	frame_count += 1

	match test_phase:
		0:
			# -------------------------------------------------------------
			# TEST 1: Role Isolation & Gun Visibility
			# -------------------------------------------------------------
			print("\n[TEST 1] Role Isolation Check...")
			test_player = load("res://scenes/player.tscn").instantiate()
			root.add_child(test_player)
			test_phase = 1

		1:
			# After 1 frame, player is in tree and ready
			# Check Runner (Cyan Phantom)
			test_player.set_role(PlayerController.Role.RUNNER)
			assert(test_player.cyan_phantom.visible == true, "Cyan Phantom should be visible")
			assert(test_player.crimson_wraith.visible == false, "Crimson Wraith should be hidden")
			if test_player.overdrive_gun:
				assert(test_player.overdrive_gun.visible == false, "Overdrive gun must NOT be visible for Runner")
			var runner_shot = test_player.fire_overdrive_gun(Vector3.FORWARD)
			assert(runner_shot == null, "Runner (Cyan Phantom) MUST NOT be able to fire Overdrive Gun!")
			print(" -> Runner isolation verified: cannot hold or fire gun.")

			# Check Saboteur (Crimson Wraith)
			test_player.set_role(PlayerController.Role.SABOTEUR)
			assert(test_player.crimson_wraith.visible == true, "Crimson Wraith should be visible")
			assert(test_player.cyan_phantom.visible == false, "Cyan Phantom should be hidden")
			assert(test_player.overdrive_gun != null, "Overdrive gun must be mounted for Saboteur")
			assert(test_player.overdrive_gun.visible == true, "Overdrive gun must be visible for Saboteur")
			
			var saboteur_shot = test_player.fire_overdrive_gun(Vector3.FORWARD)
			assert(saboteur_shot != null, "Saboteur (Crimson Wraith) MUST be able to fire Overdrive Gun!")
			assert(saboteur_shot is OverdriveProjectileScript, "Shot must be an OverdriveProjectile")
			saboteur_shot.queue_free()
			print(" -> Saboteur gun firing verified.")
			test_phase = 2

		2:
			# -------------------------------------------------------------
			# TEST 2: Gun Socket & Mesh Verification
			# -------------------------------------------------------------
			print("\n[TEST 2] Gun Socket & Mesh Verification...")
			var hand = test_player.overdrive_gun.get_parent()
			assert(hand != null and hand.name == "Hand_R", "Overdrive gun parent must be Hand_R")
			assert(hand.is_inside_tree(), "Gun parent Hand_R must be an active in-tree node")

			var muzzle = test_player.overdrive_gun.get_node_or_null("Muzzle")
			assert(muzzle != null, "Gun must contain Muzzle marker")
			assert(muzzle.has_node("MuzzleLight"), "Muzzle must contain MuzzleLight")
			assert(muzzle.has_node("MuzzleFlashMesh"), "Muzzle must contain MuzzleFlashMesh")
			print(" -> Gun socket Hand_R and Muzzle FX verified.")

			test_player.queue_free()
			test_phase = 3

		3:
			# -------------------------------------------------------------
			# TEST 3: Projectile Attributes & Detection
			# -------------------------------------------------------------
			print("\n[TEST 3] Projectile Physics & Speed...")
			var proj_scene = load("res://scenes/weapons/overdrive_projectile.tscn")
			var proj = proj_scene.instantiate()
			root.add_child(proj)

			assert(proj.speed > 25.0, "Projectile must have high velocity (found: %f)" % proj.speed)
			assert(proj.countdown_reduction == 3.0, "Default countdown reduction must be 3.0 seconds")
			assert(proj.has_node("RayCast3D"), "Projectile must have continuous anti-tunneling RayCast3D")
			assert(proj.has_node("VisualMesh"), "Projectile must have VisualMesh")
			assert(proj.has_node("TrailParticles"), "Projectile must have TrailParticles")
			assert(proj.has_node("ImpactParticles"), "Projectile must have ImpactParticles")

			proj.queue_free()
			print(" -> Projectile components and speeds verified.")
			test_phase = 4

		4:
			# -------------------------------------------------------------
			# TEST 4: Arena 1 Laser Barrier Acceleration
			# -------------------------------------------------------------
			print("\n[TEST 4] Arena 1 (Research Facility) Laser Barrier Acceleration...")
			var env1 = EnvResearchFacility.new()
			root.add_child(env1)

			env1.current_laser_state = EnvResearchFacility.LaserState.DISARMED
			env1.laser_cycle_timer = 4.0

			var success = env1.accelerate_obstacle_countdown(3.0)
			assert(success == true, "accelerate_obstacle_countdown should succeed")
			assert(abs(env1.laser_cycle_timer - 1.0) < 0.01, "Timer should be reduced from 4.0 to 1.0")

			success = env1.accelerate_obstacle_countdown(3.0)
			assert(success == true, "accelerate_obstacle_countdown should succeed")
			assert(env1.current_laser_state == EnvResearchFacility.LaserState.ACTIVE, "Lasers should immediately arm to ACTIVE!")
			print(" -> Arena 1 countdown reduction and arming verified.")

			env1.queue_free()
			test_phase = 5

		5:
			# -------------------------------------------------------------
			# TEST 5: Arena 2 Acceleration
			# -------------------------------------------------------------
			print("\n[TEST 5] Arena 2 (Power Core) Acceleration...")
			var env2 = EnvPowerCore.new()
			root.add_child(env2)

			env2.current_laser_state = EnvPowerCore.LaserState.DISARMED
			env2.laser_cycle_timer = 3.5
			env2.accelerate_obstacle_countdown(3.0)
			assert(abs(env2.laser_cycle_timer - 0.5) < 0.01, "Timer should be reduced by 3.0s")

			env2.accelerate_obstacle_countdown(3.0)
			assert(env2.current_laser_state == EnvPowerCore.LaserState.ACTIVE, "Lasers must arm immediately upon dropping to <= 0")
			print(" -> Arena 2 laser grid acceleration verified.")

			env2.queue_free()
			test_phase = 6

		6:
			# -------------------------------------------------------------
			# TEST 6: Arena 3 Reactor Core Acceleration
			# -------------------------------------------------------------
			print("\n[TEST 6] Arena 3 (Underground Complex) Reactor Core Acceleration...")
			current_arena = load("res://scenes/arenas/NeonReactor.tscn").instantiate()
			root.add_child(current_arena)
			test_phase = 7

		7:
			# NeonReactor in tree
			current_arena.purge_state = NeonReactorArena.PurgeState.STANDBY
			current_arena.purge_timer = 5.0

			var success = current_arena.accelerate_obstacle_countdown(3.0)
			assert(success == true, "accelerate_obstacle_countdown should succeed on NeonReactorArena")
			assert(abs(current_arena.purge_timer - 2.0) < 0.01, "Purge timer should be reduced to 2.0s")

			current_arena.accelerate_obstacle_countdown(3.0)
			assert(current_arena.purge_state == NeonReactorArena.PurgeState.WARNING, "Reactor must transition to WARNING immediately!")
			print(" -> Arena 3 reactor purge countdown acceleration verified.")

			current_arena.queue_free()
			test_phase = 8

		8:
			# -------------------------------------------------------------
			# TEST 7: Arena Cooldown, Input & HUD Integration
			# -------------------------------------------------------------
			print("\n[TEST 7] Arena Cooldown & HUD Integration...")
			current_arena = load("res://scenes/arenas/TrainingFacility.tscn").instantiate()
			root.add_child(current_arena)
			test_phase = 9

		9:
			current_arena.is_countdown_active = false
			current_arena.round_state = Arena.RoundState.ACTIVE
			current_arena.overdrive_cooldown = 0.0
			if current_arena.p1: current_arena.p1.unfreeze()
			if current_arena.p2: current_arena.p2.unfreeze()

			var fired = current_arena._trigger_saboteur_overdrive()
			assert(fired == true, "Overdrive gun should fire successfully")
			assert(abs(current_arena.overdrive_cooldown - 5.0) < 0.01, "Cooldown should be set to 5.0s")

			var second_shot = current_arena._trigger_saboteur_overdrive()
			assert(second_shot == false, "Second shot must fail while on cooldown")

			current_arena._process(2.0)
			assert(abs(current_arena.overdrive_cooldown - 3.0) < 0.05, "Cooldown should tick down to ~3.0s")

			var p2_status = current_arena.p2_ability_status
			assert(p2_status != null, "P2 ability status label must exist")
			assert("GUN:" in p2_status.text or "OVERDRIVE:" in p2_status.text, "HUD status should display gun cooldown")

			current_arena._start_round(2)
			assert(current_arena.overdrive_cooldown == 0.0, "Cooldown must reset to 0.0s on round restart")
			print(" -> 5.0s Cooldown, HUD display, and round reset verified.")

			current_arena.queue_free()

			print("==================================================")
			print("ALL 7 TEST PHASES COMPLETED WITH 0 ERRORS!")
			print("==================================================")
			quit()
			return true

	return false
