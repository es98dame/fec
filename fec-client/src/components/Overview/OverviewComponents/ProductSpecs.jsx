import React from 'react';
import styled from 'styled-components';
import Stars from '../../Shared/Stars.jsx';

const StrikeThrough = styled.span`
  text-decoration: line-through;
  color: red;
`;

const Bolds = styled.h4`
  font-weight: 400;
`;

const Description = styled.p`
  font-weight: 300;
`;

const Container = styled.div`
  border-bottom: 1px solid lightgrey;
`;

const Ratings = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  gap: 1rem;
  font-weight: 300;
`;

const Link = styled.span`
  display: flex;
  gap: 1rem;
  font-weight: 300;
  text-decoration: underline;

  &:hover{
    color: #cccccc;
  }
`;

const ProductSpecs = (props) => {

  const handleScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });

  };

  return (
    <Container>
      <Ratings>
        <Stars rating={5}/>
        <Link onClick={handleScroll}>See all (number) ratings</Link>
      </Ratings>
      <Bolds>Category: {props.currentProduct.category}</Bolds>
      <h3>{props.currentProduct.name}</h3>
      {props.currentStyle.sale_price
        ? <h4><StrikeThrough>&#x24;{props.currentStyle.original_price}</StrikeThrough> &#x24;{props.currentStyle.sale_price} </h4>
        : <h4>&#x24;{props.currentStyle.original_price}</h4>}
      <Bolds>{props.currentProduct.slogan}</Bolds>
      <Description>{props.currentProduct.description}</Description>
    </Container>
  );
};

export default ProductSpecs;