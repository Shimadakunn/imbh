import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../../Components/CartProvider.jsx';
import styled from "styled-components"
import Pop_up from '../../Components/Pop_up.jsx';

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
        top: 72%;
        height: 3.5vh;
        width: 30vw;
        @media (max-width: 480px) {width: 30vw;font-size: 0.75rem;};
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
      &.desc{
        @media (max-width: 480px) {font-size: 0.5rem;top: 66%;};
        text-align: center;
        top: 67%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
        color: grey;
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
        @media (max-width: 480px) {width: 40%;};
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
function Puffer() {
    const {cartItems, setCartItems} = useContext(CartContext);
const {stockData} = useContext(CartContext);
    const [lastItem, setLastItem] = useState(null);
    const [showAddedItem, setShowAddedItem] = useState(false);
    const [addedItemClassName, setAddedItemClassName] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState(3);
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

      const [display, setDisplay] = useState(Array(4).fill(false));
      const imagePaths = [
        `./img/3/3_3.webp`,
        `./img/3/3_4.webp`,
        `./img/3/3_5.webp`,
        `./img/3/3_6.webp`
      ];
      const handleImageClick = (index) => {
        setDisplay((prevDisplay) => prevDisplay.map((value, i) => (i === index ? !value : value)));
      };
      const displayedIndex = display.findIndex((value) => value);
     
    return (
        <>
            {showAddedItem && (
                <AddedProduct  className={`${addedItemClassName}`} onClick={() => {document.body.dataset.cart = "true";}}>
                    <button onClick={(event) => {event.stopPropagation(); setShowAddedItem(false)}} className="close">X</button>
                    <img className="img" src={`./img/${lastItem.id}.webp`}/>
                    <p className="added">ADDED TO YOUR CART</p>
                    <p className="name">{lastItem.name}</p>
                    <p className="price">{lastItem.price}€</p>
                </AddedProduct>
            )}
            {display.every((value) => !value)?(
              <Page>
                <Images>
                    <ImageFrame className="img1"><img src={`./img/3/3_3.webp`} onClick={() => handleImageClick(0)}/></ImageFrame>
                    <ImageFrame className="img2"><img src={`./img/3/3_4.webp`} onClick={() => handleImageClick(1)}/></ImageFrame>
                    <ImageFrame className="img3"><img src={`./img/3/3_5.webp`} onClick={() => handleImageClick(2)}/></ImageFrame>
                    <ImageFrame className="img4"><img src={`./img/3/3_6.webp`} onClick={() => handleImageClick(3)}/></ImageFrame>
                </Images>
                <InfoContainer>
                    <Info>
                        <h1>SHADOW MESH HOODIE ({selectedCategorie === 3 ? "BLACK" : "COPPER"})</h1>
                        <p className="description">100% POLYESTER MAILLE WITH CROCO PATTERN</p>
                        <p className="price">95€</p>
                        <p  className="stock">{selectedCategorie === 3 ? stockData[2] : stockData[3]} items left</p>
                        <div className="desc">The model is 180cm tall and wears an unique size. Length = 63cm<br/>You will be able to communicate additional informations about your measurements when finalizing your order</div>
                        <div>
                          <Categories>
                            <img className={selectedCategorie === 3 ? "selected" : ""} src={`./img/3.webp`} onClick={() => setSelectedCategorie(3)}/>
                            <img className={selectedCategorie === 4 ? "selected" : ""} src={`./img/4.webp`} onClick={() => setSelectedCategorie(4)}/>
                          </Categories>
                        </div>
                        <button disabled onClick={() => {if(selectedCategorie === 3 && stockData[2] !== 0 || selectedCategorie === 4 && stockData[3] !==0){addToCart({ id: selectedCategorie, name: selectedCategorie === 3 ? "SHADOW HOODIE (BLACK)" : "SHADOW HOODIE (COPPER)", price: 95, size: "null"})}}}>Sold Out</button>
                    </Info>
                </InfoContainer>
              </Page>
            ):(
              <Pop_up paths={imagePaths} displayIndex={displayedIndex} onClose={() => setDisplay((prevDisplay) => prevDisplay.map(() => false))} />
            )}
        </>
    );
  }
  
  export default Puffer