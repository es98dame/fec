import React, { useRef, useState } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
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
  width: 400px;
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
  align-self: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const SubTitle = styled.h6`
  font-size: 17px;
  margin: 0;
`;

const QuestionBody = styled.p`
  margin: 5px 0;
  font-size: small;
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

const UploadedImage = styled.img`
  max-width: 100px;
  height: auto;
`;

const AddAModal = ({ hide }) => {
  const container = document.getElementById('app');
  const files = useRef('');
  const [image, setImage] = useState('');

  const handleFile = (e) => {
    console.log(e.target.result);
    console.log(typeof e.target.result);
    setImage(e.target.result);
  };

  const handleUpload = (e) => {
    e.persist();
    console.log(e)
    console.log(e.target.files[0].name);
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
  };

  return reactDom.createPortal((
    <ModalWrapper onClick={hide}>
      <ModalContainer onClick={(e) => e.stopPropagation()} >
        <Heading>
          <Title>
            <TitleName>Submit your Answer</TitleName>
            <SubTitle>Product Name:</SubTitle>
            <QuestionBody>does it poop?</QuestionBody>
          </Title>
          <ExitButton onClick={hide}>&times;</ExitButton>
        </Heading>
        <Form>
          <Field>
            <label>nickname</label>
          </Field>
          <input type="file" name="file" onChange={handleUpload}/>
        </Form>
        {image.length ? <UploadedImage src={image}/> : null}
      </ModalContainer>
    </ModalWrapper>
  ), container);
};


export default AddAModal;