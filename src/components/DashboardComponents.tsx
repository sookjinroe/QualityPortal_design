
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  XAxis, 
  CartesianGrid, 
  AreaChart, 
  Area,
  Tooltip as RechartsTooltip,
  ReferenceLine
} from 'recharts';
import { 
  MetricCardProps, 
  ValueStreamSegment, 
  DoraBenchmark,
  Incident,
  DetailPanelProps
} from '../types';
import { Sparkles, ArrowUp, ArrowDown, HelpCircle, AlertCircle, CheckCircle2, XCircle, Clock, ShieldAlert, Zap, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

export const SectionHeader = ({ 
  title, 
  subtitle, 
  aiInsight,
  sources = []
}: { 
  title: string; 
  subtitle: string; 
  aiInsight?: string;
  sources?: string[];
}) => (
  <div className="mb-6 mt-12 first:mt-0">
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-baseline gap-2">
        <h2 className="text-[18px] font-bold text-text-primary tracking-tight">{title}</h2>
        <span className="text-[12px] text-text-secondary font-medium opacity-70">{subtitle}</span>
      </div>
      <div className="flex gap-1.5 shrink-0">
        {sources.map(source => (
          <span key={source} className="px-2 py-0.5 bg-nested-bg border border-border-base rounded text-[9px] font-bold text-text-muted uppercase tracking-wider">
            {source}
          </span>
        ))}
      </div>
    </div>
    {aiInsight && (
      <div className="flex items-center gap-2 bg-brand-light/50 border border-brand-base/10 rounded-full px-4 py-1.5 w-fit">
        <Sparkles size={14} className="text-brand-base shrink-0" strokeWidth={2} />
        <p className="text-[12px] text-brand-dark font-semibold">
          {aiInsight}
        </p>
      </div>
    )}
  </div>
);

export const Tooltip = ({ content }: { content: string }) => (
  <div className="group relative inline-block ml-1 align-middle">
    <HelpCircle size={14} className="text-text-muted cursor-help hover:text-text-secondary transition-colors" strokeWidth={1.5} />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 bg-text-primary text-white text-[11px] p-3 rounded-xl shadow-2xl z-50 leading-relaxed animate-in fade-in zoom-in duration-200">
      {content}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-text-primary" />
    </div>
  </div>
);

export const StatCard = ({ label, value, unit, trend, status, description, onClick, source }: MetricCardProps & { source?: string }) => (
  <div 
    onClick={onClick}
    className={`card-base p-5 flex flex-col min-h-[110px] group relative transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-brand-base hover:shadow-md hover:-translate-y-0.5' : ''}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center">
        <span className="text-[13px] text-text-secondary font-semibold">{label}</span>
        {description && <Tooltip content={description} />}
      </div>
      {status && (
        status.type === 'badge' ? (
          <span className="badge-base" style={{ backgroundColor: `${status.color}15`, color: status.color }}>
            {status.label}
          </span>
        ) : (
          <div className="w-2 h-2 rounded-full mt-1 animate-pulse-dot" style={{ backgroundColor: status.color }} />
        )
      )}
    </div>
    
    <div className="flex items-baseline gap-1 mb-2">
      <span className="text-[32px] font-bold text-text-primary font-mono tracking-tighter leading-none">{value}</span>
      {unit && <span className="text-[14px] text-text-secondary font-medium ml-0.5">{unit}</span>}
    </div>

    <div className="flex items-center justify-between mt-auto">
      {source ? (
        <span className="px-1.5 py-0.5 bg-nested-bg border border-border-base rounded text-[8px] font-bold text-text-muted uppercase tracking-tighter">
          {source}
        </span>
      ) : trend ? (
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold flex items-center" style={{ color: trend.color || (trend.direction === 'up' ? '#EF4444' : '#10B981') }}>
            {trend.direction === 'up' ? <ArrowUp size={12} className="mr-0.5" strokeWidth={2.5} /> : <ArrowDown size={12} className="mr-0.5" strokeWidth={2.5} />}
            {trend.value}
          </span>
          <span className="text-[10px] text-text-muted font-medium">vs Prev</span>
        </div>
      ) : <div />}
    </div>

    {/* Drill-down Link - Minimalist Style */}
    {onClick && (
      <div className="absolute bottom-3 right-4 opacity-40 group-hover:opacity-100 transition-all duration-300 text-text-muted group-hover:text-brand-base">
        <ChevronRight size={16} strokeWidth={3} />
      </div>
    )}
  </div>
);

export const DoraBenchmarkScale = ({ benchmarks }: { benchmarks: DoraBenchmark[] }) => (
  <div className="card-base p-6 mb-8">
    <div className="grid grid-cols-4 gap-8">
      {benchmarks.map((b, idx) => (
        <div key={idx} className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-[13px] font-bold text-text-primary">{b.label}</span>
              <Tooltip content={b.description} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              b.level === 'Elite' ? 'bg-success-bg text-success' : 
              b.level === 'High' ? 'bg-info-bg text-info' : 
              b.level === 'Medium' ? 'bg-warning-bg text-warning' : 'bg-danger-bg text-danger'
            }`}>
              {b.level}
            </span>
          </div>
          
          <div className="relative h-[160px] w-full bg-nested-bg rounded-lg flex flex-col justify-between py-2 px-3 border border-border-base">
            {/* Scale Labels */}
            <div className="text-[9px] font-bold text-text-muted uppercase">Elite</div>
            <div className="text-[9px] font-bold text-text-muted uppercase">High</div>
            <div className="text-[9px] font-bold text-text-muted uppercase">Med</div>
            <div className="text-[9px] font-bold text-text-muted uppercase">Low</div>
            
            {/* Marker */}
            <motion.div 
              initial={{ bottom: 0 }}
              animate={{ bottom: `${b.score}%` }}
              transition={{ duration: 1, delay: idx * 0.1, ease: "backOut" }}
              className="absolute left-0 right-0 flex items-center justify-center pointer-events-none z-10"
              style={{ position: 'absolute' }}
            >
              <div className="w-full h-[2px] bg-brand-base shadow-[0_0_8px_rgba(59,130,246,0.5)] relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-brand-base rounded-full border-2 border-white shadow-md" />
              </div>
            </motion.div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-[18px] font-bold text-text-primary font-mono">{b.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ValueStreamBar = ({ segments, onSegmentClick }: { segments: ValueStreamSegment[], onSegmentClick?: (segment: ValueStreamSegment) => void }) => {
  const totalDuration = segments.reduce((acc, s) => acc + s.duration, 0);
  
  return (
    <div className="card-base p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-[14px] font-bold text-text-primary">가치흐름 분석 (Value Stream)</span>
          <Tooltip content="아이디어(이슈) 생성부터 프로덕션 배포까지 각 단계별 소요 시간과 병목 구간을 시각화합니다." />
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-text-secondary" />
          <span className="text-[13px] font-bold text-text-primary">전체 평균 { (totalDuration / 24).toFixed(1) }일</span>
        </div>
      </div>
      
      <div className="flex h-14 w-full rounded-xl overflow-hidden bg-nested-bg shadow-inner border border-border-base">
        {segments.map((segment, idx) => (
          <div 
            key={idx}
            onClick={() => onSegmentClick?.(segment)}
            className={`relative group flex items-center justify-center transition-all duration-300 hover:brightness-95 cursor-pointer ${segment.isBottleneck ? 'ring-2 ring-danger ring-inset z-10' : ''}`}
            style={{ width: `${(segment.duration / totalDuration) * 100}%`, backgroundColor: segment.color }}
          >
            <span className={`text-[11px] font-bold ${segment.isBottleneck ? 'text-white' : 'text-text-primary'} drop-shadow-sm`}>
              {segment.durationLabel}
            </span>
            
            {segment.isBottleneck && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-danger text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-20 whitespace-nowrap flex items-center gap-1">
                <AlertCircle size={10} strokeWidth={3} /> 병목
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-danger" />
              </div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-text-primary text-white text-[11px] px-3 py-2 rounded-xl whitespace-nowrap z-50 shadow-2xl">
              <div className="font-bold border-b border-white/20 pb-1 mb-1">{segment.label}</div>
              <div>소요 시간: {segment.durationLabel}</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-text-primary" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        {segments.map((segment, idx) => (
          <div key={idx} className="flex flex-col items-center" style={{ width: `${(segment.duration / totalDuration) * 100}%` }}>
            <span className={`text-[10px] font-bold uppercase tracking-tighter text-center leading-tight ${segment.isBottleneck ? 'text-danger' : 'text-text-muted'}`}>
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Risk Analysis Components ---

export const RiskAnalysisBar = ({ label, status, statusColor, value, color, sub }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-text-secondary uppercase tracking-tight">{label}</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-app-bg border border-border-base" style={{ color: statusColor }}>{status}</span>
      </div>
      <span className="text-[10px] font-bold text-text-muted">{sub}</span>
    </div>
    <div className="h-1.5 w-full bg-border-base rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

export const RecommendationItem = ({ type, typeColor, title, sources, from, to, linkLabel, linkIcon: Icon }: any) => (
  <div className="bg-app-bg border border-border-base rounded-xl p-4 flex flex-col h-full">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-border-base shadow-sm" style={{ color: typeColor }}>{type}</span>
      <div className="flex gap-1">
        {sources.map((s: string) => (
          <span key={s} className="text-[9px] font-bold text-text-muted bg-white border border-border-base px-1.5 py-0.5 rounded">{s}</span>
        ))}
      </div>
    </div>
    <p className="text-[12.5px] text-text-primary leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="mt-4 pt-4 border-t border-border-base flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] text-text-muted font-bold uppercase tracking-tighter">Current</span>
          <span className="text-[13px] font-bold text-danger">{from}</span>
        </div>
        <div className="w-4 h-[1px] bg-border-base" />
        <div className="flex flex-col">
          <span className="text-[9px] text-text-muted font-bold uppercase tracking-tighter">Target</span>
          <span className="text-[13px] font-bold text-success">{to}</span>
        </div>
      </div>
      <button className="flex items-center gap-1 text-[11px] font-bold text-brand-base hover:underline">
        {linkLabel} {Icon && <Icon size={12} />}
      </button>
    </div>
  </div>
);

export const QualityGateStatus = ({ passed, reasons }: { passed: boolean, reasons: string[] }) => (
  <div className={`card-base p-6 mb-8 border-l-4 ${passed ? 'border-l-success' : 'border-l-danger'}`}>
    <div className="flex items-center gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${passed ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
        {passed ? <CheckCircle2 size={40} strokeWidth={1.5} /> : <XCircle size={40} strokeWidth={1.5} />}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-bold text-text-secondary uppercase tracking-widest">Quality Gate</span>
          <Tooltip content="코드 정적 분석, 보안 취약점, 테스트 커버리지 기준을 모두 충족하는지 판정합니다." />
        </div>
        <h3 className={`text-[28px] font-bold leading-none ${passed ? 'text-success' : 'text-danger'}`}>
          {passed ? 'PASSED' : 'FAILED'}
        </h3>
        {!passed && (
          <div className="mt-3 flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <span key={i} className="text-[11px] font-semibold text-danger bg-danger-bg/50 px-2 py-0.5 rounded-md border border-danger/20 flex items-center gap-1">
                <AlertCircle size={10} /> {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export const DetailPanel = ({ isOpen, onClose, title, summary, data, externalLink, externalLinkLabel }: DetailPanelProps) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: isOpen ? 0 : '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed top-0 right-0 h-screen w-[480px] bg-card-bg border-l border-border-base shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[100] flex flex-col"
  >
    {/* Header */}
    <div className="p-6 border-b border-border-base flex items-center justify-between">
      <div>
        <h3 className="text-[18px] font-bold text-text-primary tracking-tight">{title}</h3>
        <p className="text-[13px] text-text-secondary font-medium mt-1">{summary}</p>
      </div>
      <button 
        onClick={onClose}
        className="w-8 h-8 rounded-full hover:bg-nested-bg flex items-center justify-center transition-colors"
      >
        <XCircle size={20} className="text-text-muted" />
      </button>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_80px_80px_80px] gap-4 px-2 pb-2 border-b border-border-base text-[11px] font-bold text-text-muted uppercase tracking-wider">
          <div>항목명</div>
          <div className="text-center">구분</div>
          <div className="text-center">수치/상태</div>
          <div className="text-center">검토</div>
        </div>
        
        {data.map((item) => (
          <a 
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-[1fr_80px_80px_80px] gap-4 p-3 rounded-xl hover:bg-nested-bg transition-colors group"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-brand-base mb-0.5">{item.id}</span>
              <span className="text-[13px] font-bold text-text-primary group-hover:text-brand-base transition-colors line-clamp-1">{item.title}</span>
            </div>
            <div className="flex items-center justify-center text-[12px] font-medium text-text-secondary">
              {item.author}
            </div>
            <div className="flex items-center justify-center text-[12px] font-bold text-text-primary font-mono">
              {item.cycleTime}
            </div>
            <div className="flex items-center justify-center">
              {item.reviewStatus === 'reviewed' ? (
                <CheckCircle2 size={16} className="text-success" />
              ) : (
                <div className="flex items-center gap-1 text-danger font-bold text-[11px]">
                  <XCircle size={14} /> 미검토
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="p-6 border-t border-border-base bg-nested-bg/30">
      <a 
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-border-base rounded-xl text-[13px] font-bold text-text-primary hover:bg-app-bg transition-colors shadow-sm"
      >
        {externalLinkLabel} <ExternalLink size={14} className="text-text-muted" />
      </a>
    </div>
  </motion.div>
);

export const IntegratedErrorChart = ({ data }: { data: any[] }) => (
  <div className="card-base p-6 mb-8">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <span className="text-[14px] font-bold text-text-primary">에러율 및 인시던트 상관관계</span>
        <Tooltip content="서비스 에러율 추이와 인시던트 발생 시점을 통합하여 장애 원인 분석을 돕습니다." />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-brand-base/20 border border-brand-base" />
          <span className="text-[11px] text-text-secondary font-medium">에러율 (%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-danger" />
          <span className="text-[11px] text-text-secondary font-medium">인시던트 발생</span>
        </div>
      </div>
    </div>
    
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--brand-base)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--brand-base)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }} 
            label={{ value: '시간 (Time)', position: 'insideBottomRight', offset: -5, fontSize: 10, fill: 'var(--text-muted)' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 500 }}
            unit="%"
            label={{ value: '에러율 (%)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: 'var(--text-muted)' }}
          />
          <RechartsTooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="var(--brand-base)" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorError)" 
          />
          {data.map((entry, index) => (
            entry.incident && (
              <ReferenceLine 
                key={index} 
                x={entry.time} 
                stroke="var(--danger)" 
                strokeDasharray="3 3"
                label={{ 
                  position: 'top', 
                  value: '⚠️ Incident', 
                  fill: 'var(--danger)', 
                  fontSize: 10, 
                  fontWeight: 'bold' 
                }} 
              />
            )
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const IncidentTable = ({ incidents }: { incidents: Incident[] }) => (
  <div className="card-base overflow-hidden">
    <div className="p-4 border-b border-border-base bg-nested-bg/30">
      <span className="text-[13px] font-bold text-text-primary">최근 인시던트 목록</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-nested-bg/20">
            <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">ID / 심각도</th>
            <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">발생 / 감지 / 해소</th>
            <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">소요시간</th>
            <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase tracking-wider">원인</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-base">
          {incidents.map((inc) => (
            <tr key={inc.id} className="hover:bg-nested-bg/10 transition-colors">
              <td className="px-4 py-4">
                <div className="text-[12px] font-bold text-text-primary mb-1">{inc.id}</div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  inc.severity === 'Critical' ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning'
                }`}>
                  {inc.severity}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-0.5 font-mono text-[11px]">
                  <div className="flex items-center gap-2"><span className="w-8 text-text-muted">Occ:</span> {inc.occurredAt}</div>
                  <div className="flex items-center gap-2"><span className="w-8 text-text-muted">Det:</span> {inc.detectedAt}</div>
                  <div className="flex items-center gap-2"><span className="w-8 text-text-muted">Res:</span> {inc.resolvedAt}</div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-text-muted" />
                  <span className="text-[13px] font-bold text-text-primary font-mono">{inc.duration}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="text-[12px] text-text-secondary leading-snug max-w-[200px]">{inc.cause}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const HorizontalBar = ({ label, value, color, sub, target, onClick, source }: { label: string, value: number, color: string, sub?: string, target?: number, onClick?: () => void, source?: string }) => (
  <div className={`mb-5 last:mb-0 ${onClick ? 'cursor-pointer group/bar' : ''}`} onClick={onClick}>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <span className={`text-[12px] font-bold text-text-secondary transition-colors ${onClick ? 'group-hover/bar:text-brand-base' : ''}`}>{label}</span>
        {source && (
          <span className="px-1 py-0.5 bg-nested-bg border border-border-base rounded text-[8px] font-bold text-text-muted uppercase tracking-tighter">
            {source}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] font-bold text-text-primary font-mono">{sub || `${value}%`}</span>
        {onClick && <ChevronRight size={12} className="text-text-muted opacity-40 group-hover/bar:opacity-100 transition-all" strokeWidth={3} />}
      </div>
    </div>
    <div className="relative h-2.5 w-full bg-nested-bg rounded-full overflow-hidden border border-border-base/50">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="h-full rounded-full shadow-sm" 
        style={{ backgroundColor: color }} 
      />
      {target !== undefined && (
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-text-primary/40 z-10" 
          style={{ left: `${target}%` }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-text-muted uppercase">Target</div>
        </div>
      )}
    </div>
  </div>
);
