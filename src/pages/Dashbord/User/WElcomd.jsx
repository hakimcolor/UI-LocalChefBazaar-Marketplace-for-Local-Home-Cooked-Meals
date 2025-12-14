import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Welcome = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-white text-gray-800 p-6 overflow-hidden">
      <title>LocalChefBazaar || Dashbord</title>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          interactivity: { detectsOn: 'canvas', events: { resize: true } },
          particles: {
            color: { value: '#ffffff' },
            number: { value: 150, density: { enable: true, area: 800 } },
            opacity: {
              value: 0.8,
              random: { enable: true, minimumValue: 0.3 },
            },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: {
              direction: 'bottom',
              enable: true,
              speed: 2,
              straight: false,
            },
          },
        }}
      />

      <motion.div
        className="text-blue-500 mb-6 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <FaTachometerAlt className="text-8xl" />
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-4 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Welcome to Your Dashboard!
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-700 text-center max-w-xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        You are successfully logged in. Explore your dashboard and enjoy your
        experience with interactive animations and smooth effects!
      </motion.p>
    </div>
  );
};

export default Welcome;
