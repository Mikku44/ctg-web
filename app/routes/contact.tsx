import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { Route } from "./+types/home";
// import Logo from "~/components/logo";

import { toast } from "sonner";
import { ContactService } from "~/services/contactService";
import { grey } from "@mui/material/colors"; // Assuming you have MUI colors available

// Define primary color variable once (replace with your actual primary color variable if needed)
const PRIMARY_COLOR = "var(--primary-color)"; // Example: A deep green for a premium, earthy feel

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

  return (
    <main className="min-h-screen w-full mb-20 relative">

      <section className="container-x mx-auto">
        <img
          className="w-[350px] mx-auto"
          src="/logo/logo.jpg" alt="creative tour guru logo" />


        <div className="mx-auto w-fit">
          <div className="">Tel : +6699-321-0694 (WhatsApp)</div>
          <div className="">Email : creativetourguru@hotmail.com</div>
        </div>


      </section>

      <section className="container-x mx-auto mt-24 gap-2 grid md:grid-cols-2">
        <div className="">
          {/* <h1 className="text-3xl font-medium">Welcome travelers all around the world</h1> */}
          <p className="text-4xl text-center py-5">"Every journey tells your story"</p>
          <p className="text-xl">At Creative Tour Guru Thailand, we don’t just guide tours —
            <b>we design tailor-made journeys</b> that are personal and meaningful.</p>
          <br />
          <p className="text-xl">Our Private, <b>Tailor-Made, and Customized Tours</b> are carefully crafted to connect you
            with Thailand’s people, culture, and hidden treasures — one trip at a time.</p>
        </div>

        <div className="">
          <img src="/images/thailand3 (3).jpg" alt="creative tour guru gallery" />
        </div>
      </section>



      <section className="container-x mx-auto mt-24 gap-2 grid md:grid-cols-2">
        <div className="">

          <img src="/images/9-awards.png" alt="creative tour guru gallery" />
        </div>

        <div className="">
          {/* <h1 className="text-3xl font-medium">Welcome travelers all around the world</h1> */}
          <p className="text-4xl text-center py-5">Received an award from Thailand Tourism Awards 9th</p>
          <p className="text-xl"><b>Creative Tour Guru Thailand</b>, we received an award from "Thailand Tourism Awards 9th"</p>
          <br />
          <p className="text-xl"><b>Thailand Tourism Awards</b>Recipient of the Kinnaree Award 2013 (Thailand Tourism Awards) – Best Tour Guide Category.
            Awarded by the Tourism Authority of Thailand (TAT) for outstanding professionalism, cultural knowledge, and exceptional service excellence.</p>
        </div>


      </section>


      <section className="container-x mx-auto mt-24 gap-2 md:grid-cols-3 grid">
        <div className="">

          <img src="/images/thailand4 (7).jpg" alt="creative tour guru thailand tourism award gallery" />
        </div>
        <div className="">

          <img src="/images/album911 (67).jpg" alt="creative tour guru thailand tourism award gallery" />
        </div>
        <div className="">

          <img src="/images/trips_boat (2).jpg" alt="creative tour guru guide with sign" />
        </div>
      </section>


      <section className="container-x mx-auto mt-24 gap-2 grid md:grid-cols-2">
        <div className="">

          {/* <img src="/images/album911 (67).jpg" alt="creative tour guru founder" /> */}
          <img src="/images/thailand3 (1).jpg" alt="creative tour guru founder" />

        </div>

        <div className="">
          {/* <h1 className="text-3xl font-medium">Welcome travelers all around the world</h1> */}
          <p className="text-4xl text-center py-5">About the Founder </p>
          <p className="text-xl"><b>Dr. Prawit (Audi) Charoennuam</b><br />
            Founder & Experienced Tour Designer</p>
          <br />
          <div className="space-y-4">
            <p className="text-xl">Hello, I’m <b>Audi</b>, founder of Creative Tour Guru Thailand.
              For more than 25 years, I’ve been guiding travelers from all over the world to experience the real Thailand —
              from ancient temples and floating markets to charming local villages.</p>
          
            <p className="text-xl">I started as a <b>Tour Guide</b>, then became a <b>Tour Leader, Tour Manager</b>, and finally an <b>Experienced Tour Designer</b>,
              creating tailor-made journeys that blend culture, comfort, and connection.</p>
          </div>


          <div className="md:columns-3 space-y-1 mt-4">

            <img src="/images/thailand3 (5).jpg" alt="creative tour guru founder" />
            <img src="/images/bangkok (4).jpg" alt="creative tour guru founder" />
            <img src="/images/train (8).jpg" alt="creative tour guru founder" />

          </div>

          <div className="space-y-4">
            <p className="text-xl mt-5">
              As a<b> Kinnaree Awarded Tour Guide (TAT)</b> and a <p>Doctor of Philosophy in Recreation, Tourism, and Sports Management,</p> I combine academic knowledge with heartfelt experience.
              Every tour I design carries one belief — <b>travel should feel personal, meaningful, and full of joy.</b>
            </p>
            <p className="text-xl">✨ Travel with a Professional, Feel like a Friend.</p>
            <div className="grid gap-2">
              <img src="/licenese/drp.png" className="w-[100px]" alt="dr.prawit" />
              <h3 className="text-sm text-zinc-600">By Dr. Prawit (Audi) Charoennuam</h3>
            </div>
          </div>
        </div>


      </section>


      <div className="grid mt-10 max-w-4xl mx-auto gap-10 md:gap-16 mb-20 h-full overflow-hidden">


        <div className="md:col-span-5 order-2 md:order-1">
          <Typography variant="h4" sx={{
            fontSize: '26px',
            fontWeight: 700,
            mb: 4,

          }}>
            Talk to Creative Tour Guru
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