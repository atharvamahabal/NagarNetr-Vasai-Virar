import { Link, useLocation } from 'react-router-dom'
import { Home, PlusSquare, Map as MapIcon, ClipboardList, Users, Info } from 'lucide-react'
import { cn } from '../utils/cn'

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/report', label: 'Report', icon: PlusSquare },
    { path: '/map', label: 'Map', icon: MapIcon },
    { path: '/tracker', label: 'My Complaints', icon: ClipboardList },
    { path: '/directory', label: 'Directory', icon: Users },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-secondary text-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-xl">N</div>
        <div>
          <h1 className="text-xl font-bold leading-none">NagarNetr-Vasai Virar</h1>
          <p className="text-[10px] text-gray-300">नगर नेत्र - आपलं शहर, आपली जबाबदारी</p>
        </div>
      </Link>
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              location.pathname === item.path ? "text-primary" : "text-gray-300"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
