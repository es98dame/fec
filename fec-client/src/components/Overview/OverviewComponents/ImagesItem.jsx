import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width 100%;
  height 100%;
  object-fit: cover;
  object-position: center;
  margin: 5px;

  &:hover{
    border: 3px solid pink;
  }
`;

var ImgDiv = styled.div`
  margin: 5px;
  padding: 5px;
`;

const ImagesItem = (props) => {
  return (
    <ImgDiv>
      <Image src={props.image}/>
    </ImgDiv>
  );
};

export default ImagesItem;