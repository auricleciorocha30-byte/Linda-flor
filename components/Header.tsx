
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"/><path d="M12 10V6"/><path d="M12 3a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"/></svg>
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">
            <span className="text-red-600">Linda</span>
            <span className="text-green-600 ml-1">Flor</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <button onClick={() => onNavigate('home')} className={`hover:text-green-600 transition-colors ${currentView === 'home' ? 'text-green-600' : ''}`}>Início</button>
          <button onClick={() => onNavigate('catalog')} className={`hover:text-green-600 transition-colors ${currentView === 'catalog' ? 'text-green-600' : ''}`}>Catálogo</button>
          <button className="hover:text-green-600 transition-colors">Sobre Nós</button>
          <button className="hover:text-green-600 transition-colors">Contato</button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-gray-600 hover:text-green-600 group/cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
