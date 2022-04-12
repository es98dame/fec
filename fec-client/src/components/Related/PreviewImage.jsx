import React, {useState, useEffect, useRef} from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Thumbnails from './Thumbnails.jsx';
import Star from '../Shared/Stars.jsx';
import CardRating from './CardRating.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex : none;
  min-height: 70%;
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
  opacity: 1;
  color : white;
  border: solid 3px white;
  transition: all .5s ease;
  border: 3px solid white;
  line-height: 0.5;
  font-size: 17px;
  background-color : transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;

  &:hover {
    color: #001F3F;
    background-color: #fff;
}
`;

const RightButton = styled.button`
  position: absolute;
  width: 42px;
  right: 0;
  top: 137px;
  text-align: center;
  opacity: 1;
  color : white;
  border: solid 3px white;
  transition: all .5s ease;
  border: 3px solid white;
  line-height: 0.5;
  font-size: 17px;
  background-color : transparent;
  padding: 10px;
  outline: none;
  border-radius: 4px;

  &:hover {
    color: #001F3F;
    background-color: #fff;
}
`;



const Textarea = styled.div`
  visibility: hidden;
  gap: .5rem;
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

const PreviewImage = ({productInfo , styleInfo})=> {
  //  console.log('inside', productInfo, styleInfo);
  const [results , setResults] = useState([]);
  const [main, setMain] = useState('');
  const [price , setPrice] = useState('');
  const [clickableimage , setClickableimage] = useState(false);
  const [discountprice , setDiscountprice] = useState(null);
  const thumbcontainer = useRef(null);
  const textcontainer = useRef(null);

  // variable for image slide
  const [imageIndex, setImageIndex] = useState(0);

  const imageClick =(url) => {
    setMain(url);
  }

  const updateId = () => {
    window.localStorage.setItem("ProductId", productInfo.id );
    window.location.reload();
  }

  const updatePrice = (sales_price) => {
      setDiscountprice(sales_price);
  }

  const getColor = ()=>{
    return discountprice === null ? 'black' : 'red';
  }
  const getDecor = ()=>{
    return discountprice === null ? 'none' : ' line-through';
  }

  const showthumbs = (value) => {
    if(value){
    thumbcontainer.current.style.display = 'flex';
    textcontainer.current.style.visibility = 'visible';
    setClickableimage(true);
    }else{
    thumbcontainer.current.style.display = 'none';
    textcontainer.current.style.visibility = 'hidden';
    setClickableimage(false);
    }
  }

  const nextPhoto = () =>{
    setMain(styleInfo.results[0].photos[imageIndex+1].thumbnail_url);
    setImageIndex(imageIndex+1);
  }

  const prevPhoto = () =>{
    setMain(styleInfo.results[0].photos[imageIndex-1].thumbnail_url);
    setImageIndex(imageIndex-1);
  }

  useEffect(()=>{
    setMain(styleInfo.results[0].photos[imageIndex].thumbnail_url);
    setPrice(productInfo.default_price);
  },[styleInfo]);

  return (
    <Container onClick={() => {showthumbs(true);}} onMouseLeave={() => {showthumbs(false);}}>

          {clickableimage ?
          <Preview >
            {imageIndex === 0 ? '' : <LeftButton onClick={prevPhoto}> ← </LeftButton> }
              <Image src = {main} onClick={updateId}/>
            {imageIndex + 1 === styleInfo.results[0].photos.length ? ''
            : <RightButton onClick={nextPhoto}> → </RightButton> }
          </Preview>
          : <Preview><Image src = {main} alt = 'Oops! no image' /></Preview>
          }

        <ThumbContainer ref={thumbcontainer}>
          { styleInfo.results instanceof Array
          && styleInfo.results.slice(0,4).map((data,index)=>(
            <Thumbnails key={index} results = {data} imageClick={imageClick} updatePrice={updatePrice}/>
          ))}
          </ThumbContainer>
      <Textarea ref={textcontainer}>
        <CardText>{productInfo.category}</CardText>
        <CardText>{productInfo.name}</CardText>
        <CardText>
          <span style={{ "color": getColor() , "textDecoration" : getDecor()}}>{price}</span>
          {discountprice === null ? '' : discountprice}
        </CardText>
        <CardRating id={productInfo.id}/>
      </Textarea>
    </Container>
  );
}

export default PreviewImage;