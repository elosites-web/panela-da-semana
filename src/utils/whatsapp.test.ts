import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppOrderMessage,
  generateWhatsAppLink,
  buildWhatsAppHandoffData,
  attemptOpenWhatsAppLink,
} from './whatsapp';
import { CheckoutForm, CartItem } from '../types';

test('buildWhatsAppOrderMessage generates complete order message with required details', () => {
  const customer: CheckoutForm = {
    customerName: 'Mariana Souza',
    customerPhone: '(11) 98888-7777',
    cep: '01310-100',
    street: 'Avenida Paulista',
    number: '1000',
    complement: 'Apt 42',
    neighborhood: 'Bela Vista',
    reference: 'Próximo ao metrô',
    paymentMethod: 'pix',
    generalNotes: 'Campainha com defeito, ligar ao chegar.',
  };

  const items: CartItem[] = [
    {
      id: 'item-1',
      dishId: 'segunda-frango',
      dishName: 'Filé de Frango Grelhado',
      dishImage: '/images/dishes/frango-grelhado.jpg',
      dayLabel: 'Segunda-feira',
      size: 'medium',
      sizeLabel: 'M (aprox. 500g)',
      protein: 'Filé de Frango Grelhado',
      sides: ['Arroz branco soltinho', 'Feijão carioca cremoso'],
      extras: [{ id: 'extra_ovo', name: 'Ovo frito caipira', priceCents: 400 }],
      observation: 'Caprichar no feijão',
      unitPriceCents: 2600,
      quantity: 1,
    },
  ];

  const payload = {
    customer,
    items,
    subtotalCents: 2600,
    deliveryFeeCents: 0,
    totalCents: 2600,
  };

  const message = buildWhatsAppOrderMessage(payload);
  assert.ok(message.includes('Mariana Souza'));
  assert.ok(message.includes('Avenida Paulista'));
  assert.ok(message.includes('Filé de Frango Grelhado'));
  assert.ok(message.includes('Ovo frito caipira'));
  assert.ok(message.includes('Caprichar no feijão'));
  assert.ok(message.includes('Pix'));

  const link = generateWhatsAppLink(payload, '5511995722584');
  assert.ok(link.startsWith('https://wa.me/5511995722584?text='));
  assert.ok(link.includes(encodeURIComponent('Mariana Souza')));

  const handoffData = buildWhatsAppHandoffData(payload, '5511995722584');
  assert.equal(handoffData.message, message);
  assert.equal(handoffData.link, link);
});

test('attemptOpenWhatsAppLink distinguishes initiated handoff from blocked popup', () => {
  const mockWindow: { opener?: unknown; closed?: boolean } = { opener: { fake: true }, closed: false };
  const initiatedResult = attemptOpenWhatsAppLink('https://wa.me/5511995722584?text=oi', () => mockWindow);
  assert.equal(initiatedResult, 'initiated');
  assert.equal(mockWindow.opener, null);

  const blockedNullResult = attemptOpenWhatsAppLink('https://wa.me/5511995722584?text=oi', () => null);
  assert.equal(blockedNullResult, 'blocked');

  const blockedClosedResult = attemptOpenWhatsAppLink('https://wa.me/5511995722584?text=oi', () => ({
    closed: true,
  }));
  assert.equal(blockedClosedResult, 'blocked');

  const blockedThrowResult = attemptOpenWhatsAppLink('https://wa.me/5511995722584?text=oi', () => {
    throw new Error('Popup blocked');
  });
  assert.equal(blockedThrowResult, 'blocked');
});
