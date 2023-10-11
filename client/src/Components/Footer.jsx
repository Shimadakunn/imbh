import React, { useEffect, useState, useContext} from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import styled from "styled-components"

const Foot = styled.footer`
    height: 5vh;
    width: 100vw;
    background-color: transparent;
    position: relative;
`
const Img = styled.img`
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    &.insta{
        right: 2rem;
    }
    &.twitter{
        right: 5em;
    }
`
const Text = styled.p`
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &.cvg{
        left: 2rem;
        font-size: 0.8rem;
        font-weight: 600;
    }
`
function Header() {
    return (
        <Foot>
            <a href="https://twitter.com/Imbehindmyhead1"><Img className = "insta" src="./icon/insta.svg"/></a>
            <a href="https://www.instagram.com/imbehindmyhead/"><Img className = "twitter" src="./icon/twitter.svg"/></a>
            <Text className ="cvg">CVG</Text>
        </Foot>
    )
}
export default Header