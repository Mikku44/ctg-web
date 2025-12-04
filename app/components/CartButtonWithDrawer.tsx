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

                <div className="grid gap-2 p-3 h-[90%] overflow-auto">
                    {lastBooking ? lastBooking.map((lastBooking) =>
                        <div key={lastBooking.id} className="bg-white h-fit rounded-lg p-4 shadow-sm flex flex-col space-y-2">
                            <p className="text-sm text-gray-800 font-medium">{lastBooking.tourName || "—"}</p>

                            <div className="flex justify-between text-xs text-gray-500">
                                <span>People: {lastBooking.people}</span>
                                <span>{lastBooking.date}</span>
                            </div>

                            <p className="text-xs text-gray-400 truncate">ID: {lastBooking.id}</p>

                            <a
                                href={`/checkout?id=${lastBooking.id}`}
                                className="mt-3 text-center bg-[var(--primary-color)] text-white py-2 rounded hover:opacity-90 transition"
                            >
                                Continue to Checkout
                            </a>
                        </div>

                    ) : (
                        <p className="text-gray-500">No booking saved.</p>
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
