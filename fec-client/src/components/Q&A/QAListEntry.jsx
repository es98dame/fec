import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AListEntry from './AListEntry.jsx';

const QAEntry = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: .5em;
`;

const QContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const QItem = styled.div`
  padding-left: 10px;
  font-weight: 600;
`;

const QItem2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 0.3em;
`;

//May change these colors to match groups colors
const ATag = styled.a`
  padding-left: 2px;
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: #111213;
  }
`;

const AMoreQuestions = styled.a`
margin: .5em 0;
margin-left: .7em;
width: 130px;
cursor: pointer;
&:hover {
  color: grey;
},
a:link {
  color: purple;
}
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const AList = styled.div`
  display: flex;
  flex-direction: column;
  gap: .7em;
`;

const QAListEntry = function({question}) {
  let allAnswers = Object.entries(question.answers);
  let askerName = question.asker_name;
  let sortedAnswers = allAnswers.length ? allAnswers.sort((a, b) => b[1].helpfulness - a[1].helpfulness) : [];

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
        <QItem>Q:</QItem>
        <QItem>{question.question_body}</QItem>
        <QItem2>
          <div>Helpful?</div>
          <ATag onClick={handleHelpfulYes}>{`Yes (${question.question_helpfulness})`}</ATag>
          <div>|</div>
          <ATag onClick={handleAddAnswer}>Add Answer</ATag>
        </QItem2>
      </QContainer>
      <AnswerContainer>{
        answers.length ? <QItem>A:</QItem> : null
      }<AList>{
        answers.length ? answers.map((answer, key) => <AListEntry answer={answer} askerName={askerName} key={key}/>) : null
      }{ allAnswers.length > 2 ? <AMoreQuestions onClick={handleSeeMoreAnswers}>{buttonText}</AMoreQuestions> : null
      }</AList>
      </AnswerContainer>
    </QAEntry>
  );
};

export default QAListEntry;