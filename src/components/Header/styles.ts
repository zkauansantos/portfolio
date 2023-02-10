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

  strong {
    font-size: 28px;
  }

  @media screen and (max-width: 800px){
    flex-direction: column;
    padding: 16px 0px;

    strong {
      margin-bottom: 18px;
    }
  }

  @media screen and (max-width: 450px){
    flex-direction: row;
    padding: 0;
    align-items: center;

    strong {
      margin-bottom: 0;
      margin-left: 15px;
    }
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

export const ContainerNavMobile = styled.div`
  position: relative;
`;

export const Hamburguer = styled.span<{ menuOpen: boolean }>`
  position: absolute;
  right: 15px;
  background-color: ${({ theme }) => theme.colors.details};
  width: 40px;
  height: 4px;
  top: -3px;
  background: ${({ menuOpen }) => menuOpen && 'transparent'};
  transition: 0.2s ease-in-out;
  z-index: 5;

  ${({ menuOpen, theme }) => !menuOpen && css`
  ::after {
    content: '';
    background-color: ${theme.colors.details};
    width: 35px;
    height: 4px;
    top: -10px;
    position: absolute;

  }
  ::before {
    content: '';
    background-color: ${theme.colors.details};
    width: 35px;
    height: 4px;
    top: 10px;
    position: absolute;
    transition: 0.2s ease-in-out;
  }`}

  ${({ menuOpen, theme }) => menuOpen && css`
  ::after {
    content: '';
    background-color: ${theme.colors.details};
    width: 40px;
    height: 4px;
    top: -5px;
    transform: rotate(45deg);
    position: absolute;
    transition: 0.2s ease-in-out;
  }

  ::before {
    content: '';
    background-color: ${theme.colors.details};
    width: 40px;
    top: -5px;
    height: 4px;
    transform: rotate(-45deg);
    position: absolute;
    transition: 0.2s ease-in-out;
  }`}
`;

export const ListNavMobile = styled.ul`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  flex-direction: column;
  animation: ${fadeIn} 0.5s;


  li {
    font-size: 20px;
    font-weight: 700;
  }

  li:first-child{
    color: ${({ theme }) => theme.colors.markText};
  }
`;
