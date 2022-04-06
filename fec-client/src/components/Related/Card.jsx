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

const CardDiv = styled.div`
  width: fit-content;
`;
const CardText = styled.p`
  padding-left: 1px;
`;

const PreviewImg = styled.img`
position : relative;
height : 100%;
z-index: 2;
&:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
`;

const ActionButton = styled.img`
  position : relative;
  left:85%;
  z-index:10;

`;
const Buttonimage = styled(ActionButton)`
display : inline;
margin-top' : -234px;
margin-left' : 127px;
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
    <div><ActionButton src = "https://img.icons8.com/ios-glyphs/30/000000/star--v1.png" onClick={() => {setShow(!show);}}></ActionButton>
     </div>
    <PreviewImg src={image} alt="no image"/>

    <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {props.productInfo}></Modal>
    <CardDiv>
    <p>{props.productInfo.category}</p>
    <p>{props.productInfo.name}</p>
    <p>{props.productInfo.default_price}</p>
    </CardDiv>
  </ProductCard>
  )
}

export default Card;