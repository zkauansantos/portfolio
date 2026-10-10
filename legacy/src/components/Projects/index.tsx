import { Container } from '../Container';
import { Overlay } from '../Overlay';
import { Content, GridProjects } from './styles';
import { projects } from '../../utils/projectsData';
import Project from './Project';

export default function Projects() {
  return (
    <Container id="projects">
      <Overlay bg="#00020C">
        <Content>
          <h2>Projetos</h2>

          <GridProjects>
            {projects.map((project) => (
              <Project
                key={project.name}
                project={project}
              />
            ))}
          </GridProjects>
        </Content>
      </Overlay>
    </Container>
  );
}
