
import { 
  LayoutDashboard, 
  Sparkles, 
  GitBranch, 
  MessageSquare, 
  ShieldCheck, 
  Settings,
  ExternalLink,
  Activity,
  Bell,
  BarChart3
} from 'lucide-react';
import { Page, SidebarItemProps } from '../types';

const SidebarItem = ({ icon: Icon, label, badge, active = false, isExternal = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer transition-colors ${active ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium border-r-2 border-[#3B82F6]' : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#374151]'}`}
  >
    <Icon size={16} className={active ? 'text-[#1D4ED8]' : 'text-[#6B7280]'} />
    <span>{label}</span>
    {badge && <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    {isExternal && <ExternalLink size={12} className="ml-auto text-[#9CA3AF]" />}
  </div>
);

interface SidebarProps {
  currentPage: Page;
  isAiPanelOpen: boolean;
  setCurrentPage: (page: Page) => void;
}

export const Sidebar = ({ currentPage, isAiPanelOpen, setCurrentPage }: SidebarProps) => {
  return (
    <aside className="w-[220px] bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
      <div className="px-4 py-[18px] border-bottom border-[#F3F4F6] flex items-center gap-2">
        <ShieldCheck size={20} className="text-[#1D4ED8]" />
        <span className="text-sm font-bold tracking-tight text-[#111827]">Quality Portal</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">분석</div>
        <SidebarItem icon={Sparkles} label="AI 브리핑" badge="3" onClick={() => setCurrentPage('ai-briefing')} active={currentPage === 'ai-briefing'} />
        <SidebarItem icon={BarChart3} label="지표 대시보드" onClick={() => setCurrentPage('metrics-dashboard')} active={currentPage === 'metrics-dashboard'} />

        <div className="px-4 py-3 mt-2 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">연동</div>
        <SidebarItem icon={Settings} label="Jira" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={GitBranch} label="Bitbucket" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={ShieldCheck} label="Sparrow" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={Settings} label="Jenkins" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={Activity} label="Datadog" isExternal={true} onClick={() => {}} />
        <SidebarItem icon={Bell} label="PagerDuty" isExternal={true} onClick={() => {}} />
      </div>

      <div className="mt-auto p-3 flex flex-col gap-2 border-t border-[#F3F4F6]">
        <button 
          onClick={() => setCurrentPage('ai-chat' as any)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${isAiPanelOpen ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]' : 'bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]'}`}
        >
          <Sparkles size={16} className={isAiPanelOpen ? 'text-[#1D4ED8]' : 'text-[#6B7280]'} />
          <span>AI 대화</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        </button>
        
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-2.5">
          <div className="text-[10px] text-[#9CA3AF] font-medium">현재 프로젝트</div>
          <div className="text-xs font-semibold text-[#111827] mt-0.5">ERP 고도화</div>
          <div className="text-[11px] text-[#6B7280] mt-0.5">스프린트 4 / 8 진행 중</div>
        </div>
      </div>
    </aside>
  );
};
