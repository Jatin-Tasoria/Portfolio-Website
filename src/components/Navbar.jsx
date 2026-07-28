import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const isLight = document.body.classList.contains('light-mode');
    setTheme(isLight ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.body.classList.add('light-mode');
      setTheme('light');
    } else {
      document.body.classList.remove('light-mode');
      setTheme('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-[var(--bg-glass)] border-b border-[var(--border-color)] z-50 backdrop-blur-md transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#home"
          className="font-display font-extrabold text-xl tracking-tight flex items-center gap-2.5 cursor-pointer"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <img src="/logo.png" alt="JT Logo" className="w-8 h-8 object-contain shrink-0" />
          <div className="flex items-center gap-1">
            <span className="gradient-text">Jatin</span>
            <span className="text-[var(--text-primary)]">Tasoria</span>
          </div>
        </a>

        <div className="flex items-center gap-8">
          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${activeSection === item.id
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-rose)] rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[rgba(99,102,241,0.05)] transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[rgba(99,102,241,0.05)] transition-all cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[70px] left-0 w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)] p-6 shadow-lg flex flex-col gap-4 transition-all duration-300 md:hidden ${mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-base font-semibold py-2 transition-colors border-b border-[var(--border-color)]/20 last:border-0 ${activeSection === item.id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
