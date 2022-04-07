import React from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0, 0.3);
`;


const AddAModal = ({ hide }) => {
  const container = document.getElementById('app');

  // return reactDom.createPortal((
  //   <ModalWrapper>
  //     <div>Poop</div>
  //   </ModalWrapper>
  // ), container);
  console.log('pewp');
  return (
    <ModalWrapper>
      <div>Poop</div>
    </ModalWrapper>
  );
};


export default AddAModal;