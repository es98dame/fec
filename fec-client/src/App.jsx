import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Products from './components/Related';
import Ratings from './components/Ratings';
import Overview from './components/Overview';
import QA from './components/Q&A/QA';
import PA from './logo/PA.png';

const AppDiv = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
  font-family: 'Open Sans', sans-serif;
  color: #242124;
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
  background-color: #242125;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 4rem;
  color: #ffffff;
`;

const OverviewDiv = styled.div`
  border-bottom: 3px solid lightgrey;
  width: 90%;
  height: 25%;
  margin: auto;
`;

const RelatedDiv = styled.div`
border: 1px solid black;
width: 90%;
height: 25%;
`;

const QandADiv = styled.div`
border: 1px solid black;
width: 90%;
height: 25%;
margin: auto;
`;

const RatingsDiv = styled.div`
font-family: inherit;
border: 1px solid black;
width: 90%;
height: 25%;
margin: auto;
`;

let App = () => {
  //const productName = useRef('Camo Onesie');
  const [productName, setProductName] = useState('none');
  // const [productId, setProductId] = useState(65631);
  let [avg, setAvg] = useState(0);

  //default value is '65635'
  const productId = window.localStorage.getItem("ProductId") === null ?
  65635 : JSON.parse(window.localStorage.getItem("ProductId")) ;

  return (
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
      </Nav>
      <div>
        <OverviewDiv>
          <Overview productId={productId} setProductName={setProductName} avg={avg}/>
        </OverviewDiv>

        <RelatedDiv>
          <Products productId={productId}/>
        </RelatedDiv>

        <QandADiv>
          <QA productId={productId} productName={productName}/>
        </QandADiv>

        <RatingsDiv>
          <Ratings productId={productId} setAvg = {setAvg}/>
        </RatingsDiv>
      </div>
    </AppDiv>
  );
};

// eslint-disable-next-line no-undef
// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render is no longer supported, need to change it to this
// https://reactjs.org/docs/react-dom-client.html


export default App;
