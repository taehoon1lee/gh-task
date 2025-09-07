# Product Requirements Document (PRD)
## GitHub Task Manager (gh-task)

### 1. 제품 개요

#### 1.1 제품명
GitHub Task Manager (gh-task)

#### 1.2 제품 설명
로컬 파일 시스템 대신 GitHub Issues를 백엔드로 사용하는 CLI 기반 작업 관리 도구. task-master와 유사한 인터페이스를 제공하면서 GitHub의 협업 기능을 활용.

#### 1.3 목표
- GitHub Issues를 활용한 분산형 작업 관리
- CLI를 통한 빠른 작업 생성/관리
- 팀 협업 지원
- 오프라인 작업 지원 (캐싱)

### 2. 핵심 기능

#### 2.1 작업 관리
- **작업 생성**: CLI에서 직접 GitHub Issue 생성
- **작업 조회**: `gh` CLI를 활용한 이슈 목록 조회
- **작업 수정**: 제목, 설명, 라벨, 마일스톤 수정
- **작업 완료**: Issue 종료 처리
- **작업 삭제**: Issue 삭제 (권한 필요)
- **Subtask 관리**: GitHub Issue의 task list 기능을 활용한 하위 작업 관리
- **일괄 작업**: 여러 이슈 동시 처리 (상태 변경, 라벨 추가 등)

#### 2.2 고급 기능
- **라벨 관리**: 우선순위, 카테고리, 상태 라벨 자동 관리
- **마일스톤 연동**: GitHub 마일스톤과 연동
- **할당자 관리**: 작업 할당 및 재할당
- **검색 및 필터링**: 다양한 조건으로 작업 검색
- **템플릿**: 자주 사용하는 작업 템플릿 지원
- **Next Task 분석**: AI 기반 다음 작업 추천 및 우선순위 제안
- **PRD 기반 Task 생성**: PRD 문서 분석을 통한 자동 작업 분해 및 생성
- **Task Research**: 작업 수행을 위한 자동 리서치 및 참고 자료 수집
- **의존성 관리**: Issue 간 의존성 추적 및 시각화
- **복잡도 분석**: AI 기반 작업 복잡도 평가 및 자동 라벨링
- **태그/프로젝트 관리**: GitHub Projects와 연동한 멀티 컨텍스트 작업 관리

#### 2.3 동기화 및 캐싱
- **오프라인 모드**: 로컬 캐시를 통한 오프라인 작업
- **자동 동기화**: 온라인 복귀 시 자동 동기화
- **충돌 해결**: 동기화 충돌 자동/수동 해결

### 3. 기술 스택

#### 3.1 핵심 의존성
- **GitHub CLI (`gh`)**: GitHub API 상호작용
- **Programming Language**: Go 또는 Rust (성능 고려)
- **Database**: SQLite (로컬 캐싱)
- **Configuration**: YAML/TOML
- **AI Integration**: OpenAI API 또는 로컬 LLM (Ollama)
- **NLP Library**: 텍스트 분석 및 처리

#### 3.2 API
- GitHub REST API v3
- GitHub GraphQL API v4 (복잡한 쿼리용)

### 4. 명령어 인터페이스

