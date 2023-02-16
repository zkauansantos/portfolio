import {
  AiOutlineMail,
  AiFillGithub,
  AiOutlineWhatsApp,
  AiFillLinkedin,
} from 'react-icons/ai';

import {
  Contact,
  Container,
  Description,
  SocialLinks,
} from './styles';

import logo from '../../assets/imgs/logo.svg';

export default function Footer() {
  return (
    <Container id='contact'>
      <Description>
        <img src={logo} alt='logo' />

        <p>
          Se você gostou do meu trabalho e precisa de mim, entre em contato comigo.
        </p>
      </Description>

      <Contact>
        <h3>Contato</h3>

        <SocialLinks>
          <a
            href='https://mail.google.com/mail/?view=cm&to=kauansantosdepontes@gmail.com'
            target='_blank'
            rel='noreferrer'
          >
            <span><AiOutlineMail /></span>
            kauansantosdepontes@gmail.com
          </a>

          <a
            className='mg'
            href='https://github.com/zkauansantos'
            target='_blank'
            rel='noreferrer'
          >
            <span><AiFillGithub /></span>
            zkauansantos
          </a>

          <a
            href='https://linkedin/in/zkauansantos'
            target='_blank'
            rel='noreferrer'
          >
            <span><AiOutlineWhatsApp /></span>
            (61) 98255-2480
          </a>

          <a
            className='mg'
            href='https://linkedin.com/in/zkauansantos'
            target='_blank'
            rel='noreferrer'
          >
            <span><AiFillLinkedin /></span>
            in/zkauansantos
          </a>
        </SocialLinks>
      </Contact>
    </Container>
  );
}
