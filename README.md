# 〈기억을 찾아서〉 공연용 PWA

## 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
```bash
cp .env.local.example .env.local
# .env.local 파일 열어서 Supabase 정보 입력
```

### 3. Supabase 설정
- [supabase.com](https://supabase.com)에서 프로젝트 생성
- SQL Editor에서 `supabase-setup.sql` 내용 실행
- Project Settings → API에서 URL과 anon key 복사 → `.env.local`에 입력

### 4. 개발 서버 실행
```bash
npm run dev
```

- 오퍼 화면: `http://localhost:3000/operator` (PIN: 1234)
- 관객 화면: `http://localhost:3000/audience`

### 5. Vercel 배포
1. GitHub 레포 생성 후 코드 푸시
2. vercel.com → "Add New Project" → GitHub 레포 연결
3. Environment Variables에 `.env.local.example`의 변수 3개 입력
4. Deploy

## 라우트
| 경로 | 역할 |
|------|------|
| `/operator` | 오퍼(운영자) 컨트롤 화면 — PIN 보호 |
| `/audience` | 관객 화면 — QR로 접속 |

## 씬 콘텐츠 교체
`src/content/scenes.ts`에서 씬 텍스트/이미지 URL 수정.  
지도 이미지는 `public/images/` 폴더에 저장.

## 환경변수
| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_OPERATOR_PIN` | 오퍼 화면 접근 PIN (기본: 1234) |
