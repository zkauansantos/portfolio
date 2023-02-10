import styled, { keyframes } from 'styled-components';
import bgIllustrations from '../../assets/imgs/bgIllustrations.svg';

const IllustrationInfinityAnimation = keyframes`
  50%{opacity: 0.7; transform: translateY(-4px);}
  70%{opacity: 0.8; transform: translateY(-3px);}
  90%{opacity: 0.9; transform: translateY(-2px);}
  100% {opacity: 1; transform: translateY(-0px);}
`;

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 68px;
  gap: 100px;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-weight: 900;
    color: ${({ theme }) => theme.colors.markText};
    font-size: 64px;
  }

  strong {
    font-weight: 700;
    font-size: 40px;
  }

  p {
    font-size: 20px;
  }
`;

export const Illustrations = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 629px;
  height: 420px;
  background: url(${bgIllustrations});

  img {
    animation: ${IllustrationInfinityAnimation} 1s linear infinite;
  }
`;