```bash
# 초기 설정
gh-task init --repo owner/repo

# 작업 생성
gh-task add "작업 제목" [-d "설명"] [-l label1,label2] [-m milestone]

# 작업 목록
gh-task list [--filter status:open] [--assignee @me]
gh-task ls  # 단축 명령

# 작업 상세 조회
gh-task show <issue-number>

# 작업 수정
gh-task edit <issue-number> [-t "새 제목"] [-d "새 설명"]

# 작업 완료
gh-task done <issue-number>
gh-task close <issue-number>

# 작업 재오픈
gh-task reopen <issue-number>

# 라벨 관리
gh-task label add <issue-number> label1,label2
gh-task label remove <issue-number> label1

# 할당
gh-task assign <issue-number> @username

# 검색
gh-task search "검색어" [--in title,body,comments]

# 동기화
gh-task sync  # 수동 동기화
gh-task status  # 동기화 상태 확인

# 템플릿
gh-task template create <name>
gh-task template use <name> "작업 제목"

# 지능형 작업 분석
gh-task next  # 다음 수행할 작업 추천
gh-task next --analyze  # 현재 작업 컨텍스트 기반 상세 분석

# PRD 기반 작업 생성
gh-task generate --from-prd <prd-file>  # PRD에서 작업 자동 생성
gh-task generate --from-issue <issue-number>  # 이슈 설명에서 하위 작업 생성

# 작업 리서치
gh-task research <issue-number>  # 작업 수행을 위한 리서치 수행
gh-task research --save <issue-number>  # 리서치 결과를 이슈 코멘트에 저장

# Subtask 관리
gh-task expand <issue-number> [--num=5]  # 이슈를 subtask로 확장
gh-task expand --all  # 모든 pending 이슈 확장
gh-task clear-subtasks <issue-number>  # subtask 제거

# 의존성 관리
gh-task add-dependency --id=<issue> --depends-on=<issue>
gh-task remove-dependency --id=<issue> --depends-on=<issue>
gh-task validate-dependencies  # 의존성 검증
gh-task dependency-graph  # 의존성 그래프 시각화

# 복잡도 분석
gh-task analyze-complexity [--threshold=6]  # 모든 작업 복잡도 분석
gh-task complexity-report  # 복잡도 리포트 보기

# 일괄 작업
gh-task batch set-status --ids=1,2,3 --status=done
gh-task batch add-label --ids=4,5,6 --labels=urgent,bug
gh-task batch assign --ids=7,8,9 --assignee=@username

# 태그/프로젝트 관리
gh-task project list  # GitHub Projects 목록
gh-task project use <project-name>  # 프로젝트 전환
gh-task project create <name> --description="Sprint 1"
gh-task move --from=<issue> --to-project=<project>
```

### 5. 설정 파일

```yaml
# .gh-task/config.yml
repository: owner/repo
default_labels:
  - todo
  - task
auto_sync: true
sync_interval: 5m
cache_dir: ~/.gh-task/cache
templates_dir: ~/.gh-task/templates
offline_mode: false
default_assignee: "@me"
ai:
  provider: openai  # or ollama
  model: gpt-4
  api_key_env: OPENAI_API_KEY
  research_sources:
    - github
    - stackoverflow
    - docs
  next_task:
    max_recommendations: 5
    consider_dependencies: true
    consider_deadlines: true
```

### 6. AI 기능 상세

#### 6.1 Next Task 분석
- **컨텍스트 수집**: 현재 열린 이슈, 최근 완료 작업, 마일스톤 진행도 분석
- **우선순위 계산**: 종속성, 마감일, 비즈니스 가치 기반 점수 산출
- **추천 알고리즘**: 
  - 블로킹 이슈 우선 처리
  - 마감일 임박 작업 우선
  - 연관 작업 그룹핑
- **출력 형식**: 추천 이유와 함께 상위 5개 작업 제시

#### 6.2 PRD 기반 Task 생성
- **PRD 파싱**: Markdown/YAML 형식 PRD 문서 구조 분석
- **작업 분해 규칙**:
  - Epic → Story → Task 계층 구조
  - 각 기능별 구현, 테스트, 문서화 작업 자동 생성
  - 종속성 자동 매핑
- **라벨 자동 할당**: 기능 영역별 자동 카테고리화
- **예상 시간 추정**: 유사 과거 작업 기반 추정

#### 6.3 Task Research 기능
- **정보 수집 소스**:
  - 관련 GitHub 이슈 및 PR
  - Stack Overflow
  - 공식 문서
  - 기술 블로그
- **분석 내용**:
  - 유사 문제 해결 사례
  - 베스트 프랙티스
  - 잠재적 이슈 및 해결책
- **결과 정리**: 구조화된 마크다운 형식으로 정리
- **자동 코멘트**: 리서치 결과를 이슈 코멘트로 자동 추가

#### 6.4 Subtask 및 계층 구조
- **GitHub Task Lists 활용**: Issue body에 체크박스 형태로 subtask 관리
- **자동 확장**: AI를 통한 작업 분해 및 subtask 생성
- **진행률 추적**: 완료된 subtask 비율 자동 계산
- **계층적 템플릿**: Epic → Story → Task → Subtask 구조

#### 6.5 의존성 관리
- **Issue 링크**: GitHub의 Issue linking 기능 활용
- **블로킹 추적**: "Blocked by #123" 형식으로 명시
- **의존성 그래프**: Mermaid 다이어그램으로 시각화
- **자동 검증**: 순환 의존성 및 누락된 의존성 감지

