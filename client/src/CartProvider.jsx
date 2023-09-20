import React, { createContext, useState } from 'react';

// Create a new context
export const CartContext = createContext();
const AppProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default AppProvider;