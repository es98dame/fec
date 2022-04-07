import React, {useState} from 'react';
import factors from './factors.js';


const Characteristic = ({ characteristic, handleFactorChange }) => {
  const [selection, setSelection] = useState('none selected');

  const handleSelectionChange = (e) => {
    //console.log(factors[characteristic]);
    setSelection(factors[characteristic][e.target.value]);
    handleFactorChange(characteristic, e.target.value);
  };

  return (
    <div>
      <div>{characteristic}</div>
      <div onChange = {handleSelectionChange}>
        <input type = 'radio' value = '1' name = {characteristic}/> 1
        <input type = 'radio' value = '2' name = {characteristic}/> 2
        <input type = 'radio' value = '3' name = {characteristic}/> 3
        <input type = 'radio' value = '4' name = {characteristic}/> 4
        <input type = 'radio' value = '5' name = {characteristic}/> 5
      </div>
    </div>

  );


};

export default Characteristic;