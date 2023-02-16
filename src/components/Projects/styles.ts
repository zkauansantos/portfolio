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

export const Slide = styled.div<{ gridRow: number }>`
  height: 100%;
  border: 1px solid  rgba(174, 218, 255, 0.5);
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  text-align: center;
  padding: 0px 8px 8px 8px;


  :nth-of-type(even) {
      grid-column: 2;
      grid-row: ${({ gridRow }) => (gridRow === 1 ? gridRow + 1 : gridRow + 1)};
    }

  :nth-of-type(odd){
      grid-row: ${({ gridRow }) => (gridRow === 2 ? gridRow + 1 : gridRow + 1)};
    }
`;

export const CardProject = styled.div`
  margin-top: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(174, 218, 255, 0.5);
  padding: 8px;

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 100%;
    margin-bottom: 8px;
  }

  strong {
    font-size: 20px;
  }

  .links {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    gap: 12px;

    a {
      display: flex;
      padding: 6px 10px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      border-radius: 4px;
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
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: start;
  height: 100%;

  strong {
    font-size: 20px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.details};
  }

  p {
    font-size: 18px;
  }

  @media screen and (max-width: 950px){
    strong {
      font-size: 20px;
    }

    p {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 800px){
    strong {
      font-size: 18px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const ContainerWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
