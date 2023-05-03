import styled from 'styled-components';

export const Container = styled.div<{ bg : string }>`
height: 40rem;
  max-width: 100%;
  background: url(${({ bg }) => bg}) center center no-repeat;
  background-size: cover;
  border-radius: 4px;
  border: 1px solid rgba(174, 218, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-style: italic;
  position: relative;

  * {
    transition: 0.5s ease-in;
    z-index: 2;
    opacity: 0;
  }

  ::before{
    content: '';
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    width: 0%;
    height: 0%;
    transition: 0.2s ease-in;
    background: rgba(0,0,0, 0.99);
  }

  &:hover{
    * {
      opacity: 1;
    }

    ::before {
      width: 101%;
      height:101%;
    }
  }

  a {
    position: relative;

    :hover{
      color: ${({ theme }) => theme.colors.markText}
    }

    &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: -7px;
    left: 0;
    background: linear-gradient(
      270deg,
      ${({ theme }) => theme.colors.markText} 0%,
      #17161d 100%
    );
    transform-origin: bottom right;
    transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    }

    &:hover::after {
      transform: scaleY(1);
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  .header {
    width: 100%;
    background: ${({ theme }) => theme.colors.lightBg};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;

    strong {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.details};
      color: #000;
    }
  }

  .links {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
    padding: 2rem;
    font-size: 1.8rem;

   .repos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
   }

   .deploy {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
    }
  }

  .status {
    width: 100%;
    padding: 2rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.details};
  }
`;
