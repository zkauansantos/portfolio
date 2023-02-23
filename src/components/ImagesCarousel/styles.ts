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

export const ContainerImage = styled.div<{ src: string }>`
  border-radius: 4px;
  width: 100%;
  height: 130px;
  background: url(${({ src }) => src || 'https://png.pngtree.com/png-vector/20211015/ourmid/pngtree-coming-soon-image-with-yellow-background-and-stripes-decoration-png-image_3987036.png'}) center center no-repeat;
  background-size: ${({ src }) => (src.includes('2') ? 'contain' : 'cover')};
  margin-bottom: 8px;
`;
