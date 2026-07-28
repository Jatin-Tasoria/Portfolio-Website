import React, { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WipPage from './components/WipPage';
import LinuxDemoPage from './components/LinuxDemoPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [activeWipProject, setActiveWipProject] = useState(null);
  const [activeLinuxDemoProject, setActiveLinuxDemoProject] = useState(null);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects 
            onWipClick={setActiveWipProject} 
            onLinuxDemoClick={setActiveLinuxDemoProject} 
          />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] relative z-10 text-center">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
            <p className="text-sm text-[var(--text-secondary)]">
              © 2026 Jatin Tasoria. All rights reserved.
            </p>
          </div>
        </footer>

        {/* WIP Demo Overlay Page */}
        <AnimatePresence>
          {activeWipProject && (
            <WipPage
              project={activeWipProject}
              onClose={() => setActiveWipProject(null)}
            />
          )}
        </AnimatePresence>

        {/* Linux Demo Overlay Page */}
        <AnimatePresence>
          {activeLinuxDemoProject && (
            <LinuxDemoPage
              project={activeLinuxDemoProject}
              onClose={() => setActiveLinuxDemoProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}

export default App;
