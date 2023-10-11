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
    font-weight: 600;
    bottom: 5%;
    right: 5%;
  }
`
const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
`
const Images = styled.div`
    flex: 0.65;
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
    transition: 100ms;
    @media (max-width: 480px) {top: 10vh;width: 45vw;};
    top: 10vh;
    height: 89.9vh;
    width: 35vw;
    padding: 5rem;
    border: 1px solid white;
    button {
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        top: 65%;
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
      top: 40%;
      transform: translate(50%, -50%);
      text-align: center;
      width: 70%;
      font-size: 0.8rem;
      font-weight: 600;
      width: 70%;
      &.price {
        top: 32.5%;
        font-size: 1rem;
        font-weight: 775;
      }
      @media (max-width: 480px) {font-size: 0.7rem;
        width: 85%;};
    }
    div{
      position: absolute;
      right: 50%;
      top: 52.5%;
      transform: translate(50%, -50%);
      width: 100%;
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
function Puffer() {
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
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const documentHeight = document.documentElement.offsetHeight;
      const isElementAtBottom = scrollPosition >= documentHeight - 0.1 * window.innerHeight;

      setIsAtBottom(isElementAtBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const elementStyle = {
    top: isAtBottom ? '5vh' : '10vh',
  };
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
            <Page>
                <Images>
                    <ImageFrame className="img1"><img src={`./img/7/7_3.webp`}/></ImageFrame>
                    <ImageFrame className="img2"><img src={`./img/7/7_8.webp`}/></ImageFrame>
                    <ImageFrame className="img3"><img src={`./img/7/7_5.webp`}/></ImageFrame>
                    <ImageFrame className="img4"><img src={`./img/7/7_7.webp`}/></ImageFrame>
                </Images>
                <InfoContainer>
                    <Info style={elementStyle}>
                        <h1>MAELSTROM</h1>
                        <p>100% MESH SHORTSLEEVES BI COLOUR</p>
                        <p className="price">4500€</p>
                        <Categories>
                          <img className="selected" src={`./img/7.webp`}/>
                        </Categories>
                        {/* <button onClick={() => {addToCart({ id: 7, name: 'MAELSTROM', price: 4500})}}>Add to Cart</button> */}
                        <button>COMING SOON</button>
                    </Info>
                </InfoContainer>
            </Page>
        </>
    );
  }
  
  export default Puffer