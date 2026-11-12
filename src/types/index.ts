export type DayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta';

export type DishCategory = 'todos' | 'tradicionais' | 'leves' | 'vegetarianos';

export type DishSize = 'medium' | 'large';

export interface SizeOption {
  id: DishSize;
  name: string;
  label: string;
  weightApprox: string;
  priceCents: number;
}

export interface ProteinOption {
  id: string;
  name: string;
  included?: boolean;
}

export interface SideOption {
  id: string;
  name: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  priceCents: number;
}

export interface Dish {
  id: string;
  day: DayOfWeek;
  dayLabel: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  category: 'tradicionais' | 'leves' | 'vegetarianos';
  mediumPriceCents: number;
  largePriceCents: number;
  image: string;
  videoUrl?: string | null; // Prepared for future 9:16 vertical video assets
  allowedProteins: ProteinOption[];
  allowedSides: SideOption[];
  minSides: number;
  maxSides: number;
  badge?: string;
  caloriesApprox?: string;
  featuredIngredient?: string; // Destaque de Ingrediente principal
}

export interface CustomizationSelection {
  size: DishSize;
  selectedProtein: string;
  selectedSides: string[];
  selectedExtras: string[];
  observation: string;
}

export interface CartItem {
  id: string;
  dishId: string;
  dishName: string;
  dishImage: string;
  dayLabel: string;
  size: DishSize;
  sizeLabel: string;
  protein: string;
  sides: string[];
  extras: { id: string; name: string; priceCents: number }[];
  observation: string;
  unitPriceCents: number;
  quantity: number;
}

export interface CheckoutForm {
  customerName: string;
  customerPhone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  reference: string;
  paymentMethod: 'pix' | 'dinheiro' | 'cartao';
  generalNotes: string;
}
