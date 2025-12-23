
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Bouquets' | 'Orchids' | 'Plants' | 'Gifts';
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'catalog' | 'product' | 'cart' | 'checkout';
