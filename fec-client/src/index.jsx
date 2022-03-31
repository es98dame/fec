import React from 'react'
import reactDOM from 'react-dom'
import styled from 'styled-components'

const H1 = styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: black;
`

const App = () => {
  return (
  <div>
    <H1>Project Atelier</H1>
    <div></div>
    <div>Hello World!</div>
    <div></div>
    <div>Goodbye World!</div>
    <div></div>
    <div>Poop World!</div>
  </div>
  )
}

reactDOM.render(<App/>, document.getElementById('app'));
