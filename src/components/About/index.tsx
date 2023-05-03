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
            Sou um desenvolvedor que atua na área há cerca de 1 ano.
            Minhas principais techs são Javascript, Typescript, React, React Native e NodeJs,
            porém sempre busco novos conhecimentos.
            Minha motivação para começar a programar foi porque sempre fui muito curioso em relação
            às tecnologias e me apaixonei de cara após perceber que a programação
            permite criar soluções incríveis para os mais diversos problemas.
            Desde então, venho me aperfeiçoando a cada dia e tenho como objetivo atuar
            como desenvolvedor Front-end/Mobile.
            Atualmente, tenho 19 anos,
            faço faculdade e estou no 4º semestre do curso
            de Análise e Desenvolvimento de Sistemas na Estácio.
          </p>
        </Content>
      </Overlay>
    </Container>
  );
}
