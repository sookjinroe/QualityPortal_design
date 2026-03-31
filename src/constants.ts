import { DoraBenchmark, ValueStreamSegment, Incident, PRDetail } from './types';

export const DORA_BENCHMARKS: DoraBenchmark[] = [
  {
    label: '배포 빈도',
    value: '22회/주',
    unit: '회/주',
    level: 'High',
    score: 75,
    description: '프로덕션 환경으로 코드가 배포되는 빈도입니다. 높은 빈도는 작은 단위의 변경과 빠른 피드백 루프를 의미합니다.'
  },
  {
    label: '변경 리드타임',
    value: '10.2일',
    unit: '일',
    level: 'Medium',
    score: 45,
    description: '커밋부터 프로덕션 배포까지 걸리는 시간입니다. 이 지표가 짧을수록 시장 변화에 민첩하게 대응할 수 있습니다.'
  },
  {
    label: '변경 실패율',
    value: '2.4%',
    unit: '%',
    level: 'Elite',
    score: 92,
    description: '배포 후 장애가 발생하거나 롤백이 필요한 비율입니다. 품질과 안정성의 핵심 지표입니다.'
  },
  {
    label: '복구 시간',
    value: '8.5h',
    unit: 'h',
    level: 'High',
    score: 80,
    description: '서비스 장애 발생 시 정상 상태로 복구하는 데 걸리는 시간입니다. 운영 복원력을 나타냅니다.'
  }
];

export const VALUE_STREAM_DATA: ValueStreamSegment[] = [
  { label: '이슈생성', duration: 48, durationLabel: '2d', color: '#E5E7EB' },
  { label: '개발', duration: 72, durationLabel: '3d', color: '#D1D5DB' },
  { label: 'PR생성', duration: 24, durationLabel: '1d', color: '#9CA3AF' },
  { label: '리뷰', duration: 40, durationLabel: '40h', color: '#EF4444', isBottleneck: true },
  { label: '머지', duration: 4, durationLabel: '4h', color: '#6B7280' },
  { label: '배포', duration: 2, durationLabel: '2h', color: '#374151' }
];

export const INCIDENTS_DATA: Incident[] = [
  {
    id: 'INC-2024-001',
    occurredAt: '2024-03-28 14:20',
    detectedAt: '2024-03-28 14:25',
    resolvedAt: '2024-03-28 14:45',
    duration: '25m',
    cause: '결제 모듈 메모리 누수',
    severity: 'Critical'
  },
  {
    id: 'INC-2024-002',
    occurredAt: '2024-03-29 09:10',
    detectedAt: '2024-03-29 09:12',
    resolvedAt: '2024-03-29 09:30',
    duration: '20m',
    cause: 'DB 커넥션 풀 고갈',
    severity: 'Major'
  }
];

export const DORA_TREND_DATA = [
  { name: 'W1', deployment: 12, leadTime: 15, failureRate: 5, recoveryTime: 12 },
  { name: 'W2', deployment: 18, leadTime: 12, failureRate: 3, recoveryTime: 10 },
  { name: 'W3', deployment: 15, leadTime: 14, failureRate: 4, recoveryTime: 11 },
  { name: 'W4', deployment: 22, leadTime: 10, failureRate: 2, recoveryTime: 8 },
];

export const ERROR_RATE_TREND = [
  { time: '00:00', value: 0.1, incident: false },
  { time: '04:00', value: 0.15, incident: false },
  { time: '08:00', value: 0.2, incident: false },
  { time: '12:00', value: 0.8, incident: true },
  { time: '16:00', value: 0.3, incident: false },
  { time: '20:00', value: 0.1, incident: false },
  { time: '23:59', value: 0.12, incident: false },
];

export const PR_DETAILS_DATA: PRDetail[] = [
  { id: 'DEV-204', title: '결제 모듈 고도화 (Refactoring)', author: '김철수', cycleTime: '72h', reviewStatus: 'unreviewed', link: 'https://bitbucket.org/erp/pull-requests/204' },
  { id: 'DEV-198', title: 'API 엔드포인트 보안 강화', author: '이영희', cycleTime: '48h', reviewStatus: 'reviewed', link: 'https://bitbucket.org/erp/pull-requests/198' },
  { id: 'DEV-201', title: 'UI 컴포넌트 라이브러리 업데이트', author: '박지민', cycleTime: '18h', reviewStatus: 'reviewed', link: 'https://bitbucket.org/erp/pull-requests/201' },
  { id: 'DEV-196', title: '사용자 인증 로직 수정', author: '김철수', cycleTime: '12h', reviewStatus: 'unreviewed', link: 'https://bitbucket.org/erp/pull-requests/196' },
  { id: 'DEV-192', title: '데이터베이스 마이그레이션 스크립트', author: '최민수', cycleTime: '54h', reviewStatus: 'reviewed', link: 'https://bitbucket.org/erp/pull-requests/192' },
  { id: 'DEV-189', title: '로그 분석 시스템 연동', author: '정다은', cycleTime: '36h', reviewStatus: 'reviewed', link: 'https://bitbucket.org/erp/pull-requests/189' },
  { id: 'DEV-185', title: '프론트엔드 성능 최적화', author: '이영희', cycleTime: '24h', reviewStatus: 'unreviewed', link: 'https://bitbucket.org/erp/pull-requests/185' },
];