#### 6.6 복잡도 분석 및 예측
- **AI 기반 평가**: 작업 설명과 코드베이스 분석
- **점수 산정**: 1-10 스케일 복잡도 점수
- **시간 예측**: 유사 과거 작업 데이터 기반 예상 시간
- **자동 라벨링**: complexity:high/medium/low 라벨 자동 할당
- **팀 할당 추천**: 복잡도와 개발자 전문성 매칭

#### 6.7 일괄 작업 및 자동화
- **배치 처리**: 여러 이슈 동시 처리로 성능 향상
- **템플릿 기반 생성**: 반복적인 작업 패턴 자동화
- **스크립트 통합**: 사용자 정의 스크립트 실행
- **웹훅 연동**: GitHub 이벤트 기반 자동 작업

#### 6.8 태그 및 프로젝트 관리
- **GitHub Projects 통합**: 칸반 보드 형태의 시각적 관리
- **멀티 컨텍스트**: 브랜치/기능별 프로젝트 분리
- **태그 자동 동기화**: Git 브랜치와 프로젝트 연동
- **교차 프로젝트 검색**: 여러 프로젝트 통합 검색

### 7. 데이터 모델

#### 7.1 GitHub Issue 데이터 매핑
GitHub Issues가 기본적으로 제공하는 데이터:
- **Issue 기본 정보**: 번호, 제목, 본문, 상태, 생성/수정 시간
- **라벨**: 우선순위, 카테고리, 복잡도 등을 라벨로 관리
- **할당자**: GitHub의 assignees 기능 활용
- **마일스톤**: GitHub 마일스톤 기능 활용
- **코멘트**: 리서치 결과, 진행 상황 등을 코멘트로 저장
- **프로젝트**: GitHub Projects로 태그/컨텍스트 관리
- **Subtasks**: Issue body의 task list (- [ ] 형식) 활용
- **의존성**: Issue 본문에 "Depends on #123" 형식으로 저장

#### 7.2 로컬 캐시 스키마 (오프라인 지원용)
```sql
-- GitHub Issue 데이터 캐싱
CREATE TABLE cached_issues (
    id INTEGER PRIMARY KEY,
    github_id INTEGER UNIQUE,
    number INTEGER,
    title TEXT,
    body TEXT,
    state TEXT,
    labels TEXT,  -- JSON 형식
    assignees TEXT,  -- JSON 형식
    milestone TEXT,
    project_ids TEXT,  -- JSON 형식
    created_at DATETIME,
    updated_at DATETIME,
    synced_at DATETIME,
    local_changes BOOLEAN
);

-- 오프라인 작업 큐
CREATE TABLE sync_queue (
    id INTEGER PRIMARY KEY,
    action TEXT,  -- create, update, close, reopen
    issue_number INTEGER,
    payload TEXT,  -- JSON 형식
    created_at DATETIME,
    retry_count INTEGER,
    error_message TEXT
);

-- AI 분석 결과 캐싱 (API 호출 최소화)
CREATE TABLE ai_cache (
    id INTEGER PRIMARY KEY,
    issue_number INTEGER,
    analysis_type TEXT,  -- complexity, next_task, research
    result TEXT,  -- JSON 형식
    created_at DATETIME,
    expires_at DATETIME
);

-- 사용자 설정 및 템플릿
CREATE TABLE templates (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    content TEXT,
    labels TEXT,
    created_at DATETIME
);
```

#### 7.3 데이터 저장 전략
- **GitHub 저장 데이터**:
  - 모든 영구 데이터는 GitHub Issues/Projects에 저장
  - 라벨을 통한 메타데이터 관리 (complexity:high, priority:1, subtask, etc.)
  - Issue 본문에 구조화된 데이터 포함 (YAML front matter)
  - Sub-issue 관계는 Issue body에 "Parent: #123" 또는 "Subtask of #123" 형식으로 명시
  - Parent issue는 자동으로 모든 sub-issue 링크를 본문에 포함
  
- **로컬 캐시 데이터**:
  - 오프라인 작업을 위한 임시 저장소
  - AI 분석 결과 캐싱으로 API 비용 절감
  - 동기화 큐로 오프라인 작업 추적
  - Parent-Child 관계 빠른 조회를 위한 인덱싱

### 8. 사용자 시나리오

#### 8.1 개발자 일일 워크플로우
1. 아침에 `gh-task ls` 로 할 일 확인
2. `gh-task add "버그 수정: 로그인 이슈"` 로 새 작업 추가
3. `gh-task assign 123 @me` 로 작업 할당
4. 작업 완료 후 `gh-task done 123`
5. `gh-task sync` 로 GitHub와 동기화

