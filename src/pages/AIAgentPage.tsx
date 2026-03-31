
import { motion } from 'motion/react';

export const AIAgentPage = () => {
  return (
    <motion.div 
      key="ai-agent"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4"
    >
      {/* Overview Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden flex shadow-sm">
        <div className="flex-1 p-5">
          <h2 className="text-base font-bold text-[#111827] mb-1">Overview</h2>
          <p className="text-[12.5px] text-[#6B7280] mb-4">위험 3건, 병목 2건, 프로세스 위반 4건을 발견했습니다.</p>
          
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2 text-[13px] text-[#374151] leading-relaxed">
              <span className="text-[#6B7280] shrink-0">-</span>
              <span>
                <strong className="font-semibold text-[#111827]">코드 리뷰</strong>가 프로세스 위반으로 인해 너무 오래 걸립니다 
                <span className="inline-flex items-center bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-semibold px-1.5 py-0.5 rounded mx-1">평균 +40시간</span> 
                — 이번 스프린트 PR 8건 중 6건이 리뷰어 없이 머지됨
              </span>
            </div>
            <div className="flex gap-2 text-[13px] text-[#374151] leading-relaxed">
              <span className="text-[#6B7280] shrink-0">-</span>
              <span>
                <strong className="font-semibold text-[#111827]">DEV-112</strong> 이슈가 14일째 중단되어 의존 이슈 
                <span className="inline-flex items-center bg-[#FFFBEB] text-[#D97706] text-[11px] font-semibold px-1.5 py-0.5 rounded mx-1">DEV-118, DEV-120</span> 
                대기 상태 — 납기 <span className="inline-flex items-center bg-[#FEF2F2] text-[#DC2626] text-[11px] font-semibold px-1.5 py-0.5 rounded mx-1">D+8 초과</span> 예측의 핵심 원인
              </span>
            </div>
            <div className="flex gap-2 text-[13px] text-[#374151] leading-relaxed">
              <span className="text-[#6B7280] shrink-0">-</span>
              <span>
                <strong className="font-semibold text-[#111827]">고위험 취약점</strong> 
                <span className="inline-flex items-center bg-[#FEF2F2] text-[#DC2626] text-[11px] font-semibold px-1.5 py-0.5 rounded mx-1">3건</span> 
                미해소 — 릴리스 기준(0건) 초과, SQL Injection 포함
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Do This Today */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">👉 지금 확인해야 할 것</h2>
        <div className="space-y-5">
          {[
            {
              title: "결제 모듈 관련 핵심 이슈(DEV-204)가 14일째 실질적인 커밋 활동 없이 '진행 중' 상태에 머물러 있습니다. 이로 인해 해당 이슈에 의존하고 있는 하위 작업 2건이 모두 대기 상태로 묶여 있으며, 현재의 개발 속도 추세를 고려할 때 이번 스프린트 내 목표 달성이 사실상 불가능할 것으로 예측됩니다.",
              links: ["Jira 이슈 현황", "커밋 이력 분석"]
            },
            {
              title: "이번 배포 대상인 release/v1.4.0 브랜치의 최신 커밋 중 Sparrow 정적 분석 검수를 통과하지 못한 항목이 3건 발견되었습니다. 해당 커밋들은 보안 취약점 위험을 포함하고 있을 가능성이 높으며, 현재 상태로 배포를 강행할 경우 검증되지 않은 코드가 프로덕션 환경에 그대로 노출될 위험이 큽니다.",
              links: ["배포 대상 커밋 확인", "Sparrow 상세 보고서"]
            },
            {
              title: "결제 모듈의 단위 테스트 코드 커버리지가 51%로 측정되어, 프로젝트 전체 평균인 72%를 크게 밑돌고 있습니다. 특히 최근 2주간 발생한 결제 관련 버그 5건 중 4건이 커버리지가 낮은 특정 함수군에서 발생한 것으로 확인되어 테스트 케이스 보강이 시급합니다.",
              links: ["SonarQube 커버리지 보고서", "버그 발생 구간 분석"]
            },
            {
              title: "릴리스 브랜치에 아직 완료되지 않은(In-Progress) Jira 이슈와 연결된 Pull Request가 머지된 정황이 포착되었습니다. 이는 테스트가 완료되지 않았거나 기획 사양과 다른 미완성 기능이 배포 범위에 포함되어 사용자에게 노출될 수 있음을 의미하므로 배포 전 재검토가 필요합니다.",
              links: ["릴리스 브랜치 PR 목록", "이슈 연결성 확인"]
            },
            {
              title: "Jira 티켓 번호가 명시되지 않은 '티켓 없는 커밋'의 비율이 이번 스프린트에서 38%로 급격히 상승했습니다. 데이터 교차 분석 결과, 이러한 비정형 수정이 전체 버그 발생 원인의 약 70%와 직접적인 상관관계가 있는 것으로 나타나 프로세스 준수 강화가 제안됩니다.",
              links: ["커밋-이슈 연결 현황", "프로세스 위반 통계"]
            }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="relative pl-7">
                <span className="absolute left-0 top-0 text-[13px] font-bold text-[#1D4ED8]">{idx + 1}.</span>
                <p className="text-[13px] text-[#374151] leading-relaxed mb-1.5">
                  {item.title}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.links.map((link, lIdx) => (
                    <span key={lIdx} className="text-[11.5px] text-[#1D4ED8] font-medium hover:underline cursor-pointer flex items-center gap-1">
                      → {link}
                    </span>
                  ))}
                </div>
              </div>
              {idx < 4 && <div className="h-px bg-[#F3F4F6] mt-5" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
