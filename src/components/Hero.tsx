import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, 
  Sparkles, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText, 
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  Terminal,
  Code2
} from 'lucide-react';
import { PortfolioData } from '../types';
import { GeometricHeroCursor } from './GeometricHeroCursor';

interface HeroProps {
  data: PortfolioData;
  onOpenResumeModal: () => void;
  onOpenEditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  onOpenResumeModal,
  onOpenEditModal,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5" />;
      case 'twitter / x':
      case 'twitter':
        return <Twitter className="w-3.5 h-3.5" />;
      case 'email':
        return <Mail className="w-3.5 h-3.5" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-geometric-grid bg-geometric-glow border-b border-neutral-900"
    >
      {/* Interactive geometric mouse cursor tracking layer */}
      <GeometricHeroCursor containerRef={heroRef} />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio Tagline, CTAs, Socials */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Geometric Status Pill */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 shadow-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-neutral-300">
                {data.availableForHire ? 'STATUS: AVAILABLE FOR WORK' : 'STATUS: EXPLORING IDEAS'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F0F0F0] leading-[1.08] mb-4"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                {data.name}
              </span>
            </motion.h1>

            {/* Sub-headline / Role */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-mono text-blue-400 mb-6 bg-neutral-900/60 px-3 py-1.5 rounded-lg border border-neutral-800/80"
            >
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>{data.title}</span>
            </motion.div>

            {/* Concise Tagline */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8"
            >
              {data.tagline}
            </motion.p>

            {/* Location & Quick Meta Chips */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 mb-8"
            >
              <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-md border border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{data.location}</span>
              </div>
              <button
                id="hero-copy-email-chip"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 bg-neutral-900/80 hover:bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-800 hover:border-neutral-700 transition-colors text-neutral-300 hover:text-white"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{data.email}</span>
                    <Copy className="w-3 h-3 text-neutral-500 ml-1" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Geometric Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold text-xs sm:text-sm border border-blue-500/50 shadow-md shadow-blue-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Code2 className="w-4 h-4" />
                <span>EXPLORE_PROJECTS</span>
              </a>

              <a
                id="hero-contact-btn"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-neutral-100 font-mono font-semibold text-xs sm:text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Briefcase className="w-4 h-4 text-sky-400" />
                <span>GET_IN_TOUCH</span>
              </a>

              <button
                id="hero-resume-btn"
                onClick={onOpenResumeModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-blue-500/50 text-neutral-300 hover:text-white font-mono text-xs sm:text-sm transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>RESUME</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 pt-4 border-t border-neutral-900 w-full"
            >
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Networks:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {data.socials.map((social) => (
                  <a
                    key={social.id}
                    id={`hero-social-${social.id}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/40 text-xs font-mono text-neutral-300 hover:text-white transition-all group"
                  >
                    <span className="text-neutral-400 group-hover:text-blue-400 transition-colors">
                      {getSocialIcon(social.platform)}
                    </span>
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Profile Card & Highlight Metrics */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 shadow-2xl relative group geo-crosshair">
              {/* Decorative top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

              {/* Card Header with Avatar & Details */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="w-20 h-20 rounded-xl object-cover border border-neutral-700 shadow-md group-hover:border-blue-400 transition-all duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-neutral-900 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-mono">{data.name}</h3>
                  <p className="text-xs text-blue-400 font-mono mb-1">{data.title.split('&')[0]}</p>
                  <p className="text-xs text-neutral-400 line-clamp-1">{data.location}</p>
                </div>
              </div>

              {/* Bio quote excerpt */}
              <p className="text-xs text-neutral-300 leading-relaxed mb-6 bg-neutral-950/80 p-3.5 rounded-lg border border-neutral-800 font-mono">
                "{data.bio}"
              </p>

              {/* Stats Geometric 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                <div className="bg-neutral-950/90 border border-neutral-800 p-3 rounded-lg flex flex-col">
                  <span className="text-xl font-bold text-white font-mono tracking-tight">{data.stats.yearsOfExperience}</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Experience</span>
                </div>
                <div className="bg-neutral-950/90 border border-neutral-800 p-3 rounded-lg flex flex-col">
                  <span className="text-xl font-bold text-blue-400 font-mono tracking-tight">{data.stats.completedProjects}</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Shipped Apps</span>
                </div>
                <div className="bg-neutral-950/90 border border-neutral-800 p-3 rounded-lg flex flex-col">
                  <span className="text-xl font-bold text-sky-400 font-mono tracking-tight">{data.stats.codeCommits}</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Code Commits</span>
                </div>
                <div className="bg-neutral-950/90 border border-neutral-800 p-3 rounded-lg flex flex-col">
                  <span className="text-xl font-bold text-emerald-400 font-mono tracking-tight">{data.stats.happyCollaborators}</span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Satisfaction</span>
                </div>
              </div>

              {/* Quick Profile Actions */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-neutral-800">
                <button
                  id="hero-customize-trigger-card"
                  onClick={onOpenEditModal}
                  className="text-xs text-neutral-400 hover:text-blue-400 font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Customize Info</span>
                </button>

                <a
                  href="#about"
                  className="text-xs text-neutral-400 hover:text-white font-mono flex items-center gap-1 transition-colors"
                >
                  <span>Explore Bio</span>
                  <ArrowDown className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
