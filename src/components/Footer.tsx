import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/logo/enlightlogo.png"
                className="h-16"
                alt="Enlight Logo"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We make
              dreams come true.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Awards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              More Information
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  All Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-1 text-blue-600 flex-shrink-0"
                />
                <span>123 Main Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-600 flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-600 flex-shrink-0" />
                <span>contact@flexhome.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Enlight Property. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <select className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <select className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
