import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import ShinyText from './ReactBits/ShinyText';
import { motion } from 'framer-motion';
import TechStackCard from './TechStackCard';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] max-h-[650px] md:max-h-[750px] lg:max-h-[850px] flex items-center pt-20 pb-8 md:pb-12 lg:pt-24 lg:pb-16 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background Glow Blobs */}
      <div className="glow-bg top-[15%] left-[10%] bg-[var(--accent)]/15" />
      <div className="glow-bg bottom-[10%] right-[10%] bg-[var(--accent-rose)]/25" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Intro Text Column */}
        <div className="md:col-span-7 flex flex-col items-start text-left">

          {/* ReactBits Shiny Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 backdrop-blur-md self-start"
          >
            <ShinyText text="🎓 Cloud Computing Student & DevOps Enthusiast" speed={6} className="text-xs tracking-wider uppercase font-semibold" />
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 text-[var(--text-primary)]"
          >
            Building Scalable <br />
            <span className="gradient-text">Cloud Infrastructure</span> <br />
            & Pipelines.
          </motion.h1>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
          >
            Hi, I'm Jatin. A Cloud Computing student focused on provisioning highly available architectures, automating infrastructure as code, and creating reliable GitOps workflows.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] hover:brightness-110 active:scale-97 text-white font-semibold rounded-full shadow-lg shadow-[var(--accent-rose)]/15 hover:shadow-[var(--accent-rose)]/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Explore Deployments <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-3.5 border border-[var(--border-color)] bg-[var(--bg-card)]/50 hover:bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold rounded-full transition-all active:scale-97 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social Icons Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-8 text-[var(--text-secondary)]"
          >
            <a href="https://github.com/Jatin-Tasoria" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:scale-110 active:scale-95 transition-all" aria-label="GitHub Profile">
              <Github size={26} />
            </a>
            <a href="https://www.linkedin.com/in/jatin-tasoria-517247398/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:scale-110 active:scale-95 transition-all" aria-label="LinkedIn Profile">
              <Linkedin size={26} />
            </a>
            <a href="mailto:tasoriajatin@gmail.com" className="hover:text-[var(--text-primary)] hover:scale-110 active:scale-95 transition-all" aria-label="Send Email">
              <Mail size={26} />
            </a>
          </motion.div>
        </div>

        {/* Right Info Widget Column */}
        <div className="md:col-span-5 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[400px] mx-auto"
          >
            <TechStackCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
