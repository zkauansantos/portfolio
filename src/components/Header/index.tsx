/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import useWidth from '../../hooks/useWidth';
import {
  Container, Hamburguer, ListNav, ListNavMobile, ContainerNavMobile,
} from './styles';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWidth();

  function handleOpenMenu() {
    setMenuOpen((prevState) => (prevState === false));
  }

  return (
    <Container>
      <strong>LOGO</strong>

      <nav>
        {width > 451 && (
        <ListNav>
          <li>Sobre mim</li>
          <li>Skills</li>
          <li>Projetos</li>
          <li>Contato</li>
        </ListNav>
        )}

        {width < 451 && (
        <ContainerNavMobile>
          <Hamburguer
            onClick={handleOpenMenu}
            menuOpen={menuOpen}
          />

          {menuOpen && (
            <ListNavMobile>
              <li>Sobre mim</li>
              <li>Skills</li>
              <li>Projetos</li>
              <li>Contato</li>
            </ListNavMobile>
          )}
        </ContainerNavMobile>
        )}
      </nav>
    </Container>
  );
}
