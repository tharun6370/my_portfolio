import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Check, 
  Sliders
} from 'lucide-react';
import { PortfolioData } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if initial data changes
  React.useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  const handleTextChange = (field: keyof PortfolioData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (index: number, field: 'url' | 'username', value: string) => {
    setFormData((prev) => {
      const updatedSocials = [...prev.socials];
      updatedSocials[index] = {
        ...updatedSocials[index],
        [field]: value
      };
      return {
        ...prev,
        socials: updatedSocials
      };
    });
  };

  const handleStatChange = (key: keyof PortfolioData['stats'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all portfolio information to the initial default template?')) {
      onReset();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="edit-profile-modal-backdrop"
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
            id="edit-profile-modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-4 max-h-[90vh] flex flex-col font-sans z-10"
          >
            {/* Header */}
            <div className="bg-neutral-950/90 border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider">
                  Customize Portfolio Information
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="reset-profile-defaults-btn"
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950/50 hover:text-rose-400 text-xs font-mono font-semibold text-neutral-300 border border-neutral-700 transition-colors"
                  title="Reset to default template"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">RESET_DEFAULTS</span>
                </button>

                <button
                  id="edit-profile-close-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#0A0A0A]">
              {saveSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Portfolio updated and saved to local state successfully!</span>
                </div>
              )}

              {/* Section 1: Basic Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                  01. BASIC IDENTITY & BIO
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">YOUR FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleTextChange('name', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">PROFESSIONAL TITLE</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTextChange('title', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">HEADLINE / TAGLINE</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => handleTextChange('tagline', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">SHORT BIO</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.bio}
                    onChange={(e) => handleTextChange('bio', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 resize-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">PRIMARY EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleTextChange('email', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">LOCATION / TIMEZONE</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleTextChange('location', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Available for Hire Switch */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    id="edit-available-for-hire"
                    type="checkbox"
                    checked={formData.availableForHire}
                    onChange={(e) => handleTextChange('availableForHire', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-neutral-950 border-neutral-800 focus:ring-blue-500"
                  />
                  <label htmlFor="edit-available-for-hire" className="text-xs font-mono text-neutral-200 cursor-pointer">
                    Display "Available for Work" active status badge
                  </label>
                </div>
              </div>

              {/* Section 2: Social Links */}
              <div className="space-y-4 pt-4 border-t border-neutral-900">
                <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  02. PROFESSIONAL HUBS & SOCIALS
                </h3>

                <div className="space-y-2.5">
                  {formData.socials.map((social, index) => (
                    <div key={social.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                      <div className="sm:col-span-3 text-xs font-mono text-neutral-300 flex items-center">
                        {social.platform}
                      </div>
                      <div className="sm:col-span-5">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={social.url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder="Handle"
                          value={social.username}
                          onChange={(e) => handleSocialChange(index, 'username', e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Key Metrics Stats */}
              <div className="space-y-4 pt-4 border-t border-neutral-900">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  03. HIGHLIGHT METRICS
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">YEARS EXP</label>
                    <input
                      type="text"
                      value={formData.stats.yearsOfExperience}
                      onChange={(e) => handleStatChange('yearsOfExperience', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">PROJECTS</label>
                    <input
                      type="text"
                      value={formData.stats.completedProjects}
                      onChange={(e) => handleStatChange('completedProjects', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">COMMITS</label>
                    <input
                      type="text"
                      value={formData.stats.codeCommits}
                      onChange={(e) => handleStatChange('codeCommits', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">FEEDBACK</label>
                    <input
                      type="text"
                      value={formData.stats.happyCollaborators}
                      onChange={(e) => handleStatChange('happyCollaborators', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Action buttons */}
              <div className="pt-5 border-t border-neutral-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  id="save-profile-btn"
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold text-xs shadow-sm transition-all active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>APPLY_CHANGES</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
