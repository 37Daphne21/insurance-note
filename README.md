# 보험한장 (Insurance Note)

## 프로젝트 소개

보험한장은 보험 상품을 어렵게 나열하기보다 사용자의 일상과 실제 비용 고민에서 출발해 상담으로 연결하는 반응형 랜딩 프로젝트입니다.

펫보험을 Master Page로 제작했으며, 같은 Landing System을 활용한 암·뇌·심보험 페이지를 확장하고 있습니다. 보험별 페이지를 완성한 뒤 메인 랜딩을 정리할 예정입니다.

---

## 프로젝트 목표

- 모바일 광고 유입에 적합한 단계형 UX
- PC 환경에 맞춘 정보 탐색형 구성
- 쉽고 짧은 정보 전달과 부담 없는 상담 전환
- 메인 랜딩과 보험별 개별 랜딩의 일관된 브랜드 경험
- 공통 컴포넌트와 JavaScript를 활용한 확장 가능한 구조

---

## UX 및 디자인 방향

### Mobile

- Opening부터 Ending까지 한 단계씩 이어지는 스토리텔링 Flow
- 한 화면에 하나의 핵심 메시지
- 보험 질문보다 사용자의 상황과 고민을 먼저 묻는 방식
- 카드 기반 UI와 짧은 문장


### Desktop

- 섹션 단위의 정보 탐색
- 비용과 보장 기준을 한 화면에서 비교
- Mobile Flow를 그대로 확대하지 않고 PC에 맞게 재구성


### Visual

- 높은 가독성과 넓은 여백
- 절제된 그림자와 장식
- 핀테크 서비스처럼 쉽고 차분한 인상
- 보험별 Primary Theme를 사용하되 한 영역에서 색을 과도하게 혼합하지 않음

---

## 보험별 테마

| 보험 | Primary Theme | 구현 상태 |
| --- | --- | --- |
| 펫보험 | Yellow | Master Page 완료 |
| 암·뇌·심보험 | Purple | 1차 구현, Theme 적용 |
| 운전자보험 | Blue | 확장 예정 |
| 화재보험 | Red | 확장 예정 |
| 어린이보험 | Orange | 확장 예정 |

---

## 페이지 구성

| 파일 | 역할 | 상태 |
| --- | --- | --- |
| `index.html` | 보험한장 메인 랜딩 | 보험별 랜딩 완료 후 진행 |
| `pet.html` | 펫보험 랜딩 및 Master Page | Mobile·Desktop 1차 완료 |
| `health.html` | 암·뇌·심보험 랜딩 | Mobile·Desktop 1차 구현 |

보험별 랜딩은 다음 Flow를 공유합니다.

1. Opening
2. Reality
3. Scenario
4. Choice
5. Personal
6. Coverage Check
7. Process
8. Advisor
9. FAQ
10. Ending

---

## 공통 시스템

- `ui-*`: 재사용 가능한 UI 컴포넌트
- `la-*`: 랜딩 공통 레이아웃과 섹션
- `is-*`: JavaScript 상태 클래스
- SVG Sprite 기반 아이콘
- 공통 Landing JavaScript와 보험별 설정 분리
- CSS 변수 기반 보험별 Theme 관리

---

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript
- SVG Sprite
- Mobile First Responsive Design

---

## 현재 진행 상황

### 완료

- 프로젝트 UX 및 디자인 방향 수립
- 공통 Component System과 Landing Flow 구축
- 펫보험 Mobile·Desktop 개발 및 1차 QA
- 암·뇌·심보험 Mobile·Desktop 1차 구현 및 Purple Theme 적용
- 공통·보험별 JavaScript 구조 분리


### 진행 중

- 암·뇌·심보험 Purple Theme 시각 QA 및 콘텐츠 검수
- 카카오톡 채널과 전화 상담 연결
- 보험별 랜딩 확장
- Main Landing 제작

---

## Roadmap

1. 암·뇌·심보험 테마·콘텐츠·반응형 QA
2. 카카오톡 채널과 상담 연결
3. 운전자·화재·어린이보험 랜딩 확장
4. Main Landing 제작
5. 전체 접근성 및 Final QA
