import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, FastForward, Play } from 'lucide-react';

interface MorphingTypographyIntroProps {
  onComplete: () => void;
  userName?: string;
}

const MORPH_WORDS = [
  'THARUN',
  'AI INTERN',
  'VIBE CODER',
  'FULL STACK BUILDER',
  'PORTFOLIO 2026'
];

const SUB_PHRASES = [
  'Architecting AI Systems & Local LLMs',
  'Virtual Internship 6.0 Alumnus',
  'High-Velocity AI-Assisted Prototyping',
  'LangGraph Agents • Next.js • Solidity',
  'Initializing Cybernetic Workspace...'
];

export const MorphingTypographyIntro: React.FC<MorphingTypographyIntroProps> = ({
  onComplete,
  userName = 'THARUN'
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Morphing words cycle and progress calculation
  useEffect(() => {
    const totalDuration = 3800; // total intro duration ~3.8 seconds
    const intervalTime = 700;
    const progressIntervalTime = 30;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + 100 / (totalDuration / progressIntervalTime));
      });
    }, progressIntervalTime);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < MORPH_WORDS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(wordTimer);
          timeoutRef.current = setTimeout(() => {
            handleFinish();
          }, 600);
          return prev;
        }
      });
    }, intervalTime);

    return () => {
      clearInterval(progressTimer);
      clearInterval(wordTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleFinish]);

  const currentWord = MORPH_WORDS[wordIndex];
  const currentSub = SUB_PHRASES[wordIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="morphing-typography-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: 'blur(16px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#070708] text-white overflow-hidden select-none"
        >
          {/* SVG Threshold Morph Filter Definition */}
          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
              <filter id="typography-threshold-morph">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0  
                          0 1 0 0 0  
                          0 0 1 0 0  
                          0 0 0 24 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Background Ambient Glows & Cyber Grid */}
          <div className="absolute inset-0 bg-geometric-grid opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-sky-500/10 blur-[90px] rounded-full pointer-events-none" />

          {/* Top HUD Bar */}
          <div className="w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-300">
                  SYSTEM_BOOT :: {userName}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  VIBE_CORE_READY [SYS:OK]
                </span>
              </div>
            </div>

            {/* Skip Action Button */}
            <button
              id="skip-intro-btn"
              onClick={handleFinish}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-400 hover:text-white transition-all group active:scale-95"
            >
              <span>Skip Intro</span>
              <FastForward className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              <kbd className="hidden sm:inline-block text-[9px] bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 text-neutral-400">
                ESC
              </kbd>
            </button>
          </div>

          {/* Center Stage: High-Impact Morphing Typography */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-4 z-10">
            {/* Geometric Axis Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <div className="h-48 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent absolute" />
            </div>

            {/* Corner Precision Targets */}
            <div className="relative w-full max-w-3xl min-h-[160px] sm:min-h-[220px] flex flex-col items-center justify-center p-8 border border-neutral-800/40 rounded-2xl bg-neutral-950/40 backdrop-blur-sm">
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-blue-500" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-blue-500" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-blue-500" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-blue-500" />

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5 mb-6">
                {MORPH_WORDS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === wordIndex
                        ? 'w-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                        : idx < wordIndex
                        ? 'w-3 bg-blue-400/40'
                        : 'w-2 bg-neutral-800'
                    }`}
                  />
                ))}
              </div>

              {/* The Morphing Typography Header Container */}
              <div className="relative w-full text-center overflow-visible min-h-[70px] sm:min-h-[100px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentWord}
                    initial={{
                      opacity: 0,
                      y: 20,
                      filter: 'blur(12px)',
                      letterSpacing: '0.15em',
                      scale: 0.95
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      letterSpacing: '0.04em',
                      scale: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      filter: 'blur(12px)',
                      letterSpacing: '0.18em',
                      scale: 1.05,
                      transition: {
                        duration: 0.35,
                        ease: [0.7, 0, 0.84, 0]
                      }
                    }}
                    style={{
                      fontFeatureSettings: '"salt", "ss01"'
                    }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                  >
                    {currentWord}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Sub-headline morphing smoothly alongside */}
              <div className="h-6 sm:h-8 flex items-center justify-center mt-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSub}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm font-mono text-neutral-400 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>{currentSub}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Progress & Coordinate HUD Bar */}
          <div className="w-full max-w-7xl mx-auto px-6 pb-6 z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>STATUS: MOUNTING_CANVAS</span>
              </span>
              <span className="text-neutral-300 font-bold">
                [{Math.round(progress)}%]
              </span>
            </div>

            {/* Precision Loading Progress Bar */}
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>LAT_LON :: 13.0827° N, 80.2707° E [CHENNAI / BLR]</span>
              <span>PRESS SPACE OR CLICK SKIP TO BYPASS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
