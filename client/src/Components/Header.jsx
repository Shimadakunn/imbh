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
`
const Logo = styled.div`
  order: 1;
  font-family: 'Baunk', sans-serif;
  color: white;
  font-size: 2rem;
`
const NavBar = styled.div`
    order: 2;
    background-color: blue;
    width: 35vw;
    height: 3.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Access = styled.div`
    height: 100%;
    background-color: white;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &.icon {flex: 0.5;}
    &.edu {flex: 1.5;}
    font-family: ABCPermanent,Arial,sans-serif;
    font-size: 0.8rem;
    font-weight: 750;
    color: #10100e;
    cursor: pointer;
    position: relative;
    transition: 400ms;
    &:hover{
      background-color: #10100e;
      color: white;
    }
    & .text{
      font-family: ABCPermanent,Arial,sans-serif;
      font-size: 0.75rem;
      font-weight: 750;
      color: #10100e;
      transition: 400ms;
    }
    &:hover .text {
      color: white;
    }
    & .itemInCart{
      position: absolute;
      bottom: -1px;
      color: red;
      font-size: 1.5rem;
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
            <Access className="edu" onClick={() => {navigate("/");}}>
              <div className="text">HOME</div>
            </Access>
            <Access onClick={() => {navigate("/shop");}}>
              <div className="text">SHOP</div>
            </Access>
            <Access><div className="text">TREATMENT</div></Access>
            <Access><div className="text">SALOON</div></Access>
            <Access><div className="text">ABOUT US</div></Access>
            <Access className="icon">U</Access>
            <Access className="icon" onClick={() => {document.body.dataset.cart = "true";}}>
              C
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