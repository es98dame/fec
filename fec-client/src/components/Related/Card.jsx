import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal.jsx';

const ProductCard = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;
border: solid;
border-color: lightgray;
`;

const PreviewImg = styled.img`
flex-direction: column;
height : 100%;
`;

const Heartbutton = styled.button`

  position: absolute;
  color: black;
  font-size: 2rem;
  cursor: pointer;
  left: 50%;
  bottom: 50%;
`;
const Actionicon = styled.i`
  position: absolute;
  z-index: 2;
  color: red;
  position: absolute;
`;

const Card = (props)=> {
  //console.log('syeye',props.styleInfo);
  const [show, setShow] = useState(false);


  var image = '';
  if(props.styleInfo.length === 0){
     image = '';
  } else {
     image = props.styleInfo[0].photos[0].thumbnail_url;
  }

  // check show value here
  // useEffect(()=>{
  //   console.log('show',show);
  // },[show])

  return(
  <ProductCard>
    <PreviewImg src={image} onClick={() => {setShow(!show);}}></PreviewImg>
    <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {props.productInfo}></Modal>
    <div>{props.productInfo.category}</div>
    <div>{props.productInfo.name}</div>
    <div>{props.productInfo.default_price}</div>
  </ProductCard>
  )
}

export default Card;