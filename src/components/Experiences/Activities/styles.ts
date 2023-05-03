import styled from 'styled-components';

export const ActivitiesContainer = styled.div`
  padding: 4rem 6rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    h3 {
      color: ${({ theme }) => theme.colors.details};
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: .4rem;
      font-size: 2.4rem;

      span {
        font-size: 1.6rem;
        font-style: italic;
      }
    }

    p {
      text-align: start;
      font-size: 1.8rem;
      opacity: 0.8;
    }
  }

  ul {
    list-style: initial;
    padding-left: 2rem;

    li {
      margin-top: 1.2rem;
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 2rem 4rem;

    div {
      h3 {
        font-size: 2.2rem;
        flex-direction: column;
        align-items: flex-start;

        span {
          font-size: 1.4rem;
        }
      }

      p {
        font-size: 1.6rem;
      }
    }

    ul {
      padding-left: 1rem;

      li {
        font-size: 1.6rem;
      }
    }
  }
`;
