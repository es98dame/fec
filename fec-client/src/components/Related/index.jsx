import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const ProductList = styled.div`
  display: flex;
  width : 100%;
  min-width: 0;
  height: 503px;

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

const Products = (props) => {
  const [idArray, setIdArray] = useState([]);

  const getRelatedItemsId = (id) => {
    axios.get('/api', { headers: { path: `/products/${id}/related` } }) // get request to get the related item id array
      .then((res) => {
      // console.log('related', res);
      // unique
        const relatedArr = [...new Set(res.data)];
        setIdArray(relatedArr);
      })
      .catch((err) => console.log('axio request error in Realted/index.jsx', err));
  };

  // componentDidmount
  useEffect(() => {
    getRelatedItemsId(props.productId);
  }, []);

  return (
    <div title="TheProductList">
      <Listtitle>Related List</Listtitle>
      <ProductList>
        <RelatedList relatedArray={idArray} mode="related" />
      </ProductList>
      <Listtitle>Outfit List</Listtitle>
      {/* <ProductList>
        <OutfitList />
      </ProductList> */}
    </div>
  );
};

export default Products;
