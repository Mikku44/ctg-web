import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { FaLine, FaWhatsapp } from "react-icons/fa6";
import { menuConfig } from "~/const/app";

export default function Footer() {
    return (
        <footer className="w-full no-print bg-[#24282e] text-white pt-10 pb-4">
            <div className="container-x grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
                {/* --- Brand --- */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Creative Tour Guru</h2>
                    <p className="text-sm text-white/90">
                        Your personal travel partner across Thailand — offering private tours,
                        professional guides, and unforgettable experiences.
                    </p>
                </div>

                {/* --- Quick Links --- */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                        <li><a href="/" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">Home</a></li>
                        <li><a href="/tours" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">Tours</a></li>
                        <li><a href="/guide-service" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">Guide Service</a></li>
                        <li><a href="/our-service" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">Our Service</a></li>
                        {/* <li><a href="/about" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">About Us</a></li> */}
                        <li><a href="/contact" className="hover:text-white border-b-2 hover:border-orange-500 border-transparent duration-200">Contact</a></li>
                    </ul>
                </div>

                {/* --- Services --- */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Our Services</h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                        {menuConfig.slice(0,5).map((section) => (
                            <li key={section.label}>
                                <Link
                                    to={section?.links?.[0]?.href ?? "#"}
                                    className="hover:text-white transition  duration-200 hover:border-b"
                                >
                                    {section.label}
                                </Link>
                            </li>
                        ))}

                        {/* Optional: add a dedicated guide link */}
                        <li>
                            <Link to="/guide-service" className="hover:text-white transition  duration-200 hover:border-b">
                                Private Local Expert Guide
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* --- Contact --- */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                    <ul className="space-y-3 text-white/90 text-sm">
                        <Link to="tel:+66615097533" target="_blank" className="flex items-center gap-2 hover:underline underline-offset-2">
                            <Phone size={16} /> +66 615 097533
                        </Link >
                        <Link to="mailto:creativetourguru@hotmail.com" target="_blank" className="flex items-center gap-2 hover:underline underline-offset-2">
                            <Mail size={16} /> creativetourguru@hotmail.com
                        </Link>
                        <Link to="https://maps.google.com/maps?q=13.812544,100.360551" target="_blank" className="flex items-start gap-2 hover:underline underline-offset-2">
                            <MapPin size={16} className="size-5 min-w-4" /> Casa-Presto  Wongwaen Pinklao , Moo 3 Sala Klang Subdistrict , Bang Kruai District, Nonthaburi 11130, Thailand
                        </Link>
                    </ul>


                    {/* Socials */}
                    <div className="flex gap-4 mt-4">
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/+66615097533"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="WhatsApp"
                        >
                            <FaWhatsapp size={18} />
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+66615097533"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="Call us"
                        >
                            <Phone size={18} />
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:creativetourguru@hotmail.com"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="Send email"
                        >
                            <Mail size={18} />
                        </a>

                        {/* LINE */}
                        <a
                            href="https://line.me/ti/p/Z-jqyT7THX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="Chat on LINE"
                        >
                            <FaLine size={18} />
                        </a>
                    </div>

                    {/* verified */}
                    <div className=" mt-4">
                        <a href="/license/dbd" target="_blank"><img src="/licenese/dbd.webp" className="max-w-[150px]" alt="dbd verified" /></a>
                    </div>

                    {/*  */}
                    <div className="bg-white rounded-xl">
                        <img src="/licenese/stripe-badge-transparent.webp" alt="creativetourguru thailand security payment with stripe" />
                    </div>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="container-x mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center text-sm text-white/80">
                <p>© {new Date().getFullYear()} Creative Tour Guru. All Rights Reserved.</p>
                <p className=" space-x-2 ">

                    <a
                        href="/terms-of-use"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white border-r px-3"
                    >
                        Terms of use
                    </a>
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        Privacy policy
                    </a>
                </p>
            </div>
        </footer>
    );
}
