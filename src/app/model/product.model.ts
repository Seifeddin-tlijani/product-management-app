export interface Product {
  id: number;
  name: String;
  price: number;
  quantity: number;
  selected: boolean;
  available: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  thumbnail: string;
  isPrimary: boolean;
  caption?: string;
}
