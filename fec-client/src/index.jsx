import React from 'react';
import reactDOM from 'react-dom';
import styled from 'styled-components';

import Products from './components/Related';
import Ratings from './components/Ratings';
import Overview from './components/Overview';
import QA from './components/Q&A/QA';

const AppDiv = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");
  font-family: 'Open Sans';
`;

const H1 = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: black;
`;
const OverviewDiv = styled.div`
  border: 1px solid black;
  width: 90%;
  height: 25%;
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
`;

const RatingsDiv = styled.div`
font-family: inherit;
border: 1px solid black;
width: 90%;
height: 25%;
`;

let App = () => {
  return (
    <AppDiv>
      <div>
        <H1>Project Atelier</H1>
      </div>
      <div>
        <OverviewDiv>
          <Overview />
        </OverviewDiv>

        <RelatedDiv>
          <Products />
        </RelatedDiv>

        <QandADiv>
          <QA />
        </QandADiv>

        <RatingsDiv>
          <Ratings />
        </RatingsDiv>
      </div>
    </AppDiv>
  );
};

// eslint-disable-next-line no-undef
reactDOM.render(<App />, document.getElementById('app'));
