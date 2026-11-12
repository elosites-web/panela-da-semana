import React from 'react';
import { Heart, Sparkles, Shield, Leaf, Clock, Award } from 'lucide-react';
import { ADDITIONAL_DISHES_PORTFOLIO } from '../data/config';

export const BrandValues: React.FC = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'Tempero de casa, sem atalhos',
      desc: 'Alho dourado na hora, cebola picadinha, louro fresco e caldos naturais. Zero conservantes ou temperos químicos.',
    },
    {
      icon: Leaf,
      title: 'Ingredientes da estação',
      desc: 'Legumes frescos dos melhores produtores locais e cortes magros e selecionados para cada dia da semana.',
    },
    {
      icon: Clock,
      title: 'Pontualidade no almoço',
      desc: 'Produzido na manhã do dia e entregue pontualmente entre 11h30 e 13h30 para que seu almoço chegue quente.',
    },
    {
      icon: Shield,
      title: 'Embalagem biodegradável e selada',
      desc: 'Potes térmicos seguros que não vazam, preservam a textura dos acompanhamentos e são próprios para aquecer.',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-24 bg-[#FFFCF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Nossos Princípios na Cozinha
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Comida boa de verdade, feita para quem valoriza o tempo e a saúde
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C675B]">
            A Panela da Semana nasceu para resolver o dilema entre comida rápida sem valor nutricional e o cansaço de cozinhar todos os dias.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8F3E9] p-6 rounded-3xl border border-[#EFE8DA] space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#344B35] text-[#F8F3E9] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#252B24]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C675B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Gallery of Complementary Prepared Dishes */}
        <div className="bg-[#344B35] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-1">
              Galeria da Cozinha
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFCF7]">
              Cada detalhe do prato importa para nós
            </h3>
            <p className="text-xs sm:text-sm text-[#EFE8DA] mt-2">
              Desde o feijão com caldo espesso até os vegetais no ponto exato de cozimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {ADDITIONAL_DISHES_PORTFOLIO.map((dish) => (
              <div
                key={dish.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/15 flex flex-col group hover:bg-white/15 transition-all"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#FFFCF7]">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-[#EFE8DA]/90 mt-1">
                      {dish.description}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#C96F4A] tracking-wider mt-3">
                    Ilustração fotográfica do cardápio
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
