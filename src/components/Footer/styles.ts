import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 32px;
  gap: 64px;
  border-top: 1px solid  rgba(174, 218, 255, 0.125);

  @media screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 400px) {
    gap: 28px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  width: 35%;

  img {
    width: 100%;
    height: 65px;
    color: ${({ theme }) => theme.colors.markText};
    padding-bottom: 2px;
  }

  p {
    font-size: 22px;
    transition: width 0.2s ease-in;
  }

  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: initial;

    h3 {
      width: 30%;
    }

    p {
      max-width: 70%;
    }
  }

  @media screen and (max-width: 400px) {
    h3 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
    }
  }
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    color: ${({ theme }) => theme.colors.markText};
    margin-bottom: 16px;
    font-size: 32px;
  }

  @media screen and (max-width: 700px) {
    align-items: center;
  }

  @media screen and (max-width: 400px) {
    h3 {
      font-size: 28px;
    }
  }
`;

export const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);

  .mg {
    margin-left: 12px;
  }

  a{
    color: ${({ theme }) => theme.colors.markText};
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;

    span {
      margin-top: 3px;
    }
  }

  @media screen and (max-width:  940px) {
    grid-template-columns: repeat(1, auto);
    gap: 8px 4px;

    .mg {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 700px) {
    text-align: center;
    place-items: center;
  }

  @media screen and (max-width: 400px) {
    a {
      font-size: 18px;
    }
  }
`;
