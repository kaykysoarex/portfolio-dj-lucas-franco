// ============================================================================
// djData.js — TODO o conteúdo editável do site vive aqui.
// Campos marcados com "EDITAR" são placeholders: o site funciona com eles,
// mas devem ser substituídos por informações reais antes de publicar.
// ============================================================================

export const djData = {
  brand: {
    name: "Lucas Franco",
    tagline: "DJ • EVENTOS • CASAMENTOS",
  },

  contact: {
    // Confirmado pelo cliente
    whatsapp: "5531982085111", // formato internacional, só dígitos (usado nos links wa.me)
    whatsappDisplay: "(31) 98208-5111",
    instagramUrl: "https://www.instagram.com/djlucasfrancooficial",
    instagramHandle: "@djlucasfrancooficial",
    // EDITAR: cidade/região real de atuação
    city: "Belo Horizonte e região metropolitana",
  },

  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Casamentos", href: "#casamentos" },
    { label: "Eventos", href: "#eventos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],

  // Navegação por "modalidades" usada só no mobile (≤700px), com rotas próprias
  mobileNav: [
    { label: "Contrate", path: "/", icon: "Radio" },
    { label: "Sobre", path: "/sobre", icon: "User" },
    { label: "Casamentos", path: "/casamentos", icon: "Heart" },
    { label: "Eventos", path: "/eventos", icon: "PartyPopper" },
  ],

  hero: {
    eyebrow: "DJ • EVENTOS • CASAMENTOS",
    headline: ["ANTES DO", "DROP"],
    sub: "A trilha sonora certa, no momento certo, para a sua festa inteira.",
    ctaLabel: "CONTRATE AGORA",
    scrollHint: "Role para conhecer o trabalho",
  },

  about: {
    eyebrow: "Sobre",
    title: "Quem toca a sua festa",
    // EDITAR: texto de biografia real do DJ
    paragraphs: [
      "Lucas Franco é DJ profissional com atuação em casamentos, debutantes de 15 anos, formaturas e eventos corporativos.",
      "Cada evento é construído sob medida: repertório pensado com antecedência, leitura de pista em tempo real e transições que mantêm a energia do início ao fim da noite.",
    ],
    // EDITAR: números reais — atualmente placeholders para preview
    stats: [
      { value: "10+", label: "anos de estrada" },
      { value: "500+", label: "eventos realizados" },
      { value: "30+", label: "cidades atendidas" },
      { value: "5.0", label: "avaliação dos clientes" },
    ],
    // EDITAR: estilos musicais reais que o DJ toca
    genres: ["Sertanejo", "Funk", "Pop", "Eletrônica", "Anos 80/90"],
    // EDITAR: lista de cidades/regiões reais atendidas
    regions: ["Belo Horizonte", "Contagem", "Nova Lima", "Região metropolitana"],
  },

  services: {
    eyebrow: "Experiência musical",
    title: "Mais do que tocar música",
    items: [
      {
        icon: "SlidersHorizontal",
        title: "Repertório personalizado",
        description: "Playlist construída junto com você, respeitando o estilo do evento e o gosto dos convidados.",
      },
      {
        icon: "Radar",
        title: "Leitura de pista",
        description: "Ajustes em tempo real conforme a resposta do público — a festa nunca perde o ritmo.",
      },
      {
        icon: "Waves",
        title: "Transições profissionais",
        description: "Mixagens contínuas, sem cortes bruscos, mantendo a energia da pista sempre em movimento.",
      },
      {
        icon: "Speaker",
        title: "Equipamento de alto padrão",
        description: "Som e equalização calibrados para cada tipo de espaço, do salão de festas ao ar livre.",
      },
      {
        icon: "Mic2",
        title: "Interação com os convidados",
        description: "Condução dos momentos especiais da festa com naturalidade, sem exageros.",
      },
      {
        icon: "CalendarClock",
        title: "Planejamento musical",
        description: "Reunião prévia para alinhar cerimônia, jantar, abertura de pista e repertório da festa.",
      },
    ],
  },

  weddings: {
    eyebrow: "Casamentos",
    title: "Elegância que também sabe soltar a pista",
    description:
      "Do 'sim' ao último set, a trilha sonora acompanha cada momento do casamento — com sensibilidade na cerimônia e energia na festa.",
    features: [
      "Música para cerimônia, recepção e festa",
      "Reunião para montar o repertório junto com os noivos",
      "Respeito total ao gosto musical do casal",
      "Organização dos momentos especiais (entrada, valsa, brinde)",
      "Estrutura pensada para transformar a pista ao longo da noite",
    ],
    ctaLabel: "QUERO ESTE DJ NO MEU CASAMENTO",
    // EDITAR: relatos fictícios — layout pronto para receber depoimentos reais de noivos
    stories: [
      { names: "Marina & Thiago", place: "Belo Horizonte", rating: 5, quote: "A pista não parou um segundo. Conseguiu unir o gosto dos dois lados da família sem perder a nossa cara." },
      { names: "Ana & Rafael", place: "Contagem", rating: 5, quote: "Cuidou de cada momento do casamento com a gente, da cerimônia até a última música da festa." },
      { names: "Juliana & Pedro", place: "Nova Lima", rating: 5, quote: "Leu a pista muito bem. Todo mundo, de criança a avô, dançou em algum momento." },
    ],
    // EDITAR: substituir por fotos/vídeos reais de casamentos assim que disponíveis.
    // type "video" já é suportado pelo componente — basta trocar o "type" e apontar name/poster.
    media: [
      { type: "image", name: "dj-standing-console", caption: "Abertura de pista" },
      { type: "image", name: "dj-headphones-both-hands", caption: "Leitura da pista em tempo real" },
      { type: "image", name: "dj-console-detail", caption: "Transições ao vivo" },
      { type: "image", name: "dj-sunglasses-portrait", caption: "Antes do grande momento" },
    ],
    finalCta: {
      headline: "TRANSFORME O SEU CASAMENTO EM UMA EXPERIÊNCIA INESQUECÍVEL.",
    },
  },

  events: {
    eyebrow: "Outros eventos",
    title: "Para cada tipo de festa, o tom certo",
    items: [
      {
        icon: "PartyPopper",
        title: "Aniversários",
        description: "Do infantil ao adulto, playlist sob medida para cada fase da festa.",
        photo: "dj-holding-controller",
        highlights: ["Repertório por faixa etária", "Parabéns e momentos especiais conduzidos com naturalidade", "Transição suave entre jantar e pista"],
      },
      {
        icon: "GraduationCap",
        title: "Formaturas",
        description: "Energia alta do início ao fim, com espaço para os momentos de homenagem.",
        photo: "dj-headphones-side",
        highlights: ["Trilha para o momento de homenagem à turma", "Repertório atual + clássicos que unem a turma", "Pista cheia até o final"],
      },
      {
        icon: "Briefcase",
        title: "Eventos corporativos",
        description: "Trilha sonora discreta ou pista animada, conforme o tom do evento.",
        photo: "dj-console-detail",
        highlights: ["Volume e repertório calibrados para conversas", "Transição para pista após o encerramento formal", "Equipamento discreto, sem cabos expostos"],
      },
      {
        icon: "Sparkles",
        title: "Festas particulares",
        description: "Encontros íntimos ou grandes celebrações, sempre com repertório sob medida.",
        photo: "dj-crossed-arms",
        highlights: ["Atendimento para qualquer tamanho de festa", "Repertório alinhado com o anfitrião", "Flexibilidade de horário e local"],
      },
      {
        icon: "Crown",
        title: "Debutantes (15 anos)",
        description: "Valsa, homenagens e uma festa que não para até o último convidado.",
        photo: "dj-headphones-both-hands",
        highlights: ["Valsa e coreografias com timing preciso", "Momento de homenagem à aniversariante", "Repertório que agrada os convidados de todas as idades"],
      },
      {
        icon: "Palette",
        title: "Eventos temáticos",
        description: "Repertório e clima construídos em torno do conceito da festa.",
        photo: "dj-standing-console",
        highlights: ["Repertório e efeitos alinhados ao tema", "Reunião prévia para entender o conceito", "Estrutura flexível para cada espaço"],
      },
    ],
  },

  gallery: {
    eyebrow: "Galeria",
    title: "Bastidores e cabine",
    // EDITAR: substitua/complemente com fotos de eventos reais assim que disponíveis
    items: [
      { name: "dj-standing-console", alt: "Lucas Franco em pé junto ao controlador Denon DJ, iluminação vermelha e azul", size: "large", pos: "50% 15%" },
      { name: "dj-portrait-headphones", alt: "Retrato de Lucas Franco usando fone de ouvido, closeup cinematográfico", size: "tall", pos: "50% 28%" },
      { name: "dj-console-detail", alt: "Detalhe das mãos de Lucas Franco ajustando o controlador Denon SC Live 4", size: "medium", pos: "60% 20%" },
      { name: "dj-holding-controller", alt: "Lucas Franco segurando o controlador de DJ, sorrindo", size: "wide", pos: "50% 22%" },
      { name: "dj-headphones-both-hands", alt: "Lucas Franco ajustando o fone de ouvido com as duas mãos", size: "medium", pos: "50% 18%" },
      { name: "dj-headphones-side", alt: "Lucas Franco de perfil, mão próxima ao fone de ouvido", size: "medium", pos: "45% 24%" },
      { name: "dj-sunglasses-portrait", alt: "Retrato de Lucas Franco ajustando os óculos escuros", size: "tall", pos: "50% 30%" },
      { name: "dj-crossed-arms", alt: "Lucas Franco de braços cruzados, ajustando os óculos escuros", size: "medium", pos: "50% 32%" },
    ],
  },

  // EDITAR: depoimentos fictícios usados apenas como exemplo de layout — substitua por avaliações reais
  testimonials: {
    eyebrow: "Depoimentos",
    title: "Quem já dançou sabe",
    disclaimer: "Depoimentos ilustrativos, usados como exemplo de layout — em breve, avaliações reais de clientes.",
    items: [
      { name: "Marina & Thiago", context: "Casamento", quote: "A pista não parou um segundo. Conseguiu unir o gosto dos dois lados da família sem perder a nossa cara." },
      { name: "Beatriz", context: "Debutante de 15 anos", quote: "Leu a galera certinho. Cada momento da festa teve a música na hora certa." },
      { name: "Fernanda", context: "Evento corporativo", quote: "Discrição durante o jantar e energia na hora certa depois. Profissional do início ao fim." },
      { name: "Carlos", context: "Formatura", quote: "Organização impecável e uma seleção musical que fez todo mundo ficar até o final." },
    ],
  },

  bookingProcess: {
    eyebrow: "Como funciona",
    title: "Do primeiro contato à pista cheia",
    steps: [
      { title: "Entre em contato", description: "Fale pelo WhatsApp e conte um pouco sobre o seu evento." },
      { title: "Informe data e tipo de evento", description: "Casamento, debutante, formatura ou outra celebração — cada uma tem sua estrutura." },
      { title: "Receba a proposta", description: "Retorno com valores, disponibilidade e o que está incluso." },
      { title: "Defina repertório e detalhes", description: "Reunião para alinhar estilo musical, momentos especiais e estrutura do evento." },
      { title: "Curta a festa", description: "No dia, é só aproveitar — o resto é com Lucas Franco." },
    ],
  },

  finalCta: {
    headline: "SUA FESTA MERECE UMA EXPERIÊNCIA, NÃO APENAS UMA PLAYLIST.",
    ctaLabel: "FALAR NO WHATSAPP",
  },

  footer: {
    // EDITAR: direitos autorais/ano atualizados automaticamente pelo componente
    credit: "Desenvolvido por Dev Kayky",
  },
};

export default djData;
