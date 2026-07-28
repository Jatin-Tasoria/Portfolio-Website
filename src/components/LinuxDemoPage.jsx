import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Terminal, Folder, FolderOpen, FileText, Check, 
  RefreshCw, Copy, FileCode, CheckSquare
} from 'lucide-react';
import SpotlightCard from './ReactBits/SpotlightCard';

export default function LinuxDemoPage({ project, onClose }) {
  const [copied, setCopied] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [dirsCreated, setDirsCreated] = useState(false);
  const [scriptsCopied, setScriptsCopied] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [openFolders, setOpenFolders] = useState({
    root: true,
    To_Encrypt: true,
    To_Decrypt: true,
    Encrypted: true,
    Decrypted: true,
    Logs: true
  });
  
  const [activeFiles, setActiveFiles] = useState({
    To_Encrypt: [],
    To_Decrypt: [],
    Encrypted: [],
    Decrypted: [],
    Logs: []
  });

  const terminalContainerRef = useRef(null);
  const overlayRef = useRef(null);

  const linuxLogs = useRef([
    // Step 1: Install packages
    { text: "jatin@rhel10:~$ sudo dnf install -y gnupg inotify-tools", type: "command" },
    { text: "[sudo] password for jatin: **********", type: "input" },
    { text: "Updating Subscription Management repositories.", type: "log" },
    { text: "Red Hat Enterprise Linux 10 for x86_64 - AppStream (RPMs)   2.4 MB/s | 3.1 MB  00:01", type: "log" },
    { text: "Resolving Dependencies...", type: "log" },
    { text: "--> Running transaction check", type: "log" },
    { text: "---> Package gnupg.x86_64 2.4.5-2.el10 will be installed", type: "log" },
    { text: "---> Package inotify-tools.x86_64 3.20.11-1.el10 will be installed", type: "log" },
    { text: "Total download size: 1.8 MB", type: "log" },
    { text: "Downloading Packages...", type: "log" },
    { text: "Running transaction test / transaction check...", type: "log" },
    { text: "Installing : gnupg-2.4.5-2.el10.x86_64                                             1/2", type: "log" },
    { text: "Installing : inotify-tools-3.20.11-1.el10.x86_64                                     2/2", type: "log" },
    { text: "[SUCCESS] Package installation complete. gnupg & inotify-tools installed.", type: "success" },
    { text: "", type: "empty" },

    // Step 2: Generate GPG Key Pair
    { text: "jatin@rhel10:~$ gpg --full-generate-key", type: "command" },
    { text: "gpg (GnuPG) 2.4.5; Copyright (C) 2024 g10 Code GmbH", type: "log" },
    { text: "Please select what kind of key you want:", type: "log" },
    { text: "   (1) RSA and RSA (default)", type: "log" },
    { text: "   (2) DSA and Elgamal", type: "log" },
    { text: "Your selection? 1", type: "input" },
    { text: "RSA keys may be between 1024 and 4096 bits long.", type: "log" },
    { text: "What keysize do you want? (3072) 4096", type: "input" },
    { text: "Requested keysize is 4096 bits", type: "log" },
    { text: "Please specify how long the key should be valid.", type: "log" },
    { text: "         0 = key does not expire", type: "log" },
    { text: "Your selection? 0", type: "input" },
    { text: "Key does not expire at all. Is this correct? (y/N) y", type: "input" },
    { text: "\nGnuPG needs to construct a user ID to identify your key.", type: "log" },
    { text: "Real name: Jatin Tasoria", type: "input" },
    { text: "Email address: tasoriajatin@gmail.com", type: "input" },
    { text: "Comment: Cloud & DevOps Automation Key", type: "input" },
    { text: "You selected this USER-ID:", type: "log" },
    { text: "    \"Jatin Tasoria (Cloud & DevOps Automation Key) <tasoriajatin@gmail.com>\"", type: "log" },
    { text: "Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O", type: "input" },
    { text: "Enter passphrase: ******************", type: "input" },
    { text: "We need to generate a lot of random bytes. It is a good idea to perform", type: "log" },
    { text: "some other action (type on the keyboard, move the mouse) during the prime", type: "log" },
    { text: "generation; this gives the random number generator a better chance to gain entropy.", type: "log" },
    { text: "gpg: key 8FBA62C5B7281D5F marked as ultimately trusted", type: "log" },
    { text: "gpg: revocation certificate stored as '/home/jatin/.gnupg/openpgp-revocs.d/8FBA62C5B7281D5F.rev'", type: "log" },
    { text: "public and secret key created and signed.", type: "success" },
    { text: "", type: "empty" },

    // List keys
    { text: "jatin@rhel10:~$ gpg --list-keys", type: "command" },
    { text: "/home/jatin/.gnupg/pubring.kbx", type: "log" },
    { text: "-----------------------------", type: "log" },
    { text: "pub   rsa4096 2026-07-27 [SC]", type: "log" },
    { text: "      8FBA62C5B7281D5FBA62C5B7281D5F8FBA62C5B7", type: "log" },
    { text: "uid           [ultimate] Jatin Tasoria <tasoriajatin@gmail.com>", type: "log" },
    { text: "sub   rsa4096 2026-07-27 [E]", type: "log" },
    { text: "", type: "empty" },

    // Step 3: Create Project Directory
    { text: "jatin@rhel10:~$ mkdir -p /home/jatin/Auto_Encrypt/{To_Encrypt,To_Decrypt,Encrypted,Decrypted,Logs}", type: "command" },
    { text: "[SYSTEM] Created /home/jatin/Auto_Encrypt/To_Encrypt", type: "sys-action", action: "create-dirs" },
    { text: "[SYSTEM] Created /home/jatin/Auto_Encrypt/To_Decrypt", type: "sys-action" },
    { text: "[SYSTEM] Created /home/jatin/Auto_Encrypt/Encrypted", type: "sys-action" },
    { text: "[SYSTEM] Created /home/jatin/Auto_Encrypt/Decrypted", type: "sys-action" },
    { text: "[SYSTEM] Created /home/jatin/Auto_Encrypt/Logs", type: "sys-action" },
    { text: "", type: "empty" },

    // Step 4: Copy scripts
    { text: "jatin@rhel10:~$ cp *.sh /home/jatin/Auto_Encrypt/ && chmod +x /home/jatin/Auto_Encrypt/*.sh", type: "command" },
    { text: "[SYSTEM] Copied script files to target folder", type: "sys-action", action: "copy-scripts" },
    { text: "[SYSTEM] Applied execution bits (chmod +x) to monitoring scripts.", type: "success" },
    { text: "", type: "empty" },

    // Step 5: Start the automation
    { text: "jatin@rhel10:~$ /home/jatin/Auto_Encrypt/start_autoenc.sh", type: "command" },
    { text: "Auto encryption/decryption started.", type: "log" },
    { text: "[INFO] Initializing inotifywait hooks on directory structures...", type: "log" },
    { text: "[INFO] Listening for events (CREATE, CLOSE_WRITE, MOVED_TO) in /home/jatin/Auto_Encrypt", type: "log", action: "start-automation" },
    { text: "System standby. Awaiting file inputs...", type: "success" },
    { text: "", type: "empty" },

    // Step 6: Project Workflow Simulation - Encrypting
    { text: "[inotifywait] Detected NEW FILE 'confidential_infra.txt' in To_Encrypt/", type: "event", action: "add-encrypt" },
    { text: "[IaC] Launching file processing thread...", type: "log" },
    { text: "[GPG] Encrypting 'confidential_infra.txt' with public key 'Jatin Tasoria <tasoriajatin@gmail.com>'...", type: "log" },
    { text: "[SUCCESS] Encryption complete: confidential_infra.txt -> confidential_infra.txt.gpg", type: "success", action: "move-encrypted" },
    { text: "[SYSTEM] Relocated 'confidential_infra.txt.gpg' to Encrypted/", type: "log" },
    { text: "[SYSTEM] Shredded/deleted plain source file 'confidential_infra.txt'", type: "log" },
    { text: "[INFO] Activity logged to Logs/auto_enc.log", type: "log" },
    { text: "", type: "empty" },

    // Decrypting
    { text: "[inotifywait] Detected NEW FILE 'database_secrets.gpg' in To_Decrypt/", type: "event", action: "add-decrypt" },
    { text: "[IaC] Launching file decryption thread...", type: "log" },
    { text: "[GPG] Decrypting 'database_secrets.gpg' using private key...", type: "log" },
    { text: "[GPG] Valid passphrase verified for Jatin Tasoria <tasoriajatin@gmail.com>", type: "log" },
    { text: "[SUCCESS] Decryption complete: database_secrets.gpg -> database_secrets.txt", type: "success", action: "move-decrypted" },
    { text: "[SYSTEM] Relocated decrypted file 'database_secrets.txt' to Decrypted/", type: "log" },
    { text: "[INFO] Activity logged to Logs/auto_enc.log", type: "log" },
    { text: "System standby. Awaiting file inputs...", type: "success" }
  ]).current;

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

  // Simulate progress and logs streaming
  useEffect(() => {
    // Reset all status states for a clean simulation run
    setTerminalLogs([]);
    setIsStreaming(true);
    setDirsCreated(false);
    setScriptsCopied(false);
    setActiveFiles({
      To_Encrypt: [],
      To_Decrypt: [],
      Encrypted: [],
      Decrypted: [],
      Logs: []
    });

    let logIndex = 0;
    let progressTimer = null;

    const logTimer = setInterval(() => {
      if (logIndex < linuxLogs.length) {
        const nextLog = linuxLogs[logIndex];
        
        // Handle trigger events for folder structure view
        if (nextLog.action === "create-dirs") {
          setDirsCreated(true);
        } else if (nextLog.action === "copy-scripts") {
          setScriptsCopied(true);
        } else if (nextLog.action === "start-automation") {
          // Handled visually by status indicator
        } else if (nextLog.action === "add-encrypt") {
          setActiveFiles(prev => ({ ...prev, To_Encrypt: ["confidential_infra.txt"] }));
        } else if (nextLog.action === "move-encrypted") {
          setActiveFiles(prev => ({ 
            ...prev, 
            To_Encrypt: [], 
            Encrypted: ["confidential_infra.txt.gpg"],
            Logs: ["auto_enc.log"]
          }));
        } else if (nextLog.action === "add-decrypt") {
          setActiveFiles(prev => ({ ...prev, To_Decrypt: ["database_secrets.gpg"] }));
        } else if (nextLog.action === "move-decrypted") {
          setActiveFiles(prev => ({ 
            ...prev, 
            To_Decrypt: [], 
            Decrypted: ["database_secrets.txt"],
            Logs: ["auto_enc.log"]
          }));
        }

        setTerminalLogs((prev) => [...prev, nextLog.text]);
        logIndex++;
      } else {
        clearInterval(logTimer);
        setIsStreaming(false);
      }
    }, 800); // 800ms delay for 1.5x speedup

    return () => {
      clearInterval(logTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [runKey, linuxLogs]);

  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
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

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[var(--accent-rose)] bg-[var(--accent-rose)]/10 px-3 py-1 rounded-full border border-[var(--accent-rose)]/20">
          <Terminal size={12} className="animate-pulse" /> Linux RHEL 10 Demo
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-28 pb-12 flex-grow max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Section 1: Title & Description */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 order-1 flex flex-col w-full text-left">
          <span className="inline-block self-start px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 text-xs tracking-wider uppercase font-semibold text-[var(--accent)] mb-4">
            Security & Scripting Pipeline
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-[var(--text-primary)] mb-4">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
            A GPG-driven automated file monitoring shell suite developed for RHEL 10. Using <code>inotify-tools</code>, the scripts track folders in real-time, encrypting added files automatically using public keys, and decrypting incoming payloads on demand.
          </p>
        </div>

        {/* Section 2: Directory Tree Visualizer */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2 order-2 p-6 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md text-left flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
            <span className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <FolderOpen size={16} className="text-amber-500" /> Folder Directory Tree
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">/home/jatin/</span>
          </div>
          
          <div className="font-mono text-sm text-[var(--text-secondary)] space-y-2 select-none">
            {/* Root folder */}
            <div className="flex items-center gap-2 pl-2">
              <FolderOpen size={16} className="text-amber-500" />
              <span className="text-[var(--text-primary)] font-bold">Auto_Encrypt/</span>
              {!dirsCreated && <span className="text-[10px] text-zinc-600 italic">(Directories pending creation...)</span>}
            </div>

            {dirsCreated && (
              <div className="pl-6 border-l border-zinc-800 space-y-2 ml-4">
                
                {/* To_Encrypt folder */}
                <div>
                  <div className="flex items-center justify-between py-0.5 hover:bg-zinc-800/20 rounded cursor-pointer" onClick={() => toggleFolder('To_Encrypt')}>
                    <div className="flex items-center gap-2">
                      {openFolders.To_Encrypt ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                      <span className="text-zinc-300">To_Encrypt/</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 italic">User Drops Plain Files Here</span>
                  </div>
                  {openFolders.To_Encrypt && activeFiles.To_Encrypt.map(file => (
                    <div key={file} className="flex items-center gap-2 pl-6 py-0.5 text-xs text-sky-400">
                      <FileText size={12} /> {file}
                    </div>
                  ))}
                </div>

                {/* To_Decrypt folder */}
                <div>
                  <div className="flex items-center justify-between py-0.5 hover:bg-zinc-800/20 rounded cursor-pointer" onClick={() => toggleFolder('To_Decrypt')}>
                    <div className="flex items-center gap-2">
                      {openFolders.To_Decrypt ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                      <span className="text-zinc-300">To_Decrypt/</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 italic">User Drops Encrypted .gpg Files Here</span>
                  </div>
                  {openFolders.To_Decrypt && activeFiles.To_Decrypt.map(file => (
                    <div key={file} className="flex items-center gap-2 pl-6 py-0.5 text-xs text-amber-500">
                      <FileText size={12} /> {file}
                    </div>
                  ))}
                </div>

                {/* Encrypted folder */}
                <div>
                  <div className="flex items-center justify-between py-0.5 hover:bg-zinc-800/20 rounded cursor-pointer" onClick={() => toggleFolder('Encrypted')}>
                    <div className="flex items-center gap-2">
                      {openFolders.Encrypted ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                      <span className="text-zinc-300">Encrypted/</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 italic">System Outputs Encrypted Payloads</span>
                  </div>
                  {openFolders.Encrypted && activeFiles.Encrypted.map(file => (
                    <div key={file} className="flex items-center gap-2 pl-6 py-0.5 text-xs text-emerald-400">
                      <FileText size={12} /> {file}
                    </div>
                  ))}
                </div>

                {/* Decrypted folder */}
                <div>
                  <div className="flex items-center justify-between py-0.5 hover:bg-zinc-800/20 rounded cursor-pointer" onClick={() => toggleFolder('Decrypted')}>
                    <div className="flex items-center gap-2">
                      {openFolders.Decrypted ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                      <span className="text-zinc-300">Decrypted/</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 italic">System Outputs Plaintext Decryptions</span>
                  </div>
                  {openFolders.Decrypted && activeFiles.Decrypted.map(file => (
                    <div key={file} className="flex items-center gap-2 pl-6 py-0.5 text-xs text-sky-400">
                      <FileText size={12} /> {file}
                    </div>
                  ))}
                </div>

                {/* Logs folder */}
                <div>
                  <div className="flex items-center justify-between py-0.5 hover:bg-zinc-800/20 rounded cursor-pointer" onClick={() => toggleFolder('Logs')}>
                    <div className="flex items-center gap-2">
                      {openFolders.Logs ? <FolderOpen size={14} className="text-amber-500" /> : <Folder size={14} className="text-amber-500" />}
                      <span className="text-zinc-300">Logs/</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 italic">Security Audit Trails</span>
                  </div>
                  {openFolders.Logs && activeFiles.Logs.map(file => (
                    <div key={file} className="flex items-center gap-2 pl-6 py-0.5 text-xs text-purple-400 font-bold">
                      <FileText size={12} /> {file}
                    </div>
                  ))}
                </div>

                {/* Scripts (copied in Step 4) */}
                {scriptsCopied && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800/40">
                    <div className="flex items-center gap-2 pl-2 text-zinc-400 hover:text-white">
                      <FileCode size={13} className="text-sky-500" />
                      <span>encrypt_monitor.sh</span>
                    </div>
                    <div className="flex items-center gap-2 pl-2 text-zinc-400 hover:text-white">
                      <FileCode size={13} className="text-sky-500" />
                      <span>decrypt_monitor.sh</span>
                    </div>
                    <div className="flex items-center gap-2 pl-2 text-zinc-400 hover:text-white">
                      <FileCode size={13} className="text-emerald-500" />
                      <span>start_autoenc.sh</span>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* Section 3: Live Shell Logs Monitor */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-3 order-3 w-full flex flex-col h-[450px] lg:h-[600px]">
          <div className="flex-grow rounded-2xl border border-[var(--border-color)] bg-black/95 p-5 flex flex-col overflow-hidden shadow-2xl relative group">
            
            {/* Window Top Controls */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/30" />
                <span className="text-[11px] font-mono text-zinc-500 ml-2 font-medium flex items-center gap-1.5">
                  <Terminal size={12} /> gpg-automation-monitor.sh
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    {isStreaming && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rose)]/80 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isStreaming ? 'bg-[var(--accent-rose)]' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isStreaming ? 'text-[var(--accent-rose)]' : 'text-emerald-400'}`}>
                    {isStreaming ? 'Running Simulation' : 'Ready / Standby'}
                  </span>
                </div>

                {!isStreaming && (
                  <button
                    onClick={() => setRunKey(prev => prev + 1)}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[9px] font-mono font-bold uppercase rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                    title="Restart setup simulation"
                  >
                    <RefreshCw size={10} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Terminal Log Output */}
            <div ref={terminalContainerRef} className="flex-grow overflow-y-auto text-left font-mono text-[11px] sm:text-xs text-zinc-300 space-y-2 pr-2 custom-scrollbar">
              {terminalLogs.map((log, index) => {
                let colorClass = "text-zinc-400";
                
                if (log.startsWith("jatin@rhel10:")) colorClass = "text-white font-semibold";
                else if (log.includes("[SUCCESS]")) colorClass = "text-emerald-400 font-semibold";
                else if (log.includes("[SYSTEM]")) colorClass = "text-sky-400";
                else if (log.includes("[inotifywait]")) colorClass = "text-amber-400 font-semibold";
                else if (log.includes("[GPG]")) colorClass = "text-indigo-400";
                else if (log.includes("[INFO]")) colorClass = "text-zinc-500";
                else if (log.includes("Your selection?") || log.includes("Real name:") || log.includes("Email address:") || log.includes("Your selection?") || log.includes("Validity?") || log.includes("passphrase:") || log.includes("Okay")) colorClass = "text-yellow-500 font-semibold";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="leading-relaxed border-l border-zinc-800 pl-2.5 py-0.5 hover:bg-zinc-900/40 rounded transition-colors"
                  >
                    <span className="text-zinc-700 mr-2 select-none">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className={colorClass}>{log}</span>
                  </motion.div>
                );
              })}

              {!isStreaming && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 flex flex-col gap-2 border-t border-zinc-800/40 mt-4 select-none"
                >
                  <p className="text-[10px] text-zinc-500 font-mono">--- Pipeline Run Completed (System Standby) ---</p>
                  <button
                    onClick={() => setRunKey(prev => prev + 1)}
                    className="self-start px-4 py-2 bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] hover:brightness-110 active:scale-97 text-white font-mono font-bold text-[10px] sm:text-xs uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[var(--accent-rose)]/15"
                  >
                    <RefreshCw size={12} className="animate-spin-slow" /> Restart Simulation
                  </button>
                </motion.div>
              )}

              {terminalLogs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2 py-20">
                  <RefreshCw className="animate-spin text-zinc-600" size={24} />
                  <span className="text-xs">Starting RHEL 10 virtualization context...</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Section 4: Subscription & Action Panel */}
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-3 order-4 w-full">
          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="p-8 border-[var(--border-color)] backdrop-blur-md text-left">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              Project Workflow Overview
            </h3>
            
            <div className="space-y-4 text-sm text-[var(--text-secondary)] mb-6">
              <div className="flex gap-2.5 items-start">
                <CheckSquare size={16} className="text-[var(--accent-rose)] shrink-0 mt-0.5" />
                <p><strong>Step 1 & 2:</strong> Install dependencies (<code>gnupg</code>, <code>inotify-tools</code>) and generate secure RSA 4096 GPG keys.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckSquare size={16} className="text-[var(--accent-rose)] shrink-0 mt-0.5" />
                <p><strong>Step 3 & 4:</strong> Deploy monitored directory folders and execution bash scripts.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckSquare size={16} className="text-[var(--accent-rose)] shrink-0 mt-0.5" />
                <p><strong>Automation In Action:</strong> Drop files in <code>To_Encrypt/</code> and watch GPG automatically secure them and dispatch them to <code>Encrypted/</code>, with log outputs tracked in <code>Logs/</code>.</p>
              </div>
            </div>

            {project.github && (
              <div className="pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[var(--text-muted)]">Check out the code scripts on GitHub</span>
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
                    className="flex-grow sm:flex-grow-0 px-4 py-2 bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] hover:brightness-110 active:scale-97 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
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
        Demo Engine virtualization powered by React mock streams. Click "Back to Portfolio" to return.
      </footer>
    </motion.div>
  );
}
