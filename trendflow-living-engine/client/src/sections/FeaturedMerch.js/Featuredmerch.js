import React from 'react';
import { motion } from 'framer-motion';
import MerchCard from '../components/MerchCard';
import { merchItemsData } from '../data/merch';

const FeaturedMerch = ({ addToCart }) => {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Exclusive Collection
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premium merchandise designed for creators, by creators
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {merchItemsData.map((item) => (
            <MerchCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMerch;