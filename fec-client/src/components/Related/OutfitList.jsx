import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import axios from 'axios';

const Outfit = styled.div`
display: flex;
flex-direction: row;
width : 100%;
overflow-x: auto;
`;

const ProductCard = styled.div`
display: flex;
flex-direction: column;
min-width: 10rem;
border: solid;
border-color: lightgray;
`;

const FirstCard = styled.div`
align-items: center;
height : 240px;
line-height: 240px;
text-align: center;
`;

const ActionButton = styled.img`
  position : relative;
  left:80%;
  z-index:10;

`;

const OutfitList = (props)=> {
  const [outfitList, setOutfitList] = useState([]);

  const addItemtoOutfit = () => {
    if(outfitList.length === 0){
      const arr = [];
      arr.push(window.localStorage.getItem("ProductId"));
      window.localStorage.setItem("OutfitList", JSON.stringify(arr));
      setOutfitList(arr);
    }else{
      //outfistlist = JSON.parse(window.localStorage.getItem("OutfitList"));
    }

  }

  const deleteItemOutfit = (id) => {
    const arr = outfitList;
    arr.splice(arr.indexOf(id), 1);
    setOutfitList(arr);
    window.localStorage.setItem("OutfitList", JSON.stringify(arr));

  }

  useEffect(() => {
    if(window.localStorage.getItem("OutfitList") !== null){
      setOutfitList(JSON.parse(window.localStorage.getItem("OutfitList")));
    }
  }, [])

  return(
    <Outfit>
    <ProductCard>
      <FirstCard onClick={addItemtoOutfit}>
        Add current item +
      </FirstCard>
    </ProductCard>

    {outfitList.length !== 0 ? (
      outfitList.map((i, index)=>(
      <ProductCard key = {index}>
        <div><ActionButton src = "https://img.icons8.com/ios-glyphs/30/000000/cancel.png" onClick={() => {deleteItemOutfit(i)}} ></ActionButton>
     </div>
      <FirstCard>{i}</FirstCard>
      </ProductCard>
    ))) : '' }
    </Outfit>

  );


};

export default OutfitList;