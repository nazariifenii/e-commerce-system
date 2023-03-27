import axios from "axios";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

let baseURL = "https://desert-innovative-bedbug.glitch.me";

type getProductsQueryParams = {
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortField: string;
  filters: { brand?: CheckboxValueType[] };
  range?: FilterFieldsRange;
};

export const getProductsCategories = (): Promise<Categories> =>
  axios.get(`${baseURL}/categories`).then((response) => response.data);

export const getProductsBrands = (): Promise<Brands> =>
  axios.get(`${baseURL}/brands`).then((response) => response.data);

export const getProducts = ({
  searchTerm,
  limit,
  page,
  sortField,
  filters,
  range,
}: getProductsQueryParams): Promise<Products> => {
  const filtersQuery = Object.entries(filters).reduce((acc, [key, val]) => {
    const value = val.join(`&${key}=`);
    return acc ? `${acc}&${key}=${value}` : `?${key}=${value}`;
  }, "");

  const rangeParams =
    range &&
    Object.entries(range).reduce((acc, [key, val]) => {
      return {
        ...acc,
        [`${key}_gte`]: (val as NumberRange)[0],
        [`${key}_lte`]: (val as NumberRange)[1],
      };
    }, {});

  const params = {
    ...(searchTerm && { q: searchTerm }),
    ...(page && { _page: page }),
    ...(limit && { _limit: limit }),
    _sort: sortField.split("_")[0],
    ...(sortField.includes("asc") || sortField.includes("desc")
      ? { _order: sortField.split("_")[1] }
      : {}),
    ...(range && rangeParams),
  };

  return axios
    .get(`${baseURL}/products${filtersQuery}`, { params })
    .then((response) => {
      const total = response.headers["x-total-count"];
      return {
        rows: response.data,
        ...(total && { total }),
      };
    });
};
