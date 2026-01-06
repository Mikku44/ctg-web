import { Button, TextField, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { toast } from "sonner";
import ImageViewer from "~/components/ImageViewer";
import { ContactService } from "~/services/contactService";
import type { Route } from "../+types/root";

const PRIMARY_COLOR = "var(--primary-color)";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Private Boat & Longtail Boat Charter - Creative Tour Guru" },
        { name: "description", content: "Bangkok private boat, canal tour, longtail boat charter service." },
    ];
}

export default function BoatService() {
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        subject: "",
        content: "",
        type: "Boat Charter Service",
    });

    const textFieldStyles = {
        '& .MuiInputBase-input': {
            fontSize: '1rem',
            fontWeight: 500,
        },
        '& .MuiInputLabel-root': {
            fontSize: '1rem',
            fontWeight: 500,
            color: grey[700],
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: grey[400],
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: PRIMARY_COLOR,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: PRIMARY_COLOR,
        },
    };

    const contentFieldStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            fontSize: '1rem',
            '& fieldset': { borderColor: grey[400] },
            '&:hover fieldset': { borderColor: PRIMARY_COLOR },
            '&.Mui-focused fieldset': { borderColor: PRIMARY_COLOR },
        },
        '& .MuiInputLabel-root': {
            fontSize: '1rem',
            fontWeight: 500,
            color: grey[700],
        },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isFormValid = Object.values(form).every((v) => v.trim() !== "");
        if (!isFormValid) return toast.error("All fields are required.");

        toast.promise(ContactService.create(form), {
            loading: "Submitting...",
            success: (result: any) => `Message sent successfully!\n Ticket ID: ${result.id}`,
            error: "Something went wrong. Please try again.",
        });
    };

    const scrollToBottom = () => {
        document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="min-h-screen bg-white">

            {/* HERO */}
            <section className="container-x py-16">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="h-[600px] overflow-hidden">
                        <img
                            src="/images/longtail.jpg"
                            className="w-full h-full object-cover"
                            alt="Private longtail boat charter Bangkok"
                        />
                    </div>

                    <div className="space-y-5">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Private Boat & Longtail Boat Charter
                        </h1>

                        <p className="text-gray-700 leading-relaxed">
                            Discover Bangkok from a completely new perspective with our private longtail boats
                            and river speedboats. Cruise along the Chao Phraya River and explore hidden canals,
                            floating life, and peaceful local neighborhoods — all at your own pace.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Ideal for couples, families, small groups, and anyone seeking an
                            exclusive and authentic Bangkok experience.
                        </p>

                        {/* OPTIONS */}
                        <div className="space-y-3 text-gray-700">
                            <p className="font-semibold text-lg">Available Options</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Private Longtail Boat (1–10 guests)</li>
                                <li>Private River Speedboat</li>
                                <li>Solar powered boat</li>
                                <li>Sunset Cruise (Private)</li>
                                <li>Canal Life Experience – Bangkok Noi, Khlong Mon, Thonburi</li>
                            </ul>
                        </div>

                        {/* INCLUDES */}
                        <div className="space-y-3 text-gray-700">
                            <p className="font-semibold text-lg">Includes</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Private captain</li>
                                <li>Fuel</li>
                                <li>Life jackets</li>
                                <li>Bottled water</li>
                                <li>(Guide optional)</li>
                            </ul>
                        </div>

                        <button
                            onClick={scrollToBottom}
                            className="button text-white font-medium px-6 py-3 transition duration-200"
                        >
                            Book a Boat
                        </button>
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="bg-gray-50 border-t border-gray-100 py-16">
                <div className="container-x">
                    <ImageViewer
                        className="columns-3"
                        images={[
                            "/images/longtail1.jpg",
                            "/images/kohphiphi (26).jpg",
                            "/images/canal.jpg",
                            "/images/images.jpg",
                            "/images/speedboat.jpeg",
                            "/images/speedboat.webp",
                            "/images/solar.jpg",
                          
                        ]}
                    />
                </div>
            </section>

            {/* FORM */}
            <div id="form" className="grid mt-10 max-w-4xl mx-auto gap-10 mb-20 px-4">

                <div>
                    <Typography variant="h4" sx={{ fontSize: '26px', fontWeight: 700, mb: 4 }}>
                        Book Your Private Boat Charter
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField name="name" label="NAME" variant="standard" value={form.name} onChange={handleChange} fullWidth sx={textFieldStyles} required />
                        <TextField name="mobile" label="MOBILE" variant="standard" value={form.mobile} onChange={handleChange} fullWidth sx={textFieldStyles} required />
                        <TextField name="email" label="EMAIL" variant="standard" value={form.email} onChange={handleChange} fullWidth sx={textFieldStyles} required />
                        <TextField name="subject" label="SUBJECT" variant="standard" value={form.subject} onChange={handleChange} fullWidth sx={textFieldStyles} required />

                        <TextField
                            name="content"
                            label="MESSAGE"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={form.content}
                            onChange={handleChange}
                            fullWidth
                            sx={contentFieldStyles}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                bgcolor: PRIMARY_COLOR,
                                border: `2px solid ${PRIMARY_COLOR}`,
                                color: "white",
                                fontWeight: 600,
                                borderRadius: 0,
                                py: 1.5,
                                "&:hover": {
                                    bgcolor: "white",
                                    color: PRIMARY_COLOR,
                                    border: `2px solid ${PRIMARY_COLOR}`,
                                },
                            }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </div>

            </div>
        </main>
    );
}
