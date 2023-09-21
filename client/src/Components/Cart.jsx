import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from './CartProvider.jsx';
import styled from 'styled-components';

const Back=styled.div`
    position: fixed;
    background-color: #c4c4baa5;
    height: 100vh;
    width: 100vw;
    top: 0;
    opacity: 0.5;
    transition: opacity 0.75s cubic-bezier(0,1,1,1);
    body[data-cart="false"] &{opacity: 0;
    pointer-events: none;}
    z-index: 3;
`
const Page=styled.div`
    position: fixed;
    background-color: #10100e;
    height: 100vh;
    width: 33.5vw;
    top: 0;
    right: 0;
    transition: right 0.75s cubic-bezier(0,1,1,1);
    body[data-cart="false"] &{right: -40vw;}
    padding: 1.35rem;
    z-index: 3;
`
const Close=styled.button`
    height: 4vh;
    width: 4vw;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 0.8rem;
    font-weight: 775;
    cursor: pointer;
    transition: 400ms;
    &:hover {
      color: #10100e;
      background-color: white;
      border-radius: 5px;
    }
`
const Articles=styled.div`
    height: 70%;
    padding: 1.35rem 0;
`
const Article=styled.div`
    height: 20%;
    width: 100%;
    flex: 1;
    border-bottom: 1px solid white;
    position: relative;
    img{
        aspect-ratio: 1/1;
        height: 100%;
        object-fit: cover;
    }
    text{
        position: absolute;
        &.name{
            top: 15%;
            margin-left: 1rem;
        }
        &.price{
            top: 15%;
            right: 0;
        }
        &.quantity{
            bottom: 11%;
            right: 68%;
        }
    }
    button{
        cursor: pointer;
        position: absolute;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 1.2rem;
        &.minus{
            bottom: 10%;
            margin-left: 0.5rem;
            height: 1.5rem;
            width: 1.5rem;
        }
        &.plus{
            bottom: 10%;
            right: 60%;
            height: 1.5rem;
            width: 1.5rem;
        }
        &.remove{
            font-size: 0.8rem;
            bottom: 10%;
            right: 0;
            height: 3vh;
            width: 3vw;
        }
    }
`
const Total=styled.div`
position: relative;
height: 2.5%;
`
const TotalText=styled.div`
position: absolute;
left: 0;
`
const TotalPrice=styled.div`
position: absolute;
right: 0;
`
const Checkout=styled.button`
    height: 5%;
    width: 100%;
    background-color: white;
    border: none;
    color: #10100e;
    font-size: 1rem;
    font-weight: 775;
    cursor: pointer;
    transition: 400ms;
    &:hover {
      color: white;
      background-color: #10100e;
      border-radius: 5px;
    }
`
function Cart(){
    const {cartItems, setCartItems} = useContext(CartContext);
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
    const removeFromCart = (item) => {
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedCart);
    };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateNumberProduct = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  const Pay = () => {
    fetch('https://imbh-server.vercel.app/create-checkout-session', {
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
    return(
        <>
        <Back onClick={() => {document.body.dataset.cart = "false";}}></Back>
        <Page>
            <Close onClick={() => {document.body.dataset.cart = "false";}}>
                X CART [{calculateNumberProduct()}]
            </Close>
            <Articles>
                {cartItems.map((item) => (
                    <Article key={item.id}>
                        <img src={`./img/${item.id}_1.png`}/>
                        <text className="name">{item.name}</text>
                        <text className="price">${item.price*item.quantity}</text>
                        <button className="minus" onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
                        <text className="quantity" onChange={(e) => updateQuantity(item, parseInt(e.target.value))}>
                            {item.quantity}</text>
                        <button className="plus" onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                        <button className="remove" onClick={() => removeFromCart(item)}>remove</button>
                    </Article>
                ))}
            </Articles>
            <Total>
                <TotalText>TOTAL</TotalText>
                <TotalPrice>${calculateTotal()}</TotalPrice>
            </Total>
            <Checkout onClick={() => Pay()}>
                CHECKOUT
            </Checkout>
        </Page>
        </>
    )
}

export default Cart;