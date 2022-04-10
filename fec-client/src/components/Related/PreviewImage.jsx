import React, {useState, useEffect} from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Thumbnails from './Thumbnails.jsx';
import Star from '../Shared/Stars.jsx';

const Container = styled.div`
  // display: flex;
  // flex-flow: row wrap;
  // margin: 5px;
  // padding: 5px;
  // justify-content: flex-start;
  // height: 5rem;
  display: flex;
  flex-direction: column;
  // flex-grow: 0;
  // flex-shrink: 1;
  flex : none;
  min-height: 70%;
`;

const ThumbContainer = styled.div`
  display: flex;
`;

const Mainview = styled.div`
  // display: flex;
  // flex-flow: row wrap;
  // margin: 5px;
  // padding: 5px;
  // justify-content: flex-start;
  // height: 5rem;
`;

const Preview = styled.div`
  display: flex;
  flex-grow: 0;
  min-height: 250px;
  max-width: 300px;
  max-height: 250px;
}
`;

const Textarea = styled.div`
  gap: .5rem;
`;

var Image = styled.img`
  width: 100%;
  object-fit: fill;
  object-position: center;
`;

const CardText = styled.p`
  display : block;
  margin-top: 4px;
  margin-bottom: -5px;
  padding-left: 1px;
`;

const PreviewImage = ({productInfo , styleInfo})=> {
  // console.log('inside', productInfo, styleInfo);
  const [results , setResults] = useState([]);
  const [main, setMain] = useState('');
  const [price , setPrice] = useState('');
  const [discountprice , setDiscountprice] = useState(null);
  // const [thumbnails, setThumbnails] = useState(null);
  //mainimage

  //as much as results length
  //subimage mouseover chage state value & price

  const imageClick =(url) => {
    setMain(url);
  }

  const updateId = () => {
    window.localStorage.setItem("ProductId", productInfo.id );
    window.location.reload();
  }

  const updatePrice = (sales_price) => {
      setDiscountprice(sales_price);
  }

  const getColor = ()=>{
    return discountprice === null ? 'black' : 'red';
  }
  const getDecor = ()=>{
    return discountprice === null ? 'none' : ' line-through';
  }

 useEffect(()=>{
  setMain(styleInfo.results[0].photos[0].thumbnail_url);
  setPrice(productInfo.default_price);
 },[styleInfo]);

 return (
  <Container>
      <Preview>
        <Image src = {main} onClick={updateId}/>
      </Preview>
      <ThumbContainer>
        { styleInfo.results instanceof Array
        && styleInfo.results.slice(0,4).map((data,index)=>(
          <Thumbnails key={index} results = {data} imageClick={imageClick} updatePrice={updatePrice}/>
        ))}
        </ThumbContainer>
    <Textarea>
      <CardText>{productInfo.category}</CardText>
      <CardText>{productInfo.name}</CardText>
      <CardText>
        <span style={{ "color": getColor() , "textDecoration" : getDecor()}}>{price}</span>
        {discountprice === null ? '' : discountprice}
      </CardText>
      <Star rating ='4'/>
    </Textarea>
  </Container>
 );
}

export default PreviewImage;