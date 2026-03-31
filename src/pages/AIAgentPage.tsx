
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ChevronRight, 
  MoreVertical, 
  Mail, 
  Share2, 
  Printer, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  Zap, 
  Clock3, 
  FileText, 
  Settings, 
  ShieldCheck, 
  GitBranch, 
  X,
  LayoutDashboard,
  Rocket,
  Wrench,
  Download
} from 'lucide-react';
// --- Types ---
interface BriefingReport {
  id: string;
  type: 'regular' | 'alert' | 'anomaly';
  title: string;
  time: string;
  summary: string;
  isRead: boolean;
  dateGroup: '오늘' | '이번 주' | '지난 달';
  sources: string[];
  content: {
    headline: string;
    description: string;
    deliveryPrediction: {
      text: string;
      highlights: string[];
    };
    urgentItems: {
      text: string;
      sources: string[];
      links: string[];
      severity: 'danger' | 'warning';
      badge?: string;
    }[];
    diagnosis: {
      label: string;
      score: number;
      change: number | string;
      direction: 'up' | 'down' | 'stable' | 'new';
    }[];
    insights: {
      sources: string[];
      text: string;
      highlights: string[];
      status?: 'positive' | 'caution';
    }[];
    recommendations: {
      type: string;
      title: string;
      sources: string[];
      from: string;
      to: string;
      linkLabel: string;
    }[];
    body?: string[];
    links?: string[];
  };
}

