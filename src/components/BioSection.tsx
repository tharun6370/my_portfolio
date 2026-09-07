import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Users, 
  Sparkles
} from 'lucide-react';
import { PortfolioData } from '../types';
import { SectionReveal } from './SectionReveal';

interface BioSectionProps {
  data: PortfolioData;
}

export const BioSection: React.FC<BioSectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience' | 'education'>('bio');

  const principles = [
    {
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      title: 'Performance & Efficiency',
      description: 'Designing sub-second latency experiences, optimizing critical rendering paths, and minimizing cloud compute overhead.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
      title: 'Resilient Architecture',
      description: 'Building type-safe, defensively programmed systems with automated testing and graceful degradation.'
    },
    {
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      title: 'Empathy & Collaboration',
      description: 'Translating human workflows into delightful software interfaces with accessible standards and clear documentation.'
    },
    {
      icon: <Compass className="w-4 h-4 text-sky-400" />,
      title: 'Continuous Mastery',
      description: 'Staying on the frontier of full-stack ecosystems, modern AI integrations, and developer tooling.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Fade In */}
        <SectionReveal className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>BIOGRAPHY_&_BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F0F0] tracking-tight">
            Crafting scalable software with deliberate purpose
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            A closer look into my background, technical journey, engineering philosophies, and career milestones.
          </p>
        </SectionReveal>

        {/* Navigation Tabs - Geometric Segmented Layout */}
        <SectionReveal delay={0.1} className="flex items-center gap-2 border-b border-neutral-900 pb-4 mb-10 overflow-x-auto">
          <button
            id="bio-tab-biography"
            onClick={() => setActiveTab('bio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'bio'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>01. Personal Narrative</span>
          </button>

          <button
            id="bio-tab-experience"
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>02. Career Timeline ({data.experiences.length})</span>
          </button>

          <button
            id="bio-tab-education"
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'education'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>03. Academia & Education</span>
          </button>
        </SectionReveal>

        {/* Tab Contents with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Tab 1: Biography / Narrative */}
          {activeTab === 'bio' && (
            <motion.div
              key="bio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Story Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Engineering Mindset & Background
                  </h3>

                  {data.detailedBio.map((paragraph, idx) => (
                    <p key={idx} className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Quick Factoids / Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Primary Focus</span>
                    <span className="text-xs sm:text-sm font-medium text-neutral-200">AI Agents, Local LLMs & Vibe Coding</span>
                  </div>
                  <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Internship Preference</span>
                    <span className="text-xs sm:text-sm font-medium text-emerald-400">Remote | Chennai | Bangalore</span>
                  </div>
                  <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Mentorship Status</span>
                    <span className="text-xs sm:text-sm font-medium text-amber-300">Seeking Guidance from Senior Devs</span>
                  </div>
                  <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Direct Contact</span>
                    <span className="text-xs sm:text-sm font-medium text-blue-400 font-mono">{data.email}</span>
                  </div>
                </div>
              </div>

              {/* Principles Column */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Core Philosophies</h3>
                {principles.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800 p-4.5 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 group-hover:border-neutral-700">
                        {p.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pl-11">
                      {p.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Experience Timeline */}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              id="experience"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="relative border-l-2 border-neutral-800 ml-3 md:ml-4 pl-6 md:pl-8 space-y-8">
                {data.experiences.map((exp, idx) => (
                  <motion.div 
                    key={exp.id} 
                    className="relative group"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {/* Timeline Square Node */}
                    <div className={`absolute -left-[31px] md:-left-[39px] top-2 w-3.5 h-3.5 rounded-sm border-2 bg-neutral-950 transition-colors ${
                      exp.current 
                        ? 'border-blue-400 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                        : 'border-neutral-700 group-hover:border-neutral-500'
                    }`} />

                    {/* Card Container */}
                    <div className="bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 sm:p-6 transition-all duration-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-white font-mono">{exp.role}</h3>
                            {exp.current && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                                PRESENT
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-blue-400 flex items-center gap-1.5 mt-0.5 font-mono">
                            <span>{exp.company}</span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-neutral-400 text-xs">{exp.location}</span>
                          </div>
                        </div>

                        <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1 rounded-md border border-neutral-800 self-start md:self-auto">
                          {exp.period}
                        </div>
                      </div>

                      <p className="text-neutral-300 text-xs sm:text-sm mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-1.5 mb-4">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-800">
                        <span className="text-[11px] font-mono text-neutral-500 mr-1">STACK:</span>
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Education */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {data.education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center mb-5">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 font-mono">{edu.degree}</h3>
                  <h4 className="text-sm text-blue-400 font-medium mb-3 font-mono">{edu.institution}</h4>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                    <span>{edu.period}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </div>

                  {edu.honors && (
                    <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 mb-3">
                      {edu.honors}
                    </div>
                  )}

                  {edu.details && (
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
