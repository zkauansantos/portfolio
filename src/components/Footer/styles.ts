import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.4rem 2rem;

  .powered {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    strong {
      font-size: 1.8rem;
    }

    img {
      width: 50%;
      margin-top: 0.6rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.markText};
    }
  }

  @media screen and (max-width: 575px) {
    flex-direction: column;
    gap: 2.4rem;
  }
`;
