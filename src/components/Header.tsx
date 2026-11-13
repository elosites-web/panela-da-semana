import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Clock } from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { formatCurrency } from '../utils/pricing';

interface HeaderProps {
  cartItemCount: number;
  cartTotalCents: number;
  onOpenCart: () => void;
  onNavigateToMenu: () => void;
  onOpenStories: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotalCents,
  onOpenCart,
  onNavigateToMenu,
  onOpenStories,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Travar o scroll do corpo do site quando o menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Navegação suave com cálculo exato de ancoragem descontando a faixa inferior do cabeçalho
  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 104;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      {/* Top micro-bar expandida para as laterais */}
      <div className="bg-[#344B35] text-[#F8F3E9] text-xs py-1.5 px-4 sm:px-6 lg:px-8 font-medium">
        <div className="max-w-7xl lg:max-w-[1400px] w-full mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C96F4A] animate-pulse"></span>
            <span>Protótipo demonstrativo — cardápio ilustrativo</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs text-[#EFE8DA]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C96F4A]" />
              {BRAND_CONFIG.hours}
            </span>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C96F4A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp de teste: {BRAND_CONFIG.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container em largura total no desktop, com destaque em amarelo gema de ovo (#F4C430) */}
      <div className="w-full py-3.5 sm:py-4 px-4 sm:px-6 xl:px-10 2xl:px-12 flex items-center justify-between gap-2.5 lg:gap-3 xl:gap-6 bg-[#F4C430] backdrop-blur-[12px] border-b border-[#344B35]/15 shadow-sm transition-all">
        {/* Brand identity: logo symbol + editable typography */}
        <a
          href="#"
          className="flex items-center gap-2.5 xl:gap-3.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#344B35] rounded-lg py-0.5 px-1 min-w-0 lg:shrink-0"
          aria-label="Panela da Semana - Início"
        >
          <div className="relative w-10 h-10 xl:w-11 xl:h-11 rounded-full overflow-hidden bg-[#FFFCF7] border-2 border-[#344B35]/25 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/images/logo/panela-da-semana-symbol.jpg"
              alt="Símbolo Panela da Semana"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="min-w-0">
            <span className="block font-serif text-base sm:text-lg xl:text-2xl font-bold tracking-tight text-[#252B24] group-hover:text-[#344B35] transition-colors leading-tight truncate">
              {BRAND_CONFIG.name}
            </span>
            <span className="block lg:hidden xl:block text-[10px] sm:text-[11px] xl:text-xs font-medium text-[#252B24]/85 tracking-wide mt-0.5 truncate max-w-[175px] sm:max-w-none">
              {BRAND_CONFIG.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links: centralizados, espaçamento fluido e contraste reforçado sobre #F4C430 */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-4 2xl:gap-8 text-[13px] xl:text-sm font-semibold text-[#252B24] whitespace-nowrap px-1">
          <button
            onClick={() => handleNavClick('cardapio')}
            className="hover:text-[#344B35] hover:bg-[#FFFCF7]/50 rounded-lg transition-colors cursor-pointer py-1.5 px-1.5 xl:px-2.5"
          >
            Cardápio Semanal
          </button>
          <button
            onClick={onOpenStories}
            className="flex items-center gap-1.5 text-[#344B35] bg-[#FFFCF7]/95 hover:bg-white px-2.5 xl:px-3.5 py-1.5 rounded-full border border-[#344B35]/20 font-semibold transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#C96F4A]"></span>
            Ver em Stories
          </button>
          <button
            onClick={() => handleNavClick('como-funciona')}
            className="hover:text-[#344B35] hover:bg-[#FFFCF7]/50 rounded-lg transition-colors cursor-pointer py-1.5 px-1.5 xl:px-2.5"
          >
            Como Funciona
          </button>
          <button
            onClick={() => handleNavClick('diferenciais')}
            className="hover:text-[#344B35] hover:bg-[#FFFCF7]/50 rounded-lg transition-colors cursor-pointer py-1.5 px-1.5 xl:px-2.5"
          >
            Sobre a Panela
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#344B35] hover:bg-[#FFFCF7]/50 rounded-lg transition-colors cursor-pointer py-1.5 px-1.5 xl:px-2.5"
          >
            Dúvidas
          </button>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cart button */}
          <button
            onClick={onOpenCart}
            aria-label={`Ver carrinho com ${cartItemCount} itens`}
            className="relative flex items-center gap-1.5 sm:gap-2 bg-[#344B35] hover:bg-[#252B24] text-white p-2 sm:px-3.5 sm:py-2.5 xl:px-4 rounded-xl font-medium shadow-xs transition-all hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#252B24] shrink-0"
          >
            <ShoppingBag className="w-5 h-5 text-[#F8F3E9]" />
            <span className="hidden sm:inline text-sm font-semibold">Minha Panela</span>
            {cartItemCount > 0 ? (
              <span className="inline-flex items-center justify-center bg-[#C96F4A] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 h-5">
                {cartItemCount}
              </span>
            ) : null}
            {cartTotalCents > 0 ? (
              <span className="hidden xl:inline text-xs bg-white/15 px-2 py-0.5 rounded-md font-medium text-[#F8F3E9]">
                {formatCurrency(cartTotalCents)}
              </span>
            ) : null}
          </button>

          {/* Mobile/Tablet menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            className="lg:hidden p-2 text-[#252B24] hover:text-[#344B35] rounded-xl hover:bg-[#FFFCF7]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#344B35] cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown com Véu Opaco de Fundo e Scroll Restrito ao Menu */}
      {mobileMenuOpen && (
        <>
          {/* Véu Opaco de Fundo entre o menu aberto e a página selecionada */}
          <div
            className="fixed inset-0 top-[110px] lg:hidden bg-black/60 backdrop-blur-xs z-30 transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Contêiner do Menu Mobile com Scroll Exclusivo */}
          <div className="relative z-40 lg:hidden bg-[#FFFCF7] border-b border-[#EFE8DA] px-5 pt-4 pb-8 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2 font-medium text-base text-[#252B24]">
              <button
                onClick={() => handleNavClick('cardapio')}
                className="text-left py-2.5 px-3.5 rounded-xl hover:bg-[#F8F3E9] transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>🍱 Cardápio Semanal</span>
                <span className="text-xs text-[#5C675B]">Ver pratos</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStories();
                }}
                className="text-left py-2.5 px-3.5 rounded-xl bg-[#F8F3E9] text-[#344B35] font-semibold flex items-center justify-between cursor-pointer"
              >
                <span>✨ Cardápio em Fotos / Stories</span>
                <span className="text-xs bg-[#C96F4A] text-white px-2.5 py-0.5 rounded-full font-bold">
                  Novo
                </span>
              </button>
              <button
                onClick={() => handleNavClick('como-funciona')}
                className="text-left py-2.5 px-3.5 rounded-xl hover:bg-[#F8F3E9] transition-colors cursor-pointer"
              >
                ⚙️ Como Funciona
              </button>
              <button
                onClick={() => handleNavClick('diferenciais')}
                className="text-left py-2.5 px-3.5 rounded-xl hover:bg-[#F8F3E9] transition-colors cursor-pointer"
              >
                🌿 Sobre a Panela da Semana
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="text-left py-2.5 px-3.5 rounded-xl hover:bg-[#F8F3E9] transition-colors cursor-pointer"
              >
                💬 Perguntas Frequentes
              </button>
            </nav>

            <div className="mt-5 pt-4 border-t border-[#EFE8DA] flex flex-col gap-3 text-xs text-[#5C675B]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>{BRAND_CONFIG.hours}</span>
              </div>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#344B35] font-bold mt-1 bg-[#344B35]/10 p-2.5 rounded-xl"
              >
                <Phone className="w-4 h-4 text-[#647A52] shrink-0" />
                <span>WhatsApp de teste (demonstração): {BRAND_CONFIG.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
