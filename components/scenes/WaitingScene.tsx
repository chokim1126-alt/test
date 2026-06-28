'use client'

import { Scene } from '@/src/content/scenes'

export default function WaitingScene({ scene }: { scene: Scene }) {
  const { blink_text, blink_color } = scene.content

  return (
    <div
      className="flex items-center justify-center h-full w-full"
      style={{ background: scene.background }}
    >
      <span
        className="animate-blink text-2xl tracking-widest font-mono"
        style={{ color: blink_color }}
      >
        {blink_text}
      </span>
    </div>
  )
}
