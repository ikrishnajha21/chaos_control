extends Control
class_name MenuBackground

# --- CONFIGURATION & PALETTE ---
const COLOR_CYAN_GLOW: Color = Color(0.15, 0.92, 1.0, 0.85)
const COLOR_CYAN_DIM: Color = Color(0.08, 0.45, 0.65, 0.35)
const COLOR_CRIMSON_GLOW: Color = Color(1.0, 0.28, 0.22, 0.85)
const COLOR_CRIMSON_DIM: Color = Color(0.65, 0.15, 0.12, 0.35)
const COLOR_GRID_LINE: Color = Color(0.06, 0.22, 0.35, 0.22)
const COLOR_PILLAR: Color = Color(0.03, 0.08, 0.14, 0.75)

# --- STATE VARIABLES ---
var time_elapsed: float = 0.0
var core_scale: float = 1.0
var core_alpha: float = 1.0
var rotation_speed_mult: float = 1.0
var sweep_beam_y: float = -100.0
var sweep_beam_active: bool = false
var sweep_timer: float = 0.0

# Dynamic angles
var angle_ring_outer: float = 0.0
var angle_ring_mid: float = 0.0
var angle_ring_inner: float = 0.0

# Energy particle packets orbiting the core
class EnergyPacket:
	var ring_radius: float = 210.0
	var angle: float = 0.0
	var speed: float = 1.2
	var color: Color = Color.CYAN
	var trail_points: Array[Vector2] = []

var packets: Array[EnergyPacket] = []

func _ready() -> void:
	# Initialize orbiting energy packets
	for i in range(4):
		var p = EnergyPacket.new()
		p.ring_radius = 210.0 if (i % 2 == 0) else 130.0
		p.angle = (i * PI * 0.5)
		p.speed = 1.8 if (i % 2 == 0) else -2.2
		p.color = COLOR_CYAN_GLOW if (i < 2) else COLOR_CRIMSON_GLOW
		packets.append(p)

func _process(delta: float) -> void:
	time_elapsed += delta
	
	# Rotate core layers
	angle_ring_outer += 0.05 * delta * rotation_speed_mult
	angle_ring_mid -= 0.12 * delta * rotation_speed_mult
	angle_ring_inner += 0.22 * delta * rotation_speed_mult
	
	# Orbiting packets
	var center = size * 0.5
	for p in packets:
		p.angle += p.speed * delta * rotation_speed_mult
		var current_pos = center + Vector2(cos(p.angle), sin(p.angle)) * (p.ring_radius * core_scale)
		p.trail_points.push_front(current_pos)
		if p.trail_points.size() > 8:
			p.trail_points.pop_back()
			
	# Periodic energy sweep line
	sweep_timer += delta
	if sweep_timer > 7.0:
		sweep_timer = 0.0
		sweep_beam_active = true
		sweep_beam_y = -20.0
		
	if sweep_beam_active:
		sweep_beam_y += delta * 450.0
		if sweep_beam_y > size.y + 40.0:
			sweep_beam_active = false
			
	queue_redraw()

func _draw() -> void:
	var center = size * 0.5
	var w = size.x
	var h = size.y
	
	# -------------------------------------------------------------
	# LAYER A: ARCHITECTURAL PERSPECTIVE GRID & PILLARS
	# -------------------------------------------------------------
	_draw_perspective_grid(w, h, center)
	_draw_side_columns(w, h)
	
	# -------------------------------------------------------------
	# LAYER B: SEGMENTED ROTATING REACTOR CORE
	# -------------------------------------------------------------
	if core_alpha > 0.01:
		_draw_reactor_core(center)
		
	# -------------------------------------------------------------
	# LAYER C: ENERGY PULSES & SWEEP BEAM
	# -------------------------------------------------------------
	_draw_energy_packets()
	_draw_sweep_beam(w)
	
	# Outer subtle framing brackets on 4 screen corners
	_draw_corner_tech_brackets(w, h)

