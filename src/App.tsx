import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeeklyMenu } from './components/WeeklyMenu';
import { StoriesViewer } from './components/StoriesViewer';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HowItWorks } from './components/HowItWorks';
import { BrandValues } from './components/BrandValues';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BRAND_CONFIG, WEEKLY_DISHES } from './data/config';
import { CartItem, Dish } from './types';
import { calculateCartTotals, formatCurrency } from './utils/pricing';
import { ShoppingBag, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { motion, MotionConfig } from 'framer-motion';
import { ScrollReveal } from './components/ScrollReveal';
import { CartToast, CartToastData } from './components/CartToast';
import { AtmosphericBackground } from './components/AtmosphericBackground';

const CART_STORAGE_KEY = 'panela_da_semana_cart_v1';
const SECTION_VIEWPORT = { once: true, amount: 'some' as const };
const SECTION_TRANSITION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Local storage fallback
    }
    return [];
  });

  // Modal states
  const [selectedDishToCustomize, setSelectedDishToCustomize] = useState<Dish | null>(null);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [storiesInitialDishId, setStoriesInitialDishId] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [cartToast, setCartToast] = useState<CartToastData | null>(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore write errors
    }
  }, [cartItems]);

  // Pricing calculations
  const { totalCents, totalQuantity } = calculateCartTotals(
    cartItems,
    BRAND_CONFIG.deliveryFeeCents
  );

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      // Check if identical customized item exists
      const existingIdx = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIdx !== -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });
    // Show confirmation toast and open cart drawer
    setCartToast({
      id: Date.now(),
      dishName: newItem.dishName,
      sizeLabel: newItem.sizeLabel,
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 104;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handleOpenDishStories = (dishId: string) => {
    setStoriesInitialDishId(dishId);
    setIsStoriesOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen flex flex-col bg-[#FFFCF7] text-[#252B24] selection:bg-[#C96F4A] selection:text-white">
      <AtmosphericBackground />

      {/* Header */}
      <Header
        cartItemCount={totalQuantity}
        cartTotalCents={totalCents}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToMenu={handleScrollToMenu}
        onOpenStories={() => {
          setStoriesInitialDishId(WEEKLY_DISHES[0].id);
          setIsStoriesOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <Hero
            onScrollToMenu={handleScrollToMenu}
            onOpenStories={() => {
              setStoriesInitialDishId(WEEKLY_DISHES[0].id);
              setIsStoriesOpen(true);
            }}
          />
        </motion.div>

        {/* Weekly Menu Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <WeeklyMenu
            onSelectDishToCustomize={(dish) => setSelectedDishToCustomize(dish)}
            onOpenDishStories={handleOpenDishStories}
          />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <HowItWorks />
        </motion.div>

        {/* Brand Values & Photographic Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <BrandValues />
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <FAQ />
        </motion.div>

        {/* In-app guide and editability banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={SECTION_TRANSITION}
        >
          <section className="py-12 bg-[#F8F3E9]/68 border-t border-[#EFE8DA]">
            <ScrollReveal className="max-w-4xl mx-auto px-4 text-center">
              <button
                onClick={() => setIsDocModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-[#EFE8DA] text-xs sm:text-sm font-bold text-[#344B35] hover:bg-[#EFE8DA] shadow-xs transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#C96F4A]" />
                <span>Manual do Proprietário: Como editar pratos, preços e WhatsApp</span>
              </button>
            </ScrollReveal>
          </section>
        </motion.div>
      </main>

      {/* Sticky Mobile Floating Cart Bar */}
      {totalQuantity > 0 && !isCartOpen && !isCheckoutOpen && !isStoriesOpen && (
        <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrinho"
            className="w-full bg-[#344B35] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between border-2 border-white/20 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#C96F4A] flex items-center justify-center text-xs font-bold">
                {totalQuantity}
              </span>
              <span className="text-sm font-bold">Ver Minha Panela</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <span>{formatCurrency(totalCents)}</span>
              <ArrowRight className="w-4 h-4 text-[#C96F4A]" />
            </div>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Modals & Drawers */}
      <CustomizationModal
        dish={selectedDishToCustomize}
        isOpen={Boolean(selectedDishToCustomize)}
        onClose={() => setSelectedDishToCustomize(null)}
        onAddToCart={handleAddToCart}
      />

      <StoriesViewer
        isOpen={isStoriesOpen}
        initialDishId={storiesInitialDishId}
        onClose={() => setIsStoriesOpen(false)}
        onCustomize={(dish) => {
          setIsStoriesOpen(false);
          setSelectedDishToCustomize(dish);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenMenu={handleScrollToMenu}
        deliveryFeeCents={BRAND_CONFIG.deliveryFeeCents}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        deliveryFeeCents={BRAND_CONFIG.deliveryFeeCents}
      />

      {/* Owner Documentation Modal */}
      {isDocModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFE8DA] my-auto max-h-[85vh] overflow-y-auto space-y-5 text-[#252B24]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DA]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C96F4A]" />
                <h3 className="font-serif text-xl font-bold">
                  Guia de Edição da Panela da Semana
                </h3>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F8F3E9] text-[#5C675B]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5C675B] leading-relaxed">
              <div>
                <strong className="text-[#344B35] block mb-1">
                  1. Onde alterar o número de WhatsApp?
                </strong>
                <p>
                  No arquivo <code>src/data/config.ts</code>, altere o campo{' '}
                  <code className="bg-[#F8F3E9] px-1 py-0.5 rounded text-[#252B24]">
                    whatsappPhone: "5511995722584"
                  </code>{' '}
                  para o número desejado (apenas números com código do país 55 e DDD).
                </p>
              </div>

              <div>
                <strong className="text-[#344B35] block mb-1">
                  2. Onde alterar pratos, fotos, ingredientes e preços?
                </strong>
                <p>
                  Também em <code>src/data/config.ts</code>, no array{' '}
                  <code className="bg-[#F8F3E9] px-1 py-0.5 rounded text-[#252B24]">
                    WEEKLY_DISHES
                  </code>
                  . Os preços são sempre calculados em centavos inteiros (ex: R$ 22,00 ={' '}
                  <code>2200</code>; R$ 28,00 = <code>2800</code>).
                </p>
              </div>

              <div>
                <strong className="text-[#344B35] block mb-1">
                  3. Como adicionar vídeos verticais (Google Flow)?
                </strong>
                <p>
                  Cada prato possui o campo{' '}
                  <code className="bg-[#F8F3E9] px-1 py-0.5 rounded text-[#252B24]">
                    videoUrl: null
                  </code>
                  . Ao gerar o arquivo MP4 na proporção 9:16, basta colocar o arquivo na pasta{' '}
                  <code>public/videos/</code> e preencher a URL no prato (ex:{' '}
                  <code>videoUrl: "/videos/frango.mp4"</code>). O visualizador Stories detectará e reproduzirá automaticamente.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFE8DA] text-right">
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="bg-[#344B35] text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Entendi, fechar guia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add-to-Cart Toast Notification */}
      <CartToast
        toast={cartToast}
        onClose={() => setCartToast(null)}
        durationMs={3000}
      />
      </div>
    </MotionConfig>
  );
}
