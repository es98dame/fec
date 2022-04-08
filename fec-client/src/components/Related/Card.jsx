import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal.jsx';
import Star from '../Shared/Stars.jsx';


const ProductCard = styled.div`
  display : flex;
  flex-direction: column;
  position : relative;

//min-width: 0;
// flex: 1;
border: solid;
border-color: lightgray;
//flex: 0 0 25%
  background : white;
&:hover {
    z-index : 50;
    transform: scale(1.4);

}

// &:nth-child(2) {
//   flex: 0 0 25%;
// }
// &:nth-child(3) {
//   flex: 0 0 25%;
// }
// &:nth-child(4) {
//   flex: 0 0 25%;
// }
// &:nth-child(5) {
//   flex: 0 0 25%;
// }
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
  ${ProductCard}{
    z-index : 50;
    transform: scale(1.7);
  }
}
`;

const ActionButton = styled.img`
  position : relative;
  left:83%;
  z-index:7;
  &:hover {
    transform: scale(1.3);
  }
`;


const Card = ({productInfo})=> {
  // const { product , style } = productInfo;

  // const [info, setInfo] = useState(null);
  // const [style, setStyle] = useState(null);
  const image = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    console.log(productInfo);
  },[productInfo]);


  return(
    <ProductCard>
      {/* {productInfo === null ? '' :
      <ProductCard> */}
      <div>
        <ActionButton src = "https://img.icons8.com/ios-glyphs/30/000000/star--v1.png" onClick={() => {setShow(!show);}}></ActionButton>
     </div>
    <PreviewImg src='http://placecorgi.com/260/180' alt="no image"/>

    <Modal show={show} handleClose={() => {setShow(false);}} productInfo = {productInfo}></Modal>
    <CardDiv>
    <CardText>{productInfo.category}</CardText>
    <CardText>{productInfo.name}</CardText>
    <CardText>{productInfo.default_price}</CardText>
    <Star rating ='4'/>
    </CardDiv>
    </ProductCard>
  // }
  // </ProductCard>

  )
}

export default Card;