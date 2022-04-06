import React from 'react';
import styled from 'styled-components';

import ReviewBreakdown from './ReviewBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const BreakdownContainer = styled.div`
display: flex;
flex-direction: row;
gap: 5%;
`;


const RatingsBreakdown = ({ metaData }) => {
  return (
    <BreakdownContainer>
      { metaData.ratings ? <ReviewBreakdown reviewData = { metaData.ratings}/> : null }
      { metaData.characteristics ? <ProductBreakdown productData = { metaData.characteristics}/> : null}
    </BreakdownContainer>
  );
};

export default RatingsBreakdown;