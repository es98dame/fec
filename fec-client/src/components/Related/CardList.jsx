import React, {useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal.jsx';
import Star from '../Shared/Stars.jsx';
import Card from './Card.jsx'


const ProductCard = styled.div`
display: flex;
flex-direction: column;
min-width: 0;
// flex: 1;
border: solid;
border-color: lightgray;

&:nth-child(1) {
  flex: 0 0 20%
}

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


const CardList = ({relatedArray})=> {
  console.log(relatedArray);
  const infoarray = useRef([]);
  const [idArray, setIdArray] = useState([]);

  useEffect(() => {
    var arr1 = {};
    var arr2 = [];

    Promise.all(relatedArray.map((id)=>{

    const Promise1 = axios.get('/api', {headers: {path: `/products/${id}`}}) //get request to get the related item id array
    .then(res => {
      console.log('product');
      // setIdArray(res.data);
      arr1 = res.data;
    });

    const Promise2 = axios.get('/api', {headers: {path: `/products/${id}/styles`}})
      .then(res => {
        console.log('style');
        arr2 = res.data.results;
      }) ;


    Promise.all([Promise1, Promise2])
    .then(()=>{
      infoarray.current.push({ product: arr1, style : arr2 });
      console.log(infoarray.current);
    })
    .catch(function(err){
      console.log(err);
    })

    }))
    .then(()=>{
      console.log('#');
    });

  }, [relatedArray]);

  useEffect(()=>{
    console.log('id',idArray)
  },[idArray])

  return(
    <div>
    {infoarray.current.map((data)=>(
      <Card productInfo={data}/>
    ))}
  </div>
  )
}

export default CardList;