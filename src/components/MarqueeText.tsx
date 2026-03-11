import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function MarqueeText({ text, speed = 20, className = '' }: MarqueeTextProps) {
  const repeated = `${text} · `.repeat(10);
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <span className="font-bebas text-[clamp(3rem,10vw,8rem)] text-white/[0.03] tracking-[0.1em] select-none">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}
