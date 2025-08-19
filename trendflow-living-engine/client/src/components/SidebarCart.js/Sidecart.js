import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

const SidebarCart = ({ cart, isOpen, setOpen, updateCart }) => {
  const removeFromCart = (itemId) => {
    updateCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    updateCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.slice(1)) * item.quantity), 0).toFixed(2);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-50 overflow-y-auto"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-gray-400" />
                </motion.button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                          <p className="text-orange-400 font-bold">{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 bg-gray-700 rounded text-white text-xs hover:bg-gray-600"
                              whileTap={{ scale: 0.9 }}
                            >
                              -
                            </motion.button>
                            <span className="text-white text-sm">{item.quantity}</span>
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 bg-gray-700 rounded text-white text-xs hover:bg-gray-600"
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={16} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-white">Total:</span>
                      <span className="text-2xl font-bold text-orange-400">${total}</span>
                    </div>
                    <motion.button
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-lg text-white shadow-lg"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout Now
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarCart;