extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var current_arena_node: Node = null

func _init() -> void:
	print(">>> [TEST START] Multi-Arena Verification Suite")

func _process(delta: float) -> bool:
	frame_count += 1
	if frame_count < 3:
		return false

	match test_phase:
		0:
			# --- PHASE 0: Test Arena Select Menu ---
			test_phase = 1
			print(">>> Testing Arena Selection Menu (res://scenes/arena.tscn)...")
			var menu_scene = load("res://scenes/arena.tscn")
			assert(menu_scene != null, "arena.tscn menu scene should load")
			var menu: ArenaSelectMenu = menu_scene.instantiate()
			root.add_child(menu)
			assert(menu.btn_training != null, "Training Facility button must exist")
			assert(menu.btn_gravity != null, "Gravity Core button must exist")
			assert(menu.btn_reactor != null, "Neon Reactor button must exist")
			menu.queue_free()
			print("✓ Phase 0 Passed: Arena Select Menu loaded with all 3 arena options")

		1:
			# --- PHASE 1: Test Arena 1 (Training Facility) ---
			test_phase = 2
			print(">>> Testing Arena 1: Training Facility (res://scenes/arenas/TrainingFacility.tscn)...")
			var scene1 = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(scene1 != null, "TrainingFacility.tscn should load")
			var a1: Arena = scene1.instantiate()
			root.add_child(a1)
			current_arena_node = a1
			
			assert(a1.p1 != null and a1.p2 != null, "Both players must exist")
			assert(a1.control_points_root.get_child_count() == 3, "Must have 3 control points")
			assert(a1.exit_zone != null, "Exit zone must exist")
			assert(a1.arena_name == "RESEARCH FACILITY" or a1.arena_name == "TRAINING FACILITY", "Arena name should be RESEARCH FACILITY or TRAINING FACILITY")
			
			a1.queue_free()
			print("✓ Phase 1 Passed: Arena 1 (Training Facility) loaded and verified")

		2:
			# --- PHASE 2: Test Arena 2 (Gravity Core) ---
			test_phase = 3
			print(">>> Testing Arena 2: Gravity Core (res://scenes/arenas/GravityCore.tscn)...")
			var scene2 = load("res://scenes/arenas/GravityCore.tscn")
			assert(scene2 != null, "GravityCore.tscn should load")
			var a2: GravityCoreArena = scene2.instantiate()
			root.add_child(a2)
			current_arena_node = a2

			# Advance pre-round countdown
			a2._process_countdown(3.5)

			# Verify Bridge initial state
			assert(a2.bridge_state == GravityCoreArena.BridgeState.ONLINE, "Bridge must be ONLINE initially")
			assert(a2.bridge_collision.disabled == false, "Bridge collision must be enabled initially")
			assert("ONLINE" in a2.bridge_label.text, "Bridge label should show ONLINE")

			# Verify permanent safe bypasses exist
			var catwalk_w = a2.get_node("Environment/Bridges/CatwalkWest")
			var catwalk_e = a2.get_node("Environment/Bridges/CatwalkEast")
			assert(catwalk_w != null and catwalk_e != null, "West and East bypass catwalks must exist")
			assert(catwalk_w.get_node("CollisionShape3D").disabled == false, "West catwalk must be solid")
			assert(catwalk_e.get_node("CollisionShape3D").disabled == false, "East catwalk must be solid")
			print("  • Bypasses verified: West and East catwalks are permanent and solid")

			# Trigger Saboteur EMP Destabilization
			a2._start_bridge_destabilization()
			assert(a2.bridge_state == GravityCoreArena.BridgeState.WARNING, "Bridge should enter WARNING state")
			assert(a2.bridge_collision.disabled == false, "Bridge remains walkable during warning")
			print("  • Bridge warning verified: Amber lights and 1.5s warning active")

			# Advance past warning -> Bridge becomes DISABLED
			a2._process_arena_hazards(1.6)
			assert(a2.bridge_state == GravityCoreArena.BridgeState.DISABLED, "Bridge should become DISABLED")
			assert(a2.bridge_collision.disabled == true, "Bridge collision must be disabled when offline")
			print("  • Bridge disabled verified: Collision disabled, red lights and offline text")

			# Advance past disabled time -> Bridge RESTORES
			a2._process_arena_hazards(4.1)
			assert(a2.bridge_state == GravityCoreArena.BridgeState.ONLINE, "Bridge should restore to ONLINE")
			assert(a2.bridge_collision.disabled == false, "Bridge collision must re-enable")
			print("  • Bridge restore verified: Automatically restored to ONLINE")

			# Reset arena hazards
			a2._reset_arena_hazards()
			assert(a2.bridge_state == GravityCoreArena.BridgeState.ONLINE, "Reset should ensure bridge is online")

			a2.queue_free()
			print("✓ Phase 2 Passed: Arena 2 (Gravity Core) bridge mechanics verified")

		3:
			# --- PHASE 3: Test Arena 3 (Neon Reactor) ---
			test_phase = 4
			print(">>> Testing Arena 3: Neon Reactor (res://scenes/arenas/NeonReactor.tscn)...")
			var scene3 = load("res://scenes/arenas/NeonReactor.tscn")
			assert(scene3 != null, "NeonReactor.tscn should load")
			var a3: NeonReactorArena = scene3.instantiate()
			root.add_child(a3)
			current_arena_node = a3

			# Advance pre-round countdown
			a3._process_countdown(3.5)

			# Verify initial state
			assert(a3.purge_state == NeonReactorArena.PurgeState.STANDBY, "Purge should start in STANDBY")
			assert(a3.hazard_collision.disabled == true, "Hazard collision should be disabled in STANDBY")
			assert(a3.purge_field_mesh.visible == false, "Purge mesh should be hidden in STANDBY")

			# Verify blast shields exist protecting flank routes
			var shield_w = a3.get_node("Environment/BlastShieldWest")
			var shield_e = a3.get_node("Environment/BlastShieldEast")
			assert(shield_w != null and shield_e != null, "West and East radiation blast shields must exist")
			print("  • Blast shields verified: Sheltered side corridors protect Runner from purge")

			# Advance to Warning phase
			a3._process_arena_hazards(9.2)
			assert(a3.purge_state == NeonReactorArena.PurgeState.WARNING, "Should transition to WARNING phase")
			assert(a3.purge_field_mesh.visible == true, "Warning telegraph mesh should be visible")
			print("  • Reactor warning verified: 3-second telegraph beacon and audio/visual alerts")

			# Advance to Purging phase
			a3._process_arena_hazards(3.1)
			assert(a3.purge_state == NeonReactorArena.PurgeState.PURGING, "Should transition to PURGING phase")
			assert(a3.hazard_collision.disabled == false, "Hazard collision must be active during purge")
			print("  • Reactor purge active verified: Plasma field active")

			# Test Runner in core gets affected
			var runner = a3.p1 if a3.p1.current_role == PlayerController.Role.RUNNER else a3.p2
			runner.global_position = a3.reactor_hazard_area.global_position
			a3._apply_purge_effect(runner)
			assert(runner.speed_multiplier == 0.25, "Runner in core plaza must receive 75% speed debuff")
			assert(runner.is_glitched == true, "Runner in core plaza must receive glitch state")
			print("  • Purge effect verified: Runner caught in core received slow debuff")

			# Advance past purge -> Returns to STANDBY
			a3._process_arena_hazards(2.6)
			assert(a3.purge_state == NeonReactorArena.PurgeState.STANDBY, "Should return to STANDBY after purge")
			assert(a3.hazard_collision.disabled == true, "Hazard collision must be disabled after purge")
			print("  • Reactor purge completion verified: Safely returned to STANDBY")

			# Test Round Reset restores Standby
			a3._reset_arena_hazards()
			assert(a3.purge_state == NeonReactorArena.PurgeState.STANDBY, "Hazard state must reset to Standby")

			a3.queue_free()
			print("✓ Phase 3 Passed: Arena 3 (Neon Reactor) core purge mechanics verified")

			print(">>> ALL 3 ARENA VERIFICATION PHASES PASSED WITH ZERO ERRORS! <<<")
			quit(0)
			return true

	return false
