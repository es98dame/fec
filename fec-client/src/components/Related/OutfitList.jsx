import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';

const ProductCard = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;
border: solid;
border-color: lightgray;
`;

const FirstCard = styled.div`
align-items: center;
height : 240px;
line-height: 240px;
text-align: center;
`;


const OutfitList = (props)=> {

  return(
    <ProductCard>
      <FirstCard>Add current item</FirstCard>
    </ProductCard>
  );


};

export default OutfitList;