import { useEffect, useMemo, useState } from 'react'
import { BUS_MAX_RESULTS } from '../config'
import { MANUAL_BUS_DEMO_1, MANUAL_BUS_DEMO_2 } from '../data/bus'

type Departure = {
  line: { name?: string }
  direction?: string
  destination?: string
  via?: string
  platform?: string
  connections?: string
  timeText?: string
  mins?: number
  ts?: number
}

const useBusDepartures = () => {
  const [departures, setDepartures] = useState<Departure[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const schedules = useMemo(() => [MANUAL_BUS_DEMO_1, MANUAL_BUS_DEMO_2], [])

  const computeUpcoming = useMemo(() => {
    return () => {
      const now = new Date()

      const buildEntriesFor = (offsetDays: number) => {
        const base = new Date(now)
        base.setDate(base.getDate() + offsetDays)
        const dayIdx = base.getDay()
        const getTimesForOffset = (s: typeof MANUAL_BUS_DEMO_1) =>
          dayIdx === 6 ? s.timesSaturday : dayIdx === 0 ? s.timesSunday : s.timesWeekday
        return schedules.flatMap((s) =>
          getTimesForOffset(s).map((t) => {
            const [h, m] = t.split(':').map((v) => parseInt(v, 10))
            const d = new Date(base)
            d.setHours(h, m, 0, 0)
            return { schedule: s, t, ts: d.getTime() }
          }),
        )
      }

      const entries = [...buildEntriesFor(0), ...buildEntriesFor(1)]
      entries.sort((a, b) => a.ts - b.ts)
      const future = entries.filter((e) => e.ts >= now.getTime() - 60_000)
      const selected = (future.length > 0 ? future : entries).slice(0, BUS_MAX_RESULTS)
      return selected.map<Departure>((e) => {
        const diff = e.ts - now.getTime()
        let mins: number
        if (diff < 0 && diff >= -60_000) {
          mins = 0
        } else {
          mins = Math.max(0, Math.round(diff / 60_000))
        }
        return {
          line: { name: e.schedule.line },
          direction: e.schedule.direction,
          destination: e.schedule.destination,
          via: e.schedule.via,
          platform: e.schedule.platform,
          connections: e.schedule.connections,
          timeText: e.t,
          mins,
          ts: e.ts,
        }
      })
    }
  }, [schedules])

  useEffect(() => {
    setIsLoading(true)
    setDepartures(computeUpcoming())
    setIsLoading(false)
  }, [computeUpcoming])

  useEffect(() => {
    const id = setInterval(() => {
      setDepartures(computeUpcoming())
    }, 15000)
    return () => clearInterval(id)
  }, [computeUpcoming])

  return {
    stopName: MANUAL_BUS_DEMO_1.stopName,
    departures,
    isLoading,
  }
}

export const BusDepartures = () => {
  const { stopName, departures, isLoading } = useBusDepartures()

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 text-xs uppercase tracking-wide text-neutral-500">Public Transport</div>
      {isLoading ? (
        <div className="text-neutral-600">Loading…</div>
      ) : (
        <ul className="divide-y-2 divide-black border-2 border-black">
          {departures.slice(0, BUS_MAX_RESULTS).map((d, idx) => {
            return (
              <li key={idx} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3">
                <span className="flex items-center">
                  <span className="rounded border-2 border-black px-2 py-1 text-sm font-semibold">
                    {d.line?.name ?? '—'}
                  </span>
                  {d.platform ? (
                    <span className="ml-2 rounded border-2 border-black px-2 py-0.5 text-xs font-medium">
                      {d.platform}
                    </span>
                  ) : null}
                </span>
                <span className="min-w-0 text-neutral-800">
                  <span className="block truncate text-base font-medium">{d.destination ?? d.direction ?? '—'}</span>
                  {d.via ? <span className="block truncate text-xs text-neutral-600">via {d.via}</span> : null}
                  {d.connections ? (
                    <span className="relative block h-4 overflow-hidden text-xs text-neutral-500">
                      <span className="absolute whitespace-nowrap animate-marquee">
                        Anschlüsse: {d.connections}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Anschlüsse: {d.connections}
                      </span>
                    </span>
                  ) : null}
                </span>
                <span className="flex flex-col items-end leading-tight">
                  <span className="tabular-nums text-xs text-neutral-600">{d.timeText ?? '—'}</span>
                  <span
                    className={
                      'tabular-nums ' +
                      (d?.mins !== undefined && d.mins <= 3
                        ? 'animate-pulse font-semibold text-red-600'
                        : 'text-neutral-900')
                    }
                  >
                    {d?.mins !== undefined ? `${d.mins} min` : '—'}
                  </span>
                </span>
              </li>
            )
          })}
          {departures.length === 0 ? (
            <li className="p-3 text-neutral-600">No upcoming departures</li>
          ) : null}
        </ul>
      )}
      <div className="mt-3 text-xs text-neutral-500">{stopName}</div>
    </div>
  )
}
