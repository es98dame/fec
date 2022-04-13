import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import PreviewImage from './PreviewImage.jsx';

const ProductCard = styled.div`
  display : flex;
  flex-direction: column;
  position : relative;
  //min-width: 0;
  // flex: 1;
  border: solid;
  border-color: lightgray;
  background : white;

  &:hover {
    border-color: black;
      z-index : 20;
      transform: scale(1.01);
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

const starturl = 'https://img.icons8.com/ios-glyphs/30/000000/star--v1.png';
const cancelurl = 'https://img.icons8.com/ios-glyphs/30/000000/cancel.png';
const p = 'Product card';
const o = 'Outfit card';
const Card = ({productInfo, styleInfo, mode, deletehandle }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Modal show={show} handleClose={() => { setShow(false); }} productInfo={productInfo} />
      <ProductCard title = {mode === 'related' ? p : o}>
        <div>
          {mode === 'outfit'
            ? <ActionButton src={cancelurl} onClick={() => { deletehandle(productInfo.id); }} />
            : <ActionButton src={starturl} onClick={() => { setShow(!show); }} />}

        </div>
        {styleInfo !== undefined
          ? <PreviewImage productInfo={productInfo} styleInfo={styleInfo} /> : ''}
      </ProductCard>
    </div>
  );
};

export default Card;

// onClick={() => {deleteItemOutfit(i)}}
