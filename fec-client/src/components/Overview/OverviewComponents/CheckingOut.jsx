import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
  margin 10px
`;

const NoButton = styled.button`
  visibility: hidden;
  padding: 10px;
  width: 100%;
  margin 10px
`;

const Dropdown = styled.select`
  padding: 10px;
  width: 100%;
  margin 10px;
  text-align: center;

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
      <div>
        <Dropdown value={selectedSize} onChange={handleChange}>
          <option>Select Size</option>
          {skusArr.map((key) => {
            if (key) {
              return (<option key={key} value={key}>{skus[key].size}</option>);
            }
          })}
        </Dropdown>

        <Dropdown value={selectedCount} onChange={handleSelectCount}>
          {selectedSize !== ''
            ? <option>1</option>
            : <option>-</option>}
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