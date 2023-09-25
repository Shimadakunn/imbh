import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../Components/CartProvider.jsx';
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
  transform: scale(0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.75s cubic-bezier(0,1,1,1);
  @media (max-width: 480px) {top: 8vh;right:1rem;};
  &.show {
    transform: scale(1);
  }
  .img {
    width: 90%;
  }
  .close {
    position: absolute;
    z-index:5;
    top: 2.5%;
    right: 2.5%;
    height: 2rem;
    width: 2rem;
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
  @media (max-width: 480px) {grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);};
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
        @media (max-width: 480px) {grid-area: 1 / 1 / 2 / 2;
        border-bottom: 0px solid white;};
    }
    &.product2 {
        grid-area: 1 / 2 / 2 / 3;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
        @media (max-width: 480px) {grid-area: 1 / 2 / 2 / 3;
          border-right: 0px solid white;
          border-bottom: 0px solid white;};
    }
    &.product3 {
        grid-area: 2 / 1 / 3 / 2;
        border-right: 1px solid white;
        @media (max-width: 480px) {grid-area: 4 / 1 / 5 / 2;};
    }
    &.product4 {
        grid-area: 2 / 2 / 3 / 3;
        border-right: 1px solid white;
        @media (max-width: 480px) {grid-area: 4 / 2 / 5 / 3;
        border-right: 0px solid white;};
    }
    &.product5 {
        grid-area: 1 / 3 / 3 / 5;
        @media (max-width: 480px) {border-bottom: 1px solid white;
          border-top: 1px solid white;
          grid-area: 2 / 1 / 4 / 3;};
    }
}
`
const ProcuctImg = styled.img`
  width: 60%;
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
  Font-size: 0.75rem;
  font-weight: 600;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
  @media (max-width: 480px) {bottom: ${({ show }) => (show ? '15%' : '5%')};
  &.product5{bottom: ${({ show }) => (show ? '10%' : '5%')};}};
`
const ProductPrice = styled.div`
  position: absolute;
  bottom:5%;
  right:5%;
  transition: bottom 0.5s ease;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
  @media (max-width: 480px) {bottom: ${({ show }) => (show ? '15%' : '5%')};
  &.product5{bottom: ${({ show }) => (show ? '10%' : '5%')};}};
`
const ProductBar = styled.div`
    position: absolute;
    width: 100%;
    height: 4vh;
    transition: bottom 0.5s ease;
    bottom: ${({ show }) => (show ? '0' : '-10%')};
    @media (max-width: 480px) {bottom: ${({ show }) => (show ? '0' : '-15%')};};
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
  @media (max-width: 480px) {width: 25vw;};
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
          return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
          };
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
                <button onClick={(event) => {event.stopPropagation(); setShowAddedItem(false)}} className="close">X</button>
                <img className="img" src={`./img/${lastItem.id}_1.png`}/>
                <p className="added">ADDED TO YOUR CART</p>
                <p className="name">{lastItem.name}</p>
                <p className="price">${lastItem.price}</p>
              </AddedProduct>
            )}
            <Grid>
                <ProductFrame className="product1" onMouseEnter={() =>handleMouseEnter(0)} onMouseLeave={() =>handleMouseLeave(0)}>
                    <ProcuctImg src="./img/1_1.png"/>
                    <ShootImg show={isHovered[0]} src="./img/1_2.jpg"/>
                    <ProductName show={isHovered[0]}>LOST ARCHIVE</ProductName>
                    <ProductPrice show={isHovered[0]}>$60</ProductPrice>
                    <ProductBar show={isHovered[0]}>
                      <Button onClick={() => {addToCart({ id: 1, name: 'LOST ARCHIVE', price: 60})}}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product2" onMouseEnter={() =>handleMouseEnter(1)} onMouseLeave={() =>handleMouseLeave(1)}>
                <ProcuctImg src="./img/2_1.png"/>
                    <ShootImg show={isHovered[1]} src="./img/2_2.jpg"/>
                    <ProductName show={isHovered[1]}>SHADOW HOODIE</ProductName>
                    <ProductPrice show={isHovered[1]}>$60</ProductPrice>
                    <ProductBar show={isHovered[1]}>
                      <Button onClick={() => addToCart({ id: 2, name: 'SHADOW HOODIE', price: 60})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product3" onMouseEnter={() =>handleMouseEnter(2)} onMouseLeave={() =>handleMouseLeave(2)}>
                <ProcuctImg src="./img/3_1.png"/>
                    <ShootImg show={isHovered[2]} src="./img/3_2.jpg"/>
                    <ProductName show={isHovered[2]}>SHADOW MESH HOODIE</ProductName>
                    <ProductPrice show={isHovered[2]}>$80</ProductPrice>
                    <ProductBar show={isHovered[2]}>
                      <Button onClick={() => addToCart({ id: 3, name: 'SHADOW MESH HOODIE', price: 80})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product4" onMouseEnter={() =>handleMouseEnter(3)} onMouseLeave={() =>handleMouseLeave(3)}>
                <ProcuctImg src="./img/4_1.png"/>
                    <ShootImg show={isHovered[3]} src="./img/4_2.jpg"/>
                    <ProductName show={isHovered[3]}>ROSACE PUFFER</ProductName>
                    <ProductPrice show={isHovered[3]}>$100</ProductPrice>
                    <ProductBar show={isHovered[3]}>
                      <Button onClick={() => addToCart({ id: 4, name: 'ROSACE PUFFER', price: 100})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product5" onMouseEnter={() =>handleMouseEnter(4)} onMouseLeave={() =>handleMouseLeave(4)}>
                <ProcuctImg src="./img/5_1.png"/>
                    <ShootImg show={isHovered[4]} src="./img/5_2.jpg"/>
                    <ProductName className="product5" show={isHovered[4]}>MAELSTROM</ProductName>
                    <ProductPrice className="product5" show={isHovered[4]}>$120</ProductPrice>
                    <ProductBar show={isHovered[4]}>
                      <Button onClick={() => addToCart({ id: 5, name: 'MAELSTROM', price: 120})}>
                        ADD TO CART
                      </Button>
                    </ProductBar>
                </ProductFrame>
            </Grid>
        </Page>
    )
}
export default Shop