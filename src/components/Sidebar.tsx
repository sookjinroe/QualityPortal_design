
import { 
  LayoutDashboard, 
  Sparkles, 
  GitBranch, 
  MessageSquare, 
  ShieldCheck, 
  Settings,
  ExternalLink
} from 'lucide-react';
import { Page, SidebarItemProps } from '../types';

const SidebarItem = ({ icon: Icon, label, badge, active = false, isExternal = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer transition-colors ${active ? 'bg-brand-light text-brand-base font-medium border-r-2 border-brand-base' : 'text-text-secondary hover:bg-app-bg hover:text-text-primary'}`}
  >
    <Icon size={16} className={active ? 'text-brand-base' : 'text-text-secondary'} />
    <span>{label}</span>
    {badge && <span className="ml-auto bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    {isExternal && <ExternalLink size={12} className="ml-auto text-text-muted" />}
  </div>
);

interface SidebarProps {
  currentPage: Page;
  isAiPanelOpen: boolean;
  setCurrentPage: (page: Page) => void;
}

export const Sidebar = ({ currentPage, isAiPanelOpen, setCurrentPage }: SidebarProps) => {
  return (
    <aside className="w-[220px] bg-card-bg border-r border-border-base flex flex-col shrink-0">
      <div className="px-4 py-[18px] border-b border-border-base flex items-center gap-2">
        <ShieldCheck size={20} className="text-brand-base" />
        <span className="text-sm font-bold tracking-tight text-text-primary">Quality Portal</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">분석</div>
        <SidebarItem icon={LayoutDashboard} label="대시보드" onClick={() => setCurrentPage('dashboard')} active={currentPage === 'dashboard'} />
        <SidebarItem icon={Sparkles} label="AI 에이전트" badge="9" onClick={() => setCurrentPage('ai-agent')} active={currentPage === 'ai-agent'} />
        <SidebarItem icon={GitBranch} label="리스크 분석" onClick={() => setCurrentPage('risk-analysis')} active={currentPage === 'risk-analysis'} />
        <SidebarItem icon={MessageSquare} label="AI 대화" onClick={() => setCurrentPage('ai-chat')} active={isAiPanelOpen} />

        <div className="px-4 py-3 mt-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">연동</div>
        <SidebarItem icon={Settings} label="Jira" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={GitBranch} label="Bitbucket" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={ShieldCheck} label="Sparrow" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={Settings} label="Jenkins" isExternal={true} onClick={() => {}} />
      </div>

      <div className="mt-auto p-3 border-t border-border-base">
        <div className="bg-app-bg border border-border-base rounded-lg p-2.5">
          <div className="text-[10px] text-text-muted font-medium">현재 프로젝트</div>
          <div className="text-xs font-semibold text-text-primary mt-0.5">ERP 고도화</div>
          <div className="text-[11px] text-text-secondary mt-0.5">스프린트 4 / 8 진행 중</div>
        </div>
      </div>
    </aside>
);
};
