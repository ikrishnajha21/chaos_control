import math
import struct
import wave
import random

SAMPLE_RATE = 44100

def write_wav(filepath, samples):
    with wave.open(filepath, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(SAMPLE_RATE)
        # Convert float [-1.0, 1.0] to int16 [-32767, 32767]
        raw_bytes = bytearray()
        for s in samples:
            val = max(-1.0, min(1.0, s))
            int_val = int(val * 32767.0)
            raw_bytes.extend(struct.pack('<h', int_val))
        wav_file.writeframes(raw_bytes)
    print(f"Generated {filepath} ({len(samples)} samples, {len(samples)/SAMPLE_RATE:.2f}s)")

def gen_menu_click():
    dur = 0.07
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 60.0)
        freq = 1400.0 - (t / dur) * 800.0
        phase = 2.0 * math.pi * freq * t
        s = math.sin(phase) * env * 0.8
        # slight click transient
        if i < 40:
            s += (random.random() * 2.0 - 1.0) * 0.3 * (1.0 - i / 40.0)
        samples.append(s)
    return samples

def gen_objective_activate():
    dur = 0.75
    num_samples = int(dur * SAMPLE_RATE)
    notes = [523.25, 659.25, 783.99, 1046.50] # C5, E5, G5, C6
    samples = [0.0] * num_samples
    for idx, freq in enumerate(notes):
        start_t = idx * 0.08
        start_i = int(start_t * SAMPLE_RATE)
        for i in range(start_i, num_samples):
            t = (i - start_i) / SAMPLE_RATE
            env = math.exp(-t * 6.0)
            s1 = math.sin(2.0 * math.pi * freq * t)
            s2 = math.sin(2.0 * math.pi * freq * 2.0 * t) * 0.35 # harmonic
            s3 = math.sin(2.0 * math.pi * freq * 3.0 * t) * 0.15 # shimmer
            samples[i] += (s1 + s2 + s3) * env * 0.25
    return samples

def gen_sabotage_warning():
    dur = 0.45
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Two-tone fast siren / pulse: 550Hz and 750Hz alternating at 12Hz
        mod = math.sin(2.0 * math.pi * 12.0 * t)
        freq = 600.0 + 150.0 * (1.0 if mod > 0 else -1.0)
        env = min(1.0, t * 40.0) * min(1.0, (dur - t) * 30.0)
        # Pulse tone (saw-sine mix)
        phase = 2.0 * math.pi * freq * t
        s = (math.sin(phase) * 0.6 + (2.0 * (phase / (2.0 * math.pi) % 1.0) - 1.0) * 0.25) * env * 0.7
        samples.append(s)
    return samples

def gen_sabotage_activate():
    dur = 0.8
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 5.0)
        # Low punch drop 220Hz -> 50Hz
        freq = 220.0 * math.exp(-t * 8.0) + 45.0
        punch = math.sin(2.0 * math.pi * freq * t) * env
        # Electrical buzz/spark (noisy saw)
        spark_env = math.exp(-t * 7.0)
        noise = (random.random() * 2.0 - 1.0) * 0.35 * spark_env
        buzz = math.sin(2.0 * math.pi * 120.0 * t + noise * 4.0) * 0.4 * spark_env
        s = (punch * 0.7 + buzz * 0.5 + noise * 0.4) * min(1.0, t * 200.0)
        samples.append(s)
    return samples

def gen_countdown_tick():
    dur = 0.12
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    freq = 880.0
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 35.0)
        s = math.sin(2.0 * math.pi * freq * t) * env * 0.75
        samples.append(s)
    return samples

def gen_countdown_go():
    dur = 0.55
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    f1 = 1174.66 # D6
    f2 = 1760.00 # A6
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 7.0)
        s = (math.sin(2.0 * math.pi * f1 * t) * 0.5 + math.sin(2.0 * math.pi * f2 * t) * 0.5) * env * 0.8
        samples.append(s)
    return samples

