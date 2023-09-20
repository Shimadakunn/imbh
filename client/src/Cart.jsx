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
    height: 5%;
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
        border: 1px solid white;
        aspect-ratio: 1/1;
        height: 100%;
        object-fit: cover;
    }
    text{
        position: absolute;
        &.name{
            top: 0;
        }
        &.price{
            top: 0;
            right: 0;
        }
        &.quantity{
            bottom: 10%;
            right: 70%;
        }
    }
    button{
        position: absolute;
        &.minus{
            bottom: 10%;
        }
        &.plus{
            bottom: 10%;
            right: 66.5%;
        }
        &.remove{
            bottom: 10%;
            right: 0;
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
    background-color: blue;
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
    return(
        <>
        <Back onClick={() => {document.body.dataset.cart = "false";}}>

        </Back>
        <Page>
            <Close onClick={() => {document.body.dataset.cart = "false";}}>
                X Cart 1
            </Close>
            <Articles>
                {cartItems.map((item) => (
                    <Article key={item.id}>
                        <img src="./img/1.png"/>
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
                <TotalText>Total</TotalText>
                <TotalPrice>${calculateTotal()}</TotalPrice>
            </Total>
            <Checkout>
                Checkout
            </Checkout>
        </Page>
        </>
    )
}

export default Cart;