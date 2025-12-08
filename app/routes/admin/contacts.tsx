import { useState } from "react";
import { useLoaderData, useFetcher, redirect } from "react-router";
import type { Contact } from "~/models/contactModel";
import { ContactService } from "~/services/contactService";
import type { Route } from "./+types/contacts";

// --- Loader & Action ---

export async function loader() {
    const contacts = await ContactService.getAll();
    return { contacts };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "update-status") {
        const id = formData.get("id")!.toString();
        const status : "read" | "unread" | "done" | "progress" | undefined = formData.get("status")!.toString() as any;

        await ContactService.update(id, { status });

        return null; // Returning null automatically triggers the loader to re-fetch data
    }

    return redirect("/admin/contacts");
}

// --- Main Page Component ---

export default function ContactsListPage() {
    const { contacts } = useLoaderData<typeof loader>();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">All Contacts</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden bg-zinc-50">
                    <thead>
                        <tr className="border-b bg-slate-200 border-b-zinc-200  text-left">
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Mobile</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c: any) => (
                            <ContactRow
                                key={c.id}
                                contact={c}
                                onRowClick={() => setSelectedContact(c)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedContact && (
                <ContactDetailModal
                    contact={selectedContact}
                    onClose={() => setSelectedContact(null)}
                />
            )}
        </div>
    );
}

// --- Sub Components ---

function ContactRow({
    contact,
    onRowClick,
}: {
    contact: any;
    onRowClick: () => void;
}) {
    const fetcher = useFetcher();

    // Optimistic UI:
    // If we are currently submitting a status change for this row,
    // use the value from the form data immediately. Otherwise use the DB value.
    const optimisticStatus = fetcher.formData?.get("status") 
        ? fetcher.formData.get("status") as string 
        : contact.status;

    const isUpdating = fetcher.state !== "idle";

    return (
        <tr
            className="hover:bg-slate-50 cursor-pointer"
            onClick={onRowClick}
        >
            <td className="px-6 py-4">{contact.name}</td>
            <td className="px-6 py-4">{contact.email}</td>
            <td className="px-6 py-4">{contact.mobile || "-"}</td>

            {/* Status badge */}
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusClasses(optimisticStatus)}`}>
                    {optimisticStatus}
                </span>
            </td>

            {/* Dropdown with Fetcher */}
            <td className="px-6 py-4">
                <fetcher.Form method="post" onClick={(e) => e.stopPropagation()}>
                    <input type="hidden" name="intent" value="update-status" />
                    <input type="hidden" name="id" value={contact.id} />
                    
                    <select
                        name="status"
                        value={optimisticStatus}
                        onChange={(e) => {
                            // Automatically submit the form when the selection changes
                            fetcher.submit(e.target.form);
                        }}
                        // Optional: Disable only if you want to prevent rapid changes, 
                        // strictly speaking not needed with optimistic UI
                        // disabled={isUpdating} 
                        className={`block w-full text-sm border border-slate-300 rounded-md py-1.5 pl-3 pr-8 transition-opacity ${
                            isUpdating ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        {CONTACT_STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                        ))}
                    </select>
                </fetcher.Form>
            </td>
        </tr>
    );
}

const CONTACT_STATUSES = ["unread", "read", "progress", "done"] as const;

function getStatusClasses(status?: string) {
    switch (status) {
        case "unread":
            return "bg-red-100 text-red-700";
        case "read":
            return "bg-blue-100 text-blue-700";
        case "progress":
            return "bg-yellow-100 text-yellow-700";
        case "done":
            return "bg-green-100 text-green-700";
        default:
            return "bg-gray-100 text-gray-600";
    }
}

function ContactDetailModal({
    contact,
    onClose,
}: {
    contact: any;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-3 right-3 text-slate-600 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Contact Detail</h2>

                <div className="space-y-3 text-sm">
                    <Detail label="Name" value={contact.name} />
                    <Detail label="Mobile" value={contact.mobile} />
                    <Detail label="Email" value={contact.email} />
                    <Detail label="Subject" value={contact.subject} />
                    <Detail label="Type" value={contact.type} />
                    <Detail label="Status" value={contact.status} />
                    <Detail label="Content" value={contact.content} />
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium">{value || "-"}</span>
        </div>
    );
}