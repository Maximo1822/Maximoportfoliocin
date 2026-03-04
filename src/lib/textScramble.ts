const chars = '!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz';

export function scrambleText(
  target: string,
  onUpdate: (text: string) => void,
  onComplete?: () => void,
  duration = 1200
) {
  let frame = 0;
  const totalFrames = Math.floor(duration / 30);
  const interval = setInterval(() => {
    const progress = frame / totalFrames;
    let result = '';
    for (let i = 0; i < target.length; i++) {
      if (target[i] === ' ') {
        result += ' ';
      } else if (progress * target.length > i) {
        result += target[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    onUpdate(result);
    frame++;
    if (frame > totalFrames) {
      clearInterval(interval);
      onUpdate(target);
      onComplete?.();
    }
  }, 30);
  return () => clearInterval(interval);
}
