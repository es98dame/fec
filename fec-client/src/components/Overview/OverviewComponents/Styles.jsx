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
  let num = 0;
  return (
    <div>
      <h3>choose a style</h3>
      <Container>
        {props.styles.map((style) => {
          num = num + 1;
          return (<StylesItem style={style} key={num} styles={props.styles} set={props.set}/>);
        }
        )}
      </Container>
    </div>
  );
};

export default Styles;