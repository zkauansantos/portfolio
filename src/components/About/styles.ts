import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 12.8rem 0;

  h2 {
    font-size: 4.8rem;
    margin-bottom: 6.4rem;
    color:  ${({ theme }) => theme.colors.markText};
  }

  p {
    line-height: 3.2rem;
    font-size: 2rem;
    text-align: center;
    width: 90%;
    transition: 1s ease;
  }

  @media screen and (max-width: 525px){
    p {
      font-size: 1.6rem;
    }
  }
`;
