import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { FaLine, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mainMenu = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "Guide Service", path: "/guide-service" },
    { name: "Boat Service", path: "/boat-service" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  const tourCategories = [
    { name: "Half Day Tours", path: "/tours/half-day/all" },
    { name: "Full Day Tours", path: "/tours/full-day/all" },
    { name: "Specialty Tours", path: "/tours/specialty/local-experience" },
    { name: "Night Tours", path: "/tours/unseen/night-tour" },
    { name: "Dinner Cruises", path: "/tours/dinner-cruise/all" },
  ];

  const destinations = [
    { name: "Bangkok", path: "/search?query=bangkok" },
    { name: "Chiang Mai", path: "/search?query=chiang-mai" },
    { name: "Phuket", path: "/search?query=phuket" },
    { name: "Ayutthaya", path: "/search?query=ayutthaya" },
    { name: "Kanchanaburi", path: "/search?query=kanchanaburi" },
    // { name: "Chiang Rai", path: "/search?query=chiang-rai" },
  ];

  const socialLinks = [
    {
      icon: FaWhatsapp,
      href: "https://wa.me/+66615097533",
      label: "WhatsApp",
      ariaLabel: "Contact us on WhatsApp",
    },
    {
      icon: FaLine,
      href: "https://line.me/ti/p/Z-jqyT7THX",
      label: "LINE",
      ariaLabel: "Chat with us on LINE",
    },
    {
      icon: Mail,
      href: "mailto:creativetourguru@hotmail.com",
      label: "Email",
      ariaLabel: "Send us an email",
    },
    {
      icon: Phone,
      href: "tel:+66615097533",
      label: "Phone",
      ariaLabel: "Call us",
    },
  ];

  return (
    <footer className="w-full no-print bg-white text-slate-900">
      {/* Main Footer Content */}
      <div className="border-t border-slate-200">
        <div className="container-x py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="size-[80px]">
                <img 
                src="/logo/ctg-logo-modern.jpg"
                 alt="Creative Tour Guru Modern Logo" />
              </div>
              <h2 className="text-xl font-light tracking-tight text-slate-900">
                Creative Tour Guru
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Your personal travel partner across Thailand — offering private tours, professional guides, and unforgettable experiences.
              </p>
              {/* Trust Badges */}
              <div className="flex flex-col gap-3">
                <a 
                  href="/license/dbd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/licenese/dbd.webp" 
                    alt="DBD verified business" 
                    className="max-w-[140px] h-auto"
                  />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6 tracking-wide uppercase">
                Navigation
              </h3>
              <ul className="space-y-3">
                {mainMenu.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour Types */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6 tracking-wide uppercase">
                Tour Types
              </h3>
              <ul className="space-y-3">
                {tourCategories.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6 tracking-wide uppercase">
                Destinations
              </h3>
              <ul className="space-y-3">
                {destinations.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6 tracking-wide uppercase">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+66615097533"
                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <Phone size={16} className="flex-shrink-0" />
                    <span>+66 615 097533</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:creativetourguru@hotmail.com"
                    className="flex items-start gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <Mail size={16} className="flex-shrink-0 mt-0.5" />
                    <span>creativetourguru@hotmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/maps?q=13.812544,100.360551"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span className="text-xs">
                      Casa-Presto, Wongwaen Pinklao, Bang Kruai District, Nonthaburi 11130
                    </span>
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ icon: Icon, href, ariaLabel }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={ariaLabel}
                    className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Stripe Badge */}
              <div className="mt-6 bg-slate-50 rounded-lg p-3 inline-flex">
                <img
                  src="/licenese/stripe-badge-transparent.webp"
                  alt="Secure payments with Stripe"
                  className=" w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container-x py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>© {currentYear} Creative Tour Guru. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-200"
              >
                Terms of Use
              </a>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}