import styled from 'styled-components';

export const A = styled.a`
  cursor: pointer;
  &:hover {
    color: grey;
  },
  a:link {
    color: ${ props => props.color || '#111213' }
  }
`;
