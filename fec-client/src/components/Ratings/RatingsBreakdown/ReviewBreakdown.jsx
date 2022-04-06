import React from 'react';
import styled from 'styled-components';

import ReviewBar from './ReviewBar.jsx';

const BarContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5px;

width: 50%;

`;

const countTotal = (obj) => {
  let total = 0;
  for (let num in obj) {
    total += parseInt(obj[num]);
  }
  return total;
};

const ReviewBreakdown = ({ reviewData }) => {

  const total = countTotal( reviewData );

  return (
    <BarContainer>
      <ReviewBar rating = {5} num = {reviewData[5] || 0 } total = {total}/>
      <ReviewBar rating = {4} num = {reviewData[4] || 0 } total = {total}/>
      <ReviewBar rating = {3} num = {reviewData[3] || 0 } total = {total}/>
      <ReviewBar rating = {2} num = {reviewData[2] || 0 } total = {total}/>
      <ReviewBar rating = {1} num = {reviewData[1] || 0 } total = {total}/>
    </BarContainer>
  );

};

export default ReviewBreakdown;