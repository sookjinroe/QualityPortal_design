
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
  Tooltip
} from 'recharts';
import { 
  MetricCardProps, 
  ValueStreamSegment, 
  IncidentEvent 
} from '../types';
import { Sparkles, ArrowUp, ArrowDown } from 'lucide-react';

export const SectionHeader = ({ 
  title, 
  subtitle, 
  aiInsight 
}: { 
  title: string; 
  subtitle: string; 
  aiInsight?: string;
}) => (
  <div className="mb-8 mt-12 first:mt-0">
    <div className="flex items-baseline gap-2 mb-1">
      <h2 className="text-[15px] font-bold text-text-primary">{title}</h2>
      <span className="text-[11px] text-text-secondary font-normal">{subtitle}</span>
    </div>
    {aiInsight && (
      <div className="flex items-center gap-2 bg-info-bg border border-info rounded-lg px-4 py-2 mt-2">
        <Sparkles size={14} className="text-info shrink-0" strokeWidth={1.5} />
        <p className="text-[13px] text-info font-normal leading-relaxed">
          {aiInsight}
        </p>
      </div>
    )}
  </div>
);

export const StatCard = ({ label, value, unit, trend, status, sparklineData, description }: MetricCardProps & { description?: string }) => (
  <div className="card-base p-5 flex flex-col min-h-[120px] group relative">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-text-primary font-semibold">{label}</span>
        {description && (
          <div className="relative">
            <div className="cursor-help text-text-description hover:text-text-secondary transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-56 bg-text-primary text-white text-[11px] p-2.5 rounded-lg shadow-xl z-30 leading-relaxed">
              {description}
              <div className="absolute top-full left-3 border-[6px] border-transparent border-t-text-primary" />
            </div>
          </div>
        )}
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
    
    <div className="flex items-baseline gap-1 mt-auto">
      <span className="text-[28px] font-bold text-text-primary font-mono tracking-tight leading-none">{value}</span>
      {unit && <span className="text-[12px] text-text-secondary font-normal">{unit}</span>}
    </div>

    {trend && (
      <div className="flex items-center gap-1 mt-2">
        <span className="text-[11px] font-semibold" style={{ color: trend.color || (trend.direction === 'up' ? '#EF4444' : '#10B981') }}>
          {trend.direction === 'up' ? <ArrowUp size={12} className="inline mr-0.5" strokeWidth={1.5} /> : <ArrowDown size={12} className="inline mr-0.5" strokeWidth={1.5} />}
          {trend.value}
        </span>
        <span className="text-[11px] text-text-description">전주 대비</span>
      </div>
    )}

    {sparklineData && (
      <div className="h-[28px] min-h-[28px] mt-3 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={1.5} 
              dot={false} 
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

export const ValueStreamBar = ({ segments }: { segments: ValueStreamSegment[] }) => (
  <div className="card-base p-5 mb-8">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[13px] font-semibold text-text-primary">가치흐름 분석</span>
      <span className="text-[11px] text-text-secondary font-normal">이슈 생성부터 배포까지의 단계별 소요 시간</span>
    </div>
    <div className="flex h-10 w-full rounded-lg overflow-hidden bg-nested-bg">
      {segments.map((segment, idx) => (
        <div 
          key={idx}
          className="relative group flex items-center justify-center transition-all duration-300 hover:brightness-95"
          style={{ width: `${100 / segments.length}%`, backgroundColor: segment.color }}
        >
          <span className="text-[10px] font-bold text-white drop-shadow-sm">{segment.duration}</span>
          {segment.isLongest && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
          )}
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-text-primary text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20">
            {segment.label}: {segment.duration}
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-3">
      {segments.map((segment, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1" style={{ width: `${100 / segments.length}%` }}>
          <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-tight">{segment.label}</span>
          {idx < segments.length - 1 && (
            <div className="h-[1px] w-full bg-border-base mt-1" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export const HorizontalBar = ({ label, value, color, sub, target }: { label: string, value: number, color: string, sub?: string, target?: number }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-[11px] font-medium text-text-secondary">{label}</span>
      <span className="text-[11px] font-bold text-text-primary font-mono">{sub || `${value}%`}</span>
    </div>
    <div className="relative h-2 w-full bg-nested-bg rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-full rounded-full" 
        style={{ backgroundColor: color }} 
      />
      {target !== undefined && (
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-text-primary z-10" 
          style={{ left: `${target}%` }}
          title={`목표: ${target}%`}
        />
      )}
    </div>
  </div>
);

export const IncidentTimeline = ({ events }: { events: IncidentEvent[] }) => (
  <div className="card-base p-6">
    <div className="relative flex items-center justify-between w-full px-2">
      <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-border-base -translate-y-1/2 z-0" />
      {events.map((event, idx) => (
        <div key={idx} className="relative z-10 flex flex-col items-center bg-card-bg px-1">
          <div 
            className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${event.status === 'danger' ? 'bg-danger' : event.status === 'warning' ? 'bg-warning' : event.status === 'success' ? 'bg-success' : 'bg-text-inactive'}`} 
          />
          <div className="mt-2 text-center">
            <div className="text-[11px] font-bold text-text-primary">{event.label}</div>
            <div className="text-[10px] text-text-description font-mono">{event.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RiskAnalysisBar = ({ label, status, statusColor, value, color, sub }: any) => (
  <div className="flex items-center gap-3">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-text-primary">{label}</span>
        <span className="badge-base" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>{status}</span>
      </div>
      <div className="mt-2 h-2 bg-nested-bg rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full" 
          style={{ backgroundColor: color }} 
        />
      </div>
    </div>
    <span className="text-[11px] text-text-secondary w-[80px] shrink-0 text-right font-mono">{sub}</span>
  </div>
);

export const RecommendationItem = ({ type, typeColor, title, sources, from, to, linkLabel, linkIcon: LinkIcon }: any) => (
  <div className="bg-app-bg border border-border-base rounded-xl p-5 flex flex-col transition-all hover:shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColor }} />
      <span className="text-[11px] font-bold text-text-primary">{type}</span>
      <span className="ml-auto badge-base bg-danger-bg text-danger">긴급</span>
    </div>
    <div className="text-[13px] text-text-primary leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="flex flex-wrap gap-1.5 mb-4">
      {sources.map((src: string) => (
        <span key={src} className="text-[10px] font-semibold bg-nested-bg text-text-secondary border border-border-base px-2 py-0.5 rounded">{src}</span>
      ))}
    </div>
    <div className="mt-auto pt-4 border-t border-border-base flex items-center justify-between">
      <span className="text-[11px] text-text-description">해소 시 리스크 변화</span>
      <span className="text-[13px] font-bold text-success flex items-center gap-1 font-mono">
        {to} <span className="text-[11px] text-text-description font-normal">← {from}</span>
      </span>
    </div>
    <div className="mt-3 text-[12px] text-brand-base font-semibold hover:underline cursor-pointer flex items-center gap-1">
      <LinkIcon size={12} strokeWidth={1.5} /> {linkLabel} →
    </div>
  </div>
);
