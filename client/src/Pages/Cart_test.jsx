import React, { useState,useEffect } from 'react';

function ShoppingCart (){
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };
  const updateQuantity = (item, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item);
    } else {
        const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(() => {
    console.log(cartItems);
    });

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: 
            <text
              onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
            >{item.quantity}</text>
            <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
        <text>Total Amount: ${calculateTotal()}</text>
      </ul>

      <h2>Product List</h2>
      <ul>
        <li>
          <span>Product A - $10</span>
          <button onClick={() => addToCart({ id: 1, name: 'Product A', price: 10})}>
            Add to Cart
          </button>
        </li>
        <li>
          <span>Product B - $20</span>
          <button onClick={() => addToCart({ id: 2, name: 'Product B', price: 20})}>
            Add to Cart
          </button>
        </li>
        <li>
          <span>Product C - $30</span>
          <button onClick={() => addToCart({ id: 3, name: 'Product C', price: 30 })}>
            Add to Cart
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingCart;