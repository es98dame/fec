import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ContainerRow, ContainerCol } from './styles/Container.styles.js';
import { A } from './styles/ATag.styles.js';

const AnswerContainer = styled(ContainerCol)`
  margin-left: .5em;
  margin-right: auto;
`;

const ABodyContainer = styled(ContainerRow)`
  margin-bottom: .2em;
  gap: .4em;
`;

const ALabel = styled.span`
  font-weight: 600;
`;

const UserContainer = styled(ContainerRow)`
  gap: .4em;
  font-size: small;
`;

const UserLine = styled.span`
  font-style: oblique;
  font-weight: ${ props => props.seller === 'Seller' ? 700 : 300 }
`;

const AListEntry = function({answer, askerName}) {
  let answerer = answer[1].answerer_name;
  let isSeller = answerer === 'Seller';

  const pressedHelpful = useRef(false);
  const [report, setReport] = useState('Report');
  const [count, setCount] = useState(answer[1].helpfulness);

  const handleHelpfulYes = function() {
    if (!pressedHelpful.current) {
      pressedHelpful.current = true;
      setCount(count + 1);
    }
  };

  const handleReport = function() {
    report !== 'Reported' ? setReport('Reported') : undefined;
  };

  return (
    <AnswerContainer>
      <ABodyContainer>
        <span data={answer[0]}>{answer[1].body}</span>
      </ABodyContainer>
      <UserContainer>
        <UserLine>by</UserLine>
        <UserLine seller={answerer}>{answerer}</UserLine>
        <UserLine>{answer[1].date.slice(0, 10)}</UserLine>
        <span> &nbsp; | &nbsp; Helpful?</span>
        <A onClick={handleHelpfulYes}>{' '}Yes({count}){' '}</A>
        <A onClick={handleReport}>{report}</A>
      </UserContainer>
    </AnswerContainer>
  );
};

export default AListEntry;