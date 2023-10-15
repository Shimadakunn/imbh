import React from 'react'
import styled from "styled-components"

const Page = styled.div`
    display: grid;
    grid-template-columns: 25vw 75vw;
    grid-template-rows: auto;
`
const Left = styled.div`
height: 300vh;
    border: 1px solid white;
`
const Right = styled.div`
    border: 1px solid white;
    position: relative;
`
const Sticky = styled.div`
    position: sticky;
    top: 0;
    border: 1px solid white;
    height: 100vh;
`

const Test = () => {
  return (
    <Page>
        <Left>
            Left
        </Left>
        <Right>
            <Sticky>
                Right
            </Sticky>
        </Right>
    </Page>
  )
}

export default Test