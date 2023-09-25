import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from './CartProvider.jsx';
import { useNavigate,useLocation} from 'react-router-dom';
import styled from "styled-components"

const Head = styled.header`
  height: 8.5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 2rem;
  position: sticky;
  top: 0;
  z-index: 2;
  @media (max-width: 480px) {
    height: 10vh;
    padding:0 1rem;
  }
`
const Logo = styled.div`
  order: 1;
  font-family: 'Baunk', sans-serif;
  color: white;
  font-size: 2rem;
  @media (max-width: 480px) {
    display: none;
  }
`
const NavBar = styled.div`
    order: 2;
    background-color: blue;
    width: 35vw;
    height: 3.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 480px) {
      width: 100vw;
      height: 5vh;
    }
`
const Access = styled.div`
    height: 100%;
    background-color: white;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ABCPermanent,Arial,sans-serif;
    font-size: 0.8rem;
    font-weight: 750;
    color: #10100e;
    cursor: pointer;
    position: relative;
    transition: 400ms;
    &.home {@media (max-width: 480px) {border-right: 1px solid #10100e;}}
    &.about {@media (max-width: 480px) {border-right: 1px solid #10100e;}}
    &.cart {flex: 0.5;}
    &.logo{
      display: none;
      font-family: 'Baunk', sans-serif;
      @media (max-width: 480px) {
        flex: 2;
        display: flex;
        border-right: 1px solid #10100e;
        justify-content: flex-start;
        padding-left: 2rem;
      }
    }
    &:hover{
      background-color: #10100e;
      color: white;
    }
    & .iconCart{
      width: 1.75rem;
    }
    & .itemInCart{
      position: absolute;
      bottom: -2.5px;
      color: red;
      font-size: 1.5rem;
      @media (max-width: 480px) {bottom: -1px;}
      
    }
`
function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);
  const {cartItems, setCartItems} = useContext(CartContext);
    return (
      <Head>
        <Logo>IMBH</Logo>
        <NavBar>
            <Access className="logo" onClick={() => {navigate("/");}}>IMBH</Access>
            <Access className="home" onClick={() => {navigate("/");}}>HOME</Access>
            <Access className="about" onClick={() => {navigate("/shop");}}>PRODUCT</Access>
            <Access className="cart" onClick={() => {document.body.dataset.cart = "true";}}>
              <img className="iconCart" src={`./icon/bag.png`}/>
              {cartItems.length > 0 && (
                <div className="itemInCart">
                  .
                </div>
              )}
            </Access>
        </NavBar>
      </Head>
    )
  }
  
  export default Header