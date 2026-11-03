// Everything the page says, in both languages. Edit here to change the site's copy.

export type Lang = "en" | "pt";

export const PROFILE = {
  name: "Kauan Santos",
  github: "zkauansantos",
  email: "kauansantosdepontes@gmail.com",
  socials: [
    { name: "GitHub", handle: "@zkauansantos", url: "https://github.com/zkauansantos" },
    { name: "LinkedIn", handle: "@zkauansantos", url: "https://www.linkedin.com/in/zkauansantos" },
    { name: "Instagram", handle: "@zkauansantos", url: "https://www.instagram.com/zkauansantos" },
    { name: "WhatsApp", handle: "wa.me", url: "https://wa.me/5561982552480?text=Ol%C3%A1%2C+vim+pelo+portf%C3%B3lio" },
  ],
};

export type Item = {
  id: string;
  icon: string;
  tier: 1 | 2 | 3 | 4;
  cost: number;
  name: string;
  line: { en: string; pt: string };
  stack: string[];
  live?: string;
  repos: { name: string; url: string }[];
  status?: { en: string; pt: string };
  say: { en: string; pt: string };
};

export const ITEMS: Item[] = [
  {
    id: "waiterapp", icon: "tray", tier: 3, cost: 3200, name: "Waiterapp",
    line: { en: "Restaurant orders: a kitchen dashboard, an API and a mobile app for waiters.", pt: "Pedidos de restaurante: painel da cozinha, API e app mobile pros garçons." },
    stack: ["React", "Node", "React Native"],
    repos: [
      { name: "API", url: "https://github.com/zkauansantos/waiterappAPI" },
      { name: "Web", url: "https://github.com/zkauansantos/waiterappFE" },
      { name: "Mobile", url: "https://github.com/zkauansantos/waiterAPP" },
    ],
    say: { en: "Three repos. One full build.|Order up.", pt: "Três repos. Uma build completa.|Saindo um pedido." },
  },
  {
    id: "ecommerce", icon: "cart", tier: 3, cost: 2800, name: "E-commerce",
    line: { en: "An online store with its own API and front-end.", pt: "Uma loja online com API e front-end próprios." },
    stack: ["React", "Node"],
    status: { en: "In progress", pt: "Em andamento" },
    repos: [
      { name: "API", url: "https://github.com/zkauansantos/e-commerceapi" },
      { name: "Web", url: "https://github.com/zkauansantos/e-commercefe" },
    ],
    say: { en: "Still farming this one.|Not finished. Neither is my bulk.", pt: "Ainda farmando esse.|Não terminou. Nem meu bulking." },
  },
  {
    id: "mycontacts", icon: "book", tier: 2, cost: 1600, name: "My Contacts",
    line: { en: "Contact manager. Node API and React front-end.", pt: "Gerenciador de contatos. API Node e front React." },
    stack: ["React", "Node"],
    repos: [
      { name: "API", url: "https://github.com/zkauansantos/MyContactsAPI" },
      { name: "Web", url: "https://github.com/zkauansantos/FrontEndMyContacts" },
    ],
    say: { en: "Every contact in its lane.|CRUD, but clean.", pt: "Cada contato na sua lane.|CRUD, mas limpo." },
  },
  {
    id: "pokedex", icon: "dex", tier: 1, cost: 800, name: "Pokédex",
    line: { en: "Search and browse creatures from a public API.", pt: "Busque e navegue por criaturas de uma API pública." },
    stack: ["React"],
    live: "https://pokedexzk.vercel.app/",
    repos: [{ name: "Code", url: "https://github.com/zkauansantos/questPokeAPI" }],
    say: { en: "Starter item. Everyone buys one.|Gotta fetch 'em all.", pt: "Item inicial. Todo mundo compra.|Temos que buscar todos." },
  },
  {
    id: "ibge", icon: "map", tier: 1, cost: 700, name: "IBGE Infos",
    line: { en: "Brazilian states and cities from the IBGE public API.", pt: "Estados e cidades do Brasil pela API pública do IBGE." },
    stack: ["React"],
    live: "https://ibg-eapi.vercel.app/",
    repos: [{ name: "Code", url: "https://github.com/zkauansantos/IBGEapi" }],
    say: { en: "The whole map, in one fetch.|5,570 cities. I counted.", pt: "O mapa inteiro num fetch.|5.570 cidades. Eu contei." },
  },
  {
    id: "lane", icon: "tower", tier: 4, cost: 5000, name: "The Lane",
    line: { en: "This site. A lane where minions build every block you see.", pt: "Este site. Uma lane onde minions constroem cada bloco que você vê." },
    stack: ["Next.js", "Canvas", "TypeScript"],
    repos: [{ name: "Code", url: "https://github.com/zkauansantos/portfolio" }],
    say: { en: "You're standing on it.|Tier 4. No discounts.", pt: "Você tá pisando nele.|Tier 4. Sem desconto." },
  },
];

