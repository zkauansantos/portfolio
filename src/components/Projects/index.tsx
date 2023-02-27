import { SiGithub } from 'react-icons/si';
import { FcDeployment } from 'react-icons/fc';

import { projects } from '../../mocks/projects';

import {
  CardProject,
  Container,
  ContainerWrapper,
  Slide,
} from './styles';

import ImagesCarousel from '../ImagesCarousel';
import Techs from './components/TechsOfProject';

export default function Projects() {
  return (
    <Container id='projects'>
      <h3>Projetos</h3>

      <ContainerWrapper>
        {projects.map((project, i) => (
          <Slide key={project.id} gridRow={i + 1} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>

            <CardProject>
              <strong>{project.name}</strong>

              <ImagesCarousel images={project.imagesPaths} />

              <p>{project.description}</p>

              <div className='links'>
                <a
                  href={project.deploy}
                  target='_blank'
                  rel='noreferrer'
                >
                  <FcDeployment />
                  <span>Deploy</span>
                </a>

                <a
                  href={project.gitUrl}
                  target='_blank'
                  rel='noreferrer'
                >
                  <SiGithub />
                  <span>Repositório</span>
                </a>
              </div>

              <Techs
                technologies={project.technologies}
              />
            </CardProject>
          </Slide>
        ))}
      </ContainerWrapper>
    </Container>
  );
}
