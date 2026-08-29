import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/esmaeil-jafari1992/",
    icon: FaLinkedin,
    label: "LinkedIn",
    hoverColor: "hover:text-blue-400 hover:border-blue-400/30",
  },
  {
    href: "https://instagram.com/esmaeil_jafari_official",
    icon: FaInstagram,
    label: "Instagram",
    hoverColor: "hover:text-pink-400 hover:border-pink-400/30",
  },
  {
    href: "https://api.whatsapp.com/send?phone=989052672239",
    icon: FaWhatsapp,
    label: "WhatsApp",
    hoverColor: "hover:text-green-400 hover:border-green-400/30",
  },
];

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}{" "}
              <span className="gradient-text font-semibold">Esmaeil Jafari</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Crafted with passion & precision
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-500 border border-white/5 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.hoverColor}`}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
