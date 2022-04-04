import React from 'react';
import styled from 'styled-components';

var StylesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  width: 25%;
`;

var Image = styled.img`
  width 100%;
  object-fit: none;
`;


const StylesItem = (props) => {
  var photos = props.style.photos[0].thumbnail_url;

  console.log(photos);

  return (
    <StylesDiv>
      <Image src={photos}/>
    </StylesDiv>
  );
};

export default StylesItem;


