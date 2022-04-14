import React, {useState} from 'react';
import WriteModal from './WriteModal.jsx';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  margin 10px;
  background-color: ${props => props.theme.darkgrayToLight};
  border-radius: 7px;
  border: 1px solid ${props => props.theme.background};
  color: #fff;
  width: 20%;

  &: hover{
    background-color: #4b464d;
    cursor: pointer;
    color: #fff;
  }

  &:active{
    background-color: #fff;
    color: #242125;
  }
`;


const Write = ({relevantChars, productId, productName}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleWriteModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div title = 'write'>
      <Button onClick = {toggleWriteModal}>Write a Review + </Button>
      { showModal ? <WriteModal relevantChars = {relevantChars} productId = {productId} toggleWriteModal = {toggleWriteModal} productName = {productName}/> : null}
    </div>
  );
};

export default Write;