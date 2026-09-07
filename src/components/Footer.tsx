import React from 'react';
import { 
  ArrowUp, 
  Code2, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Sliders,
  Sparkles,
  Film
} from 'lucide-react';
import { PortfolioData } from '../types';

interface FooterProps {
  data: PortfolioData;
  onOpenEditModal: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenEditModal, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-900 py-10 text-neutral-400 text-xs sm:text-sm font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          {/* Logo / Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="font-bold text-white tracking-tight text-sm">{data.name}</span>
            </div>
            <p className="text-[11px] text-neutral-500 max-w-sm">
              {data.title} • Designing resilient, high-performance systems.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {data.socials.map((social) => (
              <a
                key={social.id}
                id={`footer-social-${social.id}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title={social.platform}
              >
                {social.platform.toLowerCase().includes('github') && <Github className="w-3.5 h-3.5" />}
                {social.platform.toLowerCase().includes('linkedin') && <Linkedin className="w-3.5 h-3.5" />}
                {social.platform.toLowerCase().includes('twitter') && <Twitter className="w-3.5 h-3.5" />}
                {social.platform.toLowerCase().includes('email') && <Mail className="w-3.5 h-3.5" />}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3 text-blue-400" />
          </button>
        </div>

        {/* Bottom Credits & Customize Shortcut */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {onReplayIntro && (
              <button
                id="footer-replay-intro-btn"
                onClick={onReplayIntro}
                className="text-neutral-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>REPLAY_INTRO</span>
              </button>
            )}
            <button
              onClick={onOpenEditModal}
              className="text-neutral-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3 h-3 text-blue-400" />
              <span>CUSTOMIZE_PROFILE</span>
            </button>
            <span className="hidden sm:inline">•</span>
            <span>GEOMETRIC_BALANCE_THEME</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