def gen_exit_unlocked():
    dur = 1.3
    num_samples = int(dur * SAMPLE_RATE)
    # Majestic chord swell & resolve: C4, G4, C5, E5
    freqs = [261.63, 392.00, 523.25, 659.25]
    samples = [0.0] * num_samples
    for idx, f in enumerate(freqs):
        delay = idx * 0.05
        start_i = int(delay * SAMPLE_RATE)
        for i in range(start_i, num_samples):
            t = (i - start_i) / SAMPLE_RATE
            # Attack swell then gradual decay
            attack = min(1.0, t * 12.0)
            decay = math.exp(-t * 2.2)
            env = attack * decay
            vibrato = math.sin(2.0 * math.pi * 5.0 * t) * 3.0
            s = math.sin(2.0 * math.pi * (f + vibrato) * t) * env * 0.22
            samples[i] += s
    return samples

def gen_round_win():
    dur = 1.6
    num_samples = int(dur * SAMPLE_RATE)
    # Major triad fanfare: C5 (0.0s), E5 (0.15s), G5 (0.3s), C6 (0.5s)
    melody = [(0.0, 523.25), (0.16, 659.25), (0.32, 783.99), (0.48, 1046.50)]
    samples = [0.0] * num_samples
    for start_t, freq in melody:
        start_i = int(start_t * SAMPLE_RATE)
        for i in range(start_i, num_samples):
            t = (i - start_i) / SAMPLE_RATE
            env = min(1.0, t * 40.0) * math.exp(-t * 3.0)
            s1 = math.sin(2.0 * math.pi * freq * t)
            s2 = math.sin(2.0 * math.pi * freq * 2.0 * t) * 0.3
            samples[i] += (s1 + s2) * env * 0.28
    return samples

def gen_round_loss():
    dur = 1.3
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 2.5) * min(1.0, t * 30.0)
        # Downward pitch bend
        freq = 320.0 * math.exp(-t * 2.0) + 40.0
        phase = 2.0 * math.pi * freq * t
        # Dark filtered square/buzz
        s = (math.sin(phase) * 0.6 + math.sin(phase * 3.0) * 0.25) * env * 0.7
        samples.append(s)
    return samples

def gen_music_cyber_loop():
    # 4-measure looping dark cyberpunk synth track (8.0 seconds at 120 BPM)
    bpm = 120.0
    beat_dur = 60.0 / bpm
    total_dur = beat_dur * 16.0 # 8.0 seconds
    num_samples = int(total_dur * SAMPLE_RATE)
    samples = [0.0] * num_samples
    
    # Bass notes sequence: E1 (41.2Hz), G1 (49.0Hz), A1 (55.0Hz), B1 (61.7Hz)
    pattern = [
        (41.2, 0.0), (41.2, 0.5), (41.2, 1.0), (49.0, 1.5),
        (41.2, 2.0), (41.2, 2.5), (55.0, 3.0), (41.2, 3.5),
        (41.2, 4.0), (41.2, 4.5), (61.7, 5.0), (55.0, 5.5),
        (41.2, 6.0), (49.0, 6.5), (55.0, 7.0), (61.7, 7.5),
    ]
    
    for freq, beat_t in pattern:
        start_i = int(beat_t * SAMPLE_RATE)
        note_len = int(0.42 * SAMPLE_RATE)
        for i in range(start_i, min(start_i + note_len, num_samples)):
            t = (i - start_i) / SAMPLE_RATE
            env = math.exp(-t * 7.0) * min(1.0, t * 100.0)
            # punchy analog synth bass (sine + sub + saw harmonic)
            sub = math.sin(2.0 * math.pi * freq * t)
            harm = math.sin(2.0 * math.pi * freq * 2.0 * t) * 0.4
            samples[i] += (sub + harm) * env * 0.35

    # Electronic Kick on every quarter note (beat 0, 1, 2, 3... 15)
    for b in range(16):
        kick_t = b * beat_dur
        start_i = int(kick_t * SAMPLE_RATE)
        kick_len = int(0.25 * SAMPLE_RATE)
        for i in range(start_i, min(start_i + kick_len, num_samples)):
            t = (i - start_i) / SAMPLE_RATE
            env = math.exp(-t * 18.0)
            k_freq = 140.0 * math.exp(-t * 30.0) + 40.0
            k_sound = math.sin(2.0 * math.pi * k_freq * t) * env * 0.42
            samples[i] += k_sound

    # Atmospheric Arp / Pad
    arp_notes = [329.63, 392.00, 493.88, 587.33] # E4, G4, B4, D5
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        step = int(t / (beat_dur / 2.0)) % len(arp_notes)
        note_f = arp_notes[step]
        note_t = t % (beat_dur / 2.0)
        env = math.exp(-note_t * 6.0)
        arp = math.sin(2.0 * math.pi * note_f * t) * env * 0.12
        samples[i] += arp

    # Normalize max amplitude to 0.85
    max_amp = max(abs(s) for s in samples) if samples else 1.0
    if max_amp > 0:
        samples = [s / max_amp * 0.85 for s in samples]

    return samples

