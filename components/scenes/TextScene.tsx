'use client'

import { Scene } from '@/src/content/scenes'

export default function TextScene({ scene }: { scene: Scene }) {
  const { title, body, color, font_size, align } = scene.content

  const sizeClass =
    font_size === 'xlarge' ? 'text-3xl leading-relaxed' :
    font_size === 'large' ? 'text-2xl leading-relaxed' :
    'text-xl leading-relaxed'

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-8 animate-fade-in"
      style={{ background: scene.background, textAlign: align || 'left' }}
    >
      {title && (
        <p className="text-xs tracking-widest mb-8 opacity-50" style={{ color }}>
          {title}
        </p>
      )}
      <p
        className={`font-serif whitespace-pre-line ${sizeClass}`}
        style={{ color }}
      >
        {body}
      </p>
    </div>
  )
}