#### 8.2 팀 리더 워크플로우
1. `gh-task list --assignee @team` 로 팀 작업 확인
2. `gh-task assign 456 @developer` 로 작업 재할당
3. `gh-task label add 456 priority:high` 로 우선순위 설정
4. `gh-task search "deadline"` 로 마감 관련 작업 검색

#### 8.3 AI 지원 워크플로우
1. `gh-task generate --from-prd sprint-1.md` 로 스프린트 작업 자동 생성
2. `gh-task next --analyze` 로 오늘 집중할 작업 확인
3. `gh-task research 789` 로 복잡한 작업 시작 전 리서치
4. 리서치 결과 기반으로 구현 진행
5. `gh-task next` 로 다음 작업 추천 받기

#### 8.4 복잡한 프로젝트 관리
1. `gh-task analyze-complexity` 로 전체 작업 복잡도 평가
2. `gh-task expand --all` 로 모든 작업을 subtask로 분해
3. `gh-task dependency-graph` 로 의존성 시각화 및 크리티컬 패스 확인
4. `gh-task batch set-status` 로 여러 작업 상태 일괄 변경
5. `gh-task project use sprint-2` 로 다음 스프린트 전환

### 9. 비기능 요구사항

#### 9.1 성능
- 로컬 작업은 100ms 이내 응답
- 동기화는 백그라운드에서 비동기 처리
- 1000개 이상의 이슈 처리 가능

#### 9.2 보안
- GitHub 토큰 안전한 저장 (keychain/keyring 활용)
- HTTPS를 통한 모든 통신
- 민감한 정보 로깅 방지

#### 9.3 사용성
- 직관적인 명령어 구조
- 풍부한 도움말 및 예제
- 자동 완성 지원 (bash, zsh, fish)
- 색상 출력 지원

### 10. 확장성

#### 10.1 플러그인 시스템
- 사용자 정의 명령어 추가
- 웹훅 통합
- 외부 도구 연동

#### 10.2 통합
- CI/CD 파이프라인 통합
- IDE 플러그인
- Slack/Discord 알림

### 11. 로드맵

#### Phase 1 (MVP) - 4주
- 기본 CRUD 작업
- `gh` CLI 통합
- 로컬 캐싱

#### Phase 2 - 4주
- 오프라인 모드
- 자동 동기화
- 템플릿 시스템
- Next Task 기본 추천

#### Phase 3 - 4주
- 고급 검색
- PRD 기반 Task 생성
- Task Research 기능
- AI 분석 고도화

#### Phase 4 - 4주
- 플러그인 시스템
- 성능 최적화
- 머신러닝 기반 추천 개선

### 12. 성공 지표

- 일일 활성 사용자 수
- 평균 명령어 실행 시간
- 동기화 성공률
- 사용자 만족도 (NPS)
- GitHub Star 수
- AI 추천 수락률
- PRD 기반 작업 생성 정확도
- Research 기능 사용 빈도
- Subtask 생성 정확도
- 의존성 검증 성공률
- 일괄 작업 처리 시간

### 13. 위험 요소 및 대응

#### 13.1 기술적 위험
- **GitHub API 제한**: 캐싱 및 배치 처리로 대응
- **동기화 충돌**: 충돌 해결 UI 제공
- **성능 저하**: 인덱싱 및 쿼리 최적화

#### 13.2 사용자 경험 위험
- **학습 곡선**: 상세한 문서 및 튜토리얼 제공
- **기존 도구와의 차별화**: 독특한 기능 추가

#### 13.3 AI 관련 위험
- **API 비용**: 로컬 LLM 옵션 제공
- **부정확한 추천**: 사용자 피드백 루프 구현
- **개인정보 보호**: 민감 데이터 필터링

#### 13.4 확장성 관련 위험
- **대규모 이슈 처리**: 페이지네이션 및 캐싱 최적화
- **복잡한 의존성**: 그래프 처리 알고리즘 최적화
- **다중 프로젝트 관리**: 효율적인 컨텍스트 전환

### 14. 개발 원칙

- **SOLID 원칙 준수**: 확장 가능하고 유지보수 가능한 아키텍처
- **TDD 접근**: 테스트 주도 개발
- **Clean Code**: 읽기 쉽고 이해하기 쉬운 코드
- **문서화**: 코드와 API 문서 자동 생성