import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiTypescript,
  SiStyledcomponents,
  SiRedux,
  SiGit,
  SiNodedotjs,
  SiTailwindcss,
} from 'react-icons/si';
// import useWidth from '../../hooks/useWidth';

import { Container } from './styles';

export default function Skills() {
  const skills = [
    { icon: <SiHtml5 size={150} />, name: 'HTML5' },
    { icon: <SiCss3 size={150} />, name: 'CSS3' },
    { icon: <SiJavascript size={150} />, name: 'Javascript' },
    { icon: <SiReact size={150} />, name: 'ReactJS' },
    { icon: <SiTypescript size={150} />, name: 'Typescript' },
    { icon: <SiStyledcomponents size={150} />, name: 'Styled-Components' },
    { icon: <SiRedux size={150} />, name: 'Redux' },
    { icon: <SiGit size={150} />, name: 'Git' },
    { icon: <SiNodedotjs size={150} />, name: 'NodeJs' },
    { icon: <SiTailwindcss size={150} />, name: 'Tailwindcss' },
  ];

  return (
    <Container>
      <h3>Skills</h3>

      <div>
        {skills.map((skill) => (
          <div className='card-skill' key={skill.name}>
            {skill.icon}
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
