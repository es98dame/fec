import styled from 'styled-components';

export const Modal = styled.div`
  z-index: auto;
  display: ${ (props) => (props.show ? 'block' : 'none')};
  position: fixed;
  margin: auto;
  height: auto;
  width: auto;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`

`;