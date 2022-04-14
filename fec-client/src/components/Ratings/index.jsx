import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewList from './ReviewList';
import RatingsBreakdown from './RatingsBreakdown';
import Write from './Write';
import Sort from './Sort';
import countTotalAndAverage from '../Shared/countTotalAndAverage.js';
import relevance from './Sort/relevance.js';

const RatingsContainer = styled.div`
  font-weight: 300;
  display: flex;
  flex-direction: row;
  gap: 5%;
`;

const Left = styled.div`
display: flex;
flex-direction: column;
width: 35%;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Ratings = ({productId, setTotalAndAvg, productName}) => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [filters, setFilters] = useState(Array(5).fill(0));

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews?product_id=${productId}&count=200`}})
      .then((response) => {
        setData(response.data.results);
        setCurrentData(response.data.results.sort(relevance));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews/meta?product_id=${productId}`}})
      .then((response) => {
        setMetaData(response.data);
        setTotalAndAvg(countTotalAndAverage(response.data.ratings));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filters.indexOf(true) === -1) {
      setCurrentData(data);
    } else {
      setCurrentData(data.filter(review => filters[review.rating - 1]));
    }
  }, [filters]);

  return (
    <RatingsContainer>
      <Left>
        <h3>{'Ratings & Reviews'}</h3>
        <RatingsBreakdown metaData = { metaData } setFilters = {setFilters}/>
      </Left>
      <Right>
        <Sort currentData = {currentData} setCurrentData = {setCurrentData}/>
        <ReviewList reviews = {currentData}/>
        <Write relevantChars = {metaData.characteristics} productId = {productId} productName = {productName}/>
      </Right>
    </RatingsContainer>
  );

};


export default Ratings;