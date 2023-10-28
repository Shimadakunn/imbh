import React from 'react'
import styled from "styled-components"
import { useNavigate} from 'react-router-dom';
import '../global.css'

const Button=styled.button`
    height: 2rem;
    width: 75%;
    border: none;
    background-color: white;
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
`

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="laptop:h-[84vh] w-screen laptop:grid laptop:grid-flow-col laptop:grid-cols-[65vw] flex flex-col">
        <div class="flex items-center justify-center font-[Dirty] laptop:text-9xl text-5xl laptop:p-16 py-12 px-8 flex-col">
            i'M bEhInD mY heAd
            <Button className="font-[Neue] laptop:pt-0 mt-6" onClick={()=>navigate("/shop")}>
              SHOP
            </Button>
        </div>
        <div className="overflow-hidden">
            <img src="../img/14/7_8.webp" className="h-full w-full object-contain"/>
        </div>
    </div>
  )
}

export default Home