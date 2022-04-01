import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

import config from '../../../../config.js';


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
  console.log('syeye',props.styleInfo);

  var image = '';
  if(props.styleInfo.length === 0){
     image = '';
  } else {
     image = props.styleInfo[0].photos[0].thumbnail_url;
  }

  // const changeInfo = (info) => {
  //   setStyles(info);
  // };

  // useEffect(()=>{
  //   if(props.styleInfo !== []){
  //     console.log('call');
  //     changeInfo(props.styleInfo)
  //   }
  // },[])

  // useEffect(()=>{
  //   console.log('style',styles)
  // },[styles])

  return(
  <ProductCard>
    <PreviewImg src={image}></PreviewImg>
    <div>{props.productInfo.category}</div>
    <div>{props.productInfo.name}</div>
    <div>{props.productInfo.default_price}</div>
  </ProductCard>
  )
}

export default Card;