import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold">Landing Page!!</h1>
    </div>
  )
}
