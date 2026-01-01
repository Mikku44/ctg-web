import { useEffect, useState } from "react";
import { formatCurrency } from "~/lib/utils/currencyFormator";
import { ALL_STATUSES, type BookingModel, type BookingStatus } from "~/models/booking";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { toast } from "sonner";
import { bookingService } from "~/services/bookingService";
import Loading from "~/components/Loading";


// ========================
// Booking Row Component
// ========================
export default function BookingRow({
    booking,
    isUpdating,
    openConfirmModal,
    getStatusClasses,
}: {
    booking: BookingModel;
    isUpdating: boolean;
    openConfirmModal: (id: string, status: BookingStatus) => void;
    getStatusClasses: (status: BookingStatus) => string;
}) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(booking); // <--- LOCAL STATE

    async function handleSave(updated: Partial<BookingModel>) {
        try {
            if (!data?.id) return;

            await bookingService.updateBooking(data.id, updated);

            toast.success("Booking updated");

            setData((prev) => ({ ...prev, ...updated })); // <--- update UI

            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <tr
                key={data.id}
                className="hover:bg-slate-50 cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <td className="px-6 py-4">{data.firstName}</td>

                <td className="px-6 py-4">
                    {data.tourName ? (
                        <span className="text-sm text-slate-600">{data.tourName}</span>
                    ) : (
                        <span className="text-sm text-slate-400 italic">
                            {data.tour || "N/A"} [Removed]
                        </span>
                    )}
                </td>

                <td className="px-6 py-4 text-slate-600">{data.date}</td>

                <td className="px-6 py-4 font-medium">
                    {data.status == "wait" && data.totalPrice <= 0
                        ? "รอตกลงราคา"
                        : formatCurrency(data.totalPrice)}
                </td>

                <td className="px-6 py-4">
                    <span
                        className={`inline-flex capitalize px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(data.status)}`}
                    >
                        {data.status}
                    </span>
                </td>

                <td className="px-6 py-4">
                    <select
                        disabled={isUpdating}
                        value={data.status}
                        onChange={(e) =>
                            openConfirmModal(data.id!, e.target.value as BookingStatus)
                        }
                        onClick={(e) => e.stopPropagation()}
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

            {/* MODAL */}
            <BookingDetailModal
                open={open}
                onClose={() => setOpen(false)}
                booking={data}
                onSave={handleSave}
            />
        </>
    );
}



// ========================
// Booking Detail Modal
// ========================
interface BookingDetailModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (updated: Partial<BookingModel>) => void;
    booking: BookingModel & { tourSlug?: string; phone?: string };
}

function BookingDetailModal({ open, onClose, onSave, booking }: BookingDetailModalProps) {
    const [form, setForm] = useState(booking);
    const [isLoading, setIsLoading] = useState(false);

    if (!open) return null;

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true)
        const updated: Partial<BookingModel> = {
            totalPrice: Number(form.totalPrice),
            totalDepositPrice : Number(form.totalDepositPrice),
            people: Number(form.people),
            hotel: form.hotel || "",
            special: form.special || "",
            contact: form.contact || "",
        };

        await onSave(updated);

        await new Promise(resolve => setTimeout(resolve, 500));

        setIsLoading(false);

        // window.location.reload();
    };


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
                    <Detail label="Name" value={`${form.firstName} ${form.lastName}`} />
                    <Detail
                        label="Tour"
                        href={`/tours/${form.tourSlug}`}
                        value={form.tourName || `${form.tour} [Removed]`}
                    />

                    <DetailEditable label="Date" value={form.date} field="date" onChange={handleChange} />
                    <DetailEditable label="People" value={form.people} field="people" onChange={handleChange} />

                    <DetailEditable
                        label="Deposit Price"
                        value={form.totalDepositPrice}
                        field="totalDepositPrice"
                        onChange={handleChange}
                    />
                    <DetailEditable
                        label="Total Price"
                        value={form.totalPrice}
                        field="totalPrice"
                        onChange={handleChange}
                    />

                    <Detail label="Status" value={form.status} />
                    <DetailEditable label="Email" value={form.email} field="email" onChange={handleChange} />

                    <DetailEditable label="Phone" value={form.contact} field="phone" onChange={handleChange} />

                    <DetailEditable label="Pick up" value={form.hotel} field="hotel" onChange={handleChange} />

                    <DetailEditable
                        label="Special Note"
                        value={form.special}
                        field="special"
                        onChange={handleChange}
                    />

                    <Detail label="Invoice" value={form.invoice} />
                </div>

                {/* SAVE BUTTON */}
                {isLoading ?
                    <button
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"

                    >
                        <Loading />
                    </button>
                    : <button
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>}
            </div>
        </div>
    );
}



// ========================
// Detail Display Component
// ========================
function Detail({ label, value, href }: { label: string; value: any; href?: string }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>

            {href ? (
                <a
                    href={href}
                    target="_blank"
                    className="font-medium underline text-blue-500 flex items-center gap-2"
                >
                    <div>{value || "-"}</div>
                    <BsArrowUpRightCircleFill />
                </a>
            ) : (
                <span className="font-medium">{value || "-"}</span>
            )}
        </div>
    );
}



// ========================
// Editable Detail Component
// ========================
function DetailEditable({
    label,
    value,
    field,
    href,
    onChange,
}: {
    label: string;
    value: any;
    field: string;
    href?: string;
    onChange?: (field: string, value: any) => void;
}) {
    const [editing, setEditing] = useState(false);

    return (
        <div className="flex justify-between items-center gap-4">
            <span className="text-slate-500">{label}</span>

            {editing ? (
                field == "date" ?
                    <input
                        className="border rounded px-2 py-1 text-sm w-40"
                        value={value || ""}
                        type="date"
                        onChange={(e) => onChange?.(field, e.target.value)}
                        onBlur={() => setEditing(false)}
                        autoFocus
                    />
                    : <input
                        className="border rounded px-2 py-1 text-sm w-40"
                        value={value || ""}
                        onChange={(e) => onChange?.(field, e.target.value)}
                        onBlur={() => setEditing(false)}
                        autoFocus
                    />
            ) : (
                <span
                    className="font-medium cursor-pointer hover:bg-slate-100 px-1 rounded"
                    onClick={() => setEditing(true)}
                >
                    {value || "-"}
                </span>
            )}
        </div>
    );
}
