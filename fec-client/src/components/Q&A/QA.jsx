import React, { useState, useEffect } from 'react';
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
      <div>SearchBar Goes Here</div>
      <QAList QAData={QAData}/>
      <QLBContainer>
        <QListButton onClick={handleMoreQuestions}>{seeMoreView}</QListButton>
        <QListButton onClick={handleAddQuestions}>Add A Question</QListButton>
      </QLBContainer>
    </QAContainer>
  );
};

export default QA;
