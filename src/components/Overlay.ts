import styled from 'styled-components';

export const Overlay = styled.div<{ bg: string }>`
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${({ bg }) => bg};
`;
