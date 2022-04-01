import React from 'react';
import styled from 'styled-components';

var Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 5px;
  justify-content: space-evenly;
`;

var StylesDiv = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
`;

const Styles = () => {
  return (
    <div>
      <h3>choose a style</h3>
      <Container>
        <StylesDiv>style 1</StylesDiv>
        <StylesDiv>style 2</StylesDiv>
        <StylesDiv>style 3</StylesDiv>
        <StylesDiv>style 4</StylesDiv>
      </Container>
    </div>
  );
};

export default Styles;