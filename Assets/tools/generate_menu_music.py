import math, struct, wave, random

# ---------------------------------------------------------------------------
# CORE BREACH — CINEMATIC MAIN MENU THEME SYNTHESIS
# ---------------------------------------------------------------------------
# Format: 44.1 kHz, 16-bit Stereo PCM WAV
# Tempo: 76 BPM (4 beats per bar, 8 bars = 32 beats = 25.263 seconds)
# Key: D Minor (Dm / Dm9 / Bbmaj7 / Gm7) - Dark futuristic tension
# Master: Fully normalized, multi-band balanced, seamless loop boundary
# ---------------------------------------------------------------------------

SAMPLE_RATE = 44100
BPM = 76.0
BEAT = 60.0 / BPM
BAR_DUR = 4.0 * BEAT
TOTAL_BARS = 8
TOTAL_DUR = TOTAL_BARS * BAR_DUR
NUM_SAMPLES = int(TOTAL_DUR * SAMPLE_RATE)

left = [0.0] * NUM_SAMPLES
right = [0.0] * NUM_SAMPLES

# ---------------------------------------------------------------------------
# 1. Menacing Cyber Drone & Lower-Mid Bass
# (D1 36.7Hz + D2 73.4Hz + D3 146.8Hz + A2 110Hz)
# Formatted with soft odd-harmonic saturation for audible presence on all speakers
# ---------------------------------------------------------------------------
f_root = 73.42 # D2 fundamental
for i in range(NUM_SAMPLES):
    t = i / SAMPLE_RATE
    # Slow undulating tension LFOs
    lfo1 = 0.5 + 0.5 * math.sin(2.0 * math.pi * (t / (TOTAL_DUR / 2.0)))
    lfo2 = 0.5 + 0.5 * math.cos(2.0 * math.pi * (t / (TOTAL_DUR / 4.0)))
    
    # Sub fundamental (felt on subs/headphones)
    sub = math.sin(2.0 * math.pi * (f_root * 0.5) * t) * 0.32
    # Fundamental D2 (clearly audible on laptop speakers)
    mid_bass = math.sin(2.0 * math.pi * f_root * t) * 0.28 * (0.8 + 0.2 * lfo1)
    # Upper octave D3 + 5th A2 for cybernetic growl
    oct_bass = math.sin(2.0 * math.pi * (f_root * 2.0) * t + 0.3) * 0.16 * (0.7 + 0.3 * lfo2)
    fifth_bass = math.sin(2.0 * math.pi * (f_root * 1.5) * t + 0.6) * 0.10
    
    combined = sub + mid_bass + oct_bass + fifth_bass
    # Warm analog tube-style soft clipper
    saturated = math.tanh(combined * 1.6) * 0.55
    
    left[i] += saturated
    right[i] += saturated

# ---------------------------------------------------------------------------
# 2. Lush Sci-Fi Atmospheric Pads (Dm9 / Bbmaj7 / Gm9 Chord Progression)
# Rich detuned stereophonic oscillators
# ---------------------------------------------------------------------------
# Progression over 8 bars:
# Bars 1-2: Dm9 (D3, F3, A3, C4, E4)
# Bars 3-4: Bbmaj7 (Bb2, D3, F3, A3, C4)
# Bars 5-6: Gm9 (G2, Bb2, D3, F3, A3)
# Bars 7-8: Dm (D2, A2, D3, F3, A3)
chords = [
    # (start_bar, end_bar, [(freq, base_amp)])
    (0, 2, [(146.83, 0.22), (174.61, 0.20), (220.00, 0.20), (261.63, 0.16), (329.63, 0.12)]), # Dm9
    (2, 4, [(116.54, 0.22), (146.83, 0.20), (174.61, 0.20), (220.00, 0.16), (261.63, 0.12)]), # Bbmaj7
    (4, 6, [(98.00, 0.24),  (116.54, 0.20), (146.83, 0.20), (174.61, 0.16), (220.00, 0.12)]), # Gm9
    (6, 8, [(73.42, 0.24),  (110.00, 0.22), (146.83, 0.20), (174.61, 0.18), (220.00, 0.14)])  # Dm
]

