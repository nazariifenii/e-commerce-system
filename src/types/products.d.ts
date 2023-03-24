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

declare type Products = {
  products: Array<ProductType>;
  total: number;
  skip: number;
  limit: number;
};
