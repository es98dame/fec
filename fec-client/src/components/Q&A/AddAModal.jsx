import React, { useRef, useState } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(0, 0, 0, 0.8);
`;

const ModalContainer = styled.div`
  z-index: 100;
  background: cornsilk;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
  align-self: flex-start;
  width: 500px;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 2px;
  background-color: inherit;
`;

const TitleName = styled.span`
  font-size: 1.6em;
  font-weight: bold;
  align-self: flex-start;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .2em;
`;

const SubTitle = styled.span`
  font-size: 17px;
  margin: 0;
  font-weight: bold;
  white-space: nowrap;
`;

const QuestionBody = styled.span`
  margin: 0;
  font-size: 17px;
  font-style: oblique;
  overflow-wrap: break-word;
`;

const ExitButton = styled.button`
  align-self: flex-start;
  font-size: .9rem;
  font-weight: 700;
  border: none;
  border-radius: 3px;
  padding: .3rem 1rem;
  margin-left: .5rem;
  cursor: pointer;
  &:hover {
    color: lightgrey;
  }
  background-color: darkgrey;
`;

const Form = styled.form`
  display: flex;
  gap: .5em;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  gap: .3em;
  flex-direction: column;
  margin-top: 7px;
`;

const NicknameInput = styled.input`
  width: 190px;
`;

const Advisory = styled.span`
  font-size: smaller;
  font-style: oblique;
`;

const AnswerBody = styled.textarea`
  height: 70px;
  flex: auto;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: .2em;
`;

const UploadedImage = styled.img`
  width: auto;
  height: 10rem;
`;

const SubmitButton = styled.button`
  width: 9em;
  align-self: flex-end;
`;

const ErrorLabel = styled.label`
  color: darkred;
`;

const InvalidList = styled.ul`
  color: darkred;
  margin: 0;
`;

const FileHidden = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;

const UploadButton = styled.label`
  border: solid 1px;
  width: 18%;
  border-radius: 4px;
  background-color: azure;
  padding: 2px 6px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: lightgrey;
  };
`;

const emailRegEx = /^([\w\.-]+)@([a-zA-z]{3,9})\.([a-zA-Z]{2,5})$/;

const AddAModal = ({ hide }) => {
  const container = document.getElementById('app');
  const files = useRef('');

  const [invalidEntries, setInvalidEntries] = useState([]);
  const [images, setImages] = useState([]);
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');

  const handleTextChange = (e) => {
    if (e.target.name === 'answer' && answer.length < 1000) {
      setAnswer(e.target.value);
    } else if (e.target.name === 'nickname' && nickname.length < 60) {
      setNickname(e.target.value);
    } else if (e.target.name === 'email' && email.length < 60) {
      setEmail(e.target.value);
    }
  };

  const handleExit = (hide) => {
    setEmail('');
    setNickname('');
    setAnswer('');
    setInvalidEntries([]);
    hide();
  };

  const handleFile = (e) => {
    setImages(images.concat([e.target.result]));
  };

  const handleUpload = (e) => {
    e.persist();
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalidEntries([]);
    let valid = true;
    let entries = [];

    if (!answer.length) {
      entries.push('An answer');
      valid = false;
    }
    if (nickname.length > 2) {
      entries.push('Your nickname');
      valid = false;
    }
    if (!emailRegEx.test(email)) {
      entries.push('A valid email');
      valid = false;
    }

    setInvalidEntries(entries);

    if (valid) {
      let inputs = [nickname, email, answer, fileData];
      // handleQSubmission(inputs);
      setEmail('');
      setNickname('');
      setAnswer('');
      hide();
    }
  };


  return reactDom.createPortal((
    <ModalWrapper onClick={() => handleExit(hide)}>
      <ModalContainer onClick={(e) => e.stopPropagation()} >
        <Heading>
          <Title>
            <TitleName>Submit your Answer</TitleName>
            <SubTitle>Product Name:</SubTitle>
            <QuestionBody>What does the fox say? wop wop wop wop wopw oppop wopwopwo wopwowpwwop</QuestionBody>
          </Title>
          <ExitButton onClick={() => handleExit(hide)}>&times;</ExitButton>
        </Heading>
        <Form type="submit" onSubmit={handleSubmit}>
          <Field>
            <label>What is your nickname*</label>
            <NicknameInput type="text" name="nickname" placeholder={'Example: jack543!'} value={nickname} onChange={(e) => handleTextChange(e)}></NicknameInput>
            <Advisory>For privacy reasons, do not use your full name or email address</Advisory>
          </Field>
          <Field>
            <label>Your email*</label>
            <input type="text" name="email" placeholder={'Example: jack@email.com'} value={email} onChange={(e) => handleTextChange(e)}></input>
            <Advisory>For authentication reasons, you will not be emailed</Advisory>
          </Field>
          <Field>
            <label>Your answer*</label>
            <AnswerBody type="text" name="answer" value={answer} onChange={(e) => handleTextChange(e)}></AnswerBody>
          </Field>{
            images.length < 5 ? <UploadButton htmlFor="files">Upload Image</UploadButton> : null
          }<FileHidden id="files" type="file" name="file" accept=".png,.jpeg,jpg,.gif" onChange={handleUpload}/>
          <ImageRow>
            { images.length ? images.map((image) => <UploadedImage src={image} />) : null }
          </ImageRow>
          { invalidEntries.length > 0 ? (
            <Field>
              <ErrorLabel>You must enter the following:</ErrorLabel>
              <InvalidList>{invalidEntries.map((entry, key) => <li key={key}>{entry}</li>)}</InvalidList>
            </Field>) : null
          }<SubmitButton>Submit Question</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalWrapper>
  ), container);
};


export default AddAModal;