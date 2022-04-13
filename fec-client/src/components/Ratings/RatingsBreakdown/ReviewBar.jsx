import React, { useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
font-size: 0.8rem;
display: flex;
flex-direction: row;
gap: 5%;
justify-content: flex-start;

&:hover {
  background-color: lightgray;
}

&.clicked {
  font-weight: bold;
}

`;


const ReviewBar = ({ rating, num, total, toggleFilter, toggled }) => {
  //const [clicked, setClicked] = useState(false);
  const percent = num / total * 100;

  const handleClick = () => {
    toggleFilter(rating);
  };

  return (
    <Bar className = { toggled ? 'clicked' : ''} onClick = {handleClick} title = {`review-bar-${rating}`}>
      <span>{rating} stars:</span>
      <svg viewBox = '0, 0, 100, 5' width = '250'>
        <linearGradient id = {`gradient-${percent}`}>
          <stop offset = {'0%'} stopColor = "#10451d"></stop>
          <stop offset = {`${percent}%`} stopColor = "#10451d"></stop>
          <stop offset = {`${percent}%`} stopColor = "#BAC3BA"></stop>
        </linearGradient>
        <rect fill = {`url(#gradient-${percent})`} width = '100' height = '100' />
      </svg>
      <span title = {`num-ratings-${rating}`}>{num}</span>
    </Bar>
  );
};

export default ReviewBar;