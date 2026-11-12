import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals, formatCurrency } from '../utils/pricing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onOpenMenu: () => void;
  deliveryFeeCents: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenMenu,
  deliveryFeeCents,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { subtotalCents, totalCents, totalQuantity } = calculateCartTotals(
    items,
    deliveryFeeCents
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Minha Panela - Carrinho de Compras"
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-[#FFFCF7] h-full shadow-2xl flex flex-col z-10 border-l border-[#EFE8DA] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#F8F3E9] border-b border-[#EFE8DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#344B35] text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#F8F3E9]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#252B24]">
                Minha Panela
              </h2>
              <span className="text-xs text-[#5C675B]">
                {totalQuantity} {totalQuantity === 1 ? 'marmita' : 'marmitas'} no pedido
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="p-2 rounded-xl text-[#5C675B] hover:text-[#252B24] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F8F3E9] border-2 border-[#EFE8DA] flex items-center justify-center text-3xl">
              🍲
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#252B24]">
                Sua panela está vazia
              </h3>
              <p className="text-xs sm:text-sm text-[#5C675B] max-w-xs">
                Selecione um dos pratos frescos do nosso cardápio semanal para montar seu almoço.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenMenu();
              }}
              className="mt-2 bg-[#344B35] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#252B24] transition-colors cursor-pointer"
            >
              Explorar Cardápio da Semana
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.map((item) => {
              const lineTotalCents = item.unitPriceCents * item.quantity;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#EFE8DA] shadow-xs hover:border-[#647A52]/30 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.dishImage}
                      alt={item.dishName}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EFE8DA]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96F4A]">
                          {item.dayLabel}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remover ${item.dishName} da panela`}
                          className="text-[#9CA3AF] hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-[#252B24] truncate">
                        {item.dishName}
                      </h4>

                      <div className="text-xs text-[#5C675B] mt-0.5 font-medium">
                        {item.sizeLabel} • {item.protein}
                      </div>
                    </div>
                  </div>

                  {/* Sides and extras details */}
                  <div className="bg-[#F8F3E9] p-2.5 rounded-xl text-[11px] text-[#344B35] space-y-1">
                    <div>
                      <strong>Guarnições:</strong> {item.sides.join(', ')}
                    </div>
                    {item.extras.length > 0 && (
                      <div>
                        <strong>Extras:</strong>{' '}
                        {item.extras.map((e) => `${e.name} (+${formatCurrency(e.priceCents)})`).join(', ')}
                      </div>
                    )}
                    {item.observation && (
                      <div className="text-[#A95635] italic">
                        <strong>Obs:</strong> "{item.observation}"
                      </div>
                    )}
                  </div>

                  {/* Quantity controls and line subtotal */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-[#F8F3E9] p-1 rounded-lg border border-[#EFE8DA]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                        className="w-6 h-6 rounded flex items-center justify-center bg-white text-[#252B24] disabled:opacity-40 hover:bg-[#EFE8DA] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 text-[#252B24]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                        className="w-6 h-6 rounded flex items-center justify-center bg-white text-[#252B24] hover:bg-[#EFE8DA] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#5C675B] block">
                        Subtotal ({item.quantity}x):
                      </span>
                      <span className="font-serif font-bold text-base text-[#252B24]">
                        {formatCurrency(lineTotalCents)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Drawer Footer with Totals and CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#F8F3E9] border-t border-[#EFE8DA] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C675B]">
              <div className="flex justify-between">
                <span>Subtotal dos pratos:</span>
                <span className="font-semibold text-[#252B24]">
                  {formatCurrency(subtotalCents)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Entrega:</span>
                <span className="font-semibold text-[#344B35]">
                  {deliveryFeeCents === 0 ? 'Grátis (demonstrativo)' : formatCurrency(deliveryFeeCents)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EFE8DA] text-base text-[#252B24]">
                <strong className="font-serif">Total do pedido:</strong>
                <strong className="font-serif text-xl font-bold text-[#252B24]">
                  {formatCurrency(totalCents)}
                </strong>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#344B35] hover:bg-[#252B24] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-101 cursor-pointer"
            >
              <span>Continuar para Dados de Entrega</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-xs font-semibold text-[#5C675B] hover:text-[#252B24] py-1 cursor-pointer"
            >
              Continuar escolhendo pratos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
