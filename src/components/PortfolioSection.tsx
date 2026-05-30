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

const discordServers = [
  { id: 1, name: 'SOLITUDE', image: '/images/solitude-server.png', role: 'Owner', invite: 'https://discord.gg/nTm4V8X9Xs' },
];

const layouts = [
  { x: '5%', y: '0%', w: 'w-[280px] md:w-[380px]', z: 3, delay: 0 },
  { x: '55%', y: '5%', w: 'w-[240px] md:w-[320px]', z: 2, delay: 0.1 },
  { x: '25%', y: '35%', w: 'w-[260px] md:w-[350px]', z: 4, delay: 0.2 },
  { x: '65%', y: '40%', w: 'w-[200px] md:w-[280px]', z: 1, delay: 0.3 },
  { x: '8%', y: '65%', w: 'w-[230px] md:w-[310px]', z: 2, delay: 0.4 },
  { x: '50%', y: '70%', w: 'w-[270px] md:w-[360px]', z: 3, delay: 0.5 },
];

const DiscordIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

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
      style={{ left: layout.x, top: layout.y, zIndex: isHovered ? 50 : layout.z }}
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
          {showGlitch && (
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(3px)', background: 'rgba(255,255,255,0.05)' }} />
              <div className="absolute inset-0" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(-3px)', background: 'rgba(255,255,255,0.03)' }} />
            </div>
          )}
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
  const [selectedServer, setSelectedServer] = useState<typeof discordServers[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'servers'>('work');

  const tabs = [
    { id: 'work' as const, label: 'SELECTED WORK' },
    { id: 'servers' as const, label: 'DISCORD SERVERS' },
  ];

  return (
    <section id="work" className="relative py-20 md:py-32" ref={ref}>
      {/* Section header */}
      <div className="px-6 md:px-12 mb-10">
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
        <div className="overflow-hidden mb-8">
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

        {/* Sub-category tabs */}
        <div className="flex items-center gap-0 border-b border-white/10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className="relative pb-3 mr-8 font-outfit text-[10px] tracking-[0.35em] transition-colors duration-300"
              style={{ color: activeTab === tab.id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)' }}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-bone"
                  layoutId="activeTab"
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'work' && (
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative mx-auto max-w-6xl px-6" style={{ height: 'clamp(800px, 120vw, 1200px)' }}>
              {projects.map((project, i) => (
                <div key={project.id} onClick={() => setSelectedProject(project)}>
                  <PortfolioCard project={project} layout={layouts[i]} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'servers' && (
          <motion.div
            key="servers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="px-6 md:px-12"
          >
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h3
                  className="font-bebas text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-[0.05em] text-white/40"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  OWNED SERVERS
                </motion.h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-8">
              {discordServers.map((server, i) => (
                <motion.div
                  key={server.id}
                  className="group relative w-full max-w-[480px] cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedServer(server)}
                >
                  <motion.div
                    className="relative aspect-[16/7] overflow-hidden bg-smoke"
                    whileHover={{ boxShadow: '0 0 40px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.8)' }}
                    style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={server.image}
                      alt={server.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center gap-2 border border-white/30 px-5 py-2">
                        <DiscordIcon size={13} />
                        <span className="font-outfit text-[10px] tracking-[0.3em] text-bone">VIEW SERVER</span>
                      </div>
                    </motion.div>
                    <motion.div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-300" />
                  </motion.div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bebas text-xl tracking-[0.1em] text-bone">{server.name}</h4>
                      <p className="font-outfit text-[9px] tracking-[0.3em] text-white/30 uppercase mt-0.5">Discord Server · {server.role}</p>
                    </div>
                    <ExternalLink size={14} className="text-white/20 group-hover:text-white/60 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio project modal */}
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
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full aspect-video object-cover grayscale" />
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

      {/* Discord server modal */}
      <AnimatePresence>
        {selectedServer && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedServer(null)}
          >
            <motion.div
              className="relative w-[90vw] max-w-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedServer.image}
                alt={selectedServer.name}
                className="w-full aspect-[16/7] object-cover"
              />
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h3 className="font-bebas text-3xl tracking-[0.1em] text-bone">{selectedServer.name}</h3>
                  <p className="font-outfit text-[9px] tracking-[0.35em] text-white/30 uppercase mt-1">Discord Server · {selectedServer.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={selectedServer.invite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 font-outfit text-[10px] tracking-[0.3em] hover:bg-white/80 transition-colors duration-300"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <DiscordIcon size={13} />
                    JOIN SERVER
                  </motion.a>
                  <motion.button
                    className="p-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedServer(null)}
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