func _draw_perspective_grid(w: float, h: float, center: Vector2) -> void:
	var vp = Vector2(center.x, center.y * 0.95)
	
	# Floor grid perspective lines radiating from vanishing point
	var floor_y_start = h * 0.62
	var num_radials = 16
	for i in range(num_radials + 1):
		var bottom_x = lerp(-w * 0.2, w * 1.2, float(i) / float(num_radials))
		var start_pt = vp + (Vector2(bottom_x, h) - vp).normalized() * 120.0
		draw_line(start_pt, Vector2(bottom_x, h), COLOR_GRID_LINE, 1.0, true)
		
	# Horizontal floor lines with exponential perspective spacing
	var num_horizontals = 10
	var scroll_offset = fmod(time_elapsed * 24.0, 30.0)
	for j in range(num_horizontals):
		var t = float(j) / float(num_horizontals)
		var curve_t = pow(t, 2.2)
		var line_y = lerp(floor_y_start, h, curve_t) + (scroll_offset * curve_t)
		if line_y <= h:
			var alpha = curve_t * 0.35
			var line_col = Color(COLOR_GRID_LINE.r, COLOR_GRID_LINE.g, COLOR_GRID_LINE.b, alpha)
			draw_line(Vector2(0, line_y), Vector2(w, line_y), line_col, 1.0)
			
	# Ceiling inverted grid
	var ceil_y_end = h * 0.28
	for j in range(6):
		var t = float(j) / 6.0
		var curve_t = pow(t, 2.2)
		var line_y = lerp(ceil_y_end, 0.0, curve_t)
		var alpha = curve_t * 0.18
		var line_col = Color(COLOR_GRID_LINE.r, COLOR_GRID_LINE.g, COLOR_GRID_LINE.b, alpha)
		draw_line(Vector2(0, line_y), Vector2(w, line_y), line_col, 1.0)

func _draw_side_columns(w: float, h: float) -> void:
	# Left structural pillar & conduit
	var col_w = 40.0
	draw_rect(Rect2(0, 0, col_w, h), COLOR_PILLAR, true)
	draw_line(Vector2(col_w, 0), Vector2(col_w, h), Color(0.1, 0.4, 0.6, 0.4), 1.5)
	
	# Left vertical cyan energy conduit line with glowing notch indicators
	var conduit_x = col_w - 14.0
	draw_line(Vector2(conduit_x, 0), Vector2(conduit_x, h), COLOR_CYAN_DIM, 2.0)
	var pulse_pos_left = fmod(time_elapsed * 80.0, h)
	draw_circle(Vector2(conduit_x, pulse_pos_left), 3.0, COLOR_CYAN_GLOW)
	
	# Left pillar status notches
	for y_notch in range(80, int(h) - 80, 50):
		draw_line(Vector2(conduit_x - 6, y_notch), Vector2(conduit_x + 6, y_notch), Color(0.15, 0.7, 0.9, 0.5), 1.0)
		
	# Right structural pillar & conduit
	var right_x = w - col_w
	draw_rect(Rect2(right_x, 0, col_w, h), COLOR_PILLAR, true)
	draw_line(Vector2(right_x, 0), Vector2(right_x, h), Color(0.6, 0.15, 0.15, 0.4), 1.5)
	
	# Right vertical crimson energy conduit line with glowing notch indicators
	var conduit_xr = right_x + 14.0
	draw_line(Vector2(conduit_xr, 0), Vector2(conduit_xr, h), COLOR_CRIMSON_DIM, 2.0)
	var pulse_pos_right = fmod(h - (time_elapsed * 75.0), h)
	draw_circle(Vector2(conduit_xr, pulse_pos_right), 3.0, COLOR_CRIMSON_GLOW)
	
	for y_notch in range(80, int(h) - 80, 50):
		draw_line(Vector2(conduit_xr - 6, y_notch), Vector2(conduit_xr + 6, y_notch), Color(1.0, 0.3, 0.25, 0.5), 1.0)

