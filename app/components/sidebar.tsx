import { Facebook, Menu, Phone, X } from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { useState } from "react";
import { NavLink } from "react-router";
import { MENU_LIST } from "~/const/app";

export default function SidebarMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="from-[var(--primary-color)] to-[var(--secondary-color)]
        text-white bg-linear-120 py-2 flex gap-2 justify-end px-6">
                <a href="line.me" target="_blank" className="text-sm size-8 bg-white rounded-full  
              flex gap-2 justify-center items-center">
                    <FaLine  className="fill-[var(--primary-color)] size-5 text-transparent " />

                </a>
                <a href="facebook.com" target="_blank" className="text-sm size-8 bg-white rounded-full  
              flex gap-2 justify-center items-center">
                    <Facebook className="fill-[var(--primary-color)] text-transparent " />

                </a>
                <a href="tel:+66615097533" target="_blank" className="text-sm flex gap-2 items-center">
                    <Phone className="fill-white text-transparent" />
                    <span className="font-medium">+66 (0) 61-509-7533</span>
                </a>


            </div>
            {/* Top Navbar */}
            <header className=" top-0 left-0 right-0 bg-white min-h-[60px] 
            flex flex-row-reverse items-center justify-between px-4 z-50">
                 <img src="/logo/logo.jpg" className="h-[72px]" alt="creative tour guru" />
                <button
                    className=" p-2 rounded-md hover:bg-white/10"
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