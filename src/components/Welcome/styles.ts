import styled from 'styled-components';
import bgIllustrations from '../../assets/imgs/bgIllustrations.svg';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 68px;
  gap: 80px;

  @media screen and (max-width: 800px){
    flex-direction: column;
    padding: 10px 15px;
    gap: 24px;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-weight: 900;
    color: ${({ theme }) => theme.colors.markText};
    font-size: 64px;
  }

  strong {
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 4px;
  }

  p {
    font-size: 20px;
    max-width: 95%;
  }

  .social-links {
    margin-top: 12px;
    display: flex;
    gap: 12px;

    a {
      display: flex;
      justify-content: center;
      gap: 12px;
      align-items: center;
      border: 1px solid  rgba(174, 218, 255, 0.5);
      border-radius: 4px;
      padding: 8px 16px;
    }
  }

  @media screen and (max-width: 1100px){
    h1 {
      font-size: 50px;
    }

    strong {
      font-size: 28px;
    }
  }

  @media screen and (max-width: 800px){
    align-items: center;
    margin-top: 48px;

    h1 {
      font-size: 48px;
    }

    p {
      font-size: 18px;
      max-width: 80%;
      text-align: center;
    }
  }

  @media screen and (max-width: 450px) {
    margin-top: 0;

    h1 {
      font-size: 40px;
    }

    strong {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const Illustrations = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${bgIllustrations});

  img {
    width: 105%;
  }

  @media screen and (max-width: 800px){
    img {
      width: 100%;
      height: 300px;
    }
  }
`;
