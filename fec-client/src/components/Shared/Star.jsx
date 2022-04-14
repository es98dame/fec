import React, {useState} from 'react';


const Star = ({fill, size, color}) => {
  return (
    <svg id ='SVG-ID' viewBox="0 0 51 48" width = {size} aria-labelledby='star-title'>
      <title id = 'star-title'>star</title>
      <defs>
        <linearGradient id = {`gradient-${fill}`}>
          <stop offset = {'0%'} stopColor = { color }></stop>
          <stop offset = {`${fill}%`} stopColor = { color }></stop>
          <stop offset = {`${fill}%`} stopColor = "#BAC3BA"></stop>
        </linearGradient>
      </defs>
      <path fill={`url(#gradient-${fill})`} d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"> </path>
    </svg>
  );

};


export default Star;