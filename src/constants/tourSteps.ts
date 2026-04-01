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
    title: '브리핑 아카이브',
    description: '에이전트가 주기적으로 데이터를 분석하여 생성한 리포트입니다. 정기 브리핑 외에도 이상 징후가 발견되면 리포트를 발행하고 알림을 전송합니다.',
    position: 'right',
    padding: 0,
  },
  {
    id: 'anomaly-body',
    page: 'ai-agent',
    target: 'briefing-body',
    title: '이상 패턴 감지 알림',
    description: '에이전트가 Bitbucket의 코드 변경 이력과 Sparrow의 보안 데이터를 대조하여, 수동으로 찾기 어려운 잠재적 위험 패턴을 식별한 결과입니다.',
    position: 'left',
    action: 'select-anomaly',
  },
  {
    id: 'regular-body',
    page: 'ai-agent',
    target: 'briefing-body',
    title: '정기 브리핑',
    description: '식별된 리스크의 원인 분석과 조치 방안을 제시합니다. 각 항목은 하단의 링크를 통해 대시보드의 상세 데이터로 연결됩니다.',
    position: 'left',
    action: 'select-regular',
  },
  {
    id: 'dora-benchmark',
    page: 'dashboard',
    target: 'dora-benchmark',
    title: 'DORA 벤치마크',
    description: '에이전트가 보고한 리스크의 배경이 되는 조직 성과(DORA) 지표입니다. 업계 기준치와 비교하여 현재 팀의 배포 역량을 확인합니다.',
    position: 'bottom',
  },
  {
    id: 'value-stream',
    page: 'dashboard',
    target: 'value-stream',
    title: '가치흐름 분석',
    description: '이슈 생성부터 배포까지의 흐름 중 에이전트가 지목한 병목 구간의 소요 시간을 단계별로 검증합니다.',
    position: 'bottom',
  },
  {
    id: 'quality-gate',
    page: 'dashboard',
    target: 'quality-gate',
    title: 'Quality Gate',
    description: '보안 및 테스트 커버리지 등 사전에 설정된 품질 게이트의 통과 여부와 구체적인 미달 항목을 확인합니다.',
    position: 'bottom',
  },
  {
    id: 'pr-cycletime',
    page: 'dashboard',
    target: 'pr-cycletime',
    title: '상세 보기',
    description: '요약된 수치 뒤에 숨겨진 실제 PR 목록과 상세 내역을 추적하여 에이전트 분석 결과의 근거를 직접 확인합니다.',
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
    description: '리포트 내용이나 대시보드 지표에 대해 추가적인 의문이 있을 경우, AI에게 직접 질문하여 연동된 데이터를 기반으로 답변을 얻습니다.',
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