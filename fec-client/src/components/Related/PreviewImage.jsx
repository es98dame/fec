import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Thumbnails from './Thumbnails.jsx';
import CardRating from './CardRating.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const ThumbContainer = styled.div`
  display: none;
}
`;

const Preview = styled.div`
  display: flex;
  flex-grow: 0;
  min-height: 250px;
  max-width: 300px;
  max-height: 250px;
}
`;
const LeftButton = styled.button`
  position: absolute;
  width: 42px;
  left: 0;
  top: 137px;
  text-align: center;
  opacity: 0.7;

  transition: all .5s ease;

  line-height: 0.5;
  font-size: 17px;
  padding: 10px;
  outline: none;
  border-radius: 13px;
  &:hover {
    opacity: 1;
    border: 3px solid black;
  }
`;

const RightButton = styled.button`
  position: absolute;
  width: 42px;
  right: 0;
  top: 137px;
  text-align: center;
  opacity: 0.7;

  transition: all .5s ease;
  line-height: 0.5;
  font-size: 17px;

  padding: 10px;
  outline: none;
  border-radius: 13px;
  &:hover {
    opacity: 1;
    border: 3px solid black;
  }
`;

const Textarea = styled.div`
  visibility: hidden;
  gap: .5rem;
  height: 40px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: fill;
  object-position: center;
`;

const CardText = styled.p`
  display : block;
  margin-top: 4px;
  margin-bottom: -5px;
  padding-left: 1px;
`;

const PreviewImage = ({ productInfo, styleInfo }) => {
  //  console.log('inside', productInfo, styleInfo);
  const [main, setMain] = useState('');
  const [price, setPrice] = useState('');
  const [clickableimage, setClickableimage] = useState(false);
  const [discountprice, setDiscountprice] = useState(null);
  const thumbcontainer = useRef(null);
  const textcontainer = useRef(null);

  // variable for image slide
  const [imageIndex, setImageIndex] = useState(0);

  const imageClick = (url) => {
    setImageIndex(0);
    setMain(url);
  };

  const updateId = () => {
    window.localStorage.setItem('ProductId', productInfo.id);
    window.location.reload();
  };

  const updatePrice = (salesprice) => {
    setDiscountprice(salesprice);
  };

  const getColor = () => {
    if (JSON.parse(window.localStorage.getItem('DarkMode'))) {
      if (discountprice === null) {
        return 'white';
      } else {
        return 'red';
      }
    } else {
      if (discountprice === null) {
        return 'black';
      } else {
        return 'red';
      }
    }
  };

  const getDecor = () => (discountprice === null ? 'none' : ' line-through');

  const showthumbs = (value) => {
    if (value) {
      thumbcontainer.current.style.display = 'flex';
      textcontainer.current.style.visibility = 'visible';
      textcontainer.current.style.height = '100%';
      setClickableimage(true);
    } else {
      thumbcontainer.current.style.display = 'none';
      textcontainer.current.style.visibility = 'hidden';
      textcontainer.current.style.height = '40px';
      setClickableimage(false);
    }
  };

  const nextPhoto = () => {
    setMain(styleInfo.results[0].photos[imageIndex + 1].thumbnail_url);
    setImageIndex(imageIndex + 1);
  };

  const prevPhoto = () => {
    setMain(styleInfo.results[0].photos[imageIndex - 1].thumbnail_url);
    setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    setMain(styleInfo.results[0].photos[imageIndex].thumbnail_url);
    setPrice(productInfo.default_price);
  }, [styleInfo]);

  return (
    <Container onClick={() => { showthumbs(true); }} onMouseLeave={() => { showthumbs(false); }}>

      {clickableimage
        ? (
          <Preview>
            {imageIndex === 0 ? '' : <LeftButton onClick={prevPhoto}> ← </LeftButton> }
            <Image src={main} onClick={updateId} alt="Oops! no image"/>
            {imageIndex + 1 === styleInfo.results[0].photos.length ? ''
              : <RightButton onClick={nextPhoto}> → </RightButton> }
          </Preview>
        )
        : <Preview><Image src={main} alt="Oops! no image" /></Preview>
      }

      <ThumbContainer ref={thumbcontainer}>
        { styleInfo.results instanceof Array
          && styleInfo.results.slice(0, 4).map((data, index) => (
            <Thumbnails
              key={index}
              results={data}
              imageClick={imageClick}
              updatePrice={updatePrice}
            />
          ))}
      </ThumbContainer>
      <Textarea ref={textcontainer}>
        <CardText>{productInfo.category}</CardText>
        <CardText>{productInfo.name}</CardText>
        <CardText>
          <span style={{ color: getColor(), textDecoration: getDecor() }}>{price}</span>
          {discountprice === null ? '' : discountprice}
        </CardText>
        <CardRating id={productInfo.id} />
      </Textarea>
    </Container>
  );
};

export default PreviewImage;
