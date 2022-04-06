import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const ProductList = styled.div`
display: flex;
flex-direction: row;
width : 100%;
overflow-x: auto;

// SCROLLBAR MODE
&::-webkit-scrollbar {
  width: 10px;
}
&::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
&::-webkit-scrollbar-track {
  background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
}
`;

const Listtitle = styled.h3`
display: inline-block;
`;

const Outfit = styled.div`
display: flex;
flex-direction: row;
width : 100%;
overflow-x: auto;
`;

const Products = (props)=> {
  const [idArray, setIdArray] = useState([]);

  //console.log(config.TOKEN); // ok I got token

  const getRelatedItemsId = (id) => {
    axios.get('/api', {headers: {path: `/products/${id}/related`}}) //get request to get the related item id array
    .then(res => {
      //console.log('related', res);
      setIdArray(res.data);
    })
    .catch(err=> console.log(err));
  }

  //componentDidmount
  useEffect(()=>{
    getRelatedItemsId(props.productId) // id = 65631
  },[])


  return (
    <div title='TheProductList'>
      <Listtitle>Related List</Listtitle>
      <ProductList>
      {idArray.map((data,index)=> (
        <RelatedList id = {data} key = {index}/>
      ))}
    </ProductList>
    <Listtitle>Outfit List</Listtitle>
      <Outfit>
        <OutfitList/>
      </Outfit>
    </div>
  );
};

export default Products;