import React from 'react';
import styled from 'styled-components';

import FactorSlider from './FactorSlider.jsx';

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

const Factor = ({ factor, value, lo, hi }) => {
  return (
    <FactorContainer>
      <b>{factor}</b>
      <FactorSlider value = {value} />
      <DescriptionContainer>
        <span>{lo}</span>
        <span>{hi}</span>
      </DescriptionContainer>
    </FactorContainer>
  );
};

export default Factor;