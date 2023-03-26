declare type Categories = Array<string>;

declare type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

declare type Brands = Array<string>;

declare type Products = {
  rows: Array<ProductType>;
  total?: number;
};

declare type NumberRange = [number, number];

declare type FilterFieldsRange = { [key]: [number, number] };
