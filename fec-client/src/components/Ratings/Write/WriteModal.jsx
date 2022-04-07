import React, {useState} from 'react';
import styled from 'styled-components';
import Characteristic from './Characteristics.jsx';

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
`;

const Header = styled.div`
background-color: lightgray;
text-align: center;
height: 20%;
margin: 2%;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
height: 80%;
overflow-y: auto;
margin: 2%;
`;

const Label = styled.div`
`;

const Recommend = styled.div`
`;

const Characteristics = styled.div`
`;

const Summary = styled.div`
`;

const Body = styled.div`
`;

const Name = styled.div`
`;

const Tip = styled.div`
font-style: italic;
font-size: 0.7rem;
`;

const Email = styled.div`
`;

const Submit = styled.div`
`;

const Warning = styled.div`
color: red;
`;


const WriteModal = ({relevantChars, productId }) => {

  const relevantFactors = Object.keys(relevantChars);

  const [recommend, setRecommend] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState(null);
  const [charRatings, setCharRatings] = useState({});

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleFactorChange = (characteristic, value) => {
    const charCopy = {...charRatings};
    charCopy[relevantChars[characteristic].id] = value;
    setCharRatings(charCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length < 50) {
      setWarning('Your review must be at least 50 characters.');
    } else if (name.length === 0 ) {
      setWarning('Nickname is required.');
    }
  };

  return (
    <Modal>
      <ModalContent>
        <Header>
          <h2>Write Your Review</h2>
          <h3>About the product {productId}</h3>
        </Header>
        <Form onSubmit = {handleSubmit}>
          <Recommend onChange = {(e) => handleChange(e, setRecommend)}>
            <Label>Would you recommend this product to a friend? </Label>
            <input type='radio' value = 'true' name = 'recommend'/> Yes
            <input type='radio' value = 'false' name = 'recommend'/> No
          </Recommend>
          <Characteristics>
            <Label>Characteristics go here.</Label>
            {relevantFactors.map(factor => (
              <Characteristic key = {relevantChars[factor].id} characteristic = {factor} handleFactorChange = {handleFactorChange}/>
            ))}
          </Characteristics>
          <Summary>
            <Label>Review Summary</Label>
            <textarea rows='2' cols='50' placeholder = 'Write a brief summary' maxLength = '60' value = {summary} onChange = {(e) => handleChange(e, setSummary)}>{summary}</textarea>
          </Summary>
          <Body>
            <Label>Your Review</Label>
            <textarea rows = '10' cols = '50' placeholder = 'Write your review here' maxLength = '1000' value = {body} onChange = {(e) => handleChange(e, setBody)}>{body}</textarea>
            <Tip>{body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}</Tip>
          </Body>
          <Name>
            <Label>Your Username</Label>
            <input type = 'text' placeholder = 'Add a name, e.g. "kara122"' maxLength = '60' size = '50' value = {name} onChange = {(e) => handleChange(e, setName)}/>
            <Tip>For privacy reasons, do not use your full name or email address</Tip>
          </Name>
          <Email>
            <Label>Email</Label>
            <input type = 'text' placeholder = 'Your email' maxLength = '60' size = '50' value = {email} onChange = {(e) => handleChange(e, setEmail)}/>
          </Email>
          <input type = 'submit' value = 'Submit Review' onClick = {handleSubmit}/>
          <Warning>{warning}</Warning>
        </Form>
      </ModalContent>
    </Modal>
  );

};



export default WriteModal;