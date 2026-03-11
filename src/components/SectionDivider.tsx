import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <motion.div
      className="relative h-[1px] mx-6 md:mx-12 my-4"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      style={{ transformOrigin: 'left' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}
