import React, { useState, useEffect } from 'react';
import CheckingOut from './OverviewComponents/CheckingOut.jsx';
import Images from './OverviewComponents/Images.jsx';
import Styles from './OverviewComponents/Styles.jsx';
import ProductSpecs from './OverviewComponents/ProductSpecs.jsx';
import styled from 'styled-components';
import axios from 'axios';


const H2 = styled.h2`
  text-align: center;
  display: none;
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
  width: 35%;
  justify-content: space-around;
`;

const Overview = (props) => {
  const [styles, setStyle] = useState([]);
  const [productId] = useState(props.productId || 65631);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [currentProduct, setCurrentproduct] = useState([]);
  const [currentAvg, setCurrentAvg] = useState(props.avg);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/products/${productId}/styles`}})
      .then((response) => {
        setStyle(response.data.results);
        setCurrentStyle(response.data.results[0]);
      })
      .catch((err) => {
        console.error(err);
      });

    axios.get('/api', {headers: {path: `/products/${productId}`}})
      .then((response) => {
        setCurrentproduct(response.data);
        props.setProductName(response.data.name);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <div title='Overview'>
      <H2>Overview here</H2>

      <FullDiv>
        <ImagesDiv title='Images'>
          <Images currentStyle={currentStyle}/>
        </ImagesDiv>
        <Content title='Product-specs'>
          <ProductSpecs currentStyle={currentStyle} currentProduct={currentProduct} avg={props.avg}/>

          <Styles styles={styles} currentStyle={currentStyle} set={setCurrentStyle}/>

          <CheckingOut skus={currentStyle.skus}/>
        </Content>
      </FullDiv>
    </div>
  );
};

export default Overview;