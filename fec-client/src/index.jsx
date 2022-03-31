import React from 'react'
import reactDOM from 'react-dom'
import styled from 'styled-components'

import Products from './components/Related/index.jsx';
import Ratings from './components/Ratings/index.jsx';
import Overview from './components/Overview/index.jsx';
import QA from './components/Q&A/QA.jsx';

const H1 = styled.h1`
  font-size: 2.0em;
  text-align: center;
  color: black;
`;
const OverviewDiv = styled.div`
  border: 1px solid black;
  width: 90%;
  height: 25%;
`;

const  RelatedDiv = styled.div`
border: 1px solid black;
width: 90%;
height: 25%;
`;

const QandADiv = styled.div`
border: 1px solid black;
width: 90%;
height: 25%;
`;

const RatingsDiv = styled.div`
border: 1px solid black;
width: 90%;
height: 25%;
`;

const App = () => {
  return (
  <div>
    <div>
    <H1>Project Atelier</H1>
  </div>
  <div>
    <OverviewDiv>
      <Overview/>
    </OverviewDiv>
    <RelatedDiv>
        <Products/>
    </RelatedDiv>
    <QandADiv>
        <QA />
    </QandADiv>
    <RatingsDiv>
      <Ratings/>
    </RatingsDiv>
  </div>
  </div>
  )
}

reactDOM.render(<App/>, document.getElementById('app'));
