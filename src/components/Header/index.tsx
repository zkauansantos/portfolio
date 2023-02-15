/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { Link } from 'react-scroll';

import useWidth from '../../hooks/useWidth';

import {
  Container,
  Hamburguer,
  ListNav,
  ListNavMobile,
  ContainerNavMobile,
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
          <li>
            <Link
              style={{ cursor: 'pointer' }}
              activeClass='marked'
              to='about'
              smooth
              offset={-70}
              duration={500}
              className='marked'
            >
              Sobre
            </Link>
          </li>

          <li>
            <Link
              style={{ cursor: 'pointer' }}
              activeClass='marked'
              to='skills'
              smooth
              offset={-70}
              duration={500}
            >Skills
            </Link>
          </li>

          <li>
            <Link
              style={{ cursor: 'pointer' }}
              activeClass='marked'
              to='projects'
              smooth
              offset={-70}
              duration={500}
            >
              Projetos
            </Link>
          </li>

          <li>
            <Link
              style={{ cursor: 'pointer' }}
              activeClass='marked'
              to='contact'
              smooth
              offset={-70}
              duration={500}
            >
              Contato
            </Link>
          </li>
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
