import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export interface CartToastData {
  id: number;
  dishName: string;
  sizeLabel: string;
}

interface CartToastProps {
  toast: CartToastData | null;
  onClose: () => void;
  durationMs?: number;
}

export const CartToast: React.FC<CartToastProps> = ({
  toast,
  onClose,
  durationMs = 3000,
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      onClose();
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [toast, durationMs, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm z-60 bg-[#344B35] text-[#FFFCF7] rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-[#647A52]/40 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-[#C96F4A] text-white flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-[#FFFCF7] leading-snug">
              Prato adicionado ao carrinho!
            </p>
            <p className="text-[11px] sm:text-xs text-[#EFE8DA] mt-0.5 truncate">
              {toast.dishName} ({toast.sizeLabel})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar notificação"
            className="p-1 rounded-lg text-[#EFE8DA]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
