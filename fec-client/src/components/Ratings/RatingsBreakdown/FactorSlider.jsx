import React from 'react';
import styled from 'styled-components';


const FactorSlider = ({ value }) => {
  const percent = value / 5;
  return (
    <svg viewBox = '0, 0, 100, 8' width = '150'>
      <rect fill = "#BAC3BA" y = '1' width = '100' height = '6' />
      <circle r = '3' cx = {percent * 100} cy = '4' />
    </svg>
  );
};

export default FactorSlider;