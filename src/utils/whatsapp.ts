import { BRAND_CONFIG } from '../data/config';
import { CartItem, CheckoutForm } from '../types';
import { formatCurrency } from './pricing';

export interface WhatsAppOrderPayload {
  customer: CheckoutForm;
  items: CartItem[];
  subtotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
}

/**
 * Monta o texto legível e estruturado do pedido para envio no WhatsApp.
 */
export function buildWhatsAppOrderMessage(payload: WhatsAppOrderPayload): string {
  const { customer, items, subtotalCents, deliveryFeeCents, totalCents } = payload;

  const paymentLabels: Record<string, string> = {
    pix: 'Pix (chave enviada pela Panela da Semana)',
    dinheiro: 'Dinheiro na entrega',
    cartao: 'Cartão na entrega (maquininha)',
  };

  const paymentText = paymentLabels[customer.paymentMethod] || customer.paymentMethod;

  const lines: string[] = [
    `🍲 *NOVO PEDIDO — PANELA DA SEMANA*`,
    `_Comida de verdade. Semana bem resolvida._`,
    `--------------------------------------`,
    `👤 *CLIENTE:*`,
    `• *Nome:* ${customer.customerName.trim()}`,
    `• *Telefone:* ${customer.customerPhone.trim()}`,
    ``,
    `📍 *ENDEREÇO DE ENTREGA:*`,
    `• *Rua:* ${customer.street.trim()}, nº ${customer.number.trim()}${
      customer.complement ? ` (${customer.complement.trim()})` : ''
    }`,
    `• *Bairro:* ${customer.neighborhood.trim()}`,
    `• *CEP:* ${customer.cep.trim()}`,
    customer.reference ? `• *Ponto de ref.:* ${customer.reference.trim()}` : '',
    ``,
    `📋 *ITENS DO PEDIDO:*`,
  ];

  items.forEach((item, index) => {
    const itemSubtotalCents = item.unitPriceCents * item.quantity;
    lines.push(
      `*${index + 1}. ${item.dishName}* (${item.dayLabel})`,
      `   • Tamanho: ${item.sizeLabel}`,
      `   • Proteína: ${item.protein}`,
      `   • Acompanhamentos: ${item.sides.join(', ')}`,
      item.extras.length > 0
        ? `   • Extras: ${item.extras.map((e) => `${e.name} (+${formatCurrency(e.priceCents)})`).join(', ')}`
        : '',
      item.observation ? `   • Obs do prato: "${item.observation.trim()}"` : '',
      `   • Quantidade: ${item.quantity}x | Subtotal: ${formatCurrency(itemSubtotalCents)}`,
      ``
    );
  });

  lines.push(
    `--------------------------------------`,
    `💰 *RESUMO DE VALORES:*`,
    `• *Subtotal dos pratos:* ${formatCurrency(subtotalCents)}`,
    `• *Taxa de entrega:* ${
      deliveryFeeCents === 0 ? 'Grátis (demonstrativo)' : formatCurrency(deliveryFeeCents)
    }`,
    `• *TOTAL DO PEDIDO:* ${formatCurrency(totalCents)}`,
    ``,
    `💳 *FORMA DE PAGAMENTO:*`,
    `• ${paymentText}`,
    customer.generalNotes ? `\n📝 *OBSERVAÇÕES GERAIS:* ${customer.generalNotes.trim()}` : '',
    ``,
    `_Pedido gerado via cardápio online Panela da Semana._`
  );

  return lines.filter((line) => line !== '').join('\n');
}

/**
 * Cria o link wa.me direto com o número central e mensagem codificada.
 */
export function generateWhatsAppLink(
  payload: WhatsAppOrderPayload,
  phoneNumber: string = BRAND_CONFIG.whatsappPhone
): string {
  const message = buildWhatsAppOrderMessage(payload);
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
