import React, { useState, useEffect, useRef, useInsertionEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAList from './QAList';
import { ContainerCol, ButtonContainer } from './styles/Container.styles.js';
import { Button } from './styles/Button.styles.js';

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input`
  height: 2em;
  width: 100%;
`;

const H4 = styled.h4`
  margin-left: .7em;
`;

const QA = function ({productId}) {
  const storage = useRef([]);
  const searchInput = useRef('');

  const [QAData, setQA] = useState([]);
  const [seeMoreView, setMoreView] = useState('See More Questions');

  const handleMoreQuestions = function() {
    QAData.length <= 4 ? setQA(storage.current) : setQA(storage.current.slice(0, 4));
    seeMoreView === 'See More Questions' ? setMoreView('See Less Questions') : setMoreView('See More Questions');
  };

  const handleAddQuestions = function() {
    alert('Modal Prompt Would Pop Up to add question');
  };

  const handleSearch = function(e) {
    e.preventDefault();
    let queryQuestions = [];
    for (let q of storage.current) {
      if (q.question_body.toLowerCase().startsWith(searchInput.current.toLowerCase())) {
        queryQuestions.push(q);
      }
    }
    QAData.length <= 4 ? setQA(storage.current.slice(0, 4)) : setQA(storage.current);
    searchInput.current = '';
  };

  const handleInput = function(e) {
    searchInput.current = e.target.value;
    if (searchInput.current.length > 2) {
      let queryQuestions = [];
      for (let q of storage.current) {
        if (q.question_body.toLowerCase().startsWith(searchInput.current.toLowerCase())) {
          queryQuestions.push(q);
        }
      }
      setQA(queryQuestions);
    } else {
      QAData.length <= 4 ? setQA(storage.current.slice(0, 4)) : setQA(storage.current);
    }
  };

  useInsertionEffect(() => {
    axios.get('/api', {headers: {path: `/qa/questions?product_id=${productId}`}})
      .then((res) => {
        storage.current = res.data.results;
        console.log('I made it here');
        setQA(res.data.results.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ContainerCol>
      <H4>Questions And Answers</H4>
      <SearchForm type="submit" onSubmit={handleSearch}>
        <StyledInput type="text" onChange={handleInput} placeholder="Have a Question? Search for answers..."/>
        <button type="submit">Search</button>
      </SearchForm>
      <QAList QAData={QAData}/>
      <ButtonContainer>
        <Button onClick={handleMoreQuestions}>{seeMoreView}</Button>
        <Button onClick={handleAddQuestions}>Add A Question</Button>
      </ButtonContainer>
    </ContainerCol>
  );
};

export default QA;
