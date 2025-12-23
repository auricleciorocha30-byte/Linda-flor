
import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, View } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [generatedMessage, setGeneratedMessage] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('lindaflor_v1_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart error", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lindaflor_v1_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Tudo') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const navigateTo = (view: View, product: Product | null = null) => {
    setCurrentView(view);
    if (product) setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        currentView={currentView} 
        onNavigate={navigateTo} 
        cartCount={cartCount} 
      />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <div>
            <section className="relative h-[600px] flex items-center justify-center text-center px-4">
              <img 
                src="https://images.unsplash.com/photo-1522673607200-1648835449db?q=80&w=2000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
                alt="Banner Principal"
              />
              <div className="max-w-3xl space-y-6">
                <span className="inline-block text-rose-300 font-bold uppercase tracking-[0.3em] text-sm mb-4">Bem-vindo à Linda Flor</span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">Espalhando cores, colhendo sorrisos</h1>
                <p className="text-xl text-white/90 font-light max-w-xl mx-auto">Arranjos artesanais pensados para cada momento especial da sua vida.</p>
                <button 
                  onClick={() => navigateTo('catalog')}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-2xl hover:scale-105 active:scale-95"
                >
                  Explorar Loja
                </button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-emerald-950">Mais Vendidos</h2>
                <div className="w-16 h-1 bg-rose-600 mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} onAdd={() => addToCart(product)} />
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'catalog' && (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-8 text-center">Nossas Flores</h1>
            <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-emerald-700 text-white shadow-xl' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} onAdd={() => addToCart(product)} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'product' && selectedProduct && (
          <div className="container mx-auto px-4 py-16">
            <button onClick={() => navigateTo('catalog')} className="text-emerald-700 font-bold mb-10 flex items-center gap-2 group">
              <span className="transition-transform group-hover:-translate-x-1">&larr;</span> Voltar para a loja
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto object-cover max-h-[700px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-4">{selectedProduct.category}</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-emerald-950 mb-6">{selectedProduct.name}</h1>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl text-emerald-700 font-bold">R$ {selectedProduct.price.toFixed(2).replace('.', ',')}</span>
                  <div className="h-6 w-[1px] bg-gray-200"></div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-xl">★</span>
                    <span className="text-gray-500 font-bold">{selectedProduct.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">{selectedProduct.description}</p>
                
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-700/20 transition-all hover:-translate-y-1 active:scale-95 mb-10"
                >
                  Adicionar ao Carrinho
                </button>

                <AIAssistant onMessageGenerated={setGeneratedMessage} />
                {generatedMessage && (
                  <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-2xl relative">
                    <div className="absolute -top-3 left-6 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">MENSAGEM DA IA</div>
                    <p className="text-emerald-950 italic font-serif text-xl leading-relaxed">"{generatedMessage}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <div className="container mx-auto px-4 py-16 max-w-5xl">
            <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-12">Meu Carrinho</h1>
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-lg mb-8">Sua sacola está vazia no momento.</p>
                <button onClick={() => navigateTo('catalog')} className="bg-emerald-700 text-white px-10 py-4 rounded-full font-bold shadow-lg">Ver Produtos</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-inner" />
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-950 text-lg">{item.name}</h3>
                        <p className="text-emerald-700 font-bold mb-2">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-emerald-700 transition-colors">-</button>
                            <span className="w-8 text-center font-bold text-emerald-950">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-emerald-700 transition-colors">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-600 font-medium text-sm flex items-center gap-1 transition-colors">
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-950">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-950 text-white p-8 rounded-3xl h-fit shadow-2xl sticky top-24">
                  <h2 className="text-2xl font-serif font-bold mb-8 text-rose-300">Resumo</h2>
                  <div className="space-y-4 mb-8 pb-8 border-b border-emerald-900/50">
                    <div className="flex justify-between text-emerald-100/70">
                      <span>Subtotal</span>
                      <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-100/70">
                      <span>Frete</span>
                      <span className="text-emerald-400 font-bold">Grátis</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-2xl font-bold mb-10">
                    <span>Total</span>
                    <span className="text-rose-400">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-rose-900/40 transition-all active:scale-95">
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const ProductCard: React.FC<{ product: Product, onClick: () => void, onAdd: () => void }> = ({ product, onClick, onAdd }) => (
  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
    <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={onClick}>
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-white text-emerald-900 px-6 py-2 rounded-full font-bold shadow-xl">Ver Detalhes</span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-rose-500 tracking-widest">{product.category}</span>
          <h3 className="font-serif font-bold text-emerald-950 text-xl group-hover:text-emerald-700 transition-colors line-clamp-1">{product.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <p className="text-emerald-800 font-bold text-lg">R$ {product.price.toFixed(2).replace('.', ',')}</p>
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </div>
);

export default App;
