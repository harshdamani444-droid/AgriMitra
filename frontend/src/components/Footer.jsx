import React from "react";
import { Mail, Phone, MapPin, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8" />
              <span className="text-xl font-bold">Agrimitra</span>
            </Link>
            <p className="text-green-200">
              Empowering farmers with technology and sustainable solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>agrimitraofficial@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Rural Agro Road, Anand, Gujarat, India</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-green-200">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-green-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-green-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p>&copy; 2025 Agrimitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
