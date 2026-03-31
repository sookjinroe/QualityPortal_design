
import { 
  LayoutDashboard, 
  Bot, 
  GitBranch, 
  MessageSquare, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';
import { Page, SidebarItemProps } from '../types';

const SidebarItem = ({ icon: Icon, label, badge, active = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-[13px] cursor-pointer transition-colors ${active ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium border-r-2 border-[#3B82F6]' : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#374151]'}`}
  >
    <Icon size={16} className={active ? 'text-[#1D4ED8]' : 'text-[#6B7280]'} />
    <span>{label}</span>
    {badge && <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
  </div>
);

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Sidebar = ({ currentPage, setCurrentPage }: SidebarProps) => {
  return (
    <aside className="w-[220px] bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
      <div className="px-4 py-[18px] border-bottom border-[#F3F4F6] flex items-center gap-2.5">
        <div className="w-7 h-7 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-lg flex items-center justify-center">
          <ShieldCheck size={16} color="white" />
        </div>
        <span className="text-sm font-bold tracking-tight">Quality Portal</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">분석</div>
        <SidebarItem icon={LayoutDashboard} label="대시보드" onClick={() => setCurrentPage('dashboard')} active={currentPage === 'dashboard'} />
        <SidebarItem icon={Bot} label="AI 에이전트" badge="9" onClick={() => setCurrentPage('ai-agent')} active={currentPage === 'ai-agent'} />
        <SidebarItem icon={GitBranch} label="리스크 분석" onClick={() => setCurrentPage('risk-analysis')} active={currentPage === 'risk-analysis'} />
        <SidebarItem icon={MessageSquare} label="AI 대화" onClick={() => setCurrentPage('ai-chat')} active={currentPage === 'ai-chat'} />

        <div className="px-4 py-3 mt-2 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">연동</div>
        <SidebarItem icon={Settings} label="Jira" onClick={() => {}} />
        <SidebarItem icon={GitBranch} label="Bitbucket" onClick={() => {}} />
        <SidebarItem icon={ShieldCheck} label="Sparrow" onClick={() => {}} />
        <SidebarItem icon={Settings} label="Jenkins" onClick={() => {}} />
      </div>

      <div className="mt-auto p-3 border-t border-[#F3F4F6]">
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-2.5">
          <div className="text-[10px] text-[#9CA3AF] font-medium">현재 프로젝트</div>
          <div className="text-xs font-semibold text-[#111827] mt-0.5">ERP 고도화</div>
          <div className="text-[11px] text-[#6B7280] mt-0.5">스프린트 4 / 8 진행 중</div>
        </div>
      </div>
    </aside>
  );
};
