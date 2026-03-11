import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 2, suffix: '+', label: 'YEARS EXPERIENCE' },
];

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInViewport) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * stat.value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInViewport, stat.value]);

  return (
    <motion.div
      ref={ref}
      className="text-center group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="font-bebas text-[clamp(2.5rem,5vw,4rem)] text-bone leading-none">
        {count}{stat.suffix}
      </div>
      <div className="mt-2 font-outfit text-[9px] tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors duration-300">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
