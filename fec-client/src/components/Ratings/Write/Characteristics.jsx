import React, {useState} from 'react';
import styled from 'styled-components';
import factors from './factors.js';

const Div = styled.div`
display: flex;
flex-direction: column;
gap: 2%;
min-width: max-content;

`;

const Selection = styled.span`
font-style: italic;
font-size: 0.8rem;
`;

const Meanings = styled.div`
display: flex;
flex-direction: row;
font-size: 0.7rem;
font-style: italic;
justify-content: space-between;
width: 100%;
`;


const Characteristic = ({ characteristic, handleFactorChange }) => {
  const [selection, setSelection] = useState('None selected.');

  const handleSelectionChange = (e) => {
    //console.log(factors[characteristic]);
    setSelection(factors[characteristic][e.target.value]);
    handleFactorChange(characteristic, e.target.value);
  };

  return (
    <Div>
      <div>{characteristic}:  <Selection>{selection}</Selection> </div>
      <div onChange = {handleSelectionChange}>
        <input type = 'radio' value = '1' name = {characteristic}/> 1
        <input type = 'radio' value = '2' name = {characteristic}/> 2
        <input type = 'radio' value = '3' name = {characteristic}/> 3
        <input type = 'radio' value = '4' name = {characteristic}/> 4
        <input type = 'radio' value = '5' name = {characteristic}/> 5
      </div>
      <Meanings>
        <div>{factors[characteristic][1]}</div>
        <div>{factors[characteristic][5]}</div>
      </Meanings>
    </Div>

  );


};

export default Characteristic;