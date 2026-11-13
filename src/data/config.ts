import { Dish, ExtraOption, SizeOption } from '../types';

export const BRAND_CONFIG = {
  name: 'Panela da Semana',
  tagline: 'Comida de verdade. Semana bem resolvida.',
  whatsappPhone: '5511995722584',
  whatsappDisplay: '(11) 99572-2584',
  hours: 'Horários ilustrativos de segunda a sexta (a confirmar na operação)',
  serviceArea: 'Região pretendida do projeto: Jundiaí — SP (cobertura a confirmar)',
  deliveryFeeCents: 0, // Demonstração: frete zero configurável
  prototypeNotice:
    'Protótipo demonstrativo: cardápio, fotografias, valores, horários e informações comerciais são ilustrativos.',
};

export const SIZES_CONFIG: SizeOption[] = [
  {
    id: 'medium',
    name: 'Marmita Média',
    label: 'Porção individual (Tamanho M)',
    priceCents: 2200, // R$ 22,00
  },
  {
    id: 'large',
    name: 'Marmita Grande',
    label: 'Porção maior (Tamanho G)',
    priceCents: 2800, // R$ 28,00
  },
];

export const EXTRAS_CONFIG: ExtraOption[] = [
  {
    id: 'extra_ovo',
    name: 'Ovo frito ou poché',
    priceCents: 400, // + R$ 4,00
  },
  {
    id: 'extra_proteina',
    name: 'Porção extra da proteína principal',
    priceCents: 700, // + R$ 7,00
  },
];

export const STANDARD_SIDES = [
  { id: 'arroz_branco', name: 'Arroz branco soltinho' },
  { id: 'arroz_integral', name: 'Arroz integral com sementes' },
  { id: 'feijao_carioca', name: 'Feijão carioca cremoso temperado' },
  { id: 'feijao_preto', name: 'Feijão preto com louro e ervas' },
  { id: 'pure_batata', name: 'Purê de batata aveludado' },
  { id: 'legumes_salteados', name: 'Legumes salteados na manteiga e azeite' },
  { id: 'farofa_crocante', name: 'Farofa crocante de mandioca na manteiga' },
  { id: 'salada_fresca', name: 'Mix de folhas verdes com tomatinhos' },
];

