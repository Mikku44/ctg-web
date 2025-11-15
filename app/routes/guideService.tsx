import { Button, TextField, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { toast } from "sonner";
import ImageViewer from "~/components/ImageViewer";
import { ContactService } from "~/services/contactService";
import type { Route } from "../+types/root";

const PRIMARY_COLOR = "var(--primary-color)"; // Example: A deep green for a premium, earthy feel

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Guide Service - Creative Tour Guru" },
        { name: "description", content: "Guide Service page" },
    ];
}


export default function GuideService() {

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        subject: "",
        content: "",
    });

    // Styles for the standard text fields
    const textFieldStyles = {
        '& .MuiInputBase-input': {
            fontSize: '1rem', // Smaller, cleaner font size
            fontWeight: 500,
        },
        '& .MuiInputLabel-root': {
            fontSize: '1rem',
            fontWeight: 500,
            color: grey[700], // Muted label color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: grey[400], // Lighter separator line
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: PRIMARY_COLOR,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: PRIMARY_COLOR,
        },
    };

    // Styles for the multiline content text field (Outlined variant)
    const contentFieldStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            fontSize: '1rem',
            '& fieldset': {
                borderColor: grey[400],
            },
            '&:hover fieldset': {
                borderColor: PRIMARY_COLOR,
            },
            '&.Mui-focused fieldset': {
                borderColor: PRIMARY_COLOR,
            },
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

        // 1. Basic client-side validation check
        const isFormValid = Object.values(form).every(value => value.trim() !== "");

        if (!isFormValid) {
            toast.error("All fields are required. Please fill them out.");
            return; // Stop the function if validation fails
        }

        // 2. Wrap API call with toast.promise as before
        toast.promise(
            ContactService.create(form),
            {
                loading: "Submitting...",
                success: (result: any) => `Message sent successfully!\n Your ticket ID: ${result.id}`,
                error: "Something went wrong. Please try again.",
            }
        );
    };

      const scrollToBottom = () => {
    const el = document.getElementById("form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="container-x py-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-[600px] overflow-hidden">
                        <img
                            src="/images/album911 (68).jpg"
                            className="w-full h-full object-cover"
                            alt="Creative Tour Guru - Guide Service"
                        />
                    </div>

                    <div className="space-y-5">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Guide Service in Thailand
                        </h1>
                        <p className="text-gray-700 leading-relaxed">
                            Hire a professional English-speaking guide to accompany your
                            private journey across Thailand — knowledgeable, caring, and
                            certified by the Tourism Authority of Thailand (TAT).
                        </p>

                        <div className="space-y-2 text-gray-700">
                            <p className="font-semibold">🇹🇭 Around Thailand Tour</p>
                            <p>
                                <strong>Route:</strong> Bangkok – Ayutthaya – Chiang Mai – Phuket
                                (10 Days)
                            </p>
                            <p>
                                The ultimate Thailand experience — from royal palaces and
                                floating markets to northern temples and southern beaches.
                            </p>
                        </div>

                        <button 
                        onClick={scrollToBottom}
                        className="button text-white font-medium px-6 py-3 transition duration-200">
                            Hire a Guide
                        </button>
                    </div>
                </div>
            </section>

            {/* cert */}
            <section className="container-x grid md:grid-cols-2 gap-10 items-center py-10">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Tourism Business License Information
                    </h2>

                    <p><strong>License No.:</strong> 14/04357</p>

                    <p>
                        Issued by the Registrar of Tourism Businesses and Tour Guides (Central Region),
                        Department of Tourism, Thailand.
                    </p>

                    <p>
                        This license is granted to <strong>Creative Tour Guru (Thailand) Co., Ltd.</strong><br />
                        Corporate Registration No.: <strong>0125563000485</strong>
                    </p>

                    <p>
                        Authorized to operate a tourism business under Section 15 of the Tourism Business and
                        Tour Guide Act B.E. 2551 (2008).
                    </p>

                    <p><strong>Business Type:</strong> Inbound Tour Operator</p>

                    <p>
                        Registered Thai Name:<br />
                        <strong>บริษัท ครีเอทีฟ ทัวร์ กูรู (ไทยแลนด์) จำกัด</strong>
                    </p>

                    <p>
                        Registered English Name:<br />
                        <strong>CREATIVE TOUR GURU (THAILAND) COMPANY LIMITED</strong>
                    </p>

                    <p>
                        <strong>Registered Office Address:</strong><br />
                        81/215 Daza Presto Wongwaen Pinklao Village, Moo 3<br />
                        Sala Klang Subdistrict, Bang Kruai District<br />
                        Nonthaburi, 11130, Thailand
                    </p>

                    <p>
                        <strong>Validity:</strong> 17 April 2024 – 16 April 2026
                    </p>
                </div>

                <div className="flex justify-center">
                    <img
                        src="/licenese/cert.jpg"
                        alt="Tourism business license - Creative Tour Guru"
                        className="rounded-lg shadow-lg border"
                    />
                </div>
            </section>


            {/* Features Section */}
            <section className="bg-gray-50 border-t border-gray-100 py-16">
                <div className="container-x text-center">
                    {/* <h2 className="text-2xl font-bold mb-6">
                        Some of our customer gallery
                    </h2> */}

                    <ImageViewer
                        className="columns-3"
                        images={[
                            "/images/thailand2 (5).jpg",
                            "/images/thailand6 (2).jpg",
                            "/images/thailand2 (4).jpg",
                            "/images/album911 (77).jpg",
                            "/images/album911 (76).jpg",
                            "/images/album911 (66).jpg",
                            "/images/album911 (22).jpg",
                            "/images/album911 (14).jpg",
                            "/images/album911 (3).jpg",
                            "/images/album911 (6).jpg",
                            "/images/album911 (11).jpg",
                            "/images/album911 (12).jpg",
                            "/images/album911 (16).jpg",
                            "/images/album911 (22).jpg",
                            "/images/album911 (31).jpg",
                            "/images/album911 (26).jpg",
                            "/images/album911 (33).jpg",
                            "/images/album911 (49).jpg",
                            "/images/album911 (53).jpg",
                            "/images/album911 (58).jpg",
                            "/images/album911 (64).jpg",
                            "/images/album911 (63).jpg",
                            "/images/album911 (69).jpg",
                            "/images/bangkok (24).jpg",
                            "/images/beach (12).jpg",
                            "/images/boat (14).jpg",
                            "/images/boat (9).jpg",
                            "/images/chaingmai (4).jpg",
                            "/images/chaingmai (3).jpg",
                            "/images/chaingmai_3 (1).jpg",
                            "/images/chaingmai_3 (14).jpg",
                            "/images/chaingmai_3 (19).jpg",
                            "/images/chaingmai_3 (26).jpg",
                            "/images/chaingmai_3 (33).jpg",
                            "/images/chaingmai_3 (32).jpg",
                            "/images/kohphiphi (9).jpg",
                            "/images/kohphiphi (10).jpg",
                            "/images/kohphiphi (23).jpg",
                            "/images/kohphiphi (27).jpg",
                            "/images/kohphiphi (33).jpg",
                        ]} />

                    {/* <div className="columns-3 gap-5">


                        {[
                            "/images/thailand2 (5).jpg",
                            "/images/thailand6 (2).jpg",
                            "/images/thailand2 (4).jpg",
                            "/images/album911 (77).jpg",
                            "/images/album911 (76).jpg",
                            "/images/album911 (66).jpg",
                            "/images/album911 (22).jpg",
                        ].map((item, index) => <div
                            key={index}
                            className=" bg-white mt-5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                            <img
                                src={item}
                                className="w-full h-auto object-cover"
                                alt="Flexible schedules"
                            />

                        </div>)}



                    </div> */}
                </div>
            </section>

            <div 
            id="form"
            className="grid mt-10 max-w-4xl mx-auto gap-10 md:gap-16 mb-20 h-full overflow-hidden">


                <div className="md:col-span-5 order-2 px-4 md:order-1">
                    <Typography variant="h4" sx={{
                        fontSize: '26px',
                        fontWeight: 700,
                        mb: 4,

                    }}>
                        Hire Guide with Creative Tour Guru
                    </Typography>


                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3, // Increased gap for better spacing
                        }}
                    >
                        <TextField
                            name="name"
                            label="NAME"
                            variant="standard"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            sx={textFieldStyles}
                            required
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            name="mobile"
                            label="MOBILE"
                            variant="standard"
                            value={form.mobile}
                            onChange={handleChange}
                            fullWidth
                            sx={textFieldStyles}
                            required
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            name="email"
                            label="EMAIL"
                            variant="standard"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            sx={textFieldStyles}
                            required
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            name="subject"
                            label="SUBJECT"
                            variant="standard"
                            value={form.subject}
                            onChange={handleChange}
                            fullWidth
                            sx={textFieldStyles}
                            required
                            InputLabelProps={{ required: false }}
                        />
                        <TextField
                            name="content"
                            label="CONTENT"
                            variant="outlined"
                            className="z-0"
                            value={form.content}
                            onChange={handleChange}
                            multiline
                            rows={4} // Increased rows for content
                            fullWidth
                            required
                            sx={contentFieldStyles} // Use new outlined styles
                            InputLabelProps={{ required: false }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                // maxWidth: 280, // Slightly wider button
                                mt: 2,
                                bgcolor: PRIMARY_COLOR, // Use consistent primary color
                                border: `2px solid ${PRIMARY_COLOR}`,
                                boxShadow: "none",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 600, // Semi-bold for emphasis
                                borderRadius: 0,
                                py: 1.5,
                                transition: 'all 0.3s',
                                "&:hover": {
                                    bgcolor: "white",
                                    border: `2px solid ${PRIMARY_COLOR}`,
                                    boxShadow: "none",
                                    color: PRIMARY_COLOR
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
