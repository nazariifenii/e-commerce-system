import { useQuery } from "@tanstack/react-query";

import { getProducts, getProductsCategories } from "src/api/products";

export const useGetProducts = (searchTerm?: string) => {
  const {
    isLoading,
    error,
    data: productsData,
  } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => getProducts(searchTerm),
  });

  const productPrices =
    productsData?.products.map((product: ProductType) => product.price) || [];

  return { isLoading, error, productsData, productPrices };
};

export const useGetProductsCategories = () => {
  const {
    isLoading,
    error,
    data: productsCategories,
  } = useQuery({
    queryKey: ["products", "categories"],
    queryFn: getProductsCategories,
  });

  return { isLoading, error, productsCategories };
};
