import { useQueries, useQuery } from "@tanstack/react-query";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import { getProducts, getProductsBrands } from "src/api/products";

type UseGetProductsDataParams = {
  searchTerm?: string;
  sortField: string;
  filters: { brand?: CheckboxValueType[] };
};

type UseGetProductsParams = {
  page: number;
  range?: FilterFieldsRange;
} & UseGetProductsDataParams;

export const useGetProducts = ({
  searchTerm,
  page,
  sortField,
  filters,
  range,
}: UseGetProductsParams) => {
  const { isLoading, error, data, isFetching } = useQuery({
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
  });

  return {
    isFetching,
    isLoading,
    error,
    data,
  };
};

export const useGetProductsData = ({
  searchTerm,
  sortField,
  filters,
}: UseGetProductsDataParams) => {
  const [nonPaginatedProducts, productsBrands] = useQueries({
    queries: [
      {
        queryKey: ["products", filters, sortField, searchTerm],
        queryFn: () =>
          getProducts({
            searchTerm,
            sortField,
            filters,
          }),
      },
      {
        queryKey: ["products", "brands"],
        queryFn: getProductsBrands,
      },
    ],
  });

  // Unfortunatelly the json server does not allows to return certain fields
  // and does not count data dynamically, so we fetch all the fields
  const nonPaginatedProductsPrices =
    nonPaginatedProducts?.data?.rows.map(
      (product: ProductType) => product.price
    ) || [];

  const productPrices = {
    data: nonPaginatedProductsPrices,
    isLoading: nonPaginatedProducts.isLoading,
  };

  return { productPrices, productsBrands };
};
