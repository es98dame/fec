import React from 'react';
import styled from 'styled-components';
import ImagesItem from './ImagesItem.jsx';

const Image = styled.img`
  width: 70%
`;

const ImagesDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  width 90%;
`;

const CarrosselDiv = styled.div`
display: flex;
margin: 5px;
padding: 5px;
justify-content: space-between;
background-color: lightgrey
`;

const Div = styled.div`
display: flex;
margin: 5px;
padding: 5px;
flex-direction: column;
`;



const Images = (props) => {
  let img = '';
  let imgs = [{url: 'none'}];
  let num = 0;

  if (props.currentStyle.photos) { img = props.currentStyle.photos[0].url; }
  if (props.currentStyle.photos) { imgs = props.currentStyle.photos; }
  return (
    <Div>
      <CarrosselDiv>
        <button> &#x2190; </button>
        <Image src={img}/>
        <button> &#x2192; </button>
      </CarrosselDiv>
      <ImagesDiv>
        {imgs.map((item) => {
          ++num;
          return (<ImagesItem image={item.thumbnail_url} key={num}/>);
        }
        )}
      </ImagesDiv>
    </Div>
  );
};

export default Images;