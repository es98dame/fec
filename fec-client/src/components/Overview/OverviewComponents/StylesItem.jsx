import React from 'react';
import styled from 'styled-components';

const StylesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  width: 5rem;
  height: 5rem;
  position: relative;
}
`;

const Image = styled.img`
  width 100%;
  height 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin: 5px;
  border: 3px solid lightgrey;

  &:hover{
    border: 3px solid #4b464d;;
  }
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 50%;
  position: absolute;
  color: white;
  font-size: 2rem;
  border: 3px solid #4b464d;
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
      {props.selectedStyle === props.style.style_id
        ? <Overlay>&#x2714;</Overlay>
        : <div></div>}
      <Image src={photos} onClick={handleClick}/>
    </StylesDiv>
  );
};

export default StylesItem;


