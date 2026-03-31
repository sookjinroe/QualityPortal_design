
import { 
  LayoutDashboard, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  ChevronsUpDown,
  Plus,
  Settings2
} from 'lucide-react';
import { Page, SidebarItemProps } from '../types';

const SidebarItem = ({ icon: Icon, label, badge, active = false, isExternal = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer transition-colors ${active ? 'bg-brand-light text-brand-base font-medium border-r-2 border-brand-base' : 'text-text-secondary hover:bg-app-bg hover:text-text-primary'}`}
  >
    {typeof Icon === 'string' ? (
      <img src={Icon} alt={label} className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
    ) : (
      <Icon size={16} className={active ? 'text-brand-base' : 'text-text-secondary'} />
    )}
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

      {/* Project Selector - Relocated to top for better visibility */}
      <div className="p-3 border-b border-border-base">
        <div className="group flex flex-col p-2.5 rounded-lg border border-border-base bg-app-bg hover:border-brand-base hover:bg-brand-light cursor-pointer transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-brand-base flex items-center justify-center text-[10px] font-bold text-white">P</div>
              <span className="text-xs font-bold text-text-primary">ERP 고도화</span>
            </div>
            <ChevronsUpDown size={14} className="text-text-muted group-hover:text-brand-base" />
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 h-1 bg-border-base rounded-full overflow-hidden">
              <div className="h-full bg-brand-base w-1/2" />
            </div>
            <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">Sprint 4/8</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider">분석</div>
        <SidebarItem icon={LayoutDashboard} label="대시보드" onClick={() => setCurrentPage('dashboard')} active={currentPage === 'dashboard'} />
        <SidebarItem icon={Sparkles} label="AI 브리핑" badge="9" onClick={() => setCurrentPage('ai-agent')} active={currentPage === 'ai-agent'} />
        <SidebarItem icon={MessageSquare} label="AI 대화" onClick={() => setCurrentPage('ai-chat')} active={currentPage === 'ai-chat'} />

        <div className="px-4 py-3 mt-4 flex items-center justify-between group/section">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">연동된 도구</span>
          <button className="p-1 rounded hover:bg-nested-bg text-text-muted hover:text-brand-base transition-colors opacity-0 group-hover/section:opacity-100">
            <Settings2 size={12} />
          </button>
        </div>
        <SidebarItem icon="https://cdn.worldvectorlogo.com/logos/jira-1.svg" label="Jira" isExternal={true} onClick={() => {}} />
        <SidebarItem icon="https://cdn.worldvectorlogo.com/logos/bitbucket-icon.svg" label="Bitbucket" isExternal={true} onClick={() => {}} />
        <SidebarItem icon="https://cdn-icons-png.flaticon.com/512/2092/2092663.png" label="Sparrow" isExternal={true} onClick={() => {}} />
        <SidebarItem icon="https://cdn.worldvectorlogo.com/logos/jenkins-1.svg" label="Jenkins" isExternal={true} onClick={() => {}} />
        <SidebarItem icon="https://cdn.worldvectorlogo.com/logos/datadog.svg" label="Datadog" isExternal={true} onClick={() => {}} />
        <SidebarItem icon="https://www.vectorlogo.zone/logos/pagerduty/pagerduty-icon.svg" label="PagerDuty" isExternal={true} onClick={() => {}} />

        <div className="px-4 py-3">
          <button className="w-full py-2 bg-app-bg border border-dashed border-border-base rounded-lg text-[11px] font-bold text-text-muted hover:border-brand-base hover:text-brand-base hover:bg-brand-light transition-all flex items-center justify-center gap-1.5">
            <Plus size={12} /> 도구 연동하기
          </button>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border-base">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-light border border-brand-base flex items-center justify-center text-[11px] font-bold text-brand-base">UN</div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-text-primary">User Name</span>
            <span className="text-[10px] text-text-muted">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
