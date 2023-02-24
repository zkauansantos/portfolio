import { Container } from './styles';
import detailAbout from '../../assets/imgs/detailAbout.svg';

export default function About() {
  return (
    <Container data-aos='fade-up' id='about'>
      <img src={detailAbout} alt='detail' />

      <p>
        Sou Kauan um desenvolvedor Front-End apaixonado por criar
        experiências incríveis para os usuários. Desde pequeno sempre fui
        muito curioso em questão de tecnologia e quando
        conheci o mundo da programação me identifiquei de cara com o front-end,
        atualmente tenho 19 anos e a cada dia venho me especializando em ReactJs,
        React Native, Typescript e NodeJs também faço faculdade e estou graduando
        Análise e Desenvolvimento de Sistemas no 4º Semestre na Estácio.
      </p>
    </Container>
  );
}
