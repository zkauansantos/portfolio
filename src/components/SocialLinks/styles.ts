import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;

  a {
    padding: 1rem;
    background: ${({ theme }) => theme.colors.darkBg};
    border: 1px solid ${({ theme }) => theme.colors.lightBg};
    border-radius: 4px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    overflow: hidden;

    span {
      margin-left: 0.6rem;
      font-weight: 600;
      font-size: 2em;
      color: ${({ theme }) => theme.colors.details};
    }

    &:before {
      content:'';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      z-index: -1;
      transition: 0.3s ease;
      background: ${({ theme }) => theme.colors.details};
    }

    &:hover {
      span {
        color: ${({ theme }) => theme.colors.darkBg};
      }

      svg {
        * {
          color: ${({ theme }) => theme.colors.darkBg};
        }
      }

      ::before {
        background: ${({ theme }) => theme.colors.markText};
        width: 100%;
      }
    }
  }


`;
