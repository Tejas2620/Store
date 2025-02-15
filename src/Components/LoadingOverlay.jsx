import React from "react";
import { motion } from "framer-motion";
import { typography } from "../styles/typography";
import sneaker1 from "../assets/LoadingSVG/sneaker1.svg";

export const LoadingOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.3,
                scale: 1,
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            >
              <img src={sneaker1} alt="" className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        {/* Main Content Container */}
        <div className="relative text-center">
          {/* Main Sneaker */}
          <motion.div
            className="relative w-[500px] h-[500px] mb-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: [-20, 20, -20],
            }}
            transition={{
              scale: { duration: 0.8, ease: "backOut" },
              rotate: { duration: 0.8, ease: "backOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Sneaker Image */}
            <motion.div
              className="relative z-10"
              animate={{
                rotate: [-8, 8, -8],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img src={sneaker1} alt="Sneaker" className="w-full h-full" />
            </motion.div>

            {/* Glow Effects */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Primary Glow */}
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-[100px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Secondary Glow */}
              <motion.div
                className="absolute inset-0 bg-indigo-500/20 blur-[80px]"
                animate={{
                  scale: [1.2, 0.8, 1.2],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Brand Text */}
          <div className="relative">
            <motion.div
              className="flex items-center justify-center gap-4 mb-2"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Sneak Text */}
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              >
                <motion.span
                  className={`${typography.heading1} text-8xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Sneak
                </motion.span>
              </motion.div>

              {/* Pro Text */}
              <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              >
                <motion.span
                  className={`${typography.heading1} text-8xl font-black bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  Pro
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-64 h-1.5 mx-auto mt-8 bg-gray-200 rounded-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
