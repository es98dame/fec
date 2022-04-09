import React, { useRef, useState } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(0, 0, 0, 0.8);
`;

const ImageContainer = styled.div`
  display: flex;
  z-index: 100;
  position: relative;
  margin: 2em auto;
  max-width: 500px;
  height: auto;
  align-self: flex-start;
`;

const Image = styled.img`
  display: flex;
  z-index: 100;
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  height: auto;
  align-self: flex-start;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  font-weight: 700;
  border: none;
  border-radius: 3px;
  padding: .3rem 1rem;
  margin-left: .5rem;
  cursor: pointer;
  &:hover {
    color: lightgrey;
  }
  background-color: darkgrey;
  z-index: inherit;
`;

const PhotoModal = ({hide, photo}) => {
  const container = document.getElementById('app');

  return reactDom.createPortal((
    <ModalWrapper onClick={hide}>
      <ImageContainer onClick={(e) => e.stopPropagation()}>
        <Image src={photo}/>
        <ExitButton onClick={hide}>&times;</ExitButton>
      </ImageContainer>
    </ModalWrapper>
  ), container);
};

export default PhotoModal;