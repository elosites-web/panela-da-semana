import { Dish, ExtraOption, SizeOption } from '../types';

export const BRAND_CONFIG = {
  name: 'Panela da Semana',
  tagline: 'Comida de verdade. Semana bem resolvida.',
  whatsappPhone: '5511995722584',
  whatsappDisplay: '(11) 99572-2584',
  email: 'contato@paneladasemana.com.br',
  hours: 'Segunda a Sexta, das 11h às 14h30 (pedidos aceitos das 08h às 13h30)',
  serviceArea: 'Entregas em bairros selecionados de São Paulo — SP',
  deliveryFeeCents: 0, // Demonstração: frete zero configurável
  prototypeNotice: 'Projeto demonstrativo. Cardápio, fotografias e valores comerciais ilustrativos para apresentação do conceito.',
  socials: {
    instagram: '@paneladasemana',
  },
};

export const SIZES_CONFIG: SizeOption[] = [
  {
    id: 'medium',
    name: 'Marmita Média',
    label: 'M (aprox. 500g)',
    weightApprox: '500g',
    priceCents: 2200, // R$ 22,00
  },
  {
    id: 'large',
    name: 'Marmita Grande',
    label: 'G (aprox. 750g)',
    weightApprox: '750g',
    priceCents: 2800, // R$ 28,00
  },
];

export const EXTRAS_CONFIG: ExtraOption[] = [
  {
    id: 'extra_ovo',
    name: 'Ovo frito caipira ou poché',
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
  { id: 'pure_batata', name: 'Purê de batata artesanal aveludado' },
  { id: 'legumes_salteados', name: 'Legumes salteados na manteiga e azeite' },
  { id: 'farofa_crocante', name: 'Farofa crocante de mandioca na manteiga' },
  { id: 'salada_fresca', name: 'Mix de folhas verdes com tomatinhos' },
];

export const WEEKLY_DISHES: Dish[] = [
  {
    id: 'segunda-frango-grelhado',
    day: 'segunda',
    dayLabel: 'Segunda-feira',
    name: 'Filé de Frango Grelhado Artesanal',
    tagline: 'Leve, dourado e suculento para começar a semana com energia.',
    description:
      'Filés de peito de frango marinados em ervas finas e limão siciliano, grelhados no ponto com crostinha dourada. Acompanhado de arroz soltinho, feijão temperado e legumes frescos salteados.',
    ingredients: [
      'Peito de frango selecionado',
      'Ervas frescas (tomilho e alecrim)',
      'Azeite extravirgem',
      'Arroz branco ou integral',
      'Feijão carioca caseiro',
      'Abobrinha e cenoura salteadas',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/frango-grelhado.jpg',
    videoUrl: null, // Pronto para receber URL de vídeo 9:16 gerado via Google Flow
    badge: 'Mais pedido da segunda',
    caloriesApprox: '520 kcal (tam. M)',
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
    tagline: 'Cozimento lento, carne que desfia na colher e molho aveludado.',
    description:
      'Cortes nobres de carne bovina dourados e cozidos lentamente em fogo brando com cebolas caramelizadas, cenouras macias, batatinhas e cheiro-verde fresco. Conforto e sabor de domingo em plena terça-feira.',
    ingredients: [
      'Músculo bovino / Acém selecionado',
      'Cenoura baby e batatas',
      'Molho encorpado de cebola e tomate',
      'Louro e cheiro-verde da horta',
      'Arroz branco',
      'Feijão carioca cremoso',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/carne-de-panela.jpg',
    videoUrl: null,
    badge: 'Receita de família',
    caloriesApprox: '610 kcal (tam. M)',
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
    tagline: 'O clássico brasileiro afetivo que todo mundo ama na quarta.',
    description:
      'Patinho moído de primeira refogado no alho dourado, tomate maduro, azeitonas verdes picadinhas e cheiro-verde. Servido com arroz, feijão preto ou carioca, banana-da-terra grelhada e farofinha crocante.',
    ingredients: [
      'Patinho moído fresco',
      'Azeitonas verdes fatiadas',
      'Tomate confitado e cebola',
      'Banana-da-terra dourada',
      'Farofa artesanal na manteiga',
      'Feijão preto com louro',
    ],
    category: 'tradicionais',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/carne-moida.jpg',
    videoUrl: null,
    badge: 'Favorito do público',
    caloriesApprox: '580 kcal (tam. M)',
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
    tagline: 'Super fofa, recheada de queijo derretido, espinafre e tomatinhos.',
    description:
      'Ovos caipiras batidos com ervas frescas, recheados generosamente com queijo minas padrão derretido, tomatinhos cereja assados e espinafre fresco. Acompanha arroz integral e salada verde com toque cítrico.',
    ingredients: [
      'Ovos caipiras frescos',
      'Queijo minas padrão artesanal',
      'Tomate cereja assado no azeite',
      'Espinafre fresco salteado',
      'Arroz integral com grãos',
      'Mix de folhas e cenoura',
    ],
    category: 'vegetarianos',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/omelete-vegetariana.jpg',
    videoUrl: null,
    badge: 'Opção leve e vegetariana',
    caloriesApprox: '460 kcal (tam. M)',
    featuredIngredient: 'Ovos Caipiras & Queijo Minas',
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
    tagline: 'Cores vibrantes, textura assada caramelizada e muita saciedade.',
    description:
      'Mix farto de abóbora cabotiá, abobrinha brasileira, berinjela e pimentões assados lentamente no azeite com alho inteiro e alecrim fresco. Servido com grão-de-bico temperado e arroz integral aromático.',
    ingredients: [
      'Abóbora cabotiá assada',
      'Grão-de-bico macio salteado',
      'Abobrinha e pimentão doce',
      'Alecrim fresco e azeite extravirgem',
      'Arroz integral com castanhas',
      'Rúcula com vinagrete leve',
    ],
    category: 'vegetarianos',
    mediumPriceCents: 2200,
    largePriceCents: 2800,
    image: '/images/dishes/refeicao-vegetariana.jpg',
    videoUrl: null,
    badge: '100% Plant-Based',
    caloriesApprox: '490 kcal (tam. M)',
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
    description: 'A base da culinária afetiva brasileira, feito todo dia fresquinho.',
  },
  {
    id: 'portfolio-pure-batata',
    name: 'Filé com Purê Aveludado & Brócolis',
    category: 'tradicionais',
    image: '/images/dishes/pure-batata.jpg',
    description: 'Purê cremoso de batatas selecionadas com noz-moscada ralada na hora.',
  },
  {
    id: 'portfolio-refeicao-leve',
    name: 'Bowl Leve & Nutritivo com Frango e Folhas',
    category: 'leves',
    image: '/images/dishes/refeicao-leve.jpg',
    description: 'Para quem busca leveza, equilíbrio e nutrientes frescos no dia a dia.',
  },
];
