import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


const ThumbList = styled.div`
margin: 5px;
padding: 5px;
width: 3rem;
height: 3rem;
position: relative;
`;


const Thumb = styled.img`
  width : 100%;
  height : 100%;
  border-radius: 50%;
  border: 3px solid lightgrey;
  &:hover{
    border: 3px solid black;
  }
`;
const Thumbnails = ({results, imageClick, updatePrice})=> {
  return(
    <ThumbList>
        <Thumb src = {results.photos[0].thumbnail_url}
        onMouseOver={()=>{imageClick(results.photos[0].thumbnail_url) , updatePrice(results.sale_price)}} />
    </ThumbList>
  );
};


export default Thumbnails;