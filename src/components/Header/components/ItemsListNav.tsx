import { Link } from 'react-scroll';
import { Item } from './styles';

interface ItemsListNavProps {
  onCloseMenu?: () => void;
}

const defaultProps : ItemsListNavProps = {
  onCloseMenu: () => {},
};

export default function ItemsListNav({ onCloseMenu }: ItemsListNavProps) {
  return (
    <>
      <Item>
        <Link
          to='about'
          onClick={onCloseMenu}
          smooth
          duration={700}
          className='marked'
        >
          Sobre
        </Link>
      </Item>

      <Item>
        <Link
          to='skills'
          onClick={onCloseMenu}
          smooth
          duration={700}
        >
          Skills
        </Link>
      </Item>

      <Item>
        <Link
          to='projects'
          onClick={onCloseMenu}
          smooth
          duration={700}
        >
          Projetos
        </Link>
      </Item>

      <Item>
        <Link
          to='contact'
          onClick={onCloseMenu}
          smooth
          duration={900}
        >
          Contato
        </Link>
      </Item>
    </>
  );
}

ItemsListNav.defaultProps = defaultProps;
