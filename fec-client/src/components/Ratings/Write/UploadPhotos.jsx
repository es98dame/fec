import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import {CLOUDINARY} from '../../../../../server/config/config.js';

const cloudName = 'daxw4bdp6';
const upload_preset = process.env.CLOUDINARY;

const Thumbnails = styled.div`
display: flex;
direction: row;
gap: 1rem;
`;

const Img = styled.img`
height: 10rem;
`;

const FileInput = styled.input`
visibility: hidden;
`;

const Div = styled.div`
height: 10rem;
width: 8rem;
background-color: ${props => props.theme.lightgrayToDark};
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
font-size: 5rem;
font-weight: 200;
`;

const ImagePreview = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Button = styled.button`
  padding: 5px;
  margin 10px;
  background-color: ${props => props.theme.darkgrayToLight};
  border: 1px solid ${props => props.theme.background};
  border-radius: 7px;
  color: #fff;
  width: 4rem;
  font-size: 0.8rem;

  &: hover{
    background-color: #4b464d;
    cursor: pointer;
    color: #fff;
  }

  &:active{
    background-color: #fff;
    color: #242125;
  }
`;

const UploadPhotos = ({ images, setImages }) => {
  //const [images, setImages] = useState([]);

  const handleImageParse = (e) => {
    //console.log(e.target.result);
    const file = e.target.result;
    //setImages(images.concat([e.target.result]));
    setImages(images.concat([file]));
  };

  const handleImageRemove = (url) => {
    const index = images.indexOf(url);
    const slicedImages = images.slice(0, index).concat(images.slice(index + 1));
    setImages(slicedImages);
  };

  const handleUpload = (e) => {
    const uploadData = new FileReader();
    uploadData.readAsDataURL(e.target.files[0]);
    uploadData.onload = handleImageParse;
  };

  return (
    <form>
      <Thumbnails>
        {images.map(url => (
          <ImagePreview key = {url}>
            <Img src = {url} alt = 'Image accompanying your review'></Img>
            <Button onClick = {() => { handleImageRemove(url); }}>Remove</Button>
          </ImagePreview>
        ))}
        { images.length < 5 ?
          <Div>
            <label htmlFor = 'write-review-file'>+</label>
            <FileInput type = 'file' id = 'write-review-file' accept=".png,.jpeg,jpg,.gif" onChange = {handleUpload}/>
          </Div> :
          null
        }

      </Thumbnails>
    </form>
  );



};

export default UploadPhotos;
