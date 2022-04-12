import React, { useState } from 'react';
import styled from 'styled-components';
import relevance from './relevance.js';

const Div = styled.div`
  border-top: 1px solid lightgrey;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.label`
  margin: 5px;
  font-size: 1.2rem;
`;

const Select = styled.select`
  padding: 10px;
  margin 10px;
  text-align: center;
  border: 1px solid #242124;
  color: #242124;
  border-radius: 7px;
`;



//COMPARATORS -Help!!!!

const newest = (a, b) => a.date < b.date ? 1 : -1;
const helpful = (a, b) => b.helpfulness - a.helpfulness;

const Sort = ({currentData, setCurrentData}) => {

  const [value, setValue] = useState('Sort');

  const handleChange = (e) => {
    let comparator;
    if (e.target.value === 'newest') {
      comparator = newest;
    }
    if (e.target.value === 'helpful') {
      comparator = helpful;
    }
    if (e.target.value === 'relevance') {
      comparator = relevance;
    }
    const sortedData = [...currentData].sort(comparator);
    setCurrentData(sortedData);
  };

  return (
    <Div>
      <Label> Sort by:
        <Select onChange = {handleChange}>
          <option value = 'relevance'>Relevance</option>
          <option value = 'newest'>Newest</option>
          <option value = 'helpful'>Most Helpful</option>
        </Select>
      </Label>
    </Div>
  );
};

export default Sort;

//dropdown

//Should I write a comparator?
//const helpfulness(default) = (a, b) => b.helpfulness - a.helpfulness
//const newest = (a,b) => b.date - a.date
//const relevant = combo index.
//calculate as an index: date/Today's Date + helpful/10