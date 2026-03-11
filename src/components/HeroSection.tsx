import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { Play, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { normalized } = useMousePosition();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          x: normalized.x * 10,
          y: normalized.y * 10,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      {/* Abstract light streaks */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: normalized.x * 30 }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: normalized.x * -20 }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      />

      {/* Floating dust */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/15"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 40)],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Large background text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        animate={{ x: normalized.x * -15, y: normalized.y * -10 }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      >
        <span className="font-bebas text-[clamp(6rem,25vw,20rem)] text-white/[0.02] leading-none tracking-[0.1em]">
          CINEMA
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="overflow-hidden">
          <motion.h1
            className="font-syne text-[clamp(2.5rem,8vw,7rem)] font-800 leading-[0.9] tracking-tight text-bone"
            initial={{ y: '120%', rotateX: -40 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          >
            MAXIMO
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 font-outfit text-sm md:text-base text-white/40 max-w-md mx-auto tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Transforming raw footage into cinematic experiences through
          precision editing, color grading, and visual storytelling.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.button
            className="group flex items-center gap-3 border border-white/20 px-8 py-3.5 font-outfit text-xs tracking-[0.3em] text-bone hover:bg-bone hover:text-void transition-all duration-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play size={12} className="group-hover:scale-110 transition-transform" />
            VIEW WORK
          </motion.button>
          <motion.button
            className="font-outfit text-xs tracking-[0.3em] text-white/40 hover:text-bone transition-colors duration-300 underline underline-offset-4 decoration-white/10 hover:decoration-white/40"
            whileHover={{ scale: 1.03 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            CONTACT
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/10" />
        <span className="font-outfit text-[8px] tracking-[0.3em] text-white/20 vertical-text" style={{ writingMode: 'vertical-rl' }}>WORK — 2025</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </section>
  );
}
