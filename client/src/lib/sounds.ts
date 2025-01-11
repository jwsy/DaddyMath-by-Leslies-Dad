let audioContext: AudioContext | null = null;

const sounds = {
  click: [200, 50],
  success: [400, 100],
  error: [200, 200]
};

export function playSound(name: keyof typeof sounds) {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  const [freq, duration] = sounds[name];
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
  gain.gain.setValueAtTime(0, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}
