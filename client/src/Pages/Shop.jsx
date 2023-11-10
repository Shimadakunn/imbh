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
`
const AddedProduct = styled.div`
  transform-origin: top;
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
        border-top: 1px solid white;
        @media (max-width: 480px) {grid-area: 8 / 2 / 9 / 3;
        border-bottom: 1px solid white;
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
`
const ShootImg = styled.img`
  position: absolute;
  object-fit: cover;
  aspect-ratio: 1/1.2;
  overflow: hidden;
  background-color: #10100e;
  width: 100%;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 500ms ease;
`
const ProductName = styled.div`
  font-family: 'Neue';
  position: absolute;
  left:5%;
  transition: bottom 0.5s ease;
  font-size: 0.75rem;
  font-weight: 600;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
  &.product5, &.product7{bottom: ${({ show }) => (show ? '5%' : '2.5%')};}
  @media (max-width: 480px) {bottom: ${({ show }) => (show ? '15%' : '5%')};
    &.product5, &.product7{bottom: ${({ show }) => (show ? '7.5%' : '2.5%')};}};
  @media (max-width: 480px) {font-size: 0.65rem;};
  & span{
    @media (max-width: 480px) {display: none;};
  }
`
const ProductPrice = styled.div`
  position: absolute;
  bottom:5%;
  right:5%;
  Font-size: 0.8rem;
  font-weight: 1000;
  transition: bottom 0.5s ease;
  bottom: ${({ show }) => (show ? '10%' : '5%')};
  &.product5, &.product7{bottom: ${({ show }) => (show ? '5%' : '2.5%')};}
  @media (max-width: 480px) {bottom: ${({ show }) => (show ? '15%' : '5%')};
    &.product5, &.product7{bottom: ${({ show }) => (show ? '7.5%' : '2.5%')};}};
`
const ProductToolTip = styled.div`
  position: absolute;
  bottom:7.5%;
  right:5%;
  transition: bottom 0.5s ease;
  transform-origin: bottom;
  width: 4rem;
  height: 2rem;
  background-color: white;
  color: #10100e;
  border-radius: 5px;
  font-size: 0.625rem;
  @media (max-width: 480px) {bottom: 12.5%};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  transition: all 0.5s ease;
  @media (max-width: 480px) {bottom: 15%;right: 0%;};
  bottom: ${({ show }) => (show ? '7.5%' : '2.5%')};
  &.show { transform: scale(1);}
  &.big{
    bottom:4%;
    right:4%;
    @media (max-width: 480px) {bottom: 9%;right: 2%;};
  }
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
  align-items: center;
`
function Shop() {
  const navigate = useNavigate();
    const {cartItems, setCartItems} = useContext(CartContext);
    const {stockData} = useContext(CartContext);
    useEffect(() => {
      console.log(stockData);
    }, []);
    const [lastItem, setLastItem] = useState(null);
    const [showAddedItem, setShowAddedItem] = useState(false);
    const [addedItemClassName, setAddedItemClassName] = useState('');
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
      const [selectedCategorie, setSelectedCategorie] = useState(0);
      const [selectedSize, setSelectedSize] = useState("M");
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
      const [showToolTip, setShowToolTip] = useState(Array(9).fill(false));
      const [addedToolTip, setAddedToolTip] = useState(Array(9).fill(''));
      const handleToolTip = (index) => {
        setShowToolTip(Array(9).fill(false));
        setAddedToolTip(Array(9).fill(''));
        setShowToolTip((prevItems) => ({
          ...prevItems,
          [index]: true,
        }));
      };
      useEffect(() => {
        for (let index = 0; index < 9; index++) {
          if (showToolTip[index]) {
            setAddedToolTip(prevState => {
              const newState = [...prevState];
              newState[index] = 'show';
              return newState;
            });
      
            const timer = setTimeout(() => {
              setShowToolTip((prevState) => ({
                ...prevState,
                [index]: false,
              }));
            }, 3000);
      
            const timer2 = setTimeout(() => {
              setAddedToolTip(prevState => {
                const newState = [...prevState];
                newState[index] = '';
                return newState;
              });
            }, 2750);
      
            return () => {
              clearTimeout(timer);
              clearTimeout(timer2);
            };
          }
        }
      }, [showToolTip]);
    return (
        <Page>
            {showAddedItem && (
              <AddedProduct  className={`${addedItemClassName}`} onClick={() => {document.body.dataset.cart = "true";}}>
                <button onClick={() => { setShowAddedItem(false)}} className="close">X</button>
                <img className="img" src={`./img/${lastItem.id}.webp`}/>
                <p className="added">ADDED TO YOUR CART</p>
                <p className="name">{lastItem.name}{lastItem.size !== "null" ? ` (${lastItem.size[lastItem.size.length - 1]})` : null}</p>
                <p className="price">{lastItem.price}€</p>
              </AddedProduct>
            )}
            <Grid>
                <ProductFrame className="product10" onMouseEnter={() =>handleMouseEnter(0)} onMouseLeave={() =>{handleMouseLeave(0);setSelectedSize("M")}}>
                    <ProcuctImg src="./img/1.webp"/>
                    <ShootImg show={isHovered[0]} src="./img/1/1_3.webp" onClick={() => {isHovered[0] ? navigate("/rosace puffer"):null;}}/>
                    <ProductName className="product7" show={isHovered[0]}>ROSACE PUFFER</ProductName>
                    <ProductPrice className="product7" show={isHovered[0]}>400€</ProductPrice>
                    <ProductBar show={isHovered[0]}>
                      <Button onClick={() => {navigate("/rosace puffer");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedSize === "S" ? "selected" : ""} onClick={() => {setSelectedSize("S")}}>S</Option>
                      <Option className={selectedSize === "M" ? "selected" : ""} onClick={() => {setSelectedSize("M")}}>M</Option>
                      <Option className={selectedSize === "L" ? "selected" : ""} onClick={() => {setSelectedSize("L")}}>L</Option>
                      <Button onClick={() => {selectedSize !== 0 ? addToCart({ id: 1, name: 'ROSACE PUFFER', price: 400,size: "Puffer:"+selectedSize}):null}}>
                        ADD <span>TO CART</span> 
                      </Button>
                    </ProductBar>
                    <ProductToolTip className={`${addedToolTip[0]} big`} show={isHovered[0]}>Select size</ProductToolTip>
                </ProductFrame>
                <ProductFrame className="product5" onMouseEnter={() =>handleMouseEnter(1)} onMouseLeave={() => {handleMouseLeave(1);setSelectedSize("M")}}>
                    <ProcuctImg src="./img/7.webp"/>
                    <ShootImg show={isHovered[1]} src="./img/7/7_4.webp" onClick={() => {isHovered[1] ? navigate("/jupiter anorak"):null;}}/>
                    <ProductName  className="product5" show={isHovered[1]}>JUPITER ANORAK</ProductName>
                    <ProductPrice  className="product5" show={isHovered[1]}>450€</ProductPrice>
                    <ProductBar show={isHovered[1]}>
                      <Button onClick={() => {navigate("/jupiter anorak");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedSize === "S" ? "selected" : ""} onClick={() => {setSelectedSize("S")}}>S</Option>
                      <Option className={selectedSize === "M" ? "selected" : ""} onClick={() => {setSelectedSize("M")}}>M</Option>
                      <Option className={selectedSize === "L" ? "selected" : ""} onClick={() => {setSelectedSize("L")}}>L</Option>
                      <Button onClick={() => {addToCart({ id: 7, name: 'JUPITER ANORAK', price: 450,size: "Jupi Ano:"+selectedSize})}}>
                        ADD <span>TO CART</span> 
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product6" onMouseEnter={() =>handleMouseEnter(2)} onMouseLeave={() =>{handleMouseLeave(2);setSelectedCategorie(0)}}>
                    {selectedCategorie !== 4 ?<ProcuctImg src="./img/3.webp" onClick={() => { navigate("/shadow hoodie")}}/>: null}
                    {selectedCategorie === 4 ? <ProcuctImg src="./img/4.webp" onClick={() => {navigate("/shadow hoodie")}}/> : null}
                    {selectedCategorie === 0 ? <ShootImg show={isHovered[2]} src="./img/3/3_2.webp" onClick={() => {isHovered[2] ? navigate("/shadow hoodie"):null;}}/>: null}
                    <ProductName show={isHovered[2]}>SHADOW <span>MESH</span> HOODIE</ProductName>
                    <ProductPrice show={isHovered[2]}>95€</ProductPrice>
                    <ProductBar show={isHovered[2]}>
                      <Button onClick={() => {navigate("/shadow hoodie");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 3 ? "selected" : ""} onClick={() => {setSelectedCategorie(3)}}>BLACK</Option>
                      <Option className={selectedCategorie === 4 ? "selected" : ""} onClick={() => {setSelectedCategorie(4)}}>COPPER</Option>
                      <Button onClick={() => {selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 3 ? "SHADOW HOODIE (BLACK)" : "SHADOW HOODIE (COPPER)", price: 95,size:"null" }): handleToolTip(2);}}>
                        ADD <span>TO CART</span> 
                      </Button>
                    </ProductBar>
                    <ProductToolTip className={`${addedToolTip[2]}`} show={isHovered[2]}>Select color</ProductToolTip>
                </ProductFrame>
                <ProductFrame className="product7" onMouseEnter={() =>handleMouseEnter(3)} onMouseLeave={() =>{handleMouseLeave(3);setSelectedCategorie(0)}}>
                    {selectedCategorie !== 6 ?<ProcuctImg src="./img/5.webp" onClick={() => {isHovered[3] ? navigate("/shadow dress"):null;}}/>: null}
                    {selectedCategorie === 6 ? <ProcuctImg src="./img/6.webp" onClick={() => {isHovered[3] ? navigate("/shadow dress"):null;}}/> : null}
                    {selectedCategorie === 0 ?<ShootImg show={isHovered[3]} src="./img/5/5_2.webp" onClick={() => {isHovered[3] ? navigate("/shadow dress"):null;}}/>: null}
                    <ProductName show={isHovered[3]}>SHADOW <span>MESH</span> DRESS</ProductName>
                    <ProductPrice show={isHovered[3]}>150€</ProductPrice>
                    <ProductBar show={isHovered[3]}>
                      <Button onClick={() => {navigate("/shadow dress");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 5 ? "selected" : ""} onClick={() => {setSelectedCategorie(5)}}>BLACK</Option>
                      <Option className={selectedCategorie === 6 ? "selected" : ""} onClick={() => {setSelectedCategorie(6)}}>COPPER</Option>
                      <Button onClick={() => {selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 5 ? "SHADOW DRESS (BLACK)" : "SHADOW DRESS (COPPER)", price: 150,size:"null" }): handleToolTip(3);}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                    <ProductToolTip className={`${addedToolTip[3]}`} show={isHovered[3]}>Select color</ProductToolTip>
                </ProductFrame>
                <ProductFrame className="product1" onMouseEnter={() =>handleMouseEnter(5)} onMouseLeave={() =>{handleMouseLeave(5);setSelectedSize("M")}}>
                    <ProcuctImg src="./img/9.webp"/>
                    <ShootImg show={isHovered[5]} src="./img/9/9_4.webp" onClick={() => {isHovered[5] ?navigate("/jupi pants micro"):null}}/>
                    <ProductName className="product" show={isHovered[5]}>JUPITER MICROFIBER</ProductName>
                    <ProductPrice className="product" show={isHovered[5]}>375€</ProductPrice>
                    <ProductBar show={isHovered[5]}>
                      <Button onClick={() => {navigate("/jupi pants micro");}}>
                        SEE
                      </Button>
                      <Option className={selectedSize === "S" ? "selected" : ""} onClick={() => {setSelectedSize("S")}}>S</Option>
                      <Option className={selectedSize === "M" ? "selected" : ""} onClick={() => {setSelectedSize("M")}}>M</Option>
                      <Option className={selectedSize === "L" ? "selected" : ""} onClick={() => {setSelectedSize("L")}}>L</Option>
                      <Button onClick={() => {addToCart({ id: 9, name:"JUPITER (MICROFIBER)", price: 375, size:"Jupi Micro:"+selectedSize})}}>
                        ADD
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product2" onMouseEnter={() =>handleMouseEnter(8)} onMouseLeave={() =>{handleMouseLeave(8);setSelectedSize("M")}}>
                    <ProcuctImg src="./img/8.webp"/>
                    <ShootImg show={isHovered[8]} src="./img/8/8_3.webp" onClick={() => {isHovered[8] ?navigate("/jupi pants milano"):null}}/>
                    <ProductName className="product" show={isHovered[8]}>JUPITER MILANO</ProductName>
                    <ProductPrice className="product" show={isHovered[8]}>285€</ProductPrice>
                    <ProductBar show={isHovered[8]}>
                      <Button onClick={() => {navigate("/jupi pants milano");}}>
                        SEE
                      </Button>
                      <Option className={selectedSize === "S" ? "selected" : ""} onClick={() => {setSelectedSize("S")}}>S</Option>
                      <Option className={selectedSize === "M" ? "selected" : ""} onClick={() => {setSelectedSize("M")}}>M</Option>
                      <Option className={selectedSize === "L" ? "selected" : ""} onClick={() => {setSelectedSize("L")}}>L</Option>
                      <Button onClick={() => {addToCart({ id: 8, name:"JUPITER (MILANO)" , price:285,size:"Jupi Milano:"+selectedSize})}}>
                        ADD
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product4" onMouseEnter={() =>handleMouseEnter(6)} onMouseLeave={() =>{handleMouseLeave(6);setSelectedCategorie(0)}}>
                    {selectedCategorie !== 11 ?<ProcuctImg src="./img/10.webp" onClick={() => {isHovered[6] ? navigate("/durag"):null;}}/>: null}
                    {selectedCategorie === 11 ? <ProcuctImg src="./img/11.webp" onClick={() => {isHovered[6] ? navigate("/durag"):null;}}/> : null}
                    {selectedCategorie === 0 ?<ShootImg show={isHovered[6]} src="./img/10/10_2.webp" onClick={() => {isHovered[6] ? navigate("/durag"):null;}}/>: null}
                    <ProductName className="product4" show={isHovered[6]}>SHADOW DURAG</ProductName>
                    <ProductPrice className="product4" show={isHovered[6]}>55€</ProductPrice>
                    <ProductBar show={isHovered[6]}>
                      <Button onClick={() => {navigate("/durag");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 10 ? "selected" : ""} onClick={() => {setSelectedCategorie(10)}}>BLACK</Option>
                      <Option className={selectedCategorie === 11 ? "selected" : ""} onClick={() => {setSelectedCategorie(11)}}>COPPER</Option>
                      <Button onClick={() => {selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 10 ? "DURAG (BLACK)" : "DURAG (COPPER)", price: 55,size:"null" }): handleToolTip(6);}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                    <ProductToolTip className={`${addedToolTip[6]}`} show={isHovered[6]}>Select color</ProductToolTip>
                </ProductFrame>
                <ProductFrame className="product3" onMouseEnter={() =>handleMouseEnter(7)} onMouseLeave={() =>{handleMouseLeave(7);setSelectedCategorie(0)}}>
                    {selectedCategorie !== 13 ?<ProcuctImg src="./img/12.webp" onClick={() => {isHovered[7] ? navigate("/scar long"):null;}}/>: null}
                    {selectedCategorie === 13 ? <ProcuctImg src="./img/13.webp" onClick={() => {isHovered[7] ? navigate("/scar long"):null;}}/> : null}
                    {selectedCategorie === 0 ?<ShootImg show={isHovered[7]} src="./img/12/12_3.webp" onClick={() => {isHovered[7] ? navigate("/scar long"):null;}}/>: null}
                    <ProductName className="product3" show={isHovered[7]}>SCAR LONGSLEEVES</ProductName>
                    <ProductPrice className="product3" show={isHovered[7]}>115€</ProductPrice>
                    <ProductBar show={isHovered[7]}>
                      <Button onClick={() => {navigate("/scar long");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                      <Option className={selectedCategorie === 12 ? "selected" : ""} onClick={() => {setSelectedCategorie(12)}}>DUST</Option>
                      <Option className={selectedCategorie === 13 ? "selected" : ""} onClick={() => {setSelectedCategorie(13)}}>BLOOD</Option>
                      <Button onClick={() => {selectedCategorie !== 0 ? addToCart({ id: selectedCategorie, name:selectedCategorie === 12 ? "SCAR LONG (DUST)" : "SCAR LONG (BLOOD)", price: 115,size:"null" }): handleToolTip(7);}}>
                        ADD <span>TO CART</span>
                      </Button>
                    </ProductBar>
                    <ProductToolTip className={`${addedToolTip[7]}`} show={isHovered[7]}>Select color</ProductToolTip>
                </ProductFrame>
                <ProductFrame className="product8" onMouseEnter={() =>handleMouseEnter(9)} onMouseLeave={() =>{handleMouseLeave(9);setSelectedSize("M")}}>
                    <ProcuctImg src="./img/2.webp"/>
                    <ShootImg show={isHovered[9]} src="./img/2/2_4.webp" onClick={() => {isHovered[9] ?navigate("/jupiter long"):null;}}/>
                    <ProductName className="product" show={isHovered[9]}>JUPITER LONGSLEEVE</ProductName>
                    <ProductPrice className="product" show={isHovered[9]}>185€</ProductPrice>
                    <ProductBar show={isHovered[9]}>
                      <Button onClick={() => {navigate("/jupiter long");}}>
                        SEE
                      </Button>
                      <Option className={selectedSize === "S" ? "selected" : ""} onClick={() => {setSelectedSize("S")}}>S</Option>
                      <Option className={selectedSize === "M" ? "selected" : ""} onClick={() => {setSelectedSize("M")}}>M</Option>
                      <Option className={selectedSize === "L" ? "selected" : ""} onClick={() => {setSelectedSize("L")}}>L</Option>
                      <Button onClick={() => {addToCart({ id: 2, name:"JUPITER LONGSLEEVE" , price:185,size:"Jupi Long:"+selectedSize})}}>
                        ADD
                      </Button>
                    </ProductBar>
                </ProductFrame>
                <ProductFrame className="product9" onMouseEnter={() =>handleMouseEnter(4)} onMouseLeave={() =>handleMouseLeave(4)}>
                    <ProcuctImg src="./img/14.webp"/>
                    <ShootImg show={isHovered[4]} src="./img/14/7_2.webp" onClick={() => {isHovered[4] ? navigate("/maelstrom"):null;}}/>
                    <ProductName className="product8" show={isHovered[4]}>MAELSTROM</ProductName>
                    <ProductPrice className="product8" show={isHovered[4]}>???€</ProductPrice>
                    <ProductBar show={isHovered[4]}>
                      <Button onClick={() => {navigate("/maelstrom");}}>
                        SEE <span>PRODUCT</span>
                      </Button>
                    </ProductBar>
                </ProductFrame>
            </Grid>
        </Page>
    )
}
export default Shop