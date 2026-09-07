import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  MapPin, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Wrench
} from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${data.name.toLowerCase().replace(/\s+/g, '_')}_resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="resume-modal-backdrop"
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

          {/* Modal dialog */}
          <motion.div
            id="resume-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col font-sans z-10"
          >
            {/* Top Control Bar */}
            <div className="bg-neutral-950/90 border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider">
                  CURRICULUM_VITAE // RESUME
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800/50">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="resume-print-btn"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-semibold text-neutral-200 hover:text-white transition-colors"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">PRINT / PDF</span>
                </button>

                <button
                  id="resume-export-json-btn"
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-semibold text-neutral-200 hover:text-white transition-colors"
                  title="Download Data JSON"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">EXPORT_JSON</span>
                </button>

                <button
                  id="resume-modal-close-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Content Sheet */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#0A0A0A] font-sans">
              {/* Header section */}
              <div className="border-b border-neutral-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{data.name}</h1>
                <h2 className="text-sm sm:text-base text-blue-400 font-mono font-semibold mt-1">{data.title}</h2>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400 mt-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {data.location}
                  </span>
                  <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    {data.email}
                  </a>
                  {data.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                      {s.platform}: {s.username}
                    </a>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-2">
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {data.bio}
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-4 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  Work History & Experience
                </h3>

                <div className="space-y-6">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                        <div>
                          <span className="font-bold text-white font-mono">{exp.role}</span>
                          <span className="text-neutral-400"> — {exp.company}</span>
                        </div>
                        <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                      </div>

                      <p className="text-xs text-neutral-400">{exp.description}</p>

                      <div className="space-y-1 pl-2">
                        {exp.achievements.map((ach, idx) => (
                          <div key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.technologies.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.2 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  Education & Academia
                </h3>

                {data.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white font-mono">{edu.degree}</span>
                      <span className="text-xs font-mono text-neutral-400">{edu.period}</span>
                    </div>
                    <div className="text-xs text-blue-400 font-mono">{edu.institution} ({edu.location})</div>
                    {edu.honors && <div className="text-[11px] text-emerald-400 font-mono">{edu.honors}</div>}
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 mb-3 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  Core Competencies
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.skills.map((cat) => (
                    <div key={cat.id} className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-800">
                      <span className="text-xs font-bold text-neutral-200 block mb-1 font-mono">{cat.title}</span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {cat.skills.map(s => s.name).join(', ')}
                      </span>
                    </div>
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
