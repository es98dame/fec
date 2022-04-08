import React, {useState} from 'react';
import styled from 'styled-components';

const PhotoContainer = styled.div`
`;

const UploadPhotos = () => {
  const [images, setImages] = useState([]);

  const handleImageParse = (e) => {
    console.log('the upload results are ', e.target.result);
  };

  const handleUpload = () => {
    const uploadData = new FileReader();
    uploadData.onloadend = handleImageParse;
  };

  return (
    <div>
      <button onClick = {handleUpload}>Upload a Photo</button>
      {images.map(url => <img src = {url}></img>)}
    </div>
  );



};

export default UploadPhotos;