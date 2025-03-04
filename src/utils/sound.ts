"use client";

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement | null } = {};
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Only initialize sounds in browser environment
      this.sounds = {
        click: new Audio('/sounds/click.wav'),
        flag: new Audio('/sounds/flag.wav'),
        mine: new Audio('/sounds/mine.wav'),
        win: new Audio('/sounds/win.wav'),
        lose: new Audio('/sounds/lose.wav'),
      };

      // Set volume
      Object.values(this.sounds).forEach(sound => {
        if (sound) sound.volume = 0.3;
      });
    }
  }

  play(soundName: keyof typeof this.sounds) {
    if (this.isMuted || typeof window === 'undefined') return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors from browsers blocking autoplay
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const soundManager = new SoundManager(); 