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
&:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
`;

const ActionButton = styled.img`
  position : relative;
  left:85%;
  z-index:10;
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
    <CardText>{props.productInfo.category}</CardText>
    <CardText>{props.productInfo.name}</CardText>
    <CardText>{props.productInfo.default_price}</CardText>
    </CardDiv>
  </ProductCard>
  )
}

export default Card;