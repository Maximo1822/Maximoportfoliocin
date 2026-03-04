import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'PREMIERE PRO', level: 95 },
  { name: 'AFTER EFFECTS', level: 90 },
  { name: 'DAVINCI RESOLVE', level: 88 },
  { name: 'FINAL CUT PRO', level: 82 },
  { name: 'CINEMA 4D', level: 70 },
  { name: 'PHOTOSHOP', level: 85 },
];

const software = [
  { name: 'Adobe Premiere Pro', category: 'NLE' },
  { name: 'After Effects', category: 'MOTION' },
  { name: 'DaVinci Resolve', category: 'COLOR' },
  { name: 'Cinema 4D', category: '3D' },
  { name: 'Audition', category: 'AUDIO' },
  { name: 'Nuke', category: 'VFX' },
];

function AnimatedCounter({ target, isActive }: { target: number; isActive: boolean }) {
  const [count, setCount] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 200);
      }
    };

    requestAnimationFrame(animate);
  }, [isActive, target]);

  return (
    <span className={`font-bebas text-2xl tabular-nums ${showGlitch ? 'opacity-80' : ''}`}>
      {count}%
    </span>
  );
}

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-syne text-xs font-600 tracking-[0.2em] text-white/60 group-hover:text-bone transition-colors duration-300">
          {skill.name}
        </span>
        <AnimatedCounter target={skill.level} isActive={isInViewport} />
      </div>
      <div className="relative h-[2px] bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/40 to-white/80"
          initial={{ width: '0%' }}
          animate={isInViewport ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Glow at tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/20 blur-sm"
          initial={{ left: '0%' }}
          animate={isInViewport ? { left: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 md:py-32 px-6 md:px-12">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[1px] w-12 bg-white/20" />
          <span className="font-outfit text-[10px] tracking-[0.5em] text-white/30 uppercase">Expertise</span>
        </motion.div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none tracking-[0.05em] text-bone"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            SKILLS & TOOLS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Software grid */}
          <div>
            <p className="font-outfit text-[10px] tracking-[0.4em] text-white/30 uppercase mb-8">Software Stack</p>
            <div className="grid grid-cols-2 gap-3">
              {software.map((sw, i) => (
                <motion.div
                  key={sw.name}
                  className="group border border-white/[0.06] p-5 hover:border-white/15 transition-all duration-500 cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <span className="font-outfit text-[9px] tracking-[0.3em] text-white/20 uppercase block mb-2">{sw.category}</span>
                  <span className="font-syne text-sm font-600 text-white/60 group-hover:text-bone transition-colors duration-300">{sw.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
