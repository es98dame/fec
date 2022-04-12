import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
z-index: 20;
`;

const ModalContent = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
align-items: flex-end;
background-color: white;
`;

const ImageDisplay = styled.img`
width: 30rem;
margin: 5%;
`;

const Button = styled.button`
font-family: inherit;
width: 4rem;
border: none;
font-size: xsmall;
background-color: white;
padding: 1px;

`;


const ImagePopup = ({image, handleModal}) => (
  <Modal title = 'Modal'>
    <ModalContent >
      <Button onClick = {handleModal}>CLOSE</Button>
      <ImageDisplay src = {image.url} key = {image.id}></ImageDisplay>
    </ModalContent>
  </Modal>
);

export default ImagePopup;