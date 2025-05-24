import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ratings } from "@/assets/assets";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Rated = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-5 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-fuchsia-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ratings.map((rating, index) => (
            <motion.div
              key={rating.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}
              className="bg-white p-6 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {rating.title}
              </h3>
              <p className="text-gray-600 text-base mb-6">{rating.desc}</p>

              {/* User Info */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t">
                <img
                  src={rating.img}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="text-sm text-gray-500">{rating.user}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rated;
