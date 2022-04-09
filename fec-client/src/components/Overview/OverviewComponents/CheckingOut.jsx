import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
  margin 10px;
  background-color: #242125;
  border: 1px solid #403244;
  box-shadow: 2px 2px #403244;
  border-radius: 7px;
  color: #fff;
  text-shadow: 1px 1px #000000;
  font-size: 2.0rem;

  &: hover{
    background-color: #1a7431;
  }

  &:active{
    background-color: #10451d;
    box-shadow: 0 0 #87986a;
    transform: translateY(2px);
    transform: translatex(2px);
  }
`;

const NoButton = styled.button`
  visibility: hidden;
  padding: 10px;
  width: 100%;
  margin 10px
`;

const Divs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Dropdown = styled.select`
  padding: 10px;
  width: 45%;
  margin 10px;
  text-align: center;
  border: 2px solid #030303;
  color: #030303;
  border-radius: 7px;
`;

const CheckingOut = (props) => {
  let skusArr = [];

  const [skus, setSkus] = useState(props.skus);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCount, setSelectedCount] = useState(undefined);

  useEffect(() => {
    setSkus(props.skus);
  }, [props.skus]);

  if (skus) {
    skusArr = Object.keys(skus);
  }

  const handleChange = (event) =>{
    if (event.target.value === 'Select Size') {
      setSelectedSize(event.target.value);
      setSelectedCount(undefined);
      return;
    }
    setSelectedSize(event.target.value);
    setSelectedCount(1);
  };

  const handleSelectCount = (event) =>{
    setSelectedCount(event.target.value);
  };


  return (
    <div>
      <Divs>
        <Dropdown value={selectedSize} onChange={handleChange}>
          <option>Select Size</option>
          {skusArr.map((key) => {
            if (key) {
              return (<option key={key} value={key}>{skus[key].size}</option>);
            }
          })}
        </Dropdown>

        <Dropdown value={selectedCount} onChange={handleSelectCount}>
          {selectedSize === '' || 'Select Size'
            ? <option>-</option>
            : <option>1</option>}
          {skusArr.map((key) => {
            if (key === selectedSize ) {
              let num = 2;
              let options = [];
              while (num < skus[key].quantity && num < 16) {
                options.push(<option value={num} key={num}>{num}</option>);
                num = num + 1;
              }
              return options;
            }
          })}
        </Dropdown>
      </Divs>
      <Divs>
        {selectedCount
          ? <Button>Add To Cart <i className="fa fa-cart-arrow-down"></i> </Button>
          : <NoButton>Add To Cart</NoButton>}
      </Divs>
    </div>
  );
};

export default CheckingOut;