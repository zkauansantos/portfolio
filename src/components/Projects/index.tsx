import { SiGithub } from 'react-icons/si';
import { FcDeployment } from 'react-icons/fc';

import { projects } from '../../mocks/projects';

import {
  CardProject,
  Container,
  ContainerWrapper,
  DescriptionCard,
  Slide,
} from './styles';

import ImagesCarousel from '../ImagesCarousel';

export default function Projects() {
  return (
    <Container id='projects'>
      <h3>Projetos</h3>

      <ContainerWrapper>
        {projects.map((project, i) => (
          <Slide key={project.id} gridRow={i + 1} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
            <CardProject>
              <ImagesCarousel images={project.imagesPaths} />

              <strong>{project.name}</strong>

              <div className='links'>
                <a href={project.deploy} target='_blank' rel='noreferrer'>
                  <FcDeployment />
                  <span>Deploy</span>
                </a>
                <a href={project.gitUrl} target='_blank' rel='noreferrer'>
                  <SiGithub />
                  <span>Repositório</span>
                </a>
              </div>
            </CardProject>

            <DescriptionCard>
              <strong>Descrição</strong>
              <p>
                {project.description}
              </p>
            </DescriptionCard>
          </Slide>
        ))}
      </ContainerWrapper>
    </Container>
  );
}
