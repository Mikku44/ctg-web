"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { FaWhatsapp, FaLine } from "react-icons/fa";
import { Link } from "react-router";

export default function TourBookingForm({ tour, price,cover }: { tour?: string; price?: number ,cover?:string}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    date: "",
    people: "",
    hotel: "",
    special: "",
  });

  const totalPrice = price && formData.people ? price * parseInt(formData.people) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", { ...formData, tour });
    alert("Your booking request has been sent!");
  };

  return (
    <div className="min-h-screen container-x md:py-12 py-4">
      <div className=" mx-auto bg-white  overflow-hidden grid md:grid-cols-2">

        {/* Left: Contact Info */}
        <div className=" w-full flex flex-col justify-center  space-y-6">

          <div className="w-full h-full rounded-sm overflow-hidden">
            <img
            className="w-full h-full object-cover"
            src={cover}
             alt={tour} />
          </div>
          <h3 className="font-semibold text-xl">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <Link to="tel:0993210694" className="flex items-center gap-2">
              <Phone size={16} /> 099 321 0694
            </Link>
            <Link to="mailto:creativetourguru@hotmail.com" className="flex items-center gap-2">
              <Mail size={16} /> creativetourguru@hotmail.com
            </Link>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Bangkok, Thailand
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a href="https://wa.me/0993210694" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition" title="WhatsApp">
              <FaWhatsapp size={18} />
            </a>
            <a href="tel:0993210694" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition" title="Call us">
              <Phone size={18} />
            </a>
            <a href="mailto:creativetourguru@hotmail.com" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition" title="Send email">
              <Mail size={18} />
            </a>
            <a href="https://line.me/ti/p/~0993210694" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition" title="Chat on LINE">
              <FaLine size={18} />
            </a>
          </div>
        </div>

        {/* Right: Booking Form */}
        <form onSubmit={handleSubmit} className=" p-4 space-y-6">
          <h3 className="text-gray-800 font-medium text-4xl mb-4">Book Your Tour</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="contact">
              Contact Number <span className="text-red-600">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              placeholder="Phone / WhatsApp / Line"
              value={formData.contact}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                Tour Date <span className="text-red-600">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="people">
                Number of Guests <span className="text-red-600">*</span>
              </label>
              <input
                id="people"
                name="people"
                type="number"
                min="1"
                placeholder="No. of Guests"
                value={formData.people}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="hotel">
              Hotel for Pick-Up
            </label>
            <input
              id="hotel"
              name="hotel"
              placeholder="Hotel for Pick-Up"
              value={formData.hotel}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="special">
              Special Requirements
            </label>
            <textarea
              id="special"
              name="special"
              placeholder="Special Requirements"
              rows={4}
              value={formData.special}
              onChange={handleChange}
              className="input resize-none"
            />
          </div>

          {price && formData.people && (
            <div className="p-4 bg-gray-100  flex justify-between text-gray-800">
              <div>Price per person: <strong>฿{price.toLocaleString()}</strong></div>
              <div>Total: <strong>฿{totalPrice.toLocaleString()}</strong></div>
            </div>
          )}

          <button type="submit" className="w-full py-3 button text-white font-medium ">
            Continue
          </button>
        </form>

      </div>
    </div>
  );
}
