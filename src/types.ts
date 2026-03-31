
export type Page = 'dashboard' | 'ai-agent' | 'risk-analysis' | 'ai-chat';

export interface SidebarItemProps {
  icon: any;
  label: string;
  badge?: string;
  active?: boolean;
  onClick: () => void;
}

export interface RiskBarProps {
  label: string;
  value: number;
  color: string;
  sub: string;
}

export interface RiskAnalysisBarProps extends RiskBarProps {
  status: string;
  statusColor: string;
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

export interface MetricCardProps {
  label: string;
  score: string;
  status: string;
  sub: string;
  value: number;
  color: string;
}

export interface ChartBar {
  h: number;
  c: string;
  o?: number;
}

export interface ChartCardProps {
  title: string;
  bars: ChartBar[];
}
