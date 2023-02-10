import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import { theme } from '../assets/styles/theme';
import { GlobalStyles } from '../assets/styles/GlobalStyles';
import Welcome from '../components/Welcome';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Welcome />
    </ThemeProvider>
  );
}