// --- Mock Data ---
const MOCK_HISTORY: BriefingReport[] = [
  {
    id: '1',
    type: 'anomaly',
    title: '[감지] 무검토 머지 × 취약점 패턴 감지',
    time: '11:23',
    summary: '3주 연속 동반 상승 · Bitbucket × Sparrow',
    isRead: false,
    dateGroup: '오늘',
    sources: ['Bitbucket', 'Sparrow'],
    content: {
      headline: '이상 패턴 감지 · Bitbucket × Sparrow',
      description: 'Bitbucket과 Sparrow 데이터를 교차 분석한 결과, 무검토 머지 비율 상승과 Sparrow 취약점 유입이 동반되는 패턴이 3주째 반복되고 있습니다.',
      deliveryPrediction: { text: '', highlights: [] },
      urgentItems: [],
      diagnosis: [],
      insights: [],
      recommendations: [],
      body: [
        '이 두 지표가 동시에 상승한 경우는 지난 6개월 데이터에서 배포 장애로 이어진 3건의 사례와 패턴이 일치합니다. 단순한 수치 이탈이 아니라 과거 장애 직전과 유사한 전조 신호입니다.',
        'release/v1.4.0 브랜치에서 최근 2주간 머지된 PR 중 리뷰 없이 통과된 항목을 우선 확인하세요.',
        '현 추세가 유지될 경우 다음 배포에서 Sparrow 보안 게이트 실패 가능성이 높습니다.'
      ],
      links: ['→ 무검토 머지 목록 확인', '→ Sparrow 최신 스캔 결과']
    }
  },
  {
    id: '2',
    type: 'regular',
    title: '[정기] Sprint 4 정기 브리핑',
    time: '09:00',
    summary: '배포 리스크 상승 · 긴급 조치 3건',
    isRead: false,
    dateGroup: '오늘',
    sources: ['Jira', 'Bitbucket', 'Sparrow', 'Jenkins', 'PagerDuty'],
    content: {
      headline: '배포 안정성 지표는 개선세를 보이고 있으나, 일정과 코드 품질에서 동시에 위험 신호가 감지되고 있습니다.',
      description: '현재 속도 기준 완료율이 계획 대비 12%p 낮은 47%에 그치고 있으며, DEV-204 미해결 시 납기 D+8 초과가 확실시됩니다.',
      deliveryPrediction: {
        text: '현재 속도 기준 완료율이 계획 대비 12%p 낮은 47%에 그치고 있으며, DEV-204 미해결 시 납기 D+8 초과가 확실시됩니다.',
        highlights: ['12%p', '47%', 'DEV-204', 'D+8']
      },
      urgentItems: [
        {
          badge: '배포 차단',
          text: 'release/v1.4.0 브랜치에서 <strong>Sparrow 정적 분석을 통과하지 못한 커밋 3건</strong>이 확인되었습니다. SQL Injection을 포함한 고위험 취약점이 포함되어 있으며, 현재 상태로 배포를 진행할 경우 검증되지 않은 코드가 프로덕션에 그대로 노출됩니다. <strong>릴리스 기준인 고위험 취약점 0건을 충족하지 못하고 있습니다.</strong>',
          sources: ['Sparrow', 'Jenkins'],
          links: ['→ 배포 대상 커밋 확인', '→ Sparrow 상세 보고서'],
          severity: 'danger'
        },
        {
          badge: '일정 위험',
          text: '결제 모듈 핵심 이슈(<strong>DEV-204</strong>)가 14일째 실질적인 커밋 활동 없이 정체되어 있습니다. 의존 관계에 있는 DEV-118, DEV-120이 연쇄적으로 대기 상태에 묶이면서 스프린트 완료율이 계획 대비 12%p 낮은 47%에 그치고 있습니다. <strong>현재 개발 속도를 기준으로 이번 납기를 D+8 초과할 것으로 예측됩니다.</strong>',
          sources: ['Jira', 'Bitbucket'],
          links: ['→ Jira 이슈 현황', '→ 커밋 이력 분석'],
          severity: 'danger'
        },
        {
          badge: '품질 경고',
          text: '결제 모듈의 <strong>단위 테스트 커버리지가 51%</strong>로 프로젝트 전체 평균 72%를 크게 밑돌고 있습니다. 최근 2주간 발생한 결제 관련 버그 5건 중 4건이 커버리지 공백 구간에서 발생했습니다. 이번 스프린트 <strong>무검토 머지 비율이 75%까지 상승</strong>하면서 취약점 유입의 직접적인 경로가 되고 있습니다.',
          sources: ['Sparrow', 'Bitbucket'],
          links: ['→ SonarQube 커버리지 보고서', '→ 버그 발생 구간 분석'],
          severity: 'warning'
        }
      ],
      diagnosis: [
        { label: '일정', score: 7, change: 2, direction: 'up' },
        { label: '배포', score: 8, change: 0, direction: 'stable' },
        { label: '품질', score: 7, change: 1, direction: 'up' },
        { label: '운영', score: 6, change: '신규', direction: 'new' }
      ],
      insights: [
        {
          sources: ['Jira', 'Bitbucket'],
          text: 'DEV-204 정체 이후 팀 전체 커밋 활동이 주간 기준 -40% 감소했습니다. 스프린트 완료율과의 상관계수는 0.92로, 핵심 이슈 병목이 팀 전반의 개발 속도를 끌어내리고 있는 것으로 분석됩니다.',
          highlights: ['-40%', '0.92'],
          status: 'caution'
        },
        {
          sources: ['Bitbucket', 'Sparrow'],
          text: '무검토 머지 비율이 Sprint 2 이후 매주 꾸준히 상승하면서 같은 기간 Sparrow 취약점 유입이 동반 증가했습니다. 두 지표의 상관계수는 0.87로, 코드 리뷰 프로세스 위반이 보안 품질 저하의 직접적인 원인으로 확인됩니다.',
          highlights: ['0.87'],
          status: 'caution'
        },
        {
          sources: ['Jenkins', 'PagerDuty'],
          text: '배포 빈도가 Sprint 2 대비 주당 12회에서 22회로 상승하는 동안 변경 실패율은 5%에서 2.4%로 함께 감소했습니다. 배포 자동화 파이프라인 개선의 효과가 두 지표에서 동시에 확인되고 있습니다.',
          highlights: ['12회', '22회', '5%', '2.4%'],
          status: 'positive'
        }
      ],
      recommendations: [
        {
          type: '일정 리스크 해소',
          title: '지연 중인 <strong>DEV-204 이슈를 최소 단위로 분할(Task Splitting)</strong>하여 병목을 해제하고 리소스를 재배치하세요.',
          sources: ['Jira', 'Flow'],
          from: '7.0',
          to: '4.2',
          linkLabel: '이슈 분할 가이드'
        },
        {
          type: '배포 리스크 해소',
          title: 'Sparrow 검출 항목 중 <strong>High 등급 3건에 대한 즉각적인 Hotfix</strong>를 수행하거나 해당 커밋을 제외하세요.',
          sources: ['Sparrow', 'Security'],
          from: '8.0',
          to: '4.5',
          linkLabel: 'Hotfix 가이드'
        },
        {
          type: '품질 리스크 해소',
          title: '결제 모듈 대상 <strong>\'Targeted Unit Testing\'을 실시</strong>하고 머지 조건을 커버리지 80%로 상향하세요.',
          sources: ['SonarQube', 'Quality'],
          from: '7.0',
          to: '3.8',
          linkLabel: '테스트 정책 보기'
        }
      ]
    }
  },
  {
    id: '3',
    type: 'alert',
    title: '[알림] 빌드 성공률 기준 이탈',
    time: '03.30 09:15',
    summary: '83% → 기준(90%) 미달 · Jenkins',
    isRead: true,
    dateGroup: '이번 주',
    sources: ['Jenkins'],
    content: {
      headline: '빌드 성공률 기준 이탈 감지',
      description: '빌드 성공률이 83%로 권고 기준인 90% 아래로 떨어졌습니다.',
      deliveryPrediction: { text: '', highlights: [] },
      urgentItems: [],
      diagnosis: [],
      insights: [],
      recommendations: [],
      body: [
        '3일 전 92%에서 오늘 83%로 9%p 하락했습니다. 단순 일시적 실패가 아니라 하락 추세가 3일 연속 지속되고 있습니다.',
        '이 추세가 이번 주 안에 해소되지 않으면 release/v1.4.0 배포 일정에 직접적인 영향을 줄 수 있습니다.'
      ],
      links: ['→ 최근 실패한 빌드 목록 확인']
    }
  },
  {
    id: '4',
    type: 'regular',
    title: '[정기] 배포 전 점검 브리핑',
    time: '03.28 14:00',
    summary: '배포 준비 완료 및 최종 품질 검토',
    isRead: true,
    dateGroup: '이번 주',
    sources: ['Jira', 'Bitbucket', 'Sparrow'],
    content: {
      headline: '배포 전 최종 품질 지표가 안정화 단계에 진입했습니다.',
      description: '모든 핵심 기능에 대한 테스트가 완료되었으며, 고위험 취약점이 모두 해소되었습니다. 예정된 일자에 안정적인 배포가 가능할 것으로 판단됩니다.',
      deliveryPrediction: {
        text: '예정된 일자에 안정적인 배포가 가능할 것으로 판단됩니다.',
        highlights: ['안정적인 배포']
      },
      urgentItems: [],
      diagnosis: [
        { label: '일정', score: 3.5, change: -0.5, direction: 'down' },
        { label: '배포', score: 2.8, change: -1.0, direction: 'down' },
        { label: '품질', score: 3.2, change: -1.5, direction: 'down' },
        { label: '운영', score: 3.8, change: -0.2, direction: 'down' }
      ],
      insights: [
        {
          sources: ['SonarQube', 'Jira'],
          text: '결함 수정 리드타임이 단축되면서 전체적인 품질 리스크가 크게 감소했습니다.',
          highlights: ['리드타임이 단축', '리스크가 크게 감소'],
          status: 'positive'
        }
      ],
      recommendations: [
        {
          type: '품질 유지',
          title: '현재의 <strong>코드 리뷰 프로세스를 표준화</strong>하여 품질 수준을 유지하세요.',
          sources: ['Process'],
          from: '3.2',
          to: '2.5',
          linkLabel: '표준 프로세스'
        }
      ]
    }
  }
];

