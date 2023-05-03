import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12.8rem 0;

  h2 {
    font-size: 4.8rem;
    margin-bottom: 6.4rem;
    color:  ${({ theme }) => theme.colors.markText};
  }
`;

export const Grid = styled.div`
  display: grid;
  margin-top: 1.6rem;
  padding: 0 2rem;
  grid-template-columns: repeat(4, auto);
  gap: 24px;

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, auto);
  }

  @media screen and (max-width: 848px) {
    grid-template-columns: repeat(1, auto);
  }
`;

export const Card = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2.4rem;
  background: ${({ theme }) => theme.colors.darkBg};
  border: 1px solid rgba(174, 218, 255, 0.1);
  border-radius: 4px;
  font-size: 1.6rem;
  transition: 0.3s ease-in;

  &:hover {
  border-color: rgba(174, 218, 255, 0.4);
  }

  h3 {
    margin-top: 3.2rem;
  }

  p {
    margin-top: 1.6rem;
    max-width: 21.6rem;
    line-height: 2.4rem;
    opacity: 0.6;
  }

  @media screen and (max-width: 1140px) {
    p {
      max-width: 100%;
    }
  }
`;
