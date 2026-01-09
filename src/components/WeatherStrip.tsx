import { useEffect, useState } from 'react'
import { LOCATION_NAME, WEATHER_PAGE_ROTATION_MS } from '../config'

// Minimal, monochrome line icons
const iconClass = 'h-8 w-8 text-stone-700'
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <path stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M5.64 18.36 4.22 19.78M19.78 4.22l-1.42 1.42" />
  </svg>
)
const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
    <path stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 1 1 0-8 5 5 0 0 1 9.5 1.5A3.5 3.5 0 0 1 17 18H7z" />
  </svg>
)
const IconSnow = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
    <path stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M7 15a4 4 0 1 1 0-8 5 5 0 0 1 9.5 1.5A3.5 3.5 0 0 1 17 15H7z" />
    <path stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" d="M12 16.5v3.5M10.5 18h3" />
  </svg>
)

type MockDay = {
  label: string
  icon: React.ReactElement
  tMax: number
  tMin: number
  precip: number
}

// Generate mock weather data for demo
const generateMockWeather = () => {
  const conditions = [
    { icon: <IconSun />, summary: 'Sunny', code: 0 },
    { icon: <IconCloud />, summary: 'Partly cloudy', code: 2 },
    { icon: <IconSnow />, summary: 'Light snow', code: 71 },
  ]
  const current = conditions[Math.floor(Math.random() * conditions.length)]
  const temp = Math.round(-5 + Math.random() * 15) // -5 to +10 for alpine winter

  const dayLabels = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const days: MockDay[] = dayLabels.slice(0, 7).map((label) => ({
    label,
    icon: conditions[Math.floor(Math.random() * conditions.length)].icon,
    tMax: Math.round(-2 + Math.random() * 10),
    tMin: Math.round(-10 + Math.random() * 8),
    precip: Math.round(Math.random() * 15),
  }))

  return { current, temp, days }
}

export const WeatherStrip = () => {
  const [weather] = useState(generateMockWeather)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p === 0 ? 1 : 0)), WEATHER_PAGE_ROTATION_MS)
    return () => clearInterval(id)
  }, [])

  const { current, temp, days } = weather
  const startIdx = page === 0 ? 0 : 3
  const visibleDays = days.slice(startIdx, startIdx + 3)

  return (
    <div className="bg-stone-50 text-neutral-900">
      <div className="border-t-2 border-black px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="text-stone-700" aria-hidden="true">{current.icon}</div>
            <div className="flex items-center gap-4">
              <span className="text-6xl font-semibold tabular-nums leading-none">{temp}°</span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-stone-600">{LOCATION_NAME}</span>
                <span className="text-sm text-stone-600">{current.summary}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-stone-500">Now</div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {visibleDays.map((day, idx) => (
            <div key={idx} className="rounded-xl border border-black bg-white p-4" aria-label="Daily forecast card">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{day.label}</span>
                <div className="text-stone-700">{day.icon}</div>
              </div>
              <div className="flex items-center justify-between text-sm text-stone-600">
                <span className="tabular-nums">Max {day.tMax}°</span>
                <span className="tabular-nums">Min {day.tMin}°</span>
              </div>
              <div className="mt-1 text-xs text-stone-500">Snow {day.precip} cm</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
