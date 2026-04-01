
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Plus, 
  MessageSquare, 
  ArrowUp, 
  ChevronRight, 
  Search, 
  Clock,
  ShieldCheck,
  Settings,
  ArrowLeft
} from 'lucide-react';

// --- Types ---

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'report' | 'analysis';
  data?: any;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  summary: string;
  time: string;
  dateGroup: '오늘' | '이번 주' | '지난 달';
  messages: ChatMessage[];
}

// --- Mock Data ---

const MOCK_CHAT_HISTORY: ChatHistoryItem[] = [
  {
    id: '1',
    title: '지난 3개 스프린트 코드 품질이 왜 계속 나빠지고 있어?',
    summary: 'Bitbucket × Sparrow 교차 분석 결과입니다.',
    time: '14:32',
    dateGroup: '오늘',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '지난 3개 스프린트 동안 코드 품질이 왜 계속 나빠지고 있어?',
        timestamp: '14:31'
      },
      {
        id: 'm2',
        role: 'assistant',
        content: 'Bitbucket × Sparrow × Jira 교차 분석 결과입니다.\n\n! 스프린트별 취약점 추이: S2(2건) → S3(5건) → S4(8건)로 급증\n! 티켓 없는 커밋 비율: S2(12%) → S4(38%)로 동반 상승\n\n분석 결과, 리뷰 없는 머지가 S2부터 증가하기 시작했고, 같은 시점부터 취약점 유입이 가속된 것으로 확인되었습니다.',
        timestamp: '14:32',
        type: 'analysis'
      }
    ]
  },
  {
    id: '2',
    title: '이번 스프린트 결과 보고서 작성해줘',
    summary: '스프린트 4 결과를 기반으로 보고서를 생성했습니다.',
    time: '09:15',
    dateGroup: '오늘',
    messages: [
      {
        id: 'm3',
        role: 'user',
        content: '이번 스프린트 결과 보고서 작성해줘',
        timestamp: '09:14'
      },
      {
        id: 'm4',
        role: 'assistant',
        content: '스프린트 4 결과를 기반으로 보고서를 생성했습니다.',
        timestamp: '09:15',
        type: 'report',
        data: {
          title: 'ERP 고도화 · 스프린트 4 결과 보고서',
          completion: '47% (계획 대비 -12%p)',
          risk: '7.8 / 10 (위험)',
          findings: '프로세스 위반 및 취약점 유입',
          recommendation: '리뷰 정책 강화 및 기술 부채 해소'
        }
      }
    ]
  },
  {
    id: '3',
    title: 'DEV-204 지연 원인 분석해줘',
    summary: 'DEV-204 이슈의 정체 원인을 분석한 결과입니다.',
    time: '03.29',
    dateGroup: '이번 주',
    messages: []
  },
  {
    id: '4',
    title: '배포 리스크 줄이려면 뭘 해야 해?',
    summary: '현재 감지된 주요 배포 리스크와 대응 방안입니다.',
    time: '03.28',
    dateGroup: '이번 주',
    messages: []
  },
  {
    id: '5',
    title: '다음 스프린트 목표 설정 도와줘',
    summary: '과거 데이터를 기반으로 제안하는 다음 스프린트 목표입니다.',
    time: '03.27',
    dateGroup: '이번 주',
    messages: []
  }
];

const RECOMMENDED_QUESTIONS = [
  '개발 속도가 왜 떨어졌지?',
  '배포 리스크 줄이려면?',
  '이번 스프린트 결과 보고서',
  '다음 스프린트 목표는?'
];

// --- Components ---

