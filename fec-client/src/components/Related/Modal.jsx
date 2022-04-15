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
  color : black
  display: block;
  z-index : 35;
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
  color: black;
`;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  text-align : center;

  caption-side: bottom;

  td,
  th {
    border: none;
  }

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

const CheckTd = styled.td`
width : 100px;
`;

const Modal = ({ handleClose, show, productInfo }) => {
  const ShowHideClassName = show ? Modaltrue : Modalfalse;
  const id = window.localStorage.getItem('ProductId');
  const [currentName, setCurrentName] = useState('');
  const [features, setFeatures] = useState({});

  const comparehelper = (data, position) => {
    let current = features;
    let featureList = data.features;
    for (let i = 0; i < featureList.length; i++) {

      let currentFeature = featureList[i].feature;

      if (featureList[i].value !== null) {

        if (!current[currentFeature]) {
          let tuple = ['', ''];

          tuple[position] = featureList[i].value;
          if (tuple[position] === true) {
            tuple[position] = '&#10004;';
          }
          current[currentFeature] = tuple;
        } else {
          current[currentFeature][position] = featureList[i].value;
        }
      }
    }
    if (position === 1) {
      setCurrentName(data.name);
    }
    setFeatures(current);
  };

  useEffect(()=>{
    const getValues = () => {
      axios.get('/api', {headers: {path: `/products/${id}`}})
        .then((res)=>{
          comparehelper(res.data, 0);
        })
        .catch ((error) => {
          console.log('axio request errors in Modal.jsx', error);
        });
    };

    getValues();
    comparehelper(productInfo, 1);
  }, []);



  return show ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        handleClose();
      }}
    >
      <ShowHideClassName>
        <Modalmain title='ModalCard'>

          <h3>Comparing</h3>
          <br></br>
          <div className='comparingCards'>
            <StyledTable>
              <tbody>
                <tr>
                  <td className='tdName'><b>Selected Item</b></td>
                  <CheckTd></CheckTd>
                  <td className='tdName'></td>
                  <CheckTd></CheckTd>
                  <td className='tdName'><b>Current Item</b></td>
                </tr>
                <tr>
                  <td className='tdName'>{productInfo.name}</td>
                  <CheckTd></CheckTd>
                  <td className='tdName'>Name</td>
                  <CheckTd></CheckTd>
                  <td className='tdName'>{currentName}</td>
                </tr>
                {Object.keys(features).map(feature => {
                  if (features[feature][0] === '') {
                    return (
                      <tr>
                        <td>{features[feature][0]}</td>
                        <CheckTd></CheckTd>
                        <td><b>{feature}</b></td>
                        <CheckTd>✔️</CheckTd>
                        <td>{features[feature][1]}</td>
                      </tr>
                    );
                  } else if (features[feature][1] === '') {
                    return (
                      <tr>
                        <td>{features[feature][0]}</td>
                        <CheckTd>✔️</CheckTd>
                        <td><b>{feature}</b></td>
                        <CheckTd></CheckTd>
                        <td>{features[feature][1]}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr>
                        <td>{features[feature][0]}</td>
                        <CheckTd>✔️</CheckTd>
                        <td><b>{feature}</b></td>
                        <CheckTd>✔️</CheckTd>
                        <td>{features[feature][1]}</td>
                      </tr>
                    );
                  }
                }

                )}
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