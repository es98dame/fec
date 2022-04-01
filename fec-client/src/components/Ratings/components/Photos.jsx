import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
display: flex;
flex-direction: row;
gap: 0.2rem;
`;

const Image = styled.img`
width: 5rem;
height: 5rem;
`;

const Photos = ({ images }) => (
  <ImageContainer>
    {images.map(image => (
      <Image src={image.url} key = {image.id}></Image>
    ))}
  </ImageContainer>
);

export default Photos;