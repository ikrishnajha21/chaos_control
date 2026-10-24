shader_type canvas_item;

uniform sampler2D screen_texture : hint_screen_texture, filter_linear_mipmap;
uniform float scanline_density : hint_range(50.0, 600.0) = 280.0;
uniform float scanline_opacity : hint_range(0.0, 0.3) = 0.055;
uniform float vignette_intensity : hint_range(0.0, 2.0) = 0.75;
uniform float chromatic_aberration : hint_range(0.0, 0.02) = 0.0015;
uniform float glitch_intensity : hint_range(0.0, 1.0) = 0.0;

void fragment() {
	vec2 uv = SCREEN_UV;
	
	// Micro glitch displacement
	if (glitch_intensity > 0.001) {
		float n = sin(uv.y * 50.0 + TIME * 35.0);
		if (abs(n) > 0.88) {
			uv.x += (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025 * glitch_intensity;
		}
	}
	
	// Chromatic Aberration
	vec4 col;
	if (chromatic_aberration > 0.0001) {
		float dist = length(uv - vec2(0.5));
		vec2 shift = (uv - vec2(0.5)) * chromatic_aberration * dist;
		col.r = texture(screen_texture, uv - shift).r;
		col.g = texture(screen_texture, uv).g;
		col.b = texture(screen_texture, uv + shift).b;
		col.a = 1.0;
	} else {
		col = texture(screen_texture, uv);
	}
	
	// Scanlines
	float scan = sin((uv.y + TIME * 0.015) * scanline_density * 3.14159) * 0.5 + 0.5;
	col.rgb -= scan * scanline_opacity;
	
	// Vignette
	vec2 d = (uv - vec2(0.5)) * 2.0;
	float vig = clamp(dot(d, d) * 0.25 * vignette_intensity, 0.0, 1.0);
	col.rgb = mix(col.rgb, vec3(0.01, 0.018, 0.03), vig);
	
	COLOR = col;
}
