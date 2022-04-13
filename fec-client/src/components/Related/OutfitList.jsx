import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import RelatedList from './RelatedList.jsx';

import axios from 'axios';

const Container = styled.div`
  position: relative;
  display : flex;
`;

const ProductCard = styled.div`
  border: solid;
  border-color: lightgray;
  display : flex;
  height: 72%;
  position: relative;
  top: 10%;
  text-align: center;
  align-items: center;

  &:hover {
    border-color: black;
    transform: scale(1.01);
  }

`;

const FirstCard = styled.div`
  display : flex;
  position : relative;
`;



const OutfitList = ()=> {
  const [outfitList, setOutfitList] = useState([]);

  const addItemtoOutfit = () => {
    if (outfitList.length === 0) {
      const arr = [];
      arr.push(window.localStorage.getItem('ProductId'));
      window.localStorage.setItem('OutfitList', JSON.stringify(arr));
      setOutfitList(arr);
    } else {
      const arr = [...outfitList];
      if (arr.indexOf(window.localStorage.getItem('ProductId')) === -1) {
        arr.push(window.localStorage.getItem('ProductId'));
        window.localStorage.setItem('OutfitList', JSON.stringify(arr));
        setOutfitList(arr);
      } else {
        alert('This item is already in the Outfit list');
      }

    }

  };

  const deleteItemOutfit = (id) => {
    const arr = [...outfitList];
    arr.splice(arr.indexOf(id), 1);
    setOutfitList(arr);
    window.localStorage.setItem('OutfitList', JSON.stringify(arr));

  };

  useEffect(() => {
    if (window.localStorage.getItem('OutfitList') !== null) {
      setOutfitList(JSON.parse(window.localStorage.getItem('OutfitList')));
    }
  }, []);

  return (
    <Container>
      <ProductCard title = 'firstcard' onClick={addItemtoOutfit}>

        <span>Add current item +</span>

      </ProductCard>

      {outfitList.length !== 0 ? (
        <RelatedList relatedArray ={outfitList} mode={'outfit'} deletehandle={deleteItemOutfit}/>
      ) : '' }
    </Container>

  );


};

export default OutfitList;