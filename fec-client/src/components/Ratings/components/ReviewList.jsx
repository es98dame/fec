import React from 'react';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx';

const ReviewContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
height: 500px;
overflow-y: auto;
`;

const ReviewList = ({reviews}) => (
  <ReviewContainer>
    {reviews.map(review => (
      <ReviewTile review = {review} key = {review.review_id} />
    ))}
  </ReviewContainer>
);


export default ReviewList;