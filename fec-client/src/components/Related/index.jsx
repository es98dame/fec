import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';
import RelatedList from './RelatedList.jsx';

// import config from '../../../../config.js';

const ProductList = styled.div`
display: flex;
flex-direction: row;
`;
const Listtitle = styled.h3`
display: inline-block;
`;

const Products = (props)=> {
  // const [idArray, setIdArray] = useState([]);

  // //console.log(config.TOKEN); // ok I got token

  // const getRelatedItemsId = (id) => {
  //   axios.get('/api', {headers: {path: `/products/${id}/related`}}) //get request to get the related item id array
  //   .then(res => {
  //     console.log('related',res);
  //     setIdArray(res.data);
  //   })
  //   .catch(err=> console.log(err));
  // }

  // //componentDidmount
  // useEffect(()=>{
  //   getRelatedItemsId('65632') // id = 65633
  // },[])


  // return (
  //   <div>
  //     <Listtitle>Related List</Listtitle>
  //     <ProductList>
  //     {idArray.map((data,index)=> (
  //       <RelatedList id = {data} key = {index}/>
  //     ))}
  //   </ProductList>
  //   </div>
  // );
};

export default Products;