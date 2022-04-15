import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotoModal from './PhotoModal.jsx';


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
    color: ${ props => props.theme.color }
  }
`;

const UserLine = styled.span`
  font-style: oblique;
  font-weight: ${ props => props.seller === 'seller' || props.seller === 'Seller' ? 700 : 300 }
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: .2em;
  margin-left: 20px;
`;

const Image = styled.img`
  height: 75px;
  width: auto;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

const AListEntry = ({answer, askerName}) => {
  let answerer = answer[1].answerer_name;

  const pressedHelpful = useRef(false);
  const photoURL = useRef('');

  const [report, setReport] = useState('Report');
  const [count, setCount] = useState(answer[1].helpfulness);
  const [showModal, setShowModal] = useState(false);

  const handleHelpfulYes = () => {
    if (!pressedHelpful.current) {
      pressedHelpful.current = true;
      setCount(count + 1);
      axios.put('/api', null, {headers: {path: `/qa/answers/${answer[1].id}/helpful`}})
        .then((res) => undefined)
        .catch((err) => console.error('This is handleHelpfulYes in Answers:', err));
    }
  };

  const handleReport = () => {
    report !== 'Reported' ? setReport('Reported') : undefined;
    axios.put('/api', null, {headers: {path: `/qa/answers/${answer[1].id}/report`}})
      .then((res) => undefined)
      .catch((err) => console.error('This is handleHelpfulYes in Answers:', err));
  };

  const handlePhotoModal = (e) => {
    e.persist();
    photoURL.current = e.target.currentSrc;
    setShowModal(true);
  };

  return (
    <AnswerContainer>
      <ABodyContainer>
        <ABody data={answer[0]}>{answer[1].body}</ABody>
      </ABodyContainer>{
        answer[1].photos.length ? (
          <ImageRow>
            {answer[1].photos.map((img) => <Image src={img} key={img} onClick={handlePhotoModal}/>)}
          </ImageRow>
        ) : null
      }<UserContainer>
        <UserLine>by</UserLine>
        <UserLine seller={answerer}>{answerer === 'seller' ? 'Seller' : answerer}</UserLine>
        <UserLine>{answer[1].date.slice(0, 10)}</UserLine>
        <span> &nbsp; | &nbsp; Helpful?</span>
        <Link onClick={handleHelpfulYes}>{' '}Yes({count}){' '}</Link>
        <Link onClick={handleReport}>{report}</Link>
      </UserContainer>
      {showModal ? <PhotoModal photo={photoURL.current} hide={() => setShowModal(false)} answerer={answerer} /> : null}
    </AnswerContainer>
  );
};

export default AListEntry;
