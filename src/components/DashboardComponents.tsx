
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
  <div className="mb-6 mt-10 first:mt-0">
    <div className="flex items-baseline gap-2 mb-1">
      <h2 className="text-[15px] font-bold text-[#111827]">{title}</h2>
      <span className="text-[11px] text-[#9CA3AF] font-medium">{subtitle}</span>
    </div>
    {aiInsight && (
      <div className="flex items-center gap-2 bg-[#F0F9FF] border border-[#E0F2FE] rounded-lg px-3 py-2 mt-2">
        <Sparkles size={13} className="text-[#0284C7] shrink-0" />
        <p className="text-[11.5px] text-[#0369A1] font-medium leading-none">
          <span className="font-bold mr-1">AI 해석:</span> {aiInsight}
        </p>
      </div>
    )}
  </div>
);

export const StatCard = ({ label, value, unit, trend, status, sparklineData, description }: MetricCardProps & { description?: string }) => (
  <div className="bg-white rounded-lg border border-[#E5E7EB] p-3.5 shadow-sm flex flex-col min-h-[120px] group relative">
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-1">
        <span className="text-[11px] text-[#6B7280] font-medium">{label}</span>
        {description && (
          <div className="relative">
            <div className="cursor-help text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 bg-[#111827] text-white text-[10px] p-2 rounded shadow-xl z-30 leading-normal">
              {description}
              <div className="absolute top-full left-2 border-4 border-transparent border-t-[#111827]" />
            </div>
          </div>
        )}
      </div>
      {status && (
        status.type === 'badge' ? (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${status.color}15`, color: status.color }}>
            {status.label}
          </span>
        ) : (
          <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: status.color }} />
        )
      )}
    </div>
    
    <div className="flex items-baseline gap-1 mt-auto">
      <span className="text-[24px] font-bold text-[#111827] tracking-tight">{value}</span>
      {unit && <span className="text-[12px] text-[#6B7280] font-medium">{unit}</span>}
    </div>

    {trend && (
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[11px] font-medium" style={{ color: trend.color || (trend.direction === 'up' ? '#EF4444' : '#10B981') }}>
          {trend.direction === 'up' ? <ArrowUp size={10} className="inline mr-0.5" /> : <ArrowDown size={10} className="inline mr-0.5" />}
          {trend.value}
        </span>
        <span className="text-[11px] text-[#9CA3AF]">전주 대비</span>
      </div>
    )}

    {sparklineData && (
      <div className="h-[24px] mt-2 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1D4ED8" 
              strokeWidth={1.5} 
              dot={false} 
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

export const ValueStreamBar = ({ segments }: { segments: ValueStreamSegment[] }) => (
  <div className="w-full bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm mb-6">
    <div className="flex h-[32px] w-full rounded-md overflow-hidden">
      {segments.map((seg, i) => (
        <div 
          key={i} 
          className="flex items-center justify-center relative group"
          style={{ 
            flex: parseFloat(seg.duration) || 1, 
            backgroundColor: seg.color,
            opacity: seg.isLongest ? 1 : 0.7
          }}
        >
          <span className="text-[10px] font-bold text-white truncate px-1">
            {seg.label} ({seg.duration})
          </span>
          {/* Tooltip on hover */}
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#111827] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
            {seg.label}: {seg.duration}
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-2">
      <div className="flex gap-4">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-[10px] text-[#6B7280]">{seg.label}</span>
          </div>
        ))}
      </div>
      <span className="text-[10px] text-[#9CA3AF]">평균 총 소요시간: 12.5일</span>
    </div>
  </div>
);

export const HorizontalBar = ({ label, value, color, target, sub }: { label: string, value: number, color: string, target?: number, sub?: string }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-[11px] font-medium text-[#374151]">{label}</span>
      <span className="text-[11px] font-bold text-[#111827]">{sub || `${value}%`}</span>
    </div>
    <div className="h-[6px] bg-[#F3F4F6] rounded-full relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
      {target && (
        <div 
          className="absolute top-0 h-full w-[1.5px] bg-[#6B7280] border-dashed"
          style={{ left: `${target}%` }}
        />
      )}
    </div>
  </div>
);

export const IncidentTimeline = ({ events }: { events: IncidentEvent[] }) => (
  <div className="w-full bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
    <div className="relative flex items-center justify-between">
      <div className="absolute h-[1.5px] bg-[#E5E7EB] left-0 right-0 top-1/2 -translate-y-1/2 z-0" />
      {events.map((ev, i) => (
        <div key={i} className="relative z-10 flex flex-col items-center">
          <div 
            className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: ev.status === 'danger' ? '#EF4444' : ev.status === 'success' ? '#10B981' : ev.status === 'warning' ? '#F59E0B' : '#6B7280' }}
          />
          <div className="mt-2 text-center">
            <div className="text-[11px] font-bold text-[#111827]">{ev.label}</div>
            <div className="text-[10px] text-[#9CA3AF]">{ev.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RiskAnalysisBar = ({ label, status, statusColor, value, color, sub }: any) => (
  <div className="flex items-center gap-2.5">
    <div className="flex-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[11.5px] font-semibold text-[#374151]">{label}</span>
        <span className="text-[10px] font-bold px-1.5 py-0 rounded" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>{status}</span>
      </div>
      <div className="mt-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full" 
          style={{ backgroundColor: color }} 
        />
      </div>
    </div>
    <span className="text-[11px] text-[#6B7280] w-[80px] shrink-0 text-right">{sub}</span>
  </div>
);

export const RecommendationItem = ({ type, typeColor, title, sources, from, to, linkLabel, linkIcon: LinkIcon }: any) => (
  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex flex-col">
    <div className="flex items-center gap-1.5 mb-2">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColor }} />
      <span className="text-[11px] font-bold text-[#374151]">{type}</span>
      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>긴급</span>
    </div>
    <div className="text-[12.5px] text-[#374151] leading-relaxed mb-2.5" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="flex gap-1 mb-2.5">
      {sources.map((src: string) => (
        <span key={src} className="text-[10px] font-semibold bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB] px-1.5 py-0 rounded">{src}</span>
      ))}
    </div>
    <div className="mt-auto pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between">
      <span className="text-[10.5px] text-[#9CA3AF]">해소 시 리스크 변화</span>
      <span className="text-[13px] font-bold text-[#059669] flex items-center gap-1">
        {to} <span className="text-[11px] text-[#9CA3AF] font-normal">← {from}</span>
      </span>
    </div>
    <div className="mt-2 text-[11.5px] text-[#1D4ED8] font-medium hover:underline cursor-pointer flex items-center gap-1">
      <LinkIcon size={11} /> {linkLabel} →
    </div>
  </div>
);
