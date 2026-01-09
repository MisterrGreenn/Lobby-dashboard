// ============================================================
// DEMO TEMPLATE - All mock data, no .env needed
// ============================================================

export const LOCATION_NAME = 'Seefeld, Tirol'
export const LOCATION_LATITUDE = 47.3308
export const LOCATION_LONGITUDE = 11.1875

export const REFRESH_INTERVALS_MS = {
  clock: 1000,
  weather: 10 * 60 * 1000,
  news: 15 * 60 * 1000,
  bus: 60 * 1000,
}

export const WEATHER_PAGE_ROTATION_MS = 10000
export const HERO_IMAGES: string[] = ['/demo-hotel.jpg']
export const BADGE_IMAGE_URL = '/demo-room.jpg'

export const PANEL_ROTATION_MS = 20000
export const PANEL_ROTATION_NEWS_MS = 10000
export const PANEL_ROTATION_BUS_MS = 25000
export const PANEL_ROTATION_GUEST_MS = 10000

export const BUS_MAX_RESULTS = 6

export const GUEST_NAMES: string[] = [
  'Familie Schmidt',
  'Mr. & Mrs. Johnson',
  'Herr Müller',
  'The Williams Family',
]
