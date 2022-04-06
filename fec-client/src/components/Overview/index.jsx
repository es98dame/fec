import React, { useState, useEffect } from 'react';
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
  width: 60%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  width: 40%;
  justify-content: space-around;
`;

const Overview = (props) => {
  const [styles, setStyle] = useState([]);
  const [productId] = useState(props.productId);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [currentProduct, setCurrentproduct] = useState([]);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/products/${productId}/styles`}})
      .then((response) => {
        setStyle(response.data.results);
        setCurrentStyle(response.data.results[0]);
      });

    axios.get('/api', {headers: {path: '/products'}})
      .then((response) => {
        response.data.forEach((product) => {
          if (product.id === productId) {
            setCurrentproduct(product);
          }
        });
      });
  }, []);

  return (
    <div title='Overview'>
      <H2 display='none'>Overview here</H2>

      <FullDiv>
        <ImagesDiv>
          <Images currentStyle={currentStyle}/>
        </ImagesDiv>
        <Content>
          <ProductSpecs currentStyle={currentStyle} currentProduct={currentProduct}/>

          <Styles styles={styles} currentStyle={currentStyle} set={setCurrentStyle}/>

          <CheckingOut />
        </Content>
      </FullDiv>
    </div>
  );
};

export default Overview;