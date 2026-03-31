
import { motion } from 'motion/react';
import { 
  StatCard, 
  SectionHeader, 
  ValueStreamBar, 
  HorizontalBar, 
  IncidentTimeline 
} from '../components/DashboardComponents';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  XAxis, 
  CartesianGrid, 
  AreaChart, 
  Area,
  Tooltip,
  ReferenceLine
} from 'recharts';

// Mock Data
const doraTrendData = [
  { name: 'S1', freq: 12, lead: 15, fail: 5, recovery: 10 },
  { name: 'S2', freq: 18, lead: 12, fail: 8, recovery: 15 },
  { name: 'S3', freq: 15, lead: 18, fail: 4, recovery: 12 },
  { name: 'S4', freq: 22, lead: 10, fail: 2, recovery: 8 },
];

const devFlowSparkline = [
  { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, { value: 60 }, { value: 55 }, { value: 70 }, { value: 65 }
];

const unlinkedCommitData = [
  { name: 'W1', value: 12 }, { name: 'W2', value: 15 }, { name: 'W3', value: 10 }, { name: 'W4', value: 25 },
  { name: 'W5', value: 18 }, { name: 'W6', value: 32 }, { name: 'W7', value: 28 }, { name: 'W8', value: 38 }
];

const errorRateData = [
  { name: '00:00', value: 0.2 }, { name: '04:00', value: 0.15 }, { name: '08:00', value: 0.4 }, 
  { name: '12:00', value: 0.8 }, { name: '16:00', value: 0.5 }, { name: '20:00', value: 0.3 }
];

export const DashboardPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Top Context Bar */}
      <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">프로젝트</span>
            <span className="text-[13px] font-bold text-[#111827]">ERP 고도화</span>
          </div>
          <div className="h-8 w-[1px] bg-[#F3F4F6]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">스프린트</span>
            <span className="text-[13px] font-bold text-[#111827]">Sprint 4</span>
          </div>
          <div className="h-8 w-[1px] bg-[#F3F4F6]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">기간</span>
            <span className="text-[13px] font-bold text-[#111827]">2026.03.15 - 2026.03.31</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">마지막 동기화</div>
          <div className="text-[12px] font-medium text-[#374151]">방금 전 (14:00:55)</div>
        </div>
      </div>

      {/* Section 1: DORA */}
      <section>
        <SectionHeader 
          title="DORA 요약" 
          subtitle="배포 속도와 안정성을 업계 기준으로 측정합니다"
          aiInsight="배포 빈도가 전주 대비 15% 상승하며 High 등급을 유지하고 있습니다."
        />

        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatCard 
            label="배포 빈도" 
            value="22" 
            unit="회/주" 
            status={{ label: 'High', color: '#10B981', type: 'badge' }} 
            description="성공적으로 프로덕션에 배포된 횟수입니다. 높을수록 기민한 대응이 가능함을 의미합니다."
          />
          <StatCard 
            label="변경 리드타임" 
            value="10.2" 
            unit="일" 
            status={{ label: 'Medium', color: '#F59E0B', type: 'badge' }} 
            description="코드 커밋부터 배포 완료까지 걸리는 시간입니다. 낮을수록 빠른 가치 전달이 가능합니다."
          />
          <StatCard 
            label="변경 실패율" 
            value="2.4" 
            unit="%" 
            status={{ label: 'High', color: '#10B981', type: 'badge' }} 
            description="배포 후 장애가 발생하거나 롤백된 비율입니다. 낮을수록 배포 안정성이 높습니다."
          />
          <StatCard 
            label="복구 시간" 
            value="8.5" 
            unit="h" 
            status={{ label: 'High', color: '#10B981', type: 'badge' }} 
            description="서비스 장애 발생 시 정상 복구까지 걸리는 시간입니다. 낮을수록 복원력이 뛰어납니다."
          />
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[12px] font-semibold text-[#374151]">스프린트별 추세</div>
            <div className="flex gap-3">
              {[
                { label: '배포빈도', color: '#1D4ED8' },
                { label: '리드타임', color: '#10B981' },
                { label: '실패율', color: '#EF4444' },
                { label: '복구시간', color: '#F59E0B' }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1">
                  <div className="w-2 h-[1.5px]" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={doraTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Line type="monotone" dataKey="freq" stroke="#1D4ED8" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="lead" stroke="#10B981" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="fail" stroke="#EF4444" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="recovery" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
                <ReferenceLine y={15} stroke="#6B7280" strokeDasharray="3 3" label={{ value: 'Benchmark', position: 'right', fill: '#6B7280', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 2: 개발 흐름 */}
      <section>
        <SectionHeader 
          title="개발 흐름" 
          subtitle="일감이 어느 단계에서 얼마나 오래 머무는지 추적합니다"
          aiInsight="리뷰 단계에서의 대기 시간이 전체 사이클의 40%를 차지하며 주요 병목으로 작용하고 있습니다."
        />
        
        <ValueStreamBar segments={[
          { label: '이슈생성', duration: '2d', color: '#94A3B8' },
          { label: '개발', duration: '3d', color: '#60A5FA' },
          { label: 'PR', duration: '1d', color: '#818CF8' },
          { label: '리뷰', duration: '40h', color: '#F59E0B', isLongest: true },
          { label: '머지', duration: '4h', color: '#34D399' },
          { label: '배포', duration: '2h', color: '#10B981' },
        ]} />

        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatCard 
            label="PR 사이클타임" 
            value="40.3" 
            unit="h" 
            trend={{ value: '+12%', direction: 'up' }} 
            sparklineData={devFlowSparkline} 
            description="PR 생성부터 머지까지 걸리는 평균 시간입니다. 리뷰 속도와 밀접한 관련이 있습니다."
          />
          <StatCard 
            label="리뷰 대기시간" 
            value="18.5" 
            unit="h" 
            trend={{ value: '-5%', direction: 'down' }} 
            sparklineData={devFlowSparkline} 
            description="PR 생성 후 첫 리뷰가 달리기까지 걸리는 시간입니다. 병목 구간을 찾는 핵심 지표입니다."
          />
          <StatCard 
            label="이슈 체류" 
            value="4.2" 
            unit="일" 
            trend={{ value: '+2%', direction: 'up' }} 
            sparklineData={devFlowSparkline} 
            description="하나의 일감이 특정 상태(In Progress 등)에 머물러 있는 평균 기간입니다."
          />
          <StatCard 
            label="스프린트 완료율" 
            value="83" 
            unit="%" 
            trend={{ value: '+8%', direction: 'up' }} 
            sparklineData={devFlowSparkline} 
            description="계획된 스토리 포인트 대비 실제 완료된 포인트의 비율입니다."
          />
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
          <div className="text-[12px] font-semibold text-[#374151] mb-4">티켓 없는 커밋 비율 추이</div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={unlinkedCommitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 50]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1D4ED8" strokeWidth={1.5} dot={false} />
                <ReferenceLine y={20} stroke="#6B7280" strokeDasharray="3 3" label={{ value: '허용치', position: 'right', fill: '#6B7280', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 3: 코드 품질 */}
      <section>
        <SectionHeader 
          title="코드 품질" 
          subtitle="코드에 잠재된 위험과 기술 부채를 진단합니다"
          aiInsight="취약점 유입은 억제되고 있으나, 기술 부채 지수가 C등급으로 하락하며 유지보수 비용이 증가하고 있습니다."
        />
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
            <div className="text-[12px] font-semibold text-[#374151] mb-4">취약점</div>
            <HorizontalBar label="High" value={30} color="#EF4444" sub="3건" />
            <HorizontalBar label="Medium" value={70} color="#F59E0B" sub="7건" />
            <HorizontalBar label="Low" value={50} color="#6B7280" sub="5건" />
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
            <div className="text-[12px] font-semibold text-[#374151] mb-4">커버리지 (전체 72%)</div>
            <HorizontalBar label="Core Module" value={85} color="#10B981" target={80} />
            <HorizontalBar label="API Module" value={65} color="#EF4444" target={80} />
            <HorizontalBar label="UI Module" value={72} color="#F59E0B" target={80} />
          </div>

          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm flex flex-col items-center justify-center">
            <div className="text-[12px] font-semibold text-[#374151] mb-2">기술 부채</div>
            <div className="text-[48px] font-bold text-[#F59E0B]">C</div>
            <div className="text-[11px] text-[#9CA3AF]">기준 B+ 대비 미달</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm mt-4">
          <div className="text-[12px] font-semibold text-[#374151] mb-4">무검토 머지 비율 추이</div>
          <div className="h-[100px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={unlinkedCommitData}>
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 4: 운영·안정성 */}
      <section>
        <SectionHeader 
          title="운영·안정성" 
          subtitle="배포 이후 서비스 상태를 실시간으로 모니터링합니다"
          aiInsight="서비스 가용성은 99.98%로 안정적이나, 특정 시간대 응답 시간(p95)이 200ms를 초과하는 현상이 관찰됩니다."
        />
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          <StatCard 
            label="서비스 가용성" 
            value="99.98" 
            unit="%" 
            status={{ color: '#10B981', type: 'dot' }} 
            description="전체 운영 시간 대비 서비스가 정상적으로 작동한 시간의 비율입니다."
          />
          <StatCard 
            label="에러율" 
            value="0.04" 
            unit="%" 
            status={{ color: '#10B981', type: 'dot' }} 
            description="전체 요청 중 5xx 에러가 발생한 비율입니다."
          />
          <StatCard 
            label="응답시간 (p95)" 
            value="124" 
            unit="ms" 
            status={{ color: '#F59E0B', type: 'dot' }} 
            description="상위 5%를 제외한 대다수 사용자가 경험하는 응답 속도입니다."
          />
          <StatCard 
            label="인시던트" 
            value="2" 
            unit="건" 
            status={{ color: '#EF4444', type: 'dot' }} 
            description="서비스 중단을 초래한 중대 장애 발생 건수입니다."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
            <div className="text-[12px] font-semibold text-[#374151] mb-4">에러율 추이</div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={errorRateData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={1.5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[12px] font-semibold text-[#374151]">최근 인시던트 타임라인</div>
            <IncidentTimeline events={[
              { label: '발생', time: '14:20', status: 'danger' },
              { label: '감지', time: '14:22', status: 'warning' },
              { label: '해소', time: '14:45', status: 'success' },
              { label: '소요 25m', time: '', status: 'neutral' },
            ]} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};
