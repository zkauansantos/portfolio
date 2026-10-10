import { Link } from 'react-scroll';
import { Item } from './styles';

interface ItemListNavProps {
  onCloseMenu: () => void;
  labels: string[]
}

export default function ItemListNav({ onCloseMenu, labels }: ItemListNavProps) {
  return (
    <Item onClick={onCloseMenu}>
      <Link
        to={labels[1]}
        onClick={onCloseMenu}
        smooth
        duration={700}
        className="marked"
      >
        {labels[0]}
      </Link>
    </Item>
  );
}
