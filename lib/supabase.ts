import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ShowState = {
  id: string
  scene_index: number
  trigger: 'idle' | 'alert' | 'scene_change' | 'video_play' | 'message'
  trigger_data: Record<string, any>
  updated_at: string
}

export async function getShowState(): Promise<ShowState | null> {
  const { data } = await supabase.from('show_state').select('*').single()
  return data
}

export async function updateShowState(updates: Partial<Omit<ShowState, 'id' | 'updated_at'>>) {
  // get the single row's id first
  const { data: row } = await supabase.from('show_state').select('id').single()
  if (!row) throw new Error('show_state row not found')
  const { data, error } = await supabase
    .from('show_state')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', row.id)
    .select()
    .single()
  if (error) throw error
  return data
}
