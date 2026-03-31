
export type Page = 'dashboard' | 'ai-agent' | 'risk-analysis' | 'ai-chat';

export interface SidebarItemProps {
  icon: any;
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
  sparklineData?: { value: number }[];
}

export interface ValueStreamSegment {
  label: string;
  duration: string;
  color: string;
  isLongest?: boolean;
}

export interface IncidentEvent {
  label: string;
  time: string;
  status: 'danger' | 'warning' | 'success' | 'neutral';
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
