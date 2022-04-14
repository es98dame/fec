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
z-index: 20;
`;

const ModalContent = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: ${props => props.theme.background};
height: 40rem;
width: 35rem;
&input, textarea, button {
  font-family: inherit;
}
`;

const Header = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
height: 16%;
margin: 2%;
padding: 2%;
border-bottom: 1px solid lightgray;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start:
`;

const TitleName = styled.h3`
`;

const SubTitle = styled.div`
`;

const Form = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
height: 70%;
overflow-y: auto;
margin: 2%;
padding: 2%;
`;

const Field = styled.div`
margin-top: 4%;
`;

const Label = styled.div`
`;


const Tip = styled.div`
font-style: italic;
font-size: 0.7rem;
`;

const Warning = styled.div`
color: red;
font-size: small;
`;

const Button = styled.button`
  padding: 5px;
  margin 10px;
  background-color: ${props => props.theme.darkgrayToLight};
  border: 1px solid ${props => props.theme.background};
  border-radius: 7px;
  color: #fff;
  width: 150px;

  &: hover{
    background-color: #4b464d;
    cursor: pointer;
    color: #fff;
  }

  &:active{
    background-color: #fff;
    color: #242125;
  }

  &.exit {
    height: 30px;
    width: 30px;
    align-self: flex-start;
  }
`;

const Input = styled.input`
color: ${props => props.theme.color};
background: ${props => props.theme.background};
`;

const TextArea = styled.textarea`
color: ${props => props.theme.color};
background: ${props => props.theme.background};
`;


const WriteModal = ({relevantChars, productId, toggleWriteModal, productName }) => {

  const relevantFactors = Object.keys(relevantChars);
  const emailRegEx = /^([\w\.-]+)@([a-zA-z]{3,9})\.([a-zA-Z]{2,5})$/;
  const product_id = productId;

  const [recommend, setRecommend] = useState(null);
  const [rating, setRating] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [warningList, setWarningList] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleFactorChange = (characteristic, value) => {
    const charCopy = {...characteristics};
    charCopy[relevantChars[characteristic].id] = parseInt(value);
    setCharacteristics(charCopy);
  };

  const imageUpload = (file) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { upload_preset, file});
  };

  const handleSubmit = (e) => {
    const warnings = [];
    if (rating === null) {
      warnings.push('Rating field is mandatory');
    }
    if (recommend === null) {
      warnings.push('Recommend field is mandatory');
    }
    if (Object.keys(characteristics).length !== relevantFactors.length) {
      warnings.push('All characteristic ratings are mandatory');
    }
    if (body.length < 50) {
      warnings.push('Your review must be at least 50 characters in length');
    }
    if (!name.length) {
      warnings.push('You must enter a nickname');
    }
    if (!emailRegEx.test(email)) {
      warnings.push('Please enter a valid email address');
    }

    if(warnings.length) {
      setWarningList(warnings);

    } else {
      Promise.all(images.map(url => imageUpload(url)))
        .then((responses) => {
            const photos = responses.map(response => response.data.url);
            return axios.post('/api', {
            product_id,
            rating,
            summary,
            body,
            recommend,
            name,
            email,
            photos,
            characteristics
           }, {headers: {path: '/reviews/'}});
        })
        .then((response) => {
          console.log(response.data);
          setSuccess(true);
        })
    }

  };

  return (
    <Modal>
      <ModalContent title = 'write-form-container' >
        <Header>
          <Title>
            <TitleName>Write a Review</TitleName>
            <SubTitle>About the {productName}</SubTitle>
          </Title>
          <Button onClick={toggleWriteModal} className = 'exit'>X</Button>
        </Header>
        { success ?
        <h3> Thank you, your review has been submitted </h3> :
        <Form onSubmit = {handleSubmit}>
          <Tip>* indicates a required field.</Tip>
          <Field>
            <Label> Overall Rating * </Label>
            <DynamicStars setRating = {setRating}/>
          </Field>
          <Field onChange = {(e) => setRecommend(!!e.target.value)}>
            <Label>Would you recommend this product to a friend? * </Label>
            <input type='radio' value = 'true' name = 'recommend'/> Yes
            <input type='radio' value = '' name = 'recommend'/> No
          </Field>
          <Field>
            <Label>Characteristics * </Label>
            {relevantFactors.map(factor => (
              <Characteristic key = {relevantChars[factor].id} characteristic = {factor} handleFactorChange = {handleFactorChange}/>
            ))}
          </Field>
          <Field>
            <Label>Review Summary</Label>
            <textarea title = 'summary-input' rows='2' cols='50' placeholder = 'Example: Best purchase ever!' maxLength = '60' value = {summary} onChange = {(e) => handleChange(e, setSummary)}>{summary}</textarea>
          </Field>
          <Field>
            <Label>Your Review *</Label>
            <textarea rows = '10' cols = '50' placeholder = 'Why did you like the product or not?' maxLength = '1000' value = {body} onChange = {(e) => handleChange(e, setBody)}>{body}</textarea>
            <Tip>{body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}</Tip>
          </Field>
          <Field>
            <Label> Upload Photos </Label>
            <UploadPhotos images = {images} setImages = {setImages}/>
          </Field>
          <Field>
            <Label>Your Nickname *</Label>
            <input title = 'name-input' type = 'text' placeholder = 'Add a name, e.g. "kara122"' maxLength = '60' size = '50' value = {name} onChange = {(e) => handleChange(e, setName)}/>
            <Tip>For privacy reasons, do not use your full name or email address</Tip>
          </Field>
          <Field>
            <Label>Email *</Label>
            <input type = 'text' placeholder = 'Your email' maxLength = '60' size = '50' value = {email} onChange = {(e) => handleChange(e, setEmail)}/>
            <Tip>For authentication reasons, you will not be emailed</Tip>
          </Field>
          <Warning>
            { warningList ?
            <ul> You must enter the following:
              { warningList.map(warning => (
                <li>{warning}</li>
              ))}
            </ul> :
            null }
          </Warning>
          <Button onClick = {handleSubmit} >Submit Review</Button>
        </Form>
        }
      </ModalContent>
    </Modal>
  );

};



export default WriteModal;