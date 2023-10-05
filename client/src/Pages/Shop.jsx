import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../Components/CartProvider.jsx';
import { useNavigate,useLocation} from 'react-router-dom';
import styled from "styled-components"

const initialHoverState = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5:false,
  6:false,
  7:false,
  8:false,
  9:false,
};
const Page = styled.div`
  @media (max-width: 480px) {
      width: 99.5vw;
      height: 99.5vh;
  }
`
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border: 1px solid white;
  @media (max-width: 480px) {grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, 1fr);};
`
const ProductFrame = styled.div`
    aspect-ratio: 1/1.2;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
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
    &.product6 {
      grid-area: 3 / 3 / 4 / 4;
      border-right: 1px solid white;
      border-bottom: 1px solid white;
      border-top: 1px solid white;
      @media (max-width: 480px) {grid-area: 5 / 1 / 6 / 2;
      border-bottom: 0px solid white;};
    }
    &.product7 {
      grid-area: 3 / 4 / 4 / 5;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
        border-top: 1px solid white;
        @media (max-width: 480px) {grid-area: 5 / 2 / 6 / 3;
          border-right: 0px solid white;
          border-bottom: 0px solid white;};
    }
    &.product8 {
      grid-area: 4 / 3 / 5 / 4;
        border-right: 1px solid white;
        @media (max-width: 480px) {grid-area: 8 / 1 / 9 / 2;};
    }
    &.product9 {
      grid-area: 4 / 4 / 5 / 5;
        border-right: 1px solid white;
        @media (max-width: 480px) {grid-area: 8 / 2 / 9 / 3;
        border-right: 0px solid white;};
    }
    &.product10 {
      grid-area: 3 / 1 / 5 / 3;
      border-right: 1px solid white;
      border-top: 1px solid white;
        @media (max-width: 480px) {border-bottom: 1px solid white;
          border-top: 1px solid white;
          grid-area: 6 / 1 / 8 / 3;};
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
    cursor: default;
    position: absolute;
    width: 100%;
    height: 4vh;
    transition: bottom 0.5s ease;
    bottom: ${({ show }) => (show ? '0' : '-10%')};
    @media (max-width: 480px) {bottom: ${({ show }) => (show ? '0' : '-15%')};};
    background-color: white;
    color: black;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
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
  @media (max-width: 480px) {width: 25vw;font-size: 0.5rem;};
  &:hover {
    color: white;
    background-color: #10100e;
    border-radius: 5px;
  }
  span {
    @media (max-width: 480px) {display: none;}
  }
`
const Option = styled.div`
  background-color: transparent;
  height: 80%;
  width: 7vw;
  padding: 0.5rem;
  border: 1px solid transparent;
  @media (max-width: 480px) {width: 25vw;font-size: 0.5rem;};
  &.selected{
    border: 1px solid #10100e;
  }
  margin: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  color: #10100e;
  font-size: 0.625rem;
  font-weight: 775;
  display: flex;
  justify-content: center;
`
function Shop() {
  const navigate = useNavigate();
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
      const [selectedCategorie, setSelectedCategorie] = useState(0);
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
                <img className="img" src={`./img/${lastItem.id}.png`}/>
                <p className="added">ADDED TO YOUR CART</p>
                <p className="name">{lastItem.name}</p>
                <p className="price">{lastItem.price}€</p>
              </AddedProduct>
            )}
            <Grid>
                <ProductFrame className="product1" onMouseEnter={() =>handleMouseEnter(0)} onMouseLeave={() =>handleMouseLeave(0)} onClick={() => {navigate("/rosace puffer");}}>
                    <ProcuctImg src="./img/1.png"/>
                    <ShootImg show={isHovered[0]} src="./img/1_2.png"/>
                    <ProductName show={isHovered[0]}>ROSACE PUFFER</ProductName>
                    <ProductPrice show={isHovered[0]}>400€</ProductPrice>
                    <ProductBar show={isHovered[0]}>
                      <Button onClick={(event) => {event.stopPropagation();navigate("/rosace puffer");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Button onClick={(event) => {event.stopPropagation();addToCart({ id: 1, name: 'ROSACE PUFFER', price: 400})}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product2" onMouseEnter={() =>handleMouseEnter(1)} onMouseLeave={() =>handleMouseLeave(1)} onClick={() => {navigate("/jupiter longsleeve");}}>
                <ProcuctImg src="./img/2.png"/>
                    <ShootImg show={isHovered[1]} src="./img/8_2.jpg"/>
                    <ProductName show={isHovered[1]}>JUPITER LONGSLEEVES</ProductName>
                    <ProductPrice show={isHovered[1]}>185€</ProductPrice>
                    <ProductBar show={isHovered[1]}>
                      <Button onClick={(event) => {event.stopPropagation();navigate("/jupiter longsleeve");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Button onClick={(event) => {event.stopPropagation();addToCart({ id: 2, name: 'JUPITER LONGSLEEVE', price: 185})}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product3" onMouseEnter={() =>handleMouseEnter(2)} onMouseLeave={() =>{handleMouseLeave(2);setSelectedCategorie(0)}} onClick={() => {navigate("/shadow hoodie");}}>
                <ProcuctImg src="./img/3.png"/>
                    <ShootImg show={isHovered[2]} src="./img/3_2.jpg"/>
                    <ProductName show={isHovered[2]}>SHADOW MESH HOODIE</ProductName>
                    <ProductPrice show={isHovered[2]}>95€</ProductPrice>
                    <ProductBar show={isHovered[2]}>
                      <Button onClick={(event) => {event.stopPropagation();navigate("/shadow hoodie");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 3 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(3)}}>BLACK</Option>
                      <Option className={selectedCategorie === 4 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(4)}}>COPPER</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 3 ? "SHADOW HOODIE (BLACK)" : "SHADOW HOODIE (COPPER)", price: 95}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product4" onMouseEnter={() =>handleMouseEnter(3)} onMouseLeave={() =>{handleMouseLeave(3);setSelectedCategorie(0)}} onClick={() => {navigate("/shadow dress");}}>
                <ProcuctImg src="./img/5.png"/>
                    <ShootImg show={isHovered[3]} src="./img/5_2.jpg"/>
                    <ProductName show={isHovered[3]}>SHADOW MESH DRESS</ProductName>
                    <ProductPrice show={isHovered[3]}>150€</ProductPrice>
                    <ProductBar show={isHovered[3]}>
                      <Button onClick={(event) => {event.stopPropagation();navigate("/shadow dress");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 5 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(5)}}>BLACK</Option>
                      <Option className={selectedCategorie === 6 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(6)}}>COPPER</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 5 ? "SHADOW DRESS (BLACK)" : "SHADOW DRESS (COPPER)", price: 150}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product5" onMouseEnter={() =>handleMouseEnter(4)} onMouseLeave={() =>handleMouseLeave(4)} onClick={() => {navigate("/maelstrom");}}>
                <ProcuctImg src="./img/7.png"/>
                    <ShootImg show={isHovered[4]} src="./img/7_2.jpg"/>
                    <ProductName className="product5" show={isHovered[4]}>MAELSTROM</ProductName>
                    <ProductPrice className="product5" show={isHovered[4]}>120€</ProductPrice>
                    <ProductBar show={isHovered[4]}>
                      {/* <Button onClick={(event) => {event.stopPropagation();addToCart({ id: 7, name: 'MAELSTROM', price: 120})}}>
                        ADD <span>TO CART</span>
                      </Button> */}
                      <Button onClick={() => {navigate("/maelstrom");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product6" onMouseEnter={() =>handleMouseEnter(5)} onMouseLeave={() =>{handleMouseLeave(5);setSelectedCategorie(0)}}  onClick={() => {navigate("/jupi pants");}}>
                <ProcuctImg src="./img/8.png"/>
                    <ShootImg show={isHovered[5]} src="./img/8_2.jpg"/>
                    <ProductName className="product6" show={isHovered[5]}>JUPITER PANTS</ProductName>
                    <ProductPrice className="product6" show={isHovered[5]}>375€</ProductPrice>
                    <ProductBar show={isHovered[5]}>
                      <Button onClick={() => {navigate("/jupi pants");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 8 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(8)}}>MILANO</Option>
                      <Option className={selectedCategorie === 9 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(9)}}>MICROFIBER</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 8 ? "JUPITER (MILANO)" : "JUPITER (MICROFIBER)", price: 375}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product7" onMouseEnter={() =>handleMouseEnter(6)} onMouseLeave={() =>{handleMouseLeave(6);setSelectedCategorie(0)}} onClick={() => {navigate("/durag");}}>
                <ProcuctImg src="./img/10.png"/>
                    <ShootImg show={isHovered[6]} src="./img/10/10_2.jpg"/>
                    <ProductName className="product7" show={isHovered[6]}>SHADOW DURAG</ProductName>
                    <ProductPrice className="product7" show={isHovered[6]}>95€</ProductPrice>
                    <ProductBar show={isHovered[6]}>
                      <Button onClick={() => {navigate("/durag");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 10 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(10)}}>BLACK</Option>
                      <Option className={selectedCategorie === 11 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(11)}}>COPPER</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 10 ? "DURAG (BLACK)" : "DURAG (COPPER)", price: 95}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product8" onMouseEnter={() =>handleMouseEnter(7)} onMouseLeave={() =>{handleMouseLeave(7);setSelectedCategorie(0)}} onClick={() => {navigate("/scar long");}}>
                <ProcuctImg src="./img/12.png"/>
                    <ShootImg show={isHovered[7]} src="./img/5_2.jpg"/>
                    <ProductName className="product8" show={isHovered[7]}>SCAR TOP LONGSLEEVES</ProductName>
                    <ProductPrice className="product8" show={isHovered[7]}>115€</ProductPrice>
                    <ProductBar show={isHovered[7]}>
                      <Button onClick={() => {navigate("/scar long");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 12 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(12)}}>DUST</Option>
                      <Option className={selectedCategorie === 13 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(13)}}>BLOOD</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 12 ? "SCAR LONG (DUST)" : "SCAR LONG (BLOOD)", price: 115}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product9" onMouseEnter={() =>handleMouseEnter(8)} onMouseLeave={() =>{handleMouseLeave(8);setSelectedCategorie(0)}} onClick={() => {navigate("/scar short");}}>
                <ProcuctImg src="./img/15.png"/>
                    <ShootImg show={isHovered[8]} src="./img/5_2.jpg"/>
                    <ProductName className="product9" show={isHovered[8]}>SCAR TOP SHORTSLEEVES</ProductName>
                    <ProductPrice className="product9" show={isHovered[8]}>95€</ProductPrice>
                    <ProductBar show={isHovered[8]}>
                      <Button onClick={() => {navigate("/scar short");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 14 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(14)}}>DUST</Option>
                      <Option className={selectedCategorie === 15 ? "selected" : ""} onClick={(event) => {event.stopPropagation();setSelectedCategorie(15)}}>BLOOD</Option>
                      <Button onClick={(event) => {event.stopPropagation();selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 14 ? "SCAR SHORT (DUST)" : "SCAR SHORT (BLOOD)", price: 95}): null;}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product10" onMouseEnter={() =>handleMouseEnter(9)} onMouseLeave={() =>handleMouseLeave(9)}  onClick={() => {navigate("/jupi shirt");}}>
                <ProcuctImg src="./img/16.png"/>
                    <ShootImg show={isHovered[9]} src="./img/16_2.jpg"/>
                    <ProductName className="product10" show={isHovered[9]}>JUPITER SHIRT</ProductName>
                    <ProductPrice className="product10" show={isHovered[9]}>120€</ProductPrice>
                    <ProductBar show={isHovered[9]}>
                      {/* <Button onClick={(event) => {event.stopPropagation();addToCart({ id: 16, name: 'JUPITER SHIRT', price: 120})}}>
                        ADD <span>TO CART</span>
                      </Button> */}
                      <Button onClick={() => {navigate("/jupi shirt");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
            </Grid>
        </Page>
    )
}
export default Shop