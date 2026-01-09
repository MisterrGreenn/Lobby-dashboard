import { useEffect, useState } from 'react'
import {
  BADGE_IMAGE_URL,
  PANEL_ROTATION_BUS_MS,
  PANEL_ROTATION_NEWS_MS,
  PANEL_ROTATION_GUEST_MS,
  GUEST_NAMES,
} from '../config'
import { BusDepartures } from './BusDepartures'
import { GuestWelcome } from './GuestWelcome'

type Article = {
  title: string
  description: string
  imageUrl: string
}

// Demo mock articles - travel/hospitality themed
const MOCK_ARTICLES: Article[] = [
  {
    title: 'Alpine Ski Season Opens with Record Snowfall',
    description:
      'The 2024/25 ski season kicks off with exceptional conditions across the Alps. Resorts report up to 2 meters of fresh powder, promising an outstanding winter for skiing enthusiasts and winter sports lovers.',
    imageUrl: '/demo-room.jpg',
  },
  {
    title: 'New Hiking Trail Connects Mountain Villages',
    description:
      'A scenic 25km trail now links historic Alpine villages, offering breathtaking views of glaciers and wildflower meadows. The route features traditional mountain huts for refreshments along the way.',
    imageUrl: '/demo-room.jpg',
  },
  {
    title: 'Local Christmas Markets Attract Thousands',
    description:
      'Traditional holiday markets open across the region, featuring handcrafted gifts, mulled wine, and regional delicacies. Live music and festive decorations create a magical winter atmosphere.',
    imageUrl: '/demo-room.jpg',
  },
]

export const NewsPanel = () => {
  const [articleIndex, setArticleIndex] = useState(0)
  const [mode, setMode] = useState<'news' | 'bus' | 'guest'>('news')
  const [guestIndex, setGuestIndex] = useState<number>(0)

  const article = MOCK_ARTICLES[articleIndex]

  // Rotate articles
  useEffect(() => {
    const id = setInterval(() => {
      setArticleIndex((i) => (i + 1) % MOCK_ARTICLES.length)
    }, 30000)
    return () => clearInterval(id)
  }, [])

  // Rotate modes (news / bus / guest)
  useEffect(() => {
    const hasGuests = GUEST_NAMES.length > 0
    const modes: Array<'news' | 'bus' | 'guest'> = hasGuests ? ['news', 'bus', 'guest'] : ['news', 'bus']
    const currentIdx = modes.indexOf(mode)
    const duration =
      mode === 'bus'
        ? PANEL_ROTATION_BUS_MS || 25000
        : mode === 'guest'
        ? PANEL_ROTATION_GUEST_MS || 10000
        : PANEL_ROTATION_NEWS_MS || 10000
    const t = setTimeout(() => {
      const next = modes[(currentIdx + 1) % modes.length]
      if (next === 'guest') {
        setGuestIndex((i) => (i + 1) % Math.max(1, GUEST_NAMES.length))
      }
      setMode(next)
    }, duration)
    return () => clearTimeout(t)
  }, [mode])

  return (
    <aside
      className="grid h-full grid-rows-[auto_1fr] overflow-hidden border-l-2 border-black bg-white"
      aria-label="Info panel"
    >
      <div className="relative h-28 border-b-2 border-black md:h-82">
        <img
          src={BADGE_IMAGE_URL || article?.imageUrl || '/demo-room.jpg'}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-8 md:p-10">
        {mode === 'news' ? (
          <>
            <div className="mb-4 text-xs uppercase tracking-wide text-neutral-500">News</div>
            <h2 className="mb-2 line-clamp-3 text-balance text-2xl font-semibold text-neutral-900">
              {article?.title || 'Welcome to our hotel'}
            </h2>
            <p className="line-clamp-6 text-neutral-600">
              {article?.description || 'Enjoy your stay with us.'}
            </p>
          </>
        ) : mode === 'bus' ? (
          <BusDepartures />
        ) : (
          <GuestWelcome name={GUEST_NAMES[guestIndex] ?? 'Guest'} />
        )}
      </div>
    </aside>
  )
}
