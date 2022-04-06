import React, { useState, useEffect, useInsertionEffect } from 'react';
import styled from 'styled-components';
import ImagesItem from './ImagesItem.jsx';

const Image = styled.img`
  width: 80%;
  object-position: center;
  object-fit: contain;

`;

const ImagesDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  width 90%;
`;

const ModalImagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 5px;
  padding: 5px;
  height: 90%;
  width 10%;
`;

const CarrosselDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  height: 45rem;
  justify-content: space-between;
  background-color: lightgrey
`;

const ModalCarrosselDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  height: 100%;
  width: 50%;
  justify-content: space-between;
`;

const Div = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  flex-direction: column;
`;

const Button = styled.button`
  height: 20rem;
  width: 3rem;
  margin: auto;
  background: rgba(0, 0, 0, 0);
  border: none;
  box-shaddow-none;

  &:hover{
    background: rgba(0, 0, 0, .5);
  }
  `;

const ModalButton = styled.button`
  height: 20rem;
  width: 3rem;
  margin: auto;
  background: rgba(0, 0, 0, 0);
  border: none;
  box-shaddow-none;
  color: grey;

  &:hover{
    color: lightgrey;
    background: grey;
  }
`;

const Modal = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20rem;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 20;
`;

const Exit = styled.button`
  position: fixed;
  height: 2rem;
  width: 3rem;
  margin: auto;
  top: 1%;
  left: 95%;

  color: grey;

  background: rgba(0, 0, 0, 0);
  border: none;
  box-shaddow-none;

  &:hover{
    background: lightgrey;
  }
`;



const Images = (props) => {
  let num = 0;

  const [image, setImage] = useState('');
  const [images, setImages] = useState([{url: 'none'}]);
  const [currentIndex, setIndex] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);

  useInsertionEffect(()=> {
    if (props.currentStyle.photos) {
      setImage(props.currentStyle.photos[currentIndex].url);
      setImages(props.currentStyle.photos);
    }
  });

  useInsertionEffect(()=> {
    if (props.currentStyle.photos) {
      setIndex(0);
    }
  }, [images]);

  const handleNext = () =>{
    if (currentIndex === images.length - 1) { return; }
    setIndex(currentIndex + 1);
    setImage(props.currentStyle.photos[currentIndex].url);
  };

  const handleBack = () =>{
    if (currentIndex === 0) { return; }
    setIndex(currentIndex - 1);
    setImage(props.currentStyle.photos[currentIndex].url);
  };

  const handleOpen = () => {
    setDisplayModal(true);
  };

  const handleClose = () => {
    setDisplayModal(false);
  };

  if (displayModal) {
    return (
      <Modal>
        <Exit onClick={handleClose}> Exit </Exit>
        <ModalImagesDiv>
          {images.map((item) => {
            ++num;
            return (<ImagesItem image={item.thumbnail_url} key={num} setIndex={setIndex} allImages={images}/>);
          }
          )}
        </ModalImagesDiv>
        <ModalCarrosselDiv>
          <ModalButton onClick={handleBack}> &#x2190; </ModalButton>
          <Image src={image}/>
          <ModalButton onClick={handleNext}> &#x2192; </ModalButton>
        </ModalCarrosselDiv>
      </Modal>
    );
  }

  return (
    <Div>

      <CarrosselDiv>
        <Button onClick={handleBack}> &#x2190; </Button>
        <Image src={image} onClick={handleOpen}/>
        <Button onClick={handleNext}> &#x2192; </Button>
      </CarrosselDiv>
      <ImagesDiv>
        {images.map((item) => {
          ++num;
          return (<ImagesItem image={item.thumbnail_url} key={num} setIndex={setIndex} allImages={images}/>);
        }
        )}
      </ImagesDiv>
    </Div>
  );
};

export default Images;
