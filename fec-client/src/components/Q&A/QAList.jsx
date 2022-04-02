import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAListEntry from './QAListEntry.jsx';

//Make sure to delete borders then delete this comment at the end!!
const QAListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid black;
  overflow-y: auto;
`;

const QAList = function({QAData}) {
  let sortedData = QAData.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  return (
    <QAListContainer>{
      !QAData.length ? <div>Loading....</div> : sortedData.map((question, key) => <QAListEntry question={question} key={key}/>)
    }</QAListContainer>
  );
};

export default QAList;