import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;

  .rec.rec-arrow {
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.markText};
    width: 0px;
    height: 0px;
  }

  .rec.rec-arrow:disabled {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }

  .rec .rec-dot {
    background-color: rgba(150, 150, 150, 1);
  }

  .rec .rec-dot_active {
    background-color: ${({ theme }) => theme.colors.markText};
  }

  .rec .rec-pagination {
    margin-top: 0;
  }

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

export const ContainerImage = styled.div<{ src: string }>`
  width: 100%;
  height: 130px;
  background: url(${({ src }) => src || 'https://www.pngall.com/wp-content/uploads/2016/05/Coming-Soon-PNG.png'}) center center no-repeat;
  background-size: contain;
  margin-bottom: 8px;
`;
