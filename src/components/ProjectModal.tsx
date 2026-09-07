import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle, 
  Calendar, 
  BarChart3, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          id="project-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            id="project-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col font-sans z-10"
          >
            {/* Header with image banner */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-neutral-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

              {/* Close Button */}
              <button
                id="project-modal-close-btn"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title on image */}
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-950 text-blue-300 border border-blue-800/60">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-mono">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-mono">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.demoUrl && (
                  <a
                    id="modal-live-demo-link"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold text-xs shadow-sm transition-colors"
                  >
                    <span>LAUNCH_INTERACTIVE_DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    id="modal-github-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white font-mono font-semibold text-xs transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE_CODE</span>
                  </a>
                )}
              </div>

              {/* Detailed Overview */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Project Overview
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Metrics / Impact */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-2.5 flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    Performance Metrics & Results
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
                        <span className="text-base font-bold text-white block font-mono">{m.value}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture & Engineering Highlights */}
              {project.architecture && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-2.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    System Architecture
                  </h3>
                  <div className="space-y-1.5 bg-neutral-950/80 border border-neutral-800 p-4 rounded-lg">
                    {project.architecture.map((arch, idx) => (
                      <div key={idx} className="text-xs font-mono text-neutral-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>{arch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Technical Highlights */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Key Features & Highlights
                </h3>
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Toolchain & Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
