import { socialData } from '../../utils/socialData';
import { Icon } from '../Icon';
import { Container } from './styles';

interface SocialLinksProps {
  contacts?: boolean
}

export default function SocialLinks({ contacts = false }: SocialLinksProps) {
  const filteredSocialData = contacts
    ? socialData.filter((social) => (
      social.name === 'whatsapp' || social.name === 'linkedin' || social.name === 'email'
    ))
    : socialData.filter((social) => (
      social.name === 'github' || social.name === 'linkedin' || social.name === 'cv'
    ));

  return (
    <Container>
      {filteredSocialData.map((social) => (
        <a
          key={social.name}
          target="_blank"
          href={social.url}
          rel="noreferrer"
          download={!!social.donwload && social.donwload}
        >
          <Icon as={social.icon} size={26} />
        </a>
      ))}
    </Container>
  );
}
