import { Audio } from "expo-av";

class AudioEngine {
  private static instance: AudioEngine;

  private registry: Record<string, any> = {}; // loaded sounds
  private bgMusic: Audio.Sound | null = null;

  private constructor() {} // private constructor for singleton

  static getInstance() {
    if (!this.instance) this.instance = new AudioEngine();
    return this.instance;
  }

  // ----------------------
  // Initialize audio mode
  // ----------------------
  async initAudioMode() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true, // iOS: play even if silent mode
      staysActiveInBackground: false,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }

  // ----------------------
  // Preload any sound
  // ----------------------
  async preload(key: string, file: any) {
    if (this.registry[key]) return;
    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: false });
    this.registry[key] = sound;
  }

  // ----------------------
  // Play SFX
  // ----------------------
  async sfx(key: string) {
    const sound = this.registry[key];
    if (!sound) return;
    await sound.replayAsync();
  }

  // ----------------------
  // Play background music with fade
  // ----------------------
async playMusic(key: string, fade = 700) {
  const sound = this.registry[key];
  if (!sound) return console.warn(`Music ${key} not loaded`);
  console.log(`▶️ Attempting to play music: ${key}`);

  if (this.bgMusic && this.bgMusic !== sound) {
    console.log(`🔄 Fading out previous bgMusic`);
    await this.fadeOut(this.bgMusic, fade);
    await this.bgMusic.stopAsync();
  }

  this.bgMusic = sound;
  await this.bgMusic.setIsLoopingAsync(false);
  console.log(`🔊 Starting fade in for: ${key}`);
  await this.fadeIn(this.bgMusic, fade);
  console.log(`✅ Music ${key} is now playing`);
}

private async fadeIn(sound: Audio.Sound, duration: number) {
  await sound.setVolumeAsync(0);
  await sound.playAsync();
  const steps = 10;
  const interval = duration / steps;

  for (let i = 1; i <= steps; i++) {
    await sound.setVolumeAsync(i / steps);
    await new Promise(r => setTimeout(r, interval));
    console.log(`🎚 FadeIn step ${i}/${steps}, volume: ${i / steps}`);
  }
}


  // ----------------------
  // Cleanup all sounds
  // ----------------------
  async unloadAll() {
    for (const sound of Object.values(this.registry)) {
      try {
        await sound.unloadAsync();
      } catch (err) {
        console.warn("Error unloading sound", err);
      }
    }
    this.registry = {};
    this.bgMusic = null;
  }
}

// Singleton instance
export const audioEngine = AudioEngine.getInstance();
