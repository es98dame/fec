import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .5em;
  margin-right: auto;
`;

const ABodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: .2em;
  gap: .4em;
`;

const ABody = styled.span`
  font-size: medium;
  font-weight: 300;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .4em;
  font-size: small;
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
      axios.put('/api', null, {headers: {path: `/qa/answers/${answer[1].id}/helpful`}})
        .then((res) => undefined)
        .catch((err) => console.error('This is handleHelpfulYes in Answers:', err));
    }
  };

  const handleReport = function() {
    report !== 'Reported' ? setReport('Reported') : undefined;
    axios.put('/api', null, {headers: {path: `/qa/answers/${answer[1].id}/report`}})
      .then((res) => undefined)
      .catch((err) => console.error('This is handleHelpfulYes in Answers:', err));
  };

  return (
    <AnswerContainer>
      <ABodyContainer>
        <ABody data={answer[0]}>{answer[1].body}</ABody>
      </ABodyContainer>
      <UserContainer>
        <UserLine>by</UserLine>
        <UserLine seller={answerer}>{answerer}</UserLine>
        <UserLine>{answer[1].date.slice(0, 10)}</UserLine>
        <span> &nbsp; | &nbsp; Helpful?</span>
        <Link onClick={handleHelpfulYes}>{' '}Yes({count}){' '}</Link>
        <Link onClick={handleReport}>{report}</Link>
      </UserContainer>
    </AnswerContainer>
  );
};

export default AListEntry;