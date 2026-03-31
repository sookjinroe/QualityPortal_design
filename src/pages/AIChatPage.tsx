
import { motion } from 'motion/react';
import { Bot, Settings, ShieldCheck, MessageSquare, ArrowUp } from 'lucide-react';
import { MetricCard, ChartCard } from '../components/DashboardComponents';
import { Page } from '../types';

interface AIChatPageProps {
  onClose: () => void;
}

export const AIChatPage = ({ onClose }: AIChatPageProps) => {
  return (
    <motion.div 
      key="ai-chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex"
    >
      {/* Dashboard Area (Dimmed) */}
      <div className="flex-1 p-6 grid grid-cols-3 grid-rows-[auto_1fr] gap-3 opacity-45 blur-[0.3px] overflow-hidden">
        <MetricCard label="일정 리스크" score="7.0" status="위험" sub="납기 D+8 초과 예측" value={70} color="#DC2626" />
        <MetricCard label="배포 리스크" score="8.0" status="위험" sub="취약점 3건 · 빌드 83%" value={80} color="#DC2626" />
        <MetricCard label="코드 품질 리스크" score="7.0" status="주의" sub="PR 리뷰 사이클 40.3h" value={70} color="#D97706" />
        
        <ChartCard title="스프린트 진척 (계획 vs 실제)" bars={[
          { h: 60, c: '#E5E7EB' }, { h: 50, c: '#3B82F6', o: 0.6 },
          { h: 80, c: '#E5E7EB' }, { h: 55, c: '#3B82F6', o: 0.6 },
          { h: 75, c: '#E5E7EB' }, { h: 40, c: '#3B82F6', o: 0.6 },
          { h: 90, c: '#E5E7EB' }, { h: 47, c: '#EF4444', o: 0.7 }
        ]} />
        <ChartCard title="빌드 성공률 추이" bars={[
          { h: 90, c: '#10B981', o: 0.5 }, { h: 85, c: '#10B981', o: 0.5 },
          { h: 70, c: '#FBBF24', o: 0.6 }, { h: 60, c: '#EF4444', o: 0.6 },
          { h: 75, c: '#FBBF24', o: 0.6 }, { h: 83, c: '#FBBF24', o: 0.6 }
        ]} />
        <ChartCard title="취약점 현황" bars={[
          { h: 70, c: '#EF4444', o: 0.5 }, { h: 50, c: '#EF4444', o: 0.5 },
          { h: 40, c: '#EF4444', o: 0.5 }, { h: 30, c: '#EF4444', o: 0.7 }
        ]} />
      </div>

      {/* AI Chat Overlay */}
      <div className="w-[460px] bg-white border-l border-[#E5E7EB] flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.08)] z-20">
        <div className="p-4 border-b border-[#F3F4F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-lg flex items-center justify-center">
              <Bot size={18} color="white" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-[#111827]">Quality AI Assistant</div>
              <div className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> 분석 준비 완료
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#374151] transition-colors">
            <Settings size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-[#1D4ED8] text-white rounded-[14px_14px_3px_14px] px-3.5 py-2.5 max-w-[72%] text-[13px] leading-relaxed">
              지난 3개 스프린트 동안 코드 품질이 왜 계속 나빠지고 있어?
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-2.5 items-start">
            <div className="w-6.5 h-6.5 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <Bot size={14} color="white" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[3px_14px_14px_14px] px-3.5 py-3 text-[12.5px] text-[#374151] leading-relaxed">
                <strong className="font-bold">Bitbucket × Sparrow × Jira</strong> 교차 분석 결과입니다.
                <div className="mt-2.5 flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-1.5 text-xs">
                    <span className="text-[#D97706] font-bold">!</span>
                    <span>스프린트별 취약점 추이: S2(2건) → S3(5건) → S4(8건)로 급증</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 text-xs">
                    <span className="text-[#D97706] font-bold">!</span>
                    <span>티켓 없는 커밋 비율: S2(12%) → S4(38%)로 동반 상승</span>
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-[#4B5563]">
                  분석 결과, <span className="text-[#DC2626] font-semibold">리뷰 없는 머지가 S2부터 증가하기 시작했고, 같은 시점부터 취약점 유입이 가속</span>된 것으로 확인되었습니다.
                </p>
              </div>
              <div className="bg-[#EFF6FF] border-l-3 border-[#1D4ED8] rounded-r-lg p-2.5">
                <p className="text-xs font-semibold text-[#1E40AF] leading-relaxed">패턴 요약: 프로세스 위반(무검토 머지)이 보안 취약점 유입의 핵심 경로로 확인됩니다.</p>
              </div>
            </div>
          </div>

          {/* User Message 2 */}
          <div className="flex justify-end">
            <div className="bg-[#1D4ED8] text-white rounded-[14px_14px_3px_14px] px-3.5 py-2.5 max-w-[72%] text-[13px] leading-relaxed">
              이번 스프린트 결과 보고서 작성해줘
            </div>
          </div>

          {/* AI Message 2 */}
          <div className="flex gap-2.5 items-start">
            <div className="w-6.5 h-6.5 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-md flex items-center justify-center shrink-0 mt-0.5">
              <Bot size={14} color="white" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[3px_14px_14px_14px] px-3.5 py-3 text-[12.5px] text-[#374151] leading-relaxed">
                스프린트 4 결과를 기반으로 보고서를 생성했습니다.
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#F9FAFB] px-3.5 py-2.5 border-b border-[#E5E7EB] flex items-center justify-between">
                  <div className="text-xs font-bold text-[#374151] flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#1D4ED8]" />
                    ERP 고도화 · 스프린트 4 결과 보고서
                  </div>
                  <span className="text-[10px] font-bold bg-[#D1FAE5] text-[#059669] px-1.5 py-0.5 rounded-full">생성 완료</span>
                </div>
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#6B7280]">완료율</span>
                    <span className="font-semibold text-[#D97706]">47% (계획 대비 -12%p)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#6B7280]">리스크 스코어</span>
                    <span className="font-semibold text-[#DC2626]">7.8 / 10 (위험)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#6B7280]">주요 발견</span>
                    <span className="font-semibold text-[#111827]">프로세스 위반 및 취약점 유입</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#6B7280]">다음 스프린트 권고</span>
                    <span className="font-semibold text-[#1D4ED8]">리뷰 정책 강화 및 기술 부채 해소</span>
                  </div>
                </div>
                <div className="p-3.5 border-t border-[#F3F4F6] flex gap-1.5">
                  <button className="flex-1 bg-[#1D4ED8] text-white text-[10.5px] font-semibold py-1.5 rounded-md">다운로드</button>
                  <button className="flex-1 bg-white border border-[#D1D5DB] text-[#374151] text-[10.5px] font-semibold py-1.5 rounded-md">Slack 발송</button>
                  <button className="flex-1 bg-white border border-[#D1D5DB] text-[#374151] text-[10.5px] font-semibold py-1.5 rounded-md">메일 발송</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-[11.5px] font-medium">
                  <MessageSquare size={12} /> #pm-report 발송 <span className="text-[9.5px] font-bold bg-[#D1FAE5] text-[#059669] px-1 py-0 rounded">완료</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-[11.5px] font-medium">
                  <Settings size={12} /> 이슈 이관 <span className="text-[9.5px] font-bold bg-[#DBEAFE] text-[#2563EB] px-1 py-0 rounded">완료</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {['개발 속도가 왜 떨어졌지?', '배포 리스크 줄이려면?', '다음 스프린트 목표는?'].map(pill => (
              <span key={pill} className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-full px-3 py-1 text-[11px] text-[#374151] cursor-pointer hover:border-[#93C5FD] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors">
                {pill}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-2.5 pl-3.5">
            <span className="text-[13px] text-[#9CA3AF] flex-1">데이터에 대해 무엇이든 물어보세요...</span>
            <button className="w-7.5 h-7.5 bg-[#1D4ED8] rounded-lg flex items-center justify-center shrink-0">
              <ArrowUp size={14} color="white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
