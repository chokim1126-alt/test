'use client'

export default function VideoScene({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <video
        src={videoUrl}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  )
}
