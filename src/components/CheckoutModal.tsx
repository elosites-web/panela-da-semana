import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  MapPin,
  CreditCard,
  User,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/config';
import { CartItem, CheckoutForm } from '../types';
import { calculateCartTotals, formatCurrency } from '../utils/pricing';
import {
  attemptOpenWhatsAppLink,
  buildWhatsAppHandoffData,
  copyTextWithFallback,
  WhatsAppOpenResult,
} from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryFeeCents: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryFeeCents,
}) => {
  const [formData, setFormData] = useState<CheckoutForm>({
    customerName: '',
    customerPhone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    reference: '',
    paymentMethod: 'pix',
    generalNotes: '',
  });

  interface HandoffFeedback {
    status: WhatsAppOpenResult;
    link: string;
    message: string;
    copyStatus: 'idle' | 'copied' | 'failed';
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [handoffFeedback, setHandoffFeedback] = useState<HandoffFeedback | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Clear stale feedback when modal closes/reopens or when cart items change
  useEffect(() => {
    if (!isOpen) {
      setHandoffFeedback(null);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    setHandoffFeedback(null);
  }, [items]);

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

  const updateField = <K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (handoffFeedback) {
      setHandoffFeedback(null);
    }
  };

  // Phone masking
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);

    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    updateField('customerPhone', formatted);
  };

  // CEP masking
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);

    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    updateField('cep', formatted);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim() || formData.customerName.trim().length < 3) {
      newErrors.customerName = 'Informe seu nome completo.';
    }

    const cleanPhone = formData.customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.customerPhone = 'Informe um telefone com DDD válido.';
    }

    const cleanCep = formData.cep.replace(/\D/g, '');
    if (!cleanCep || cleanCep.length !== 8) {
      newErrors.cep = 'Informe um CEP válido com 8 dígitos.';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Informe o nome da rua ou avenida.';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Informe o número.';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Informe o bairro.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOrderWhatsApp = () => {
    if (!validate()) {
      setHandoffFeedback(null);
      return;
    }

    const payload = {
      customer: formData,
      items,
      subtotalCents,
      deliveryFeeCents,
      totalCents,
    };

    const { message, link } = buildWhatsAppHandoffData(
      payload,
      BRAND_CONFIG.whatsappPhone
    );
    const status = attemptOpenWhatsAppLink(link);

    setHandoffFeedback({
      status,
      link,
      message,
      copyStatus: 'idle',
    });

    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyMessage = async () => {
    if (!handoffFeedback) return;
    const copied = await copyTextWithFallback(handoffFeedback.message);
    setHandoffFeedback((prev) =>
      prev ? { ...prev, copyStatus: copied ? 'copied' : 'failed' } : null
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FFFCF7] rounded-3xl shadow-2xl border border-[#EFE8DA] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Checkout Header */}
        <div className="p-4 sm:p-6 bg-[#F8F3E9] border-b border-[#EFE8DA] flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C96F4A] block">
              Etapa Final
            </span>
            <h2
              id="checkout-title"
              className="font-serif text-xl sm:text-2xl font-bold text-[#252B24]"
            >
              Finalizar Pedido via WhatsApp
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar finalização"
            className="p-2 rounded-xl text-[#5C675B] hover:text-[#252B24] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div
          ref={bodyRef}
          className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#252B24]"
        >
          {handoffFeedback && (
            <div
              role={handoffFeedback.status === 'blocked' ? 'alert' : 'status'}
              aria-live="polite"
              className={`p-4 rounded-2xl border space-y-3 ${
                handoffFeedback.status === 'blocked'
                  ? 'bg-[#C96F4A]/10 border-[#C96F4A]/35 text-[#252B24]'
                  : 'bg-[#344B35]/10 border-[#344B35]/20 text-[#344B35]'
              }`}
            >
              <div className="flex items-start gap-2.5 font-bold text-sm">
                {handoffFeedback.status === 'blocked' ? (
                  <AlertCircle className="w-5 h-5 text-[#C96F4A] shrink-0 mt-0.5" />
                ) : (
                  <Check className="w-5 h-5 text-[#344B35] shrink-0 mt-0.5" />
                )}
                <span>
                  {handoffFeedback.status === 'blocked'
                    ? 'Não foi possível abrir o WhatsApp automaticamente'
                    : 'Mensagem preparada para o WhatsApp'}
                </span>
              </div>

              <p className="text-xs text-[#5C675B] leading-relaxed">
                {handoffFeedback.status === 'blocked'
                  ? 'O navegador impediu a abertura automática da nova janela. Nenhuma informação foi perdida e seu carrinho continua salvo. Toque no botão abaixo para abrir o WhatsApp manualmente, revisar os dados e tocar em Enviar para concluir o pedido.'
                  : 'Mensagem preparada. No WhatsApp, revise os dados e toque em Enviar para concluir o pedido. O pedido não é confirmado até que você envie a mensagem e receba confirmação do estabelecimento.'}
              </p>

              {handoffFeedback.status === 'blocked' ? (
                <p className="text-[11px] font-semibold text-[#C96F4A]">
                  O pedido só será confirmado após o envio da mensagem no WhatsApp e a confirmação do estabelecimento.
                </p>
              ) : (
                <p className="text-[11px] text-[#5C675B]">
                  Seu carrinho permanece salvo aqui caso precise editar ou tentar novamente.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={handoffFeedback.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    handoffFeedback.status === 'blocked'
                      ? 'bg-[#25D366] hover:bg-[#1EBE5D] text-[#0B3B17] shadow-xs'
                      : 'bg-[#344B35] hover:bg-[#252B24] text-white'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>
                    {handoffFeedback.status === 'blocked'
                      ? 'Abrir WhatsApp Manualmente'
                      : 'Abrir WhatsApp novamente'}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#EFE8DA] text-[#252B24] hover:bg-[#F8F3E9] transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C96F4A]" />
                  <span>
                    {handoffFeedback.copyStatus === 'copied'
                      ? 'Mensagem copiada!'
                      : 'Copiar mensagem'}
                  </span>
                </button>
              </div>

              {handoffFeedback.copyStatus === 'failed' && (
                <p className="text-[11px] text-[#5C675B]">
                  Não foi possível copiar automaticamente neste navegador. Você ainda pode usar o botão do WhatsApp acima para abrir a mensagem pronta.
                </p>
              )}
            </div>
          )}

          {/* 1. Dados Pessoais */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#344B35]">
              <User className="w-4 h-4 text-[#C96F4A]" />
              <span>1. Quem vai receber o pedido?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Nome completo *
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  placeholder="Ex: Ana Clara Silva"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.customerName ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.customerName && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.customerName}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Telefone / WhatsApp *
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.customerPhone ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.customerPhone && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.customerPhone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Endereço de Entrega */}
          <div className="space-y-3 pt-2 border-t border-[#EFE8DA]">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#344B35]">
              <MapPin className="w-4 h-4 text-[#C96F4A]" />
              <span>2. Onde devemos entregar?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="cep"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  CEP *
                </label>
                <input
                  id="cep"
                  type="text"
                  value={formData.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.cep ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.cep && (
                  <span className="text-[11px] text-red-600 mt-1 block">{errors.cep}</span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Rua / Avenida *
                </label>
                <input
                  id="street"
                  type="text"
                  value={formData.street}
                  onChange={(e) => updateField('street', e.target.value)}
                  placeholder="Ex: Rua das Flores"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.street ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.street && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.street}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="number"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Número *
                </label>
                <input
                  id="number"
                  type="text"
                  value={formData.number}
                  onChange={(e) => updateField('number', e.target.value)}
                  placeholder="123"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.number ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.number && (
                  <span className="text-[11px] text-red-600 mt-1 block">{errors.number}</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="complement"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Complemento
                </label>
                <input
                  id="complement"
                  type="text"
                  value={formData.complement}
                  onChange={(e) => updateField('complement', e.target.value)}
                  placeholder="Apto 42, Bloco B..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE8DA] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                />
              </div>

              <div>
                <label
                  htmlFor="neighborhood"
                  className="block text-xs font-semibold text-[#5C675B] mb-1"
                >
                  Bairro *
                </label>
                <input
                  id="neighborhood"
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => updateField('neighborhood', e.target.value)}
                  placeholder="Ex: Centro"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A] ${
                    errors.neighborhood ? 'border-red-400 bg-red-50/50' : 'border-[#EFE8DA]'
                  }`}
                />
                {errors.neighborhood && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.neighborhood}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="reference"
                className="block text-xs font-semibold text-[#5C675B] mb-1"
              >
                Ponto de referência para a entrega
              </label>
              <input
                id="reference"
                type="text"
                value={formData.reference}
                onChange={(e) => updateField('reference', e.target.value)}
                placeholder="Ex: Em frente à praça, portaria lateral..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE8DA] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
              />
            </div>
          </div>

          {/* 3. Forma de Pagamento */}
          <div className="space-y-3 pt-2 border-t border-[#EFE8DA]">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#344B35]">
              <CreditCard className="w-4 h-4 text-[#C96F4A]" />
              <span>3. Forma de Pagamento</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'pix', label: 'Pix (preferência)', sub: 'A combinar no atendimento' },
                { id: 'cartao', label: 'Cartão na entrega', sub: 'Sujeito à disponibilidade' },
                { id: 'dinheiro', label: 'Dinheiro na entrega', sub: 'Informar se precisa de troco' },
              ].map((p) => {
                const isSelected = formData.paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      updateField(
                        'paymentMethod',
                        p.id as 'pix' | 'dinheiro' | 'cartao'
                      )
                    }
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#344B35] text-white border-[#344B35] shadow-xs ring-2 ring-[#C96F4A]/30'
                        : 'bg-white text-[#252B24] border-[#EFE8DA] hover:bg-[#F8F3E9]'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-[#EFE8DA]' : 'text-[#5C675B]'
                      }`}
                    >
                      {p.sub}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-[#5C675B] flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#647A52]" />
              <span>
                Simulação de checkout: formas de pagamento, cobertura de entrega e prazos reais dependem de confirmação direta com o estabelecimento quando em operação.
              </span>
            </p>
          </div>

          {/* 4. Observações Gerais */}
          <div className="pt-2 border-t border-[#EFE8DA]">
            <label
              htmlFor="generalNotes"
              className="block text-xs font-semibold text-[#5C675B] mb-1"
            >
              Observações gerais do pedido (opcional)
            </label>
            <textarea
              id="generalNotes"
              rows={2}
              value={formData.generalNotes}
              onChange={(e) => updateField('generalNotes', e.target.value)}
              placeholder="Ex: avisar quando sair para entrega, interfone quebrado..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#EFE8DA] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
            />
          </div>

          {/* Resumo do Pedido */}
          <div className="p-4 rounded-2xl bg-[#F8F3E9] border border-[#EFE8DA] space-y-2 text-xs">
            <span className="font-bold text-[#344B35] uppercase tracking-wider block">
              Resumo do Pedido ({totalQuantity} {totalQuantity === 1 ? 'prato' : 'pratos'}):
            </span>
            <div className="space-y-1 text-[#5C675B]">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.dishName} ({item.sizeLabel})
                  </span>
                  <span className="font-medium text-[#252B24]">
                    {formatCurrency(item.unitPriceCents * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#EFE8DA] flex justify-between font-bold text-sm text-[#252B24]">
              <span>Total com entrega:</span>
              <span className="font-serif text-base text-[#252B24]">
                {formatCurrency(totalCents)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 sm:p-6 bg-[#F8F3E9] border-t border-[#EFE8DA] flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-center sm:text-left">
            <span className="text-[11px] text-[#5C675B] block font-medium">
              WhatsApp de teste (demonstração):
            </span>
            <span className="font-mono text-xs font-bold text-[#344B35]">
              +{BRAND_CONFIG.whatsappPhone}
            </span>
          </div>

          <button
            onClick={handleSendOrderWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-[#0B3B17] px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Preparar e Abrir WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
