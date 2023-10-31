import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../../Components/CartProvider.jsx';
import styled from "styled-components"

const AddedProduct = styled.div`
  z-index: 1;
  padding: 0.5rem;
  color: black;
  aspect-ratio: 1/1.15;
  height: 30vh;
  background-color: rgb(244 244 242);
  position: fixed;
  top: 7.5vh;
  right:5rem;
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
    width: 75%;
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
    font-weight: 1000;
    bottom: 5%;
    right: 5%;
  }
`
const Page = styled.div`
  display: grid;
  grid-template-columns: 65vw 35vw;
  grid-template-rows: auto;
  @media (max-width: 480px) {grid-template-columns: 54vw 45vw;}
`
const Images = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    border: 1px solid white;
    border-bottom: 0px solid white;
    border-left: 0px solid white;
    @media (max-width: 480px) {grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
        };
`
const ImageFrame = styled.div`
    aspect-ratio: 1/1.2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.img1 {
      grid-area: 1 / 1 / 2 / 2;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 1 / 1 / 2 / 2;};
    }
    &.img2 {
      grid-area: 1 / 2 / 2 / 3;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 2 / 1 / 3 / 2;};
    }
    &.img3 {
      grid-area: 2 / 1 / 3 / 2;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 3 / 1 / 4 / 2;};
    }
    &.img4 {
      grid-area: 2 / 2 / 3 / 3;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 4 / 1 / 5 / 2;};
    }
    & img {
        object-fit: cover;
        aspect-ratio: 1/1.2;
        overflow: hidden;
        width: 100%;
        &.min{
          width: 75%;
        }
    }
}
`
const InfoContainer = styled.div`
  position: relative;
`
const Info = styled.div`
    position: sticky;
    transition: 100ms;
    top: 0;
    height: 99.9vh;
    padding: 5rem;
    border: 1px solid white;
    button {
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        top: 85%;
        height: 3.5vh;
        width: 30vw;
        @media (max-width: 480px) {width: 30vw;font-size: 0.75rem;top: 75%;};
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
    }
    h1 {
      position: absolute;
      right: 50%;
      top: 25%;
      transform: translate(50%, -50%);
      text-align: center;
      width: 100%;
      font-size: 1.5rem;
      font-weight: 775;
      @media (max-width: 480px) {font-size: 1rem;
        width: 85%;};
      }
    p {
      position: absolute;
      right: 50%;
      top: 42.5%;
      transform: translate(50%, -50%);
      text-align: center;
      width: 70%;
      font-size: 0.8rem;
      font-weight: 600;
      width: 70%;
      &.price {
        top: 32.5%;
        font-size: 1.5rem;
        font-weight: 1000;
      }
      &.stock{
        top: 37.5%;
      }
      @media (max-width: 480px) {
        &.description {
         font-size: 0.5rem;
        }
        font-size: 0.7rem;
        width: 85%;};
    }
    div{
      position: absolute;
      right: 50%;
      top: 55%;
      transform: translate(50%, -50%);
      width: 100%;
      &.sizes{
        top: 70%;
        @media (max-width: 480px) {top: 65%;};
      }
      &.desc{
        top: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
        color: grey;
        @media (max-width: 480px) {font-size: 0.5rem;top: 71%;};
      }
    }
`
const Categories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
    img {
        aspect-ratio: 1/1;
        object-fit: cover;
        overflow: hidden;
        width: 20%;
        padding: 0.5rem;
        border: 1px solid transparent;
        @media (max-width: 480px) {width: 40%;};
        &.selected{
          border: 1px solid white;
        }
        margin: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
    }
`
const Sizes = styled.div`
width: 100%;
position: relative;
div {
  position: absolute;
  aspect-ratio: 1/1;
  width: 3.5vw;
  @media (max-width: 480px) {width: 10vw;};
  transform: translate(-50%, -50%);
  &.S {
    left: 30%;
    @media (max-width: 480px) {left: 20%;};
  }
  &.M {
    left: 50%;
  }
  &.L {
    left: 70%;
    @media (max-width: 480px) {left: 80%;};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &.selected{
    border: 1px solid white;
  }
}
`
const ProductName = styled.div`
  position: absolute;
  left:5%;
  transition: bottom 0.5s ease;
  font-size: 1rem;
  font-weight: 600;
  bottom: 5%;
  @media (max-width: 480px) {font-size: 0.75rem;};
`
function Puffer() {
    const {cartItems, setCartItems} = useContext(CartContext);
const {stockData} = useContext(CartContext);
    const [size, setSize] = useState('M');
    const [lastItem, setLastItem] = useState(null);
    const [showAddedItem, setShowAddedItem] = useState(false);
    const [addedItemClassName, setAddedItemClassName] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState(8);
    const addToCart = (item) => {
      setLastItem(item);
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size);
      if (existingItem) {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id  && cartItem.size === item.size ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
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
     
    return (
        <>
            {showAddedItem && (
                <AddedProduct  className={`${addedItemClassName}`} onClick={() => {document.body.dataset.cart = "true";}}>
                    <button onClick={(event) => {event.stopPropagation(); setShowAddedItem(false)}} className="close">X</button>
                    <img className="img" src={`./img/${lastItem.id}.webp`}/>
                    <p className="added">ADDED TO YOUR CART</p>
                    <p className="name">{lastItem.name} ({lastItem.size[lastItem.size.length - 1]})</p>
                    <p className="price">{lastItem.price}€</p>
                </AddedProduct>
            )}
            <Page>
                <Images>
                    <ImageFrame className="img1">
                      <img className="min" src={`./img/2.webp`}/>
                      <ProductName>
                        Front
                      </ProductName>
                    </ImageFrame>
                    <ImageFrame className="img2">
                      <img className="min" src={`./img/2/2_2.webp`}/>
                      <ProductName>
                        Back
                      </ProductName>
                    </ImageFrame>
                    <ImageFrame className="img3"><img src={`./img/2/2_3.webp`}/></ImageFrame>
                    <ImageFrame className="img4"><img src={`./img/2/2_5.webp`}/></ImageFrame>
                </Images>
                <InfoContainer>
                    <Info>
                        <h1>JUPITER LONGSLEEVE (BLACK)</h1>
                        <p className="description">75% POLYESTER 20% VISCOSE 5% ELASTHANNE. FILLED WITH VIRGIN FIBERS TREATED</p>
                        <p className="price">185€</p>
                        <p  className="stock">{stockData[1]} items left</p>
                        <div className="desc">The Model mesures 1.85cm and Wears L</div>
                        <div>
                          <Categories>
                            <img className="selected" src={`./img/2.webp`}/>
                          </Categories>
                        </div>
                        <Sizes className="sizes">
                          <div className={size === 'S' ? "selected S" : "S"} onClick={() => setSize('S')}>S</div>
                          <div className={size === 'M' ? "selected M" : "M"} onClick={() => setSize('M')}>M</div>
                          <div className={size === 'L' ? "selected L" : "L"} onClick={() => setSize('L')}>L</div>
                        </Sizes>
                        <button onClick={() => {if(stockData[1]!==0){addToCart({ id: 2, name: "JUPITER LONGSLEEVE (BLACK)", price: 185,size:"Jupi Long:" + size})}}}>Add to Cart</button>
                    </Info>
                </InfoContainer>
            </Page>
        </>
    );
  }
  
  export default Puffer;