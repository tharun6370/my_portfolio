import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Menu, 
  X, 
  FileText, 
  Send, 
  Sliders, 
  Code2,
  Sparkles,
  Film
} from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  data: PortfolioData;
  activeSection: string;
  onOpenEditModal: () => void;
  onOpenResumeModal: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  activeSection,
  onOpenEditModal,
  onOpenResumeModal,
  onReplayIntro
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'Biography' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Subtle Top-of-Page Scroll Progress Bar */}
      <div 
        id="scroll-progress-container"
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-neutral-900/40 pointer-events-none"
      >
        <motion.div
          id="scroll-progress-indicator"
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 origin-left shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          style={{ scaleX }}
        />
      </div>

      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800/90 shadow-lg shadow-black/60 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Geometric Mark */}
        <a
          id="navbar-logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-blue-500/60 transition-all duration-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-bl-sm"></div>
            <Code2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#F0F0F0] group-hover:text-white transition-colors flex items-center gap-1.5 font-mono">
              {data.name}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {data.availableForHire ? 'Available for work' : 'Exploring ideas'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links - Geometric Segmented Controller */}
        <nav id="desktop-navigation" className="hidden md:flex items-center bg-neutral-900/80 border border-neutral-800 rounded-lg p-1 backdrop-blur-sm shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Geometric Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {onReplayIntro && (
            <button
              id="navbar-replay-intro-btn"
              onClick={onReplayIntro}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/60 border border-neutral-800/80 hover:border-blue-500/50 transition-all hover:bg-neutral-800 font-mono"
              title="Replay Cinematic Intro"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Intro</span>
            </button>
          )}

          <button
            id="navbar-resume-btn"
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all hover:bg-neutral-800 font-mono"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume</span>
          </button>

          <button
            id="navbar-customize-btn"
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900/90 border border-neutral-800 hover:border-blue-500/50 transition-all hover:bg-neutral-800 font-mono"
            title="Edit and customize this portfolio profile"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Customize</span>
          </button>

          <button
            id="navbar-contact-btn"
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 border border-blue-500/40 shadow-sm transition-all active:scale-95 font-mono"
          >
            <Send className="w-3 h-3" />
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="navbar-mobile-edit-btn"
            onClick={onOpenEditModal}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            title="Customize"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
          </button>

          <button
            id="navbar-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#0A0A0A]/95 border-b border-neutral-800 backdrop-blur-xl px-5 pt-3 pb-6 space-y-3 mt-3 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            {onReplayIntro && (
              <button
                id="mobile-replay-intro-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-blue-500/50 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Replay Intro
              </button>
            )}

            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 hover:text-white"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              View Resume
            </button>

            <button
              id="mobile-customize-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 hover:text-white"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Customize Profile
            </button>

            <button
              id="mobile-contact-btn"
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white text-xs font-mono font-semibold hover:bg-blue-500 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
