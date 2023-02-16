/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { useWidth } from '../../hooks/useWidth';

import logo from '../../assets/imgs/logo.svg';
import ItemsListNav from './components/ItemsListNav';

import {
  Container,
  Hamburguer,
  ListNav,
  ListNavMobile,
} from './styles';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWidth();

  function handleToggleMenu() {
    setMenuOpen((prevState) => (prevState === false));
  }

  return (
    <Container>
      <img src={logo} alt='logo' />

      <nav>
        {width > 451 && (
        <ListNav>
          <ItemsListNav />
        </ListNav>
        )}

        {width < 451 && (
          <Hamburguer menuOpen={menuOpen} onClick={handleToggleMenu} />
        )}

        {menuOpen && (
        <ListNavMobile>
          <ItemsListNav />
        </ListNavMobile>
        )}
      </nav>
    </Container>
  );
}
