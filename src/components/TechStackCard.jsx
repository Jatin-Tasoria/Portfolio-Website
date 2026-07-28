import React from 'react';
import SpotlightCard from './ReactBits/SpotlightCard';
import { Cloud } from 'lucide-react';
import { AwsIcon } from './TechLogos';

export default function TechStackCard() {
  return (
    <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="p-8 w-full max-w-[400px] mx-auto border-[var(--border-color)] backdrop-blur-lg cloud-profile-card overflow-hidden relative group">
      {/* Background AWS Logo centered and enlarged */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
        <AwsIcon size={240} className="opacity-10 dark:opacity-15 transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6" />
      </div>

      <div className="flex flex-col gap-6 text-left relative z-10">
        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Cloud size={20} className="animate-pulse" />
            <span className="font-display font-semibold text-lg text-[var(--text-primary)]">Tech Stack & Credentials</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Focus Areas</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">AWS, Azure, Docker, Kubernetes, Terraform</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Background</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">Masters in Computer Application (Cloud Computing & DevOps)</span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[var(--border-color)]/50 bg-[var(--bg-primary)]/40 stats-box">
            <span className="block text-2xl font-bold font-display gradient-text">3+</span>
            <span className="text-xs text-[var(--text-secondary)]">Environments Built</span>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-color)]/50 bg-[var(--bg-primary)]/40 stats-box">
            <span className="block text-2xl font-bold font-display gradient-text">3x</span>
            <span className="text-xs text-[var(--text-secondary)]">Certifications</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