func _draw_reactor_core(center: Vector2) -> void:
	var cur_scale = core_scale
	var cur_alpha = core_alpha
	
	# --- 1. Outer Telemetry Compass Ring (R ~ 280) ---
	var r_outer = 280.0 * cur_scale
	var col_outer = Color(COLOR_CYAN_DIM.r, COLOR_CYAN_DIM.g, COLOR_CYAN_DIM.b, COLOR_CYAN_DIM.a * cur_alpha)
	draw_arc(center, r_outer, 0, TAU, 128, col_outer, 1.0, true)
	
	# 72 circumference tick marks with rotating azimuth
	var tick_count = 72
	for i in range(tick_count):
		var angle = angle_ring_outer + (float(i) / float(tick_count)) * TAU
		var is_major = (i % 6 == 0)
		var tick_len = (12.0 if is_major else 5.0) * cur_scale
		var p1 = center + Vector2(cos(angle), sin(angle)) * (r_outer - tick_len)
		var p2 = center + Vector2(cos(angle), sin(angle)) * r_outer
		var tick_col = Color(COLOR_CYAN_GLOW.r, COLOR_CYAN_GLOW.g, COLOR_CYAN_GLOW.b, (0.75 if is_major else 0.25) * cur_alpha)
		draw_line(p1, p2, tick_col, (2.0 if is_major else 1.0), true)
		
	# 4 Cardinal Brackets on outer ring
	for k in range(4):
		var c_angle = angle_ring_outer + float(k) * (PI * 0.5)
		var b_pos = center + Vector2(cos(c_angle), sin(c_angle)) * r_outer
		var b_col = Color(COLOR_CYAN_GLOW.r, COLOR_CYAN_GLOW.g, COLOR_CYAN_GLOW.b, 0.85 * cur_alpha)
		draw_circle(b_pos, 3.5 * cur_scale, b_col)
		
	# --- 2. Middle Fractured Containment Ring (R ~ 215) ---
	# Segmented 4-arc geometry (2 Cyan, 2 Crimson)
	var r_mid = 215.0 * cur_scale
	var arc_len = PI * 0.42 # slight gap between arcs
	for a in range(4):
		var start_a = angle_ring_mid + float(a) * (PI * 0.5) + (PI * 0.04)
		var is_cyan = (a % 2 == 0)
		var arc_col = (COLOR_CYAN_GLOW if is_cyan else COLOR_CRIMSON_GLOW)
		arc_col.a *= cur_alpha
		# Main thick arc
		draw_arc(center, r_mid, start_a, start_a + arc_len, 48, arc_col, 3.5 * cur_scale, true)
		# Sub-accent inner arc
		var sub_col = Color(arc_col.r, arc_col.g, arc_col.b, arc_col.a * 0.4)
		draw_arc(center, r_mid - 8.0 * cur_scale, start_a + 0.05, start_a + arc_len - 0.05, 32, sub_col, 1.2 * cur_scale, true)
		# Arc terminal end caps
		var end_pt1 = center + Vector2(cos(start_a), sin(start_a)) * r_mid
		var end_pt2 = center + Vector2(cos(start_a + arc_len), sin(start_a + arc_len)) * r_mid
		draw_circle(end_pt1, 3.0 * cur_scale, arc_col)
		draw_circle(end_pt2, 3.0 * cur_scale, arc_col)

	# --- 3. Inner Angular Gyroscope & Hexagons (R ~ 140) ---
	var r_inner = 140.0 * cur_scale
	var hex_pts_cyan: Array[Vector2] = []
	var hex_pts_crimson: Array[Vector2] = []
	var sides = 6
	for s in range(sides + 1):
		var a1 = angle_ring_inner + (float(s) / float(sides)) * TAU
		var a2 = -angle_ring_inner * 0.8 + (float(s) / float(sides)) * TAU
		hex_pts_cyan.append(center + Vector2(cos(a1), sin(a1)) * r_inner)
		hex_pts_crimson.append(center + Vector2(cos(a2), sin(a2)) * (r_inner * 0.8))
		
	var hex_cyan_col = Color(COLOR_CYAN_GLOW.r, COLOR_CYAN_GLOW.g, COLOR_CYAN_GLOW.b, 0.45 * cur_alpha)
	var hex_crimson_col = Color(COLOR_CRIMSON_GLOW.r, COLOR_CRIMSON_GLOW.g, COLOR_CRIMSON_GLOW.b, 0.45 * cur_alpha)
	draw_polyline(PackedVector2Array(hex_pts_cyan), hex_cyan_col, 1.5 * cur_scale, true)
	draw_polyline(PackedVector2Array(hex_pts_crimson), hex_crimson_col, 1.5 * cur_scale, true)
	
	# Hexagon nodes
	for pt in hex_pts_cyan:
		draw_circle(pt, 2.5 * cur_scale, COLOR_CYAN_GLOW)
		
	# --- 4. Central Reactor Singularity Core (R ~ 65) ---
	var breath = sin(time_elapsed * 2.8) * 0.08
	var r_core = 65.0 * (cur_scale + breath)
	
	# Radiating glow rings
	var core_glow_col = Color(0.15, 0.85, 1.0, (0.12 + breath * 0.5) * cur_alpha)
	draw_circle(center, r_core * 1.5, core_glow_col)
	
	var core_mid_col = Color(0.2, 0.95, 1.0, (0.28 + breath * 0.5) * cur_alpha)
	draw_circle(center, r_core, core_mid_col)
	
	# Center crosshair reticle
	var ret_len = 24.0 * cur_scale
	var ret_col = Color(1.0, 1.0, 1.0, 0.85 * cur_alpha)
	draw_line(center - Vector2(ret_len, 0), center - Vector2(8, 0), ret_col, 1.5)
	draw_line(center + Vector2(8, 0), center + Vector2(ret_len, 0), ret_col, 1.5)
	draw_line(center - Vector2(0, ret_len), center - Vector2(0, 8), ret_col, 1.5)
	draw_line(center + Vector2(0, 8), center + Vector2(0, ret_len), ret_col, 1.5)
	draw_circle(center, 3.0 * cur_scale, Color(1, 1, 1, 0.95 * cur_alpha))

