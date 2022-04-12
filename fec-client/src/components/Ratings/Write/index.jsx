import React, {useState} from 'react';
import WriteModal from './WriteModal.jsx';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  margin 10px;
  background-color: #fff;
  border: 1px solid #403244;
  box-shadow: 2px 2px #403244;
  border-radius: 7px;
  color: #242125;
  width: 20%;

  &: hover{
    background-color: #4b464d;
    cursor: pointer;
    color: #fff;
  }

  &:active{
    background-color: #fff;
    color: #242125;
    box-shadow: 0 0 #87986a;
    transform: translateY(2px);
    transform: translatex(2px);
  }
`;


const Write = ({relevantChars, productId, productName}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleWriteModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button onClick = {toggleWriteModal}>Write a Review</Button>
      { showModal ? <WriteModal relevantChars = {relevantChars} productId = {productId} toggleWriteModal = {toggleWriteModal} productName = {productName}/> : null}
    </div>
  );
};

export default Write;