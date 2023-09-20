import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../CartProvider.jsx';
import styled from "styled-components"

const initialHoverState = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};
const Page = styled.div`
    // height: 200vh;
`
const AddedProduct = styled.div`
  z-index: 1;
  padding: 0.5rem;
  color: black;
  aspect-ratio: 1/1.15;
  height: 30vh;
  background-color: rgb(244 244 242);
  position: fixed;
  top: 6.5vh;
  right:2rem;
  // position: absolute;
  // right:2rem;
  // top: 8vh;
  transform: scale(0.8);
  transition: transform 0.75s cubic-bezier(0,1,1,1);
  &.show {
    transform: scale(1);
  }
  .close {
    position: absolute;
    top: 5%;
    right: 5%;
  }
  .added {
    position: absolute;
    font-size: 0.8rem;
    font-weight: 750;
    top: 5%;
    left: 5%;
  }
  .name {
    position: absolute;
    font-size: 0.7rem;
    font-weight: 600;
    bottom: 5%;
    left: 5%;
  }
  .price {
    position: absolute;
    font-size: 0.7rem;
    font-weight: 600;
    bottom: 5%;
    right: 5%;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border: 1px solid white;
`
const ProductFrame = styled.div`
    aspect-ratio: 1/1.2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.product1 {
        grid-area: 1 / 1 / 2 / 2;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
    }
    &.product2 {
        grid-area: 1 / 2 / 2 / 3;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
    }
    &.product3 {
        grid-area: 2 / 1 / 3 / 2;
        border-right: 1px solid white;
    }
    &.product4 {
        grid-area: 2 / 2 / 3 / 3;
        border-right: 1px solid white;
    }
    &.product5 {
        grid-area: 1 / 3 / 3 / 5;
    }
}
`
const ProcuctImg = styled.img`
  width: 40%;
   pointer-events: none;
`
const ShootImg = styled.img`
  pointer-events: none;
  position: absolute;
  object-fit: cover;
  aspect-ratio: 1/1.2;
  overflow: hidden;
  width: 100%;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 500ms ease;
`
const ProductName = styled.div`
  position: absolute;
  bottom:5%;
  left:5%;
  transition: bottom 0.5s ease;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
`
const ProductPrice = styled.div`
  position: absolute;
  bottom:5%;
  right:5%;
  transition: bottom 0.5s ease;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
`
const ProductBar = styled.div`
    position: absolute;
    width: 100%;
    height: 4vh;
    transition: bottom 0.5s ease;
    bottom: ${({ show }) => (show ? '0' : '-10%')};
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button`
  height: 80%;
  width: 7vw;
  background-color: transparent;
  border: none;
  color: #10100e;
  font-size: 0.625rem;
  font-weight: 775;
  cursor: pointer;
  transition: 400ms;
  &:hover {
    color: white;
    background-color: #10100e;
    border-radius: 5px;
  }
`
function Shop() {
    const {cartItems, setCartItems} = useContext(CartContext);
    const [lastItem, setLastItem] = useState(null);
    const [showAddedItem, setShowAddedItem] = useState(false);
    const [addedItemClassName, setAddedItemClassName] = useState('');
    const addToCart = (item) => {
        setLastItem(item);
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          const updatedCart = cartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
          setCartItems(updatedCart);
        } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        setShowAddedItem(true);
    };
    useEffect(() => {
        if (showAddedItem) {
            setAddedItemClassName('show');
          const timer = setTimeout(() => {
            setShowAddedItem(false);
          }, 5000);
          const timer2 = setTimeout(() => {
            setAddedItemClassName('erase');
          }, 4750);
          return () => clearTimeout(timer);
        }
      }, [showAddedItem]);
      const [isHovered, setIsHovered] = useState(initialHoverState);
      const handleMouseEnter = (index) => {
        setIsHovered((prevItems) => ({
          ...prevItems,
          [index]: true,
        }));
      };
      const handleMouseLeave = (index) => {
        setIsHovered((prevItems) => ({
          ...prevItems,
          [index]: false,
        }));
      };
    return (
        <Page>
            {showAddedItem && (
              <AddedProduct  className={`${addedItemClassName}`} onClick={() => {document.body.dataset.cart = "true";}}>
                <button onClick={() => {setShowAddedItem(false)}} className="close">X</button>
                <p className="added">ADDED TO YOUR CART</p>
                <p className="name">{lastItem.name}</p>
                <p className="price">${lastItem.price}</p>
              </AddedProduct>
            )}
            <Grid>
                <ProductFrame className="product1" onMouseEnter={() =>handleMouseEnter(0)} onMouseLeave={() =>handleMouseLeave(0)}>
                    <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[0]} src="./img/2.webp"/>
                    <ProductName show={isHovered[0]}>Product A</ProductName>
                    <ProductPrice show={isHovered[0]}>$10</ProductPrice>
                    <ProductBar show={isHovered[0]}>
                      <Button onClick={() => {addToCart({ id: 1, name: 'Product A', price: 10})}}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product2" onMouseEnter={() =>handleMouseEnter(1)} onMouseLeave={() =>handleMouseLeave(1)}>
                <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[1]} src="./img/2.webp"/>
                    <ProductName show={isHovered[1]}>Product A</ProductName>
                    <ProductPrice show={isHovered[1]}>$10</ProductPrice>
                    <ProductBar show={isHovered[1]}>
                      <Button onClick={() => addToCart({ id: 2, name: 'Product B', price: 20})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product3" onMouseEnter={() =>handleMouseEnter(2)} onMouseLeave={() =>handleMouseLeave(2)}>
                <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[2]} src="./img/2.webp"/>
                    <ProductName show={isHovered[2]}>Product A</ProductName>
                    <ProductPrice show={isHovered[2]}>$10</ProductPrice>
                    <ProductBar show={isHovered[2]}>
                      <Button onClick={() => addToCart({ id: 3, name: 'Product C', price: 30})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product4" onMouseEnter={() =>handleMouseEnter(3)} onMouseLeave={() =>handleMouseLeave(3)}>
                <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[3]} src="./img/2.webp"/>
                    <ProductName show={isHovered[3]}>Product A</ProductName>
                    <ProductPrice show={isHovered[3]}>$40</ProductPrice>
                    <ProductBar show={isHovered[3]}>
                      <Button onClick={() => addToCart({ id: 4, name: 'Product D', price: 40})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product5" onMouseEnter={() =>handleMouseEnter(4)} onMouseLeave={() =>handleMouseLeave(4)}>
                <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[4]} src="./img/2.webp"/>
                    <ProductName show={isHovered[4]}>Product B</ProductName>
                    <ProductPrice show={isHovered[4]}>$50</ProductPrice>
                    <ProductBar show={isHovered[4]}>
                      <Button onClick={() => addToCart({ id: 5, name: 'Product E', price: 50})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
            </Grid>
        </Page>
    )
}
export default Shop