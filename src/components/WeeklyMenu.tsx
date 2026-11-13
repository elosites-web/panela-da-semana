import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Eye, PlusCircle, Check, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { WEEKLY_DISHES } from '../data/config';
import { DayOfWeek, Dish, DishCategory } from '../types';
import { formatCurrency } from '../utils/pricing';
import { ScrollReveal } from './ScrollReveal';

interface WeeklyMenuProps {
  onSelectDishToCustomize: (dish: Dish) => void;
  onOpenDishStories: (dishId: string) => void;
}

const DAYS_OF_WEEK: { key: DayOfWeek; label: string; short: string; dayTag: string }[] = [
  { key: 'segunda', label: 'Segunda-feira', short: 'Seg', dayTag: 'Início leve & saboroso' },
  { key: 'terca', label: 'Terça-feira', short: 'Ter', dayTag: 'Conforto & carne de panela' },
  { key: 'quarta', label: 'Quarta-feira', short: 'Qua', dayTag: 'Clássico afetivo' },
  { key: 'quinta', label: 'Quinta-feira', short: 'Qui', dayTag: 'Equilíbrio & omelete' },
  { key: 'sexta', label: 'Sexta-feira', short: 'Sex', dayTag: 'Plant-based & leveza' },
];

const CATEGORIES: { key: DishCategory; label: string }[] = [
  { key: 'todos', label: 'Todos os Pratos' },
  { key: 'tradicionais', label: 'Tradicionais' },
  { key: 'leves', label: 'Leves' },
  { key: 'vegetarianos', label: 'Vegetarianos' },
];

export const WeeklyMenu: React.FC<WeeklyMenuProps> = ({
  onSelectDishToCustomize,
  onOpenDishStories,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'todos'>('segunda');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('todos');

  // Filter dishes based on active day and category
  const filteredDishes = WEEKLY_DISHES.filter((dish) => {
    const matchesDay = selectedDay === 'todos' || dish.day === selectedDay;
    const matchesCategory =
      selectedCategory === 'todos' || dish.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  return (
    <section id="cardapio" className="py-16 sm:py-20 bg-[#FFFCF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Cardápio Rotativo da Semana
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Sugestões pensadas para o almoço da semana
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C675B]">
            Navegue pelos dias da semana de segunda a sexta, personalize a proteína, escolha suas guarnições favoritas e adicione ao pedido.
          </p>
        </ScrollReveal>

        {/* Days Selector Tabs */}
        <ScrollReveal delay={0.08} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#344B35]">
              1. Selecione o dia da semana:
            </span>
            <button
              onClick={() => setSelectedDay('todos')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedDay === 'todos'
                  ? 'bg-[#344B35] text-white shadow-xs'
                  : 'text-[#5C675B] hover:text-[#252B24] hover:bg-[#EFE8DA]'
              }`}
            >
              Ver semana completa (5 dias)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DAYS_OF_WEEK.map((day) => {
              const isActive = selectedDay === day.key;
              return (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-[#344B35] border-[#344B35] text-white shadow-md scale-102 ring-2 ring-[#C96F4A]/30'
                      : 'bg-white border-[#EFE8DA] text-[#252B24] hover:border-[#647A52]/40 hover:bg-[#F8F3E9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      {day.short}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#C96F4A]"></span>
                    )}
                  </div>
                  <div className="font-serif font-bold text-sm sm:text-base mt-1">
                    {day.label.split('-')[0]}
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? 'text-[#EFE8DA]' : 'text-[#5C675B]'
                    }`}
                  >
                    {day.dayTag}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Categories Bar & Stories Callout */}
        <ScrollReveal
          delay={0.12}
          className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 bg-[#F8F3E9] rounded-2xl border border-[#EFE8DA] mb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#344B35] flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtrar por:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#C96F4A] text-white shadow-xs'
                    : 'bg-white/80 text-[#5C675B] hover:text-[#252B24] hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Stories shortcut button */}
          <button
            onClick={() => onOpenDishStories(filteredDishes[0]?.id || WEEKLY_DISHES[0].id)}
            className="flex items-center gap-2 text-xs font-bold text-[#344B35] bg-white hover:bg-[#EFE8DA] px-3.5 py-2 rounded-full border border-[#647A52]/20 transition-all hover:scale-102 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Ver fotos em modo Stories</span>
          </button>
        </ScrollReveal>

        {/* Dish Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE8DA] p-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F8F3E9] flex items-center justify-center text-[#C96F4A] mb-3">
              🍲
            </div>
            <h3 className="font-serif text-lg font-bold text-[#252B24]">
              Nenhum prato encontrado para este filtro
            </h3>
            <p className="text-xs text-[#5C675B] mt-1 max-w-sm mx-auto">
              Experimente selecionar a opção "Todos os Pratos" ou clicar em outro dia da semana.
            </p>
            <button
              onClick={() => {
                setSelectedDay('todos');
                setSelectedCategory('todos');
              }}
              className="mt-4 text-xs font-bold text-[#344B35] underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish, idx) => (
              <motion.article
                key={dish.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx * 0.08, 0.32),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white rounded-3xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F8F3E9]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle bottom scrim for badge contrast over food photography */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/15 to-transparent"
                  />

                  {/* Day badge */}
                  <div className="absolute top-3.5 left-3.5 bg-[#252B24]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {dish.dayLabel}
                  </div>

                  {/* Highlight badge */}
                  {dish.badge && (
                    <div className="absolute top-3.5 right-3.5 bg-[#C96F4A] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      {dish.badge}
                    </div>
                  )}

                  {/* Bottom overlay: Destaque de Ingrediente + Stories Preview */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                    {dish.featuredIngredient ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#FFFCF7]/92 backdrop-blur-md text-[#252B24] border border-[#EFE8DA] text-[11px] font-semibold shadow-sm min-w-0">
                        <Leaf className="w-3.5 h-3.5 text-[#C96F4A] shrink-0" />
                        <span className="truncate">{dish.featuredIngredient}</span>
                      </div>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={() => onOpenDishStories(dish.id)}
                      aria-label={`Ver fotos em tela cheia do prato ${dish.name}`}
                      className="shrink-0 bg-white/90 hover:bg-white text-[#252B24] p-2 rounded-xl backdrop-blur-md shadow-md transition-all hover:scale-110 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C96F4A]" />
                      <span className="hidden sm:inline">Fotos</span>
                    </button>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category tag */}
                    <div className="flex items-center justify-between text-xs text-[#5C675B] mb-2 font-medium">
                      <span className="capitalize text-[#344B35] font-semibold">
                        {dish.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#252B24] leading-snug group-hover:text-[#344B35] transition-colors">
                      {dish.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5C675B] mt-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Ingredients summary */}
                    <div className="mt-4 pt-3 border-t border-[#EFE8DA]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#344B35] block mb-1.5">
                        Composição ilustrativa:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dish.ingredients.slice(0, 4).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#F8F3E9] text-[#344B35] px-2.5 py-1 rounded-md font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action CTA */}
                  <div className="mt-6 pt-4 border-t border-[#EFE8DA] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-[#5C675B] font-medium">
                        Preço a partir de:
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-xl font-bold text-[#252B24]">
                          {formatCurrency(dish.mediumPriceCents)}
                        </span>
                        <span className="text-xs text-[#5C675B] font-medium">
                          (Tam. M)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDishToCustomize(dish)}
                      className="flex items-center gap-1.5 bg-[#344B35] hover:bg-[#252B24] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all hover:scale-102 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                    >
                      <PlusCircle className="w-4 h-4 text-[#F8F3E9]" />
                      <span>Montar Prato</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
