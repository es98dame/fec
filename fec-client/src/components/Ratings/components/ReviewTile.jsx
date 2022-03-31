import React from 'react';
import styled from 'styled-components';

const ReviewTile = ({ review }) => {

  return (
    <div> This is a Review Tile Component
      <div>Name: {review.reviewer_name}</div>
      <div>Date: {review.date}</div>

    </div>

  );

};


export default ReviewTile;

/* EXAMPLE DATA

    {
      'review_id': 1115703,
      'rating': 3,
      'summary': 'This is a good product Buy it please This is a good product Buy it, please',
      'recommend': true,
      'response': null,
      'body': 'This is a good product Buy it please THere is a min number of charsThis is a good product Buy it please THere is a min number of chars',
      'date': '2022-01-05T00:00:00.000Z',
      'reviewer_name': 'notryano',
      'helpfulness': 0,
      'photos': []
    }


*/