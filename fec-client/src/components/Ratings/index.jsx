import React from 'react';
import styled from 'styled-components';
import sampleData from './sampledata.js';

import ReviewList from './components/ReviewList.jsx';

const RatingsList = styled.div`
display: flex;

`;

const Ratings = (props) => (
  <div> This is the Ratings and Reviews component.
    <ReviewList reviews = {sampleData.results}/>
  </div>

);


export default Ratings;