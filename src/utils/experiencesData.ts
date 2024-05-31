export const experiencesData: Array<{
  id: number;
  imgCompany: string;
  company: string;
  duration: string;
  jobRole: string;
  abreviation: string;
  description?: string;
  activities: Array<string>;
}> = [
  {
    id: 5,
    imgCompany:
      'https://media.licdn.com/dms/image/D4E0BAQHjrvpJTMF-OA/company-logo_100_100/0/1697553453116/gofluxstation_logo?e=1725494400&v=beta&t=w5ZOSznCi40l6JHIGnAPj5JCOkAQpsDh7S2FQjmzyx4',
    company: 'Fluxstation',
    duration: 'Fevereiro de 2024 - Atual',
    jobRole: 'Desenvolvedor Fullstack',
    abreviation: 'Fluxstation',
    activities: [
      'Atuo como desenvolvedor Fullstack/ Mobile utilizando tecnologias como React Native, Expo, TypeScript, NestJS, Next e AWS. Meu foco principal está em um aplicativo de gestão para motoristas, no qual integro diversas APIs e serviços, tais como OneSignal, Google APIs, RevenueCat e DataDog, para fornecer funcionalidades avançadas, análise de dados. Utilizo bibliotecas como React Hook Form para a criação de formulários eficientes, e para lidar com validações de dados, recorro ao Zod. Além disso, faço uso do Axios e SWR para realizar requisições fetch de forma segura e eficiente. Atuo também de forma secundária no projeto Web onde temos integrações em tempo real com pátios logísticos, utilizando outras techs como Tailwindcss, Chackra UI.',
    ],
  },
  {
    id: 4,
    imgCompany:
      'https://media.licdn.com/dms/image/C4D0BAQEbpXvEMioABA/company-logo_100_100/0/1635539683602/seatecnologia_logo?e=1725494400&v=beta&t=uS_VTBKGMREx3tFGF9uwhg6Ou2O2kpPIvCer0hY6z4w',
    company: 'SEA Tecnologia',
    duration: 'Setembro de 2023 - Fevereiro de 2024',
    jobRole: 'Desenvolvedor Front-end',
    abreviation: 'SEA',
    activities: [
      'Desenvolvimento utilizando React JS, JavaScript e TypeScript, em conjunto com a plataforma Liferay.',
      'Desenvolvimento de portais e intranets para clientes como Exército Brasileiro, Sesc e CLDF.',
      'Refatoração e Manutenção de códigos utilizando boas práticas.',
      'Metodologia scrum trabalhando com prazos e qualidade para a entrega ao cliente.',
    ],
  },
  {
    id: 3,
    imgCompany:
      'https://media.licdn.com/dms/image/D4D0BAQFQz6mEEqlD1g/company-logo_100_100/0/1690917350745/ebc_logo?e=1725494400&v=beta&t=G1CyQyLzMDxg-Jnk1EOKcwNiPtr8o7ek9a7bSoVdNkQ',
    company: 'Empresa Brasileira de Comunicação',
    duration: 'Março de 2023 - Setembro de 2023',
    jobRole: 'Desenvolvedor Front-end',
    abreviation: 'EBC',
    activities: [
      'Desenvolvimento de aplicação com NextJS e Typescript utilizando SSG e SSR para monitoramento de usuários para suas devidas permissões, cargos e funções.',
      'Migração e Desenvolvimento do App da TV Brasil Play em Ionic v3 para Ionic v6 utilizando Angular 13 +, gerenciamento e versionamento de código com gitlab.',
      'Migração e Desenvolvimento do App Radios EBC, utilizando Angular 14+, Ionic v6, Capacitor, Scss.',
      'Refatoração de códigos legados.',
    ],
  },
  {
    id: 2,
    imgCompany:
      'https://media.licdn.com/dms/image/C4D0BAQGTT3jCiYDqHA/company-logo_100_100/0/1630543582545/brbcard_logo?e=1725494400&v=beta&t=HFLvNfPKTzmSFhLtXBDSPqyOo_Je6hu7ISZL5-8S5jo',
    company: 'BRBCARD',
    abreviation: 'BRBCARD',
    duration: 'Set de 2022 - Março de 2023',
    jobRole: 'Desenvolvimento de Software (Estágio)',
    activities: [
      'Desenvolvimento front-end de interfaces e integrações com API REST em ReactJS.',
      'Desenvolvimento de funcionalidades/manutenção de aplicativos em React Native.',
      'Migração de pequenos projetos do React 16 para a versão 18.',
      'Otimização para SEO em alguns projetos com NextJs.',
      'Contato com Nodejs, Docker, SQL e mongodb em criação de CRUD de usuários.',
    ],
  },
  {
    id: 1,
    imgCompany:
      'https://yt3.googleusercontent.com/nNe4OKvobUSsarAsI9NXTEvdS-McEqmocHTQG4yD48mQ9A27QJBaz6yi7FQJKcKbCeEXZ9M29Q=s900-c-k-c0x00ffffff-no-rj',
    company: 'Secretaria de Desenvolvimento Social ',
    duration: 'Maio de 2022 - Set de 2022',
    jobRole: 'Desenvolvimento de Software (Estágio)',
    abreviation: 'SEDES',
    description:
      'Meu primeiro contato com o mercado de trabalho, onde tive uma introdução como funciona o dia a dia em equipe, tive contato com métodologias ágeis como SCRUM e KANBAN.',
    activities: [
      'Desenvolvimento em Javascript / ReactJs / Python',
      'Desenvolvimento de Funcionalidades em projeto interno da empresa para usuários registrarem seu ponto',
      'Códigos desenvolvidos utilizando principios importantes como SOLID e Liskov.',
    ],
  },
];
