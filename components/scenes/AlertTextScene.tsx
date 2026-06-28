'use client'

import { Scene } from '@/src/content/scenes'

export default function AlertTextScene({ scene }: { scene: Scene }) {
  const { message, font_size, color } = scene.content

  const sizeClass =
    font_size === 'xlarge' ? 'text-4xl leading-snug' :
    font_size === 'large' ? 'text-3xl leading-snug' :
    'text-2xl leading-snug'

  return (
    <div
      className="flex items-center justify-center h-full w-full px-8 animate-shake"
      style={{ background: scene.background }}
    >
      <p
        className={`font-serif whitespace-pre-line text-center ${sizeClass}`}
        style={{ color }}
      >
        {message}
      </p>
    </div>
  )
}
