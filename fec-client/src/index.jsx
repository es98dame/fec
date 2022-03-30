import react from 'react'
import reactDOM from 'react-dom'

const App = () => {
  return (
  <div>Hello World!</div>
  <div></div>
  <div>Hello World!</div>
  <div></div>
  <div>Goodbye World!</div>
  )
}

reactDOM.render(<App/>, document.getElementById('app'));
