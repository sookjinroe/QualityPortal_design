
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  StatCard, 
  SectionHeader, 
  ValueStreamBar, 
  HorizontalBar, 
  DoraBenchmarkScale,
  QualityGateStatus,
  IntegratedErrorChart,
  IncidentTable,
  DetailPanel
} from '../components/DashboardComponents';
import { ChevronRight } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  XAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine
} from 'recharts';
import { 
  DORA_BENCHMARKS, 
  VALUE_STREAM_DATA, 
  INCIDENTS_DATA, 
  ERROR_RATE_TREND,
  PR_DETAILS_DATA,
} from '../constants';

// DORA Sparklines
const deploymentTrend = [{ value: 12 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 20 }, { value: 18 }, { value: 22 }, { value: 21 }];
const leadTimeTrend = [{ value: 15 }, { value: 16 }, { value: 14 }, { value: 13 }, { value: 12 }, { value: 11 }, { value: 10 }, { value: 10.5 }];
const failureRateTrend = [{ value: 5 }, { value: 4.5 }, { value: 4.8 }, { value: 4.2 }, { value: 3.5 }, { value: 3.0 }, { value: 2.5 }, { value: 2.2 }];
const recoveryTimeTrend = [{ value: 12 }, { value: 11.5 }, { value: 10.8 }, { value: 10.2 }, { value: 9.5 }, { value: 8.8 }, { value: 8.2 }, { value: 8.0 }];

// Dev Flow Sparklines
const prCycleTimeSparkline = [
  { value: 30 }, { value: 32 }, { value: 35 }, { value: 33 }, { value: 38 }, { value: 40 }, { value: 42 }, { value: 40.3 }
];
const reviewWaitTimeSparkline = [
  { value: 22 }, { value: 21 }, { value: 20 }, { value: 19.5 }, { value: 19 }, { value: 18.8 }, { value: 18.6 }, { value: 18.5 }
];
const issueDwellTimeSparkline = [
  { value: 4.0 }, { value: 4.5 }, { value: 3.8 }, { value: 4.2 }, { value: 4.6 }, { value: 3.9 }, { value: 4.1 }, { value: 4.2 }
];
const sprintCompletionSparkline = [
  { value: 70 }, { value: 72 }, { value: 75 }, { value: 78 }, { value: 80 }, { value: 81 }, { value: 82 }, { value: 83 }
];

const unreviewedMergeData = [
  { name: 'W1', value: 2 }, { name: 'W2', value: 3 }, { name: 'W3', value: 5 }, { name: 'W4', value: 8 },
  { name: 'W5', value: 12 }, { name: 'W6', value: 15 }, { name: 'W7', value: 18 }, { name: 'W8', value: 22 }
];

const unlinkedCommitData = [
  { name: 'W1', value: 12 }, { name: 'W2', value: 15 }, { name: 'W3', value: 10 }, { name: 'W4', value: 25 },
  { name: 'W5', value: 18 }, { name: 'W6', value: 32 }, { name: 'W7', value: 28 }, { name: 'W8', value: 38 }
];

const VULNERABILITY_DETAILS = [
  { id: 'SEC-001', title: 'SQL Injection Vulnerability in Login', author: 'Critical', cycleTime: 'High', reviewStatus: 'unreviewed', link: '#' },
  { id: 'SEC-002', title: 'Cross-Site Scripting (XSS) in Search', author: 'High', cycleTime: 'High', reviewStatus: 'unreviewed', link: '#' },
  { id: 'SEC-003', title: 'Insecure Direct Object Reference', author: 'High', cycleTime: 'Medium', reviewStatus: 'reviewed', link: '#' },
];

const COVERAGE_DETAILS = [
  { id: 'COV-001', title: 'Payment Module - API Handler', author: 'API', cycleTime: '65%', reviewStatus: 'unreviewed', link: '#' },
  { id: 'COV-002', title: 'User Profile - UI Component', author: 'UI', cycleTime: '72%', reviewStatus: 'reviewed', link: '#' },
  { id: 'COV-003', title: 'Auth Service - Core Logic', author: 'Core', cycleTime: '85%', reviewStatus: 'reviewed', link: '#' },
];

