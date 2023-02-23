import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  gap: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px 0px;

  h3 {
    font-weight: 700;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.markText};
  }

  div {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(5, auto);
    justify-items: center;
    align-items: center;
    transition: width 0.3s ease-in-out;

    @media screen and (max-width: 1000px) {
      padding: 0;
      grid-template-columns: repeat(4, auto);

      :nth-last-child(-n+2) {
        grid-column: 2;
      }

      :last-child {
        grid-column: 3;
      }

      h3 {
        margin-top: 24px;
      }
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(3, auto);

      :nth-last-child(-n+2) {
        grid-column: initial;
      }

      :last-child {
        grid-column: 2;
      }

      h3 {
      font-size: 28px;
      }
    }

    @media screen and (max-width: 575px) {
      grid-template-columns: repeat(2, auto);
    }

    .card-skill {
      padding: 15px;
      width: 180px;
      height: 180px;
      border: 1px solid ${({ theme }) => theme.colors.cardSkill};
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      transition: 0.3s ease-in;
      border-radius: 4px;
      text-align: center;

      :hover {
        border-color: ${({ theme }) => theme.colors.details};
      }

      p {
        font-size: 20px;
      }

      @media screen and (max-width: 800px) {
        width: 170px;
        height: 170px;

        p {
          font-size: 18px;
        }
      }

      @media screen and (max-width: 400px) {
        width: 140px;
        height: 140px;

        p {
          font-size: 16px;
        }
      }
    }
  }
`;
