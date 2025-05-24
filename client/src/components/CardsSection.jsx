import React from "react";
import { motion } from "framer-motion";
import { cards } from "@/assets/assets";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.7,
      type: "spring",
      stiffness: 80,
    },
  }),
};

const CardsSection = () => {
  return (
    <motion.div className="flex flex-col justify-center items-center py-12 px-5 mt-5">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-16 text-gray-800 w-full md:text-4xl lg:text-5xl tracking-tight leading-tight"
      >
        How to remove a{" "}
        <br/>
        <span className="text-purple-600 font-bold">background</span> in
        seconds?
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {cards.map((card, index) => (
          <motion.div
            key={card.step}
            className="relative bg-[rgb(242,243,247)] p-7 rounded-2xl shadow-lg hover:shadow-purple-300 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Step badge */}
            <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              Step {card.step}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              {card.title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CardsSection;
