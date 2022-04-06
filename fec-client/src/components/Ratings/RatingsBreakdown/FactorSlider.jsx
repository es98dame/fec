import React from 'react';
import styled from 'styled-components';


const FactorSlider = ({ value }) => {
  const percent = value / 5 * 100;
  return (
    <svg viewBox = '0, 0, 50, 5' width = '150' height = '15'>
      <linearGradient id = {`gradient-${percent}`}>
        <stop offset = {'0%'} stopColor = "#3D463D"></stop>
        <stop offset = {`${percent}%`} stopColor = "#3D463D"></stop>
        <stop offset = {`${percent}%`} stopColor = "#BAC3BA"></stop>
      </linearGradient>
      <rect fill = {`url(#gradient-${percent})`} width = '100%' height = '100%' />
    </svg>
  );
};

export default FactorSlider;