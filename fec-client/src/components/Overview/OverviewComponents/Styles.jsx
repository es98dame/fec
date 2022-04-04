import React from 'react';
import styled from 'styled-components';
import StylesItem from './StylesItem.jsx';

var Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 5px;
  justify-content: space-evenly;
`;

const Styles = (props) => {
  console.log(props.styles);
  return (
    <div>
      <h3>choose a style</h3>
      <Container>
        {props.styles.map((style) =>
          <StylesItem style={style}/>
        )}
      </Container>
    </div>
  );
};

export default Styles;