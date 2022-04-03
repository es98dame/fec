import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAList from './QAList';

const QAContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QLBContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const QListButton = styled.button`
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input`
  height: 2em;
  width: 100%;
`;

const QA = function ({productId}) {
  const [storage, setStorage] = useState([]);
  const [QAData, setQA] = useState([]);
  const [seeMoreView, setMoreView] = useState('See More Questions');

  const handleMoreQuestions = function() {
    QAData.length <= 4 ? setQA(storage) : setQA(storage.slice(0, 4));
    seeMoreView === 'See More Questions' ? setMoreView('See Less Questions') : setMoreView('See More Questions');
  };

  const handleAddQuestions = function() {
    alert('Modal Prompt Would Pop Up to add question');
  };

  const handleSearch = function(e) {
    e.preventDefault();
    alert('Searching for poop');
  };

  useEffect(() => {
    axios.get('/api', {headers: {path: `/qa/questions?product_id=${productId}`}})
      .then((res) => {
        setStorage(res.data.results);
        setQA(res.data.results.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <QAContainer>
      <h4>Questions And Answers</h4>
      <SearchForm type="submit" onSubmit={handleSearch}>
        <StyledInput type="text" placeholder="Have a Question? Search for answers..."/>
        <button type="submit">Search</button>
      </SearchForm>
      <QAList QAData={QAData}/>
      <QLBContainer>
        <QListButton onClick={handleMoreQuestions}>{seeMoreView}</QListButton>
        <QListButton onClick={handleAddQuestions}>Add A Question</QListButton>
      </QLBContainer>
    </QAContainer>
  );
};

export default QA;
