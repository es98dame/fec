import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sampleData from './sampledata.js';
import axios from 'axios';

import ReviewList from './ReviewList/index.jsx';

const RatingsList = styled.div`
display: flex;

`;

const Ratings = ({productId}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews?product_id=${productId}`}})
      .then((response) => {
        setData(response.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div> This is the Ratings and Reviews component.
      <ReviewList reviews = {data}/>
    </div>
  );

};


export default Ratings;