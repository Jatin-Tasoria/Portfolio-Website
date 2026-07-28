import React, { useRef, useState, useEffect } from 'react';
import SpotlightCard from './ReactBits/SpotlightCard';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import profileImg from '../assets/profile.png';
import { AwsIcon, DockerIcon, KubernetesIcon, TerraformIcon, LinuxIcon, GithubActionsIcon, JavaIcon } from './TechLogos';
import TechStackCard from './TechStackCard';

export default function About() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Photo animations (Only active on desktop)
  // The profile picture stays centered (calc(-50% + 0px))
  const photoX = "calc(-50% + 0px)";

  // Add a spring curve to the raw scroll progress for physical damping
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });
  
  // Widen the scroll range (0.45 to 0.82) to make the shrink animation slower and smoother
  const photoScale = useTransform(
    smoothScrollYProgress,
    [0, 0.45, 0.82],
    [1.25, 1.25, 0.0]
  );
  const photoRotate = useTransform(
    smoothScrollYProgress,
    [0, 0.45, 0.82],
    [3, 3, -3]
  );
  // Fades out gradually in the center over the same wider scroll range
  const photoOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.45, 0.82, 1.0],
    [1, 1, 0, 0]
  );

  // Content animations (Only active on desktop)
  // Cards start fading in slowly from 0.58 and become fully active by 0.88
  const contentOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.58, 0.88, 1.0],
    [0, 0, 1, 1]
  );
  const contentScale = useTransform(
    smoothScrollYProgress,
    [0, 0.58, 0.88, 1.0],
    [0.95, 0.95, 1.0, 1.0]
  );

  const skills = [
    { name: 'Amazon Web Services (AWS)', proficiency: 'Expert', level: '90%', icons: [AwsIcon] },
    { name: 'Docker & Kubernetes', proficiency: 'Advanced', level: '85%', icons: [DockerIcon, KubernetesIcon] },
    { name: 'Terraform (IaC)', proficiency: 'Advanced', level: '80%', icons: [TerraformIcon] },
    { name: 'Linux & Bash Scripting', proficiency: 'Expert', level: '92%', icons: [LinuxIcon] },
    { name: 'CI/CD (GitHub Actions)', proficiency: 'Advanced', level: '85%', icons: [GithubActionsIcon] },
    { name: 'Java', proficiency: 'Advanced', level: '78%', icons: [JavaIcon] },
  ];

  return (
    <section id="about" ref={containerRef} className="py-8 md:py-10 lg:py-12 bg-[var(--bg-secondary)] relative overflow-visible">
      <div className="glow-bg top-[20%] right-[-5%] bg-[var(--accent-rose)]/15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 text-xs tracking-wider uppercase font-semibold text-[var(--accent)] mb-3">
            About Me
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            My Journey & Competencies
          </h2>
        </div>

        {/* Content Wrapper */}
        <div className="relative w-full">
          
          {/* Card & Profile Image on Mobile at the top of About me (< 768px) */}
          {!isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="block md:hidden w-full mb-10"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-8 justify-center w-full max-w-4xl mx-auto">
                {/* Profile Image (Left on sm+, Centered on mobile) scaled to match the card height */}
                <div className="relative w-full max-w-[400px] sm:w-[320px] h-72 sm:h-auto rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xl shrink-0">
                  <img src={profileImg} alt="Jatin Tasoria" className="w-full h-full object-cover" />
                </div>
                {/* Tech Stack Card (Right on sm+, Centered on mobile) */}
                <div className="w-full max-w-[400px] flex">
                  <TechStackCard />
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile Image for Tablet & Mobile Desktop Mode (768px to 1280px) */}
          {!isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden md:flex xl:hidden justify-center w-full mb-10"
            >
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl cloud-profile-photo">
                <img src={profileImg} alt="Jatin Tasoria" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* The Grid of Cards (Takes full width of the container by default) */}
          <motion.div
            style={isDesktop ? { opacity: contentOpacity, scale: contentScale } : {}}
            initial={!isDesktop ? { opacity: 0, y: 20 } : {}}
            whileInView={!isDesktop ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch w-full relative z-10"
          >
            {/* Left Bio Column */}
            <div className="flex flex-col justify-between p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-md relative">
              

              <div className="flex flex-col gap-6">
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  Designing Scalable & Highly Available Systems
                </h3>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  I am a Computer Science student specializing in Cloud Computing and DevOps. I'm deeply passionate about cloud architecture, serverless systems, and automating infrastructure deployments.
                </p>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Throughout my academic journey and personal projects, I have designed secure VPC environments, configured container orchestration with Kubernetes, and written infrastructure-as-code scripts using Terraform to deploy apps on AWS and Azure.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-4 border-t border-[var(--border-color)] pt-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Name</h4>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Jatin Tasoria</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Location</h4>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Pathankot, Punjab</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Email</h4>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tasoriajatin@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--accent)] hover:underline">
                      tasoriajatin@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Status</h4>
                    <p className="text-sm font-medium text-emerald-500 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Seeking Internships / Roles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Skills Column */}
            <div className="h-full">
              <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.2)" className="p-8 h-full flex flex-col justify-center border-[var(--border-color)] backdrop-blur-md">
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6">
                  Core Technologies
                </h3>

                <div className="flex flex-col gap-5">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1.5 bg-[var(--bg-primary)]/60 border border-[var(--border-color)] p-1.5 rounded-lg shrink-0">
                            {skill.icons.map((Icon, idx) => (
                              <Icon key={idx} size={16} className="shrink-0" />
                            ))}
                          </div>
                          <span className="text-[var(--text-primary)]">{skill.name}</span>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]/80 text-[var(--text-secondary)]">
                          {skill.proficiency}
                        </span>
                      </div>

                      <div className="h-2 w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 * index }}
                          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-rose)] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
            
          </motion.div>

          {/* Desktop-only Pinned/Absolute Profile Photo */}
          {isDesktop && (
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x: photoX,
                y: "-50%",
                scale: photoScale,
                opacity: photoOpacity,
                rotate: photoRotate,
              }}
              className="w-80 h-80 rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl cloud-profile-photo pointer-events-none z-20"
            >
              <img src={profileImg} alt="Jatin Tasoria" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent pointer-events-none" />
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
