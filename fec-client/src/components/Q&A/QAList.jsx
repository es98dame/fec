import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QAListEntry from './QAListEntry.jsx';
import { ContainerCol } from './styles/Container.styles.js';

//Make sure to delete borders then delete this comment at the end!!
const QAListContainer = styled(ContainerCol)`
  border: 1px solid black;
  overflow-y: auto;
  max-height: 500px;
  gap: .2em;
`;

const QAList = function({QAData}) {
  let sortedData = QAData.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  return (
    <QAListContainer>{
      QAData.length ? sortedData.map((question, key) => <QAListEntry question={question} key={key}/>) : null
    }</QAListContainer>
  );
};

export default QAList;