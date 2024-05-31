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
            Desenvolvedor atuando ativamente no mercado desde há 2 anos . Minhas
            principais techs são Javascript, Typescript, React, React Native e
            NodeJs porém sempre buscando novos conhecimentos. Minha motivação
            para começar a programar foi porque sempre fui muito curioso em
            relação às tecnologias e me apaixonei de cara após perceber que a
            programação permite criar soluções incríveis para os mais diversos
            problemas. Desde então, venho me aperfeiçoando a cada dia e atuando
            como desenvolvedor Front-end/Mobile. Proeficiência em integrações de
            sistemas utilizando API’s REST e Graphql. Sempre prezando pela
            qualidade e segurança de código. Busco oportunidade que me permita
            crescimento técnico e profissional contribuindo para o crescimento
            da empresa.
          </p>
        </Content>
      </Overlay>
    </Container>
  );
}
