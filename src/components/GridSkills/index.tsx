import { skills } from '../../utils/stackDatas';
import { Container } from '../Container';
import { Icon } from '../Icon';
import { Overlay } from '../Overlay';
import { Card, Content, Grid } from './styles';

export default function GridSkills() {
  return (
    <Container id="skills">
      <Overlay bg="#00020C">
        <Content>
          <h2>Skills</h2>

          <Grid>
            {skills.map((skill) => (
              <Card
                key={skill.name}
              >
                <Icon as={skill.icon} fontSize={32} />
                <h3 className="h3">{skill.name}</h3>
                <p>{skill.description}</p>
              </Card>
            ))}
          </Grid>
        </Content>
      </Overlay>
    </Container>
  );
}
