import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal.jsx';
import Star from '../Shared/Stars.jsx';
import PreviewImage from './PreviewImage.jsx';

const ProductCard = styled.div`
display : flex;
flex-direction: column;
position : relative;
//min-width: 0;
// flex: 1;
border: solid;
border-color: lightgray;
background : white;

&:hover {
  border-color: black;
    z-index : 20;
    transform: scale(1.01);
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
`;

const ActionButton = styled.img`
  position : relative;
  left:83%;
  z-index:7;
  &:hover {
    transform: scale(1.3);
  }
`;

const starturl = "https://img.icons8.com/ios-glyphs/30/000000/star--v1.png";
const cancelurl = "https://img.icons8.com/ios-glyphs/30/000000/cancel.png";

const Card = ({productInfo , styleInfo, mode, deletehandle})=> {

  const [show, setShow] = useState(false);

  return(
    <div>
      <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {productInfo}></Modal>
        <ProductCard>
          <div>
            {mode === 'outfit' ?
            <ActionButton src ={cancelurl} onClick={() => {deletehandle(productInfo.id);}} ></ActionButton>
            : <ActionButton src ={starturl}  onClick={() => {setShow(!show);}}></ActionButton>
            }

          </div>
            {styleInfo !== undefined ?
            <PreviewImage productInfo = {productInfo} styleInfo ={styleInfo}/> : ''}
        </ProductCard>
    </div>
  )
}

export default Card;

// onClick={() => {deleteItemOutfit(i)}}