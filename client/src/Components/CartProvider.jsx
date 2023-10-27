import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const CartContext = createContext();
const AppProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://imbh-server.vercel.app/');
          const data = await response.json();
          const stocks = data.stocks.map(stock => parseInt(stock.stock));
          setStockData(stocks);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, stockData }}>
      {children}
    </CartContext.Provider>
  );
};

export default AppProvider;