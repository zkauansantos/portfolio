import { ThemeProvider } from 'styled-components';

import { theme } from '../assets/styles/theme';
import { GlobalStyles } from '../assets/styles/GlobalStyles';

import Header from '../components/Header';
import Welcome from '../components/Welcome';
import About from '../components/About';
import Skills from '../components/Skills';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Welcome />
      <About />
      <Skills />
    </ThemeProvider>
  );
}
