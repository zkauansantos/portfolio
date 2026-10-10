import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../assets/styles/GlobalStyles';
import { theme } from '../assets/styles/theme';

import Header from '../components/Header';
import Home from '../pages/Home';
import Footer from '../components/Footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}
