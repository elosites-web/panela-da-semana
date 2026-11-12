import { CartItem, ExtraOption } from '../types';

/**
 * Formata valor em centavos para moeda brasileira (pt-BR / BRL).
 * Todos os cálculos no sistema são mantidos estritamente em centavos inteiros.
 */
export function formatCurrency(cents: number): string {
  const roundedCents = Math.round(cents);
  const reais = roundedCents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(reais);
}

/**
 * Calcula o preço unitário de um item personalizado em centavos inteiros.
 */
export function calculateItemUnitPrice(
  basePriceCents: number,
  selectedExtras: ExtraOption[]
): number {
  const extrasTotalCents = selectedExtras.reduce(
    (acc, extra) => acc + Math.round(extra.priceCents),
    0
  );
  return Math.round(basePriceCents) + extrasTotalCents;
}

/**
 * Calcula totais do carrinho sem usar ponto flutuante para a soma financeira.
 */
export function calculateCartTotals(
  items: CartItem[],
  deliveryFeeCents: number = 0
): {
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  totalQuantity: number;
} {
  let subtotalCents = 0;
  let totalQuantity = 0;

  for (const item of items) {
    const qty = Math.max(1, Math.round(item.quantity));
    const lineTotal = Math.round(item.unitPriceCents) * qty;
    subtotalCents += lineTotal;
    totalQuantity += qty;
  }

  const safeDeliveryFee = Math.max(0, Math.round(deliveryFeeCents));
  const totalCents = subtotalCents + safeDeliveryFee;

  return {
    subtotalCents,
    deliveryFeeCents: safeDeliveryFee,
    totalCents,
    totalQuantity,
  };
}
