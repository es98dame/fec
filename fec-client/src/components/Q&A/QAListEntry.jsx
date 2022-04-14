import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AListEntry from './AListEntry.jsx';
import AddAModal from './AddAModal.jsx';

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionRow = styled(ContainerRow)`
  margin-right: 5px;
  background-color: ${props => props.theme.lightgrayToDark};
  padding: 4px 0;
`;

const Label = styled.div`
  padding-left: .5em;
  font-weight: 400;
`;

const QContainer = styled(ContainerCol)`
  gap: .3px;
  margin-top: .2px;
`;

const QBody = styled.div`
  display: flex;
  flex-direction: row;
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
  &:last-child {
    margin-bottom: 5px;
  };
`;


const Link = styled.a`
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: ${ props => props.theme.color }
  }
`;

const Button = styled.button`
  margin-top: .3em;
  margin-bottom: .5em;
  margin-left: .6em;
  cursor: pointer;
  height: auto;
  background-color: ${props => props.theme.darkgrayToLight};
  width: 13%;
  border-radius: 7px;
  &:hover {
    color: grey;
  }
  border: 2px solid ${props => props.theme.background};
  color: white;
`;

const Highlighted = styled.span`
  background: yellow;
`;

const sortSeller = (answers) => {
  let result = [];
  let sellers = [];
  answers.forEach((answer) => answer[1].answerer_name === 'Seller' || answer[1].answerer_name === 'seller' ? sellers.push(answer) : result.push(answer));

  return [...sellers, ...result];
};

const QAListEntry = ({question, productName, productId, updateAllStorages}) => {
  let allAnswers = Object.entries(question.answers);
  let askerName = question.asker_name;
  let orderedAnswers = allAnswers.length ? allAnswers.sort((a, b) => b[1].helpfulness - a[1].helpfulness) : [];

  const sortedAnswers = useRef(sortSeller(orderedAnswers));
  const pressedHelpful = useRef(false);

  const [count, setCount] = useState(question.question_helpfulness);
  const [buttonText, setButtonText] = useState('See More Answers');
  const [answers, setAnswers] = useState(sortedAnswers.current.slice(0, 2));
  const [showModal, setShowModal] = useState(false);
  const [report, setReport] = useState('Report');

  const handleSeeMoreAnswers = () => {
    buttonText === 'See More Answers' ? setButtonText('Collapse Answers') : setButtonText('See More Answers');
    answers.length === 2 ? setAnswers(sortedAnswers.current) : setAnswers(sortedAnswers.current.slice(0, 2));
  };

  const handleAddAnswer = () => {
    setShowModal(true);
  };

  const updateAnswers = () => {
    axios.get('/api', {headers: {path: `/qa/questions/${question.question_id}/answers?count=10000`}})
      .then((res) => {
        let data = res.data.results;
        for (let answer of data) {
          answer.id = answer.answer_id;
          answer.photos = answer.photos.map((photo) => photo.url);
        }

        let allAnswerIds = data.map((answer) => answer.answer_id);
        let allAnswers = data.map((answer, i) => [allAnswerIds[i], answer]);

        let orderedAnswers = allAnswers.length ? allAnswers.sort((a, b) => b[1].helpfulness - a[1].helpfulness) : [];
        let sorted = sortSeller(orderedAnswers);
        sortedAnswers.current = sorted;

         console.log(sorted);

        buttonText === 'See More Answers' ? setAnswers(sorted.slice(0, 2)) : setAnswers(sorted);
        updateAllStorages(sorted, question.question_id);
      })
      .catch((err) => console.error('axios request to get all answers in QAListEntry.jsx', err));
  };

  const handleHelpfulYes = () => {
    if (!pressedHelpful.current) {
      pressedHelpful.current = true;
      setCount(count + 1);
      axios.put('/api', null, {headers: {path: `/qa/questions/${question.question_id}/helpful`}})
        .then((res) => undefined)
        .catch((err) => console.error('This is handleHelpfulYes in Questions:', err));
    }
  };

  const handleReport = () => {
    report !== 'Reported' ? setReport('Reported') : undefined;
    axios.put('/api', null, {headers: {path: `/qa/questions/${question.question_id}/report`}})
      .then((res) => undefined)
      .catch((err) => console.error('This is handleHelpfulYes in Answers:', err));
  };

  const ModalProps = {
    productName: productName,
    question: question.question_body,
    questionId: question.question_id,
    updateAnswers: updateAnswers
  };

  // console.log(answers);

  return (
    <QContainer >
      <QuestionRow>
        <Label>Q:</Label>
        <QBody>{question.question_body}</QBody>
        <QInfoLine>
          <div>Helpful?</div>
          <Link onClick={handleHelpfulYes}>{`Yes (${count})`}</Link>
          <div>|</div>
          <Link onClick={handleAddAnswer}>Add Answer</Link>
          <div>|</div>
          <Link onClick={handleReport}>{report}</Link>
        </QInfoLine>
      </QuestionRow>
      <ContainerRow>
        {answers.length ? <Label>A:</Label> : null}
        <AContainer>
          {answers.length ? answers.map((answer, key) => <AListEntry answer={answer} askerName={askerName} key={answer[0]}/>) : null}
          {allAnswers.length > 2 ? <Button color={'#007185'} onClick={handleSeeMoreAnswers}>{buttonText}</Button> : null}
        </AContainer>
      </ContainerRow>{
        showModal ? <AddAModal hide={() => setShowModal(false)} {...ModalProps}/> : null
      }</QContainer>
  );
};

export default QAListEntry;
