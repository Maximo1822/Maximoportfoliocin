import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Send } from 'lucide-react';

export default function ContactSection() {
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleClick = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="group">
                <label className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase block mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 pb-3 font-outfit text-sm text-bone focus:outline-none focus:border-white/30 transition-colors duration-500 placeholder:text-white/10"
                  placeholder="Your name"
                />
              </div>
              <div className="group">
                <label className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 pb-3 font-outfit text-sm text-bone focus:outline-none focus:border-white/30 transition-colors duration-500 placeholder:text-white/10"
                  placeholder="your@email.com"
                />
              </div>
              <div className="group">
                <label className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase block mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 pb-3 font-outfit text-sm text-bone focus:outline-none focus:border-white/30 transition-colors duration-500 placeholder:text-white/10 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                className="relative group flex items-center gap-3 border border-white/20 px-10 py-4 font-outfit text-xs tracking-[0.3em] text-bone hover:bg-bone hover:text-void transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHoveredBtn(true)}
                onMouseLeave={() => setIsHoveredBtn(false)}
                onClick={handleClick}
              >
                {/* Ripple */}
                {showRipple && (
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ borderRadius: '50%', transformOrigin: 'center' }}
                  />
                )}

                {/* Glow */}
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  animate={{ opacity: isHoveredBtn ? [0.05, 0.1, 0.05] : 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <Send size={12} />
                <span className="relative z-10">SEND MESSAGE</span>
                <ArrowUpRight size={12} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              <div className="group cursor-default">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={14} className="text-white/30" />
                  <span className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase">Email</span>
                </div>
                <p className="font-syne text-lg font-600 text-white/60 group-hover:text-bone transition-colors duration-300">bharswat.c.editor@gmail.com</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-outfit text-[9px] tracking-[0.4em] text-white/20 uppercase mb-4">Follow</p>
              <div className="flex gap-4">
                {['DISCORD'].map((social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="font-outfit text-[10px] tracking-[0.2em] text-white/30 hover:text-bone transition-colors duration-300 relative"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
