import { 
  Sparkles, 
  ChevronRight, 
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { AIAgentPage } from './pages/AIAgentPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { AIChatPage } from './pages/AIChatPage';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('ai-agent');
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  const toggleAiPanel = () => setIsAiPanelOpen(!isAiPanelOpen);

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      {/* Left Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        isAiPanelOpen={isAiPanelOpen}
        setCurrentPage={(page) => {
          if (page === 'ai-chat') {
            setIsAiPanelOpen(!isAiPanelOpen);
          } else {
            setCurrentPage(page);
          }
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F9FAFB] relative border-r border-[#E5E7EB]">
          {/* Top Bar */}
          <header className="h-[52px] bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between shrink-0 relative z-10">
            <div className="text-[13px] text-[#6B7280] flex items-center gap-1.5">
              ERP 고도화 <ChevronRight size={14} className="text-[#D1D5DB]" /> 
              <strong className="text-[#111827] font-semibold">
                {currentPage === 'ai-agent' ? 'AI 에이전트 분석 결과' : currentPage === 'risk-analysis' ? '리스크 분석' : '대시보드'}
              </strong>
              <span className="text-[11px] text-[#9CA3AF] ml-1.5">
                {currentPage === 'ai-agent' ? '방금 전 업데이트' : currentPage === 'risk-analysis' ? 'Jira · Bitbucket · Sparrow · Jenkins 교차 분석' : '실시간 · 스프린트 4'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {currentPage === 'ai-agent' ? (
                <>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#059669] font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-custom" />
                    실시간 모니터링 중
                  </div>
                  <button className="text-xs font-medium px-3.5 py-1.5 rounded-md border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 transition-colors">필터</button>
                  <button className="text-xs font-semibold px-3.5 py-1.5 rounded-md bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors">보고서 생성</button>
                </>
              ) : (
                <>
                  <button className="text-xs font-medium px-3.5 py-1.5 rounded-md border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 transition-colors">기간 설정</button>
                  <button className="text-xs font-medium px-3.5 py-1.5 rounded-md border border-[#D1D5DB] bg-white text-[#374151] hover:bg-gray-50 transition-colors">보고서 생성</button>
                </>
              )}
              <div className="w-px h-4 bg-[#E5E7EB] mx-1" />
              <button 
                onClick={toggleAiPanel}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${isAiPanelOpen ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]' : 'bg-[#1D4ED8] text-white hover:bg-[#1e40af]'}`}
              >
                <Sparkles size={14} /> AI에게 질문하기
              </button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
            <div className="max-w-6xl mx-auto w-full h-full">
              <AnimatePresence mode="wait">
                {currentPage === 'dashboard' && <DashboardPage />}
                {currentPage === 'ai-agent' && <AIAgentPage />}
                {currentPage === 'risk-analysis' && <RiskAnalysisPage />}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Global AI Side Panel */}
        <AnimatePresence>
          {isAiPanelOpen && (
            <AIChatPage onClose={() => setIsAiPanelOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
