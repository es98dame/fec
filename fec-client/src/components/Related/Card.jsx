import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal.jsx';
import PreviewImage from './PreviewImage.jsx';
import { FaStar, FaTimesCircle } from 'react-icons/fa';

const ProductCard = styled.div`
  display : flex;
  flex-direction: column;
  position : relative;
  border: solid;
  border-color: lightgray;

  &:hover {
    border-color: black;
      z-index : 20;
      transform: scale(1.01);
  }
`;

const ActionButton = styled.span`
  display : flex;
  position : relative;
  left:90%;
  z-index:7;
  &:hover {
    opacity: 0.7;
  }
`;

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
            ? <ActionButton onClick={() => { deletehandle(productInfo.id); }} > <FaTimesCircle/> </ActionButton>
            : <ActionButton onClick={() => { setShow(!show); }} > <FaStar/> </ActionButton> }
        </div>
        {styleInfo !== undefined
          ? <PreviewImage productInfo={productInfo} styleInfo={styleInfo} /> : ''}
      </ProductCard>
    </div>
  );
};

export default Card;
