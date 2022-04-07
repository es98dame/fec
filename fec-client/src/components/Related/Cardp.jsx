import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal.jsx';
import Star from '../Shared/Stars.jsx';


const ProductCard = styled.div`
display: flex;
flex-direction: column;
min-width: 0;
// flex: 1;
border: solid;
border-color: lightgray;

&:nth-child(1) {
  flex: 0 0 20%
}

&:nth-child(2) {
  flex: 0 0 20%;
}
&:nth-child(3) {
  flex: 0 0 20%;
}
&:nth-child(4) {
  flex: 0 0 20%;
}
&:nth-child(5) {
  flex: 0 0 20%;
}
`;

const CardDiv = styled.div`
  width: fit-content;
  line-height: 0.8em;
`;
const CardText = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 1px;
`;

const PreviewImg = styled.img`
position : relative;
height : 100%;
z-index: 2;
transition: all 0.2s linear;
&:hover {
  box-shadow: 0 5px 20px 8px rgba(0,0,0,0.3);
  transform: scale(1.07);
}
`;

const ActionButton = styled.img`
  position : relative;
  left:83%;
  z-index:10;
  &:hover {
    transform: scale(1.3);
  }
`;


const Card = ({productInfo})=> {
  // const { product , style } = productInfo;
  console.log(productInfo);
  const [show, setShow] = useState(false);

  var image = '';

  // useEffect(()=>{
  //   for(let i in style){
  //     if(style[i]['default?'] === true){
  //       console.log('for');
  //       image = style[i].photos[0].thumbnail_url;
  //     }
  //   }
  // },[productInfo]);


  return(
    <ProductCard>
    <div><ActionButton src = "https://img.icons8.com/ios-glyphs/30/000000/star--v1.png" onClick={() => {setShow(!show);}}></ActionButton>
     </div>
    <PreviewImg src={image} alt="no image"/>

    {/* <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {product}></Modal> */}
    {/* <CardDiv>
    <CardText>{product.category}</CardText>
    <CardText>{product.name}</CardText>
    <CardText>{product.default_price}</CardText>
    <CardText><Star rating ='4'/></CardText>
    </CardDiv> */}
  </ProductCard>
  )
}

export default Card;