export const REVIEW_WAIT_DETAILS: PRDetail[] = [
  { id: 'DEV-205', title: '검색 필터 UI 개선', author: '박지민', cycleTime: '42h', reviewStatus: 'unreviewed', link: '#' },
  { id: 'DEV-203', title: '어드민 대시보드 권한 처리', author: '이영희', cycleTime: '28h', reviewStatus: 'unreviewed', link: '#' },
  { id: 'DEV-202', title: '모바일 푸시 알림 연동', author: '김철수', cycleTime: '15h', reviewStatus: 'unreviewed', link: '#' },
];

export const ISSUE_DWELL_DETAILS: PRDetail[] = [
  { id: 'JIRA-442', title: '결제 실패 시 재시도 로직 추가', author: '최민수', cycleTime: '8d', reviewStatus: 'reviewed', link: '#' },
  { id: 'JIRA-438', title: '회원가입 폼 유효성 검사 강화', author: '정다은', cycleTime: '5d', reviewStatus: 'reviewed', link: '#' },
  { id: 'JIRA-435', title: '상품 상세 페이지 로딩 최적화', author: '박지민', cycleTime: '4d', reviewStatus: 'reviewed', link: '#' },
];

export const SPRINT_COMPLETION_DETAILS: PRDetail[] = [
  { id: 'STORY-88', title: '장바구니 담기 기능 개선', author: '김철수', cycleTime: 'Done', reviewStatus: 'reviewed', link: '#' },
  { id: 'STORY-89', title: '주문 내역 조회 API 개발', author: '이영희', cycleTime: 'Done', reviewStatus: 'reviewed', link: '#' },
  { id: 'STORY-90', title: '리뷰 작성 기능 추가', author: '박지민', cycleTime: 'In Progress', reviewStatus: 'unreviewed', link: '#' },
];

export const UNLINKED_COMMIT_DETAILS: PRDetail[] = [
  { id: 'COMMIT-a1b2', title: 'fix: minor bug in auth logic', author: 'Kim', cycleTime: '2024-03-28', reviewStatus: 'unreviewed', link: '#' },
  { id: 'COMMIT-c3d4', title: 'chore: update dependencies', author: 'Lee', cycleTime: '2024-03-29', reviewStatus: 'unreviewed', link: '#' },
  { id: 'COMMIT-e5f6', title: 'feat: add logging to payment', author: 'Park', cycleTime: '2024-03-30', reviewStatus: 'unreviewed', link: '#' },
];

export const UNREVIEWED_MERGE_DETAILS: PRDetail[] = [
  { id: 'PR-1042', title: 'Hotfix: emergency patch for login', author: 'Jung', cycleTime: '2h', reviewStatus: 'unreviewed', link: '#' },
  { id: 'PR-1038', title: 'Docs: update readme with setup guide', author: 'Choi', cycleTime: '1h', reviewStatus: 'unreviewed', link: '#' },
];

export const VULNERABILITY_DETAILS: PRDetail[] = [
  { id: 'CVE-2024-1234', title: 'SQL Injection in Auth Module', author: 'High', cycleTime: 'Open', reviewStatus: 'unreviewed', link: '#' },
  { id: 'CVE-2024-5678', title: 'XSS in User Profile Page', author: 'High', cycleTime: 'In Progress', reviewStatus: 'reviewed', link: '#' },
  { id: 'CVE-2024-9012', title: 'Insecure Direct Object Reference', author: 'Medium', cycleTime: 'Open', reviewStatus: 'unreviewed', link: '#' },
];

export const COVERAGE_DETAILS: PRDetail[] = [
  { id: 'API-Module', title: 'PaymentController.ts', author: '65%', cycleTime: 'Target: 80%', reviewStatus: 'unreviewed', link: '#' },
  { id: 'Core-Module', title: 'AuthService.ts', author: '85%', cycleTime: 'Target: 80%', reviewStatus: 'reviewed', link: '#' },
  { id: 'UI-Module', title: 'Dashboard.tsx', author: '72%', cycleTime: 'Target: 80%', reviewStatus: 'unreviewed', link: '#' },
];

export const DORA_DEPLOYMENT_DETAILS: PRDetail[] = [
  { id: 'DEP-102', title: 'Production Deployment #102', author: 'System', cycleTime: '2024-03-30', reviewStatus: 'reviewed', link: '#' },
  { id: 'DEP-101', title: 'Production Deployment #101', author: 'System', cycleTime: '2024-03-28', reviewStatus: 'reviewed', link: '#' },
  { id: 'DEP-100', title: 'Production Deployment #100', author: 'System', cycleTime: '2024-03-25', reviewStatus: 'reviewed', link: '#' },
];
