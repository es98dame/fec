import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AListEntry from './AListEntry.jsx';
import AddAModal from './AddAModal.jsx';

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  padding-left: .5em;
  font-weight: 400;
`;

const QContainer = styled(ContainerCol)`
  gap: .7em;
  margin-top: .5em;
`;

const QBody = styled.div`
  padding-left: .4em;
  font-weight: 400;
`;

const QInfoLine = styled(ContainerRow)`
  margin-left: auto;
  gap: 0.3em;
`;

const AContainer = styled(ContainerCol)`
  overflow-y: auto;
  max-height: 300px;
  flex: auto;
  gap: .8em;
`;

const Link = styled.a`
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: ${ props => props.color || '#111213' }
  }
`;

const Button = styled.button`
  margin-top: .3em;
  margin-bottom: .5em;
  margin-left: .6em;
  cursor: pointer;
  height: auto;
  width: 13%;
  background-color: cornsilk;
  border-radius: 7px;
  &:hover {
    color: grey;
  }
`;

// Saving this for refractoring
// const Button = styled(Link)`
//   margin-top: .3em;
//   margin-bottom: .5em;
//   margin-left: .6em;
//   width: 140px;
// `;

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
  const [showModal, setShowModal] = useState(false);

  const handleSeeMoreAnswers = () => {
    buttonText === 'See More Answers' ? setButtonText('Collapse Answers') : setButtonText('See More Answers');
    answers.length === 2 ? setAnswers(sortedAnswers.current) : setAnswers(sortedAnswers.current.slice(0, 2));
  };

  const handleAddAnswer = () => {
    setShowModal(true);
  };

  const handleHelpfulYes = () => {
    if (!pressedHelpful.current) {
      pressedHelpful.current = true;
      setCount(count + 1);
    }
  };

  return (
    <QContainer>
      <ContainerRow>
        <Label>Q:</Label>
        <QBody>{question.question_body}</QBody>
        <QInfoLine>
          <div>Helpful?</div>
          <Link onClick={handleHelpfulYes}>{`Yes (${count})`}</Link>
          <div>|</div>
          <Link onClick={handleAddAnswer}>Add Answer</Link>
        </QInfoLine>
      </ContainerRow>
      <ContainerRow>
        {answers.length ? <Label>A:</Label> : null}
        <AContainer>
          {answers.length ? answers.map((answer, key) => <AListEntry answer={answer} askerName={askerName} key={answer[0]}/>) : null}
          {allAnswers.length > 2 ? <Button color={'#007185'} onClick={handleSeeMoreAnswers}>{buttonText}</Button> : null}
        </AContainer>
      </ContainerRow>{
        showModal ? <AddAModal hide={() => setShowModal(false)} /> : null
      }</QContainer>
  );
};

export default QAListEntry;
