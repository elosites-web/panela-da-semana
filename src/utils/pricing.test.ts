import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrency, calculateItemUnitPrice, calculateCartTotals } from './pricing';
import { CartItem } from '../types';

test('formatCurrency formats integer cents to Brazilian Real correctly', () => {
  assert.equal(formatCurrency(2200), 'R$\u00a022,00');
  assert.equal(formatCurrency(2800), 'R$\u00a028,00');
  assert.equal(formatCurrency(400), 'R$\u00a04,00');
  assert.equal(formatCurrency(0), 'R$\u00a00,00');
});

test('calculateItemUnitPrice adds base price and extras correctly in cents', () => {
  const baseCents = 2200; // R$ 22,00
  const extras = [
    { id: 'extra_ovo', name: 'Ovo frito', priceCents: 400 },
    { id: 'extra_proteina', name: 'Proteína extra', priceCents: 700 },
  ];
  const unitPrice = calculateItemUnitPrice(baseCents, extras);
  assert.equal(unitPrice, 3300); // 2200 + 400 + 700 = 3300 (R$ 33,00)
});

test('calculateCartTotals computes subtotal and total without float rounding errors', () => {
  const items: CartItem[] = [
    {
      id: 'item-1',
      dishId: 'segunda-frango',
      dishName: 'Filé de Frango Grelhado',
      dishImage: '/images/dishes/frango-grelhado.jpg',
      dayLabel: 'Segunda-feira',
      size: 'medium',
      sizeLabel: 'Marmita Média',
      protein: 'Filé de Frango',
      sides: ['Arroz branco', 'Feijão carioca'],
      extras: [{ id: 'extra_ovo', name: 'Ovo', priceCents: 400 }],
      observation: 'Sem cebola',
      unitPriceCents: 2600, // 2200 + 400
      quantity: 2,
    },
    {
      id: 'item-2',
      dishId: 'terca-carne',
      dishName: 'Carne de Panela',
      dishImage: '/images/dishes/carne-de-panela.jpg',
      dayLabel: 'Terça-feira',
      size: 'large',
      sizeLabel: 'Marmita Grande',
      protein: 'Carne de Panela',
      sides: ['Arroz integral', 'Purê de batata'],
      extras: [],
      observation: '',
      unitPriceCents: 2800,
      quantity: 1,
    },
  ];

  const totals = calculateCartTotals(items, 500); // R$ 5,00 delivery fee
  assert.equal(totals.subtotalCents, 8000); // (2600 * 2) + (2800 * 1) = 5200 + 2800 = 8000
  assert.equal(totals.deliveryFeeCents, 500);
  assert.equal(totals.totalCents, 8500);
  assert.equal(totals.totalQuantity, 3);
});
