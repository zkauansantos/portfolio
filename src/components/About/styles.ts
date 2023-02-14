import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0px;
  gap: 32px;
  margin-top: 8px;

  img {
    width: 10%;
  }

  p {
    max-width: 65%;
    font-weight: 400;
    font-size: 22px;
  }

  @media screen and (max-width: 800px) {
    p {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 525px) {
    gap: 0;
    padding: 32px 0px;
    flex-direction: column;

    p {
      text-align: center;
    }
  }
`;
