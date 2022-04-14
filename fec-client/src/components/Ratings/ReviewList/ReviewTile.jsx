import React, { useState } from 'react';
import styled from 'styled-components';
import dateformat from 'dateformat';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

import Stars from '../../Shared/Stars.jsx';
import Photos from './Photos.jsx';

const Tile = styled.div`
font-weight: 300;
margin-top: 20px;
display: flex;
flex-direction: column;
`;

const UserInfo = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;

padding-top: 1%;
padding-left: 1%;
padding-right: 2%;

background-color: ${props => props.theme.lightgrayToDark};
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

const ShowMore = styled.span`
font-style: italic;
&:hover {
  cursor: pointer;
  background-color: lightgray;
}
`;

const Recommend = styled.div`
font-size: 0.8rem;
font-weight: 400;
`;

const Helpful = styled.div`
font-size: 0.8rem;
display: flex;
direction: row;
gap: 5%;
`;

const HelpfulButton = styled.div`
&.active:hover {
  cursor: pointer;
  color: green;
}
`;

const ReviewTile = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpfulness);
  const [helpfulDisable, setHelpfulDisable] = useState(false);
  const [bodyGrow, setBodyGrow] = useState(review.body.length > 250);

  const handleHelpfulClick = () => {
    if (!helpfulDisable) {
      setHelpful(helpful + 1);
      setHelpfulDisable(true);
      axios.put(`/api/reviews/${review.review_id}/helpful`)
        .then(() => {})
        .catch((err) => { console.log(err); });
    }
  };

  const handleShowMore = () => {
    setBodyGrow(false);
  };

  return (
    <Tile title = 'Tile'>
      <UserInfo>
        <Name>{review.reviewer_name}</Name>
        <Date>{dateformat(review.date, 'mmmm dd, yyyy')}</Date>
      </UserInfo>
      <ReviewContent>
        <Stars rating = {review.rating}/>
        <Summary>{review.summary}</Summary>
        { bodyGrow ?
          <Body title = 'review-body'>
            {review.body.slice(0, 250) + '... '} <ShowMore title = 'Show More' onClick = {handleShowMore}>Show More</ShowMore>
          </Body> :
          <Body title = 'review-body'>{review.body}</Body>
        }
        <Photos images = {review.photos} />
        {review.recommend ?
          <Recommend>
            <FaCheck /><span>    Yes, I would recommend this product to a friend.</span>
          </Recommend> :
          null }
        <Helpful>
          <div> Helpful? </div>
          <HelpfulButton className = { !helpfulDisable ? 'active' : ''} onClick = {handleHelpfulClick}> Yes ({helpful}) </HelpfulButton>
        </Helpful>
        { review.response ? <div title = 'response'> {review.response} </div> : null }
      </ReviewContent>

    </Tile>

  );

};


export default ReviewTile;
