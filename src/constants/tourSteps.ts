export interface TourStep {
  id: string;
  page: 'ai-agent' | 'dashboard' | 'ai-chat';
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'select-anomaly' | 'select-regular' | 'open-new-chat' | 'select-chat-item';
  padding?: number;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'briefing-history',
    page: 'ai-agent',
    target: 'briefing-history',
    title: 'AI 브리핑 히스토리',
    description: '정기 브리핑, 임계값 초과 알림, 이상 패턴 감지 세 가지 유형이 자동으로 생성됩니다.',
    position: 'right',
    padding: 0,
  },
  {
    id: 'anomaly-body',
    page: 'ai-agent',
    target: 'briefing-body',
    title: '이상 패턴 감지 알림',
    description: 'Bitbucket과 Sparrow 데이터를 교차 분석하여 단일 도구에서는 발견할 수 없는 패턴을 감지합니다.',
    position: 'left',
    action: 'select-anomaly',
  },
  {
    id: 'regular-body',
    page: 'ai-agent',
    target: 'briefing-body',
    title: '정기 브리핑',
    description: '긴급 조치 항목, 교차 분석 인사이트, 권고사항이 함께 제공됩니다. 각 항목에 원본 데이터 소스 링크가 연결됩니다.',
    position: 'left',
    action: 'select-regular',
  },
  {
    id: 'dora-benchmark',
    page: 'dashboard',
    target: 'dora-benchmark',
    title: 'DORA 벤치마크',
    description: '업계 기준 Elite / High / Medium / Low 등급 척도에서 현재 팀의 위치를 확인합니다.',
    position: 'bottom',
  },
  {
    id: 'value-stream',
    page: 'dashboard',
    target: 'value-stream',
    title: '가치흐름 분석',
    description: '이슈 생성부터 배포까지 단계별 소요 시간을 시각화합니다. 병목 구간이 자동으로 표시됩니다.',
    position: 'bottom',
  },
  {
    id: 'quality-gate',
    page: 'dashboard',
    target: 'quality-gate',
    title: 'Quality Gate',
    description: '배포 가능 여부를 판정합니다. 실패 시 구체적인 원인이 함께 표시됩니다.',
    position: 'bottom',
  },
  {
    id: 'pr-cycletime',
    page: 'dashboard',
    target: 'pr-cycletime',
    title: '상세 보기',
    description: '집계 수치 뒤의 원본 데이터를 바로 확인할 수 있습니다. 어느 PR이 사이클타임을 끌어올리는지 드릴다운됩니다.',
    position: 'bottom',
  },
  {
    id: 'error-chart',
    page: 'dashboard',
    target: 'error-chart',
    title: '에러율 · 인시던트 통합',
    description: '에러율 추이와 인시던트 발생 시점이 같은 시간축에 표시됩니다. Datadog · PagerDuty 데이터를 통합 모니터링합니다.',
    position: 'top',
  },
  {
    id: 'chat-recommended',
    page: 'ai-chat',
    target: 'chat-recommended',
    title: 'AI 대화',
    description: '연동 데이터를 기반으로 자유롭게 질문할 수 있습니다. 추천 질문으로 바로 시작할 수도 있습니다.',
    position: 'right',
    action: 'open-new-chat',
  },
  {
    id: 'chat-messages',
    page: 'ai-chat',
    target: 'chat-messages',
    title: '교차 분석 응답',
    description: '질문에 대한 답변이 교차 분석 결과로 제공됩니다. 보고서 생성, Slack 발송까지 대화 안에서 처리됩니다.',
    position: 'right',
    action: 'select-chat-item',
  },
];