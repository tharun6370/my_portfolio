import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward, Volume2, VolumeX, Sparkles, Terminal, Code2, Shield, Cpu, Layers } from 'lucide-react';

interface MarvelStudiosIntroProps {
  onComplete: () => void;
  userName?: string;
}

// Professional sequence cards highlighting real engineering domains, roles & projects
const CINEMATIC_WORDS = [
  {
    id: 'word-1',
    word: 'THARUN',
    roleTag: 'IDENTITY & PROFILE',
    subphrase: 'Student Engineer & Software Builder',
    detail: 'Seeking Internships (Remote | Chennai | Bangalore)',
    codeSnippet: 'const engineer = { name: "Tharun", role: "AI & Full-Stack", status: "Available" };',
    icon: Terminal,
    accent: '#3B82F6'
  },
  {
    id: 'word-2',
    word: 'AI INTERN',
    roleTag: 'EXPERIENCE // VIRTUAL INTERNSHIP 6.0',
    subphrase: 'Machine Learning & Cyber Threat Classification',
    detail: 'Engineered End-to-End AI Phishing Detection Platform',
    codeSnippet: 'const prediction = await mlClassifier.evaluateURL(targetDomain, lexicalFeatures);',
    icon: Shield,
    accent: '#10B981'
  },
  {
    id: 'word-3',
    word: 'VIBE CODER',
    roleTag: 'METHODOLOGY // MODERN AI-DRIVEN FLOW',
    subphrase: 'High-Velocity AI-Assisted System Architecture',
    detail: 'Building Complex Multi-Agent Pipelines & Full-Stack Apps with AI SDKs',
    codeSnippet: 'const agenticFlow = await buildAutonomousPipeline({ tools: [langGraph, geminiFlash] });',
    icon: Sparkles,
    accent: '#6366F1'
  },
  {
    id: 'word-4',
    word: 'STUDENT ENGINEER',
    roleTag: 'ACADEMICS // AUTODIDACTIC BUILDER',
    subphrase: 'Computer Science & Distributed Systems',
    detail: 'Driven Self-Learner Actively Welcoming Professional Industry Mentorship',
    codeSnippet: 'class KnowledgeEngine extends AutonomousCurriculum { async optimizeSkills() { ... } }',
    icon: Cpu,
    accent: '#0EA5E9'
  },
  {
    id: 'word-5',
    word: 'FULL STACK BUILDER',
    roleTag: 'ENGINEERING // PRODUCTION SYSTEMS',
    subphrase: 'AuditArmor AI • Superbot Universal RAG • Sentinel Protocol',
    detail: 'Local LLMs (Ollama), LangGraph Agents, FastAPI, Next.js & Solidity',
    codeSnippet: 'await Promise.all([localLLM.auditContracts(), vectorStore.query(embeddings)]);',
    icon: Layers,
    accent: '#8B5CF6'
  }
];

