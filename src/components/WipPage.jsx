import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Terminal, Shield, RefreshCw, Copy, Check, Clock } from 'lucide-react';
import SpotlightCard from './ReactBits/SpotlightCard';

const generateMockLogs = (projectTitle) => [
  `[INFO] Starting deployment sequence for ${projectTitle}...`,
  '[IaC] Initializing Terraform configurations...',
  '[IaC] Loading AWS provider plugin (us-east-1)...',
  '[IaC] Planning resource provisioning: 12 to add, 0 to change, 0 to destroy.',
  '[IaC] Provisioning Secure VPC, 2 Public & 2 Private Subnets...',
  '[IaC] Deploying NAT Gateways & Internet Gateway bindings...',
  '[INFRA] VPC and networking infrastructure provisioned [SUCCESS].',
  '[DOCKER] Spinning up multi-stage container builds...',
  '[DOCKER] Running npm run build in frontend stage...',
  '[DOCKER] Compiling optimized build artifacts...',
  '[DOCKER] Injecting environment variables into Docker container...',
  '[DOCKER] Docker Image successfully tagged: jatin/devops-media-server:latest',
  '[DOCKER] Pushing image to secure container registry...',
  '[K8S] Deploying Helm charts onto Kubernetes cluster...',
  '[K8S] Creating cluster IP services and deployment replicas...',
  '[K8S] Setting up Ingress controller configurations...',
  '[SECURITY] Attaching Let\'s Encrypt SSL/TLS certificates...',
  '[CI/CD] Running health checks and automated E2E tests...',
  '[WIP] Initial deployment complete. Finalizing media volume mounts...',
  '[WIP] Server is awaiting volume data sync. 83% complete.',
];

export default function WipPage({ project, onClose }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const terminalContainerRef = useRef(null);
  const overlayRef = useRef(null);

  const mockLogs = useRef(generateMockLogs(project.title)).current;

  // Scroll page to top on mount
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, []);

  // Auto-scroll terminal logs container only
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Simulate progress bar and terminal logs streaming
  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 83) {
          clearInterval(progressInterval);
          return 83;
        }
        return prev + 1;
      });
    }, 40);

    // Logs simulation
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        const nextLog = mockLogs[logIndex];
        setTerminalLogs((prev) => [...prev, nextLog]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setIsStreaming(false);
      }
    }, 450);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [mockLogs]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.trim()) return;

    // Simulate subscription success
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 600);
  };

  const handleCopyGithub = () => {
    if (project.github) {
      navigator.clipboard.writeText(project.github);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)] flex flex-col justify-between"
    >
      {/* Background Glow Blobs */}
      <div className="glow-bg top-[10%] left-[5%] bg-[var(--accent)]/15 pointer-events-none" />
      <div className="glow-bg bottom-[10%] right-[5%] bg-[var(--accent-rose)]/15 pointer-events-none" />

      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full h-[70px] bg-[var(--bg-glass)] border-b border-[var(--border-color)] z-50 backdrop-blur-md px-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Clock size={12} className="animate-spin" /> Work In Progress
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-28 pb-12 flex-grow max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Section 1: Title & Description */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 order-1 flex flex-col w-full text-left">
          <span className="inline-block self-start px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 text-xs tracking-wider uppercase font-semibold text-[var(--accent-secondary)] mb-4">
            {project.category} Demo Request
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-[var(--text-primary)] mb-4">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
            This deployment is currently in active development. I am configuring host VPCs, building Kubernetes clusters, and orchestrating the GitOps pipelines on AWS. View progress logs live on the right.
          </p>
        </div>

        {/* Section 2: Progress Card */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2 order-2 p-6 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Deployment Stage</span>
            <span className="text-sm font-bold text-[var(--accent-rose)]">{progress}% Completed</span>
          </div>
          
          {/* Progress bar container */}
          <div className="h-3 w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-rose)] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            <Shield size={12} className="text-emerald-500" /> Auto-validated VPC, subnets, and routing policies.
          </p>
        </div>

        {/* Section 3: Live Shell Logs Monitor */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-3 order-3 w-full flex flex-col h-[400px] lg:h-[550px]">
          <div className="flex-grow rounded-2xl border border-[var(--border-color)] bg-black/90 p-5 flex flex-col overflow-hidden shadow-2xl relative group">
            
            {/* Window Top Controls */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/30" />
                <span className="text-[11px] font-mono text-zinc-500 ml-2 font-medium flex items-center gap-1.5">
                  <Terminal size={12} /> deploy-monitor.sh
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  {isStreaming && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rose)]/80 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isStreaming ? 'bg-[var(--accent-rose)]' : 'bg-emerald-500'}`}></span>
                </span>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isStreaming ? 'text-[var(--accent-rose)]' : 'text-emerald-400'}`}>
                  {isStreaming ? 'Live Streaming' : 'Ready / Standby'}
                </span>
              </div>
            </div>

            {/* Terminal Log Output */}
            <div ref={terminalContainerRef} className="flex-grow overflow-y-auto text-left font-mono text-xs text-zinc-300 space-y-2.5 pr-2 custom-scrollbar">
              {terminalLogs.map((log, index) => {
                let colorClass = "text-zinc-400";
                if (log.includes("[SUCCESS]")) colorClass = "text-emerald-400 font-semibold";
                else if (log.includes("[INFO]")) colorClass = "text-sky-400";
                else if (log.includes("[WIP]")) colorClass = "text-amber-400";
                else if (log.includes("[IaC]")) colorClass = "text-purple-400";
                else if (log.includes("[DOCKER]")) colorClass = "text-blue-400";
                else if (log.includes("[K8S]")) colorClass = "text-teal-400 font-semibold";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="leading-relaxed border-l-2 border-zinc-800 pl-2.5 py-0.5 hover:bg-zinc-900/40 rounded transition-colors"
                  >
                    <span className="text-zinc-600 mr-2">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className={colorClass}>{log}</span>
                  </motion.div>
                );
              })}

              {terminalLogs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2 py-20">
                  <RefreshCw className="animate-spin text-zinc-600" size={24} />
                  <span className="text-xs">Establishing secure SSL connection to cluster...</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Section 4: Subscription & Actions */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-3 order-4 w-full">
          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="p-8 border-[var(--border-color)] backdrop-blur-md text-left">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              Get Notified on Launch
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Enter your email to receive an automated ping the moment this system goes fully live and the public URL is deployed.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-grow px-5 py-3.5 bg-[var(--bg-primary)]/40 border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] font-medium text-sm transition-all focus:outline-none focus:bg-[var(--bg-primary)]/80 focus:border-[var(--accent)]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] hover:brightness-110 active:scale-97 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shrink-0"
                  >
                    Subscribe <Send size={14} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-500 text-sm font-semibold"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <div>
                    <p className="font-bold">Subscription Confirmed!</p>
                    <p className="text-xs text-emerald-500/80 font-normal">You'll receive an email notification upon live deployment.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {project.github && (
              <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[var(--text-muted)]">Or checkout code repository on GitHub</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyGithub}
                    className="flex-grow sm:flex-grow-0 px-4 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)]/50 hover:bg-[var(--bg-primary)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy Repo Link
                      </>
                    )}
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow sm:flex-grow-0 px-4 py-2 bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-primary)] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    Visit Repository
                  </a>
                </div>
              </div>
            )}
          </SpotlightCard>
        </div>

      </main>

      {/* Footer Details */}
      <footer className="py-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-center text-xs text-[var(--text-muted)] z-10">
        Demo Engine Powered by Kubernetes ingress proxy. Click "Back to Portfolio" to return.
      </footer>
    </motion.div>
  );
}
