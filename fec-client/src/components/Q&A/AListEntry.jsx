import React, { useState, useEffect } from 'react';
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

  const handleHelpfulYes = function() {
    alert('Would Increase the helpfness by one and only one, also would send post request');
  };

  const handleReport = function() {
    alert('Would send a put or patch request, will update state without this answer');
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
        <ATag onClick={handleHelpfulYes}>Yes({answer[1].helpfulness})</ATag>
        <ATag onClick={handleReport}>Report</ATag>
      </UserContainer>
    </AnswerContainer>
  );
};

export default AListEntry;