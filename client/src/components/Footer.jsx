// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  return (

    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/60 backdrop-blur-lg text-gray-700 py-6 px-6 mt-12 shadow-inner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BG Remover. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <Link
            href="/"
            className="hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>
          
          <p
            href="/about"
            onClick={() => navigate("/about")}
            className="hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            About
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
