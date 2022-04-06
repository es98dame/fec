import React from 'react';
import styled from 'styled-components';

import ReviewBreakdown from './ReviewBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RatingsBreakdownContainer = styled.div`
display: flex;
flex-direction: row;
gap: 5%;
font-size: 0.8rem;
height: 200px;
background-color: #f1f1f1;
border-radius: 2px;
`;


const RatingsBreakdown = ({ metaData, filterByRating }) => {
  //Should I return to this and conditionally render differently?
  return (
    <RatingsBreakdownContainer>
      { metaData.ratings ? <ReviewBreakdown reviewData = { metaData.ratings} recommended = { metaData.recommended} filterByRating = {filterByRating}/> : null }
      { metaData.characteristics ? <ProductBreakdown productData = { metaData.characteristics}/> : null}
    </RatingsBreakdownContainer>
  );
};

export default RatingsBreakdown;