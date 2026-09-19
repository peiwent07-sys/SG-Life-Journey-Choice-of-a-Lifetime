/**
 * Retro Chiptune Web Audio Synthesizer for SG Life Journey
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmOsc: OscillatorNode | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTone(freq: number, type: OscillatorType = 'square', duration: number = 0.1, gainVal: number = 0.08) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context policy safe guard
    }
  }

  public playFootstep() {
    this.playTone(160, 'triangle', 0.03, 0.02);
  }

  public playClick() {
    this.playTone(480, 'square', 0.05, 0.04);
  }

  public playSelect() {
    this.playTone(440, 'square', 0.06, 0.05);
    setTimeout(() => this.playTone(880, 'square', 0.08, 0.05), 60);
  }

  public playWarning() {
    this.playTone(220, 'sawtooth', 0.15, 0.09);
    setTimeout(() => this.playTone(160, 'sawtooth', 0.22, 0.11), 120);
  }

  public playResistSuccess() {
    // Triumphant resilience chime
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.14, 0.07);
      }, idx * 70);
    });
  }

  public playDrugAcceptDamage() {
    // Heavy harsh buzzer slide down
    this.initCtx();
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  public playEatMeal() {
    this.playTone(330, 'triangle', 0.08, 0.06);
    setTimeout(() => this.playTone(493.88, 'triangle', 0.1, 0.06), 70);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.14, 0.06), 140);
  }

  public playStudyChime() {
    this.playTone(587.33, 'sine', 0.1, 0.05); // D5
    setTimeout(() => this.playTone(739.99, 'sine', 0.15, 0.05), 90); // F#5
  }

  public playMrtChime() {
    // SMRT iconic 3-tone chime (G4, B4, D5)
    const tones = [392, 493.88, 587.33];
    tones.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.18, 0.07);
      }, idx * 160);
    });
  }

  public playTemptationBuzz() {
    // Ominous low distorted buzz
    this.playTone(110, 'sawtooth', 0.28, 0.08);
  }

  public playHeartbeatTinnitus() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // 1. Accelerating then slowing cardiac heartbeat thumps
      const heartbeats = [0, 180, 340, 480, 600, 750, 950, 1200, 1500];
      heartbeats.forEach(ms => {
        setTimeout(() => {
          this.playTone(62, 'triangle', 0.12, 0.16);
          setTimeout(() => this.playTone(48, 'sine', 0.15, 0.14), 60);
        }, ms);
      });

      // 2. High-pitched syncope / fainting tinnitus sine wave
      const tinnitusOsc = this.ctx.createOscillator();
      const tinnitusGain = this.ctx.createGain();
      tinnitusOsc.type = 'sine';
      tinnitusOsc.frequency.setValueAtTime(3600, this.ctx.currentTime);
      tinnitusGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      tinnitusGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.8);
      tinnitusGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

      tinnitusOsc.connect(tinnitusGain);
      tinnitusGain.connect(this.ctx.destination);
      tinnitusOsc.start(this.ctx.currentTime + 0.2);
      tinnitusOsc.stop(this.ctx.currentTime + 3.2);
    } catch {
      // Ignore
    }
  }

  public playLevelUp() {
    const fanfare = [440, 554.37, 659.25, 880];
    fanfare.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.2, 0.08);
      }, idx * 90);
    });
  }

  public playEndingFanfare() {
    const melody = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    melody.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.18, 0.08);
      }, i * 90);
    });
  }

  public startAmbientBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Gentle calm 8-bit pentatonic sequence
      const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00];
      let step = 0;
      const interval = setInterval(() => {
        if (!this.isBgmPlaying || this.isMuted) {
          clearInterval(interval);
          return;
        }
        const freq = pentatonic[step % pentatonic.length];
        this.playTone(freq, 'sine', 0.12, 0.018);
        step = (step + 1) % 16;
      }, 360);
      this.isBgmPlaying = true;
    } catch {
      // Ignore
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
  }
}

export const soundEngine = new RetroAudioEngine();
