import React from 'react'
import styled from "styled-components"

const Close=styled.button`
    height: 4vh;
    width: 5vw;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 0.8rem;
    font-weight: 775;
    cursor: pointer;
    transition: 400ms;
    @media (max-width: 480px) {width: 20vw;}
    &:hover {
      color: #10100e;
      background-color: white;
      border-radius: 5px;
    }
`

const Pop_up = ({ paths, displayIndex, onClose }) => {
    const displayedPath = paths[displayIndex];
  
    return (
      displayedPath && (
        <div className="h-[84vh] w-screen flex justify-center items-center relative">
          <div className="laptop:h-full md:w-full md:h-[480px] flex justify-center items-center relative">
            {displayedPath === `./img/1.webp` || displayedPath === `./img/1/1_2.webp` ?(
              <img src={displayedPath} className="object-contain laptop:h-full md:w-full md:h-[480px] aspect-[1/1.2]" alt="Popup Image" />
            ):(
              <img src={displayedPath} className="object-cover laptop:h-full md:w-full md:h-[480px] aspect-[1/1.2]" alt="Popup Image" />
            )}
          </div>
            <Close className="absolute top-2 left-2" onClick={onClose}>
              X CLOSE
            </Close>
        </div>
      )
    );
  };

export default Pop_up