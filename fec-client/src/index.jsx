import React from 'react'
import reactDOM from 'react-dom'

const App = () => {
  return (
  <div>
    <h1>Hello World!</h1>
    <div></div>
    <div>Hello World!</div>
    <div></div>
    <div>Goodbye World!</div>
  </div>
  )
}

reactDOM.render(<App/>, document.getElementById('app'));
