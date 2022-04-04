import React from 'react';
import styled from 'styled-components';

var StylesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
`;

var Image = styled.img`

`;


const StylesItem = (props) => {
  var photos = props.style.photos;

  console.log(photos);

  return (
    <StylesDiv>
      <Image src={props.style.photos}/>
    </StylesDiv>
  );
};

export default StylesItem;


