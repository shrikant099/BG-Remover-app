import React from "react";
import { motion } from "framer-motion";
import { ModelImg2 } from "@/assets/assets";

// Smooth fade-in + slide-up animation
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const BackgroundRemoverSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gray-50">
      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-center tracking-tight bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Transform Your Image <br /> with Precision AI
      </motion.h1>

      {/* Content Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">
            Background Remover
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Instantly remove image backgrounds with a single click. Powered by
            cutting-edge AI, our tool delivers high-precision cutouts—ideal
            for product photos, profile pictures, and creative projects. No
            design skills needed!
          </p>
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center">
          <motion.img
            src={ModelImg2}
            alt="Background Removed"
            className="rounded-xl w-full max-w-sm shadow-xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BackgroundRemoverSection;