export type Match = {
  company: string;
  role: { en: string; pt: string };
  start: string;
  end: string | null;
  build: string[];
  notes: { en: string[]; pt: string[] };
};

export const MATCHES: Match[] = [
  {
    company: "Montreal (BRB)",
    role: { en: "Senior Fullstack Developer", pt: "Desenvolvedor Fullstack Sênior" },
    start: "2025-06", end: null,
    build: ["Angular", "Java 17", "Hexagonal Architecture", "Clean Architecture", "SAFe"],
    notes: {
      en: [
        "Took the INSS payroll loan MVP from zero to business validation, letting the bank test a new credit product fast and at low risk.",
        "Led the migration of BRB Mobilidade critical systems from Java JSP to Angular 17+ and Java 17 with Hexagonal Architecture.",
        "Applied Clean Architecture and SOLID to new modules, setting a standard the team now follows.",
        "Fixed performance and stability hotspots in the main user flow, cutting errors and freezes.",
        "Active in SAFe (ART) planning and refinement, raising technical risks early.",
      ],
      pt: [
        "Tirei do papel o MVP de Empréstimo Consignado (INSS), do início à validação com o negócio, permitindo ao banco testar um novo produto de crédito com rapidez e baixo risco.",
        "Liderei a migração de sistemas críticos do BRB Mobilidade de Java JSP para Angular 17+ e Java 17 com Arquitetura Hexagonal.",
        "Apliquei Clean Architecture e SOLID nos novos módulos, criando uma base que o time passou a seguir.",
        "Ataquei pontos críticos de performance e estabilidade no fluxo principal, reduzindo erros e travamentos.",
        "Participo ativamente de planejamento e refinamento no SAFe (ART), trazendo riscos técnicos cedo.",
      ],
    },
  },
  {
    company: "Nivells",
    role: { en: "Front-end & Mobile Developer", pt: "Desenvolvedor Front-end e Mobile" },
    start: "2024-05", end: "2025-05",
    build: ["React Native", "Next.js", "React Flow", "DnD Kit", "Jest", "Cypress"],
    notes: {
      en: [
        "Built the web and mobile sales platform for creators, co-producers and affiliates from scratch, from architecture to launch.",
        "Owned the checkout, the revenue part of the product: custom checkout and checkout builder integrated with payment gateways.",
        "Created and maintained the internal Design System (@nivells/ds), speeding up new screens by 40%.",
        "Unblocked critical roadmap items like custom e-learning platforms (React Flow, DnD Kit).",
        "Introduced unit and e2e tests (Jest, Cypress), reducing production bugs.",
      ],
      pt: [
        "Construí do zero o produto web e mobile de uma plataforma de vendas para infoprodutores, coprodutores e afiliados, da arquitetura ao lançamento.",
        "Responsável pelo checkout, a parte que gera receita: checkout personalizado e checkout builder integrados a gateways de pagamento.",
        "Criei e mantive o Design System interno (@nivells/ds), acelerando em 40% a entrega de novas telas.",
        "Destravei entregas críticas do roadmap, como plataformas de e-learning sob medida (React Flow, DnD Kit).",
        "Implantei testes unitários e e2e (Jest, Cypress), reduzindo bugs em produção.",
      ],
    },
  },
  {
    company: "FluxStation",
    role: { en: "Fullstack & Mobile Developer", pt: "Desenvolvedor Fullstack e Mobile" },
    start: "2022-10", end: "2024-04",
    build: ["NestJS", "React Native", "Expo", "AWS", "PostgreSQL", "WebSockets", "Stripe"],
    notes: {
      en: [
        "Digitized logistics yard operations: driver check-in and real-time dashboards replaced manual control.",
        "Owned mobile end to end, from React Native and Expo to Google Play release.",
        "Set up infra and deploy: AWS (ECS/ECR with Fargate, EC2, S3, Load Balancer) and CI/CD with GitHub Actions.",
        "NestJS APIs (PostgreSQL, TypeORM, JWT, Swagger) in microservices with WebSockets for live monitoring.",
        "Hardened Stripe payment and subscription flows; kept test coverage above 80%.",
      ],
      pt: [
        "Digitalizei a operação dos pátios logísticos: check-in de caminhoneiros e painéis em tempo real substituíram controles manuais.",
        "Assumi o mobile de ponta a ponta, do React Native e Expo à publicação na Google Play.",
        "Estruturei infra e deploy: AWS (ECS/ECR com Fargate, EC2, S3, Load Balancer) e CI/CD com GitHub Actions.",
        "APIs em NestJS (PostgreSQL, TypeORM, JWT, Swagger) em microsserviços com WebSockets para monitoramento em tempo real.",
        "Reforcei validação e segurança nos fluxos de pagamento e assinatura com Stripe; cobertura de testes acima de 80%.",
      ],
    },
  },
  {
    company: "SEA Tecnologia",
    role: { en: "Front-end Developer", pt: "Desenvolvedor Front-end" },
    start: "2022-03", end: "2022-10",
    build: ["React", "TypeScript", "Liferay"],
    notes: {
      en: ["Portals and intranets for large clients like the Brazilian Army, Sesc and CLDF, on schedule.", "Improved maintainability of existing projects through refactoring."],
      pt: ["Portais e intranets para clientes de grande porte como Exército Brasileiro, Sesc e CLDF, cumprindo prazos.", "Melhorei a manutenibilidade de projetos existentes com refatoração e boas práticas."],
    },
  },
  {
    company: "EBC",
    role: { en: "Front-end Developer", pt: "Desenvolvedor Front-end" },
    start: "2021-08", end: "2022-03",
    build: ["Angular", "Ionic", "Capacitor", "Next.js"],
    notes: {
      en: ["Migrated TV Brasil Play (Ionic 3 to 6, Angular 13+) and built Rádios EBC (Angular 14+, Capacitor), 7 stations in one app.", "Internal permissions, roles and functions system in Next.js (SSR/SSG)."],
      pt: ["Migrei o TV Brasil Play (Ionic v3 para v6, Angular 13+) e construí o Rádios EBC (Angular 14+, Capacitor), 7 emissoras em um único app.", "Sistema interno de permissões, cargos e funções com Next.js (SSR/SSG)."],
    },
  },
  {
    company: "BRBCARD",
    role: { en: "Software Engineering Intern", pt: "Estagiário de Engenharia de Software" },
    start: "2021-02", end: "2021-07",
    build: ["React", "React Native", "Next.js"],
    notes: {
      en: ["React interfaces integrated with REST APIs; maintained React Native apps.", "Migrated projects from React 16 to 18; SEO with Next.js."],
      pt: ["Interfaces em React integradas a APIs REST; manutenção de apps React Native.", "Migrei projetos do React 16 para o 18 e melhorei o SEO com Next.js."],
    },
  },
];

