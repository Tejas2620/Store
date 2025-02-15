import React from "react";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center z-50">
      <div className="relative">
        {/* Pulsing Background Circle */}
        <motion.div
          className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Sneaker Icon */}
          <motion.div
            className="mb-8 relative"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/favicon.png"
              alt="Loading"
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Loading Bar */}
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            className="text-gray-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading SneakPro
          </motion.p>
        </div>
      </div>
    </div>
  );
};