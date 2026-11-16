import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const fetchCurrentUser = async () => {
  const res = await axios.get(`/api/users/currentuser`)
  return res.data
}

function Home() {
  const { data, isLoading,error,status } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  })

  if (isLoading) {
    return (
      <div>
        <Loader className="text-center w-20 h20 animate-spin" />
      </div>
    )
  }

  if (status === 'error') {
    return <div className="text-red-500">{`Error fetching current user ${error.message}`}</div>
  }

  return (
    <div className="mt-16 bg-amber-300 h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Landing Page!!</h1>
      <p className="text-2xl font-bold text-white">
        {data ? `Current User: ${data?.data.currentUser?.email}` : 'No current user'}
      </p>
    </div>
  )
}
