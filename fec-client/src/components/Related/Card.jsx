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
&:nth-child(6) {
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


const Card = ({id})=> {
  //console.log('id in card.js', id);

  const [productInfo, setProductInfo] = useState({});
  const [styleInfo, setStyleInfo] = useState([]);

  const [show, setShow] = useState(false);

  var image = '';
  if(styleInfo.length === 0){
     image = '';
  } else {
     image = styleInfo[0].photos[0].thumbnail_url;
  }

  // check show value here
  // useEffect(()=>{
  //   console.log('show',show);
  // },[show])

  useEffect(()=>{

    const getProductInfo = async () => {
      const res = await axios.get('/api', {headers: {path: `/products/${id}`}}) //get request to get the related item id array
      setProductInfo(res.data);
    };
    const getStyleInfo= async () => {
      const res = await axios.get('/api', {headers: {path: `/products/${id}/styles`}}) //get request to get the related item id array
      //console.log(res)
      setStyleInfo(res.data.results)
    };

    getStyleInfo();
    getProductInfo();


  },[id])


  return(
  <ProductCard>
    <div><ActionButton src = "https://img.icons8.com/ios-glyphs/30/000000/star--v1.png" onClick={() => {setShow(!show);}}></ActionButton>
     </div>
    <PreviewImg src={image} alt="no image"/>

    <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {productInfo}></Modal>
    <CardDiv>
    <CardText>{productInfo.category}</CardText>
    <CardText>{productInfo.name}</CardText>
    <CardText>{productInfo.default_price}</CardText>
    <Star rating ='4'/>
    </CardDiv>
  </ProductCard>
  )
}

export default Card;