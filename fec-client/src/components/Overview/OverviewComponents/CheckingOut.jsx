import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
`;

const NoButton = styled.button`
  visibility: hidden;
  padding: 10px;
  width: 100%;
`;

const Dropdown = styled.select`

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
    setSelectedSize(event.target.value);
  };

  const handleSelectCount = (event) =>{
    setSelectedCount(event.target.value);
  };


  return (
    <div>
      <div>
        <select value={selectedSize} onChange={handleChange}>
          <option>Size</option>
          {skusArr.map((key) => {
            if (key) {
              return (<option key={key} value={key}>{skus[key].size}</option>);
            }
          })}
        </select>
        <select value={selectedCount} onChange={handleSelectCount}>
          <option>-</option>
          {skusArr.map((key) => {
            if (key === selectedSize ) {
              let num = 1;
              let options = [];
              while (num < skus[key].quantity && num < 16) {
                options.push(<option value={num} key={num}>{num}</option>);
                num = num + 1;
              }
              return options;
            }
          })}
        </select>
      </div>
      <div>
        {selectedCount
          ? <Button>Add To Cart</Button>
          : <NoButton>Add To Cart</NoButton>}
      </div>
    </div>
  );
};

export default CheckingOut;