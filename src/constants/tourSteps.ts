export interface TourStep {
  id: string;
  page: 'ai-agent' | 'dashboard' | 'ai-chat';
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  phase?: string;
  type?: 'tooltip' | 'modal';
  action?: 'select-anomaly' | 'select-regular' | 'open-new-chat' | 'select-chat-item';
  padding?: number;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'intro',
    page: 'ai-agent',
    target: 'none',
    type: 'modal',
    title: '파편화된 개발 데이터를\n하나의 인사이트로',
    description: 'Jira, Bitbucket, Sparrow, Jenkins의 데이터를 통합하고 AI가 도구 간 관계를 분석합니다. 에이전트는 단일 도구로는 보이지 않는 리스크를 먼저 찾아내어 보고합니다.',
    position: 'center',
  },
  {
    id: 'briefing-history',
    page: 'ai-agent',
    target: 'briefing-history',
    phase: 'AI 브리핑',
    title: '분석 리포트 아카이브',
    description: '에이전트가 연동된 개발 파이프라인의 시그널을 분석한 결과입니다. 설정된 **정기 브리핑**은 물론, **즉시 확인이 필요한 리스크**를 감지하면 별도 리포트를 발행합니다.',
    position: 'right',
    padding: 0,
  },
  {
    id: 'anomaly-body',
    page: 'ai-agent',
    target: 'briefing-body',
    phase: 'AI 브리핑',
    title: '도메인 간 교차 분석',
    description: "서로 다른 도구의 데이터를 대조하여 **'무검토 머지 증가'와 '보안 취약점 유입'의 상관관계** 같은 복합 리스크를 식별합니다. 단일 도구로는 발견하기 어려운 인사이트를 제공합니다.",
    position: 'left',
    action: 'select-anomaly',
  },
  {
    id: 'regular-body',
    page: 'ai-agent',
    target: 'briefing-body',
    phase: 'AI 브리핑',
    title: '원인 분석 및 권고 조치',
    description: '에이전트는 리스크 판단에 그치지 않고 **구체적인 해결 방안**을 제안합니다. 제안된 내용의 상세 근거는 **대시보드의 지표들과 유기적으로 연결**됩니다.',
    position: 'left',
    action: 'select-regular',
  },
  {
    id: 'dora-benchmark',
    page: 'dashboard',
    target: 'dora-benchmark',
    phase: '대시보드',
    title: '성과 지표 탐색',
    description: '감지된 리스크가 팀의 **배포 속도와 안정성**에 미치는 영향을 **글로벌 표준 지표(DORA)** 를 통해 객관적으로 검증합니다.',
    position: 'bottom',
  },
  {
    id: 'value-stream',
    page: 'dashboard',
    target: 'value-stream',
    phase: '대시보드',
    title: '프로세스 병목 가시화',
    description: '아이디어가 배포되기까지의 **단계별 소요 시간**을 추적합니다. 에이전트가 지목한 구간에서 **실제 지연이 발생하는지** 파악합니다.',
    position: 'bottom',
  },
  {
    id: 'quality-gate',
    page: 'dashboard',
    target: 'quality-gate',
    phase: '대시보드',
    title: '품질 기준 준수 여부',
    description: '**보안 및 테스트 커버리지** 등 파편화되어 있던 품질 기준을 한곳에서 관리하며, 에이전트가 판단한 **리스크의 심각도를 뒷받침**합니다.',
    position: 'bottom',
  },
  {
    id: 'chat-recommended',
    page: 'ai-chat',
    target: 'chat-recommended',
    phase: 'AI 대화',
    title: '데이터 기반 질의',
    description: '리포트 내용이나 지표에 대해 **추가적인 의문이 있다면 AI에게 직접 질문**하세요. 연동된 데이터를 기반으로 실시간 답변을 받을 수 있습니다.',
    position: 'right',
    action: 'open-new-chat',
  },
  {
    id: 'chat-messages',
    page: 'ai-chat',
    target: 'chat-messages',
    phase: 'AI 대화',
    title: '통합 컨텍스트 분석 및 조치',
    description: 'AI는 **연동된 전체 도구의 컨텍스트**를 이해한 상태에서 답변합니다. 분석 내용을 바탕으로 **보고서 생성이나 Slack 공유**까지 대화 안에서 처리됩니다.',
    position: 'right',
    action: 'select-chat-item',
  },
  {
    id: 'outro',
    page: 'ai-chat',
    target: 'none',
    type: 'modal',
    title: '투어 완료',
    description: '품질 포탈 가이드를 마칩니다. 이제 실시간 데이터를 기반으로 팀의 품질과 개발 효율을 관리해 보세요.',
    position: 'center',
  },
];