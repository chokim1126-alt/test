'use client'

import { useEffect, useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { supabase, ShowState, updateShowState } from '@/lib/supabase'
import { scenes } from '@/src/content/scenes'

const OPERATOR_PIN = process.env.NEXT_PUBLIC_OPERATOR_PIN || '1234'

export default function OperatorPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [state, setState] = useState<ShowState | null>(null)
  const [audienceCount, setAudienceCount] = useState(0)
  const [messageInput, setMessageInput] = useState('')
  const [videoUrlInput, setVideoUrlInput] = useState('')
  const [origin, setOrigin] = useState('')
  const presenceChannel = useRef<any>(null)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (!authenticated) return

    supabase.from('show_state').select('*').single().then(({ data }) => {
      if (data) setState(data as ShowState)
    })

    const stateChannel = supabase
      .channel('operator_state')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'show_state' }, (p) => {
        setState(p.new as ShowState)
      })
      .subscribe()

    presenceChannel.current = supabase.channel('audience_presence')
    presenceChannel.current
      .on('presence', { event: 'sync' }, () => {
        const presenceState = presenceChannel.current.presenceState()
        setAudienceCount(Object.keys(presenceState).length)
      })
      .subscribe()

    return () => {
      stateChannel.unsubscribe()
      presenceChannel.current?.unsubscribe()
    }
  }, [authenticated])

  function handlePin() {
    if (pin === OPERATOR_PIN) {
      setAuthenticated(true)
    } else {
      setPinError(true)
      setPin('')
      setTimeout(() => setPinError(false), 1500)
    }
  }

  async function triggerAlert() {
    if (!state) return
    await updateShowState({ trigger: 'alert' })
  }

  async function nextScene() {
    if (!state) return
    const next = Math.min(state.scene_index + 1, scenes.length - 1)
    await updateShowState({ scene_index: next, trigger: 'scene_change' })
  }

  async function prevScene() {
    if (!state) return
    const prev = Math.max(state.scene_index - 1, 0)
    await updateShowState({ scene_index: prev, trigger: 'scene_change' })
  }

  async function goToScene(index: number) {
    await updateShowState({ scene_index: index, trigger: 'scene_change' })
  }

  async function sendMessage() {
    if (!messageInput.trim()) return
    await updateShowState({ trigger: 'message', trigger_data: { text: messageInput } })
    setMessageInput('')
  }

  async function playVideo() {
    if (!videoUrlInput.trim()) return
    await updateShowState({ trigger: 'video_play', trigger_data: { video_url: videoUrlInput } })
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-6 w-64">
          <p className="text-white/50 text-sm tracking-widest">OPERATOR ACCESS</p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePin()}
            placeholder="PIN"
            className={`w-full text-center text-2xl tracking-widest bg-transparent border-b-2 py-3 text-white outline-none transition-colors
              ${pinError ? 'border-red-500 text-red-400' : 'border-white/20 focus:border-white/60'}`}
          />
          <button
            onClick={handlePin}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-mono tracking-widest transition-colors"
          >
            ENTER
          </button>
        </div>
      </div>
    )
  }

  const currentScene = scenes[state?.scene_index ?? 0]

  return (
    <div className="min-h-screen bg-[#111] text-white font-mono p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <p className="text-xs text-white/40 tracking-widest">SCENE</p>
          <p className="text-3xl font-bold">{state?.scene_index ?? 0}</p>
          <p className="text-sm text-white/60 mt-1">{currentScene?.type}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/40 tracking-widest">관객</p>
          <p className="text-3xl font-bold">{audienceCount}</p>
        </div>
      </div>

      {/* Scene nav */}
      <div className="flex gap-3">
        <button
          onClick={prevScene}
          disabled={state?.scene_index === 0}
          className="flex-1 py-6 text-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 border border-white/10 transition-colors"
        >
          ◀ 이전
        </button>
        <button
          onClick={nextScene}
          disabled={state?.scene_index === scenes.length - 1}
          className="flex-1 py-6 text-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 border border-white/10 transition-colors"
        >
          다음 ▶
        </button>
      </div>

      {/* Scene selector */}
      <select
        value={state?.scene_index ?? 0}
        onChange={(e) => goToScene(Number(e.target.value))}
        className="w-full py-4 px-3 bg-white/5 border border-white/10 text-white font-mono text-base"
      >
        {scenes.map((s) => (
          <option key={s.id} value={s.id} className="bg-[#222]">
            씬 {s.id} — {s.type}
          </option>
        ))}
      </select>

      {/* Alert */}
      <button
        onClick={triggerAlert}
        className="w-full py-6 text-xl font-bold bg-amber-900/40 hover:bg-amber-900/70 border border-amber-700/50 transition-colors"
      >
        🔔 알림 발동
      </button>

      {/* Message */}
      <div className="flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="관객에게 보낼 메시지..."
          className="flex-1 py-4 px-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 font-mono text-sm outline-none focus:border-white/30"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
        >
          💬
        </button>
      </div>

      {/* Video */}
      <div className="flex gap-2">
        <input
          type="text"
          value={videoUrlInput}
          onChange={(e) => setVideoUrlInput(e.target.value)}
          placeholder="영상 URL..."
          className="flex-1 py-4 px-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 font-mono text-sm outline-none focus:border-white/30"
        />
        <button
          onClick={playVideo}
          className="px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
        >
          🎬
        </button>
      </div>

      {/* QR Code */}
      {origin && (
        <div className="flex flex-col items-center gap-3 mt-2 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 tracking-widest">관객 접속 QR</p>
          <div className="bg-white p-3 rounded">
            <QRCodeSVG value={`${origin}/audience`} size={160} />
          </div>
          <p className="text-xs text-white/30">{origin}/audience</p>
        </div>
      )}
    </div>
  )
}