export const MarvelStudiosIntro: React.FC<MarvelStudiosIntroProps> = ({
  onComplete,
  userName = 'THARUN'
}) => {
  const [phase, setPhase] = useState<'flipping' | 'logo_lockup' | 'flare_shine' | 'complete'>('flipping');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // High-end ambient sound synthesizer with smooth transitions
  const playCinematicSound = useCallback((type: 'tick' | 'impact' | 'shimmer') => {
    if (!isAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'tick') {
        // Soft cinematic tick/thud for readable slide changes
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'impact') {
        // Deep, rich, low-frequency cinematic bass pad
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const sub = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';
        sub.type = 'sine';

        osc1.frequency.setValueAtTime(110, now);
        osc2.frequency.setValueAtTime(164.81, now);
        sub.frequency.setValueAtTime(55, now);
        sub.frequency.exponentialRampToValueAtTime(32, now + 1.6);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        osc1.connect(gain);
        osc2.connect(gain);
        sub.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        sub.start(now);

        osc1.stop(now + 2.0);
        osc2.stop(now + 2.0);
        sub.stop(now + 2.0);
      } else if (type === 'shimmer') {
        // Smooth ethereal shimmer harmonic
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.8); // C6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.9);
      }
    } catch {
      // Audio context browser policy safe fallback
    }
  }, [isAudioEnabled]);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Keyboard shortcut (Escape or Space to bypass smoothly)
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

  // Smooth, readable timing sequence (1.1 seconds per card for full legibility)
  useEffect(() => {
    const intervalTime = 1100;
    const totalWords = CINEMATIC_WORDS.length;

    const wordTimer = setInterval(() => {
      setCurrentIdx((prev) => {
        if (prev < totalWords - 1) {
          playCinematicSound('tick');
          return prev + 1;
        } else {
          clearInterval(wordTimer);
          return prev;
        }
      });
    }, intervalTime);

    // Final lockup phase
    const lockupTimer = setTimeout(() => {
      setPhase('logo_lockup');
      playCinematicSound('impact');
    }, totalWords * intervalTime + 100);

    // Subtle metallic light pass
    const flareTimer = setTimeout(() => {
      setPhase('flare_shine');
      playCinematicSound('shimmer');
    }, totalWords * intervalTime + 800);

    // Smooth exit into the live portfolio
    const exitTimer = setTimeout(() => {
      setPhase('complete');
      handleFinish();
    }, totalWords * intervalTime + 2200);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(lockupTimer);
      clearTimeout(flareTimer);
      clearTimeout(exitTimer);
    };
  }, [handleFinish, playCinematicSound]);

  const currentItem = CINEMATIC_WORDS[currentIdx];
  const CurrentIcon = currentItem.icon;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="cinematic-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04, 
            filter: 'blur(14px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#08090C] text-white overflow-hidden select-none font-sans"
        >
          {/* Subtle Ambient Vignette & Cyber Grid Background */}
          <div className="absolute inset-0 bg-geometric-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Top Cinema HUD Header */}
          <div className="relative z-40 w-full max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-200">
                  {userName} • PORTFOLIO 2026
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  INITIALIZING WORKSPACE SEQUENCE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Audio Toggle */}
              <button
                id="intro-sound-toggle-btn"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-all active:scale-95"
                title="Toggle Sound Effects"
              >
                {isAudioEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Audio</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="hidden sm:inline">Muted</span>
                  </>
                )}
              </button>

              {/* Skip Button */}
              <button
                id="cinematic-skip-intro-btn"
                onClick={handleFinish}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/50 text-xs font-mono font-medium text-neutral-300 hover:text-white transition-all active:scale-95 group"
              >
                <span>Skip</span>
                <FastForward className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                <kbd className="hidden sm:inline-block text-[9px] bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 text-neutral-400">
                  ESC
                </kbd>
              </button>
            </div>
          </div>

          {/* MAIN STAGE */}
          <div className="relative flex-1 flex items-center justify-center px-4 z-20">
            {phase === 'flipping' ? (
              /* SLOW, CRISP, HIGHLY READABLE CARD SLIDES */
              <div className="w-full max-w-3xl flex flex-col items-center">
                {/* Step indicators */}
                <div className="flex items-center gap-2 mb-6">
                  {CINEMATIC_WORDS.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        idx === currentIdx
                          ? 'w-10 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]'
                          : idx < currentIdx
                          ? 'w-4 bg-blue-400/40'
                          : 'w-2 bg-neutral-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Main Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(6px)' }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1, 
                      filter: 'blur(0px)',
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -14, 
                      scale: 1.02, 
                      filter: 'blur(6px)',
                      transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } 
                    }}
                    className="w-full bg-neutral-900/60 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center"
                  >
                    {/* Top Metadata Strip */}
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-neutral-800/70 border border-neutral-700/60">
                          <CurrentIcon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xs font-mono font-bold tracking-widest text-neutral-300">
                          {currentItem.roleTag}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">
                        PHASE 0{currentIdx + 1} / 0{CINEMATIC_WORDS.length}
                      </span>
                    </div>

                    {/* Massive, Readable Headline */}
                    <h2
                      className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white my-2"
                      style={{
                        fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                        letterSpacing: '0.04em'
                      }}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-300 drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
                        {currentItem.word}
                      </span>
                    </h2>

                    {/* Subtitle & Detail Statement */}
                    <p className="text-sm sm:text-base font-semibold text-blue-400 mt-2 font-mono">
                      {currentItem.subphrase}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl mx-auto leading-relaxed">
                      {currentItem.detail}
                    </p>

                    {/* Verified Code / Architecture Proof Snippet */}
                    <div className="mt-5 p-3 sm:p-3.5 bg-[#050507] border border-neutral-800/80 rounded-xl text-left font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto">
                      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-neutral-900 text-neutral-400 text-[10px]">
                        <Code2 className="w-3 h-3 text-blue-400" />
                        <span>VERIFIED ARCHITECTURE RUNTIME</span>
                      </div>
                      <code className="text-emerald-400/95 leading-relaxed block font-mono">
                        {currentItem.codeSnippet}
                      </code>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* CLEAN, PROFESSIONAL EMBLEM LOGO LOCKUP (No Red, Dark Slate & Cobalt Blue) */
              <motion.div
                initial={{ scale: 1.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 flex flex-col items-center justify-center text-center px-4"
              >
                {/* Executive Obsidian & Cobalt Frame */}
                <div className="relative bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-neutral-700/80 p-6 sm:p-10 rounded-2xl shadow-[0_0_60px_rgba(37,99,235,0.25),0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden max-w-2xl w-full">
                  {/* Subtle Ethereal Shimmer Pass */}
                  {phase === 'flare_shine' && (
                    <motion.div
                      initial={{ x: '-150%', opacity: 0 }}
                      animate={{ x: '250%', opacity: [0, 0.9, 0.9, 0] }}
                      transition={{ duration: 0.9, ease: 'easeInOut' }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent skew-x-[-25deg] pointer-events-none z-30"
                    />
                  )}

                  {/* Corner Accent Marks */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-blue-500" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-blue-500" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-blue-500" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-blue-500" />

                  {/* Primary Name Display */}
                  <h1
                    id="cinematic-logo-title"
                    className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                    style={{
                      fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                      letterSpacing: '0.04em'
                    }}
                  >
                    {userName}
                  </h1>

                  {/* Clean Professional Domain Sub-Badge */}
                  <div className="mt-4 inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 bg-neutral-900/90 border border-blue-500/30 rounded-lg">
                    <span 
                      className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-blue-300 font-mono"
                    >
                      AI INTERN • VIBE CODER • SOFTWARE ENGINEER
                    </span>
                  </div>

                  {/* Location & Availability Status */}
                  <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE FOR INTERNSHIPS
                    </span>
                    <span>•</span>
                    <span>REMOTE | CHENNAI | BANGALORE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Cinema HUD Footer */}
          <div className="relative z-40 w-full max-w-6xl mx-auto px-6 pb-6 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>SYSTEM: ONLINE_READY</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden sm:inline">PRESS SPACE OR ESC TO SKIP</span>
              <span className="text-blue-400 font-semibold">[PROFESSIONAL SEQUENCE]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
