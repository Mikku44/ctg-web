import { useEffect, useState } from "react";
import { formatCurrency } from "~/lib/utils/currencyFormator";
import type { BookingModel } from "~/models/booking";
import { bookingService } from "~/services/bookingService";

type BookingStatus = 'complete' | 'paid' | 'unpaid';
const ALL_STATUSES: BookingStatus[] = ['complete', 'paid', 'unpaid'];

export default function Bookings() {
    const [isUpdating, setIsUpdating] = useState(false);

    const [bookingList, setBookingList] = useState<BookingModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // For modal
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);

    useEffect(() => {
        setIsLoading(true);
        bookingService.getAllBookings()
            .then((data) => {
                setBookingList(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch bookings:", err);
                setError("Failed to load bookings. Please try again.");
                setIsLoading(false);
            });
    }, []);

    // Handle confirm update
    const handleConfirmUpdate = async () => {
        if (!selectedBookingId || !selectedStatus) return;

        try {
            setIsUpdating(true);

            await bookingService.updateBooking(selectedBookingId, { status: selectedStatus });

            setBookingList(prev =>
                prev.map(b =>
                    b.id === selectedBookingId ? { ...b, status: selectedStatus } : b
                )
            );

            setIsUpdating(false);
            setShowModal(false);

        } catch (error) {
            setIsUpdating(false);
            alert("Failed to update booking status.");
        }
    };

    const openConfirmModal = (bookingId: string, newStatus: BookingStatus) => {
        setSelectedBookingId(bookingId);
        setSelectedStatus(newStatus);
        setShowModal(true);
    };

    const getStatusClasses = (status: BookingModel['status']): string => {
        switch (status) {
            case 'complete': return 'bg-green-100 text-green-800';
            case 'paid': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    if (isLoading) return <main className="p-4 lg:p-8 max-w-7xl mx-auto">Loading bookings...</main>;
    if (error) return <main className="p-4 lg:p-8 max-w-7xl mx-auto text-red-600">{error}</main>;

    return (
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
            <h1 className="font-bold text-3xl mb-5">Bookings</h1>

            {/* TABLE */}
            <div className="grid gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-slate-900">Recent Bookings</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Tour</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {bookingList.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">{booking.firstName}</td>
                                        <td className="px-6 py-4">
                                            {booking.tourName ? (
                                                // Standard display if tourName exists
                                                <span className="text-sm text-slate-600">
                                                    {booking.tourName}
                                                </span>
                                            ) : (
                                                // Modified display if tourName is missing/removed
                                                <span className="text-sm text-slate-400 italic">
                                                    {booking.tour || 'N/A'} [Removed]
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{booking.date}</td>
                                        <td className="px-6 py-4 font-medium">{formatCurrency(booking.totalPrice)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex capitalize px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4">
                                            <select
                                                disabled={isUpdating}
                                                value={booking.status}
                                                onChange={(e) =>
                                                    openConfirmModal(booking.id!, e.target.value as BookingStatus)
                                                }
                                                className="block w-full text-sm border border-slate-300 rounded-md py-1.5 pl-3 pr-8 disabled:bg-slate-100 disabled:text-slate-400"
                                            >
                                                {ALL_STATUSES.map(status => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* CONFIRM MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-3">Confirm Status Change</h2>

                        <p className="text-sm text-slate-700 mb-6">
                            Are you sure you want to change the status to{" "}
                            <strong className="capitalize">{selectedStatus}</strong>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isUpdating}
                                className="px-4 py-2 rounded-md border disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmUpdate}
                                disabled={isUpdating}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 flex items-center gap-2"
                            >
                                {isUpdating && (
                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                )}
                                {isUpdating ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
