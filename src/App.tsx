import { PhotoPanel } from './components/PhotoPanel'
import { WeatherStrip } from './components/WeatherStrip'
import { NewsPanel } from './components/NewsPanel'

const App = () => {
  return (
    <div className="grid h-screen w-screen grid-cols-12 bg-white text-neutral-900">
      <section
        className="col-span-12 grid min-h-0 grid-rows-[1fr_auto] md:col-span-7"
        aria-label="Poolside photo with time and date and weather"
      >
        <div className="min-h-0">
          <PhotoPanel />
        </div>
        <WeatherStrip />
      </section>
      <section className="col-span-12 min-h-0 md:col-span-5" aria-label="News headline and summary">
        <div className="h-full">
          <NewsPanel />
        </div>
      </section>
    </div>
  )
}

export default App