def gen_runner_surge():
    # Rapid cyber thruster whoosh / acceleration sound
    dur = 0.55
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.sin(math.pi * (t / dur)) ** 1.5
        freq = 280.0 + (t / dur) * 620.0
        s = math.sin(2.0 * math.pi * freq * t) * 0.4
        # Add white noise hiss for thruster effect
        noise = (random.random() * 2.0 - 1.0) * 0.28
        samples.append((s + noise) * env * 0.65)
    return samples

def gen_runner_pulse():
    # Expanding high-tech radar chirp / sonar ping
    dur = 0.65
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 5.0)
        # Fast frequency drop chirp
        freq = 1800.0 * math.exp(-t * 8.0) + 440.0
        phase = 2.0 * math.pi * freq * t
        s1 = math.sin(phase) * 0.45
        # Echo harmonic ring
        echo_env = math.exp(-max(0.0, t - 0.12) * 6.0) if t > 0.12 else 0.0
        s2 = math.sin(2.0 * math.pi * 880.0 * t) * echo_env * 0.25
        samples.append((s1 + s2) * env)
    return samples

def gen_terminal_scramble():
    # Electric zap glitch / interference short-circuit
    dur = 0.4
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 9.0)
        # Frequency jitter
        jitter = random.choice([120.0, 240.0, 480.0, 960.0])
        s = math.sin(2.0 * math.pi * jitter * t) * 0.4
        # Electrical buzz / noise bursts
        buzz = (random.random() * 2.0 - 1.0) * 0.4 if (int(t * 120) % 2 == 0) else 0.0
        samples.append((s + buzz) * env * 0.7)
    return samples

def gen_arena_shift():
    # Heavy hydraulic piston release and metallic lock clunk
    dur = 0.85
    num_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Low mechanical rumble
        env_rumble = math.exp(-t * 3.5)
        rumble = (math.sin(2.0 * math.pi * 65.0 * t) + math.sin(2.0 * math.pi * 130.0 * t) * 0.5) * env_rumble * 0.5
        # Pneumatic hiss
        hiss = (random.random() * 2.0 - 1.0) * math.exp(-t * 4.0) * 0.25
        # Heavy metallic clunk at t = 0.45s
        clunk = 0.0
        if t >= 0.42:
            t_clunk = t - 0.42
            env_clunk = math.exp(-t_clunk * 14.0)
            clunk = (math.sin(2.0 * math.pi * 110.0 * t_clunk) + math.sin(2.0 * math.pi * 220.0 * t_clunk) * 0.4) * env_clunk * 0.6
        samples.append(rumble + hiss + clunk)
    return samples

if __name__ == '__main__':
    write_wav('audio/sfx/menu_click.wav', gen_menu_click())
    write_wav('audio/sfx/objective_activate.wav', gen_objective_activate())
    write_wav('audio/sfx/sabotage_warning.wav', gen_sabotage_warning())
    write_wav('audio/sfx/sabotage_activate.wav', gen_sabotage_activate())
    write_wav('audio/sfx/countdown_tick.wav', gen_countdown_tick())
    write_wav('audio/sfx/countdown_go.wav', gen_countdown_go())
    write_wav('audio/sfx/exit_unlocked.wav', gen_exit_unlocked())
    write_wav('audio/sfx/round_win.wav', gen_round_win())
    write_wav('audio/sfx/round_loss.wav', gen_round_loss())
    write_wav('audio/sfx/runner_surge.wav', gen_runner_surge())
    write_wav('audio/sfx/runner_pulse.wav', gen_runner_pulse())
    write_wav('audio/sfx/terminal_scramble.wav', gen_terminal_scramble())
    write_wav('audio/sfx/arena_shift.wav', gen_arena_shift())
    write_wav('audio/music/music_cyber_loop.wav', gen_music_cyber_loop())
    print("All audio files generated successfully!")
