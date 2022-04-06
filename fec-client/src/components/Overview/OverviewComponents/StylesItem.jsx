import React from 'react';
import styled from 'styled-components';

var StylesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  width: 4.5rem;
  height: 4.5rem;
}
`;

var Image = styled.img`
  width 100%;
  height 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin: 5px;
  border: 3px solid lightgrey;

  &:hover{
    border: 3px solid pink;
  }
`;

const StylesItem = (props) => {
  var photos = props.style.photos[0].thumbnail_url;


  const handleClick = () => {
    let name = props.style.name;
    props.styles.forEach((style) => {
      if (style.name === name) {
        props.set(style);
      }
    });
  };

  return (
    <StylesDiv>
      <Image src={photos} onClick={handleClick}/>
    </StylesDiv>
  );
};

export default StylesItem;


