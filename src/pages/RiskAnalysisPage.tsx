
import { motion } from 'motion/react';
import { Calendar, Rocket, Wrench, ShieldCheck, Settings, GitBranch } from 'lucide-react';
import { RiskAnalysisBar, RecommendationItem } from '../components/DashboardComponents';

export const RiskAnalysisPage = () => {
  return (
    <motion.div 
      key="risk-analysis"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#111827]">리스크 분석</h2>
          <p className="text-[12.5px] text-[#6B7280] mt-0.5">연동 데이터 교차 분석 기반 · 일정·배포·코드 품질 리스크를 차원별로 진단합니다</p>
        </div>
        <span className="text-xs text-[#6B7280] cursor-pointer hover:underline">상세 분석은 AI 대화에서 확인하세요 →</span>
      </div>

      {/* 3 Risk Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* 일정 리스크 */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-1.5"><Calendar size={16} /> 일정 리스크</h3>
            <div className="text-right">
              <span className="text-[28px] font-extrabold text-[#111827] leading-none">7</span>
              <span className="text-base font-normal text-[#9CA3AF]">/10</span>
            </div>
          </div>
          <div className="mb-3 px-2 py-1 bg-[#FFFBEB] border-l-2 border-[#D97706] text-[11px] text-[#92400E] font-medium">
            주요 병목: 의존성 전이 지연 (DEV-204)
          </div>
          <p className="text-[12.5px] text-[#6B7280] leading-relaxed mb-4">커밋 활동 감소와 이슈 체류 패턴이 3스프린트 연속 반복되고 있습니다. 현재 속도 기준 납기 초과가 예측됩니다.</p>
          <div className="flex flex-col gap-3">
            <RiskAnalysisBar label="스프린트 진척" status="미달" statusColor="#D97706" value={47} color="#FBBF24" sub="47% (계획 59%)" />
            <RiskAnalysisBar label="이슈 체류" status="위험" statusColor="#DC2626" value={80} color="#EF4444" sub="7일+ 체류 4건" />
            <RiskAnalysisBar label="커밋 활동성" status="감소" statusColor="#D97706" value={40} color="#FBBF24" sub="전주 대비 -40%" />
            <RiskAnalysisBar label="블로킹 의존성" status="위험" statusColor="#DC2626" value={70} color="#EF4444" sub="상위 이슈 2건" />
          </div>
        </div>

        {/* 배포 리스크 */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-1.5"><Rocket size={16} /> 배포 리스크</h3>
            <div className="text-right">
              <span className="text-[28px] font-extrabold text-[#111827] leading-none">8</span>
              <span className="text-base font-normal text-[#9CA3AF]">/10</span>
            </div>
          </div>
          <div className="mb-3 px-2 py-1 bg-[#FEF2F2] border-l-2 border-[#DC2626] text-[11px] text-[#991B1B] font-medium">
            주요 병목: 보안 게이트 미통과 (Sparrow)
          </div>
          <p className="text-[12.5px] text-[#6B7280] leading-relaxed mb-4">고위험 취약점 미해소 상태로 릴리스 기준을 충족하지 못합니다. 빌드 성공률도 권고 기준 하회 중입니다.</p>
          <div className="flex flex-col gap-3">
            <RiskAnalysisBar label="보안 취약점" status="위험" statusColor="#DC2626" value={90} color="#EF4444" sub="3건 (기준 0건)" />
            <RiskAnalysisBar label="빌드 성공률" status="미달" statusColor="#D97706" value={45} color="#FBBF24" sub="83% (권고 90%)" />
            <RiskAnalysisBar label="미완료 이슈" status="주의" statusColor="#D97706" value={60} color="#FBBF24" sub="4건" />
            <RiskAnalysisBar label="배포 빈도" status="정상" statusColor="#059669" value={55} color="#10B981" sub="주 1.2회" />
          </div>
        </div>

        {/* 코드 품질 리스크 */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-1.5"><Wrench size={16} /> 코드 품질 리스크</h3>
            <div className="text-right">
              <span className="text-[28px] font-extrabold text-[#111827] leading-none">7</span>
              <span className="text-base font-normal text-[#9CA3AF]">/10</span>
            </div>
          </div>
          <div className="mb-3 px-2 py-1 bg-[#EFF6FF] border-l-2 border-[#1D4ED8] text-[11px] text-[#1E40AF] font-medium">
            주요 병목: 테스트 사각지대 존재 (Payment)
          </div>
          <p className="text-[12.5px] text-[#6B7280] leading-relaxed mb-4">리뷰 프로세스 위반이 취약점 유입 경로가 되고 있습니다. 기술 부채와의 상관관계도 확인됩니다.</p>
          <div className="flex flex-col gap-3">
            <RiskAnalysisBar label="PR 리뷰 사이클" status="위험" statusColor="#DC2626" value={85} color="#EF4444" sub="40.3h 평균" />
            <RiskAnalysisBar label="무검토 머지" status="위험" statusColor="#DC2626" value={75} color="#EF4444" sub="PR 중 75%" />
            <RiskAnalysisBar label="코드 커버리지" status="미달" statusColor="#D97706" value={50} color="#FBBF24" sub="72% (기준 80%)" />
            <RiskAnalysisBar label="기술 부채" status="주의" statusColor="#D97706" value={65} color="#FBBF24" sub="C등급 (권고 B+)" />
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#111827] mb-4">상세 권고 사항</h3>
        <div className="grid grid-cols-3 gap-3">
          <RecommendationItem 
            type="일정 리스크 해소 방안" 
            typeColor="#D97706" 
            title="현재 지연 중인 <strong className='font-semibold'>DEV-204의 의존성을 해소하기 위해 작업을 최소 단위로 분할(Task Splitting)</strong>하거나 리소스를 재배치하여 하위 2개 작업의 병목을 우선 해제할 것을 권고합니다."
            sources={['Jira', 'Process']}
            from="7.0"
            to="4.2"
            linkLabel="이슈 분할 가이드"
            linkIcon={Settings}
          />
          <RecommendationItem 
            type="배포 리스크 해소 방안" 
            typeColor="#DC2626" 
            title="release/v1.4.0 브랜치의 안정성 확보를 위해 <strong className='font-semibold'>Sparrow 검출 항목 중 'High' 등급 3건에 대한 즉각적인 Hotfix를 수행</strong>하거나, 해당 커밋을 제외한 부분 배포 검토가 필요합니다."
            sources={['Sparrow', 'Deployment']}
            from="8.0"
            to="4.5"
            linkLabel="Hotfix 가이드"
            linkIcon={ShieldCheck}
          />
          <RecommendationItem 
            type="품질 리스크 해소 방안" 
            typeColor="#1D4ED8" 
            title="결제 모듈의 신뢰도 회복을 위해 최근 버그가 집중된 함수군을 대상으로 한 <strong className='font-semibold'>'Targeted Unit Testing'을 실시하고, 머지 조건(Quality Gate)을 커버리지 80% 이상으로 상향</strong>할 것을 권고합니다."
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
