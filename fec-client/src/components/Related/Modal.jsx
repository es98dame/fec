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
  z-index : 30;
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
  text-align : center;
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
  const id = window.localStorage.getItem("ProductId");
  const [currentItemValues, setCurrentItemValues] = useState({});

  useEffect(()=>{
    const getValues = async () => {
      const res = await axios.get('/api', {headers: {path: `/products/${id}`}}) //get request to get current item's values
      setCurrentItemValues(res.data);
    };

    getValues();
  },[])

  return show ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        handleClose();
      }}
    >
    <ShowHideClassName>
      <Modalmain onClick={e => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>

        <h3>Comparing</h3>
        <br></br>
          <div className='comparingCards'>
            <StyledTable>
              <tbody>
              <tr>
                  <td className='tdName'>Selected Item</td>
                  <td className='tdName'></td>
                  <td className='tdName'>Current Item</td>
                </tr>
                <tr>
                  <td className='tdName'>{productInfo.name}</td>
                  <td className='tdName'>Name</td>
                  <td className='tdName'>{currentItemValues.name}</td>
                </tr>
                {/* current item values list */}
            {currentItemValues.features.map((i, key)=>(
              <tr key={key}>
              <td className='tdName'>✔️</td>
              <td className='tdName'>{i.feature + ' : ' + i.value}</td>
              <td className='tdName'></td>
            </tr>
            ))}
            {/* clicked item values list */}
            {productInfo.features.map((i, key)=>(
              <tr key={key}>
              <td className='tdName'></td>
              <td className='tdName'>{i.feature + ' : ' + i.value}</td>
              <td className='tdName'>✔️</td>
            </tr>
            ))}
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