func _draw_energy_packets() -> void:
	for p in packets:
		if p.trail_points.size() > 1:
			var pts = PackedVector2Array(p.trail_points)
			var trail_col = Color(p.color.r, p.color.g, p.color.b, 0.35 * core_alpha)
			draw_polyline(pts, trail_col, 2.0 * core_scale, true)
		if p.trail_points.size() > 0:
			var head = p.trail_points[0]
			draw_circle(head, 4.0 * core_scale, Color(p.color.r, p.color.g, p.color.b, 0.95 * core_alpha))
			draw_circle(head, 2.0 * core_scale, Color(1, 1, 1, 0.95 * core_alpha))

func _draw_sweep_beam(w: float) -> void:
	if not sweep_beam_active:
		return
	var y = sweep_beam_y
	var beam_col = Color(0.2, 0.92, 1.0, 0.6)
	var beam_glow = Color(0.1, 0.6, 0.9, 0.15)
	# Gradient glow band
	draw_rect(Rect2(0, y - 6.0, w, 12.0), beam_glow, true)
	# High intensity sharp center line
	draw_line(Vector2(0, y), Vector2(w, y), beam_col, 1.5)

func _draw_corner_tech_brackets(w: float, h: float) -> void:
	var b_len = 35.0
	var b_pad = 24.0
	var col = Color(0.15, 0.75, 0.95, 0.4)
	
	# Top-Left
	draw_line(Vector2(b_pad, b_pad), Vector2(b_pad + b_len, b_pad), col, 2.0)
	draw_line(Vector2(b_pad, b_pad), Vector2(b_pad, b_pad + b_len), col, 2.0)
	# Top-Right
	draw_line(Vector2(w - b_pad, b_pad), Vector2(w - b_pad - b_len, b_pad), col, 2.0)
	draw_line(Vector2(w - b_pad, b_pad), Vector2(w - b_pad, b_pad + b_len), col, 2.0)
	# Bottom-Left
	draw_line(Vector2(b_pad, h - b_pad), Vector2(b_pad + b_len, h - b_pad), col, 2.0)
	draw_line(Vector2(b_pad, h - b_pad), Vector2(b_pad, h - b_pad - b_len), col, 2.0)
	# Bottom-Right
	draw_line(Vector2(w - b_pad, h - b_pad), Vector2(w - b_pad - b_len, h - b_pad), col, 2.0)
	draw_line(Vector2(w - b_pad, h - b_pad), Vector2(w - b_pad, h - b_pad - b_len), col, 2.0)
