import { 
  Sparkles, 
  ChevronRight,
  Compass, 
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { AIAgentPage } from './pages/AIAgentPage';
import { AIChatPage } from './pages/AIChatPage';
import { AIChatHistoryPage } from './pages/AIChatHistoryPage';
import { Page } from './types';
import { ProductTour } from './components/ProductTour';
import { TOUR_STEPS } from './constants/tourSteps';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const toggleAiPanel = () => setIsAiPanelOpen(!isAiPanelOpen);

  const dispatchTourAction = (action?: string) => {
    if (!action) return;
    setTimeout(() => {
      switch (action) {
        case 'select-anomaly':
          window.dispatchEvent(new CustomEvent('tour-select-briefing', { detail: { id: '1' } }));
          break;
        case 'select-regular':
          window.dispatchEvent(new CustomEvent('tour-select-briefing', { detail: { id: '2' } }));
          break;
        case 'open-new-chat':
          window.dispatchEvent(new CustomEvent('start-new-chat'));
          break;
        case 'select-chat-item':
          window.dispatchEvent(new CustomEvent('tour-select-chat', { detail: { id: '1' } }));
          break;
      }
    }, 600);
  };

  const startTour = () => {
    const firstStep = TOUR_STEPS[0];
    setIsAiPanelOpen(false);
    setTourStepIndex(0);
    setCurrentPage(firstStep.page);
    setIsTourActive(true);
    dispatchTourAction(firstStep.action);
  };

  const handleTourNext = () => {
    const nextIndex = tourStepIndex + 1;
    if (nextIndex >= TOUR_STEPS.length) {
      setIsTourActive(false);
      return;
    }
    const nextStep = TOUR_STEPS[nextIndex];
    if (nextStep.page !== currentPage) {
      setIsAiPanelOpen(false);
      setCurrentPage(nextStep.page);
    }
    dispatchTourAction(nextStep.action);
    setTourStepIndex(nextIndex);
  };

  const handleTourPrev = () => {
    const prevIndex = tourStepIndex - 1;
    if (prevIndex < 0) return;
    const prevStep = TOUR_STEPS[prevIndex];
    if (prevStep.page !== currentPage) {
      setIsAiPanelOpen(false);
      setCurrentPage(prevStep.page);
    }
    dispatchTourAction(prevStep.action);
    setTourStepIndex(prevIndex);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-app-bg">
      {/* Left Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        isAiPanelOpen={isAiPanelOpen}
        setCurrentPage={setCurrentPage} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-hidden bg-app-bg relative border-r border-border-base">
          {/* Top Bar */}
          <header className="h-[52px] bg-card-bg border-b border-border-base px-6 flex items-center justify-between shrink-0 relative z-10">
            <div className="text-[13px] text-text-secondary flex items-center gap-1.5">
              ERP 고도화 <ChevronRight size={14} className="text-border-strong" /> 
              <strong className="text-text-primary font-semibold">
                {currentPage === 'ai-agent' ? 'AI 브리핑' : currentPage === 'ai-chat' ? 'AI 대화' : '대시보드'}
              </strong>
              <span className="text-[11px] text-text-muted ml-1.5">
                {currentPage === 'ai-agent' ? '방금 전 업데이트' : currentPage === 'ai-chat' ? '실시간 분석' : '실시간 · 스프린트 4'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {currentPage === 'ai-agent' ? (
                <>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-success font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-custom" />
                    실시간 모니터링 중
                  </div>
                  <button className="btn-secondary py-1.5">필터</button>
                  <button className="btn-primary py-1.5">보고서 생성</button>
                </>
              ) : (
                <>
                  <button className="btn-secondary py-1.5">기간 설정</button>
                  <button className="btn-secondary py-1.5">보고서 생성</button>
                </>
              )}
              <button
                onClick={startTour}
                className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-border-base bg-white text-text-secondary hover:text-brand-base hover:border-brand-base transition-colors flex items-center gap-1.5"
              >
                <Compass size={13} /> 제품 투어
              </button>
              <div className="w-px h-4 bg-border-base mx-1" />
              <button 
                onClick={() => {

                  if (currentPage === 'ai-chat') {
                    window.dispatchEvent(new CustomEvent('start-new-chat'));
                  } else {
                    toggleAiPanel();
                  }
                }}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${isAiPanelOpen ? 'bg-brand-light text-brand-base border border-brand-light' : 'bg-brand-base text-white hover:bg-brand-dark'}`}
              >
                <Sparkles size={14} /> AI에게 질문하기
              </button>
            </div>
          </header>

            <AnimatePresence mode="wait">
              {currentPage === 'dashboard' && (
                <div className="p-6 h-full overflow-y-auto custom-scrollbar">
                  <DashboardPage key="dashboard" />
                </div>
              )}
              {currentPage === 'ai-agent' && <AIAgentPage key="ai-agent" />}
              {currentPage === 'ai-chat' && <AIChatHistoryPage key="ai-chat" />}
            </AnimatePresence>
        </main>

        {/* Global AI Side Panel */}
        <AnimatePresence>
          {isAiPanelOpen && (
            <AIChatPage 
              onClose={() => setIsAiPanelOpen(false)} 
              context={currentPage}
            />
          )}
        </AnimatePresence>
      </div>

      {isTourActive && (
        <ProductTour
          steps={TOUR_STEPS}
          currentIndex={tourStepIndex}
          onNext={handleTourNext}
          onPrev={handleTourPrev}
          onClose={() => setIsTourActive(false)}
        />
      )}
    </div>
  );
}
