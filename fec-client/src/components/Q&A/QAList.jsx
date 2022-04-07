import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAListEntry from './QAListEntry.jsx';

//Make sure to delete borders then delete this comment at the end!!
const QAListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: auto;
  max-height: 500px;
  gap: .2em;
`;

const QAList = function({QAData}) {
  let sortedData = QAData.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  return (
    <QAListContainer>{
      QAData.length ? sortedData.map((question) => <QAListEntry question={question} key={question.question_id}/>) : null
    }</QAListContainer>
  );
};

export default QAList;