import React from 'react';
import styled from 'styled-components';
import sampleData from './sampledata.js';

import ReviewTile from './components/ReviewTile';

const Ratings = (props) => (
  <div> This is the Ratings and Reviews component.
    {sampleData.results.map(review => (
      <ReviewTile review = {review} key = {review.review_id} />
    )
    )}
  </div>

);


export default Ratings;