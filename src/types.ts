
export type Page = 'dashboard' | 'ai-agent' | 'ai-chat';

export interface SidebarItemProps {
  icon: any; // Can be a Lucide icon component or a string URL
  label: string;
  badge?: string;
  active?: boolean;
  isExternal?: boolean;
  onClick: () => void;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string; // For tooltip
  trend?: {
    value: string;
    direction: 'up' | 'down';
    color?: string;
  };
  status?: {
    label?: string;
    color: string;
    type: 'badge' | 'dot';
  };
  onClick?: () => void;
}

export interface DoraBenchmark {
  label: string;
  value: string;
  unit: string;
  level: 'Elite' | 'High' | 'Medium' | 'Low';
  score: number; // 0-100 for marker position
  description: string;
}

export interface ValueStreamSegment {
  label: string;
  duration: number; // in hours
  durationLabel: string; // e.g. "2d", "40h"
  color: string;
  isBottleneck?: boolean;
}

export interface Incident {
  id: string;
  occurredAt: string;
  detectedAt: string;
  resolvedAt: string;
  duration: string;
  cause: string;
  severity: 'Critical' | 'Major' | 'Minor';
}

export interface RiskAnalysisBarProps {
  label: string;
  status: string;
  statusColor: string;
  value: number;
  color: string;
  sub: string;
}

export interface RecommendationItemProps {
  type: string;
  typeColor: string;
  title: string;
  sources: string[];
  from: string;
  to: string;
  linkLabel: string;
  linkIcon: any;
}

export interface PRDetail {
  id: string;
  title: string;
  author: string;
  authorPhoto?: string;
  cycleTime: string;
  reviewStatus: 'reviewed' | 'unreviewed';
  link: string;
}

export interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  summary: string;
  data: PRDetail[];
  externalLink: string;
  externalLinkLabel: string;
}
