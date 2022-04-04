import styled from 'styled-components';

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled(ContainerRow)`
  gap: 0.5em;
`;

export const AContainer = styled(ContainerCol)`
  overflow-y: auto;
  max-height: 300px;
  flex: auto;
  gap: .8em;
`;

export const QContainer = styled(ContainerCol)`
  gap: .4em;
  margin-top: .5em;
`;