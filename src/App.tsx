import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSequence from './components/IntroSequence';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeText from './components/MarqueeText';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FilmGrain from './components/FilmGrain';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="relative bg-void text-bone min-h-screen">
      {/* Global overlays */}
      <FilmGrain />
      <CursorGlow />

      {/* Intro sequence */}
      <AnimatePresence>
        {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <ScrollProgress />
          <Navbar />

          <main>
            <HeroSection />
            <MarqueeText text="EDITING · COLOR GRADING · MOTION DESIGN · VFX · SOUND DESIGN · STORYTELLING" speed={25} />
            <SectionDivider />
            <PortfolioSection />
            <SectionDivider />
            <StatsSection />
            <SectionDivider />
            <ServicesSection />
            <SectionDivider />
            <SkillsSection />
            <SectionDivider />
            <ContactSection />
            <Footer />
          </main>
        </motion.div>
      )}
    </div>
  );
}
