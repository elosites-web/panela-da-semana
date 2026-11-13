import React from 'react';
import { Heart, Sparkles, Shield, Leaf, Clock, Award } from 'lucide-react';
import { ADDITIONAL_DISHES_PORTFOLIO } from '../data/config';
import { ScrollReveal } from './ScrollReveal';

export const BrandValues: React.FC = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'Proposta de temperos tradicionais',
      desc: 'Receitas planejadas em torno de temperos tradicionais do dia a dia, como alho, cebola, ervas e caldos culinários.',
    },
    {
      icon: Leaf,
      title: 'Cardápio variado na semana',
      desc: 'Cinco combinações ilustrativas de segunda a sexta, equilibrando pratos tradicionais e alternativas vegetarianas.',
    },
    {
      icon: Clock,
      title: 'Fluxo direto de atendimento',
      desc: 'Protótipo desenhado para organizar escolha de tamanho, proteína e guarnições antes do contato por WhatsApp.',
    },
    {
      icon: Shield,
      title: 'Embalagem a definir na operação',
      desc: 'Padrões finais de acondicionamento, conservação e reaquecimento serão definidos conforme a operação real.',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-24 bg-[#FFFCF7]/55">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <ScrollReveal className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Proposta Culinária do Projeto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Um conceito culinário pensado para o dia a dia
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C675B]">
            A proposta da Panela da Semana reúne variedade semanal, personalização simples e apresentação cuidada em uma demonstração comercial.
          </p>
        </ScrollReveal>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
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
              </ScrollReveal>
            );
          })}
        </div>

        {/* Gallery of Complementary Prepared Dishes */}
        <div className="bg-[#344B35] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <ScrollReveal className="relative z-10 max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-1">
              Galeria Conceitual
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFCF7]">
              Referências visuais do estilo de cozinha
            </h3>
            <p className="text-xs sm:text-sm text-[#EFE8DA] mt-2">
              Imagens ilustrativas que traduzem a estética e o cuidado visual da proposta.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {ADDITIONAL_DISHES_PORTFOLIO.map((dish, idx) => (
              <ScrollReveal
                key={dish.id}
                delay={idx * 0.08}
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
                  <span className="text-[10px] uppercase font-bold text-[#F5B935] tracking-wider mt-3">
                    Ilustração fotográfica do cardápio
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
