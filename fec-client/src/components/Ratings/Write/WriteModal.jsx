import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Characteristic from './Characteristics.jsx';
import DynamicStars from './DynamicStars.jsx';
import UploadPhotos from './UploadPhotos.jsx';

const cloudName = 'daxw4bdp6';
const upload_preset = 'grzngc1a';

const Modal = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
`;

const ModalContent = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
height: 40rem;
width: 35rem;

&input, textarea {
  font-family: inherit;
}
`;

const Header = styled.div`
background-color: lightgray;
text-align: center;
height: 16%;
margin: 2%;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
height: 76%;
overflow-y: auto;
margin: 2%;
`;

const Field = styled.div`
padding: 2%;
`;

const Label = styled.div`
font-weight: 400;
`;


const Tip = styled.div`
font-style: italic;
font-size: 0.7rem;
`;

const Submit = styled.input`
font-family: inherit;
width: 10rem;
margin: auto;
`;

const Warning = styled.div`
color: red;
`;


const WriteModal = ({relevantChars, productId, toggleWriteModal }) => {

  const relevantFactors = Object.keys(relevantChars);

  const [recommend, setRecommend] = useState(null);
  const [rating, setRating] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState(null);
  const [characteristics, setCharacteristics] = useState({});

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleFactorChange = (characteristic, value) => {
    const charCopy = {...characteristics};
    charCopy[relevantChars[characteristic].id] = value;
    setCharacteristics(charCopy);
  };

  const imageUpload = (file) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { upload_preset, file});
};

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (body.length < 50) {
    //   setWarning('Your review must be at least 50 characters.');
    // } else if (name.length === 0 ) {
    //   setWarning('Nickname is required.');
    // }
    Promise.all(images.map(url => imageUpload(url)))
      .then((responses) => {
          const photos = responses.map(response => response.data.url);
          axios.post('/api/reviews', {
          productId,
          rating,
          summary,
          body,
          recommend,
          name,
          email,
          photos,
          characteristics

         })
      })
  };

  return (
    <Modal>
      <ModalContent>
        <button onClick = {toggleWriteModal}>Close</button>
        <Header>
          <h2>Write Your Review</h2>
          <h3>About the product {productId}</h3>
        </Header>
        <Form onSubmit = {handleSubmit}>
          <Field>
            <Label> Overall Rating </Label>
            <DynamicStars setRating = {setRating}/>
          </Field>
          <Field onChange = {(e) => setRecommend(!!e.target.value)}>
            <Label>Would you recommend this product to a friend? </Label>
            <input type='radio' value = 'true' name = 'recommend'/> Yes
            <input type='radio' value = '' name = 'recommend'/> No
          </Field>
          <Field>
            <Label>Please rate the item on the following factors: </Label>
            {relevantFactors.map(factor => (
              <Characteristic key = {relevantChars[factor].id} characteristic = {factor} handleFactorChange = {handleFactorChange}/>
            ))}
          </Field>
          <Field>
            <Label>Review Summary</Label>
            <textarea rows='2' cols='50' placeholder = 'Write a brief summary' maxLength = '60' value = {summary} onChange = {(e) => handleChange(e, setSummary)}>{summary}</textarea>
          </Field>
          <Field>
            <Label>Your Review</Label>
            <textarea rows = '10' cols = '50' placeholder = 'Write your review here' maxLength = '1000' value = {body} onChange = {(e) => handleChange(e, setBody)}>{body}</textarea>
            <Tip>{body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}</Tip>
          </Field>
          <Field>
            <Label> Upload Photos </Label>
            <UploadPhotos images = {images} setImages = {setImages}/>
          </Field>
          <Field>
            <Label>Your Username</Label>
            <input type = 'text' placeholder = 'Add a name, e.g. "kara122"' maxLength = '60' size = '50' value = {name} onChange = {(e) => handleChange(e, setName)}/>
            <Tip>For privacy reasons, do not use your full name or email address</Tip>
          </Field>
          <Field>
            <Label>Email</Label>
            <input type = 'text' placeholder = 'Your email' maxLength = '60' size = '50' value = {email} onChange = {(e) => handleChange(e, setEmail)}/>
          </Field>
          <Submit type = 'submit' value = 'Submit Review' onClick = {handleSubmit}/>
          <Warning>{warning}</Warning>
        </Form>
      </ModalContent>
    </Modal>
  );

};



export default WriteModal;