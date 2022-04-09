import React, {useState} from 'react';
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
  color: #242124;
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

const Features = styled.ul`
  font-weight: 300;
  border-top: 1px solid lightgrey;
  margin: 5px;
  padding: 1rem;
`;

const ShareDiv = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: 300;
  text-align: center;
  border-top: 1px solid lightgrey;
  margin: 5px;
  padding: 5px;
`;

const Share = styled.p`
  font-weight: 300;
  padding: auto;
`;

const Facebook = styled.a`
  text-align: center;
  text-decoration: none;
  margin: 5px;
  padding: 5px;
  background: #3B5998;
  color: white;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;

  &:hover{
    opacity: 0.7;
  }
`;

const Twitter = styled.a`
  text-align: center;
  text-decoration: none;
  margin: 5px;
  padding: 5px;
  background: #55ACEE;
  color: white;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;

  &:hover{
    opacity: 0.7;
  }
`;

const Pinterest = styled.a`
  text-align: center;
  text-decoration: none;
  margin: 5px;
  padding: 5px;
  background: #cb2027;
  color: white;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;

  &:hover{
    opacity: 0.7;
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
        <Stars rating={props.avg} size={32}/>
        <Link onClick={handleScroll}>See all (number) ratings</Link>
      </Ratings>
      <Bolds>Category: {props.currentProduct.category}</Bolds>
      <h3>{props.currentProduct.name}</h3>
      {props.currentStyle.sale_price
        ? <h4><StrikeThrough>&#x24;{props.currentStyle.original_price}</StrikeThrough> &#x24;{props.currentStyle.sale_price} </h4>
        : <h4>&#x24;{props.currentStyle.original_price}</h4>}
      <Bolds>{props.currentProduct.slogan}</Bolds>
      <Description>{props.currentProduct.description}</Description>
      {props.currentProduct.features && props.currentProduct.features.length
        ? <Features>
          {props.currentProduct.features.map((feature) =>
            <li>{feature.value} {feature.feature}</li>
          )}
        </Features>
        : <div> nothing to feature</div>}
      <ShareDiv>
        <Facebook className="fa fa-facebook"></Facebook>
        <Twitter className="fa fa-twitter"></Twitter>
        <Pinterest className="fa fa-pinterest"></Pinterest>
      </ShareDiv>
    </Container>
  );
};

export default ProductSpecs;