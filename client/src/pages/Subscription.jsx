import React from "react";
import { motion } from "framer-motion";
import { pricingPlans } from "@/assets/assets";
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Subscription = () => {
  return (
    <div className="bg-white py-20 px-4 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {plan.title}
              </h3>
              <p className="text-3xl font-extrabold text-indigo-600 mb-4">
                {plan.price}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">{plan.desc}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 flex items-start">
                    <span className="mt-1 w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-auto cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-lg transition duration-300 w-full">
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