for start_b, end_b, notes in chords:
    t_start = start_b * BAR_DUR
    t_end = end_b * BAR_DUR
    s_start = int(t_start * SAMPLE_RATE)
    s_end = int(t_end * SAMPLE_RATE)
    dur = t_end - t_start
    
    for freq, amp in notes:
        # Detuned stereo pairs for wide sci-fi space
        f_left = freq * 0.996
        f_right = freq * 1.004
        
        for i in range(s_start, s_end):
            idx = i % NUM_SAMPLES
            rel_t = (i - s_start) / SAMPLE_RATE
            # Chord envelope: gentle fade in / out
            env = math.sin(math.pi * (rel_t / dur))
            
            # Filtered analog saw-triangle blend
            phase_l = 2.0 * math.pi * f_left * rel_t
            phase_r = 2.0 * math.pi * f_right * rel_t
            
            tri_l = math.asin(math.sin(phase_l)) * (2.0 / math.pi)
            tri_r = math.asin(math.sin(phase_r)) * (2.0 / math.pi)
            sin_l = math.sin(phase_l)
            sin_r = math.sin(phase_r)
            
            pad_l = (tri_l * 0.45 + sin_l * 0.55) * amp * env
            pad_r = (tri_r * 0.45 + sin_r * 0.55) * amp * env
            
            left[idx] += pad_l
            right[idx] += pad_r

# ---------------------------------------------------------------------------
# 3. Restrained Heartbeat / Industrial Sub Kick on Beats 1 & 3
# ---------------------------------------------------------------------------
for bar in range(TOTAL_BARS):
    for beat_idx in [0, 2]:
        start_t = (bar * 4 + beat_idx) * BEAT
        start_sample = int(start_t * SAMPLE_RATE)
        pulse_dur = 0.5
        pulse_samples = int(pulse_dur * SAMPLE_RATE)
        for s in range(pulse_samples):
            idx = (start_sample + s) % NUM_SAMPLES
            pt = s / SAMPLE_RATE
            env = math.exp(-pt * 8.5)
            # Pitch drop from 110Hz down to 45Hz
            pitch = 45.0 + 65.0 * math.exp(-pt * 28.0)
            p_val = math.sin(2.0 * math.pi * pitch * pt) * env * 0.5
            p_val = math.tanh(p_val * 1.8) * 0.42
            left[idx] += p_val
            right[idx] += p_val

# ---------------------------------------------------------------------------
# 4. Hi-Tech Clockwork Electronic Ticks (Rhythmic Pulse on 8th/16th Offbeats)
# ---------------------------------------------------------------------------
random.seed(101)
for bar in range(TOTAL_BARS):
    for step in range(16): # 16th notes
        if step in [2, 6, 10, 14] or (bar % 2 == 1 and step in [4, 12]):
            start_t = (bar * 4 + step * 0.25) * BEAT
            start_s = int(start_t * SAMPLE_RATE)
            dur_s = int(0.05 * SAMPLE_RATE)
            pan = 0.35 if (step % 4 == 2) else 0.65
            for s in range(dur_s):
                idx = (start_s + s) % NUM_SAMPLES
                st = s / SAMPLE_RATE
                env = math.exp(-st * 80.0)
                # Resonant metallic noise burst around 3800 Hz
                noise = (random.random() * 2.0 - 1.0) * math.sin(2.0 * math.pi * 3800.0 * st)
                tick = noise * env * 0.11
                left[idx] += tick * (1.0 - pan)
                right[idx] += tick * pan

# ---------------------------------------------------------------------------
# 5. Iconic Sci-Fi Lead / Arpeggiator Motif (FM Crystal Bell with Stereo Ping-Pong Echoes)
# ---------------------------------------------------------------------------
# Motif in D Minor: (beat_position, frequency_hz)
melody_notes = [
    # Bars 1-2: Awakening (D4 -> F4 -> A4 -> G4 -> E4 -> D4)
    (0.0, 293.66), (1.0, 349.23), (2.0, 440.00), (3.0, 392.00),
    (4.0, 329.63), (5.5, 349.23), (6.5, 293.66),
    # Bars 3-4: Darkness / Shift to Bb (Bb3 -> D4 -> F4 -> A4 -> C5 -> A4)
    (8.0, 233.08), (9.0, 293.66), (10.0, 349.23), (11.0, 440.00),
    (12.0, 523.25), (13.5, 440.00), (14.5, 392.00),
    # Bars 5-6: Tension Peak (G3 -> Bb3 -> D4 -> F4 -> A4 -> G4 -> E4)
    (16.0, 196.00), (17.0, 233.08), (18.0, 293.66), (19.0, 349.23),
    (20.0, 440.00), (21.5, 392.00), (22.5, 329.63),
    # Bars 7-8: Cinematic Resolution (F4 -> E4 -> C4 -> D4 drone hold)
    (24.0, 349.23), (25.0, 329.63), (26.0, 261.63), (27.0, 293.66),
    (29.0, 220.00), (30.5, 293.66)
]

