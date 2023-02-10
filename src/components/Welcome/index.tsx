import { Container, ContainerText, Illustrations } from './styles';
import mySelf from '../../assets/imgs/mySelf.svg';

export default function Welcome() {
  return (
    <Container>
      <ContainerText>
        <h1>Kauan Santos</h1>
        <strong>Desenvolvedor Front-End</strong>
        <p>Frontend developer looking for ideas and projects for himself and others</p>
      </ContainerText>
      <Illustrations>
        <img src={mySelf} alt='Foto Kauan Santos' />
      </Illustrations>
    </Container>
  );
}
