import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
            TrendFlow Living Engine
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering creators worldwide with premium content and exclusive merchandise. 
            Join the revolution where creativity meets commerce.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              YouTube
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              Instagram
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              Twitter
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              TikTok
            </motion.a>
          </div>
          <p className="text-gray-600 text-sm">
            &copy; 2025 TrendFlow. All Rights Reserved. Built with passion for creators.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;