// Web Audio API synthesizer for delicate music box chimes, paper seal pop, and playful goose sound

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // default muted for user-friendly mobile experience
  private bgmOscillators: number[] = [];
  private isPlayingLullaby: boolean = false;
  private lullabyTimeout: number | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initCtx();
      this.playChime();
    } else {
      this.stopLullaby();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Delicate paper unseal / wax seal crackle sound
  public playWaxSealSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft gentle pop & swoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);

      // Light shimmer chime
      setTimeout(() => this.playChimeNotes([587.33, 880, 1174.66], 0.08), 80);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Play a soft sweet chime
  public playChime() {
    this.playChimeNotes([523.25, 659.25, 783.99, 1046.5], 0.12);
  }

  // Play playful silly goose "honk" (gentle cartoon oboe/reed style)
  public playHonk() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Dual oscillator for a silly friendly brassy duck/goose chirp
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(3.5, now);

      // Pitch glide
      osc1.frequency.setValueAtTime(240, now);
      osc1.frequency.exponentialRampToValueAtTime(380, now + 0.06);
      osc1.frequency.exponentialRampToValueAtTime(220, now + 0.18);

      osc2.frequency.setValueAtTime(244, now);
      osc2.frequency.exponentialRampToValueAtTime(385, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(225, now + 0.18);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.25);
      osc2.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  // Sweet music box notes
  private playChimeNotes(freqs: number[], duration: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gain.gain.setValueAtTime(0, now + idx * duration);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * duration + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * duration + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * duration);
        osc.stop(now + idx * duration + 0.55);
      });
    } catch {
      // ignore
    }
  }

  public stopLullaby() {
    this.isPlayingLullaby = false;
    if (this.lullabyTimeout) {
      clearTimeout(this.lullabyTimeout);
      this.lullabyTimeout = null;
    }
  }

  // Soft music box lullaby loop
  public startLullaby() {
    if (this.isPlayingLullaby || this.isMuted) return;
    this.isPlayingLullaby = true;
    this.initCtx();

    // Notes of a sweet baby lullaby (Brahms Lullaby motif)
    const notes = [
      { f: 523.25, d: 400 }, // C5
      { f: 523.25, d: 400 }, // C5
      { f: 587.33, d: 600 }, // D5
      { f: 523.25, d: 600 }, // C5
      { f: 659.25, d: 800 }, // E5
      { f: 587.33, d: 1000 },// D5
      { f: 493.88, d: 400 }, // B4
      { f: 523.25, d: 600 }, // C5
      { f: 587.33, d: 600 }, // D5
      { f: 493.88, d: 800 }, // B4
      { f: 392.00, d: 1200 },// G4
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingLullaby || this.isMuted) return;
      const note = notes[noteIdx];
      this.playMusicBoxNote(note.f);
      noteIdx = (noteIdx + 1) % notes.length;
      this.lullabyTimeout = window.setTimeout(playNext, note.d + 300);
    };

    playNext();
  }

  private playMusicBoxNote(freq: number) {
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundEffectsManager();
