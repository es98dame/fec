import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from './ReviewList';
import RatingsBreakdown from './RatingsBreakdown';
import Write from './Write';
import Sort from './Sort';
import countTotalAndAverage from '../Shared/countTotalAndAverage.js';

const RatingsContainer = styled.div`
  font-weight: 300;
`;

const H3 = styled.h3`
  font-size: x-large;
`;

const Ratings = ({productId, setAvg, productName}) => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [filters, setFilters] = useState(Array(5).fill(0));

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews?product_id=${productId}&count=200`}})
      .then((response) => {
        setData(response.data.results);
        setCurrentData(response.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews/meta?product_id=${productId}`}})
      .then((response) => {
        setMetaData(response.data);
        setAvg(countTotalAndAverage(response.data.ratings)[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filters.indexOf(1) === -1) {
      setCurrentData(data);
    } else {
      setCurrentData(data.filter(review => filters[review.rating - 1] === 1));
    }
  }, [filters]);

  const filterByRating = (rating) => {
    setFilters(filters.map((i, index) => index === rating - 1 ? i = 1 - i : i));
  };

  return (
    <RatingsContainer>
      <H3>Reviews</H3>
      <RatingsBreakdown metaData = { metaData } filterByRating = { filterByRating }/>
      <Sort currentData = {currentData} setCurrentData = {setCurrentData}/>
      <ReviewList reviews = {currentData}/>
      <Write relevantChars = {metaData.characteristics} productId = {productId} productName = {productName}/>
    </RatingsContainer>
  );

};


export default Ratings;