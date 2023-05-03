import {
  ContainerMain, ContainerText, Content, Image,
} from './styles';
import ParticlesAnimated from '../Particles';
import SocialLinks from '../SocialLinks';

export default function Hero() {
  return (
    <ContainerMain as="main" id="home">
      <Content>

        <ContainerText>
          <h1>Kauan Santos</h1>
          <strong>Desenvolvedor Front-End</strong>
          <p>Hello World! Seja bem-vindo(a) ao meu portfólio</p>

          <SocialLinks />
        </ContainerText>

        <Image />

      </Content>
      <ParticlesAnimated />
    </ContainerMain>
  );
}
