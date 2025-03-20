import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A5F] text-white py-10 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-6 lg:mb-0">
          <img src="/logo-light.png" alt="Company Logo" className="h-24" />
        </div>
        {/* Contact & Links Section */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 text-sm lg:text-base">
          {/* Contact Info */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold lg:text-start text-center text-yellow-400">Contact Us</h3>
            <p><a href="mailto:kprep.contact@gmail.com" className="hover:underline">kprep.contact@gmail.com</a></p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold lg:text-start text-center text-yellow-400">Quick Links</h3>
            <ul className="space-y-1 lg:text-start text-center">
              <li><a href="https://forms.gle/TFTkZvFmGtjb9imW7" className="hover:underline">Get Help</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="https://forms.gle/TFTkZvFmGtjb9imW7" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 lg:mt-0 lg:text-start text-center">
          <a href="https://www.instagram.com/kprep.in?igsh=MW1pcHQzY2hwaWhtMQ==" className="text-white hover:text-yellow-400 text-2xl"><FaInstagram /></a>
          {/* <a href="#" className="text-white hover:text-yellow-400 text-2xl"><FaLinkedin /></a> */}
          <a href="https://chat.whatsapp.com/KN1COgR9BkJLGXZ3nFjEBp" className="text-white hover:text-yellow-400 text-2xl"><FaWhatsapp /></a>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-300 mt-6 border-t border-gray-500 pt-4">
        &copy; 2025 K-PREP. All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;