'use client'

import Image from 'next/image'
import { Scene } from '@/src/content/scenes'

export default function MapScene({ scene }: { scene: Scene }) {
  const { image_url, caption } = scene.content

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-6 animate-fade-in"
      style={{ background: scene.background }}
    >
      <div className="relative w-full max-w-sm aspect-square mb-6">
        <Image
          src={image_url}
          alt="지도"
          fill
          className="object-contain"
          style={{ filter: 'sepia(60%) brightness(0.85)' }}
          onError={(e) => {
            // fallback for missing map images during dev
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* Fallback placeholder when image is missing */}
        <div
          className="absolute inset-0 border border-amber-900/30 rounded flex items-center justify-center"
          style={{ background: 'rgba(139,90,43,0.1)' }}
        >
          <span className="text-amber-900/40 text-sm font-mono">지도</span>
        </div>
      </div>
      <p className="text-cream/70 text-sm tracking-widest text-center font-serif">
        {caption}
      </p>
    </div>
  )
}
