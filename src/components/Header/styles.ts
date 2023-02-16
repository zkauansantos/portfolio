import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { transform: translateY(-150px); }
  to { transform: translateY(0); }
`;

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 0px 120px;

  nav {
    position: relative;
  }

  img {
    margin-top: 8px;
  }

  @media screen and (max-width: 950px) {
    padding: 0px 40px;
  }

  @media screen and (max-width: 800px){
    flex-direction: column;
    padding: 16px 0px;
  }

  @media screen and (max-width: 450px){
    flex-direction: row;
    padding: 0px 16px;
    align-items: center;
  }
`;

export const ListNav = styled.ul`
  gap: 64px;
  display: flex;

  li {
   font-size: 20px;
   font-weight: 700;
  }

  .marked {
    color: ${({ theme }) => theme.colors.markText};
  }

  @media screen and (max-width: 450px){
    display: none;
  }
`;

export const Hamburguer = styled.span<{ menuOpen: boolean }>`
  position: absolute;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.details};
  width: 40px;
  height: 4px;
  top: -5px;
  cursor: pointer;
  background: ${({ menuOpen }) => menuOpen && 'transparent'};
  transition: 0.2s ease-in-out;
  z-index: 5;

  ${({ menuOpen, theme }) => !menuOpen && css`
    ::after, ::before {
      content: '';
      background-color: ${theme.colors.details};
      width: 35px;
      height: 4px;
      position: absolute;
      transition: 0.2s ease-in-out;
    }

    ::after {
      top: -10px;
    }

    ::before {
      top: 10px;
    }
  `}

  ${({ menuOpen, theme }) => menuOpen && css`
    ::after, ::before{
      content: '';
      background-color: ${theme.colors.details};
      width: 40px;
      height: 4px;
      top: -5px;
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

export const ListNavMobile = styled.ul`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  animation: ${fadeIn} 0.5s;
  background: ${({ theme }) => theme.colors.darkBg};
`;
