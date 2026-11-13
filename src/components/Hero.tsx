import React from 'react';
import { ArrowDown, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../data/config';

interface HeroProps {
  onScrollToMenu: () => void;
  onOpenStories: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu, onOpenStories }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F3E9]/72 via-[#FFFCF7]/55 to-[#FFFCF7]/55 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EFE8DA]">
      {/* Decorative subtle texture/glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C96F4A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#647A52]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Prototype disclosure banner */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DA] border border-[#647A52]/20 text-[#344B35] text-xs font-semibold mb-6 tracking-wide shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
          <span>{BRAND_CONFIG.prototypeNotice}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left copy column */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4A]">
                Experiência de cardápio digital semanal
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#252B24] tracking-tight leading-[1.12]">
                Seu almoço da semana começa aqui.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#5C675B] leading-relaxed max-w-xl">
              Uma proposta de cardápio digital semanal pensada para tornar a escolha do almoço mais prática e intuitiva. Navegue pelas sugestões ilustrativas de segunda a sexta, personalize seus pratos e monte seu pedido em poucos cliques.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-medium text-[#344B35]">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#EFE8DA]">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Proposta de cardápio rotativo semanal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#EFE8DA]">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Personalização nos tamanhos M e G</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-[#EFE8DA]">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Montagem rápida para WhatsApp</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onScrollToMenu}
                className="flex items-center gap-2.5 bg-[#344B35] hover:bg-[#252B24] text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
              >
                <span>Ver cardápio da semana</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenStories}
                className="flex items-center gap-2 bg-[#F8F3E9] hover:bg-[#EFE8DA] text-[#344B35] border border-[#647A52]/30 px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-102 cursor-pointer"
              >
                <span>Montar meu pedido</span>
                <ChevronRight className="w-4 h-4 text-[#C96F4A]" />
              </button>
            </div>
          </motion.div>

          {/* Right hero image column */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with warm organic border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EFE8DA]">
                <img
                  src="/images/banners/hero-panela-da-semana.jpg"
                  alt="Mesa farta de almoço brasileiro com panela de feijão, arroz, frango grelhado e salada fresca"
                  className="w-full h-auto object-cover aspect-16/10 sm:aspect-4/3 lg:aspect-square transform hover:scale-103 transition-transform duration-500"
                  loading="eager"
                />

                {/* Overlaid pill badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EFE8DA] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#C96F4A]">
                      Protótipo Semanal
                    </span>
                    <span className="font-serif font-bold text-sm text-[#252B24]">
                      Cardápio ilustrativo de segunda a sexta
                    </span>
                  </div>
                  <span className="text-xs bg-[#344B35] text-white font-bold px-3 py-1.5 rounded-full">
                    A partir de R$ 22
                  </span>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -top-3 -right-3 bg-[#C96F4A] text-white font-serif font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md rotate-2 border-2 border-white">
                ✨ Sugestões da semana
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