// --- Components ---

const BriefingHistoryItem = ({ report, isSelected, onClick }: { report: BriefingReport, isSelected: boolean, onClick: () => void, key?: any }) => {
  const renderIcon = () => {
    if (report.type === 'regular') {
      return <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${report.isRead ? 'bg-text-muted/40' : 'bg-brand-base'}`} />;
    }
    if (report.type === 'alert') {
      return <AlertCircle size={14} className={`shrink-0 mt-1 ${report.isRead ? 'text-text-muted/40' : 'text-warning'}`} />;
    }
    if (report.type === 'anomaly') {
      return <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${report.isRead ? 'bg-text-muted/40' : 'bg-danger'}`} />;
    }
    return null;
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-border-base transition-all relative group ${isSelected ? 'bg-brand-light/30' : 'hover:bg-nested-bg/50'}`}
    >
      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-base" />}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-start gap-2 overflow-hidden">
          {renderIcon()}
          <h4 className={`text-[13px] leading-snug line-clamp-2 ${isSelected ? 'text-brand-dark font-bold' : (report.isRead ? 'text-text-muted font-medium' : 'text-text-primary font-semibold')}`}>
            {report.title}
          </h4>
        </div>
        <span className="text-[11px] text-text-muted shrink-0 ml-2 mt-0.5">{report.time}</span>
      </div>
      <p className={`text-[11px] line-clamp-2 leading-relaxed opacity-80 ${report.isRead ? 'text-text-muted' : 'text-text-secondary'}`}>
        {report.summary}
      </p>
    </button>
  );
};

const UrgentActionCard = ({ item }: { item: BriefingReport['content']['urgentItems'][0], key?: any }) => {
  const renderText = (text: string) => {
    return text.split(/<strong[^>]*>|<\/strong>/).map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="font-bold text-text-primary">{part}</strong> : part
    );
  };

  return (
    <div className="bg-white rounded-xl border border-border-base shadow-sm relative overflow-hidden group hover:border-brand-base/30 transition-all flex">
      <div className={`w-1 shrink-0 ${item.severity === 'danger' ? 'bg-danger' : 'bg-warning'}`} />
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.severity === 'danger' ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning'}`}>
            {item.badge || (item.severity === 'danger' ? '긴급 조치 필요' : '주의 관찰')}
          </span>
          <div className="flex gap-1">
            {item.sources.map(s => (
              <span key={s} className="text-[10px] text-text-muted font-bold bg-nested-bg px-1.5 py-0.5 rounded border border-border-base/50">{s}</span>
            ))}
          </div>
        </div>
        
        <div className="mb-5">
          <p className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-wrap">
            {renderText(item.text)}
          </p>
        </div>

        <div className="pt-4 border-t border-border-base/50 flex flex-wrap gap-4">
          {item.links.map((link, i) => (
            <button key={i} className="text-[11.5px] text-brand-base font-bold hover:underline flex items-center gap-1">
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ insight }: { insight: BriefingReport['content']['insights'][0], key?: any }) => {
  const renderText = (text: string, highlights: string[]) => {
    let parts = [text];
    highlights.forEach(h => {
      const newParts: string[] = [];
      parts.forEach(p => {
        const split = p.split(h);
        for (let i = 0; i < split.length; i++) {
          newParts.push(split[i]);
          if (i < split.length - 1) newParts.push(`__HL__${h}__HL__`);
        }
      });
      parts = newParts;
    });

    return parts.map((p, i) => {
      if (p.startsWith('__HL__') && p.endsWith('__HL__')) {
        const val = p.replace(/__HL__/g, '');
        return <span key={i} className="font-bold text-brand-base">{val}</span>;
      }
      return p;
    });
  };

  return (
    <div className="bg-nested-bg/40 rounded-xl border border-border-base/50 p-5 hover:bg-nested-bg/60 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          {insight.sources.map(s => (
            <span key={s} className="text-[10px] font-bold text-text-muted uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-border-base/30">{s}</span>
          ))}
        </div>
        {insight.status && (
          <span className={`text-[10px] font-bold italic ${insight.status === 'positive' ? 'text-success' : 'text-warning'}`}>
            *({insight.status === 'positive' ? '긍정' : '주의'})
          </span>
        )}
      </div>
      <p className="text-[13px] text-text-secondary leading-relaxed">
        {renderText(insight.text, insight.highlights)}
      </p>
    </div>
  );
};

const BriefingModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (data: any) => void }) => {
  const [scope, setScope] = useState('전체');
  const [period, setPeriod] = useState('현재 스프린트');
  const [channels, setChannels] = useState(['Slack']);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6 border-b border-border-base flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-text-primary">새 브리핑 생성</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3 block">분석 범위</label>
            <div className="grid grid-cols-3 gap-2">
              {['전체', '일정', '배포'].map(s => (
                <button 
                  key={s}
                  onClick={() => setScope(s)}
                  className={`py-2 rounded-lg text-[13px] font-bold border transition-all ${scope === s ? 'bg-brand-base text-white border-brand-base' : 'bg-white text-text-secondary border-border-base hover:border-brand-light'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3 block">분석 기간</label>
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-nested-bg border border-border-base rounded-lg px-4 py-2.5 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-base/20"
            >
              <option>현재 스프린트</option>
              <option>지난 7일</option>
              <option>지난 14일</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3 block">발송 채널</label>
            <div className="flex gap-4">
              {['Slack', 'Email'].map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={channels.includes(c)}
                    onChange={(e) => {
                      if (e.target.checked) setChannels([...channels, c]);
                      else setChannels(channels.filter(item => item !== c));
                    }}
                    className="w-4 h-4 rounded border-border-base text-brand-base focus:ring-brand-base"
                  />
                  <span className="text-[14px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">{c}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-nested-bg/30 border-t border-border-base flex gap-3">
          <button onClick={onClose} className="flex-1 btn-secondary py-2.5">취소</button>
          <button 
            onClick={() => {
              onCreate({ scope, period, channels });
              onClose();
            }}
            className="flex-1 btn-primary py-2.5"
          >
            브리핑 생성 시작
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const AIAgentPage = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState(MOCK_HISTORY);

  const selectedReport = useMemo(() => 
    history.find(r => r.id === selectedId) || history[0], 
  [selectedId, history]);

  const handleCreateBriefing = (data: any) => {
    const newReport: BriefingReport = {
      ...MOCK_HISTORY[0],
      id: Date.now().toString(),
      title: `${data.scope} 브리핑 (${data.period})`,
      time: '방금 전',
      isRead: false,
      dateGroup: '오늘'
    };
    setHistory([newReport, ...history]);
    setSelectedId(newReport.id);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-app-bg">
      {/* Left: History Panel */}
      <div className="w-[280px] border-r border-border-base flex flex-col bg-white shrink-0">
        <div className="p-4 border-b border-border-base">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-brand-base text-white rounded-lg py-2.5 text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-sm"
          >
            <Plus size={16} /> 새 브리핑 생성
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {(['오늘', '이번 주', '지난 달'] as const).map(group => (
            <div key={group}>
              <div className="px-4 py-2 bg-nested-bg/50 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-base/50">
                {group}
              </div>
              {history.filter(r => r.dateGroup === group).map(report => (
                <BriefingHistoryItem 
                  key={report.id} 
                  report={report} 
                  isSelected={selectedId === report.id}
                  onClick={() => {
                    setSelectedId(report.id);
                    // Mark as read
                    setHistory(prev => prev.map(r => r.id === report.id ? { ...r, isRead: true } : r));
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Briefing Body */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Meta Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border-base px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[18px] font-bold text-text-primary tracking-tight mb-1">{selectedReport.title}</h2>
            <div className="flex items-center gap-3 text-[12px] text-text-secondary font-medium">
              <span className="flex items-center gap-1 shrink-0"><Clock size={14} className="text-text-muted" /> {selectedReport.time} 생성</span>
              <span className="w-px h-3 bg-border-base shrink-0" />
              <div className="flex items-center flex-wrap gap-1.5">
                {selectedReport.sources.map(s => (
                  <span key={s} className="px-1.5 py-0.5 bg-nested-bg border border-border-base rounded text-[9px] font-bold text-text-muted uppercase tracking-wider">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-2 px-3 flex items-center gap-1.5 text-[12px]">
              <Share2 size={14} /> Slack 공유
            </button>
            <button className="btn-secondary py-2 px-3 flex items-center gap-1.5 text-[12px]">
              <Mail size={14} /> 이메일 발송
            </button>
            <button className="btn-secondary py-2 px-3 flex items-center gap-1.5 text-[12px]">
              <Download size={14} /> PDF 다운로드
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className={`${selectedReport.type === 'regular' ? 'max-w-[840px]' : 'max-w-[600px]'} mx-auto space-y-10 pb-20`}>
            
            {/* Block 1: Headline Banner */}
            <motion.div 
              key={`headline-${selectedId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-transparent p-0"
            >
              <div className="space-y-0">
                {/* Title Section */}
                <div className="pb-2">
                  <h1 className="text-[26px] font-bold text-text-primary tracking-tight">
                    {selectedReport.title}
                  </h1>
                </div>
                
                <div className="border-b border-border-base mb-3" />

                {/* Meta Info Section */}
                <div className="mb-6 flex items-center flex-wrap gap-2 text-[12px] text-text-muted">
                  <span>2026.03.31 14:00</span>
                  <span>·</span>
                  {selectedReport.type === 'regular' && (
                    <>
                      <span>Sprint #24</span>
                      <span>·</span>
                    </>
                  )}
                  {selectedReport.type !== 'regular' && (
                    <>
                      <span>{selectedReport.type === 'alert' ? '자동 감지' : 'AI 자동 감지'}</span>
                      <span>·</span>
                    </>
                  )}
                  <div className="flex items-center flex-wrap gap-1.5">
                    {selectedReport.sources.map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-nested-bg border border-border-base rounded text-[9px] font-bold text-text-muted uppercase tracking-wider">[{s}]</span>
                    ))}
                  </div>
                </div>

                <div className="border-b border-border-base mb-8" />

                {/* Judgment Paragraph */}
                <div className="mb-6">
                  <p className="text-[16px] leading-relaxed text-text-primary font-medium whitespace-pre-wrap">
                    {selectedReport.content.headline}
                  </p>
                </div>

                {/* Prediction Paragraph (Regular only) */}
                {selectedReport.type === 'regular' && (
                  <div className="mb-8">
                    <p className="text-[14px] leading-relaxed text-text-secondary whitespace-pre-wrap">
                      {selectedReport.content.description.split(/(\s+)/).map((part, i) => {
                        const isHighlight = selectedReport.content.deliveryPrediction.highlights.some(h => part.includes(h));
                        const isBadge = isHighlight && (part.includes('지연') || part.includes('중단') || part.includes('초과') || part.includes('위험'));
                        
                        if (isBadge) {
                          return (
                            <span key={i} className="bg-danger-bg text-danger text-[11px] px-1.5 py-0.5 rounded font-semibold mx-0.5">
                              {part}
                            </span>
                          );
                        }
                        
                        if (isHighlight || /DEV-\d+|D[+-]\d+|[0-9]+%p/.test(part)) {
                          return (
                            <span key={i} className="font-semibold text-text-primary">
                              {part}
                            </span>
                          );
                        }
                        
                        return <span key={i}>{part}</span>;
                      })}
                    </p>
                  </div>
                )}

                {/* Body Paragraphs (Alert/Anomaly only) */}
                {(selectedReport.type === 'alert' || selectedReport.type === 'anomaly') && selectedReport.content.body && (
                  <div className="space-y-4 mb-8">
                    {selectedReport.content.body.map((p, i) => (
                      <p key={i} className="text-[14px] leading-relaxed text-text-secondary whitespace-pre-wrap">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Links (Alert/Anomaly only) */}
                {(selectedReport.type === 'alert' || selectedReport.type === 'anomaly') && selectedReport.content.links && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border-base/50">
                    {selectedReport.content.links.map((link, i) => (
                      <button key={i} className="text-[12px] text-brand-base font-bold hover:underline flex items-center gap-1">
                        {link}
                      </button>
                    ))}
                  </div>
                )}

                {selectedReport.type === 'regular' && <div className="border-b border-border-base mb-0" />}
              </div>
            </motion.div>

            {/* Block 2: Urgent Action Items (Regular only) */}
            {selectedReport.type === 'regular' && selectedReport.content.urgentItems.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5 px-1">
                  <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    URGENT ACTIONS · AI 에이전트 분석 결과
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {selectedReport.content.urgentItems.map((item, i) => (
                    <UrgentActionCard key={i} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Block 3: Cross-Analysis & Recommendations (Regular only) */}
            {selectedReport.type === 'regular' && (
              <section>
                <div className="flex items-center justify-between mb-6 px-1">
                  <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    CROSS-ANALYSIS & RECOMMENDATIONS · 교차 분석 및 권고 조치
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border border-border-base p-6 shadow-sm space-y-8">
                  {/* Domain Scores Row */}
                  <div className="flex items-center justify-between px-4">
                    {selectedReport.content.diagnosis.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[12px] font-bold text-text-muted">{item.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[20px] font-black text-text-primary">{item.score}</span>
                          <span className="text-[11px] text-text-muted font-medium">/10</span>
                        </div>
                        <div className={`text-[10px] font-bold flex items-center gap-0.5 ${item.direction === 'up' ? 'text-danger' : item.direction === 'down' ? 'text-success' : item.direction === 'new' ? 'text-brand-base' : 'text-text-muted'}`}>
                          {item.direction === 'up' ? '↑' : item.direction === 'down' ? '↓' : item.direction === 'new' ? '↑' : '→'} 
                          {typeof item.change === 'number' ? (item.change > 0 ? `+${item.change}` : item.change === 0 ? '' : item.change) : item.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border-base/50" />

                  {/* Paired Sections */}
                  <div className="space-y-6">
                    {selectedReport.content.insights.map((insight, i) => {
                      const rec = selectedReport.content.recommendations[i];
                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                          <InsightCard insight={insight} />
                          {rec && (
                            <div className="bg-brand-light/20 rounded-xl border border-brand-base/20 p-5 hover:border-brand-base/40 transition-all flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-[11px] font-bold text-brand-base uppercase tracking-wider">{rec.type}</span>
                                  <div className="flex gap-1">
                                    {rec.sources.map(s => (
                                      <span key={s} className="text-[10px] text-text-muted font-bold bg-white px-1.5 py-0.5 rounded border border-border-base/30">{s}</span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[13px] text-text-primary leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: rec.title }} />
                              </div>
                              
                              <div className="flex items-center justify-between pt-3 border-t border-brand-base/10">
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[8px] text-text-muted font-bold uppercase">Risk</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[12px] font-black text-text-primary">{rec.from}</span>
                                      <ArrowRight size={10} className="text-text-muted" />
                                      <span className="text-[12px] font-black text-brand-base">{rec.to}</span>
                                    </div>
                                  </div>
                                </div>
                                <button className="text-[11.5px] text-brand-base font-bold hover:underline flex items-center gap-0.5">
                                  {rec.linkLabel} <ChevronRight size={12} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Block 5: Metrics Link (Regular only) */}
            {selectedReport.type === 'regular' && (
              <div className="pt-10 border-t border-border-base text-center">
                <p className="text-[14px] font-bold text-text-primary mb-4">이 브리핑의 근거 데이터를 대시보드에서 확인하세요</p>
                <div className="flex items-center justify-center gap-6">
                  <button className="text-[12px] text-text-secondary hover:text-brand-base font-medium flex items-center gap-1 transition-colors">
                    DORA · 개발 흐름 · 코드 품질 · 운영·안정성 <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BriefingModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onCreate={handleCreateBriefing}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
