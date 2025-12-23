
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Buquê de Rosas Vermelhas Luxo',
    price: 189.90,
    description: 'Um clássico e elegante buquê com 12 rosas vermelhas selecionadas, envoltas em papel seda e laço de cetim.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Orquídea Phalaenopsis Branca',
    price: 124.50,
    description: 'Uma orquídea branca majestosa em um vaso de cerâmica artesanal. Perfeita para decoração de interiores.',
    image: 'https://images.unsplash.com/photo-1596434446648-356066265008?q=80&w=800&auto=format&fit=crop',
    category: 'Orchids',
    stock: 8,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Cesta de Café da Manhã Floral',
    price: 245.00,
    description: 'Uma combinação deliciosa de pães, frutas e um pequeno arranjo de flores do campo para começar o dia.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    category: 'Gifts',
    stock: 5,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Planta Costela de Adão (Monsteras)',
    price: 89.00,
    description: 'Planta tendência para decoração, resistente e com folhas icônicas que trazem vida a qualquer ambiente.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop',
    category: 'Plants',
    stock: 20,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Arranjo Girassóis da Alegria',
    price: 98.00,
    description: 'Três girassóis vibrantes acompanhados de folhagens silvestres em um delicado cachepô de madeira.',
    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    stock: 12,
    rating: 5.0
  },
  {
    id: '6',
    name: 'Vaso de Lírios Brancos',
    price: 110.00,
    description: 'Lírios perfumados que simbolizam pureza e elegância. Ideal para presentes de agradecimento.',
    image: 'https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    stock: 10,
    rating: 4.8
  }
];

export const CATEGORIES = ['Tudo', 'Bouquets', 'Orchids', 'Plants', 'Gifts'];
