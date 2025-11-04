import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { MENU_LIST } from "~/const/app";

export default function SidebarMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Top Navbar */}
            <header className="fixed top-0 left-0 right-0 bg-black/70 text-white h-[60px] flex flex-row-reverse items-center justify-between px-4 z-50">
                <h2 className="text-xl font-bold">CTG</h2>
                <button
                    className="text-white p-2 rounded-md hover:bg-white/10"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Overlay when drawer is open */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                />
            )}

            {/* Drawer Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-[220px] bg-black text-white 
          transform transition-transform duration-300 ease-in-out z-50 
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex flex-col h-full pt-[60px]"> {/* Push below navbar */}
                    <h2 className="text-xl font-bold px-4">CTG</h2>
                    <nav className="flex flex-col gap-1 mt-4">

                        {MENU_LIST.map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `px-6 py-3 text-sm font-medium transition-colors 
                   hover:bg-white/10 hover:text-cyan-300 ${isActive ? "bg-white/20 text-cyan-400" : "text-white"
                                    }`
                                }
                            >
                                {menu.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto px-6 pb-4 text-xs text-gray-400">
                        © 2025 CTG All Reserved.
                    </div>
                </div>
            </aside>
        </>
    );
}