import React from 'react';
import styled from 'styled-components';
import ImagesItem from './ImagesItem.jsx';

const Image = styled.img`
  width: 80%
`;

const ImagesDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  width 100%;
`;

const Images = (props) => {
  console.log(props.currentStyle);
  let img = '';
  let imgs = [{url: 'none'}];
  if (props.currentStyle.photos) { img = props.currentStyle.photos[0].url; }
  if (props.currentStyle.photos) { imgs = props.currentStyle.photos; }
  return (
    <div>
      <div>
        <span> previous </span>
        <Image src={img}/>
        <span> next </span>
      </div>
      <ImagesDiv>
        {imgs.map((item) =>
          <ImagesItem image={item.thumbnail_url}/>
        )}
      </ImagesDiv>
    </div>
  );
};

export default Images;