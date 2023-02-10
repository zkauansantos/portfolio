import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inconsolata' sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  body {
    background: ${({ theme }) => theme.colors.lightBg};
  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }
`;
