import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, .8);
`;

const Modal = styled.div`
  z-index: 100;
  background: #e5e8ed;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 2px solid black;
  background-color: inherit;
`;

const TitleName = styled.span`
  font-size: 1.17em;
  font-weight: bold;
  align-self: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h6`
  font-size: 12px;
  margin: 0;
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

const QuestionBody = styled.textarea`
  height: 70px;
  flex: auto;
`;

const SubmitButton = styled.button`
  width: 9em;
  align-self: flex-end;
  background-color: #242125;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    color: lightgrey;
  };
`;

const ErrorLabel = styled.label`
  color: darkred;
`;

const InvalidList = styled.ul`
  color: darkred;
  margin: 0;
`;

const emailRegEx = /^([\w\.-]+)@([a-zA-z]{3,9})\.([a-zA-Z]{2,5})$/;

const AddQModal = ({ show, hide, productName, handleQSubmission, productId }) => {
  const [invalidEntries, setInvalidEntries] = useState([]);
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleTextChange = (e) => {
    if (e.target.name === 'question' && question.length < 1000) {
      setQuestion(e.target.value);
    } else if (e.target.name === 'nickname' && nickname.length < 60) {
      setNickname(e.target.value);
    } else if (e.target.name === 'email' && email.length < 60) {
      setEmail(e.target.value);
    }
  };

  const handleExit = (hide) => {
    setEmail('');
    setNickname('');
    setQuestion('');
    setInvalidEntries([]);
    hide();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalidEntries([]);
    let valid = true;
    let entries = [];

    if (!question.length || question.length > 1000) {
      entries.push('A question');
      valid = false;
    }
    if (!nickname.length || nickname.length > 60) {
      entries.push('Your nickname');
      valid = false;
    }
    if (!emailRegEx.test(email)) {
      entries.push('A valid email');
      valid = false;
    }

    setInvalidEntries(entries);

    if (valid) {
      let body = {
        body: question,
        name: nickname,
        email: email,
        product_id: productId
      };
      handleQSubmission(body);
      setEmail('');
      setNickname('');
      setQuestion('');
      hide();
    }
  };

  return show ? ReactDom.createPortal(
    (<>
      <ModalWrapper>
        <Modal>
          <Header>
            <Title>
              <TitleName>Ask Your Question</TitleName>
              <SubTitle>About the {productName}</SubTitle>
            </Title>
            <ExitButton onClick={() => handleExit(hide)}>
              <span>&times;</span>
            </ExitButton>
          </Header>
          <Form type="submit" onSubmit={handleSubmit}>
            <Field>
              <label>What is your nickname*</label>
              <NicknameInput type="text" name="nickname" placeholder={'“Example: jackson11!”'} value={nickname} onChange={(e) => handleTextChange(e)}></NicknameInput>
              <Advisory>For privacy reasons, do not use your full name or email address</Advisory>
            </Field>
            <Field>
              <label>Your email*</label>
              <input type="text" name="email" placeholder={'Why did you like the product or not?'} value={email} onChange={(e) => handleTextChange(e)}></input>
              <Advisory>For authentication reasons, you will not be emailed</Advisory>
            </Field>
            <Field>
              <label>Your question*</label>
              <QuestionBody type="text" name="question" value={question} onChange={(e) => handleTextChange(e)}></QuestionBody>
            </Field>{
              invalidEntries.length > 0 ? (
                <Field>
                  <ErrorLabel>You must enter the following:</ErrorLabel>
                  <InvalidList>{invalidEntries.map((entry, key) => <li key={key}>{entry}</li>)}</InvalidList>
                </Field>) : null
            }<SubmitButton>Submit Question</SubmitButton>
          </Form>
        </Modal>
      </ModalWrapper>
    </>), document.getElementById('app')
  ) : null;
};

export default AddQModal;