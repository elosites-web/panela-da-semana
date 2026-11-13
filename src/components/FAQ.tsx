import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { ScrollReveal } from './ScrollReveal';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Os horários de atendimento já estão definidos?',
      a: 'Ainda não. Este site é uma demonstração de conceito; os horários finais de recebimento de pedidos, preparo e janela de entrega serão confirmados quando a operação for iniciada.',
    },
    {
      q: 'Quais são os tamanhos disponíveis no cardápio ilustrativo?',
      a: 'A demonstração apresenta duas opções de tamanho: Marmita Média (M, R$ 22,00 ilustrativos) e Marmita Grande (G, R$ 28,00 ilustrativos). As gramaturas finais não são exibidas aqui e serão definidas na padronização da cozinha.',
    },
    {
      q: 'Posso simular pedidos para mais de um dia da semana de uma vez?',
      a: 'Sim. Na simulação do site, você pode combinar pratos de diferentes dias da semana no mesmo carrinho. Em uma operação real, a logística de entregas diárias ou programadas é alinhada diretamente no atendimento.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'O formulário apenas registra a preferência escolhida (como Pix, cartão ou dinheiro) para compor a mensagem demonstrativa. A disponibilidade real das formas de pagamento será confirmada diretamente pelo estabelecimento.',
    },
    {
      q: 'Como funcionam as embalagens, conservação e reaquecimento?',
      a: 'Por se tratar de um protótipo conceitual, o modelo de embalagem, as condições de conservação e as instruções de aquecimento serão padronizados e informados antes do início da operação.',
    },
    {
      q: 'Qual é a região prevista para atendimento?',
      a: `O conceito foi pensado para a região de Jundiaí — SP, mas os bairros atendidos, rotas e eventuais taxas de entrega ainda dependem de confirmação. O número exibido no protótipo (+${BRAND_CONFIG.whatsappPhone}) é um WhatsApp de teste para demonstração do fluxo.`,
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F8F3E9] border-b border-[#EFE8DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A] block mb-2">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252B24] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-[#5C675B]">
            Esclarecimentos sobre o funcionamento deste protótipo e informações que dependem de confirmação operacional.
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 0.05}
                yOffset={16}
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
