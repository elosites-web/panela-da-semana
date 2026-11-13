import React from 'react';
import { Phone, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToMenu }) => {
  return (
    <footer className="relative z-10 bg-[#252B24] text-[#F8F3E9] pt-14 pb-10 border-t border-[#344B35]">
      <ScrollReveal yOffset={20} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center">
                <img
                  src="/images/logo/panela-da-semana-symbol.jpg"
                  alt="Símbolo Panela da Semana"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-xs text-[#EFE8DA]/80">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EFE8DA]/70 leading-relaxed max-w-sm">
              Proposta conceitual de cardápio rotativo semanal com foco em culinária cotidiana, personalização de pratos e simulação de pedidos.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#F5B935] bg-[#344B35]/60 px-3 py-1.5 rounded-full border border-[#C96F4A]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{BRAND_CONFIG.prototypeNotice}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96F4A] block">
              Navegação
            </span>
            <ul className="space-y-2 text-xs text-[#EFE8DA]/80 font-medium">
              <li>
                <button
                  onClick={onScrollToMenu}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cardápio da Semana
                </button>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#diferenciais"
                  className="hover:text-white transition-colors"
                >
                  Diferenciais da Cozinha
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C96F4A] block">
              Atendimento & Pedidos
            </span>
            <div className="space-y-2.5 text-xs text-[#EFE8DA]/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C96F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Horários (ilustrativos):</strong>
                  <span>{BRAND_CONFIG.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C96F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">WhatsApp de testes (demonstração):</strong>
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C96F4A] underline font-mono"
                  >
                    +{BRAND_CONFIG.whatsappPhone} ({BRAND_CONFIG.whatsappDisplay})
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C96F4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Região prevista (conceito):</strong>
                  <span>{BRAND_CONFIG.serviceArea}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE8DA]/60">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-[#C96F4A] fill-current" />
            <span>para a mesa brasileira.</span>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