for beat_pos, freq in melody_notes:
    note_t = beat_pos * BEAT
    note_start = int(note_t * SAMPLE_RATE)
    note_dur = 2.2
    note_samples = int(note_dur * SAMPLE_RATE)
    pan = 0.5 + 0.3 * math.sin(beat_pos * 1.3)
    
    for s in range(note_samples):
        idx = (note_start + s) % NUM_SAMPLES
        st = s / SAMPLE_RATE
        env = math.exp(-st * 2.8)
        
        # Dual-operator FM bell synthesis: Carrier + Modulator
        mod = math.sin(2.0 * math.pi * (freq * 2.0) * st) * math.exp(-st * 5.0) * 1.4
        tone = math.sin(2.0 * math.pi * freq * st + mod) * env * 0.22
        
        left[idx] += tone * (1.0 - pan)
        right[idx] += tone * pan
        
        # Stereo Ping-Pong Echo 1 (Dotted 8th delay: 3/8 beat)
        delay1_s = int(0.375 * BEAT * SAMPLE_RATE)
        idx_d1 = (note_start + s + delay1_s) % NUM_SAMPLES
        left[idx_d1] += tone * 0.42 * pan
        right[idx_d1] += tone * 0.42 * (1.0 - pan)
        
        # Stereo Ping-Pong Echo 2 (Quarter note delay: 6/8 beat)
        delay2_s = int(0.75 * BEAT * SAMPLE_RATE)
        idx_d2 = (note_start + s + delay2_s) % NUM_SAMPLES
        left[idx_d2] += tone * 0.20 * (1.0 - pan)
        right[idx_d2] += tone * 0.20 * pan

# ---------------------------------------------------------------------------
# 6. Mastering, Limiting, Normalization & Seamless Crossfade
# ---------------------------------------------------------------------------
# Soft limiter across samples
for i in range(NUM_SAMPLES):
    left[i] = math.tanh(left[i] * 1.15)
    right[i] = math.tanh(right[i] * 1.15)

max_amp = 0.0001
for i in range(NUM_SAMPLES):
    max_amp = max(max_amp, abs(left[i]), abs(right[i]))

# Target peak: -0.8 dBFS (0.912)
target_peak = 0.912
scale = target_peak / max_amp

# Seamless loop crossfade (micro-fade across boundary to eliminate any click)
crossfade_len = 350
for i in range(crossfade_len):
    fade_in = i / crossfade_len
    fade_out = 1.0 - fade_in
    end_idx = NUM_SAMPLES - crossfade_len + i
    l_blend = left[i] * fade_in + left[end_idx] * fade_out
    r_blend = right[i] * fade_in + right[end_idx] * fade_out
    left[i] = l_blend
    left[end_idx] = l_blend
    right[i] = r_blend
    right[end_idx] = r_blend

out_path = "audio/music/core_breach_menu_theme.wav"
with wave.open(out_path, "wb") as wav_file:
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2) # 16-bit PCM
    wav_file.setframerate(SAMPLE_RATE)
    
    frames = bytearray()
    for i in range(NUM_SAMPLES):
        l_samp = int(max(-1.0, min(1.0, left[i] * scale)) * 32767.0)
        r_samp = int(max(-1.0, min(1.0, right[i] * scale)) * 32767.0)
        frames.extend(struct.pack("<hh", l_samp, r_samp))
    wav_file.writeframes(frames)

print(f"Generated {out_path}: {NUM_SAMPLES} samples, {TOTAL_DUR:.2f}s, Peak: {max_amp:.3f} scaled by {scale:.3f}")
