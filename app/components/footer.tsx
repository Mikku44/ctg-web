import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { FaLine, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white pt-10 pb-4">
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
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/tours" className="hover:text-white">Tours</a></li>
                        <li><a href="/guide-service" className="hover:text-white">Guide Service</a></li>
                        <li><a href="/about" className="hover:text-white">About Us</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* --- Services --- */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Our Services</h3>
                    <ul className="space-y-2 text-white/90 text-sm">
                        <li>Private Thailand Tours</li>
                        <li>Airport Transfers</li>
                        <li>English-Speaking Guides</li>
                        <li>Custom Travel Planning</li>
                        <li>Adventure & Island Trips</li>
                    </ul>
                </div>

                {/* --- Contact --- */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                    <ul className="space-y-3 text-white/90 text-sm">
                        <Link to="tel:0993210694" target="_blank" className="flex items-center gap-2">
                            <Phone size={16} /> 099 321 0694
                        </Link >
                        <Link to="mailto:creativetourguru@hotmail.com" target="_blank" className="flex items-center gap-2">
                            <Mail size={16} /> creativetourguru@hotmail.com
                        </Link>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} /> Bangkok, Thailand
                        </li>
                    </ul>

                    {/* Socials */}
                    <div className="flex gap-4 mt-4">
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/66993210694"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="WhatsApp"
                        >
                            <FaWhatsapp size={18} />
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:0993210694"
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
                            href="https://line.me/ti/p/~0993210694"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                            title="Chat on LINE"
                        >
                            <FaLine size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="container-x mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center text-sm text-white/80">
                <p>© {new Date().getFullYear()} Creative Tour Guru. All Rights Reserved.</p>
                {/* <p>
                    Designed & Developed by{" "}
                    <a
                        href="https://khain.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        Khain.app
                    </a>
                </p> */}
            </div>
        </footer>
    );
}
