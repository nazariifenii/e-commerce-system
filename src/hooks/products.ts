import { useQueries } from "@tanstack/react-query";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import {
  getProducts,
  getProductsCategories,
  getProductsBrands,
} from "src/api/products";

type useGetProductsParams = {
  searchTerm?: string;
  page: number;
  sortField: string;
  filters: { brand?: CheckboxValueType[] };
  range?: FilterFieldsRange;
};

export const useGetProducts = ({
  searchTerm,
  page,
  sortField,
  filters,
  range,
}: useGetProductsParams) => {
  const [paginatedProductsResult, nonPaginatedProductsResult] = useQueries({
    queries: [
      {
        queryKey: ["products", page, filters, sortField, searchTerm, range],
        keepPreviousData: true,
        queryFn: () =>
          getProducts({
            searchTerm,
            limit: 8,
            page,
            sortField,
            filters,
            range,
          }),
      },
      {
        queryKey: ["products", filters, sortField, searchTerm],
        queryFn: () =>
          getProducts({
            searchTerm,
            sortField,
            filters,
          }),
      },
    ],
  });

  // Unfortunatelly the json server does not allows to return certain fields
  // and does not count data dynamically, so we fetch all the fields
  const productPrices =
    nonPaginatedProductsResult?.data?.rows.map(
      (product: ProductType) => product.price
    ) || [];

  return {
    isLoading: paginatedProductsResult.isLoading,
    error: paginatedProductsResult.error,
    data: paginatedProductsResult.data,
    productPrices: productPrices, //TODO: Handle nonPaginatedProductsResult query separatelly (loading, error etc.)
  };
};

export const useGetProductsData = () => {
  const [productsCategories, productsBrands] = useQueries({
    queries: [
      {
        queryKey: ["products", "categories"],
        queryFn: getProductsCategories,
      },
      {
        queryKey: ["products", "brands"],
        queryFn: getProductsBrands,
      },
    ],
  });

  return { productsCategories, productsBrands };
};
