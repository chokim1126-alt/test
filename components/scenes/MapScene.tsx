'use client'

import { Scene } from '@/src/content/scenes'

export default function MapScene({ scene }: { scene: Scene }) {
  const { image_url, caption } = scene.content

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-6 animate-fade-in"
      style={{ background: scene.background }}
    >
      <div className="w-full max-w-sm aspect-square mb-6">
        <img
          src={image_url}
          alt="지도"
          className="w-full h-full object-contain"
          style={{ filter: 'sepia(40%) brightness(0.9)' }}
        />
      </div>
      <p className="text-sm tracking-widest text-center font-serif" style={{ color: '#e8d5b0', opacity: 0.7 }}>
        {caption}
      </p>
    </div>
  )
}
