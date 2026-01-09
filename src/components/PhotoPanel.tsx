import { useEffect, useState } from 'react'
import { HERO_IMAGES } from '../config'

export const PhotoPanel = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const date = now.toLocaleDateString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const imgSrc = HERO_IMAGES[0] || '/demo-hotel.jpg'

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={imgSrc}
        alt="Hotel view"
        className="h-full w-full object-cover"
      />
      <div className="absolute left-6 top-6 text-white drop-shadow-lg">
        <div className="text-5xl font-light tabular-nums tracking-wide md:text-6xl">{time}</div>
        <div className="mt-1 text-lg font-light tracking-wider opacity-90">{date}</div>
      </div>
    </div>
  )
}