export const WEEKLY_DISHES: Dish[] = [
  {
    id: 'segunda-frango-grelhado',
    day: 'segunda',
    dayLabel: 'Segunda-feira',
    name: 'Filé de Frango Grelhado com Ervas',
    tagline: 'Leve, dourado e suculento para começar a semana com equilíbrio.',
    description:
      'Filés de peito de frango marinados em ervas finas e limão siciliano, grelhados até dourar. Sugestão acompanhada de arroz soltinho, feijão temperado e legumes salteados.',
    ingredients: [
      'Peito de frango em filés',
      'Ervas (tomilho e alecrim)',
      'Azeite extravirgem',
      'Arroz branco ou integral',
      'Feijão carioca temperado',
      'Abobrinha e cenoura salteadas',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/frango-grelhado.jpg',
    videoUrl: null, // Pronto para receber URL de vídeo 9:16 gerado via Google Flow
    badge: 'Sugestão de segunda',
    featuredIngredient: 'Peito de Frango & Limão Siciliano',
    allowedProteins: [
      { id: 'frango_grelhado', name: 'Filé de Frango Grelhado (padrão)', included: true },
      { id: 'frango_desfiado', name: 'Frango em cubos refogado com ervas', included: true },
    ],
    allowedSides: STANDARD_SIDES,
    minSides: 2,
    maxSides: 3,
  },
  {
    id: 'terca-carne-de-panela',
    day: 'terca',
    dayLabel: 'Terça-feira',
    name: 'Carne de Panela com Molho Ferrugem',
    tagline: 'Cozimento lento, carne macia que desfia na colher e molho encorpado.',
    description:
      'Sugestão de cortes bovinos dourados e cozidos lentamente com cebolas caramelizadas, cenouras macias, batatinhas e cheiro-verde. Uma proposta reconfortante para a terça-feira.',
    ingredients: [
      'Músculo bovino ou acém',
      'Cenoura e batatas cozidas',
      'Molho encorpado de cebola e tomate',
      'Louro e cheiro-verde',
      'Arroz branco',
      'Feijão carioca cremoso',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/carne-de-panela.jpg',
    videoUrl: null,
    badge: 'Receita tradicional',
    featuredIngredient: 'Carne Bovina & Molho Ferrugem',
    allowedProteins: [
      { id: 'carne_panela', name: 'Carne de Panela Desfiando (padrão)', included: true },
      { id: 'frango_grelhado', name: 'Substituir por Filé de Frango', included: true },
    ],
    allowedSides: STANDARD_SIDES,
    minSides: 2,
    maxSides: 3,
  },
  {
    id: 'quarta-carne-moida',
    day: 'quarta',
    dayLabel: 'Quarta-feira',
    name: 'Carne Moída Refogada com Banana e Farofa',
    tagline: 'O clássico brasileiro afetivo pensado para o meio da semana.',
    description:
      'Patinho moído refogado com alho dourado, tomate maduro, azeitonas verdes e cheiro-verde. Composição servida com arroz, feijão preto ou carioca, banana-da-terra grelhada e farofa crocante.',
    ingredients: [
      'Patinho moído refogado',
      'Azeitonas verdes fatiadas',
      'Tomate confitado e cebola',
      'Banana-da-terra dourada',
      'Farofa na manteiga',
      'Feijão preto com louro',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/carne-moida.jpg',
    videoUrl: null,
    badge: 'Clássico brasileiro',
    featuredIngredient: 'Patinho Moído & Banana-da-Terra',
    allowedProteins: [
      { id: 'carne_moida', name: 'Carne Moída Temperada (padrão)', included: true },
      { id: 'frango_desfiado', name: 'Frango desfiado com milho verde', included: true },
    ],
    allowedSides: STANDARD_SIDES,
    minSides: 2,
    maxSides: 3,
  },
  {
    id: 'quinta-omelete-vegetariana',
    day: 'quinta',
    dayLabel: 'Quinta-feira',
    name: 'Omelete Dourada com Queijo Minas e Tomatinhos',
    tagline: 'Fofa e dourada, recheada com queijo derretido, espinafre e tomatinhos.',
    description:
      'Ovos batidos com ervas, recheados com queijo minas padrão derretido, tomatinhos cereja assados e espinafre salteado. Sugestão acompanhada de arroz integral e salada verde.',
    ingredients: [
      'Ovos batidos com ervas',
      'Queijo minas padrão',
      'Tomate cereja assado no azeite',
      'Espinafre salteado',
      'Arroz integral com grãos',
      'Mix de folhas e cenoura',
    ],
    category: 'vegetarianos',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/omelete-vegetariana.jpg',
    videoUrl: null,
    badge: 'Opção vegetariana',
    featuredIngredient: 'Ovos & Queijo Minas',
    allowedProteins: [
      { id: 'omelete_queijo', name: 'Omelete com Queijo Minas & Tomatinhos (padrão)', included: true },
      { id: 'omelete_cogumelos', name: 'Omelete com Mix de Cogumelos Shimeji', included: true },
    ],
    allowedSides: STANDARD_SIDES,
    minSides: 2,
    maxSides: 3,
  },
  {
    id: 'sexta-refeicao-vegetariana',
    day: 'sexta',
    dayLabel: 'Sexta-feira',
    name: 'Legumes Assados com Grão-de-Bico ao Alecrim',
    tagline: 'Cores vibrantes, textura assada caramelizada e combinação aromática.',
    description:
      'Mix de abóbora cabotiá, abobrinha, berinjela e pimentões assados no azeite com alho e alecrim. Composição servida com grão-de-bico temperado e arroz integral aromático.',
    ingredients: [
      'Abóbora cabotiá assada',
      'Grão-de-bico macio salteado',
      'Abobrinha e pimentão doce',
      'Alecrim e azeite extravirgem',
      'Arroz integral com castanhas',
      'Rúcula com vinagrete leve',
    ],
    category: 'vegetarianos',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/refeicao-vegetariana.jpg',
    videoUrl: null,
    badge: 'Sugestão Plant-Based',
    featuredIngredient: 'Abóbora Cabotiá & Grão-de-Bico',
    allowedProteins: [
      { id: 'grao_de_bico', name: 'Grão-de-bico ao azeite de ervas (padrão)', included: true },
      { id: 'tofu_grelhado', name: 'Tofu marinado e grelhado', included: true },
    ],
    allowedSides: STANDARD_SIDES,
    minSides: 2,
    maxSides: 3,
  },
];

export const ADDITIONAL_DISHES_PORTFOLIO = [
  {
    id: 'portfolio-arroz-feijao',
    name: 'Clássico Arroz & Feijão com Farofa',
    category: 'tradicionais',
    image: '/images/dishes/arroz-feijao.jpg',
    description: 'A base da culinária afetiva brasileira, representada no conceito do cardápio.',
  },
  {
    id: 'portfolio-pure-batata',
    name: 'Filé com Purê Aveludado & Brócolis',
    category: 'tradicionais',
    image: '/images/dishes/pure-batata.jpg',
    description: 'Purê cremoso de batatas com toque suave de noz-moscada e brócolis no vapor.',
  },
  {
    id: 'portfolio-refeicao-leve',
    name: 'Bowl Leve com Frango e Folhas',
    category: 'leves',
    image: '/images/dishes/refeicao-leve.jpg',
    description: 'Composição visual equilibrada combinando proteína grelhada e folhas variadas.',
  },
];
