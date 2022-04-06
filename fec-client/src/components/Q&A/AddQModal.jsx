import React, { useState } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  z-index: 1040;
  justify-content: center;
  margin: auto;
  height: 100vw;
  width: 100vh;
  background-color: #000;
  opacity: .5;
`;

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
  background: white;
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
  background-color: lightgreen;
  border-radius: 3px;
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
  gap: .5em;
  flex-direction: row;
`;

const QuestionBody = styled.textarea`
  height: 70px;
  flex: auto;
`;

const AddQModal = ({ show, hide, product = 'Some Product'}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();


    let options = {
      //
    };


    setEmail('');
    setNickname('');
    setQuestion('');
    hide();
  };

  return show ? ReactDom.createPortal(
    (<>
      <Overlay/>
      <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
        <Modal>
          <Header>
            <Title>
              <TitleName>Ask Your Question</TitleName>
              <h6>{product}</h6>
            </Title>
            <ExitButton onClick={hide}>
              <span>&times;</span>
            </ExitButton>
          </Header>
          <Form type="submit" onSubmit={handleSubmit}>
            <Field>
              <label>Your Question</label>
              <QuestionBody type="text" name="question" value={question} onChange={(e) => handleTextChange(e)}></QuestionBody>
            </Field>
            <Field>
              <label>Nickname</label>
              <input type="text" name="nickname" value={nickname} onChange={(e) => handleTextChange(e)}></input>
            </Field>
            <Field>
              <label>Email</label>
              <input type="text" name="email" value={email} onChange={(e) => handleTextChange(e)}></input>
            </Field>
            <button>Submit Question</button>
          </Form>
        </Modal>
      </ModalWrapper>
    </>), document.getElementById('app')
  ) : null;
};

export default AddQModal;