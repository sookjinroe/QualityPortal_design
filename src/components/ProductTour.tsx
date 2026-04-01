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

const TOOLTIP_WIDTH = 320;
const GAP = 16;

export const ProductTour = ({ steps, currentIndex, onNext, onPrev, onClose }: ProductTourProps) => {
  const [rect, setRect] = useState<Rect | null>(null);
  const step = steps[currentIndex];
  const retryRef = useRef(0);

  // 요소 위치 및 크기 계산 로직
  const updateRect = () => {
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      const pad = step.padding ?? 8;
      setRect({
        x: r.left - pad,
        y: r.top - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
      });
    }
  };

  useEffect(() => {
    setRect(null);
    retryRef.current = 0;

    const tryFind = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 스크롤 애니메이션 시간을 고려하여 지연 업데이트
        setTimeout(updateRect, 350);
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
  }, [currentIndex, step.target]);

  // 실시간 레이아웃 변화 및 스크롤 감지
  useEffect(() => {
    const targetEl = document.querySelector(`[data-tour="${step.target}"]`);
    if (!targetEl) return;

    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(targetEl);
    
    window.addEventListener('resize', updateRect);
    // 메인 컨텐츠 영역의 스크롤 감지
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.addEventListener('scroll', updateRect, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateRect);
      if (mainContent) mainContent.removeEventListener('scroll', updateRect, true);
    };
  }, [step.target, currentIndex]);

  const getTooltipStyle = (): React.CSSProperties => {
    if (!rect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const th = 180; // 예상 툴팁 높이

    switch (step.position) {
      case 'right': return {
        left: Math.min(rect.x + rect.width + GAP, vw - TOOLTIP_WIDTH - 20),
        top: Math.max(20, Math.min(rect.y, vh - th - 20)),
      };
      case 'left': return {
        left: Math.max(20, rect.x - TOOLTIP_WIDTH - GAP),
        top: Math.max(20, Math.min(rect.y, vh - th - 20)),
      };
      case 'bottom': return {
        top: Math.min(rect.y + rect.height + GAP, vh - th - 20),
        left: Math.max(20, Math.min(rect.x + rect.width / 2 - TOOLTIP_WIDTH / 2, vw - TOOLTIP_WIDTH - 20)),
      };
      case 'top': return {
        top: Math.max(20, rect.y - th - GAP),
        left: Math.max(20, Math.min(rect.x + rect.width / 2 - TOOLTIP_WIDTH / 2, vw - TOOLTIP_WIDTH - 20)),
      };
      default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-[500] pointer-events-none">
      {/* SVG Spotlight Mask */}
{/* AS-IS: 기존 SVG 전체 블록을 아래 내용으로 교체 */}
      {rect ? (
        <svg className="fixed inset-0 w-full h-full pointer-events-none overflow-visible">
          {/* 테두리 외곽에 아주 미세한 광채만 부여 */}
          <motion.rect
            initial={false}
            animate={{ x: rect.x, y: rect.y, width: rect.width, height: rect.height }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            fill="none"
            stroke="var(--brand-base)"
            strokeWidth="1.2" // 트렌드 반영: 3 -> 1.2로 극도로 얇게
            rx="12"
            style={{
              // 트렌드 반영: 넓은 블러 대신 좁고 선명한 광채(4px)
              filter: 'drop-shadow(0 0 4px rgba(29, 78, 216, 0.35))',
            }}
          />
        </svg>
      ) : (
        // 배경 딤드를 거의 투명하게 처리 (0.02)
        <div className="fixed inset-0 bg-black/[0.02]" />
      )}
      {/* Tooltip */}
      {rect && (
        <motion.div
          key={`tooltip-${currentIndex}`}
          className="fixed pointer-events-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          style={{ ...getTooltipStyle(), width: TOOLTIP_WIDTH, zIndex: 502 }}
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_25px_rgba(0,0,0,0.3)] border border-border-base">
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-nested-bg px-2 py-0.5 rounded">
                  STEP {currentIndex + 1} / {steps.length}
                </span>
                <button onClick={onClose} className="p-1 hover:bg-nested-bg rounded-full transition-colors">
                  <X size={14} className="text-text-muted" />
                </button>
              </div>
              <h3 className="text-[15px] font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{step.description}</p>
            </div>

            <div className="px-5 pb-4 flex items-center justify-between border-t border-border-base/50 pt-4">
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'w-4 bg-brand-base' : 'w-1.5 bg-border-strong'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {currentIndex > 0 && (
                  <button onClick={onPrev} className="px-3 py-1.5 rounded-lg border text-[12px] font-medium hover:bg-nested-bg transition-colors">
                    이전
                  </button>
                )}
                <button
                  onClick={currentIndex < steps.length - 1 ? onNext : onClose}
                  className="px-4 py-1.5 rounded-lg bg-brand-base hover:bg-brand-dark text-white text-[12px] font-bold transition-all shadow-md active:scale-95"
                >
                  {currentIndex < steps.length - 1 ? '다음 단계' : '투어 완료'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};