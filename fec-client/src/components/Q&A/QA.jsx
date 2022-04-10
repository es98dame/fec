import React, { useState, useEffect, useRef, useInsertionEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAList from './QAList';
import AddQModal from './AddQModal.jsx';

const magnifyingGlass = 'https://www.freeiconspng.com/uploads/search-icon-png-5.png';

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const Button = styled.button`
  cursor: pointer;
  height: 50px;
  width: 160px;
  background-color: cornsilk;
  &:hover {
    color: grey;
  }
  border-radius: 5px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  border: solid 1px;
  background-color: #d5e1df;
`;

const StyledInput = styled.input`
  height: 2em;
  width: 100%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline-width: 0;
`;

const SearchIcon = styled.img`
  right: 2px;
  width: 2%;
  position: relative;
  top: 1px;
  height: auto;
`;

const H4 = styled.h4`
  margin-left: .7em;
`;

const QA = ({productId, productName}) => {
  const storage = useRef([]);
  const prevData = useRef([]);
  const showButton = useRef(true);
  const [mode, setMode] = useState('normal');

  const [searchInput, setSearchInput] = useState('');
  const [QAData, setQA] = useState([]);
  const [seeMoreView, setMoreView] = useState('See More Questions');
  const [modalQ, setModalQ] = useState(false);

  const showUpdates = () => {
    axios.get('/api', {headers: {path: `/qa/questions?product_id=${productId}&count=10000`}})
      .then((res) => {
        storage.current = res.data.results;
        prevData.current = res.data.results.slice(0, 2);
        setQA(res.data.results.slice(0, 2));
      })
      .catch((err) => console.error('axios request in QA.jsx:', err));
  };

  const handleMoreQuestions = () => {
    setQA(storage.current.slice(0, QAData.length + 2));
    prevData.current = storage.current.slice(0, QAData.length + 2);
  };

  const handleAddQuestions = () => {
    setModalQ(!modalQ);
  };

  const handleQSubmission = (body) => {
    axios.post('/api', body, {headers: { path: '/qa/questions'}})
      .then((res) => showUpdates())
      .catch((err) => console.log('This is POST request for adding Questions:', err.toJSON()));
  };

  useEffect(() => {
    if (searchInput.length > 2) {
      setMode('search');
      let queryQuestions = [];
      showButton.current = false;
      for (let q of storage.current) {
        q.question_body.toLowerCase().includes(searchInput.toLowerCase()) ? queryQuestions.push(q) : undefined;
      }
      setQA(queryQuestions);
    } else {
      setMode('normal');
      showButton.current = true;
      setQA(prevData.current);
    }
  }, [searchInput]);

  useInsertionEffect(() => {
    axios.get('/api', {headers: {path: `/qa/questions?product_id=${productId}&count=10000`}})
      .then((res) => {
        storage.current = res.data.results;
        prevData.current = res.data.results.slice(0, 2);
        setQA(res.data.results.slice(0, 2));
      })
      .catch((err) => console.error('axios request in QA.jsx:', err));
  }, []);

  const ModalProps = {
    productName: productName,
    productId: productId,
    handleQSubmission: handleQSubmission,
    showUpdates: showUpdates
  };

  const QAListProps = {
    QAData: QAData,
    productName: productName,
    showUpdates: showUpdates,
    handleMoreQuestions: handleMoreQuestions,
    mode: mode,
    storage: storage.current.length
  };

  return (
    <ContainerCol>
      <H4>Questions And Answers</H4>
      <SearchForm title="live-search" type="submit">
        <StyledInput title="search-input" type="text" value={searchInput} onChange={ e => setSearchInput(e.target.value)} placeholder="Have a Question? Search for answers..."/>
        <SearchIcon src={magnifyingGlass}/>
      </SearchForm>
      <QAList {...QAListProps}/>
      <ButtonContainer>
        {storage.current.length > 2 && QAData.length < storage.current.length && showButton.current ? <Button onClick={handleMoreQuestions}>See More Questions</Button> : null}
        <Button title="Add Question" onClick={handleAddQuestions}>Add A Question +</Button>
      </ButtonContainer>
      <AddQModal show={modalQ} hide={() => setModalQ(!modalQ)} {...ModalProps}/>
    </ContainerCol>
  );
};

export default QA;
