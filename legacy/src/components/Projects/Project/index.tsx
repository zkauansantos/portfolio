import { AiOutlineGithub } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { Container } from './styles';

interface ProjectProps {
  project: {
    image: string;
    name: string;
    repos: {
      name: string;
      url: string
    }[]
    url: string;
    type: string;
    status: string;
  }
}

export default function Project({ project }: ProjectProps) {
  const {
    name,
    image,
    repos,
    url,
    type,
    status,
  } = project;

  return (
    <Container
      key={name}
      bg={image}
    >
      <div className="header">
        <strong>{name}</strong>

        <strong>{type}</strong>
      </div>

      <div className="links">
        <div className="repos">
          <AiOutlineGithub size={32} />
          {repos.map((repo) => (
            <a
              key={repo.name}
              target="_blank"
              href={repo.url}
              rel="noreferrer"
            >
              {repo.name}
            </a>
          ))}
        </div>

        <a
          target="_blank"
          href={url}
          className="deploy"
          rel="noreferrer"
        >
          <FiExternalLink size={32} />
          Deploy
        </a>
      </div>

      <strong className="status">{status}</strong>
    </Container>
  );
}
