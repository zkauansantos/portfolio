import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Archivo', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  html, body {
    font-size: 62.5%;
    background: ${({ theme }) => theme.colors.darkBg};
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.darkBg};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.details};
  }
`;
