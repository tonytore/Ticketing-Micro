import { auth } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (auth.isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          alert: 'you must be logged in to access the home page',
        },
      })
    }
  },
  component: Home,
})

function Home() {
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold">Landing Page!!</h1>
    </div>
  )
}
