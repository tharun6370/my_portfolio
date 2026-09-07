import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Search, 
  Cpu, 
  Globe, 
  Database, 
  Sparkles,
  Terminal, 
  Shield, 
  Boxes,
  X
} from 'lucide-react';
import { SkillCategory, SkillItem } from '../types';
import { SectionReveal } from './SectionReveal';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryTitles = useMemo(() => {
    return ['All', ...skills.map((c) => c.title)];
  }, [skills]);

  const getCategoryIcon = (categoryTitle: string) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes('frontend')) return <Globe className="w-4 h-4 text-blue-400" />;
    if (title.includes('backend') || title.includes('api')) return <Database className="w-4 h-4 text-emerald-400" />;
    if (title.includes('cloud') || title.includes('devops')) return <Cpu className="w-4 h-4 text-sky-400" />;
    if (title.includes('ai') || title.includes('architect')) return <Boxes className="w-4 h-4 text-amber-400" />;
    if (title.includes('language')) return <Terminal className="w-4 h-4 text-purple-400" />;
    return <Shield className="w-4 h-4 text-neutral-400" />;
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return skills
      .filter((cat) => selectedCategory === 'All' || cat.title === selectedCategory)
      .map((cat) => {
        if (!q) return cat;

        const matchedSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.years.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q)
        );

        return {
          ...cat,
          skills: matchedSkills,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [skills, selectedCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return skills.reduce((sum, c) => sum + c.skills.length, 0);
  }, [skills]);

  return (
    <section id="skills" className="py-24 bg-[#0A0A0A] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Fade-In */}
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-400 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F0F0] tracking-tight">
              Technical Stack & Domain Mastery
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Engineered with depth across frontend design architectures, scalable backend infrastructures, and developer workflows.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                aria-label="Clear skill search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </SectionReveal>

        {/* Category Selector Tabs */}
        <SectionReveal delay={0.1} className="flex items-center gap-2 overflow-x-auto pb-3 mb-10">
          {categoryTitles.map((title) => {
            const isSelected = selectedCategory === title;
            const count = title === 'All'
              ? totalSkillCount
              : skills.find((c) => c.title === title)?.skills.length || 0;

            return (
              <button
                key={title}
                id={`skill-category-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(title)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm border border-blue-500'
                    : 'bg-neutral-900/70 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>{title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-blue-700 text-blue-100' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </SectionReveal>

        {/* Categorized Skills Grid Layout */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/30 border border-neutral-800 rounded-xl p-8">
            <p className="text-neutral-400 text-sm font-mono">No skills match the current search query.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredCategories.map((category, cIdx) => (
              <motion.div 
                key={category.id} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: cIdx * 0.08 }}
              >
                {/* Category Subheader */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-neutral-900">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800">
                      {getCategoryIcon(category.title)}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-mono">{category.title}</h3>
                      <p className="text-xs text-neutral-500 hidden sm:block">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">({category.skills.length} skills)</span>
                </div>

                {/* Grid of Skill Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill: SkillItem, idx: number) => (
                    <motion.div
                      key={skill.name}
                      id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                      className="bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 p-4 rounded-xl transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-mono group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                            {skill.name}
                            {skill.isKeySkill && (
                              <Sparkles className="w-3 h-3 text-amber-400" />
                            )}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-blue-400 font-semibold">{skill.level}%</span>
                      </div>

                      {/* Animated Skill Progress Meter */}
                      <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden border border-neutral-800/80 mb-2.5">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.15 + (idx % 3) * 0.05, ease: 'easeOut' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>{skill.years} experience</span>
                        {skill.isKeySkill && (
                          <span className="text-[10px] text-amber-400/90 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-900/60">
                            CORE
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
