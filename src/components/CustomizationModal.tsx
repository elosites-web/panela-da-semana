import React, { useState, useEffect } from 'react';
import { X, Check, Plus, AlertCircle, ShoppingBag } from 'lucide-react';
import { EXTRAS_CONFIG, SIZES_CONFIG } from '../data/config';
import { CartItem, Dish, DishSize } from '../types';
import { calculateItemUnitPrice, formatCurrency } from '../utils/pricing';

interface CustomizationModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  dish,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !dish) return null;

  const [selectedSize, setSelectedSize] = useState<DishSize>('medium');
  const [selectedProtein, setSelectedProtein] = useState<string>('');
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [observation, setObservation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize defaults on dish open
  useEffect(() => {
    setSelectedSize('medium');
    setSelectedProtein(dish.allowedProteins[0]?.name || '');
    // Pre-select the first 2 default sides for user convenience
    const defaultSides = dish.allowedSides.slice(0, 2).map((s) => s.name);
    setSelectedSides(defaultSides);
    setSelectedExtraIds([]);
    setObservation('');
    setErrorMessage('');
  }, [dish]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentSizeConfig =
    SIZES_CONFIG.find((s) => s.id === selectedSize) || SIZES_CONFIG[0];
  const basePriceCents =
    selectedSize === 'large' ? dish.largePriceCents : dish.mediumPriceCents;

  const selectedExtras = EXTRAS_CONFIG.filter((e) =>
    selectedExtraIds.includes(e.id)
  );

  const unitPriceCents = calculateItemUnitPrice(basePriceCents, selectedExtras);

  const handleToggleSide = (sideName: string) => {
    setErrorMessage('');
    if (selectedSides.includes(sideName)) {
      setSelectedSides(selectedSides.filter((s) => s !== sideName));
    } else {
      if (selectedSides.length >= dish.maxSides) {
        setErrorMessage(
          `Você pode escolher no máximo ${dish.maxSides} acompanhamentos.`
        );
        return;
      }
      setSelectedSides([...selectedSides, sideName]);
    }
  };

  const handleToggleExtra = (extraId: string) => {
    if (selectedExtraIds.includes(extraId)) {
      setSelectedExtraIds(selectedExtraIds.filter((id) => id !== extraId));
    } else {
      setSelectedExtraIds([...selectedExtraIds, extraId]);
    }
  };

  const handleConfirmAddToCart = () => {
    // Validation
    if (!selectedProtein) {
      setErrorMessage('Por favor, escolha uma opção de proteína.');
      return;
    }
    if (selectedSides.length < dish.minSides) {
      setErrorMessage(
        `Por favor, escolha ao menos ${dish.minSides} acompanhamentos (selecionados: ${selectedSides.length}).`
      );
      return;
    }
    if (selectedSides.length > dish.maxSides) {
      setErrorMessage(
        `Limite máximo de ${dish.maxSides} acompanhamentos ultrapassado.`
      );
      return;
    }

    const itemHash = `${dish.id}-${selectedSize}-${selectedProtein}-${[...selectedSides].sort().join('-')}-${[...selectedExtraIds].sort().join('-')}-${observation.trim()}`;

    const cartItem: CartItem = {
      id: itemHash,
      dishId: dish.id,
      dishName: dish.name,
      dishImage: dish.image,
      dayLabel: dish.dayLabel,
      size: selectedSize,
      sizeLabel: currentSizeConfig.name,
      protein: selectedProtein,
      sides: selectedSides,
      extras: selectedExtras,
      observation: observation.trim(),
      unitPriceCents,
      quantity: 1,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customization-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FFFCF7] rounded-3xl shadow-2xl border border-[#EFE8DA] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-4 sm:p-6 bg-[#F8F3E9] border-b border-[#EFE8DA] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-[#EFE8DA] shrink-0">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C96F4A] block">
                {dish.dayLabel} • Personalização
              </span>
              <h2
                id="customization-title"
                className="font-serif text-lg sm:text-xl font-bold text-[#252B24] leading-tight"
              >
                {dish.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar personalização"
            className="p-2 rounded-xl text-[#5C675B] hover:text-[#252B24] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#252B24]">
          {/* 1. Escolha do Tamanho */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold uppercase tracking-wider text-[#344B35] flex items-center gap-1.5">
                <span>1. Escolha o Tamanho da Marmita</span>
                <span className="text-xs text-[#C96F4A]">*Obrigatório</span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIZES_CONFIG.map((size) => {
                const isSelected = selectedSize === size.id;
                const priceCents =
                  size.id === 'large'
                    ? dish.largePriceCents
                    : dish.mediumPriceCents;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#344B35] text-white border-[#344B35] shadow-md ring-2 ring-[#C96F4A]/40'
                        : 'bg-white text-[#252B24] border-[#EFE8DA] hover:border-[#647A52]/40 hover:bg-[#F8F3E9]'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-base">
                        {size.name}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isSelected ? 'text-[#EFE8DA]' : 'text-[#5C675B]'
                        }`}
                      >
                        {size.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-base">
                        {formatCurrency(priceCents)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Escolha da Proteína */}
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-[#344B35] flex items-center gap-1.5 mb-3">
              <span>2. Escolha a Proteína</span>
              <span className="text-xs text-[#C96F4A]">*Obrigatório</span>
            </label>
            <div className="space-y-2">
              {dish.allowedProteins.map((prot) => {
                const isSelected = selectedProtein === prot.name;
                return (
                  <button
                    key={prot.id}
                    type="button"
                    onClick={() => setSelectedProtein(prot.name)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F8F3E9] text-[#344B35] border-[#344B35] font-semibold ring-1 ring-[#344B35]'
                        : 'bg-white text-[#252B24] border-[#EFE8DA] hover:bg-[#F8F3E9]'
                    }`}
                  >
                    <span className="text-sm">{prot.name}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#344B35] bg-[#344B35] text-white'
                          : 'border-[#EFE8DA] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Acompanhamentos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-[#344B35]">
                3. Acompanhamentos
              </label>
              <span className="text-xs font-semibold text-[#5C675B]">
                Escolha de {dish.minSides} a {dish.maxSides} (selecionados:{' '}
                <strong className="text-[#C96F4A]">
                  {selectedSides.length}
                </strong>
                )
              </span>
            </div>
            <p className="text-xs text-[#5C675B] mb-3">
              Monte seu prato com os acompanhamentos frescos preparados no dia:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dish.allowedSides.map((side) => {
                const isChecked = selectedSides.includes(side.name);
                return (
                  <button
                    key={side.id}
                    type="button"
                    onClick={() => handleToggleSide(side.name)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                      isChecked
                        ? 'bg-[#344B35]/5 border-[#344B35] text-[#344B35] font-medium'
                        : 'bg-white border-[#EFE8DA] text-[#252B24] hover:bg-[#F8F3E9]'
                    }`}
                  >
                    <span className="pr-2">{side.name}</span>
                    <span
                      className={`w-4 h-4 rounded-md border shrink-0 flex items-center justify-center ${
                        isChecked
                          ? 'border-[#344B35] bg-[#344B35] text-white'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Opcionais / Extras */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-[#344B35]">
                4. Opcionais & Extras
              </label>
              <span className="text-xs text-[#5C675B]">Opcional</span>
            </div>
            <div className="space-y-2">
              {EXTRAS_CONFIG.map((extra) => {
                const isSelected = selectedExtraIds.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => handleToggleExtra(extra.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                      isSelected
                        ? 'bg-[#C96F4A]/10 border-[#C96F4A] text-[#252B24] font-medium'
                        : 'bg-white border-[#EFE8DA] text-[#252B24] hover:bg-[#F8F3E9]'
                    }`}
                  >
                    <span>{extra.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#C96F4A]">
                        +{formatCurrency(extra.priceCents)}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#C96F4A] bg-[#C96F4A] text-white'
                            : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-3" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Observações do Prato */}
          <div>
            <label
              htmlFor="dish-observation"
              className="block text-sm font-bold uppercase tracking-wider text-[#344B35] mb-1.5"
            >
              5. Observações Especiais
            </label>
            <input
              id="dish-observation"
              type="text"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: sem cebola, feijão bem caldoso, molho à parte..."
              maxLength={150}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8DA] bg-white text-sm text-[#252B24] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
            />
          </div>

          {/* Error Message notice */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-[#F8F3E9] border-t border-[#EFE8DA] flex items-center justify-between gap-4 sticky bottom-0 z-20">
          <div>
            <span className="block text-[11px] font-bold text-[#5C675B] uppercase tracking-wider">
              Total deste prato:
            </span>
            <div className="font-serif text-2xl font-bold text-[#252B24]">
              {formatCurrency(unitPriceCents)}
            </div>
          </div>

          <button
            onClick={handleConfirmAddToCart}
            className="flex items-center gap-2 bg-[#344B35] hover:bg-[#252B24] text-white px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
