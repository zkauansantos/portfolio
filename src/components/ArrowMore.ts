import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  50%{opacity: 0.7; transform: translateY(-4px);}
  70%{opacity: 0.8; transform: translateY(-3px);}
  90%{opacity: 0.9; transform: translateY(-2px);}
  100% {opacity: 1; transform: translateY(-0px);}
`;

export const Arrow = styled.div`
  position: absolute;
  color: white;
  bottom: -15px;
  left: 50%;
  transform: translateY(50%);
  transform: translateX(50%);
  background-color: white;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.8s infinite;

  ::before{
    content: '';
    top: 0;
    left: 0;
    width: 45px;
    height: 3px;
    background: ${({ theme }) => theme.colors.details};
    position: absolute;
    transform: rotate(130deg);
    /* animation: ${fadeIn}; */
  }

  ::after{
    content: '';
    top: 0;
    right: -16px;
    width: 45px;
    height: 3px;
    background: ${({ theme }) => theme.colors.details};
    position: absolute;
    transform: rotate(-130deg);
    /* animation: ${fadeIn}; */
  }
`;
