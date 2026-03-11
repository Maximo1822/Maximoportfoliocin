import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = ['WORK', 'SERVICES', 'SKILLS', 'CONTACT'];

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.5)' }}
    >
      <motion.div
        className="font-bebas text-2xl tracking-[0.2em] text-bone cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        WORK<span className="text-white/30">.</span>
      </motion.div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, i) => (
          <motion.button
            key={item}
            className="relative font-outfit text-xs tracking-[0.3em] text-white/60 hover:text-bone transition-colors duration-300 py-1"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => scrollTo(item)}
            whileHover={{ y: -1 }}
          >
            {item}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-bone"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIdx === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.button>
        ))}
      </div>

      <motion.button
        className="font-outfit text-xs tracking-[0.2em] border border-white/20 px-5 py-2 text-white/80 hover:bg-white hover:text-black transition-all duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollTo('CONTACT')}
      >
        GET IN TOUCH
      </motion.button>
    </motion.nav>
  );
}
