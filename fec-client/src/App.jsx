import React, { useState, useEffect, useRef } from 'react';
import styled, {ThemeProvider} from 'styled-components';

import Products from './components/Related';
import Ratings from './components/Ratings';
import Overview from './components/Overview';
import QA from './components/Q&A/QA';
import PA from './logo/PA.png';
import Slider from './components/Slider.jsx';

const lightTheme = {
  background: '#fff',
  color: '#242124',
  imagesBackground: '#242124',
  checkoutButton: '#242124',
  lightgrayToDark: 'lightgray',
  svgFillToLight: '#10451d',
  darkgrayToLight: '#242125',
  caroselHighlight: '#4b464d'
};

const darkTheme = {
  background: '#242124',
  color: '#ddd',
  imagesBackground: '#4b464d',
  checkoutButton: '#4b464d',
  lightgrayToDark: '#4b464d',
  svgFillToLight: '#2c9646',
  darkgrayToLight: '#726975',
  caroselHighlight: '#242124'
};

const AppDiv = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
  font-family: 'Open Sans', sans-serif;
  color: ${props => props.theme.color};
  background: ${props => props.theme.background};
`;

const H1 = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: lightgrey;
  margin: 5px;
`;

const H3 = styled.h3`
margin: 10px;
padding: 10px;
border-radius: 10px;

  &:hover{
    background-color: lightgrey;
    color: #242124;
  }
`;

const Input = styled.input`
  all: unset;
  border-bottom: 3px solid lightgrey;
  color: lightgrey;
`;

const Button = styled.button`
  all: unset;
  margin-right: 5px;
  color: darkgrey;
`;

const Form = styled.form`
  margin-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

const Nav = styled.div`
  margin: auto;
  background-color: ${props => props.theme.imagesBackground};
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 4rem;
  color: #ffffff;
`;

const OverviewDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  width: 90%;
  height: 25%;
  margin: auto;
`;

const RelatedDiv = styled.div`
width: 90%;
height: 25%;
margin: auto;
border-bottom: 1px solid lightgrey;
`;

const QandADiv = styled.div`
width: 90%;
height: 25%;
margin: auto;
border-bottom: 1px solid lightgrey;
`;

const RatingsDiv = styled.div`
width: 90%;
height: 25%;
margin: auto;
border-bottom: 1px solid lightgrey;
`;

const App = () => {
  const [productName, setProductName] = useState('none');
  let [totalAndAvg, setTotalAndAvg] = useState([0, 0]);
  const [darkMode, setDarkMode] = useState(false);

  //default value is '65635'
  const productId = window.localStorage.getItem('ProductId') === null ?
    65635 : JSON.parse(window.localStorage.getItem('ProductId'));


  useEffect(()=> {
    const DarkMode = window.localStorage.getItem('DarkMode');
    if (DarkMode === 'true') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode
      ? darkTheme
      : lightTheme}>
      <AppDiv>
        <Nav>
          <img src={PA}/>
          <H3>Home</H3>
          <H3>Products</H3>
          <H3>Cart</H3>
          <Form>
            <Button type="submit"><i className="fa fa-search"></i></Button>
            <Input type='text'></Input>
          </Form>
          <Slider setDarkMode={setDarkMode} darkMode={darkMode}/>
        </Nav>
        <div>
          <OverviewDiv>
            <Overview productId={productId} setProductName={setProductName} totalAndAvg={totalAndAvg}/>
          </OverviewDiv>

          <RelatedDiv>
            <Products productId={productId}/>
          </RelatedDiv>

          <QandADiv>
            <QA productId={productId} productName={productName}/>
          </QandADiv>

          <RatingsDiv>
            <Ratings productId={productId} setTotalAndAvg = {setTotalAndAvg} productName = {productName}/>
          </RatingsDiv>
        </div>
      </AppDiv>
    </ThemeProvider>
  );
};

// eslint-disable-next-line no-undef
// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render is no longer supported, need to change it to this
// https://reactjs.org/docs/react-dom-client.html


export default App;
