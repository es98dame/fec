import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
`;

const CheckingOut = (props) => {
  let skus = props.skus;
  let skusArr = [];

  if (props.skus) {
    for (let key in skus) {
      if (skus[key].quantity) {
        skusArr.push(skus[key]);
      }
    }
  }


  return (
    <div>
      <div>
        <select>
          <option>Size</option>
          {skusArr.map((item, key) =>
            <option key={key} >{item.size}</option>
          )}
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