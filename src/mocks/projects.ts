import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiTypescript,
  SiStyledcomponents,
  SiRedux,
  SiNodedotjs,
} from 'react-icons/si';

export const projects = [
  {
    id: 1,
    gitUrl: 'https://github.com/zkauansantos/frontEndMyContacts',
    name: 'My Contacts',
    imagesPaths: ['', '', ''],
    description: 'Um CRUD de contatos onde você pode cadastrar, editar, deletar, e ver seus contatos, uma ótima opção pra você que tem muitos clientes e amigos.',
    technologies: [SiJavascript, SiHtml5, SiStyledcomponents, SiReact, SiNodedotjs, SiTypescript],
    deploy: '#',
  },
  {
    id: 2,
    gitUrl: 'https://github.com/zkauansantos/questPokeAPI',
    name: 'Pokedéx',
    imagesPaths: ['', '', ''],
    description: 'Aqui nesse projeto você pode ver todos seus pokemons favoritos e ainda sim ver suas habilidades.',
    technologies: [SiJavascript, SiHtml5, SiCss3, SiReact, SiStyledcomponents],
    deploy: 'https://questpoke.netlify.app',
  },
  {
    id: 3,
    gitUrl: 'https://github.com/zkauansantos/',
    name: 'WaiterApp',
    imagesPaths: ['', '', ''],
    description: 'Pra você que tem seu restaurante, aqui o objetivo é otimizar a produtividade da sua cozinha, onde o garçom faz os pedidods pelo celular e a cozinha pode vizualizar todos os pedidos.',
    technologies: [SiJavascript, SiHtml5, SiStyledcomponents, SiReact, SiNodedotjs, SiTypescript],
    deploy: '#',
  },
  {
    id: 4,
    gitUrl: 'https://github.com/zkauansantos/IBGEapi',
    name: 'Ibge Infos',
    imagesPaths: ['', '', ''],
    description: 'Aqui você pode ver todos detalhes dos seus estados e municípios e ver suas regiões, mesorregiões, e microrregiões',
    technologies: [SiJavascript, SiHtml5, SiCss3, SiReact, SiStyledcomponents, SiRedux],
    deploy: 'https://ibg-eapi.vercel.app/',
  },
  {
    id: 5,
    gitUrl: 'https://github.com/zkauansantos/',
    name: 'Portifólio',
    imagesPaths: ['', '', ''],
    description: 'Meu portfólio e você já está nele agora hahaha 😄',
    technologies: [SiJavascript, SiHtml5, SiCss3, SiReact, SiStyledcomponents],
    deploy: '#',
  },
];
