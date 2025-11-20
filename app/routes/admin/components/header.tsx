import { Menu, Search, Bell } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-slate-600 hover:text-slate-900">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search bookings, tours..." 
            className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}