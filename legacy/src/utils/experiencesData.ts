export const experiencesData: Array<{
  id: number;
  imgCompany?: string;
  company: string;
  duration: string;
  jobRole: string;
  abreviation: string;
  description?: string;
  activities: Array<string>;
}> = [
  {
    id: 6,
    company: 'Nivells',
    duration: 'Junho de 2025 - Maio de 2025',
    jobRole: 'Desenvolvedor Front-end',
    description: 'Como desenvolvedor Front-end e Mobile, uma plataforma voltada para vendas, infoprodutores, coprodutores e afiliados. Trabalhei diretamente na construção de soluções escaláveis, utilizando tecnologias modernas e priorizando boas práticas de desenvolvimento. Com uma abordagem focada em usabilidade, acessibilidade e performance, fui responsável por criar desde checkouts personalizados até plataformas de estudos EAD sob medida, garantindo uma experiência interativa e intuitiva. Além disso, atuei no refinamento do código através de testes automatizados, assegurando qualidade e estabilidade nas entregas.',
    activities: [
      'Construção e manutenção de aplicativos com React Native e Expo, otimizando o fluxo de desenvolvimento e deploy com EAS.',
      'Implementação de Axios e React Query para consumo eficiente de APIs.',
      'Validação de dados com Zod, garantindo segurança e confiabilidade.',
      'Desenvolvimento de aplicações React e Next.js, focando em desempenho e experiência do usuário.',
      'Criação de checkouts customizados e plataformas EAD interativas, utilizando React Flow e DnD Kit.',
      'Gerenciamento de formulários dinâmicos com React Hook Form e Zod, garantindo melhor usabilidade.',
      'Construção de interfaces responsivas e acessíveis, utilizando TailwindCSS e ShadCN.',
      'Deploy contínuo e otimizado com Vercel, garantindo alta disponibilidade e entregas rápidas.',
      'Implementação de testes unitários e end-to-end com Jest e Cypress, garantindo estabilidade e confiabilidade no código.',
      'Aplicação de boas práticas de testes para minimizar bugs e melhorar a manutenção do sistema.',
    ],
    abreviation: 'Nivells',
  },
  {
    id: 5,
    imgCompany:
        'https://media.licdn.com/dms/image/D4E0BAQHjrvpJTMF-OA/company-logo_100_100/0/1697553453116/gofluxstation_logo?e=1725494400&v=beta&t=w5ZOSznCi40l6JHIGnAPj5JCOkAQpsDh7S2FQjmzyx4',
    company: 'Fluxstation',
    duration: 'Fevereiro de 2024 - Abril de 2025',
    jobRole: 'Desenvolvedor Fullstack / Mobile',
    abreviation: 'Fluxstation',
    description: 'Atuei como desenvolvedor Fullstack/ Mobile. Meu foco principal foi em um aplicativo de gestão para motoristas e atuei também de forma parelela no projeto Web onde temos integrações em tempo real com pátios logísticos e entradas de motoristas.',
    activities: [
      'EC2 para gerenciamento de instâncias com eficiência.',
      'Secrets Manager para garantir segurança dos dados sensíveis.',
      'S3 para armazenamento prático de arquivos e dados.',
      'Gerenciamento de clusters com ECS e ECR, usando EC2 e Fargate em soluções Serverless.',
      'Certificate Manager para implementar certificados SSL.',
      'Configuração de Load Balancers e Target Groups para balanceamento de carga.',

      'Criação de pipelines CI/CD usando GitHub Actions',
      'Automatização de deploy para backend, integrando definições de tarefas AWS.',
      'Deploy contínuo para frontend com Vercel, otimizando as atualizações para os usuários.',

      'Consumo de APIs com Axios e SWR, otimizando chamadas de dados.',
      'Utilização do Expo para construção, gerenciamento e deploy do projeto mobile.',
      'Deploy simplificado com EAS, agilizando lançamentos de versões.',
      'Validação de dados com Zod.',
      'Construção de interfaces com Styled Components.',

      'Desenvolvimento de aplicações web com Next.js',
      'Integração de Axios e SWR para chamadas HTTP, aumentando a performance.',
      'Controle de estado e construção de formulários com React Hooks e React Hook Form.',
      'Interfaces responsivas e acessíveis usando Chakra UI.',

      'Criação de APIs com NestJS',
      'PostgreSQL com Typeorm.',
      'Autenticação com Passport e JWT.',
      'Documentação das APIs com Swagger.',
      'Testes com Jest, garantindo qualidade e segurança no código.',
      'Microserviços e Websockets para monitoramento em tempo real.',
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
