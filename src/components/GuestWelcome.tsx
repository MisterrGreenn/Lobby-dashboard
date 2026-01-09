type GuestWelcomeProps = {
  name: string
}

export const GuestWelcome = ({ name }: GuestWelcomeProps) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-4 text-xs uppercase tracking-wide text-neutral-500">Welcome</div>
      <h2 className="mb-4 text-3xl font-semibold text-neutral-900">{name}</h2>
      <p className="text-lg text-neutral-600">
        We warmly welcome you on behalf of the entire team. Enjoy your stay!
      </p>
    </div>
  )
}
