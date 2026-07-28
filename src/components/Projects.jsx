import React, { useState } from 'react';
import DecayCard from './ReactBits/DecayCard';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects({ onWipClick, onLinuxDemoClick }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Cloud Infra', 'DevOps', 'Linux'];

  const projectsData = [
    {
      title: 'My Journey',
      description: 'A simple blog on GitHub documenting my hands-on journey to becoming a Cloud Engineer. Sharing detailed walkthroughs of AWS labs, infrastructure setups, and personal insights.',
      category: 'All',
      tags: ['GitHub', 'Markdown', 'Cloud Engineering', 'Git'],
      github: 'https://github.com/Jatin-Tasoria/My-Journey',
    },
    {
      title: 'Self-Hosted Personal Cloud & Media Server',
      description: 'A Linux-based home server (Fedora) deploying Nextcloud for secure cloud storage and Jellyfin for media streaming. Managed with Docker & Docker Compose, utilizing Nginx as a reverse proxy and Bash scripting for automation.',
      category: 'DevOps',
      tags: ['WIP', 'Linux (Fedora)', 'Docker', 'Nextcloud', 'Jellyfin', 'Nginx', 'Bash'],
      github: 'https://github.com/Jatin-Tasoria/Personal-Cloud-Server',
      demo: 'https://github.com/Jatin-Tasoria/Personal-Cloud-Server',
      isWip: true,
    },
    {
      title: 'Automated File Encryption & Decryption System',
      description: 'A real-time folder monitoring and GPG cryptographic pipeline built using Bash scripting on RHEL 10. Monitors directories with inotifywait to automatically encrypt or decrypt files in the background and log all activity.',
      category: 'Linux',
      tags: ['RHEL 10', 'Bash', 'GPG', 'inotifywait', 'Automation'],
      github: 'https://github.com/Jatin-Tasoria/Auto-Encryption-and-Decryption',
      demo: 'https://github.com/Jatin-Tasoria/Auto-Encrypt-Decrypt',
      isLinuxDemo: true,
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 lg:py-20 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="glow-bg bottom-[10%] left-[-5%] bg-[var(--accent-rose)]/15" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 text-xs tracking-wider uppercase font-semibold text-[var(--accent)] mb-3">
            My Portfolio
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            Featured Applications
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${activeFilter === cat
                ? 'bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] border-transparent text-white shadow-md shadow-[var(--accent-rose)]/15'
                : 'bg-[var(--bg-card)]/50 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid - Masonry style column layout */}
        <div className="columns-1 md:columns-2 gap-8 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid mb-8 flex"
              >
                {/* 3D Tilting Card from ReactBits */}
                <DecayCard className="project-card flex flex-col h-auto w-full bg-[var(--bg-card)] border border-[var(--border-color)]/70 hover:shadow-2xl overflow-hidden rounded-2xl">

                  {/* Card Content Wrapper */}
                  <div className="p-8 flex flex-col justify-between h-full relative z-10 text-left">

                    {/* Header */}
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-secondary)]">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--text-primary)] transition-colors"
                            title="View GitHub Repository"
                            aria-label={`View GitHub repository for ${project.title}`}
                          >
                            <Github size={18} />
                          </a>
                          {project.demo && (
                            <a
                              href={(project.isWip || project.isLinuxDemo) ? '#' : project.demo}
                              target={(project.isWip || project.isLinuxDemo) ? '_self' : '_blank'}
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                if (project.isWip) {
                                  e.preventDefault();
                                  onWipClick(project);
                                } else if (project.isLinuxDemo) {
                                  e.preventDefault();
                                  onLinuxDemoClick(project);
                                }
                              }}
                              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                              title={project.isWip ? 'View WIP Demo' : project.isLinuxDemo ? 'Launch Linux Demo Terminal' : 'Visit Live Site'}
                              aria-label={project.isWip ? `View WIP Demo for ${project.title}` : project.isLinuxDemo ? `Launch Linux Demo Terminal for ${project.title}` : `Visit Live Site for ${project.title}`}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-3">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]/40">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${tag === 'WIP'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 font-bold uppercase tracking-wider'
                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)]'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </DecayCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
