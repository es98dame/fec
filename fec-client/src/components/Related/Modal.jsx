import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';

const Modaltrue = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: block;
`;

const Modalfalse = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: none;
`;

const Modalmain = styled.section`
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;


const Modal = ({ handleClose, show, children }) => {
  const ShowHideClassName = show ? Modaltrue : Modalfalse;

  return (

    <ShowHideClassName>
      <Modalmain>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </Modalmain>
    </ShowHideClassName>

  );
};

export default Modal;