import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrambleText } from '../lib/textScramble';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [showFlicker, setShowFlicker] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  const triggerFlicker = useCallback(() => {
    setShowFlicker(true);
    setTimeout(() => setShowFlicker(false), 100);
    setTimeout(() => { setShowFlicker(true); setTimeout(() => setShowFlicker(false), 50); }, 200);
    setTimeout(() => { setShowFlicker(true); setTimeout(() => setShowFlicker(false), 80); }, 400);
  }, []);

  const triggerGlitch = useCallback(() => {
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), 150);
  }, []);

  useEffect(() => {
    // Phase 0: Black screen
    const t1 = setTimeout(() => setPhase(1), 600);
    // Phase 1: Grain fades in
    const t2 = setTimeout(() => { setPhase(2); triggerFlicker(); }, 1400);
    // Phase 2: Flicker
    const t3 = setTimeout(() => { setPhase(3); triggerGlitch(); }, 2200);
    // Phase 3: Glitch + title scramble
    const t4 = setTimeout(() => {
      scrambleText('VIDEO EDITOR', setTitleText, undefined, 1000);
    }, 2400);
    const t5 = setTimeout(() => {
      scrambleText('PORTFOLIO  ·  2026', setSubtitleText, undefined, 800);
    }, 3000);
    // Phase 4: Shake impact
    const t6 = setTimeout(() => { setPhase(4); triggerGlitch(); }, 3600);
    // Phase 5: Hold
    const t7 = setTimeout(() => setPhase(5), 4800);
    // Complete
    const t8 = setTimeout(() => onComplete(), 5800);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout);
    };
  }, [onComplete, triggerFlicker, triggerGlitch]);

  return (
    <AnimatePresence>
      {phase < 6 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-void flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Film grain in intro */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.06 : 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="film-grain" style={{ opacity: 1 }} />
          </motion.div>

          {/* Flicker overlay */}
          {showFlicker && (
            <div className="absolute inset-0 bg-white/[0.04] z-10" />
          )}

          {/* Light streaks */}
          {phase >= 2 && (
            <>
              <motion.div
                className="absolute w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%', rotate: -15 }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, ease: 'linear' }}
                style={{ top: '40%' }}
              />
              <motion.div
                className="absolute w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '200%', rotate: 10 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 2.5, ease: 'linear', delay: 0.3 }}
                style={{ top: '55%' }}
              />
            </>
          )}

          {/* Glitch layers */}
          {showGlitch && (
            <>
              <div
                className="absolute inset-0 z-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                }}
              />
              <div
                className="absolute inset-0 z-20"
                style={{
                  clipPath: 'inset(30% 0 60% 0)',
                  transform: 'translateX(4px)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              />
            </>
          )}

          {/* Dust particles */}
          {phase >= 1 && (
            <div className="absolute inset-0 z-5">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: Math.random() * 2 + 1,
                    height: Math.random() * 2 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30 - Math.random() * 50],
                    x: [0, (Math.random() - 0.5) * 20],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          )}

          {/* Main title */}
          <div className="relative z-30 text-center">
            <motion.div
              animate={phase === 4 ? { x: [0, -3, 3, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="font-bebas text-[clamp(3rem,12vw,10rem)] leading-none tracking-[0.15em] text-bone"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                  letterSpacing: phase >= 4 ? '0.15em' : '0.5em',
                  filter: phase >= 4 ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                {titleText || '\u00A0'}
              </motion.h1>

              <motion.div
                className="flex items-center justify-center gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: phase >= 4 ? 0.6 : 0,
                  y: phase >= 4 ? 0 : 20,
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="h-[1px] w-12 bg-white/40" />
                <p className="font-outfit text-sm tracking-[0.4em] text-white/60 uppercase">
                  {subtitleText || '\u00A0'}
                </p>
                <div className="h-[1px] w-12 bg-white/40" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5.5, ease: 'linear' }}
          />

          {/* Fade to zoom-out */}
          {phase >= 5 && (
            <motion.div
              className="absolute inset-0 bg-void z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
