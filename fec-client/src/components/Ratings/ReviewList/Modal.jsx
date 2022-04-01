import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
`;

const ModalContent = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

display: flex;
flex-direction: row;
overflow-x: auto;

background-color: white;
height: 40rem;
width: 35rem;
`;

const ImageDisplay = styled.img`
object-fit: contain;
width: 90%;
margin: 5%;
`;

const ImagePopup = ({images}) => (
  <Modal>
    <ModalContent>
      {images.map(image => (
        <ImageDisplay src = {image.url}></ImageDisplay>
      ))}
    </ModalContent>
  </Modal>
);

export default ImagePopup;