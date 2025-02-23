export interface Product {
  mainImage: string;
  id: string;
  name: string;
  category: string;
  image: string;
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

export interface BackOfficeProductProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const applicationOptions = [
  "Streets Lighting",
  "Parking Lots",
  "Residential Roads",
  "Public Parks",
  "Sports Lighting",
  "High Speed way",
  "Boardwalks",
  "Farms",
  "Private gardens",
  "Access roads",
  "Walking paths",
];