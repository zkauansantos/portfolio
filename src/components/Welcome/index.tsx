import { AiFillGithub, AiOutlineCloudDownload } from 'react-icons/ai';
import { Container, ContainerText, Illustrations } from './styles';
import mySelf from '../../assets/imgs/mySelf.svg';

export default function Welcome() {
  return (
    <Container>
      <ContainerText data-aos='fade-right'>
        <h1>Kauan Santos</h1>
        <strong>Desenvolvedor Front-End</strong>
        <p>Frontend developer looking for ideas and projects for himself and others</p>

        <div className='social-links'>
          <a
            href='https://github.com/zkauansantos'
            target='_blank'
            rel='noreferrer'
          >
            <span>
              <AiFillGithub />
            </span>
            GitHub
          </a>

          <a
            href='w'
            target='_blank'
          >
            <AiOutlineCloudDownload />
            Curriculo CV
          </a>
        </div>

      </ContainerText>

      <Illustrations data-aos='fade-left'>
        <img src={mySelf} alt='Foto Kauan Santos' />
      </Illustrations>
    </Container>
  );
}
