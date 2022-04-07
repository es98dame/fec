import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Products from './components/Related';
import Ratings from './components/Ratings';
import Overview from './components/Overview';
import QA from './components/Q&A/QA';

const AppDiv = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
  font-family: 'Open Sans', sans-serif;
`;

const H1 = styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: black;
`;

const Input = styled.input`
  all: unset;
  border-bottom: 3px solid lightgrey;
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

const H1Div = styled.div`
  margin: auto;
  background-color: grey;
  display: flex;
  justify-content: space-between;
  padding: 10px;
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
`;


let App = () => {
  const productName = useRef('Camo Onesie');
  const [productId, setProductId] = useState(65631);

  //save product id on local storage to access it anywhere
  //window.localStorage.getItem("ProductId") -> return '65631'
  useEffect(()=>{
    window.localStorage.setItem("ProductId", 65631);
  },[]);

  return (
    <AppDiv>
      <H1Div>
        <H1>Project Atelier</H1>
        <Form>
          <Button type="submit"><i className="fa fa-search"></i></Button>
          <Input type='text'></Input>
        </Form>
      </H1Div>
      <div>
        <OverviewDiv>
          <Overview productId={productId} setProductId={setProductId}/>
        </OverviewDiv>

        <RelatedDiv>
          <Products productId={productId} setProductId={setProductId} productName={productName}/>
        </RelatedDiv>

        <QandADiv>
          <QA productId={productId} productName={productName}/>
        </QandADiv>

        <RatingsDiv>
          <Ratings productId={productId}/>
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
