import { useState } from "react";
import { formatCurrency } from "~/lib/utils/currencyFormator";
import { ALL_STATUSES, type BookingStatus } from "~/models/booking";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

interface BookingRowProps {
    booking: any;
    isUpdating: boolean;
    openConfirmModal: (id: string, status: BookingStatus) => void;
    getStatusClasses: (status: BookingStatus) => string;
}

export default function BookingRow({
    booking,
    isUpdating,
    openConfirmModal,
    getStatusClasses,
}: BookingRowProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <tr
                key={booking.id}
                className="hover:bg-slate-50 cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <td className="px-6 py-4">{booking.firstName}</td>

                <td className="px-6 py-4">
                    {booking.tourName ? (
                        <span className="text-sm text-slate-600">{booking.tourName}</span>
                    ) : (
                        <span className="text-sm text-slate-400 italic">
                            {booking.tour || "N/A"} [Removed]
                        </span>
                    )}
                </td>

                <td className="px-6 py-4 text-slate-600">{booking.date}</td>

                <td className="px-6 py-4 font-medium">
                    {formatCurrency(booking.totalPrice)}
                </td>

                <td className="px-6 py-4">
                    <span
                        className={`inline-flex capitalize px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                            booking.status
                        )}`}
                    >
                        {booking.status}
                    </span>
                </td>

                <td className="px-6 py-4">
                    <select
                        disabled={isUpdating}
                        value={booking.status}
                        onChange={(e) =>
                            openConfirmModal(booking.id!, e.target.value as BookingStatus)
                        }
                        onClick={(e) => e.stopPropagation()} // prevent modal opening
                        className="block w-full text-sm border border-slate-300 rounded-md py-1.5 pl-3 pr-8 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                        {ALL_STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                </td>
            </tr>

            <BookingDetailModal open={open} onClose={() => setOpen(false)} booking={booking} />
        </>
    );
}


interface BookingDetailModalProps {
    open: boolean;
    onClose: () => void;
    booking: any;
}

function BookingDetailModal({
    open,
    onClose,
    booking,
}: BookingDetailModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-slate-600 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

                <div className="space-y-3">
                    <Detail label="Name" value={`${booking.firstName} ${booking.lastName}`} />
                    <Detail label="Tour" href={`/tours/${booking.tourSlug}`} value={booking.tourName || `${booking.tour} [Removed]`} />
                    <Detail label="Date" value={booking.date} />
                    <Detail label="Total Price" value={formatCurrency(booking.totalPrice)} />
                    <Detail label="Status" value={booking.status} />
                    <Detail label="Email" value={booking.email} />
                    <Detail label="Phone" value={booking.phone} />
                    {/* <Detail label="Created At" value={booking.created_at} /> */}
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value, href }: { label: string; value: any, href?: string }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            {href ?
                <a href={href} 
                target="_blank"
                className="font-medium underline text-blue-500 items-center flex gap-2">
                    <div className="">{value || "-"}</div>
                    <BsArrowUpRightCircleFill />
                </a>
                :
                <span className="font-medium">{value || "-"}</span>
            }
        </div>
    );
}