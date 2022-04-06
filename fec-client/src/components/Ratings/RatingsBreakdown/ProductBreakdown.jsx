import React from 'react';
import styled from 'styled-components';

import FactorSlider from './FactorSlider.jsx';

const ProductContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
gap: 10px;

align-items: center;

height: 100%;
width: 50%;

`;

const FactorContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5px;

align-items: center;

margin-left: 10px;

`;

const DescriptionContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

width: 100%;

font-size: 0.6rem;
`;

const ProductBreakdown = ({ productData }) => {

  return (
    <ProductContainer>
      { 'Size' in productData ?
        <FactorContainer>
          <b>Size</b>
          <FactorSlider value = {productData.Size.value} />
          <DescriptionContainer>
            <span>Runs small</span>
            <span>Runs large</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
      { 'Width' in productData ?
        <FactorContainer>
          <b>Width</b>
          <FactorSlider value = {productData.Width.value} />
          <DescriptionContainer>
            <span>Runs narrow</span>
            <span>Runs wide</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
      { 'Length' in productData ?
        <FactorContainer>
          <b>Length</b>
          <FactorSlider value = {productData.Length.value} />
          <DescriptionContainer>
            <span>Runs short</span>
            <span>Runs long</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
      { 'Fit' in productData ?
        <FactorContainer>
          <b>Fit</b>
          <FactorSlider value = {productData.Fit.value} />
          <DescriptionContainer>
            <span>Poor</span>
            <span>Excellent</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
      { 'Quality' in productData ?
        <FactorContainer>
          <b>Quality</b>
          <FactorSlider value = {productData.Quality.value} />
          <DescriptionContainer>
            <span>Poor</span>
            <span>Excellent</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
      { 'Comfort' in productData ?
        <FactorContainer>
          <b>Comfort</b>
          <FactorSlider value = {productData.Comfort.value} />
          <DescriptionContainer>
            <span>Uncomfortable</span>
            <span>Comfortable</span>
          </DescriptionContainer>
        </FactorContainer> :
        null
      }
    </ProductContainer>
  );

};

export default ProductBreakdown;

//Size, Width, Comfort, Quality, Length, and Fit.