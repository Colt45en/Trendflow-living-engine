import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const Header = ({ cartCount, setCartOpen }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          TrendFlow
        </motion.h1>
        <div className="flex items-center space-x-6">
          <motion.button 
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button 
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Videos
          </motion.button>
          <motion.button 
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Store
          </motion.button>
          <motion.button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;