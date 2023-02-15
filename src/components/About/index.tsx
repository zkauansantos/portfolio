import { Container } from './styles';
import detailAbout from '../../assets/imgs/detailAbout.svg';

export default function About() {
  return (
    <Container data-aos='fade-up'>
      <img src={detailAbout} alt='detail' />

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Quia repellendus, iste neque unde cupiditate porro.
        Dolorem ratione veniam consequatur exercitationem odit,
        quaerat atque expedita blanditiis reprehenderit quia? Fugiat, beatae nobis.
      </p>
    </Container>
  );
}