const UNREVIEWED_MERGE_DETAILS = [
  { id: 'PR-1024', title: 'Hotfix: Database connection leak', author: 'Kim', cycleTime: '2h', reviewStatus: 'unreviewed', link: '#' },
  { id: 'PR-1025', title: 'Feature: Add user profile edit', author: 'Lee', cycleTime: '1.5d', reviewStatus: 'unreviewed', link: '#' },
  { id: 'PR-1028', title: 'Refactor: Clean up legacy auth', author: 'Park', cycleTime: '3d', reviewStatus: 'unreviewed', link: '#' },
];

export const DashboardPage = () => {
  const [detailConfig, setDetailConfig] = useState<{
    isOpen: boolean;
    title: string;
    summary: string;
    data: any[];
    externalLinkLabel: string;
  }>({
    isOpen: false,
    title: '',
    summary: '',
    data: [],
    externalLinkLabel: ''
  });

  const openDetail = (title: string, summary: string, data: any[], label: string) => {
    setDetailConfig({
      isOpen: true,
      title,
      summary,
      data,
      externalLinkLabel: label
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-8 pb-12"
    >
      {/* Top Context Bar (Fixed) */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-card-bg/95 backdrop-blur-sm border border-border-base rounded-xl px-6 py-3 shadow-md mb-8">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">프로젝트</span>
            <span className="text-[14px] font-bold text-text-primary">ERP 고도화 시스템</span>
          </div>
          <div className="h-8 w-[1px] bg-border-base/60" />
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">스프린트</span>
            <span className="text-[14px] font-bold text-text-primary">Sprint #24</span>
          </div>
          <div className="h-8 w-[1px] bg-border-base/60" />
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">분석 기간</span>
            <span className="text-[14px] font-bold text-text-primary">2026.03.15 - 2026.03.31</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-0.5">마지막 동기화</div>
          <div className="text-[12px] font-bold text-brand-base">방금 전 (14:00:55)</div>
        </div>
      </div>

      {/* Section 1: DORA */}
      <section id="dora-section">
        <SectionHeader 
          title="DORA Metrics" 
          subtitle="우리 팀의 소프트웨어 배포 역량이 업계 기준으로 어느 수준인가?"
          aiInsight="배포 빈도가 전주 대비 15% 상승하며 High 등급을 유지하고 있습니다."
          sources={["Jenkins", "Bitbucket", "PagerDuty"]}
        />

        <DoraBenchmarkScale benchmarks={DORA_BENCHMARKS} />

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="배포 빈도" 
            value="22" 
            unit="회/주" 
            trend={{ value: '15%', direction: 'up' }}
            status={{ label: 'High', color: 'var(--success)', type: 'badge' }} 
            description="프로덕션 배포 횟수입니다. Elite 등급은 일 1회 이상 배포를 의미합니다."
            source="Jenkins"
            sparklineData={deploymentTrend}
            benchmark={15}
          />
          <StatCard 
            label="변경 리드타임" 
            value="10.2" 
            unit="일" 
            trend={{ value: '8%', direction: 'down' }}
            status={{ label: 'Medium', color: 'var(--warning)', type: 'badge' }} 
            description="커밋부터 배포까지 소요 시간입니다. Elite 등급은 1시간 미만입니다."
            source="Bitbucket"
            sparklineData={leadTimeTrend}
            benchmark={12}
          />
          <StatCard 
            label="변경 실패율" 
            value="2.4" 
            unit="%" 
            trend={{ value: '1.2%', direction: 'down' }}
            status={{ label: 'Elite', color: 'var(--success)', type: 'badge' }} 
            description="배포 후 장애/롤백 비율입니다. Elite 등급은 0~15% 범위를 유지합니다."
            source="Jenkins"
            sparklineData={failureRateTrend}
            benchmark={4}
          />
          <StatCard 
            label="복구 시간" 
            value="8.5" 
            unit="h" 
            trend={{ value: '2h', direction: 'down' }}
            status={{ label: 'High', color: 'var(--success)', type: 'badge' }} 
            description="장애 감지부터 해소까지의 시간입니다. Elite 등급은 1시간 미만입니다."
            source="PagerDuty"
            sparklineData={recoveryTimeTrend}
            benchmark={10}
          />
        </div>
      </section>

      {/* Section 2: 개발 흐름 */}
      <section id="flow-section">
        <SectionHeader 
          title="개발 흐름 (Development Flow)" 
          subtitle="일감이 어느 단계에서 얼마나 오래 막히는가?"
          aiInsight="리뷰 단계에서의 대기 시간이 전체 사이클의 40%를 차지하며 주요 병목으로 작용하고 있습니다."
          sources={["Jira", "Bitbucket"]}
        />
        
        <ValueStreamBar 
          segments={VALUE_STREAM_DATA} 
        />

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="PR 사이클타임" 
            value="40.3" 
            unit="h" 
            trend={{ value: '+12%', direction: 'up' }} 
            sparklineData={prCycleTimeSparkline} 
            description="PR 생성부터 머지까지 걸리는 평균 시간입니다. 리뷰 속도와 밀접한 관련이 있습니다."
            onClick={() => openDetail("PR 사이클타임 상세", "최근 7일간 머지된 PR의 소요 시간 목록입니다.", PR_DETAILS_DATA, "Bitbucket에서 전체 목록 보기")}
          />
          <StatCard 
            label="리뷰 대기시간" 
            value="18.5" 
            unit="h" 
            trend={{ value: '-5%', direction: 'down' }} 
            sparklineData={reviewWaitTimeSparkline} 
            description="PR 생성 후 첫 리뷰가 달리기까지 걸리는 시간입니다. 병목 구간을 찾는 핵심 지표입니다."
          />
          <StatCard 
            label="이슈 체류시간" 
            value="4.2" 
            unit="일" 
            trend={{ value: '+2%', direction: 'up' }} 
            sparklineData={issueDwellTimeSparkline} 
            description="하나의 일감이 특정 상태(In Progress 등)에 머물러 있는 평균 기간입니다."
          />
          <StatCard 
            label="스프린트 완료율" 
            value="83" 
            unit="%" 
            trend={{ value: '+8%', direction: 'up' }} 
            sparklineData={sprintCompletionSparkline} 
            description="계획된 스토리 포인트 대비 실제 완료된 포인트의 비율입니다."
          />
        </div>

        <div className="bg-card-bg rounded-xl border border-border-base p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">티켓 없는 커밋 비율 추이</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-base" />
              <span className="text-[11px] text-text-muted font-semibold">Unlinked Commits (%)</span>
            </div>
          </div>
          <div className="h-[140px] w-full">
            <ResponsiveContainer key="unlinked-chart" width="100%" height="100%">
              <LineChart data={unlinkedCommitData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }} 
                  domain={[0, 50]} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--brand-base)" strokeWidth={2.5} dot={false} />
                <ReferenceLine y={20} stroke="var(--danger)" strokeDasharray="5 5" label={{ value: '허용 기준 (20%)', position: 'right', fill: 'var(--danger)', fontSize: 10, fontWeight: 'bold' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[11px] text-text-muted leading-relaxed">
            * 티켓 없는 커밋 비율이 높을수록 작업의 추적성이 떨어지며, 교차 분석의 신뢰도가 하락합니다.
          </p>
        </div>
      </section>

      {/* Section 3: 코드 품질 */}
      <section id="quality-section">
        <SectionHeader 
          title="코드 품질 (Code Quality)" 
          subtitle="지금 이 코드베이스가 배포 가능한 상태인가?"
          aiInsight="취약점 유입은 억제되고 있으나, 기술 부채 지수가 C등급으로 하락하며 유지보수 비용이 증가하고 있습니다."
          sources={["Sparrow", "Bitbucket"]}
        />
        
        <QualityGateStatus 
          passed={false} 
          reasons={["High 취약점 3건 미해소", "결제 모듈 커버리지 기준(80%) 미달"]} 
        />
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div 
            className="bg-card-bg rounded-xl border border-border-base p-6 shadow-sm cursor-pointer hover:border-brand-base transition-all group"
            onClick={() => openDetail('취약점 상세 내역', '보안 진단 도구(Sparrow)에서 발견된 주요 취약점 목록입니다.', VULNERABILITY_DETAILS, '보안 대시보드 바로가기')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">취약점 현황 (Vulnerabilities)</div>
              <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <HorizontalBar label="Critical / High" value={30} color="var(--danger)" sub="3건" source="Sparrow" />
            <HorizontalBar label="Medium" value={70} color="var(--warning)" sub="7건" source="Sparrow" />
            <HorizontalBar label="Low" value={50} color="var(--text-muted)" sub="5건" source="Sparrow" />
          </div>

          <div 
            className="bg-card-bg rounded-xl border border-border-base p-6 shadow-sm cursor-pointer hover:border-brand-base transition-all group"
            onClick={() => openDetail('모듈별 테스트 커버리지', '주요 모듈별 단위 테스트 커버리지 현황입니다.', COVERAGE_DETAILS, '커버리지 리포트 확인')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">모듈별 커버리지 (Coverage)</div>
              <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <HorizontalBar label="Core Module" value={85} color="var(--success)" target={80} source="Bitbucket" />
            <HorizontalBar label="API Module" value={65} color="var(--danger)" target={80} source="Bitbucket" />
            <HorizontalBar label="UI Module" value={72} color="var(--warning)" target={80} source="Bitbucket" />
          </div>

          <div className="bg-card-bg rounded-xl border border-border-base p-6 shadow-sm flex flex-col">
            <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider mb-4">기술 부채 (Technical Debt)</div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-[64px] font-black text-warning leading-none mb-2">C</div>
              <div className="text-[12px] font-bold text-text-secondary">유지보수 비용 증가 위험</div>
            </div>
            <div className="mt-4 pt-4 border-t border-border-base text-[11px] text-text-muted text-center">
              기준 B+ 대비 미달 (리팩토링 권고)
            </div>
          </div>
        </div>

        <div 
          className="bg-card-bg rounded-xl border border-border-base p-6 shadow-sm cursor-pointer hover:border-brand-base transition-all group"
          onClick={() => openDetail('무검토 머지 내역', '코드 리뷰 없이 메인 브랜치로 머지된 PR 목록입니다.', UNREVIEWED_MERGE_DETAILS, 'Bitbucket PR 목록')}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-[13px] font-bold text-text-secondary uppercase tracking-wider">무검토 머지 비율 추이 (Unreviewed Merges)</div>
            <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer key="unreviewed-chart" width="100%" height="100%">
              <LineChart data={unreviewedMergeData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--danger)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 4: 운영·안정성 */}
      <section id="ops-section">
        <SectionHeader 
          title="운영·안정성 (Operations)" 
          subtitle="배포 이후 서비스가 실제로 잘 돌아가고 있는가?"
          aiInsight="서비스 가용성은 99.98%로 안정적이나, 특정 시간대 응답 시간(p95)이 200ms를 초과하는 현상이 관찰됩니다."
          sources={["Datadog", "PagerDuty"]}
        />
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard 
            label="서비스 가용성" 
            value="99.98" 
            unit="%" 
            status={{ color: 'var(--success)', type: 'dot' }} 
            description="전체 운영 시간 대비 서비스가 정상적으로 작동한 시간의 비율입니다."
            source="Datadog"
          />
          <StatCard 
            label="에러율" 
            value="0.04" 
            unit="%" 
            status={{ color: 'var(--success)', type: 'dot' }} 
            description="전체 요청 중 5xx 에러가 발생한 비율입니다."
            source="Datadog"
          />
          <StatCard 
            label="응답시간 (p95)" 
            value="124" 
            unit="ms" 
            status={{ color: 'var(--warning)', type: 'dot' }} 
            description="상위 5%를 제외한 대다수 사용자가 경험하는 응답 속도입니다."
            source="Datadog"
          />
          <StatCard 
            label="인시던트 건수" 
            value="2" 
            unit="건" 
            status={{ color: 'var(--danger)', type: 'dot' }} 
            description="서비스 중단을 초래한 중대 장애 발생 건수입니다."
            source="PagerDuty"
          />
        </div>

        <IntegratedErrorChart data={ERROR_RATE_TREND} />
        
        <IncidentTable incidents={INCIDENTS_DATA} />
      </section>

      {/* Detail Panel */}
      <DetailPanel 
        isOpen={detailConfig.isOpen}
        onClose={() => setDetailConfig(prev => ({ ...prev, isOpen: false }))}
        title={detailConfig.title}
        summary={detailConfig.summary}
        data={detailConfig.data}
        externalLink="#"
        externalLinkLabel={detailConfig.externalLinkLabel}
      />

      {/* Overlay for Panel */}
      {detailConfig.isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDetailConfig(prev => ({ ...prev, isOpen: false }))}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[90]"
        />
      )}
    </motion.div>
  );
};
