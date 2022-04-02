import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 2px;
`;

const ABodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .2em;
`;

const ALabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .5em;
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
  let seller = answerer === askerName;
  console.log(askerName);

  const handleHelpfulYes = function() {
    alert('Would Increase the helpfness by one and only one, also would send post request');
  };

  return (
    <AnswerContainer>
      <ABodyContainer>
        <ALabel>A:</ALabel>
        <span data={answer[0]}>{answer[1].body}</span>
      </ABodyContainer>
      <UserContainer>
        <div>by {seller ? `${answerer} - Seller` : answerer}</div>{
          seller ? null : <span>{answer[1].date.slice(0, 10)}</span>
        }<span>|</span>
        <span>Helpful?</span>
        <span>|</span>
        <ATag onClick={handleHelpfulYes}>Yes({answer[1].helpfulness})</ATag>
        <ATag>Report</ATag>
      </UserContainer>
    </AnswerContainer>
  );
};

export default AListEntry;