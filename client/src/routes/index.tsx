import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/')({
  // beforeLoad: ({ context }) => {
  //   if (!context.auth.isAuthenticated()) {
  //     throw redirect({
  //       to: '/login',
  //       search: {
  //         alert: 'you must be logged in to access the home page',
  //       },
  //     })
  //   } else {
  //     throw redirect({
  //       to: '/',
  //     })
  //   }
  // },
  component: Home,
})

async function Home() {
  let cur_user:any
  if (typeof window === 'undefined') {
    // console.log('window.location.href', window.location.href)
  } else {
    const { data } = await axios.get('api/users/currentuser')
    cur_user = data
    console.log('dataaa', data)
    console.log('cur_user', cur_user)
    return data
  }
  return (
    <div className="mt-16 bg-amber-300">
      <h1 className="text-4xl font-bold">Landing Page!!</h1>
      <p>{cur_user?.data.currentuser.id}</p>
      <p>{cur_user?.data.currentuser.email}</p>
    </div>
  )
}
