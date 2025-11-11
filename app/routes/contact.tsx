import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Route } from "./+types/home";
// import Logo from "~/components/logo";

import { toast } from "sonner";
import { ContactService } from "~/services/contactService";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contact - Creative Tour Guru" },
    { name: "description", content: "contact page" },
  ];
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    content: "",
  });

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

  const textFieldStyles = {
    '& .MuiInputBase-input': {
      fontSize: '18px',
      fontWeight: 500, // font-medium
    },
    '& .MuiInputLabel-root': {
      fontSize: '18px',
      fontWeight: 500,
    },
  };



  return (
    <main className="min-h-screen w-full mb-20 relative ">

      {/* content */}


      <div className="md:col-span-7 text-[42px] font-bold container-x">ABOUT US</div>


      <section className="container-x">
        <div className="font-bold text-3xl mb-2">Every journey tells your story.</div>
        <div className="">At Creative Tour Guru Thailand, we don’t just guide tours — we design tailor-made journeys that are personal and meaningful.</div>
        <div className="">Our Private, Tailor-Made, and Customized Tours are carefully crafted to connect you with Thailand’s people, culture, and hidden treasures — one trip at a time.</div>
        <div className="">✨ Travel with heart, discover with meaning.</div>
      </section>

      <section className="container-x mt-4">

        <div className="font-bold text-3xl mb-2">
          Private, Tailor-made & Customized Tours — Designed with Heart.
        </div>

        <div className="">At <span className="font-bold">Creative Tour Guru Thailand</span>
          , we specialize in creating private tours that reflect your personal interests and travel style.
        </div>


        <div className="">
          Every journey is thoughtfully designed — whether it’s a <span className="font-bold">Tailor-made Tour</span>
          , crafted entirely from your ideas, or a<span className="font-bold"> Customized Tour</span>,
          adapted from our signature programs to suit your time, budget, and preferences.
        </div>


        <div className="">
          With over 25 years of experience in tourism, our founder and tour designer ensures that each trip offers authenticity,
          comfort, and meaningful cultural connection.
        </div>


        <div className="">Travel with Heart, Explore with Meaning.</div>
      </section>


      <div className="grid md:grid-cols-12 container-x mt-4
        gap-5  mb-20  h-full overflow-hidden">
        {/* image */}
        <div className="md:col-span-7 text-[42px] font-bold">CONTACT</div>
        <div className="md:block hidden"></div>

        <div className="md:col-span-7 w-full h-full">
          <div className="md:max-h-[640px] overflow-hidden h-full ">
            <img src="/images/thailand3 (3).jpg"
              className="w-full h-full object-cover" alt="3 classic car" />
          </div>

        </div>


        {/* contact form */}
        <div className="md:mt-0 mt-16 md:col-span-5">
          <div className="text-[26px] -mt-3 font-bold">Talk to Creative Tour Guru</div>


          {/* form */}

          <div className="mt-10 text-[18px] font-medium">
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize: "18px",
                gap: 2,
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
                InputLabelProps={{


                  required: false,
                }}
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
                InputLabelProps={{


                  required: false,
                }}
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
                InputLabelProps={{


                  required: false,
                }}
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
                InputLabelProps={{


                  required: false,
                }}
              />
              <TextField
                name="content"
                label="CONTENT"
                variant="outlined"
                className="z-0"
                value={form.content}
                onChange={handleChange}
                multiline
                InputProps={{
                  sx: {
                    borderRadius: 0,
                    fontSize: "18px",
                  },
                }}
                InputLabelProps={{
                  sx: { borderRadius: 0, fontSize: "18px", },

                  required: false,

                }}
                rows={2}
                fullWidth
                required

              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  maxWidth: 250,
                  mt: 1,
                  bgcolor: "var(--primary-color)",
                  border: "2px solid transparent",
                  boxShadow: "none",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "medium",
                  borderRadius: 0,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "white",
                    border: "2px solid var(--primary-color)",
                    boxShadow: "none",
                    color: "var(--primary-color)"
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </main>
  )
}