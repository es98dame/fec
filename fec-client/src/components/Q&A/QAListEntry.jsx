import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AListEntry from './AListEntry.jsx';

const QAEntry = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

const QContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const QItem1 = styled.div`
  padding-left: 2px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const QItem2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 0.3em;
`;

const QAEntryButton = styled.button`
  width: 15em;
  height: 3em;
  border-radius: 0;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

//May change these colors to match groups colors
const ATag = styled.a`
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: #111213;
  }
`;

const QAListEntry = function({question}) {
  let allAnswers = Object.entries(question.answers);
  let askerName = question.asker_Name;

  const [buttonText, setButtonText] = useState('See More Answers');
  const [answers, setAnswers] = useState(allAnswers.slice(0, 2));

  const handleSeeMoreAnswers = function() {
    buttonText === 'See More Answers' ? setButtonText('Collapse Answers') : setButtonText('See More Answers');
    answers.length === 2 ? setAnswers(allAnswers) : setAnswers(allAnswers.slice(0, 2));
  };

  const handleAddAnswer = function() {
    alert('Modal Prompt Would Go Here');
  };

  const handleHelpfulYes = function() {
    alert('Would Increase the number here by 1 and only 1.  Would need to send POST request');
  };

  return (
    <QAEntry>
      <QContainer>
        <QItem1>Q: {question.question_body}</QItem1>
        <QItem2>
          <div>Helpful?</div>
          <ATag onClick={handleHelpfulYes}>{`Yes (${question.question_helpfulness})`}</ATag>
          <div>|</div>
          <ATag onClick={handleAddAnswer}>Add Answer</ATag>
        </QItem2>
      </QContainer>{
        answers.length ? answers.map((answer, key) => <AListEntry answer={answer} askerName={askerName} key={key}/>) : null
      }{ allAnswers.length > 2 ? <QAEntryButton onClick={handleSeeMoreAnswers}>{buttonText}</QAEntryButton> : null
      }</QAEntry>
  );
};

export default QAListEntry;