import { Link } from 'react-scroll';
import { Item } from './styles';

export default function ItemsListNav() {
  return (
    <>
      <Item>
        <Link
          to='about'
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
          smooth
          duration={700}
        >
          Skills
        </Link>
      </Item>

      <Item>
        <Link
          to='projects'
          smooth
          duration={700}
        >
          Projetos
        </Link>
      </Item>

      <Item>
        <Link
          to='contact'
          smooth
          duration={900}
        >
          Contato
        </Link>
      </Item>
    </>
  );
}
