import { ThemeProvider } from 'styled-components';

import { useEffect } from 'react';
import Aos from 'aos';
import { theme } from '../assets/styles/theme';
import { GlobalStyles } from '../assets/styles/GlobalStyles';
import 'aos/dist/aos.css';

import Header from '../components/Header';
import Welcome from '../components/Welcome';
import About from '../components/About';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import { Container } from './styles';
import Projects from '../components/Projects';

export default function App() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Welcome />
        <About />
        <Skills />
        <Projects />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
