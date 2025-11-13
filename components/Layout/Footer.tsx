import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Esmaeil Jafari. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/esmaeil-jafari1992/"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-flat rounded-full p-3 neu-hover neu-active transition-all duration-300 text-foreground hover:text-primary"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com/esmaeil_jafari_official"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-flat rounded-full p-3 neu-hover neu-active transition-all duration-300 text-foreground hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=989052672239"
              target="_blank"
              rel="noopener noreferrer"
              className="neu-flat rounded-full p-3 neu-hover neu-active transition-all duration-300 text-foreground hover:text-green-500"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
