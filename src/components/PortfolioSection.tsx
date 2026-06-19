import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, ExternalLink } from 'lucide-react';

const graphicDesigns = [
  { id: 1, title: 'ENDERMAN', category: 'GRAPHIC DESIGN', image: '/images/graphic-design-1.png', year: '2026', description: 'Custom Minecraft skin render with stylised purple glow aesthetic.' },
];

const discordServers = [
  { id: 1, name: 'SOLITUDE', image: '/images/solitude-server.png', role: 'Owner', invite: 'https://discord.gg/nTm4V8X9Xs' },
];

const DiscordIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function PortfolioSection() {
  const { ref } = useInView(0.1);
  const [selectedDesign, setSelectedDesign] = useState<typeof graphicDesigns[0] | null>(null);
  const [selectedServer, setSelectedServer] = useState<typeof discordServers[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'servers'>('work');

  const tabs = [
    { id: 'work' as const, label: 'GRAPHIC DESIGNING' },
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
        <div className="flex items-center border-b border-white/10">
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
            className="px-6 md:px-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {graphicDesigns.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedDesign(item)}
                >
                  <motion.div
                    className="relative overflow-hidden bg-smoke"
                    whileHover={{ boxShadow: '0 0 40px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.8)' }}
                    style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center gap-2 border border-white/30 px-5 py-2">
                        <ExternalLink size={11} />
                        <span className="font-outfit text-[10px] tracking-[0.3em] text-bone">VIEW</span>
                      </div>
                    </motion.div>
                    <motion.div className="absolute inset-0 border border-white/0 group-hover:border-white/15 transition-colors duration-300" />
                  </motion.div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bebas text-lg tracking-[0.1em] text-bone">{item.title}</h4>
                      <p className="font-outfit text-[9px] tracking-[0.3em] text-white/30 uppercase mt-0.5">{item.category} · {item.year}</p>
                    </div>
                  </div>
                </motion.div>
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
            <div className="mb-8 overflow-hidden">
              <motion.h3
                className="font-bebas text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-[0.05em] text-white/40"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                OWNED SERVERS
              </motion.h3>
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
                    <motion.div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      {/* Graphic design modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              className="relative w-[90vw] max-w-xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedDesign.image} alt={selectedDesign.title} className="w-full object-cover" />
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="font-bebas text-2xl tracking-[0.1em] text-bone">{selectedDesign.title}</h3>
                  <p className="font-outfit text-xs text-white/40 mt-1">{selectedDesign.description}</p>
                  <p className="font-outfit text-[9px] tracking-[0.3em] text-white/20 mt-1.5">{selectedDesign.category} · {selectedDesign.year}</p>
                </div>
                <motion.button
                  className="p-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDesign(null)}
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
              <img src={selectedServer.image} alt={selectedServer.name} className="w-full aspect-[16/7] object-cover" />
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
                    className="flex items-center gap-1.5 border border-white/30 px-4 py-2 font-outfit text-[9px] tracking-[0.25em] text-white/70 hover:text-bone hover:border-white/60 transition-colors duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <DiscordIcon size={11} />
                    JOIN
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
