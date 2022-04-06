import React, { useState } from 'react';
import styled from 'styled-components';

import ReviewBar from './ReviewBar.jsx';
import Stars from '../../Shared/Stars.jsx';

const BarContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
width: 50%;
`;

const Summary = styled.div`
display: flex;
flex-direction: row;
font-size: 0.9rem;
justify-content: space-between;
`;

const Average = styled.div`
display: flex;
flex-direction: row;
`;

const Recommend = styled.p`
font-style: italic;
text-align: center;
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

const ReviewBreakdown = ({ reviewData, recommended, filterByRating }) => {
  const [total, average] = countTotalAndAverage( reviewData );
  const percentRecommended = Math.round(parseInt(recommended.true) / total * 100);

  return (
    <BarContainer>
      <Summary>
        <Average>
          <Stars rating = {average}/>
          <span>({average})</span>
        </Average>
        <span> {total} reviews </span>
      </Summary>
      <ReviewBar rating = {5} num = {reviewData[5] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {4} num = {reviewData[4] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {3} num = {reviewData[3] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {2} num = {reviewData[2] || 0 } total = {total} filterByRating = {filterByRating}/>
      <ReviewBar rating = {1} num = {reviewData[1] || 0 } total = {total} filterByRating = {filterByRating}/>
      <Recommend>{percentRecommended}% of reviewers recommend this product.</Recommend>
    </BarContainer>
  );

};

export default ReviewBreakdown;