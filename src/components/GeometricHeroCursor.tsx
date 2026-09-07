import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface GeometricHeroCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const GeometricHeroCursor: React.FC<GeometricHeroCursorProps> = ({ containerRef }) => {
  const [isInside, setIsInside] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing geometric ring spring physics
  const springConfig = { damping: 28, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Outer lag reticle spring
  const outerSpringConfig = { damping: 20, stiffness: 140, mass: 0.8 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    // Check if touch device
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        setIsInside(true);
        const relX = clientX - rect.left;
        const relY = clientY - rect.top;

        mouseX.set(relX);
        mouseY.set(relY);

        const normX = Math.round((relX / rect.width) * 100) / 100;
        const normY = Math.round((relY / rect.height) * 100) / 100;

        setCoords({
          x: Math.round(relX),
          y: Math.round(relY),
          normX,
          normY,
        });

        // Check if hovering interactive element (button, link, input, chip)
        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = Boolean(
            target.closest('a, button, input, textarea, select, [role="button"], .group, .geo-crosshair')
          );
          setIsHoveringInteractive(isInteractive);
        }
      } else {
        setIsInside(false);
        setIsHoveringInteractive(false);
      }
    };

    const handleMouseLeave = () => {
      setIsInside(false);
      setIsHoveringInteractive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {/* 1. Dynamic Radial Spotlight Following Cursor */}
      <motion.div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: smoothX,
          top: smoothY,
          background: isHoveringInteractive
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(56, 189, 248, 0.06) 40%, transparent 75%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(14, 165, 233, 0.03) 45%, transparent 70%)',
          opacity: isInside ? 1 : 0,
          transition: 'opacity 0.3s ease, background 0.3s ease',
        }}
      />

      {/* 2. Geometric Axis Crosshair Projection Lines */}
      {isInside && (
        <>
          {/* Horizontal coordinate ray */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none"
            style={{
              top: mouseY,
              opacity: isInside ? 1 : 0,
            }}
          />
          {/* Vertical coordinate ray */}
          <motion.div
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/15 to-transparent pointer-events-none"
            style={{
              left: mouseX,
              opacity: isInside ? 1 : 0,
            }}
          />
        </>
      )}

      {/* 3. Outer Trailing Geometric Bracket Box */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
            style={{
              left: outerX,
              top: outerY,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: isHoveringInteractive ? 1.4 : 1,
              rotate: isHoveringInteractive ? 45 : 0,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2 },
            }}
          >
            {/* Geometric Outer Bounding Square Frame */}
            <div
              className={`relative transition-all duration-300 ${
                isHoveringInteractive
                  ? 'w-11 h-11 border border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.4)] bg-blue-500/10'
                  : 'w-8 h-8 border border-blue-500/40 bg-blue-500/5'
              } rounded-sm`}
            >
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-blue-400" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-blue-400" />
              <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-blue-400" />
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-blue-400" />

              {/* Center subtle crosshair ticks */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-[1px] bg-blue-400/40" />
                <div className="h-2 w-[1px] bg-blue-400/40 absolute" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Snappy Inner Precision Reticle & Dot */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
            style={{
              left: smoothX,
              top: smoothY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Center target dot */}
            <div
              className={`rounded-full transition-all duration-200 ${
                isHoveringInteractive
                  ? 'w-2 h-2 bg-sky-300 shadow-[0_0_10px_#38bdf8]'
                  : 'w-1.5 h-1.5 bg-blue-400 shadow-[0_0_6px_#60a5fa]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Minimal Monospace HUD Coordinate Badge */}
      <AnimatePresence>
        {isInside && (
          <motion.div
            className="absolute pointer-events-none select-none"
            style={{
              left: smoothX,
              top: smoothY,
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            <div className="translate-x-5 translate-y-4 px-2 py-0.5 rounded bg-neutral-950/90 border border-neutral-800 text-[9px] font-mono text-neutral-400 shadow-xl backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isHoveringInteractive ? 'bg-sky-400 animate-pulse' : 'bg-blue-500'
                }`}
              />
              <span className="text-neutral-300">
                {coords.x},{coords.y}
              </span>
              {isHoveringInteractive && (
                <span className="text-sky-400 font-semibold uppercase text-[8px] tracking-wider pl-0.5 border-l border-neutral-800">
                  LOCKED
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
