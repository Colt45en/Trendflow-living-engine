import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users, ShoppingCart, Star } from 'lucide-react';

const ContentFlow = () => {
  const steps = [
    { icon: <Zap />, title: 'Record', desc: 'Capture authentic moments' },
    { icon: <TrendingUp />, title: 'Optimize', desc: 'AI-powered editing' },
    { icon: <Users />, title: 'Engage', desc: 'Connect with audience' },
    { icon: <ShoppingCart />, title: 'Monetize', desc: 'Convert to revenue' },
    { icon: <Star />, title: 'Scale', desc: 'Expand your empire' }
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Content Profit Cycle
          </h2>
          <p className="text-gray-400 text-lg">The engine that powers creation and commerce</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 text-center hover:border-orange-500/50 transition-all duration-500"
                whileHover={{ scale: 1.05, y: -10 }}
                animate={{ 
                  boxShadow: [
                    '0 0 0 rgba(249, 115, 22, 0)',
                    '0 0 20px rgba(249, 115, 22, 0.3)',
                    '0 0 0 rgba(249, 115, 22, 0)'
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 3, repeat: Infinity, delay: idx * 0.5 }
                }}
              >
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
              
              {idx < 4 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 1) * 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentFlow;