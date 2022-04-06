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

const CarrosselDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  min-height: 50rem;
  justify-content: space-between;
  background-color: lightgrey
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



const Images = (props) => {
  let num = 0;


  const [image, setImage] = useState('');
  const [images, setImages] = useState([{url: 'none'}]);
  const [currentIndex, setIndex] = useState(0);

  useInsertionEffect(()=> {

  });

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

  return (
    <Div>
      <CarrosselDiv>
        <Button onClick={handleBack}> &#x2190; </Button>
        <Image src={image}/>
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