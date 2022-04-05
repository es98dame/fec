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

const Photos = ({ images }) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <ImageContainer>
        {images.map(image => (
          <Image src={image.url} key = {image.id} onClick = {handleModal}></Image>
        ))}
      </ImageContainer>
      { modal ? <Modal images = {images} handleModal = {handleModal}/> : null }
    </div>
  );
};

export default Photos;