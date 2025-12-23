
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">
              <span className="text-red-400">Linda</span>
              <span className="text-green-400 ml-1">Flor</span>
            </h3>
            <p className="text-emerald-200/70 text-sm">Entregando sentimentos em forma de flores desde 2010. Qualidade e frescor garantidos em cada arranjo.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-200">Links Úteis</h4>
            <ul className="space-y-3 text-sm text-emerald-200/70">
              <li><a href="#" className="hover:text-white">Minha Conta</a></li>
              <li><a href="#" className="hover:text-white">Rastrear Pedido</a></li>
              <li><a href="#" className="hover:text-white">Política de Entrega</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-200">Categorias</h4>
            <ul className="space-y-3 text-sm text-emerald-200/70">
              <li><a href="#" className="hover:text-white">Buquês</a></li>
              <li><a href="#" className="hover:text-white">Orquídeas</a></li>
              <li><a href="#" className="hover:text-white">Presentes</a></li>
              <li><a href="#" className="hover:text-white">Plantas de Interior</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-200">Newsletter</h4>
            <p className="text-sm text-emerald-200/70 mb-4">Receba promoções e dicas de jardinagem.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-emerald-900 border border-emerald-800 rounded px-4 py-2 text-sm flex-1 outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-sm font-bold transition-colors">OK</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-200/50">
          <p>&copy; 2024 Linda Flor Floricultura. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Desenvolvido com ❤️ por Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
