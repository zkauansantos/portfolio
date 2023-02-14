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
    margin-bottom: 64px;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.markText};
  }

  div {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: repeat(2, auto);

    .card-skill {
      padding: 15px;
      width: 180px;
      height: 180px;
      border: 1px solid ${({ theme }) => theme.colors.cardSkill};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in;
      border-radius: 4px;
      text-align: center;

      :hover {
        border-color: ${({ theme }) => theme.colors.details};
      }

      p {
        font-size: 20px;
      }
    }
  }
`;
