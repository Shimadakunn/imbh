import React from 'react';
import styled from "styled-components"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera  } from "@react-three/drei";
import Puffer from "./3D objects/B_puffer"

const Section = styled.div`
  height: 100vh;
  color: white;
  padding-top: 20vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url('./img/logo.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center 40%;
  background-attachment: fixed;

  @media only screen and (max-width: 820px) {
    height: 75vh;
  }
`
const Container = styled.div`
  height: 100vh;
  width: 95vw;
  margin-left: 10vw;
  margin-right: 10vw;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`
const Left = styled.div`
  flex: 5;
  display: flex;
  padding-left: 2.5vw;
  flex-direction: column;
  justify-content: center;
  gap: 7vh;
  @media only screen and (max-width: 820px) {
    flex: 1;
    align-items: center;
  }
`
const Text_container = styled.div`
  backdrop-filter: blur(15px);
  margin: 0 7.5vw;
  padding: 2vh 0;
  @media only screen and (max-width: 820px) {
    margin-bottom: 2.5vh;
  }
`
const Title = styled.h1`
  font-size: 0.4em;
  text-align: center;
  font-family: 'dystopia-2';
  @media only screen and (max-width: 820px) {
    font-size: 0.25em;
  }
`
const Desc = styled.p`
  font-size: 0.15em;
  text-align: center;
  font-family: 'no';
  color: #cccccc;
  @media only screen and (max-width: 820px) {
    font-size: 0.1em;
  }
`
const Price = styled.h2`
  font-size: 0.2em;
  text-align: center;
  font-family: 'no';
  @media only screen and (max-width: 820px) {
    font-size: 0.15em;
  }
`
const Right = styled.div`
  flex 6;
  @media only screen and (max-width: 820px) {
    flex: 1;
    height: 75%;
    width: 100%;
  }
`
const BlackPuffer = () => {
    return(
        <Section>
          <Container>
            <Left>
              <Text_container>
                <Title>Black Cropped Rosace Puffer</Title>
                <Desc>
                  Cropped Rosace Puffer<br/>
                  Two little pockets on the chest<br/>
                  100% Waterproof Nylon<br/>
                  Filling : Virgin Fiber Treated, 100% polyester
                </Desc>
                <Price>450 €</Price>
              </Text_container>
            </Left>
            <Right>
              <Canvas>
                <Puffer/>
                <OrbitControls enableZoom={false} autoRotate/>
                <ambientLight intensity={4} />
                <directionalLight position={[5,10,5]}/>
                <directionalLight position={[-5,-5,-5]}/>
                <PerspectiveCamera makeDefault position={[0, 5, 10]} />
              </Canvas>
            </Right>
          </Container>
        </Section>
    )
}

export default BlackPuffer