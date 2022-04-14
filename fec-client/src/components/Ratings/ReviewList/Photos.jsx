import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';

const ImageContainer = styled.div`
display: flex;
flex-direction: row;
gap: 0.2rem;
`;

const Image = styled.img`
height: 6rem;
`;

const Photos = ({ images, user }) => {
  const [modal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleModal = (image) => {
    setModal(!modal);
    setCurrentImage(image);
  };

  return (
    <div>
      <ImageContainer>
        {images.map(image => (
          <Image src={image.url} alt={`Image accompanying review by ${user}`} key = {image.id} onClick = {() => handleModal(image)}></Image>
        ))}
      </ImageContainer>
      { modal ? <Modal image = {currentImage} handleModal = {handleModal}/> : null }
    </div>
  );
};

export default Photos;