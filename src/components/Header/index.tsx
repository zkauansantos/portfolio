/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { useWidth } from '../../hooks/useWidth';

import logo from '../../assets/imgs/logo.svg';

import {
  Container,
  Content,
  Hamburguer,
  ListNavDesktop,
  ListNavMobile,
} from './styles';
import { menuNavigationsLinks } from '../../utils/menuNavigationsLinks';
import ItemListNav from './ItemListNav';
import useScrollToTop from '../../hooks/useScrollToTop';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWidth();
  const isTop = useScrollToTop();

  function handleToggleMenu() {
    setMenuOpen((prevState) => (prevState === false));
  }

  return (
    <Container isTop={isTop}>
      <Content>
        <img src={logo} alt="logo" />

        <nav>
          {width > 700 && (
            <ListNavDesktop>
              {menuNavigationsLinks.map((item) => (
                <ItemListNav
                  key={item[0]}
                  labels={item}
                  onCloseMenu={handleToggleMenu}
                />
              ))}
            </ListNavDesktop>
          )}

          {width <= 700 && (
            <Hamburguer menuOpen={menuOpen} onClick={handleToggleMenu} />
          )}

          {(menuOpen && width <= 700) && (
            <ListNavMobile menuOpen={menuOpen}>
              {menuNavigationsLinks.map((item) => (
                <ItemListNav
                  key={item[0]}
                  labels={item}
                  onCloseMenu={handleToggleMenu}
                />
              ))}
            </ListNavMobile>
          )}
        </nav>
      </Content>
    </Container>
  );
}
