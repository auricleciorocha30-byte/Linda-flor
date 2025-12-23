
import React, { useState } from 'react';
import { generateGiftMessage } from '../geminiService';

interface AIAssistantProps {
  onMessageGenerated: (msg: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onMessageGenerated }) => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('Aniversário');
  const [tone, setTone] = useState('Romântico');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!recipient) return;
    setLoading(true);
    const msg = await generateGiftMessage(occasion, recipient, tone);
    onMessageGenerated(msg);
    setLoading(false);
  };

  return (
    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M12 12 2.8 2.2"/><path d="m20 12-8 8"/><path d="m15 15-3 3"/><path d="M18 12h4"/><path d="m21 9-3 3"/></svg>
        </div>
        <h3 className="font-bold text-emerald-900">Assistente de Mensagens AI</h3>
      </div>
      
      <p className="text-sm text-emerald-800/70 mb-6">Precisa de ajuda com o cartão? Deixe que nossa IA escreva algo especial.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-emerald-900 mb-1 uppercase tracking-wider">Para quem?</label>
          <input 
            type="text" 
            placeholder="Ex: Maria"
            className="w-full bg-white border border-emerald-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-emerald-900 mb-1 uppercase tracking-wider">Ocasião</label>
          <select 
            className="w-full bg-white border border-emerald-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option>Aniversário</option>
            <option>Agradecimento</option>
            <option>Formatura</option>
            <option>Condolências</option>
            <option>Só porque sim</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-emerald-900 mb-1 uppercase tracking-wider">Tom</label>
          <select 
            className="w-full bg-white border border-emerald-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Romântico</option>
            <option>Divertido</option>
            <option>Formal</option>
            <option>Minimalista</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        disabled={loading || !recipient}
        className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${loading || !recipient ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20'}`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            Gerar Mensagem Mágica
          </>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
