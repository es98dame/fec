import React from 'react';
import styled from 'styled-components';

const Star = styled.svg`
width: 16px;
height: 16px;
`;

const Stars = ({rating}) => {

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

  const fills = fillRating(rating);

  return (
    <div>
      {fills.map(fill => (
        <Star viewBox="0 0 51 48">
          <defs>
            <linearGradient id = {`gradient-${fill}`}>
              <stop offset = {`${fill}%`} stop-color = "black"></stop>
              <stop offset = {`${fill}%`} stop-color = "white"></stop>
            </linearGradient>
          </defs>
          <path fill={`url(#gradient-${fill})`} stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"> </path>
        </Star>
      ))}
    </div>

  );
};

export default Stars;