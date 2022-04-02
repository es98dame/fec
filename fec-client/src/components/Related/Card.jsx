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

const Card = (props)=> {
  //console.log('syeye',props.styleInfo);
  let inputRef = useRef();
  const [show, setShow] = useState(false);


  var image = '';
  if(props.styleInfo.length === 0){
     image = '';
  } else {
     image = props.styleInfo[0].photos[0].thumbnail_url;
  }

  const handleClickOutside = ({ target }) => {
    if (show && !inputRef.current.contains(target)) setShow(false);
  };


  const handleClick = () => {
    if (!show) {
      document.addEventListener("click", handleClickOutside, false);
    } else {
      document.removeEventListener("click", handleClickOutside, false);
    }

    setShow(prevShow => ( !show ));
  };

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  // check show value here
  // useEffect(()=>{
  //   console.log('show',show);
  // },[show])

  return(
  <ProductCard ref={node => { inputRef = node; }}>
    <PreviewImg src={image} onClick={handleClick}></PreviewImg>
    { show && <Modal show={show} handleClose={handleClick}></Modal> }
    <div>{props.productInfo.category}</div>
    <div>{props.productInfo.name}</div>
    <div>{props.productInfo.default_price}</div>
  </ProductCard>
  )
}

export default Card;