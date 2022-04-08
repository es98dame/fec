import React from 'react';
import styled from 'styled-components';
import StylesItem from './StylesItem.jsx';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
  padding: 5px;
  justify-content: flex-start;
`;

const Text = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const H2 = styled.h2`
  color: grey;
  margin-left: 5px;
`;

const Styles = (props) => {
  let num = 0;
  return (
    <div>
      <Text>
        <h2>Style:</h2>
        <H2>{props.currentStyle.name}</H2>
      </Text>
      <Container>
        {props.styles.map((style) => {
          ++num;
          return (<StylesItem style={style} key={num} styles={props.styles} set={props.set} selectedStyle={props.currentStyle.style_id}/>);
        }
        )}
      </Container>
    </div>
  );
};

export default Styles;