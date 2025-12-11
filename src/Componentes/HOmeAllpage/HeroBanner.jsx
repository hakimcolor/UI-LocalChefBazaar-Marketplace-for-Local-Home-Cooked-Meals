import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import burBlob from '../../assets/bur.png';
import gemBlob from '../../assets/gem.png';

const HeroBanner = () => {
  return (
    <section
      className="mt-[-20px] relative w-full h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 dark:bg-gray-900"
      aria-label="Hero banner"
    >
      <motion.div
        className="absolute w-72 h-72 rounded-full top-10 left-10 bg-center bg-cover
                   "
        style={{ backgroundImage: `url(${burBlob})` }}
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bottom-10 right-10 bg-center bg-cover
                   "
        style={{ backgroundImage: `url(${gemBlob})` }}
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        className="relative text-center px-4"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'linear' }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent
             dark:bg-gradient-to-r dark:from-pink-500 dark:via-purple-500 dark:to-yellow-400
             bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 8px rgba(0,0,0,0.25)', // subtle glow effect
          }}
        >
          Delicious Meals, Delivered Fresh
        </motion.h1>

        <motion.p
          className="text-md md:text-xl mb-6 font-semibold bg-clip-text text-transparent
                     dark:bg-gradient-to-r dark:from-pink-400 dark:to-yellow-300
                     bg-gradient-to-r from-red-500 to-yellow-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: 'linear' }}
        >
          Healthy, tasty, and made with love just for you!
        </motion.p>

        <Link to={'allmeals'}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-semibold px-6 py-3 rounded-xl shadow-lg text-white 
             bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400
             bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500
             cursor-pointer text-xl"
          >
            See our all meals
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
