import { useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
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
    console.log("Cart",cartItems);
    console.log("Query",cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity
    })));
    });
  const Pay = () => {
    console.log('pay')
    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity
        })),
      }),
    }).then(async res => {
      if (res.ok) return res.json()
      const json = await res.json()
      return await Promise.reject(json)
    }).then(({ url }) => {
      window.location = url
    }).catch(e => {console.error(e.error)})
  }
 
  return (
    <>
        <h1>Home</h1>
        <button onClick={() => Pay()}>Checkout</button>
        <button onClick={() => navigate("/success")}>Success</button>
        <button onClick={() => navigate("/cancel")}>Cancel</button>
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
    </>
  )
}
    
export default Home