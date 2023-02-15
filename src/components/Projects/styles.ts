import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 64px 48px;

  h3 {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.markText};
  }

  .swiper {
    width: 90%;
    padding: 10px;
    height: 400px;
    border: 1px solid  rgba(174, 218, 255, 0.5);
    border-radius: 4px;
  }
`;

export const Card = styled.div`
  height: 100%;
  width: 90%;
  border: 1px solid  rgba(174, 218, 255, 0.2);
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
`;

export const CardProject = styled.div`
    border: 1px solid red;
    height: 300px;
    width: 300px;

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    height: 135px;
    width: 80%;
    margin-bottom: 8px;
  }

  .links {
    display: flex;

    a {
      padding: 2px 8px;
    }
  }
`;

export const DescriptionCard = styled.div`
  width: 50%;

  p {
    max-width: 60%;
  }
`;
