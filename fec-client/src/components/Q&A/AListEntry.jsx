import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .7em;
`;

const ABodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: .2em;
  gap: .2em;
`;

const ALabel = styled.span`
  font-weight: 600;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .5em;
  font-size: small;
`;

const UserLine = styled.span`
  font-style: oblique;
`;

const UserLineSeller = styled.span`
  font-style: oblique;
  font-weight: 600;
`;

const ATag = styled.a`
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: #111213;
  }
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
        {isSeller ? <UserLineSeller>{answerer}</UserLineSeller> : <UserLine>{answerer}</UserLine>}
        <UserLine>{answer[1].date.slice(0, 10)}</UserLine>
        <span>|</span>
        <span>Helpful?</span>
        <span>|</span>
        <ATag onClick={handleHelpfulYes}>Yes({count})</ATag>
        <ATag onClick={handleReport}>{report}</ATag>
      </UserContainer>
    </AnswerContainer>
  );
};

export default AListEntry;