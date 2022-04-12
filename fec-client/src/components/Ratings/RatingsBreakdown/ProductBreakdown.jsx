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
        <Factor factor = {'Size'} value = {productData.Size.value} lo = {'A size too small'} hi = {'A size too wide'} /> : null }
      { 'Width' in productData ?
        <Factor factor = {'Width'} value = {productData.Width.value} lo = {'Too narrow'} hi = {'Too wide'}/> : null }
      { 'Length' in productData ?
        <Factor factor = {'Length'} value = {productData.Length.value} lo = {'Runs short'} hi = {'Runs long'}/> : null }
      { 'Fit' in productData ?
        <Factor factor = {'Fit'} value = {productData.Fit.value} lo = {'Runs tight'} hi = {'Runs long'}/> : null }
      { 'Quality' in productData ?
        <Factor factor = {'Quality'} value = {productData.Quality.value} lo = {'Poor'} hi = {'Perfect'}/> : null }
      { 'Comfort' in productData ?
        <Factor factor = {'Comfort'} value = {productData.Comfort.value} lo = {'Uncomfortable'} hi = {'Perfect'}/> :
        null }
    </ProductContainer>
  );

};

export default ProductBreakdown;