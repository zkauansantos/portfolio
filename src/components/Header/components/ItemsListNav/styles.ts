import styled from 'styled-components';

export const Item = styled.li`
  font-size: 20px;
  font-weight: 700;

  .marked {
    color: ${({ theme }) => theme.colors.markText};
  }
`;
