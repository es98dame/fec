import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AListEntry from './AListEntry.jsx';

import { ContainerRow, AContainer, QContainer } from './styles/Container.styles.js';
import { A } from './styles/ATag.styles.js';

const QItem = styled.div`
  padding-left: .5em;
  font-weight: 600;
`;

const QItem2 = styled(ContainerRow)`
  margin-left: auto;
  gap: 0.3em;
`;

const AMoreAnswers = styled(A)`
  margin-top: .3em;
  margin-bottom: .5em;
  margin-left: .6em;
  width: 130px;
`;

const sortSeller = function(answers) {
  let result = [];
  let sellers = [];
  answers.forEach((answer) => answer[1].answerer_name === 'Seller' ? sellers.push(answer) : result.push(answer));

  return [...sellers, ...result];
};

const QAListEntry = function({question}) {
  let allAnswers = Object.entries(question.answers);
  let askerName = question.asker_name;
  let orderedAnswers = allAnswers.length ? allAnswers.sort((a, b) => b[1].helpfulness - a[1].helpfulness) : [];

  const sortedAnswers = useRef(sortSeller(orderedAnswers));
  const pressedHelpful = useRef(false);

  const [count, setCount] = useState(question.question_helpfulness);
  const [buttonText, setButtonText] = useState('See More Answers');
  const [answers, setAnswers] = useState(sortedAnswers.current.slice(0, 2));
  const [modalA, setModalA] = useState(false);

  const handleSeeMoreAnswers = function() {
    buttonText === 'See More Answers' ? setButtonText('Collapse Answers') : setButtonText('See More Answers');
    answers.length === 2 ? setAnswers(sortedAnswers.current) : setAnswers(sortedAnswers.current.slice(0, 2));
  };

  const handleAddAnswer = function() {
    setModalA(!modalA);
  };

  const handleHelpfulYes = function() {
    if (!pressedHelpful.current) {
      pressedHelpful.current = true;
      setCount(count + 1);
    }
  };

  // console.log(answers)
  return (
    <QContainer>
      <ContainerRow>
        <QItem>Q:</QItem>
        <QItem>{question.question_body}</QItem>
        <QItem2>
          <div>Helpful?</div>
          <A onClick={handleHelpfulYes}>{`Yes (${count})`}</A>
          <div>|</div>
          <A onClick={handleAddAnswer}>Add Answer</A>
        </QItem2>
      </ContainerRow>
      <ContainerRow>
        {answers.length ? <QItem>A:</QItem> : null}
        <AContainer>
          {answers.length ? answers.map((answer, key) => <AListEntry answer={answer} askerName={askerName} key={answer[0]}/>) : null}
          {allAnswers.length > 2 ? <AMoreAnswers color={'purple'} onClick={handleSeeMoreAnswers}>{buttonText}</AMoreAnswers> : null}
        </AContainer>
      </ContainerRow>
    </QContainer>
  );
};

export default QAListEntry;