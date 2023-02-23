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

  @media screen and (max-width: 500px) {
    padding: 32px 8px;
  }
`;

export const ContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-x: hidden;

  @media screen and (max-width: 800px) {
   display: flex;
   flex-direction: column;
   gap: 24px;
  }
`;

export const Slide = styled.div<{ gridRow: number }>`
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(174, 218, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  padding: 8px;

  :nth-of-type(even) {
      grid-column: 2;
      grid-row: ${({ gridRow }) => (gridRow)};
    }

  :nth-of-type(odd){
      grid-row: ${({ gridRow }) => (gridRow)};
    }
`;

export const CardProject = styled.div`
  margin-top: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;


  strong {
    font-size: 20px;
    margin-top: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.markText};
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

    @media screen and (max-width: 500px) {
      a {
        font-size: 16px;
      }
    }
  }
`;

export const DescriptionCard = styled.div`
  padding: 8px;
  max-width: 85%;

  strong {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.details};
  }

  p {
    font-size: 18px;
    margin-top: 8px;
  }

  @media screen and (max-width: 500px){
    strong {
      font-size: 18px;
    }

    p {
      font-size: 16px;
    }
  }
`;
