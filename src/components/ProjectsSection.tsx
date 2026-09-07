import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  ExternalLink, 
  Github, 
  Search, 
  ArrowRight, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { SectionReveal } from './SectionReveal';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'AI / Cloud', 'Mobile & Tools', 'Open Source'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Animation */}
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-400 text-xs font-mono mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>SYSTEMS_PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F0F0] tracking-tight">
              Featured Systems & Applications
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Selected production applications, high-performance web tools, and open-source systems.
            </p>
          </div>

          {/* Geometric Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search tech, title, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </SectionReveal>

        {/* Category Filters - Geometric Segmented Buttons */}
        <SectionReveal delay={0.1} className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' 
              ? projects.length 
              : projects.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                id={`project-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm border border-blue-500'
                    : 'bg-neutral-900/70 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-blue-700 text-blue-100' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </SectionReveal>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-neutral-900/30 border border-neutral-800 rounded-xl p-8"
          >
            <SlidersHorizontal className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1 font-mono">No matching projects found</h3>
            <p className="text-neutral-400 text-xs sm:text-sm mb-4">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-mono font-semibold hover:bg-neutral-700 transition-colors"
            >
              RESET_FILTERS
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (idx % 3) * 0.1, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="group bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
                >
                  {/* Project Image Preview */}
                  <div 
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-950/90 text-blue-300 border border-neutral-800 backdrop-blur-sm">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-950/90 text-blue-300 border border-blue-800/80 flex items-center gap-1 backdrop-blur-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    <span className="absolute top-3 right-3 text-[10px] font-mono bg-neutral-950/90 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                      {project.year}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 
                        onClick={() => setActiveModalProject(project)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 mb-1 font-mono"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-blue-300/80 line-clamp-1 mb-2">
                        {project.tagline}
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics preview */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {project.metrics.slice(0, 2).map((m, i) => (
                          <div key={i} className="bg-neutral-950 border border-neutral-800 px-2.5 py-1.5 rounded-md">
                            <span className="text-xs font-bold text-neutral-200 block font-mono">{m.value}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-500 bg-neutral-950 border border-neutral-900">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                      <button
                        id={`project-details-btn-${project.id}`}
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-mono font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 group/btn"
                      >
                        <span>DETAILS</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform text-blue-400" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.githubUrl && (
                          <a
                            id={`project-github-link-${project.id}`}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            id={`project-demo-link-${project.id}`}
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md bg-neutral-950 hover:bg-blue-600 text-neutral-400 hover:text-white border border-neutral-800 hover:border-blue-500 transition-colors"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
