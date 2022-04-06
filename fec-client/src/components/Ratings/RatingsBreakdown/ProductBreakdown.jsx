import React from 'react';
import styled from 'styled-components';
import Factor from './Factor';

const ProductContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
gap: 10px;
align-items: center;
height: 100%;
width: 50%;
`;

const ProductBreakdown = ({ productData }) => {

  return (
    <ProductContainer>
      { 'Size' in productData ?
        <Factor factor = {'Size'} value = {productData.Size.value} lo = {'Runs small'} hi = {'Runs large'} /> : null }
      { 'Width' in productData ?
        <Factor factor = {'Width'} value = {productData.Width.value} lo = {'Runs narrow'} hi = {'Runs wide'}/> : null }
      { 'Length' in productData ?
        <Factor factor = {'Length'} value = {productData.Length.value} lo = {'Runs short'} hi = {'Runs long'}/> : null }
      { 'Fit' in productData ?
        <Factor factor = {'Fit'} value = {productData.Fit.value} lo = {'Poor'} hi = {'Excellent'}/> : null }
      { 'Quality' in productData ?
        <Factor factor = {'Quality'} value = {productData.Quality.value} lo = {'Poor'} hi = {'Excellent'}/> : null }
      { 'Comfort' in productData ?
        <Factor factor = {'Comfort'} value = {productData.Comfort.value} lo = {'Uncomfortable'} hi = {'Comfortable'}/> :
        null }
    </ProductContainer>
  );

};

export default ProductBreakdown;