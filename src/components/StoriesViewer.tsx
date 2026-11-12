import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, PlusCircle, Sparkles, Leaf } from 'lucide-react';
import { WEEKLY_DISHES } from '../data/config';
import { Dish } from '../types';
import { formatCurrency } from '../utils/pricing';

interface StoriesViewerProps {
  initialDishId?: string;
  isOpen: boolean;
  onClose: () => void;
  onCustomize: (dish: Dish) => void;
}

export const StoriesViewer: React.FC<StoriesViewerProps> = ({
  initialDishId,
  isOpen,
  onClose,
  onCustomize,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync index when initialDishId changes or modal opens
  useEffect(() => {
    if (initialDishId) {
      const foundIdx = WEEKLY_DISHES.findIndex((d) => d.id === initialDishId);
      if (foundIdx !== -1) {
        setCurrentIndex(foundIdx);
      }
    }
  }, [initialDishId, isOpen]);

  // Handle keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentDish = WEEKLY_DISHES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WEEKLY_DISHES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + WEEKLY_DISHES.length) % WEEKLY_DISHES.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização em Stories: ${currentDish.name}`}
    >
      {/* Backdrop overlay dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Stories Mobile/Vertical Card Container (9:16 ratio on mobile, fixed max-w on desktop) */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[820px] bg-[#1E241E] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border border-white/10 select-none">
        {/* Top Progress bars for all dishes */}
        <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5">
          {WEEKLY_DISHES.map((dish, idx) => (
            <div
              key={dish.id}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setCurrentIndex(idx)}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-[#C96F4A] w-full'
                    : idx < currentIndex
                    ? 'bg-white w-full'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Header Bar inside Story */}
        <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 border border-white/40">
              <img
                src="/images/logo/panela-da-semana-symbol.jpg"
                alt="Panela da Semana"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block text-xs font-bold leading-tight">Panela da Semana</span>
              <span className="block text-[10px] text-white/80 font-medium">
                {currentDish.dayLabel} • {currentIndex + 1} de {WEEKLY_DISHES.length}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar Stories"
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Surface (Prepared for vertical 9:16 video or high-res photo fallback) */}
        <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
          {currentDish.videoUrl ? (
            <video
              src={currentDish.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentDish.image}
              alt={currentDish.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Left / Right touch zones for previous/next */}
          <button
            onClick={handlePrev}
            aria-label="Prato anterior"
            className="absolute top-16 bottom-40 left-0 w-1/3 opacity-0 hover:opacity-100 flex items-center justify-start pl-3 text-white transition-opacity cursor-pointer"
          >
            <span className="p-2 rounded-full bg-black/30 backdrop-blur-xs">
              <ChevronLeft className="w-6 h-6" />
            </span>
          </button>
          <button
            onClick={handleNext}
            aria-label="Próximo prato"
            className="absolute top-16 bottom-40 right-0 w-1/3 opacity-0 hover:opacity-100 flex items-center justify-end pr-3 text-white transition-opacity cursor-pointer"
          >
            <span className="p-2 rounded-full bg-black/30 backdrop-blur-xs">
              <ChevronRight className="w-6 h-6" />
            </span>
          </button>

          {/* Gradient Overlay for bottom text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Content Card */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-30 text-white space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-[#C96F4A] px-2.5 py-0.5 rounded-full">
              {currentDish.dayLabel}
            </span>
            <span className="text-xs text-white/80 capitalize font-medium">
              {currentDish.category}
            </span>
            {currentDish.caloriesApprox && (
              <span className="text-xs text-white/70 ml-auto">
                {currentDish.caloriesApprox}
              </span>
            )}
          </div>

          {currentDish.featuredIngredient && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
              <Leaf className="w-3 h-3 text-[#C96F4A] shrink-0" />
              <span>
                <strong className="text-[#C96F4A]">Destaque:</strong> {currentDish.featuredIngredient}
              </span>
            </div>
          )}

          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
            {currentDish.name}
          </h3>

          <p className="text-xs text-white/90 line-clamp-3 leading-relaxed">
            {currentDish.description}
          </p>

          {/* CTA & Price Bar */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] text-white/70 uppercase tracking-wider font-semibold">
                A partir de
              </span>
              <span className="font-serif text-2xl font-bold text-white">
                {formatCurrency(currentDish.mediumPriceCents)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCustomize(currentDish);
              }}
              className="flex items-center gap-2 bg-[#C96F4A] hover:bg-[#A95635] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all hover:scale-103 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Personalizar Prato</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/60 pt-1">
            <Sparkles className="w-3 h-3 text-[#C96F4A]" />
            <span>Toque nas laterais para alternar entre os dias da semana</span>
          </div>
        </div>
      </div>
    </div>
  );
};
