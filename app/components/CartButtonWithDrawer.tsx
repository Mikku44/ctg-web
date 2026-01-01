import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function CartButtonWithDrawer() {
    const [open, setOpen] = useState(false);
    const [lastBooking, setLastBooking] = useState<any[]>([]);




    useEffect(() => {
        if (!open) return;

        try {
            const saved = JSON.parse(localStorage.getItem("lastBooking") || "[]");

            if (Array.isArray(saved)) {
                setLastBooking(saved);
            } else {
                setLastBooking([]);
            }
        } catch {
            setLastBooking([]);
        }
    }, [open]);

    return (
        <>
            {/* 🛒 Floating Cart Button */}
            <button
                onClick={() => setOpen(true)}
                className=" p-4 rounded-full group bg-white text-black border border-zinc-50 shadow-lg relative hover:bg-zinc-50 transition"
            >
                <div className="absolute  bg-white border border-zinc-50
        pointer-events-none opacity-0 group-hover:opacity-100 transition
        p-2 rounded-md w-[150px] translate-x-[-180px] top-2 shadow">Last booking</div>

                {lastBooking?.length > 0 && <div className="rounded-full p-1 bg-red-500 text-white
               items-center justify-center text-sm absolute size-5 top-0 right-0 flex">{lastBooking?.length}</div>}
                <ShoppingCart size={22} />
            </button>

            {/* Drawer Background Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-[50]"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* 🧾 Drawer Panel */}
            <div
                className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-[60] p-5 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <h2 className="text-xl font-semibold mb-4">Last Booking</h2>

                <div className="grid gap-3 p-3 h-[90%] overflow-auto">
                    {lastBooking && lastBooking.length > 0 ? (
                        lastBooking.map((booking) => (
                            <div
                                key={booking.id}
                                className="group bg-white border border-gray-200 h-fit p-4 flex flex-col transition-all hover:border-black"
                            >
                                {/* Header: Tour Name */}
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-[13px] font-bold  tracking-tight text-black leading-none">
                                        {booking.tourName || "TOUR NOT SPECIFIED"}
                                    </h3>
                                    {/* <span className="text-[10px] font-medium bg-black text-white px-1.5 py-0.5">
                                        DRAFT
                                    </span> */}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 border-y border-gray-100 py-2 mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 uppercase">Pax</span>
                                        <span className="text-xs font-semibold">{booking.people} People</span>
                                    </div>
                                    <div className="flex flex-col border-l border-gray-100 pl-3">
                                        <span className="text-[10px] text-gray-400 uppercase">Date</span>
                                        <span className="text-xs font-semibold">{booking.date}</span>
                                    </div>
                                </div>

                                {/* Footer: ID & Price */}
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-300 font-mono">#{booking.id?.slice(-8)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-gray-400 block leading-none">Total</span>
                                        <span className="text-sm font-bold text-black">฿{booking.totalPrice?.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <a
                                    href={`/checkout?id=${booking.id}`}
                                    className="w-full text-[11px] uppercase tracking-widest font-bold text-center text-(--primary-color)
                                     border border-(--primary-color) py-2.5 hover:bg-(--primary-color) hover:text-white transition-colors duration-200"
                                >
                                    Complete Booking
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xs uppercase tracking-widest text-gray-400">No records found</p>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
        </>
    );
}
