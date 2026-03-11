import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import { X, ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, title: 'FILM NOIR', category: 'SHORT FILM', image: '/images/portfolio-1.jpg', year: '2024', description: 'A cinematic exploration of shadow and light in urban landscapes.' },
  { id: 2, title: 'THE LENS', category: 'DOCUMENTARY', image: '/images/portfolio-2.jpg', year: '2024', description: 'Behind the scenes of professional cinematography.' },
  { id: 3, title: 'NIGHTFALL', category: 'MUSIC VIDEO', image: '/images/portfolio-3.jpg', year: '2023', description: 'Moody urban nightscapes set to ambient electronic music.' },
  { id: 4, title: 'PORTRAIT', category: 'COMMERCIAL', image: '/images/portfolio-4.jpg', year: '2023', description: 'High-contrast character study for luxury fashion brand.' },
  { id: 5, title: 'VELOCITY', category: 'BRAND FILM', image: '/images/portfolio-5.jpg', year: '2024', description: 'Abstract motion study exploring speed and light.' },
  { id: 6, title: 'TIDAL', category: 'SHORT FILM', image: '/images/portfolio-6.jpg', year: '2023', description: 'Dramatic coastal cinematography capturing raw natural power.' },
];

const layouts = [
  { x: '5%', y: '0%', w: 'w-[280px] md:w-[380px]', z: 3, delay: 0 },
  { x: '55%', y: '5%', w: 'w-[240px] md:w-[320px]', z: 2, delay: 0.1 },
  { x: '25%', y: '35%', w: 'w-[260px] md:w-[350px]', z: 4, delay: 0.2 },
  { x: '65%', y: '40%', w: 'w-[200px] md:w-[280px]', z: 1, delay: 0.3 },
  { x: '8%', y: '65%', w: 'w-[230px] md:w-[310px]', z: 2, delay: 0.4 },
  { x: '50%', y: '70%', w: 'w-[270px] md:w-[360px]', z: 3, delay: 0.5 },
];

function PortfolioCard({ project, layout, index }: { project: typeof projects[0]; layout: typeof layouts[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const { normalized } = useMousePosition();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    setIsHovered(true);
    setShowGlitch(true);
    setTimeout(() => setShowGlitch(false), 200);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`absolute ${layout.w} cursor-pointer group`}
      style={{
        left: layout.x,
        top: layout.y,
        zIndex: isHovered ? 50 : layout.z,
      }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: layout.delay, ease: [0.76, 0, 0.24, 1] }}
      animate={{
        y: isHovered ? -10 : Math.sin(Date.now() / 3000 + index) * 5,
        x: normalized.x * (3 + index * 1.5),
        rotateY: normalized.x * (1 + index * 0.3),
        rotateX: normalized.y * -(1 + index * 0.3),
      }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.04 }}
    >
      <div className="relative overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Image */}
        <motion.div
          className="relative aspect-[16/10] overflow-hidden bg-smoke"
          animate={{
            boxShadow: isHovered
              ? '0 0 40px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.8)'
              : '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale"
            animate={{
              scale: isHovered ? 1.08 : 1,
              filter: isHovered ? 'grayscale(100%) brightness(0.7)' : 'grayscale(100%) brightness(0.5)',
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Glitch effect */}
          {showGlitch && (
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(3px)', background: 'rgba(255,255,255,0.05)' }} />
              <div className="absolute inset-0" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(-3px)', background: 'rgba(255,255,255,0.03)' }} />
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="relative z-10 flex items-center gap-2 border border-white/30 px-5 py-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink size={12} />
              <span className="font-outfit text-[10px] tracking-[0.3em] text-bone">VIEW</span>
            </motion.div>
          </motion.div>

          {/* White glow border */}
          <motion.div
            className="absolute inset-0 border border-white/0"
            animate={{ borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)' }}
            transition={{ duration: 0.3 }}
          />

        </motion.div>

      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const { ref } = useInView(0.1);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="work" className="relative py-20 md:py-32" ref={ref}>
      {/* Section header */}
      <div className="px-6 md:px-12 mb-16">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[1px] w-12 bg-white/20" />
          <span className="font-outfit text-[10px] tracking-[0.5em] text-white/30 uppercase">Selected Work</span>
        </motion.div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-none tracking-[0.05em] text-bone"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            PORTFOLIO
          </motion.h2>
        </div>
      </div>

      {/* Floating portfolio grid */}
      <div className="relative mx-auto max-w-6xl px-6" style={{ height: 'clamp(800px, 120vw, 1200px)' }}>
        {projects.map((project, i) => (
          <div key={project.id} onClick={() => setSelectedProject(project)}>
            <PortfolioCard project={project} layout={layouts[i]} index={i} />
          </div>
        ))}
      </div>

      {/* Fullscreen project view */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative w-[90vw] max-w-4xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full aspect-video object-cover grayscale"
              />
              <div className="mt-6 flex items-start justify-between">
                <div>
                  <h3 className="font-syne text-2xl font-700 text-bone">{selectedProject.title}</h3>
                  <p className="font-outfit text-sm text-white/40 mt-1">{selectedProject.description}</p>
                  <p className="font-outfit text-[10px] tracking-[0.3em] text-white/20 mt-2">{selectedProject.category} · {selectedProject.year}</p>
                </div>
                <motion.button
                  className="p-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
