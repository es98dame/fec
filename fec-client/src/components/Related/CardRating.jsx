import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Star from '../Shared/Stars.jsx';
import countTotalAndAverage from '../Shared/countTotalAndAverage.js';

const CardRating = ({id})=> {
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    axios.get('/api', {headers: {path: `/reviews/meta?product_id=${id}`}})
      .then((response) => {
        setAvg(countTotalAndAverage(response.data.ratings)[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Star rating = {avg}/>
  );
};

export default CardRating;