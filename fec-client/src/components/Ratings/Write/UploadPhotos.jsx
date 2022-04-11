import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const cloudName = 'daxw4bdp6';
const upload_preset = 'grzngc1a';

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
background-color: lightgray;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
font-size: 5rem;
font-weight: 200;
`;

const UploadPhotos = ({ images, setImages }) => {
  //const [images, setImages] = useState([]);

  const handleImageParse = (e) => {
    //console.log(e.target.result);
    const file = e.target.result;
    //setImages(images.concat([e.target.result]));
    setImages(images.concat([file]));
    // axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { upload_preset, file})
    //   .then((response)=>{
    //     console.log(response.data.url);
    //     setImages(images.concat([response.data.url]));
    //   })
    //   .catch((err)=>{console.log(err)});
  };

  const handleUpload = (e) => {
    const uploadData = new FileReader();
    uploadData.readAsDataURL(e.target.files[0]);
    uploadData.onload = handleImageParse;
  };

  return (
    <form>
      <Thumbnails>
        {images.map(url => <Img src = {url}></Img>)}
        <Div>
          <label htmlFor = 'write-review-file'>+</label>
          <FileInput type = 'file' id = 'write-review-file' onChange = {handleUpload}/>
        </Div>
      </Thumbnails>
    </form>
  );



};

export default UploadPhotos;