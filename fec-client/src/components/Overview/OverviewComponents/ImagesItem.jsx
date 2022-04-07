import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width 100%;
  height 100%;
  object-fit: cover;
  object-position: center;
  margin: 5px;
  border: 3px solid lightgrey;

  &:hover{
    border: 3px solid pink;
    transform: scale(1.2);
  }
`;

const ImgDiv = styled.div`
  margin: 5px;
  padding: 5px;
`;

const ImagesItem = (props) => {

  const handleClick = () => {
    props.allImages.forEach((img) => {
      if (img.thumbnail_url === props.image) {
        props.setIndex(props.allImages.indexOf(img));
      }
    });
  };

  return (
    <ImgDiv>
      <Image src={props.image} onClick={handleClick}/>
    </ImgDiv>
  );
};

export default ImagesItem;