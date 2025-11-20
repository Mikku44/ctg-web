
import {
    LayoutDashboard,
    Map,
    PlusCircle,
    List,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: List, label: 'Tour List', path: '/admin/tour/list' },
        { icon: PlusCircle, label: 'Add Tour', path: '/admin/tour/add' },

        // { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];


    const handleSignOut = () => {
        import('~/lib/firebase/auth').then(({ signOutFromAdmin }) => {
            signOutFromAdmin();
        });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen
      `}>
                <div className="flex h-16 items-center justify-between px-6 font-bold text-xl tracking-wider border-b border-slate-800">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Map size={24} />
                        <span>CTG - <span className="text-white">ADMIN</span></span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2 px-2">Menu</div>
                    {menuItems.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsOpen(false)} // Close sidebar on mobile nav
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPath === item.path
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}