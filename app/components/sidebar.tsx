import { Link, NavLink, useNavigate, useNavigation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_LIST, menuConfig } from "~/const/app";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import SubNavbar from "./subNavbar";

export default function SidebarMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";



    const router = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // alert(`=${encodeURIComponent(search)}`)
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

            {isLoading && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed w-full flex flex-col items-center justify-end h-full pointer-events-none top-0 right-0 z-[999]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            className="bg-white shadow flex mb-5 items-center px-4 py-2 rounded-lg justify-center"
                        >
                            <div className="p-3 animate-spin">
                                <svg
                                    className="w-6 h-6 text-cyan-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            </div>
                            <div>Loading...</div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* <div className="relative z-[50] bg-zinc-500 py-2 flex gap-2 justify-end items-center px-6">
                <a href="line.me" target="_blank" className="text-sm size-8 bg-white rounded-full  
              flex gap-2 justify-center items-center">
                    <FaLine className="fill-[var(--primary-color)] size-5 text-transparent " />

                </a>
                <a href="facebook.com" target="_blank" className="text-sm size-8 bg-white rounded-full  
              flex gap-2 justify-center items-center">
                    <Facebook className="fill-[var(--primary-color)] text-transparent " />

                </a>
                <a href="tel:+66615097533" target="_blank" className="text-sm flex gap-2 items-center">
                    <div className="bg-[var(--primary-color)] rounded-full size-[36px] flex items-center justify-center">
                        <Phone className="fill-white size-5 text-transparent" />
                    </div>
                    <span className="font-bold momo-trust-display text-xl">+66 (0)615097533</span>
                </a>


            </div> */}
            {/* Top Navbar */}
            <header className="container-x no-print top-0 left-0 right-0 bg-white md:min-h-[100px]  min-h-[100px]
            flex flex-row-reverse items-center justify-between px-4 z-50 relative">
                <form onSubmit={handleSubmit} className="absolute md:flex gap-5 hidden w-full max-w-[350px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />

                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for tours, destinations..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 bg-white  
                 focus:ring-2 focus:ring-zinc-400 focus:border-zinc-300 transition-all duration-200 
                 placeholder:text-zinc-400 text-zinc-700"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button type="submit" className="button px-4 py-2 ">Search</button>
                </form>

                <div className="w-[200px] md:block hidden"></div>

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
                className={`w-full no-print sticky border-t-1 border-b-1 border-zinc-200 top-0 z-[40] bg-white  transition-shadow duration-300 h-[62px]  ${isScrolled ? "shadow-md " : "shadow-none"
                    }`}
            >
                <div className={`container-x flex overflow-hidden items-center   ${isScrolled ? "h-[62px] justify-between" : " h-[62px] justify-center"}`}>
                    <a href="/">
                        <img src="/logo/logo.jpg" className={`w-full max-w-[62px] aspect-square overflow-hidden duration-200 flex items-center justify-center ${isScrolled ? "h-[56px]" : "h-[0px] w-0"}`}
                            alt="creative tour guru" /></a>
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