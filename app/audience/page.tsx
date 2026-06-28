'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase, ShowState } from '@/lib/supabase'
import { scenes } from '@/src/content/scenes'
import WaitingScene from '@/components/scenes/WaitingScene'
import TextScene from '@/components/scenes/TextScene'
import MapScene from '@/components/scenes/MapScene'
import AlertTextScene from '@/components/scenes/AlertTextScene'
import VideoScene from '@/components/scenes/VideoScene'

export default function AudiencePage() {
  const [state, setState] = useState<ShowState | null>(null)
  const [shaking, setShaking] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [fadeKey, setFadeKey] = useState(0)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  const acquireWakeLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) return
    try {
      wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
    } catch {}
  }, [])

  useEffect(() => {
    acquireWakeLock()

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') acquireWakeLock()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      wakeLockRef.current?.release()
    }
  }, [acquireWakeLock])

  useEffect(() => {
    supabase.from('show_state').select('*').single().then(({ data }) => {
      if (data) setState(data as ShowState)
    })

    // presence: 오퍼 화면에서 관객 수 집계용
    const presenceChannel = supabase.channel('audience_presence')
    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track({ online_at: new Date().toISOString() })
      }
    })

    const channel = supabase
      .channel('show_state_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'show_state' },
        (payload) => {
          const newState = payload.new as ShowState

          if (newState.trigger === 'alert') {
            triggerAlert()
            supabase.from('show_state').update({ trigger: 'idle' }).eq('id', newState.id)
          } else if (newState.trigger === 'message') {
            setMessage(newState.trigger_data?.text || '')
            setTimeout(() => setMessage(null), 4000)
          } else if (newState.trigger === 'video_play') {
            setVideoUrl(newState.trigger_data?.video_url || null)
          } else if (newState.trigger === 'scene_change' || newState.trigger === 'idle') {
            setFadeKey((k) => k + 1)
            setVideoUrl(null)
          }

          setState(newState)
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
      presenceChannel.unsubscribe()
    }
  }, [])

  function triggerAlert() {
    try { navigator.vibrate([300, 100, 300, 100, 300]) } catch {}
    setShaking(true)
    setFlashing(true)
    setTimeout(() => setShaking(false), 600)
    setTimeout(() => setFlashing(false), 300)
  }

  const scene = scenes[state?.scene_index ?? 0]

  function renderScene() {
    if (!scene) return null
    switch (scene.type) {
      case 'waiting': return <WaitingScene scene={scene} />
      case 'text': return <TextScene scene={scene} />
      case 'map': return <MapScene scene={scene} />
      case 'alert_text': return <AlertTextScene scene={scene} />
      default: return <WaitingScene scene={scene} />
    }
  }

  return (
    <div
      key={fadeKey}
      className={`relative w-full h-screen overflow-hidden animate-fade-in ${shaking ? 'animate-shake' : ''}`}
    >
      {/* Scene — 메시지 표시 중에는 숨김 */}
      <div className={`w-full h-full transition-opacity duration-300 ${message ? 'opacity-0' : 'opacity-100'}`}>
        {renderScene()}
      </div>

      {/* Video overlay */}
      {videoUrl && <VideoScene videoUrl={videoUrl} />}

      {/* Alert flash overlay */}
      {flashing && (
        <div
          className="fixed inset-0 pointer-events-none animate-flash"
          style={{ background: '#c9a84c', zIndex: 40 }}
        />
      )}

      {/* Message overlay */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black/60 animate-fade-in px-8">
          <p className="text-cream text-2xl font-serif text-center whitespace-pre-line leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  )
}
