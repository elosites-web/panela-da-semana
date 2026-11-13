import React from 'react';
import { CalendarDays, UtensilsCrossed, MessageSquareText, Bike } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: CalendarDays,
      title: 'Escolha seu dia',
      description:
        'Cada dia da semana apresenta uma combinação ilustrativa de segunda a sexta-feira.',
    },
    {
      step: '02',
      icon: UtensilsCrossed,
      title: 'Monte sua marmita',
      description:
        'Selecione o tamanho ideal (M ou G), defina suas guarnições favoritas e adicione extras disponíveis no cardápio.',
    },
    {
      step: '03',
      icon: MessageSquareText,
      title: 'Prepare no WhatsApp',
      description:
        'Seu pedido sai formatado automaticamente para você revisar e enviar no número de teste do projeto.',
    },
    {
      step: '04',
      icon: Bike,
      title: 'Confirmação na operação',
      description:
        'Etapa ilustrativa: em uma operação real, prazos, formas de entrega e confirmação são alinhados diretamente no atendimento.',
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-[#F8F3E9]/68 border-y border-[#EFE8DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Passo a Passo Simples
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Como funciona a Panela da Semana
          </h2>
          <p className="mt-3 text-sm text-[#5C675B]">
            Sem aplicativo complicado: você escolhe pelo cardápio ilustrativo e prepara a mensagem para o WhatsApp.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 0.08}
                className="bg-white rounded-3xl p-6 border border-[#EFE8DA] shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#C96F4A]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F3E9] group-hover:bg-[#344B35] text-[#344B35] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#252B24] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C675B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
