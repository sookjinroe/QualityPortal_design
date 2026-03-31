
import { motion } from 'motion/react';
import { 
  MetricCardProps, 
  ChartCardProps, 
  RiskAnalysisBarProps, 
  RecommendationItemProps 
} from '../types';

export const MetricCard = ({ label, score, status, sub, value, color }: MetricCardProps) => (
  <div className="bg-white rounded-lg border border-[#E5E7EB] p-3.5 shadow-sm">
    <div className="text-[11px] text-[#9CA3AF] font-medium mb-1 flex items-center justify-between">
      {label} <span className="text-[10px] bg-[#FEE2E2] text-[#DC2626] px-1.5 py-0 rounded font-bold">{score}</span>
    </div>
    <div className="text-xl font-bold leading-tight" style={{ color }}>{status}</div>
    <div className="text-[11px] text-[#9CA3AF] mt-1">{sub}</div>
    <div className="h-1 bg-[#F3F4F6] rounded-full mt-2 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
);

export const ChartCard = ({ title, bars }: ChartCardProps) => (
  <div className="bg-white rounded-lg border border-[#E5E7EB] p-3.5 shadow-sm">
    <div className="text-[12px] font-semibold text-[#374151] mb-2.5">{title}</div>
    <div className="flex items-end gap-1.5 h-[70px]">
      {bars.map((bar, i) => (
        <div 
          key={i} 
          className="flex-1 rounded-t-[3px]" 
          style={{ height: `${bar.h}%`, backgroundColor: bar.c, opacity: bar.o || 1 }} 
        />
      ))}
    </div>
  </div>
);

export const RiskAnalysisBar = ({ label, status, statusColor, value, color, sub }: RiskAnalysisBarProps) => (
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

export const RecommendationItem = ({ type, typeColor, title, sources, from, to, linkLabel, linkIcon: LinkIcon }: RecommendationItemProps) => (
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
