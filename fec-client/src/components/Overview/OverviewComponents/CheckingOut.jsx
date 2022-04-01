import React from 'react';
import styled from 'styled-components';


const CheckingOut = () => {
  return (
    <div>
      <div>
        <select>
          <option>Size</option>
        </select>
        <select>
          <option>Qantity</option>
        </select>
      </div>
      <div>
        <button>checkout</button>
      </div>
    </div>
  );
};

export default CheckingOut;