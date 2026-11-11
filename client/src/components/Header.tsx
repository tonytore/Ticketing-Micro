import { auth } from '@/utils/auth'
import { Link } from '@tanstack/react-router'

const Header = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
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
        <Link to="/signup">
          <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </Link>
        {/* <button
          onClick={()=>auth.logout()}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button> */}
      </div>
    </nav>
  )
}

export default Header
