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

const HeartCheckbox = styled.input`
  display: none;
`;

const HeartLabel = styled.label`
  color: ${({ checked }) => (checked ? "red" : "grey")};
  background-color: currentColor;
  display: inline-block;
  height: 70px;
  margin: 0 10px;
  top: 0;
  transform: rotate(-45deg);
  position: relative;
  left: 45%;
  top: 45%;
  width: 50px;

  &::before,
  &::after {
    content: "";
    background-color: currentColor;
    border-radius: 50%;
    height: 50px;
    position: absolute;
    width: 50px;
  }

  &:before {
    top: -25px;
    left: 0;
  }

  &:after {
    left: 25px;
    top: 0;
  }

`;

const Card = (props)=> {
  //console.log('syeye',props.styleInfo);
  const [show, setShow] = useState(false);
  // for action button
  const [checked, setChecked] = useState(false);
  const toggle = () => setChecked(!checked);

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
    <PreviewImg src={image} onClick={() => {setShow(!show);}}/>


    <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {props.productInfo}></Modal>
    <div>{props.productInfo.category}</div>
    <div>{props.productInfo.name}</div>
    <div>{props.productInfo.default_price}</div>
  </ProductCard>
  )
}

export default Card;