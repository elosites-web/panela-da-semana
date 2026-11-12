import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Qual o horário limite para pedir o almoço do dia?',
      a: `Nossa produção começa bem cedinho! Aceitamos pedidos a partir das 08h e recomendamos confirmar até as 11h30 para garantir o melhor horário de entrega da sua rota. Nossas entregas acontecem entre 11h30 e 14h30.`,
    },
    {
      q: 'Quais são os tamanhos disponíveis e o peso aproximado?',
      a: 'Oferecemos dois tamanhos pensados para a sua fome: o tamanho Médio (M, aprox. 500g, R$ 22,00), ideal para o dia a dia; e o tamanho Grande (G, aprox. 750g, R$ 28,00), perfeito para quem tem mais apetite ou quer dividir.',
    },
    {
      q: 'Posso pedir para mais de um dia da semana de uma vez?',
      a: 'Sim! Você pode adicionar marmitas de diferentes dias da semana no mesmo pedido. Ao falar conosco no WhatsApp, alinhamos se você deseja receber tudo em entregas programadas diárias ou receber no início da semana para reaquecer.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'O pagamento é combinado diretamente com a nossa equipe no WhatsApp após o envio do pedido. Aceitamos Pix, cartão de débito/crédito na entrega ou dinheiro com troco informado.',
    },
    {
      q: 'Como os pratos chegam e como devo aquecer?',
      a: 'Nossas marmitas são entregues em embalagens térmicas e seladas para consumo imediato. Caso deseje aquecer mais tarde, a embalagem é própria para micro-ondas (recomendamos de 2 a 3 minutos).',
    },
    {
      q: 'A Panela da Semana atende toda a cidade?',
      a: `Atendemos rotas de bairros selecionados. Na etapa de finalização do pedido via WhatsApp (+${BRAND_CONFIG.whatsappPhone}), confirmamos imediatamente a cobertura do seu CEP e o prazo exato de envio.`,
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F8F3E9] border-b border-[#EFE8DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-[#5C675B]">
            Tudo o que você precisa saber sobre o cardápio, pedidos e horários de entrega.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EFE8DA] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFFCF7] transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#252B24]">
                    {faq.q}
                  </span>
                  <span
                    className={`p-1.5 rounded-full bg-[#F8F3E9] text-[#344B35] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#344B35] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C675B] leading-relaxed border-t border-[#EFE8DA]/50 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
