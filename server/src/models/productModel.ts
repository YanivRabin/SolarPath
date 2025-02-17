export interface Product {
  id: string;
  name: string;
  category: string;
  colors: ColorOption[];
  additionalInfo: ProductInfo[];
  createdAt: Date;
}

export interface ColorOption {
  code: string;
  name: string;
  image: string;
}

export interface ProductInfo {
  label: string;
  value: string;
  link?: string;
}
