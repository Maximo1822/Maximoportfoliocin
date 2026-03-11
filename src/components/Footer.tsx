import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="font-bebas text-lg tracking-[0.2em] text-white/20"
          whileHover={{ color: 'rgba(255,255,255,0.6)' }}
        >
          WORK<span className="text-white/10">.</span>
        </motion.div>

        <p className="font-outfit text-[10px] tracking-[0.3em] text-white/15">
          © 2025 — ALL RIGHTS RESERVED
        </p>

        <motion.button
          className="font-outfit text-[10px] tracking-[0.3em] text-white/20 hover:text-bone transition-colors duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
        >
          BACK TO TOP ↑
        </motion.button>
      </div>
    </footer>
  );
}
