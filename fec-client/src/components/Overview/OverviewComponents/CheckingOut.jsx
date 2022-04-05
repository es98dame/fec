import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
`;

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
        <Button>Add To Cart</Button>
      </div>
    </div>
  );
};

export default CheckingOut;