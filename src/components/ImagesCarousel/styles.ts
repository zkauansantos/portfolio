import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  border-radius: 4px;

  .rec.rec-arrow {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.markText};
    color: ${({ theme }) => theme.colors.markText};
    width: 0px;
    height: 0px;
  }

  /* hide disabled buttons */
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
`;

export const ContainerImage = styled.div`
  img {
    border-radius:4px;
    width: 100%;
    z-index: -5;
  }
`;
