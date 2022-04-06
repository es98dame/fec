import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';

const Modaltrue = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: block;
  z-index : 20;
`;

const Modalfalse = styled.div`
  display: flex;
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
  padding : 10px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top |
                text-bottom | middle | top | bottom |
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const Modal = ({ handleClose, show, productInfo }) => {
  const ShowHideClassName = show ? Modaltrue : Modalfalse;

  // useEffect(()=>{
  //   const getValues = async () => {
  //     const res = await axios.get('/api', {headers: {path: `/products/${id}`}}) //get request to get the related item id array
  //     setProductInfo(res.data);
  //   };
  // },[])

  return show ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        handleClose();
      }}
    >
    <ShowHideClassName>
      <Modalmain>
        <h3>Comparing</h3>
        <br></br>
          <div className='comparingCards'>
            <StyledTable>
              <tbody>
                <tr>
                  <td className='tdName'>{productInfo.name}</td>
                  <td className='tdName'>Name</td>
                  <td className='tdName'>Overview item Name</td>
                </tr>
                <tr>
                  <td>{productInfo.category}</td>
                  <td>Category</td>
                  <td>Overview item category</td>
                </tr>
              </tbody>
            </StyledTable>
          </div>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </Modalmain>
    </ShowHideClassName>
    </div>

  ) : null;
};

export default Modal;