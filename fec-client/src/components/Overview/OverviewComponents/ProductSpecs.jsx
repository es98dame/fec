import React from 'react';
import styled from 'styled-components';


const ProductSpecs = (props) => {

  return (
    <div>
      <span>Star rating here</span>
      <h4>{props.currentProduct.category}</h4>
      <h3>{props.currentProduct.name}</h3>
      <p>{props.currentProduct.description}</p>
      <h4>{props.currentStyle.original_price}</h4>
    </div>
  );
};

export default ProductSpecs;