-- Supabase에서 실행: SQL Editor에 붙여넣기

create table if not exists show_state (
  id uuid primary key default gen_random_uuid(),
  scene_index integer default 0,
  trigger text default 'idle',
  trigger_data jsonb default '{}',
  updated_at timestamptz default now()
);

-- 행 1개만 유지 (처음 한 번만 실행)
insert into show_state (scene_index, trigger, trigger_data)
values (0, 'idle', '{}');

-- Realtime 활성화
alter publication supabase_realtime add table show_state;

-- 익명 사용자가 읽기/쓰기 가능하도록 RLS 정책 (공연용 간소화)
alter table show_state enable row level security;

create policy "allow all" on show_state
  for all using (true) with check (true);
