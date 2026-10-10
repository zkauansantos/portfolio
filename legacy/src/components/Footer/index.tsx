import { Container } from '../Container';
import { Overlay } from '../Overlay';
import SocialLinks from '../SocialLinks';
import { Content } from './styles';
import logo from '../../assets/imgs/logo.svg';

export default function Footer() {
  return (
    <Container as="footer" id="contact">
      <Overlay bg="#000512">
        <Content>
          <div className="powered">
            <strong>Powered by</strong>
            <img src={logo} alt="logo" />
          </div>

          <div className="contacts">
            <strong>Contatos</strong>
            <SocialLinks contacts />
          </div>
        </Content>
      </Overlay>
    </Container>
  );
}
