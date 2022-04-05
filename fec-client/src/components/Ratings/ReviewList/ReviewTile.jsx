import React from 'react';
import styled from 'styled-components';
import dateformat from 'dateformat';

import Stars from '../../Shared/Stars.jsx';
import Photos from './Photos.jsx';

const Tile = styled.div`
font-weight: 300;
margin-top: 20px;
display: flex;
flex-direction: row;
`;

const UserInfo = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;

padding-top: 1%;
padding-left: 1%;
padding-right: 2%;

background-color: #f1f1f1;
border-radius: 2px;
`;

const ReviewContent = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
gap: 0.2rem;

padding-top: 1%;
padding-left: 4%;
`;

const Name = styled.div`
font-size: 0.9rem;
font-weight: 600;
`;

const Date = styled.div`
font-size: 0.8rem;
`;

const Summary = styled.div`
font-weight: 600;
font-size: .9rem;
`;

const Body = styled.p`
font-size: 0.9rem;
`;

const Recommend = styled.div`
font-size: 0.8rem;
font-weight: 400;
`;

const Helpful = styled.div`
font-size: 0.8rem;
`;

const ReviewTile = ({ review }) => {

  return (
    <Tile title = 'Title'>
      <UserInfo>
        <Name>{review.reviewer_name}</Name>
        <Date>{dateformat(review.date, 'mmmm dd, yyyy')}</Date>
      </UserInfo>
      <ReviewContent>
        <Stars rating = {review.rating}/>
        <Summary>{review.summary}</Summary>
        <Body>{review.body}</Body>
        <Photos images = {review.photos} />
        <Recommend> {review.recommend ?
          'Yes, I would recommend this product to a friend.' :
          'No, I would not recommend this product to a friend.'} </Recommend>
        <Helpful> {review.helpfulness} people found this review helpful. </Helpful>
        <div> {review.response} </div>

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