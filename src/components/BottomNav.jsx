import { Link, useLocation } from 'react-router-dom'
import { Home, PlusSquare, Map as MapIcon, ClipboardList, Users } from 'lucide-react'
import { cn } from '../utils/cn'

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/report', label: 'Report', icon: PlusSquare },
    { path: '/map', label: 'Map', icon: MapIcon },
    { path: '/tracker', label: 'Complaints', icon: ClipboardList },
    { path: '/directory', label: 'Directory', icon: Users },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path}
          className={cn(
            "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
            location.pathname === item.path ? "text-primary" : "text-gray-500"
          )}
        >
          <item.icon size={20} />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav
