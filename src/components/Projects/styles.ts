import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 64px 48px;
  position: relative;

  h3 {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.markText};
  }

  .swiper {
    width: 90%;
    padding: 10px;
    height: 400px;
    border-radius: 4px;
  }
`;

export const Card = styled.div`
  height: 100%;
  width: 90%;
  border: 1px solid  rgba(174, 218, 255, 0.5);
  display: flex;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
`;

export const CardProject = styled.div`
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 300px;
    border: 1px solid rgba(174, 218, 255, 0.5);

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 80%;
    margin-bottom: 8px;
  }

  strong {
    font-size: 20px;
  }

  .links {
    display: flex;
    margin-top: 12px;
    gap: 12px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      border-radius: 4px;
      padding: 8px 10px;
      background: ${({ theme }) => theme.colors.lightBg};
      transition: 0.2s;
      border: 1px solid  rgba(174, 218, 255, 0.2);

      :hover {
      background: rgba(174, 218, 255, 0.5);

      }
    }
  }
`;

export const DescriptionCard = styled.div`
  width: 50%;

  strong {
    font-size: 22px;
  }

  p {
    font-size: 20px;
    margin-top: 24px;
  }
`;
