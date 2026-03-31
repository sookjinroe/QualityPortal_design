
import { motion } from 'motion/react';
import { 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Activity,
  Calendar,
  Rocket,
  Wrench,
  ShieldCheck,
  Settings,
  GitBranch,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { RecommendationItem } from '../components/DashboardComponents';

const UrgentCard = ({ what, why, soWhat, links, index }: { what: string, why: string, soWhat: string, links: string[], index: number }) => (
  <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm relative overflow-hidden group hover:border-[#BFDBFE] transition-all">
    <div className="absolute top-0 left-0 w-1 h-full bg-[#1D4ED8]" />
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0 text-[#1D4ED8] font-bold text-sm">
        {index}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626]">긴급 조치 필요</span>
          <span className="text-[11px] text-[#9CA3AF] font-medium">Jira × Bitbucket 교차 분석</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">WHAT</div>
            <div className="text-[14px] font-bold text-[#111827] leading-snug">{what}</div>
          </div>
          
          <div>
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">WHY</div>
            <div className="text-[13px] text-[#4B5563] leading-relaxed">{why}</div>
          </div>
          
          <div>
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">SO WHAT</div>
            <div className="text-[13px] text-[#DC2626] font-medium leading-relaxed">{soWhat}</div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#F3F4F6] flex flex-wrap gap-3">
          {links.map((link, i) => (
            <button key={i} className="text-[11.5px] text-[#1D4ED8] font-semibold hover:underline flex items-center gap-1">
              {link} <ChevronRight size={12} />
            </button>
          ))}
          <button className="ml-auto text-[11.5px] text-[#6B7280] font-medium hover:text-[#111827] flex items-center gap-1">
            지표에서 확인 <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DiagnosisCard = ({ icon: Icon, label, score, status, statusColor, metric, color }: any) => (
  <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color: color }}>
          <Icon size={18} />
        </div>
        <span className="text-[13px] font-bold text-[#374151]">{label}</span>
      </div>
      <div className="text-right">
        <span className="text-[20px] font-extrabold text-[#111827]">{score}</span>
        <span className="text-[12px] text-[#9CA3AF] font-normal">/10</span>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-[12px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${statusColor}15`, color: statusColor }}>
        {status}
      </div>
      <div className="text-[11px] text-[#6B7280] font-medium">
        핵심 지표: <span className="text-[#111827] font-bold">{metric}</span>
      </div>
    </div>
  </div>
);

export const AIAgentPage = () => {
  return (
    <motion.div 
      key="ai-agent"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      {/* Headline Section */}
      <div className="bg-[#1D4ED8] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">Sprint 4</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-[11px] font-medium text-white/80">2026.03.24 - 2026.04.07</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">
            스프린트 4 · <span className="text-[#FCD34D]">전반적 위험</span> · 오늘 3건 즉시 조치 필요
          </h1>
          <p className="text-white/80 text-[13.5px] leading-relaxed max-w-2xl">
            결제 모듈 지연(DEV-204)이 전체 일정의 핵심 병목입니다. 보안 취약점 3건이 해결되지 않아 배포 리스크가 높으며, 
            운영 환경의 에러율이 전주 대비 15% 상승했습니다.
          </p>
        </div>
      </div>

      {/* Urgent Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[15px] font-bold text-[#111827] flex items-center gap-2">
            <AlertCircle size={18} className="text-[#DC2626]" /> 지금 확인해야 할 긴급 조치
          </h2>
          <span className="text-[12px] text-[#6B7280] font-medium">AI 에이전트 실시간 분석 결과</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <UrgentCard 
            index={1}
            what="결제 모듈 핵심 이슈(DEV-204)가 14일째 커밋 없이 정체 중"
            why="담당자 부재 및 의존 이슈(DEV-118, 120)의 블로킹 상태 지속"
            soWhat="이번 스프린트 목표 달성 불가 및 전체 납기 D+8 초과 예측의 핵심 원인"
            links={["Jira 이슈 현황", "커밋 이력 분석"]}
          />
          <UrgentCard 
            index={2}
            what="release/v1.4.0 브랜치 내 보안 취약점 3건 미해소"
            why="Sparrow 정적 분석 결과 SQL Injection 등 고위험 항목 검출"
            soWhat="릴리스 보안 기준(0건) 미달로 배포 강행 시 보안 사고 위험 매우 높음"
            links={["Sparrow 상세 보고서", "배포 대상 커밋"]}
          />
          <UrgentCard 
            index={3}
            what="운영 환경(Production) 에러율 15% 급증"
            why="최근 배포된 API 최적화 패치 이후 특정 엔드포인트 타임아웃 발생"
            soWhat="사용자 결제 실패율 3.2% 상승 및 서비스 가용성 저하 직결"
            links={["Datadog 모니터링", "PagerDuty 이력"]}
          />
        </div>
      </div>

      {/* Diagnosis Summary Section */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[15px] font-bold text-[#111827] flex items-center gap-2">
            <Activity size={18} className="text-[#1D4ED8]" /> 영역별 진단 요약
          </h2>
          <button className="text-[12px] text-[#1D4ED8] font-semibold hover:underline">상세 지표 대시보드 이동 →</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <DiagnosisCard 
            icon={Calendar} 
            label="일정" 
            score={7} 
            status="위험" 
            statusColor="#DC2626" 
            metric="진척률 47%" 
            color="#DC2626" 
          />
          <DiagnosisCard 
            icon={Rocket} 
            label="배포" 
            score={8} 
            status="주의" 
            statusColor="#D97706" 
            metric="성공률 83%" 
            color="#D97706" 
          />
          <DiagnosisCard 
            icon={Wrench} 
            label="코드 품질" 
            score={7} 
            status="위험" 
            statusColor="#DC2626" 
            metric="커버리지 51%" 
            color="#1D4ED8" 
          />
          <DiagnosisCard 
            icon={Activity} 
            label="운영" 
            score={6} 
            status="주의" 
            statusColor="#D97706" 
            metric="에러율 +15%" 
            color="#059669" 
          />
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-bold text-[#111827]">리스크 해소를 위한 AI 권고</h3>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
            <CheckCircle2 size={14} className="text-[#10B981]" /> 조치 완료 시 리스크 점수 평균 3.5점 하락 예상
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <RecommendationItem 
            type="일정 리스크 해소" 
            typeColor="#D97706" 
            title="지연 중인 <strong className='font-semibold'>DEV-204 이슈를 최소 단위로 분할(Task Splitting)</strong>하여 병목을 해제하고 리소스를 재배치하세요."
            sources={['Jira', 'Flow']}
            from="7.0"
            to="4.2"
            linkLabel="이슈 분할 가이드"
            linkIcon={Settings}
          />
          <RecommendationItem 
            type="배포 리스크 해소" 
            typeColor="#DC2626" 
            title="Sparrow 검출 항목 중 <strong className='font-semibold'>High 등급 3건에 대한 즉각적인 Hotfix</strong>를 수행하거나 해당 커밋을 제외하세요."
            sources={['Sparrow', 'Security']}
            from="8.0"
            to="4.5"
            linkLabel="Hotfix 가이드"
            linkIcon={ShieldCheck}
          />
          <RecommendationItem 
            type="품질 리스크 해소" 
            typeColor="#1D4ED8" 
            title="결제 모듈 대상 <strong className='font-semibold'>'Targeted Unit Testing'을 실시</strong>하고 머지 조건을 커버리지 80%로 상향하세요."
            sources={['SonarQube', 'Quality']}
            from="7.0"
            to="3.8"
            linkLabel="테스트 정책 보기"
            linkIcon={GitBranch}
          />
        </div>
      </div>
    </motion.div>
  );
};
