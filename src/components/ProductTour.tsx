import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { TourStep } from '../constants/tourSteps';

interface ProductTourProps {
  steps: TourStep[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TOOLTIP_WIDTH = 300;
const GAP = 14;

export const ProductTour = ({ steps, currentIndex, onNext, onPrev, onClose }: ProductTourProps) => {
  const [rect, setRect] = useState<Rect | null>(null);
  const step = steps[currentIndex];
  const retryRef = useRef(0);

  useEffect(() => {
    setRect(null);
    retryRef.current = 0;

    const tryFind = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          const r = el.getBoundingClientRect();
          const pad = step.padding ?? 8;
          setRect({
            x: r.left - pad,
            y: r.top - pad,
            width: r.width + pad * 2,
            height: r.height + pad * 2,
          });
        }, 350);
        return true;
      }
      return false;
    };

    const initial = setTimeout(() => {
      if (!tryFind()) {
        const retry = setInterval(() => {
          retryRef.current++;
          if (tryFind() || retryRef.current >= 15) clearInterval(retry);
        }, 200);
      }
    }, 450);

    return () => clearTimeout(initial);
  }, [currentIndex, step.target, step.padding]);

  // Recalculate on resize
  useEffect(() => {
    const onResize = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (el) {
        const r = el.getBoundingClientRect();
        const pad = step.padding ?? 8;
        setRect({ x: r.left - pad, y: r.top - pad, width: r.width + pad * 2, height: r.height + pad * 2 });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [step.target, step.padding]);

  const getTooltipStyle = (): React.CSSProperties => {
    if (!rect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const th = 170;

    switch (step.position) {
      case 'right': return {
        left: Math.min(rect.x + rect.width + GAP, vw - TOOLTIP_WIDTH - 16),
        top: Math.max(16, Math.min(rect.y, vh - th - 16)),
      };
      case 'left': return {
        left: Math.max(16, rect.x - TOOLTIP_WIDTH - GAP),
        top: Math.max(16, Math.min(rect.y, vh - th - 16)),
      };
      case 'bottom': return {
        top: Math.min(rect.y + rect.height + GAP, vh - th - 16),
        left: Math.max(16, Math.min(rect.x + rect.width / 2 - TOOLTIP_WIDTH / 2, vw - TOOLTIP_WIDTH - 16)),
      };
      case 'top': return {
        top: Math.max(16, rect.y - th - GAP),
        left: Math.max(16, Math.min(rect.x + rect.width / 2 - TOOLTIP_WIDTH / 2, vw - TOOLTIP_WIDTH - 16)),
      };
    }
  };

  return (
    <div className="fixed inset-0 z-[500] pointer-events-none">
      {/* Spotlight — box-shadow creates the dark overlay with a transparent hole */}
      {rect ? (
        <motion.div
          className="fixed rounded-xl pointer-events-none"
          initial={false}
          animate={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          style={{
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.62)',
            outline: '2px solid #3B82F6',
            outlineOffset: '0px',
          }}
        />
      ) : (
        // Loading — dark overlay while element not yet found
        <div className="fixed inset-0 bg-black/60 pointer-events-none" />
      )}

      {/* Tooltip */}
      {rect && (
        <motion.div
          key={`tooltip-${currentIndex}`}
          className="fixed pointer-events-auto"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, delay: 0.12 }}
          style={{ ...getTooltipStyle(), width: TOOLTIP_WIDTH, zIndex: 502 }}
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.28)] border border-border-base">
            {/* Header */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start justify-between mb-2.5">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  {currentIndex + 1} / {steps.length}
                </span>
                <button
                  onClick={onClose}
                  className="w-5 h-5 rounded-full bg-nested-bg hover:bg-border-base flex items-center justify-center transition-colors shrink-0"
                >
                  <X size={11} className="text-text-muted" />
                </button>
              </div>
              <h3 className="text-[14px] font-bold text-text-primary mb-1.5">{step.title}</h3>
              <p className="text-[12.5px] text-text-secondary leading-relaxed">{step.description}</p>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 flex items-center justify-between border-t border-border-base/50 pt-3">
              {/* Progress dots */}
              <div className="flex gap-1 items-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-5 h-1.5 bg-brand-base'
                        : i < currentIndex
                        ? 'w-1.5 h-1.5 bg-brand-base/35'
                        : 'w-1.5 h-1.5 bg-border-strong'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-2">
                {currentIndex > 0 && (
                  <button
                    onClick={onPrev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-base bg-white hover:bg-nested-bg text-[12px] font-semibold text-text-secondary transition-colors"
                  >
                    <ChevronLeft size={13} /> 이전
                  </button>
                )}
                <button
                  onClick={currentIndex < steps.length - 1 ? onNext : onClose}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-base hover:bg-brand-dark text-white text-[12px] font-semibold transition-colors shadow-sm"
                >
                  {currentIndex < steps.length - 1
                    ? <> 다음 <ChevronRight size={13} /> </>
                    : '완료'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};