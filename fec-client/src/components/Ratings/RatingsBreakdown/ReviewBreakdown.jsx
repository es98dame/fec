import React, { useState } from 'react';
import styled from 'styled-components';

import ReviewBar from './ReviewBar.jsx';
import Stars from '../../Shared/Stars.jsx';

const BarContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5px;

width: 50%;

font-size: 0.9rem;

`;

const Summary = styled.div`
display: flex;
flex-direction: row;
gap: 5%;
`;

const countTotalAndAverage = (obj) => {
  let total = 0;
  let weighted = 0;
  for (let num in obj) {
    total += parseInt(obj[num]);
    weighted += parseInt(obj[num]) * parseInt(num);
  }
  const average = Math.round(weighted / total * 10) / 10;
  return [total, average];
};

const ReviewBreakdown = ({ reviewData, filterByRating }) => {
  const [total, average] = countTotalAndAverage( reviewData );

  return (
    <BarContainer>
      <Summary>
        <Stars rating = {average}/>
        <span>{average} </span>
        <span> <i>{total} reviews</i> </span>
      </Summary>
      <ReviewBar rating = {5} num = {reviewData[5] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {4} num = {reviewData[4] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {3} num = {reviewData[3] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {2} num = {reviewData[2] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {1} num = {reviewData[1] || 0 } total = {total} filterByRating = {filterByRating}/>
    </BarContainer>
  );

};

export default ReviewBreakdown;