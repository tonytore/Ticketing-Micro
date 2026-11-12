import { Link } from '@tanstack/react-router'
import { toast } from './ui/toast'
import { auth } from '@/utils/auth'
import axios from 'axios'

const Header = () => {
  const handleLogout = async()=>{
    await axios.post('http://ticketing.dev/api/users/signout')
    toast.add({
      title: 'Logout',
      description: `You are successfully logged out`,
      type: 'success',
    })
    auth.logout()
  }

  return (
    <nav className="h-16 flex justify-center items-center gap-2 border text-center bg-amber-100 fixed top-0 left-0 right-0 z-50">
      <h1 className="text-2xl font-bold  text-emerald-300">Ticketing</h1>
      <div className="flex-1  flex items-center gap-2 justify-end mr-8">
        <Link to="/">
          <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        {!auth.isAuthenticated() && (
          <Link to="/signup">
            <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </Link>
        )}
        {auth.isAuthenticated() && (
          <button
            onClick={()=>{handleLogout()}}
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Header
