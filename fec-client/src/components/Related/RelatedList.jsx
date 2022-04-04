import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card.jsx'
import "regenerator-runtime/runtime.js";

const RelatedList = ({id})=> {

  const [productInfo, setProductInfo] = useState({});
  const [styleInfo, setStyleInfo] = useState([]);

  //componentDidmount
  useEffect(()=>{

    const getProductInfo = async () => {
      const res = await axios.get('/api', {headers: {path: `/products/${id}`}}) //get request to get the related item id array
      setProductInfo(res.data);
    };
    const getStyleInfo= async () => {
      const res = await axios.get('/api', {headers: {path: `/products/${id}/styles`}}) //get request to get the related item id array
      setStyleInfo(res.data.results)
    };

    getStyleInfo();
    getProductInfo();


  },[])

  //check info value
  // useEffect(() => {
  //   console.log('pro',productInfo)
  //   console.log('sty',styleInfo)
  // }, [productInfo,styleInfo])


  // "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  return (
    <Card productInfo={productInfo} styleInfo={styleInfo}/>
  );
}

export default RelatedList;