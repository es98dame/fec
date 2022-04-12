import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewBar from './ReviewBar.jsx';
import Stars from '../../Shared/Stars.jsx';
import countTotalAndAverage from '../../Shared/countTotalAndAverage.js';

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

const Recommend = styled.div`
font-style: italic;
text-align: center;
`;

const ActiveFilters = styled.p`
text-align: center:
font-weight: bold;
`;

const ReviewBreakdown = ({ reviewData, recommended, setFilters }) => {
  const [total, average] = countTotalAndAverage( reviewData );
  const percentRecommended = Math.round(parseInt(recommended.true || 0) / total * 100);
  const [allFilters, setAllFilters] = useState(Array(5).fill(false));
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (rating) => {
    const newFilters = [...allFilters];
    newFilters[rating - 1] = !newFilters[rating - 1];
    setAllFilters(newFilters);
    setFilters(newFilters);
    setActiveFilters([1, 2, 3, 4, 5].filter((item, index) => newFilters[index]));
  };

  return (
    <ReviewBreakdownContainer>
      <Summary>
        <Average>
          <Stars rating = {average} size = {'27'} />
          <span>({average})</span>
        </Average>
        <span> {total} reviews </span>
      </Summary>
      <ReviewBar rating = {5} num = {reviewData[5] || 0 } total = {total} toggleFilter = {toggleFilter}/>
      <ReviewBar rating = {4} num = {reviewData[4] || 0 } total = {total} toggleFilter = {toggleFilter}/>
      <ReviewBar rating = {3} num = {reviewData[3] || 0 } total = {total} toggleFilter = {toggleFilter}/>
      <ReviewBar rating = {2} num = {reviewData[2] || 0 } total = {total} toggleFilter = {toggleFilter}/>
      <ReviewBar rating = {1} num = {reviewData[1] || 0 } total = {total} toggleFilter = {toggleFilter}/>
      <ActiveFilters> Displaying { activeFilters.length ?
        activeFilters.join(', ') + '-star' :
        'all'
      } reviews </ActiveFilters>
      <Recommend>{percentRecommended}% of reviewers recommend this product.</Recommend>
    </ReviewBreakdownContainer>
  );

};

export default ReviewBreakdown;