export const AIChatHistoryPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(MOCK_CHAT_HISTORY[0].id);
  const [isNewChat, setIsNewChat] = useState(false);

  useEffect(() => {
    const handleStartNewChat = () => {
      setIsNewChat(true);
      setSelectedChatId(null);
    };
    window.addEventListener('start-new-chat', handleStartNewChat);
    return () => window.removeEventListener('start-new-chat', handleStartNewChat);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      setIsNewChat(false);
      setSelectedChatId(id);
    };
    window.addEventListener('tour-select-chat', handler);
    return () => window.removeEventListener('tour-select-chat', handler);
  }, []);

  const selectedChat = MOCK_CHAT_HISTORY.find(c => c.id === selectedChatId);

  const handleNewChat = () => {
    setIsNewChat(true);
    setSelectedChatId(null);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setIsNewChat(false);
  };

  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Left: Chat List Panel (280px) */}
      <div className="w-[280px] border-r border-border-base flex flex-col shrink-0 bg-card-bg">
        <div className="p-4 border-b border-border-base">
          <button 
            onClick={handleNewChat}
            className="w-full bg-brand-base hover:bg-brand-dark text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus size={18} />
            <span className="text-[13px]">새 대화 시작</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* New Chat Item (if active) */}
          {isNewChat && (
            <div className="px-4 py-3 text-[10px] font-bold text-brand-base uppercase tracking-wider bg-brand-light/20 border-b border-brand-light/30">
              진행 중인 대화
            </div>
          )}
          {isNewChat && (
            <div className="w-full text-left p-4 border-b border-border-base bg-brand-light/30 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-base" />
              <div className="flex items-start justify-between mb-1 gap-2">
                <h4 className="text-[13px] leading-snug line-clamp-1 flex-1 text-brand-dark font-bold">
                  새 대화
                </h4>
                <span className="text-[10px] text-brand-base shrink-0 mt-0.5">방금 전</span>
              </div>
              <p className="text-[11px] text-brand-base/70 line-clamp-1">
                질문을 입력하세요...
              </p>
            </div>
          )}

          {/* Date Groups */}
          {(['오늘', '이번 주'] as const).map(group => (
            <div key={group}>
              <div className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider bg-nested-bg/30 border-b border-border-base/50">
                {group}
              </div>
              {MOCK_CHAT_HISTORY.filter(c => c.dateGroup === group).map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`w-full text-left p-4 border-b border-border-base transition-all relative group ${selectedChatId === chat.id ? 'bg-brand-light/30' : 'hover:bg-nested-bg/50'}`}
                >
                  {selectedChatId === chat.id && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-base" />}
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <h4 className={`text-[13px] leading-snug line-clamp-1 flex-1 ${selectedChatId === chat.id ? 'text-brand-dark font-bold' : 'text-text-primary font-semibold'}`}>
                      {chat.title}
                    </h4>
                    <span className="text-[10px] text-text-muted shrink-0 mt-0.5">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary line-clamp-1 opacity-80">
                    {chat.summary}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Chat Body (flex-1) */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
        {isNewChat ? (
          <NewChatState onQuestionClick={(q) => {
            setIsNewChat(false);
            // In a real app, we'd create a new chat here
            setSelectedChatId(MOCK_CHAT_HISTORY[0].id);
          }} />
        ) : selectedChat ? (
          <ChatContent chat={selectedChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
            대화를 선택하거나 새 대화를 시작하세요.
          </div>
        )}
      </div>
    </div>
  );
};

const NewChatState = ({ onQuestionClick }: { onQuestionClick: (q: string) => void }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-[760px] mx-auto w-full">
      <div className="w-16 h-16 bg-brand-light border border-brand-light rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <Sparkles size={32} className="text-brand-base" />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Quality AI Assistant</h2>
      <p className="text-text-secondary text-center mb-12">연동 데이터에 대해 무엇이든 질문하세요</p>

      <div className="w-full">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-1">추천 질문</h3>
        <div data-tour="chat-recommended" className="grid grid-cols-2 gap-3">
          {RECOMMENDED_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => onQuestionClick(q)}
              className="text-left p-4 rounded-xl border border-border-base hover:border-brand-base hover:bg-brand-light/20 transition-all group"
            >
              <div className="text-[13px] font-semibold text-text-primary group-hover:text-brand-base mb-1">{q}</div>
              <div className="text-[11px] text-text-muted">분석 결과 확인하기</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-[760px] mx-auto">
          <div className="flex items-center gap-3 bg-nested-bg border border-border-base rounded-2xl p-3 pl-5 shadow-sm focus-within:border-brand-base focus-within:ring-1 focus-within:ring-brand-base/20 transition-all">
            <input 
              type="text" 
              placeholder="데이터에 대해 무엇이든 물어보세요..." 
              className="bg-transparent border-none outline-none text-[14px] text-text-primary placeholder:text-text-muted flex-1"
            />
            <button className="w-9 h-9 bg-brand-base hover:bg-brand-dark rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <ArrowUp size={18} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatContent = ({ chat }: { chat: ChatHistoryItem }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-[52px] px-6 border-b border-border-base flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-[14px] font-bold text-text-primary truncate max-w-[400px]">{chat.title}</h3>
          <span className="text-[11px] text-text-muted">{chat.time} 생성</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-muted hover:text-text-primary hover:bg-nested-bg rounded-lg transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div data-tour="chat-messages" className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="max-w-[760px] mx-auto space-y-6">
          {chat.messages.length > 0 ? (
            chat.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-3'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-brand-light border border-brand-light rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <Sparkles size={16} className="text-brand-base" />
                  </div>
                )}
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-base text-white rounded-tr-none' 
                      : 'bg-nested-bg border border-border-base text-text-primary rounded-tl-none'
                  }`}>
                    {msg.type === 'analysis' ? (
                      <div className="space-y-3">
                        <p><strong className="font-bold">Bitbucket × Sparrow × Jira</strong> 교차 분석 결과입니다.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-baseline gap-2 text-[12px]">
                            <span className="text-warning font-bold">!</span>
                            <span>스프린트별 취약점 추이: S2(2건) → S3(5건) → S4(8건)로 급증</span>
                          </div>
                          <div className="flex items-baseline gap-2 text-[12px]">
                            <span className="text-warning font-bold">!</span>
                            <span>티켓 없는 커밋 비율: S2(12%) → S4(38%)로 동반 상승</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-text-secondary">
                          분석 결과, <span className="text-danger font-semibold">리뷰 없는 머지가 S2부터 증가하기 시작했고, 같은 시점부터 취약점 유입이 가속</span>된 것으로 확인되었습니다.
                        </p>
                        <div className="bg-brand-light border-l-4 border-brand-base p-3 rounded-r-xl">
                          <p className="text-[12px] font-bold text-brand-dark">패턴 요약: 프로세스 위반(무검토 머지)이 보안 취약점 유입의 핵심 경로로 확인됩니다.</p>
                        </div>
                      </div>
                    ) : msg.type === 'report' ? (
                      <div className="space-y-4">
                        <p>{msg.content}</p>
                        <div className="bg-white border border-border-base rounded-xl overflow-hidden shadow-sm">
                          <div className="bg-nested-bg px-4 py-2.5 border-b border-border-base flex items-center justify-between">
                            <div className="text-[12px] font-bold text-text-primary flex items-center gap-2">
                              <ShieldCheck size={16} className="text-brand-base" />
                              {msg.data.title}
                            </div>
                            <span className="text-[10px] font-bold bg-success-light text-success px-2 py-0.5 rounded-full uppercase">생성 완료</span>
                          </div>
                          <div className="p-4 space-y-2.5">
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="text-text-muted">완료율</span>
                              <span className="font-bold text-warning">{msg.data.completion}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="text-text-muted">리스크 스코어</span>
                              <span className="font-bold text-danger">{msg.data.risk}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="text-text-muted">주요 발견</span>
                              <span className="font-bold text-text-primary">{msg.data.findings}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="text-text-muted">다음 스프린트 권고</span>
                              <span className="font-bold text-brand-base">{msg.data.recommendation}</span>
                            </div>
                          </div>
                          <div className="p-3 border-t border-border-base flex gap-2 bg-nested-bg/30">
                            <button className="flex-1 bg-brand-base hover:bg-brand-dark text-white text-[11px] font-bold py-2 rounded-lg transition-colors">다운로드</button>
                            <button className="flex-1 bg-white border border-border-base text-text-primary hover:bg-nested-bg text-[11px] font-bold py-2 rounded-lg transition-colors">Slack 발송</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <MessageSquare size={48} className="text-text-muted mb-4" />
              <p className="text-sm">이 대화에 아직 메시지가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border-base bg-white">
        <div className="max-w-[760px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {RECOMMENDED_QUESTIONS.map(pill => (
              <button key={pill} className="bg-nested-bg border border-border-base rounded-full px-3.5 py-1.5 text-[11.5px] text-text-secondary hover:border-brand-base hover:text-brand-base hover:bg-brand-light/20 transition-all">
                {pill}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-nested-bg border border-border-base rounded-2xl p-3 pl-5 shadow-sm focus-within:border-brand-base focus-within:ring-1 focus-within:ring-brand-base/20 transition-all">
            <input 
              type="text" 
              placeholder="데이터에 대해 무엇이든 물어보세요..." 
              className="bg-transparent border-none outline-none text-[14px] text-text-primary placeholder:text-text-muted flex-1"
            />
            <button className="w-9 h-9 bg-brand-base hover:bg-brand-dark rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <ArrowUp size={18} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
