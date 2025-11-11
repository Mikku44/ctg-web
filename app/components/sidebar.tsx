import { Facebook, Menu, Phone, Search, X } from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MENU_LIST, menuConfig } from "~/const/app";
import SubNavbar from "./subNavbar";

export default function SidebarMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);



    const router = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) router(`/search?query=${encodeURIComponent(search)}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="relative z-[50] from-[var(--primary-color)] to-[var(--secondary-color)]
        text-white bg-linear-120 py-2 flex gap-2 justify-end px-6">
                <a href="line.me" target="_blank" className="text-sm size-8 bg-white rounded-full  
              flex gap-2 justify-center items-center">
                    <FaLine className="fill-[var(--primary-color)] size-5 text-transparent " />

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
            <header className="container-x top-0 left-0 right-0 bg-white md:min-h-[100px]  min-h-[100px]
            flex flex-row-reverse items-center justify-between px-4 z-50 relative">
                <form onSubmit={handleSubmit} className="relative md:block hidden">
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-2 px-3 border border-zinc-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400"
                        placeholder="Search for tour"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 bottom-2 text-zinc-700 hover:text-zinc-900"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>


                <Link to="/"><img src="/logo/logo.jpg" className="md:h-[100px] h-[100px] top-0 md:absolute" alt="creative tour guru" /></Link>


                <div className="flex gap-2 flex-row-reverse">

                    <button
                        className="bg-transparent p-2 rounded-md hover:bg-white/10"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>


            </header>
            <section
                className={`w-full sticky top-0 z-[40] bg-white border-b border-zinc-50 transition-shadow duration-300  ${isScrolled ? "shadow-md h-[62px]" : "shadow-none h-[45px]"
                    }`}
            >
                <div className={`container-x flex items-center justify-center  ${isScrolled ? "h-[62px]" : " h-[45px]"}`}>
                    <SubNavbar menuItems={menuConfig as any} />
                </div>
            </section>

            {/* Overlay when drawer is open */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed  inset-0 bg-black/40 backdrop-blur-sm z-[50]"
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