export const COPY = {
  en: {
    nav: { shop: "Projects", hero: "About", matches: "Matches", contact: "Contact" },
    skip: "Skip intro",
    building: "Wave spawning. Press Escape to skip.",
    ready: "Page ready.",
    line1a: "Front-end developer.",
    line1b: "Fullstack when the match needs it.",
    line2: "5+ years shipping web and mobile apps.",
    cta: "Push the lane",
    objective: "Objective",
    shop: { title: "Item shop", intro: "Things I built. Higher tier, more souls.", live: "Live", souls: "souls", tier: "Tier" },
    hero: {
      title: "Hero select",
      player: "Player 1",
      lvl: "Lvl",
      role: "Role: Front-end · Fullstack",
      abilities: "Abilities",
      passives: "Passives",
      a1: ["Interfaces", "React, Next.js, Angular, React Native. Accessible and fast."],
      a2: ["Motion", "Canvas, CSS, micro-interactions. Things should move."],
      a3: ["Backend", "NestJS, Node, PostgreSQL, AWS, CI/CD."],
      ult: ["Deadline", "Gets faster the closer the deadline is."],
      p: [
        ["Gym", "never skips leg day"],
        ["Jump rope", "double unders"],
        ["Football", "weekend league"],
        ["Nutrition", "macros counted"],
        ["Deadlock · Valorant", "ranked after work"],
      ],
    },
    matches: { title: "Match history", intro: "Every job is a match. All of them won something.", win: "Win", now: "Live", present: "Present", build: "Build", more: "Details", less: "Close" },
    graph: {
      title: "Season farm",
      intro: "Every day I committed is a soul. The brighter, the more I farmed.",
      total: "contributions in the last year",
      label: "Put your season next to mine",
      button: "Compare",
      loading: "Building…",
      error: "Couldn't find that one on GitHub.",
      offline: "GitHub didn't answer. Try again later.",
    },
    contact: {
      title: "All chat",
      boot: ["you joined all chat.", "type a command and press enter,", "or just use the buttons below."],
      placeholder: "type a command",
      chips: ["write a note", "socials", "help"],
    },
    footer: "Built block by block by a crew of minions.",
    secrets: "Secrets",
    souls: "souls",
  },
  pt: {
    nav: { shop: "Projetos", hero: "Sobre", matches: "Partidas", contact: "Contato" },
    skip: "Pular intro",
    building: "Wave nascendo. Aperte Esc para pular.",
    ready: "Página pronta.",
    line1a: "Desenvolvedor front-end.",
    line1b: "Fullstack quando a partida pede.",
    line2: "5+ anos entregando apps web e mobile.",
    cta: "Empurrar a lane",
    objective: "Objetivo",
    shop: { title: "Loja de itens", intro: "Coisas que eu construí. Quanto maior o tier, mais souls.", live: "Ao vivo", souls: "souls", tier: "Tier" },
    hero: {
      title: "Seleção de herói",
      player: "Jogador 1",
      lvl: "Nv",
      role: "Função: Front-end · Fullstack",
      abilities: "Habilidades",
      passives: "Passivas",
      a1: ["Interfaces", "React, Next.js, Angular, React Native. Acessível e rápido."],
      a2: ["Movimento", "Canvas, CSS, micro-interações. As coisas têm que se mexer."],
      a3: ["Backend", "NestJS, Node, PostgreSQL, AWS, CI/CD."],
      ult: ["Prazo final", "Fica mais rápido quanto mais perto do prazo."],
      p: [
        ["Academia", "nunca pula o treino de perna"],
        ["Pular corda", "double unders"],
        ["Futebol", "pelada de fim de semana"],
        ["Nutrição", "macros contados"],
        ["Deadlock · Valorant", "ranqueada depois do trampo"],
      ],
    },
    matches: { title: "Histórico de partidas", intro: "Cada emprego é uma partida. Todas valeram alguma coisa.", win: "Vitória", now: "Ao vivo", present: "Atual", build: "Build", more: "Detalhes", less: "Fechar" },
    graph: {
      title: "Farm da temporada",
      intro: "Cada dia que eu commitei é uma soul. Quanto mais forte, mais eu farmei.",
      total: "contribuições no último ano",
      label: "Coloque sua temporada do lado da minha",
      button: "Comparar",
      loading: "Construindo…",
      error: "Não achei esse usuário no GitHub.",
      offline: "O GitHub não respondeu. Tente mais tarde.",
    },
    contact: {
      title: "Chat geral",
      boot: ["você entrou no chat geral.", "digite um comando e aperte enter,", "ou use os botões abaixo."],
      placeholder: "digite um comando",
      chips: ["escrever recado", "redes", "ajuda"],
    },
    footer: "Construído bloco a bloco por uma equipe de minions.",
    secrets: "Segredos",
    souls: "souls",
  },
};

export type Copy = (typeof COPY)["en"];
