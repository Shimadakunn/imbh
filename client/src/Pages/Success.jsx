import React, { useEffect, useState, useContext} from 'react';
import {CartContext} from '../Components/CartProvider.jsx';
import { useNavigate,useLocation} from 'react-router-dom';
import styled from "styled-components"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 25vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background-color: blue;
  div {
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`
const Img = styled.img`
  width: 100px;
  height: 100px;
`
const Button = styled.button`
  height: 5vh;
  width: 10vw;
  background-color: #10100e;
  border: none;
  color: white;
  font-size: 0.8rem;
  font-weight: 775;
  cursor: pointer;
  transition: 400ms;
  @media (max-width: 480px) {width: 25vw;};
  &:hover {
    color: #10100e;
    background-color: white;
    border-radius: 5px;
  }
`

function Success() {
  return (
    <Page>
      <div>
        <Img src="./icon/success.svg"/>
        <h1>Success</h1>
      </div>
      <div>
        <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
      </div>
    </Page>
  )
}

export default Success