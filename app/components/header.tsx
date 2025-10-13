import { Link, NavLink } from "react-router";


export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold ">Creative Tour Guru (Thailand)</Link>
        <nav className="space-x-6">
          {/* <NavLink to="/" className={({ isActive }) => isActive ? ' font-semibold' : 'hover:'}>Home</NavLink> */}
          {/* <NavLink to="/tours" className={({ isActive }) => isActive ? ' font-semibold' : 'hover:'}>Tours</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? ' font-semibold' : 'hover:'}>Blog</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? ' font-semibold' : 'hover:'}>About</NavLink> */}
        </nav>
      </div>
    </header>
  )
}
