import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { transform: translateY(-150px); }
  to { transform: translateY(0); }
`;

export const Container = styled.header<{ isTop: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: sticky;
  z-index: 5;
  transition: 0.2s ease;
  background-color: ${({ isTop, theme }) => (isTop ? 'transparent' : theme.colors.darkBg)};
  border-bottom: ${({ isTop }) => (isTop ? 'none' : '1px solid rgba(0, 38, 81, 0.1)')};
`;

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 1.2rem;

  nav {
    position: relative;
  }

  img {
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 900px){
    flex-direction: column;
  }

  @media screen and (max-width: 700px){
    flex-direction: row;
    padding: 0.8rem 1.6rem;
    align-items: center;
  }
`;

export const ListNavDesktop = styled.ul`
  display: flex;
  gap: 4.8rem;

  li {
   font-size: 2rem;
  }

  @media screen and (max-width: 700px){
    display: none;
  }
`;

export const Hamburguer = styled.span<{ menuOpen: boolean }>`
  position: absolute;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.details};
  width: 4rem;
  height: 0.4rem;
  top: -0.5rem;
  cursor: pointer;
  background: ${({ menuOpen }) => menuOpen && 'transparent'};
  transition: 0.2s ease-in-out;
  z-index: 5;

  ${({ menuOpen, theme }) => !menuOpen && css`
    ::after, ::before {
      content: '';
      background-color: ${theme.colors.details};
      width: 3.5rem;
      height: 0.4rem;
      position: absolute;
      transition: 0.2s ease-in-out;
    }

    ::after {
      top: -1rem;
    }

    ::before {
      top: 1rem;
    }
  `}

  ${({ menuOpen, theme }) => menuOpen && css`
    position: fixed;
    top: 3.5rem;
    right: 1rem;

    ::after, ::before{
      content: '';
      background-color: ${theme.colors.details};
      width: 4rem;
      height: 0.4rem;
      top: -0.5rem;
      position: absolute;
      transition: 0.2s ease-in-out;
    }

    ::after{
      transform: rotate(45deg);
    }

    ::before {
      transform: rotate(-45deg);
    }
  `}
`;

export const ListNavMobile = styled.ul<{ menuOpen: boolean }>`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.4rem;
  animation: ${fadeIn} 0.5s;
  background: ${({ theme }) => theme.colors.darkBg};
`;
