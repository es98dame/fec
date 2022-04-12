import React, {useState} from 'react';
import styled from 'styled-components';
import factors from './factors.js';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2%;
  margin: 10px;
`;

const Selection = styled.span`
  font-style: italic;
  font-size: 0.8rem;
`;

const Stuff = styled.div`
background-color: lightgray;
padding: 5px;
border-radius: 5px;
`;

const ButtonArray = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
      <Stuff>
        <ButtonArray onChange = {handleSelectionChange}>
          <input type = 'radio' value = '1' name = {characteristic}/>
          <input type = 'radio' value = '2' name = {characteristic}/>
          <input type = 'radio' value = '3' name = {characteristic}/>
          <input type = 'radio' value = '4' name = {characteristic}/>
          <input type = 'radio' value = '5' name = {characteristic}/>
        </ButtonArray>
        <Meanings>
          <div>{factors[characteristic][1]}</div>
          <div>{factors[characteristic][5]}</div>
        </Meanings>
      </Stuff>
    </Div>

  );


};

export default Characteristic;