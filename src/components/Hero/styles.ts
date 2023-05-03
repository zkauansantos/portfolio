import styled, { keyframes } from 'styled-components';
import { Container } from '../Container';
import mySelf from '../../assets/imgs/mySelf.svg';

export const ContainerMain = styled(Container)`
  min-height: calc(100vh - 9.4rem);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px){
    min-height: 80vh;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 124rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;

  @media screen and (max-width: 900px){
    flex-direction: column;
    margin-top: 2.4rem;
  }

  @media screen and (max-width: 525px){
    margin-top: 0;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.markText};
    font-size: 6.8rem;
    background-color: rgba(0, 5, 18, .2);
    transition: 1s ease-in;
  }

  strong {
    font-size: 4rem;
    margin-bottom: 0.4rem;
    background-color: rgba(0, 5, 18, .2);
    transition: 1s ease-in;
  }

  p {
    font-size: 2rem;
    background-color: rgba(0, 5, 18, .2);
    transition: 1s ease-in;
  }

  @media screen and (max-width: 900px){
    width: 100%;
    align-items: center;

    h1 {
      font-size: 6.2rem;
    }

    strong{
      font-size: 3.2rem;
    }

    p{
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 525px){
    h1 {
      font-size: 5.6rem;
    }

    strong{
      font-size: 2.8rem;
    }

    p{
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 425px){
    h1 {
      font-size: 4.8rem;
    }

    strong{
      font-size: 2.4rem;
    }
  }

  @media screen and (max-width: 340px){
    h1 {
      font-size: 4.4rem;
    }

    strong{
      font-size: 2rem;
    }

    p {
      font-size: 1.4rem
    }
  }
`;

export const fadeIn = keyframes`
  40% {
    opacity: 0.5;
  }

  60% {
    opacity: 0.8;
  }

  80% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

export const Image = styled.div`
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.darkBg};
  background: url(${mySelf}) center center no-repeat;
  background-size: contain;
  height: 80rem;
  width: 40rem;
  transition: 1s ease;
  animation: ${fadeIn} 5s linear infinite;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);

  @media screen and (max-width: 900px){
    height: 60rem;
    width: 30rem;
  }

  @media screen and (max-width: 525px){
    margin-top: 2.4rem;
    height: 40rem;
    width: 25rem ;
  }
`;
