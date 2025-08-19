import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import VideoClips from './sections/VideoClips';
import ContentFlow from './sections/ContentFlow';
import FeaturedMerch from './sections/FeaturedMerch';
import Footer from './sections/Footer';
import SidebarCart from './components/SidebarCart';


function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);


  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };


  return (
    <div className="bg-black text-white min-h-screen font-inter overflow-x-hidden">
      <Header cartCount={cart.length} setCartOpen={setCartOpen} />
      <Hero />
      <VideoClips addToCart={addToCart} />
      <ContentFlow />
      <FeaturedMerch addToCart={addToCart} />
      <Footer />
      <SidebarCart 
        cart={cart} 
        isOpen={cartOpen} 
        setOpen={setCartOpen}
        updateCart={setCart}
      />
    </div>
  );
}


export default App;