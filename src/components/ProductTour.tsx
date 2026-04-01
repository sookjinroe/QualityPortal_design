import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { X, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { TourStep } from '../constants/tourSteps';

interface ProductTourProps {
  steps: TourStep[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (index: number) => void;
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
const renderDescription = (text: string) => {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-medium text-text-primary">{part}</strong>
      : part
  );
};

export const ProductTour = ({ steps, currentIndex, onNext, onPrev, onGoToStep, onClose }: ProductTourProps) => {
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

    if (step.type === 'modal') return;

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
    if (step.type === 'modal') return;
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

  // 타겟 요소 스타일 주입 (스포트라이트 대체)
  useEffect(() => {
    if (step.type === 'modal' || !step.target) return;

    const targetEl = document.querySelector(`[data-tour="${step.target}"]`) as HTMLElement;
    if (!targetEl) return;

    // 원래 스타일 저장
    const originalBorder = targetEl.style.border;
    const originalBackground = targetEl.style.background;
    const originalBorderRadius = targetEl.style.borderRadius;
    const originalTransition = targetEl.style.transition;

    // 스타일 적용
    targetEl.style.border = '1.5px solid #1D4ED8';
    targetEl.style.background = '#EFF6FF';
    targetEl.style.borderRadius = '10px';
    targetEl.style.transition = 'all 0.2s ease';

    return () => {
      targetEl.style.border = originalBorder;
      targetEl.style.background = originalBackground;
      targetEl.style.borderRadius = originalBorderRadius;
      targetEl.style.transition = originalTransition;
    };
  }, [step.target, step.type, currentIndex]);

  const getTooltipStyle = (): React.CSSProperties => {
    if (step.type === 'modal') {
      return {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }
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

  // Phase progress calculation
  const phaseInfo = useMemo(() => {
    if (!step.phase) return null;
    const phaseSteps = steps.filter(s => s.phase === step.phase);
    const currentInPhase = phaseSteps.findIndex(s => s.id === step.id) + 1;
    return {
      name: step.phase,
      current: currentInPhase,
      total: phaseSteps.length
    };
  }, [step, steps]);

  return (
    <div className="fixed inset-0 z-[500] pointer-events-none">
      {/* Modal Overlay for intro/outro */}
      {step.type === 'modal' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md pointer-events-auto transition-all duration-500" />
      )}

      {/* Tooltip / Modal Content */}
      {(rect || step.type === 'modal') && (
        <motion.div
          key={`tour-${currentIndex}`}
          className="fixed pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, x: step.type === 'modal' ? '-50%' : 0, y: step.type === 'modal' ? '-50%' : 10 }}
          animate={{ opacity: 1, scale: 1, x: step.type === 'modal' ? '-50%' : 0, y: step.type === 'modal' ? '-50%' : 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{ 
            ...getTooltipStyle(), 
            width: step.type === 'modal' ? 640 : 320, 
            zIndex: 502 
          }}
        >
          <div className={`bg-white overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-black/10 relative rounded-2xl`}>
            {step.type === 'modal' ? (
              /* Split Layout Modal */
              <div className="flex h-[340px]">
                {/* Left Side (Blue Visual) */}
                <div className="w-[200px] bg-brand-base flex-shrink-0 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-14 h-14 rounded-[14px] bg-white/15 flex items-center justify-center mb-6"
                  >
                    <ShieldCheck size={28} className="text-white" />
                  </motion.div>
                  
                  <div className="text-center z-10">
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[15px] font-medium text-white mb-1"
                    >
                      Quality Portal
                    </motion.div>
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[11px] text-white/60"
                    >
                      개발 인텔리전스 플랫폼
                    </motion.div>
                  </div>
                </div>

                {/* Right Side (Content) */}
                <div className="flex-1 flex flex-col bg-white">
                  <div className="p-8 pb-0 flex-1">
                    <div className="inline-flex items-center text-[10px] font-medium text-brand-base bg-brand-light px-2 py-1 rounded uppercase tracking-[0.06em] mb-4">
                      Product Tour
                    </div>
                    
                    <motion.h2 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[20px] font-medium text-text-primary leading-tight mb-3"
                    >
                      {step.title}
                    </motion.h2>
                    
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[13px] text-text-secondary leading-[1.7]"
                      >
                        {renderDescription(step.description)}
                    </motion.div>
                  </div>

                  <div className="px-7 py-5 border-t border-border-base flex items-center justify-between">
                    {currentIndex === 0 ? (
                      <>
                        <button 
                          onClick={onClose}
                          className="text-[12px] text-text-secondary hover:text-text-primary transition-colors"
                        >
                          건너뛰기
                        </button>
                        <button
                          onClick={onNext}
                          className="bg-brand-base hover:bg-brand-dark text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-all active:scale-95 flex items-center gap-1"
                        >
                          투어 시작하기 →
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex justify-end">
                        <button
                          onClick={onClose}
                          className="bg-[#111827] hover:bg-black text-white px-6 py-2 rounded-lg text-[13px] font-medium transition-all active:scale-95"
                        >
                          확인
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Tooltip Style */
              <>
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    {phaseInfo && (
                      <span className="text-[10px] font-medium text-brand-base uppercase tracking-[0.06em]">
                        {phaseInfo.name} ({phaseInfo.current}/{phaseInfo.total})
                      </span>
                    )}
                    <button onClick={onClose} className="w-5 h-5 flex items-center justify-center bg-nested-bg rounded-full transition-colors group">
                      <X size={12} className="text-text-muted group-hover:text-text-primary" />
                    </button>
                  </div>
                  
                  <h3 className="text-[15px] font-medium text-text-primary mb-2 leading-[1.4]">
                    {step.title}
                  </h3>
                  <div className="text-[13px] text-text-secondary leading-[1.65]">
                    {renderDescription(step.description)}
                  </div>
                </div>

                <div className="px-5 py-4 pb-[18px] flex items-center justify-between border-t border-nested-bg">
                  <div className="flex gap-1.5">
                    {(() => {
                      const tooltipSteps = steps.filter(s => s.type !== 'modal');
                      const currentTooltipIndex = tooltipSteps.findIndex(s => s.id === step.id);
                      return tooltipSteps.map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-full transition-all duration-300 ${
                            i === currentTooltipIndex ? 'w-3.5 h-1.5 bg-brand-base' : 'w-1.5 h-1.5 bg-border-strong'
                          }`}
                        />
                      ));
                    })()}
                  </div>
                  
                  <div className="flex gap-2">
                    {currentIndex > 1 && ( // 인트로 다음부터 이전 버튼 표시
                      <button 
                        onClick={onPrev} 
                        className="px-3 py-[7px] border border-border-base bg-white text-text-primary text-[12px] font-medium rounded-lg hover:bg-nested-bg transition-all active:scale-95"
                      >
                        이전
                      </button>
                    )}
                    
                    <button
                      onClick={currentIndex < steps.length - 1 ? onNext : onClose}
                      className={`px-3.5 py-[7px] text-white text-[12px] font-medium rounded-lg transition-all active:scale-95 ${
                        currentIndex === steps.length - 2 ? 'bg-[#111827] hover:bg-black' : 'bg-brand-base hover:bg-brand-dark'
                      }`}
                    >
                      {currentIndex === steps.length - 2 ? '완료' : '다음'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
