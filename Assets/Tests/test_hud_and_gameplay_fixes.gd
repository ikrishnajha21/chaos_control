extends SceneTree

var frame_count: int = 0
var test_phase: int = 0
var current_arena: Arena = null

func _init() -> void:
	print("\n===================================================================")
	print(">>> [TEST START] HUD REFINEMENT & ARENA 2/3 GAMEPLAY AUDIT SUITE <<<")
	print("===================================================================")

func _process(delta: float) -> bool:
	frame_count += 1

	match test_phase:
		0:
			# -------------------------------------------------------------
			# PHASE 1: Priority 1 — HUD Card in Arena 1 (Research Facility)
			# -------------------------------------------------------------
			print(">>> Phase 1: Auditing HUD Side Panel in Arena 1 (Research Facility)...")
			var scene = load("res://scenes/arenas/TrainingFacility.tscn")
			assert(scene != null, "TrainingFacility.tscn failed to load")
			current_arena = scene.instantiate() as Arena
			root.add_child(current_arena)
			
			var hud = current_arena.get_node_or_null("HUD")
			assert(hud != null, "HUD node missing in Arena 1")
			var side_panel = hud.get_node_or_null("SidePanel") as PanelContainer
			assert(side_panel != null, "SidePanel missing in Arena 1")
			
			# Check style transparency
			var sb = side_panel.get_theme_stylebox("panel") as StyleBoxFlat
			assert(sb != null, "SidePanel StyleBoxFlat missing")
			assert(sb.bg_color.a <= 0.55, "SidePanel background must be transparent (alpha <= 0.55), got %.2f" % sb.bg_color.a)
			assert(sb.border_color.a <= 0.55, "SidePanel border must be subtle (alpha <= 0.55), got %.2f" % sb.border_color.a)
			
			# Check height reduction (anchor_bottom must be 0.0, offset_bottom <= 360)
			assert(side_panel.anchor_bottom == 0.0, "SidePanel must NOT stretch full screen (anchor_bottom must be 0.0)")
			var panel_height = side_panel.offset_bottom - side_panel.offset_top
			assert(panel_height <= 360.0, "SidePanel height must be <= 360px (got %.1f)" % panel_height)
			
			# Check waypoint status is hidden in Arena 1 (no checkpoints)
			assert(current_arena.hud_waypoint_status.visible == false, "Waypoint status should be hidden in Arena 1")
			
			print("  ✓ Arena 1 HUD: Transparent background (alpha=%.2f), height=%.1fpx, clean compact layout" % [sb.bg_color.a, panel_height])
			current_arena.queue_free()
			test_phase = 1

		1:
			# -------------------------------------------------------------
			# PHASE 2: Priority 1 & 2 — Arena 2 (Power Core) HUD & Checkpoints
			# -------------------------------------------------------------
			print(">>> Phase 2: Auditing Arena 2 (Power Core) HUD & Checkpoints...")
			var scene = load("res://scenes/arenas/GravityCore.tscn")
			assert(scene != null, "GravityCore.tscn failed to load")
			current_arena = scene.instantiate() as Arena
			root.add_child(current_arena)
			
			var hud = current_arena.get_node_or_null("HUD")
			var side_panel = hud.get_node_or_null("SidePanel") as PanelContainer
			assert(side_panel != null, "SidePanel missing in Arena 2")
			var sb = side_panel.get_theme_stylebox("panel") as StyleBoxFlat
			assert(sb.bg_color.a <= 0.55, "Arena 2 SidePanel background must be transparent")
			var panel_height = side_panel.offset_bottom - side_panel.offset_top
			assert(panel_height <= 360.0, "Arena 2 SidePanel height must be <= 360px")
			
			# Checkpoint container verification
			var cp_root = current_arena.get_node_or_null("Checkpoints")
			assert(cp_root != null, "Arena 2 must have a Checkpoints container node")
			assert(cp_root.get_child_count() == 3, "Arena 2 must have exactly THREE checkpoints, got %d" % cp_root.get_child_count())
			
			var cp1 = cp_root.get_node_or_null("Checkpoint_1") as Checkpoint
			var cp2 = cp_root.get_node_or_null("Checkpoint_2") as Checkpoint
			var cp3 = cp_root.get_node_or_null("Checkpoint_3") as Checkpoint
			assert(cp1 != null and cp2 != null and cp3 != null, "All 3 checkpoints must exist as Checkpoint instances")
			
			# Check positions
			assert(cp1.position.distance_to(Vector3(-30, 0.1, 12)) < 1.0, "CP1 must be near Entry (-30, 0.1, 12)")
			assert(cp2.position.distance_to(Vector3(-18, 0.1, -16)) < 1.0, "CP2 must be at Progression (-18, 0.1, -16)")
			assert(cp3.position.distance_to(Vector3(0, 0.15, -34)) < 1.0, "CP3 must be at Final Approach (0, 0.15, -34)")
			
			# Confirm old middle checkpoint removed (no checkpoint at (0, 1.3, 0))
			for cp in cp_root.get_children():
				assert(cp.position.distance_to(Vector3(0, 1.3, 0)) > 5.0, "Old middle checkpoint must NOT exist in Checkpoints")
				
			# Check HUD telemetry reflects checkpoints
			current_arena._update_objective_hud()
			assert(current_arena.hud_waypoint_status != null, "hud_waypoint_status missing")
			assert(current_arena.hud_waypoint_status.visible == true, "hud_waypoint_status must be visible in Arena 2")
			assert(current_arena.hud_waypoint_status.text == "WAYPOINTS: 0/3 ACTIVE", "Initial waypoint status mismatch")
			
			print("  ✓ Arena 2 HUD: Transparent & compact (height=%.1fpx)" % panel_height)
			print("  ✓ Exactly 3 Checkpoints verified: Entry (-30, 12), Progression (-18, -16), Final Approach (0, -34)")
			test_phase = 2

		2:
			# -------------------------------------------------------------
			# PHASE 3: Functional Activation & Round Reset in Arena 2
			# -------------------------------------------------------------
			print(">>> Phase 3: Testing Checkpoint Activation & Safe Resets in Arena 2...")
			var p1 = current_arena.p1
			var cp_root = current_arena.get_node("Checkpoints")
			var cp1 = cp_root.get_node("Checkpoint_1") as Checkpoint
			var cp2 = cp_root.get_node("Checkpoint_2") as Checkpoint
			var cp3 = cp_root.get_node("Checkpoint_3") as Checkpoint
			
			# Runner enters CP1
			cp1._on_body_entered(p1)
			assert(cp1.is_activated == true, "CP1 should be activated by runner")
			assert(p1.last_checkpoint_position == cp1.global_position + Vector3(0.0, 0.5, 0.0), "P1 last checkpoint should be saved to CP1")
			current_arena._update_objective_hud()
			assert(current_arena.hud_waypoint_status.text == "WAYPOINTS: 1/3 ACTIVE", "HUD should display 1/3 ACTIVE")
			
			# Runner enters CP2
			cp2._on_body_entered(p1)
			assert(cp2.is_activated == true, "CP2 should be activated by runner")
			assert(p1.last_checkpoint_position == cp2.global_position + Vector3(0.0, 0.5, 0.0), "P1 last checkpoint should be saved to CP2")
			current_arena._update_objective_hud()
			assert(current_arena.hud_waypoint_status.text == "WAYPOINTS: 2/3 ACTIVE", "HUD should display 2/3 ACTIVE")
			
			# Runner enters CP3
			cp3._on_body_entered(p1)
			assert(cp3.is_activated == true, "CP3 should be activated by runner")
			assert(p1.last_checkpoint_position == cp3.global_position + Vector3(0.0, 0.5, 0.0), "P1 last checkpoint should be saved to CP3")
			current_arena._update_objective_hud()
			assert(current_arena.hud_waypoint_status.text == "WAYPOINTS: 3/3 ACTIVE", "HUD should display 3/3 ACTIVE")
			
			# Test Saboteur Rejection (Saboteur cannot activate checkpoint)
			cp1.reset_checkpoint()
			var p2 = current_arena.p2
			cp1._on_body_entered(p2)
			assert(cp1.is_activated == false, "Saboteur must NOT activate checkpoints")
			
			# Test Round Reset (All checkpoints reset)
			current_arena._start_round(2)
			assert(cp1.is_activated == false, "CP1 must reset on round start")
			assert(cp2.is_activated == false, "CP2 must reset on round start")
			assert(cp3.is_activated == false, "CP3 must reset on round start")
			current_arena._update_objective_hud()
			assert(current_arena.hud_waypoint_status.text == "WAYPOINTS: 0/3 ACTIVE", "HUD must reset to 0/3 ACTIVE")
			
			print("  ✓ Checkpoint activation, safe respawn coordinates, saboteur rejection & round reset verified")
			current_arena.queue_free()
			test_phase = 3

		3:
			# -------------------------------------------------------------
			# PHASE 4: Priority 1 & 3 — Arena 3 (Underground Complex)
			# -------------------------------------------------------------
			print(">>> Phase 4: Auditing Arena 3 HUD & Central Player Spawns...")
			var scene = load("res://scenes/arenas/NeonReactor.tscn")
			assert(scene != null, "NeonReactor.tscn failed to load")
			current_arena = scene.instantiate() as Arena
			root.add_child(current_arena)
			
			# HUD inspection
			var hud = current_arena.get_node_or_null("HUD")
			var side_panel = hud.get_node_or_null("SidePanel") as PanelContainer
			assert(side_panel != null, "SidePanel missing in Arena 3")
			var sb = side_panel.get_theme_stylebox("panel") as StyleBoxFlat
			assert(sb.bg_color.a <= 0.55, "Arena 3 SidePanel background must be transparent")
			var panel_height = side_panel.offset_bottom - side_panel.offset_top
			assert(panel_height <= 360.0, "Arena 3 SidePanel height must be <= 360px")
			
			# Priority 3: Spawn positions verification
			var p1_spawn = current_arena.p1.position
			var p2_spawn = current_arena.p2.position
			print("  • Initial Arena 3 Spawns: P1=%s, P2=%s" % [p1_spawn, p2_spawn])
			assert(p1_spawn.distance_to(Vector3(-8.0, 0.5, 4.0)) < 0.2, "P1 must spawn at central position (-8, 0.5, 4)")
			assert(p2_spawn.distance_to(Vector3(8.0, 0.5, -4.0)) < 0.2, "P2 must spawn at central position (8, 0.5, -4)")
			
			# Verify distance between players is balanced & central (~17.9m)
			var separation = p1_spawn.distance_to(p2_spawn)
			assert(separation < 25.0, "Players must not spawn excessive distance apart (got %.1fm)" % separation)
			assert(separation > 10.0, "Players must have safe separation so they don't collide immediately (got %.1fm)" % separation)
			
			# Verify round reset maintains the central spawns
			current_arena._start_round(1)
			assert(current_arena.p1.global_position.distance_to(Vector3(-8.0, 0.5, 4.0)) < 0.2, "Round 1 P1 must reset to (-8, 0.5, 4)")
			assert(current_arena.p2.global_position.distance_to(Vector3(8.0, 0.5, -4.0)) < 0.2, "Round 1 P2 must reset to (8, 0.5, -4)")
			
			current_arena._start_round(2)
			# Round 2 roles swap: P2 is runner (-8, 0.5, 4), P1 is saboteur (8, 0.5, -4)
			assert(current_arena.p2.global_position.distance_to(Vector3(-8.0, 0.5, 4.0)) < 0.2, "Round 2 P2 (runner) must reset to (-8, 0.5, 4)")
			assert(current_arena.p1.global_position.distance_to(Vector3(8.0, 0.5, -4.0)) < 0.2, "Round 2 P1 (saboteur) must reset to (8, 0.5, -4)")
			
			print("  ✓ Arena 3 HUD: Transparent & compact (height=%.1fpx)" % panel_height)
			print("  ✓ Arena 3 Spawns: Central, balanced separation (%.1fm), persistent across round resets" % separation)
			
			current_arena.queue_free()
			test_phase = 4

		4:
			print("===================================================================")
			print(">>> ALL HUD & ARENA 2/3 GAMEPLAY VERIFICATIONS PASSED! <<<")
			print("===================================================================\n")
			quit()
			return true

	return false
