import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiLink, FiInfo, FiHelpCircle } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Us Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <div className="flex items-center space-x-4">
            <FaPhone className="text-gray-400 w-6 h-6" />
            <span>+1 234 567 890</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-gray-400 w-6 h-6" />
            <span>support@todoapp.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-gray-400 w-6 h-6" />
            <span>123 ToDo Street, Task City, Country</span>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Follow Us</h2>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-400 hover:text-white">
              <FaFacebook className="w-8 h-8" />
            </a>
            <a href="/" className="text-gray-400 hover:text-white">
              <FaTwitter className="w-8 h-8" />
            </a>
            <a href="/" className="text-gray-400 hover:text-white">
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Useful Links</h2>
          <div className="flex items-center space-x-4">
            <FiLink className="text-gray-400 w-6 h-6" />
            <a href="/" className="hover:text-white">Home</a>
          </div>
          <div className="flex items-center space-x-4">
            <FiInfo className="text-gray-400 w-6 h-6" />
            <a href="/" className="hover:text-white">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <FiHelpCircle className="text-gray-400 w-6 h-6" />
            <a href="/" className="hover:text-white">Help</a>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} ToDoApp. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
