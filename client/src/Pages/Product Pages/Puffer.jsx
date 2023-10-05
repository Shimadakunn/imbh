import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../../Components/CartProvider.jsx';
import styled from "styled-components"

const initialHoverState = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
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
const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    @media (max-width: 480px) {
        width: 99.5vw;
        height: 99.5vh;
    }
`
const Images = styled.div`
    flex: 0.65;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    border: 1px solid white;
    border-bottom: 0px solid white;
    border-left: 0px solid white;
    @media (max-width: 480px) {grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(7, 1fr);
        flex: 0.55;};
`
const ImageFrame = styled.div`
    aspect-ratio: 1/1.2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.img1 {
        grid-area: 1 / 1 / 3 / 3;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 1 / 1 / 3 / 3;};
    }
    &.img2 {
        grid-area: 1 / 3 / 3 / 5;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 4 / 1 / 6 / 3;};
    }
    &.img3 {
        grid-area: 3 / 1 / 4 / 2;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 3 / 1 / 4 / 2;};
    }
    &.img4 {
        grid-area: 3 / 2 / 4 / 3;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 3 / 2 / 4 / 3;};
    }
    &.img5 {
        grid-area: 3 / 3 / 5 / 5;
        border-bottom: 1px solid white;
        border-left: 1px solid white;
        @media (max-width: 480px) {grid-area: 6 / 1 / 8 / 3;};
    }
    & img {
        object-fit: cover;
        aspect-ratio: 1/1.2;
        overflow: hidden;
        width: 100%;
        &.img3, &.img4 {
            width: 90%;
        }
    }
}
`
const InfoContainer = styled.div`
    flex: 0.35;
    position: relative;
    @media (max-width: 480px) {flex: 0.45;};
`
const Info = styled.div`
    position: fixed;
    @media (max-width: 480px) {top: 10vh;width: 45vw;};
    top: 8.5vh;
    height: 90vh;
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
        height: 3.5vh;
        width: 30vw;
        @media (max-width: 480px) {width: 30vw;};
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
        &.selected{
          border: 1px solid white;
        }
        margin: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
    }
`
function Product1() {
    const {cartItems, setCartItems} = useContext(CartContext);
    const [lastItem, setLastItem] = useState(null);
    const [showAddedItem, setShowAddedItem] = useState(false);
    const [addedItemClassName, setAddedItemClassName] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState(1);
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
          }, 2000);
          const timer2 = setTimeout(() => {
            setAddedItemClassName('erase');
          }, 1750);
          return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
          };
        }
      }, [showAddedItem]);
    useEffect(() => {
      console.log(selectedCategorie);
    }, [selectedCategorie]);
    return (
        <>
            {showAddedItem && (
                <AddedProduct  className={`${addedItemClassName}`} onClick={() => {document.body.dataset.cart = "true";}}>
                    <button onClick={(event) => {event.stopPropagation(); setShowAddedItem(false)}} className="close">X</button>
                    <img className="img" src={`./img/${lastItem.id}_1.png`}/>
                    <p className="added">ADDED TO YOUR CART</p>
                    <p className="name">{lastItem.name}</p>
                    <p className="price">${lastItem.price}</p>
                </AddedProduct>
            )}
            <Page>
                <Images>
                    <ImageFrame className="img1"><img src={`./img/1_2.jpg`}/></ImageFrame>
                    <ImageFrame className="img2"><img src={`./img/2_2.jpg`}/></ImageFrame>
                    <ImageFrame className="img3"><img className="img3" src={`./img/1_1.png`}/></ImageFrame>
                    <ImageFrame className="img4"><img className="img4" src={`./img/2_1.png`}/></ImageFrame>
                    <ImageFrame className="img5"><img src={`./img/4_2.jpg`}/></ImageFrame>
                </Images>
                <InfoContainer>
                    <Info>
                      {/* {selectedCategorie === 1 && (
                        <h1>Lost Archive</h1>
                      )} */}
                        <h1>Product</h1>
                        <Categories>
                          <img className={selectedCategorie === 1 ? "selected" : ""} src={`./img/1_2.jpg`} onClick={() => setSelectedCategorie(1)}/>
                          <img className={selectedCategorie === 2 ? "selected" : ""} src={`./img/1_2.jpg`} onClick={() => setSelectedCategorie(2)}/>
                        </Categories>
                        <button onClick={() => {addToCart({ id: 1, name: 'LOST ARCHIVE', price: 60})}}>Add to Cart</button>
                    </Info>
                </InfoContainer>
            </Page>
        </>
    );
  }
  
  export default Product1