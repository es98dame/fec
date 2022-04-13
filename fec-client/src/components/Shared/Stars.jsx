import React from 'react';
import styled from 'styled-components';

import Star from './Star.jsx';

const fillRating = (n) => {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    if (i <= n - 1) {
      arr.push(100);
    } else if (i <= n) {
      arr.push((100 * n) % 100);
    } else {
      arr.push(0);
    }
  }
  return arr;
};

//Stars should be passed a prop 'rating', a number between 0 and 5.
//Stars may be passed an optional prop 'size', the width (in px) of an individual star. Default 16px.

const Stars = ({rating, size, color}) => {

  const fills = fillRating(rating);

  return (
    <div>
      {fills.map((fill, index) => (
        <Star fill = {fill} size = {size || '16'} key = {index} color = {color || '#10451d'}/>
      ))}
    </div>

  );
};

export default Stars;