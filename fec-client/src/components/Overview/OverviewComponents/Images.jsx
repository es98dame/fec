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
  margin: 5px;
  padding: 5px;
  height: 10%;
  width 90%;
`;

const CarrosselDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  min-height: 50rem;
  justify-content: space-between;
  background-color: lightgrey
`;

const ModalCarrosselDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  height: 80%;
  justify-content: space-between;
  background-color: grey;
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
  `;

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, .9);
  flex-direction: column;
  z-index: 20;
`;

const Exit = styled.button`
  position: fixed;
  height: 2rem;
  width: 3rem;
  margin: auto;
  top: 1%;
  left: 95%;
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
        <ModalCarrosselDiv>
          <Button onClick={handleBack}> &#x2190; </Button>
          <Image src={image}/>
          <Button onClick={handleNext}> &#x2192; </Button>
        </ModalCarrosselDiv>
        <ModalImagesDiv>
          {images.map((item) => {
            ++num;
            return (<ImagesItem image={item.thumbnail_url} key={num} setIndex={setIndex} allImages={images}/>);
          }
          )}
        </ModalImagesDiv>
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
