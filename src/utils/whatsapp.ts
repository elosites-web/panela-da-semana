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
    pix: 'Pix (a combinar no atendimento)',
    dinheiro: 'Dinheiro na entrega',
    cartao: 'Cartão na entrega',
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
    `_Mensagem ilustrativa gerada pelo protótipo Panela da Semana._`
  );

  return lines.filter((line) => line !== '').join('\n');
}

export interface WhatsAppHandoffData {
  message: string;
  link: string;
}

export type WhatsAppOpenResult = 'initiated' | 'blocked';

/**
 * Monta a mensagem e o link wa.me codificado sem descartar os dados gerados.
 */
export function buildWhatsAppHandoffData(
  payload: WhatsAppOrderPayload,
  phoneNumber: string = BRAND_CONFIG.whatsappPhone
): WhatsAppHandoffData {
  const message = buildWhatsAppOrderMessage(payload);
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const link = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  return { message, link };
}

/**
 * Cria o link wa.me direto com o número central e mensagem codificada.
 */
export function generateWhatsAppLink(
  payload: WhatsAppOrderPayload,
  phoneNumber: string = BRAND_CONFIG.whatsappPhone
): string {
  return buildWhatsAppHandoffData(payload, phoneNumber).link;
}

/**
 * Tenta abrir o link do WhatsApp em nova aba detectando bloqueio de pop-up sem falsos positivos.
 */
export function attemptOpenWhatsAppLink(
  link: string,
  openWindow: (
    url: string,
    target: string
  ) => { opener?: unknown; closed?: boolean } | null = (url, target) =>
    window.open(url, target)
): WhatsAppOpenResult {
  try {
    const openedWindow = openWindow(link, '_blank');
    if (!openedWindow || openedWindow.closed) {
      return 'blocked';
    }
    try {
      openedWindow.opener = null;
    } catch {
      // Ambientes isolados podem impedir alteração de opener
    }
    return 'initiated';
  } catch {
    return 'blocked';
  }
}

export interface ClipboardCopyAdapter {
  writeText?: (text: string) => Promise<void>;
  legacyCopy?: (text: string) => boolean;
}

/**
 * Copia texto para a área de transferência verificando sucesso real tanto na Clipboard API quanto no fallback execCommand.
 */
export async function copyTextWithFallback(
  text: string,
  adapter?: ClipboardCopyAdapter
): Promise<boolean> {
  const writeText =
    adapter?.writeText ??
    (typeof navigator !== 'undefined' && navigator.clipboard?.writeText
      ? (value: string) => navigator.clipboard.writeText(value)
      : undefined);

  if (writeText) {
    try {
      await writeText(text);
      return true;
    } catch {
      // Continua para o fallback legado
    }
  }

  if (adapter?.legacyCopy) {
    try {
      return Boolean(adapter.legacyCopy(text));
    } catch {
      return false;
    }
  }

  if (typeof document === 'undefined' || !document.body) {
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  try {
    document.body.appendChild(textarea);
    textarea.select();
    return Boolean(document.execCommand('copy'));
  } catch {
    return false;
  } finally {
    if (textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }
}
