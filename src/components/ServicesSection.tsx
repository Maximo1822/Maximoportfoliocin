import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Scissors } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';

const services = [
  { icon: Scissors, title: 'VIDEO EDITING', desc: 'Precision cutting, pacing, and narrative structure for films, commercials, and digital content.' },
  { icon: Film, title: 'MOTION GRAPHICS', desc: 'Dynamic titles, transitions, and visual effects that elevate production value.' },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const { normalized } = useMousePosition();
  const Icon = service.icon;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 150);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative p-8 border border-white/[0.06] bg-white/[0.01] overflow-hidden"
        animate={{
          rotateX: isHovered ? normalized.y * -3 : 0,
          rotateY: isHovered ? normalized.x * 3 : 0,
          borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0,0,0,0.5), inset 0 0 60px rgba(255,255,255,0.02)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glitch flash */}
        {showGlitch && (
          <div className="absolute inset-0 bg-white/[0.03] z-10" />
        )}

        <div className="relative z-10">
          <motion.div
            className="mb-5"
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={24} strokeWidth={1} className="text-white/40 group-hover:text-bone transition-colors duration-500" />
          </motion.div>

          <h3 className="font-syne text-base font-700 tracking-wide text-bone mb-3">{service.title}</h3>
          <p className="font-outfit text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-500">{service.desc}</p>
        </div>

        {/* Bottom line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white/20"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/0 group-hover:border-white/20 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/0 group-hover:border-white/20 transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-32 px-6 md:px-12">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-bebas text-[clamp(5rem,20vw,16rem)] text-white/[0.015] tracking-[0.15em]">
          SERVICES
        </span>
      </div>

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
          <span className="font-outfit text-[10px] tracking-[0.5em] text-white/30 uppercase">What I Do</span>
        </motion.div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none tracking-[0.05em] text-bone"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            SERVICES
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
