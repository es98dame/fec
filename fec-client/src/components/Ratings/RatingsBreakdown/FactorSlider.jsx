import React from 'react';
import styled from 'styled-components';


const FactorSlider = ({ value }) => {
  const percent = value / 5;
  return (
    <svg id ='SVG-ID' viewBox = '0, 0, 100, 6' width = '100%'>
      <rect fill = "#BAC3BA" y = '2' width = '95' height = '2' />
      <circle r = '1.5' cx = {percent * 95} cy = '3' fill='#10451d'/>
    </svg>
  );
};

export default FactorSlider;