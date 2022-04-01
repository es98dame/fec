import React from 'react';
import CheckingOut from './OverviewComponents/CheckingOut.jsx';
import Images from './OverviewComponents/Images.jsx';
import Styles from './OverviewComponents/Styles.jsx';
import ProductSpecs from './OverviewComponents/ProductSpecs.jsx';
import styled from 'styled-components';
import axios from 'axios';


const H2 = styled.h2`
  text-align: center;
`;

const FullDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  width: 60%;
`;

const Content = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  width: 40%;
`;

var getProducts = () => {
  axios.get('/api', {headers: {path: '/products/65631/styles'}})
    .then((response) => {
      console.log(response.data);
    });
};

getProducts();

const Overview = () => {
  return (
    <div className ='Overview'>
      <H2>Overview here</H2>

      <FullDiv>
        <ImagesDiv>
          <Images />
        </ImagesDiv>
        <Content>
          <ProductSpecs />

          <Styles />

          <CheckingOut />
        </Content>
      </FullDiv>
    </div>
  );
};

export default Overview;