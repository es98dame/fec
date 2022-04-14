import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
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
  border: 1px solid ${props => props.theme.color};
  color: ${props => props.theme.color};
  background: ${props => props.theme.background};
  border-radius: 7px;
`;

const Sort = ({ fetch }) => {

  const handleChange = (e) => {
    fetch(e.target.value);
  };

  return (
    <Div title = 'sort'>
      <Label> Sort by:
        <Select onChange = {handleChange}>
          <option value = 'relevant'>Relevance</option>
          <option value = 'newest'>Newest</option>
          <option value = 'helpful'>Most Helpful</option>
        </Select>
      </Label>
    </Div>
  );
};

export default Sort;
