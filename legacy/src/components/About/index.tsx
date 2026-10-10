import { Container } from '../Container';
import { Overlay } from '../Overlay';
import { Content } from './styles';

export default function About() {
  return (
    <Container id="about">
      <Overlay bg="#000512">
        <Content>
          <h2>Sobre</h2>

          <p>
            Desenvolvedor Fullstack JS. Atuo no mercado há 3-4 anos,
            desenvolvendo aplicações web e mobile com tecnologias como Next.js,
            Angular, Nestjs, React e TypeScript. Tenho experiência na construção
            de interfaces, consumo de APIs, GraphQL e desenvolvimento de
            backends para integração com aplicações. Além disso, possuo
            conhecimento em AWS para hospedagem e gerenciamento de serviços,
            seguindo boas práticas de desenvolvimento e arquitetura de software.
          </p>
        </Content>
      </Overlay>
    </Container>
  );
}
