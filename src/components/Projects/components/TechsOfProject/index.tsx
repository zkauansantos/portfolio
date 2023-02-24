/* eslint-disable react/no-array-index-key */
import { IconType } from 'react-icons/lib';
import { ContainerTechs } from './styles';

interface TechsProps {

  technologies: IconType[]
}

export default function Techs({ technologies }: TechsProps) {
  return (
    <ContainerTechs>
      {technologies.map((Tech, i) => (
        <div key={i}><Tech size={20} /></div>
      ))}
    </ContainerTechs>
  );
}
