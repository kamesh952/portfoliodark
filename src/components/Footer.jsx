// components/Footer.jsx
import React from "react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const quickLinks = ["About", "Projects", "Contact"];

  return (
    <footer className="bg-transparent text-white pt-16 pb-8">
      <div className="w-[90%] max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand Section */}
          <div className="md:flex-1 md:max-w-sm">
            <a
              href="#"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 inline-block hover:opacity-80 transition-opacity duration-300 no-underline"
            >
              Kamesh<span className="text-blue-500">R</span>
            </a>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating elegant digital experiences with modern technologies and
              creative solutions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="md:flex-1 md:max-w-xs">
            <h3 className="text-xl font-semibold mb-6 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="list-none p-0 space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 no-underline transition-all duration-300 flex items-center group hover:text-white hover:pl-2"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="md:flex-1 md:max-w-xs">
            <h3 className="text-xl font-semibold mb-6 relative pb-2">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-gray-300">Chrompet, Chennai</p>
              </div>
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <a
                  href="mailto:kameshramesh006@gmail.com"
                  className="text-gray-300 break-all hover:text-blue-400 transition-colors"
                >
                  kameshramesh006@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <a
                  href="tel:+918680892898"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +91 8680892898
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p className="text-sm">&copy; 2025 Kamesh R. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
