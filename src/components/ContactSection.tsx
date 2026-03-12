import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[1px] bg-gradient-to-l from-transparent via-white/5 to-transparent"
          animate={{ x: [100, -100, 100] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-white/3 to-transparent"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-bebas text-[clamp(4rem,18vw,14rem)] text-white/[0.015] tracking-[0.15em]">
          CONTACT
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase mb-4">Follow</p>
          <div className="flex gap-4">
            <motion.a
              href="https://discord.com/users/maximo_y"
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-[10px] tracking-[0.2em] text-white/30 hover:text-bone transition-colors duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              maximo_y
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
