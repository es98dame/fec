import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sampleData from './sampledata.js';
import axios from 'axios';

import ReviewList from './ReviewList';
import RatingsBreakdown from './RatingsBreakdown';

const RatingsContainer = styled.div`
font-weight: 300;
`;


const Ratings = ({productId}) => {
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews?product_id=${productId}`}})
      .then((response) => {
        setData(response.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews/meta?product_id=${productId}`}})
      .then((response) => {
        setMetaData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RatingsContainer>
      <h2>Ratings Component</h2>
      <RatingsBreakdown metaData = { metaData }/>
      <ReviewList reviews = {data}/>
    </RatingsContainer>
  );

};


export default Ratings;