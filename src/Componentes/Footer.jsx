import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white pt-12 pb-6 px-6 md:px-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
   
        <div>
          <h2 className="text-2xl font-bold text-[#FBBF24]">LocalChefBazaar</h2>
          <p className="mt-3 text-gray-300">
            Connecting you with home-cooked goodness from local chefs. Fresh,
            healthy & affordable meals — right at your doorstep!
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FBBF24]">
            Contact Us
          </h3>
          <p className="flex items-center gap-2 mb-2 text-gray-300">
            <FaMapMarkerAlt /> Jessore, Bangladesh
          </p>
          <p className="flex items-center gap-2 mb-2 text-gray-300">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaEnvelope /> support@localchefbazaar.com
          </p>
        </div>

    
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FBBF24]">
            Working Hours
          </h3>
          <p className="text-gray-300">Mon - Fri: 9:00 AM - 10:00 PM</p>
          <p className="text-gray-300">Saturday: 10:00 AM - 8:00 PM</p>
          <p className="text-gray-300">Sunday: Closed</p>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FBBF24]">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
          
            <a
              href="https://www.facebook.com/hakimcolorofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBBF24]"
            >
              <FaFacebookF />
            </a>

       
            <a
              href="https://x.com/hakimcolor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBBF24]"
            >
              <FaTwitter />
            </a>

      
            <a
              href="https://www.instagram.com/hakim.color/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBBF24]"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-gray-400">
        © {new Date().getFullYear()} LocalChefBazaar — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
