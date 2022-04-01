import React from 'react';
import styled from 'styled-components';
import dateformat from 'dateformat';

import Stars from './Stars.jsx';

const Tile = styled.div`
font-weight: 300;
margin-top: 20px;
display: flex;
flex-direction: row;
gap: 0.5rem;
`;

const UserInfo = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;
padding-top: 1%;
padding-right: 2%;
border: solid;
border-color: lightgray;
`;

const ReviewContent = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
padding-top: 1%;
padding-left: 5%;
border: solid;
border-color: lightgray;
`;

const ReviewTile = ({ review }) => {

  return (
    <Tile>
      <UserInfo>
        <div><b>{review.reviewer_name}</b></div>
        <div>{dateformat(review.date, 'mmmm dd, yyyy')}</div>
      </UserInfo>
      <ReviewContent>
        <Stars rating = {review.rating}/>
        <div>Rating: {review.rating}</div>
        <div>Summary: {review.summary}</div>
        <p>Body: {review.body}</p>
        <div> Recommended: {review.recommended} </div>
        <div> Helpfulness: {review.helpfulness}</div>
        <div> Response: {review.response} </div>

      </ReviewContent>

    </Tile>

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