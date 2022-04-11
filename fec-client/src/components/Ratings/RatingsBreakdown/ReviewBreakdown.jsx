import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewBar from './ReviewBar.jsx';
import Stars from '../../Shared/Stars.jsx';
import countTotalAndAverage from '../countTotalAndAverage.js';

const ReviewBreakdownContainer = styled.div`
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

const ReviewBreakdown = ({ reviewData, recommended, filterByRating }) => {
  const [total, average] = countTotalAndAverage( reviewData );
  const percentRecommended = Math.round(parseInt(recommended.true) / total * 100);

  return (
    <ReviewBreakdownContainer>
      <Summary>
        <Average>
          <Stars rating = {average} size = {'27'} />
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
    </ReviewBreakdownContainer>
  );

};

export default ReviewBreakdown;