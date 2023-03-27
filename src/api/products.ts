import axios from "axios";
import queryString from "query-string";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

//TODO: Move to common config
let baseURL = "https://desert-innovative-bedbug.glitch.me";

type getProductsQueryParams = {
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortField: string;
  filters: { brand?: CheckboxValueType[] };
  range?: FilterFieldsRange;
};

export const getProductsBrands = (): Promise<Brands> =>
  axios.get(`${baseURL}/brands`).then((response) => response.data);

//TODO: move to utils
const rangeFilterToJsonServer = (range: FilterFieldsRange) => {
  return Object.entries(range).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [`${key}_gte`]: (val as NumberRange)[0],
      [`${key}_lte`]: (val as NumberRange)[1],
    }),
    {}
  );
};

//TODO: move to utils
const sortValueToJsonServer = (sortValue: string) => {
  const [_sort, _order] = sortValue.split("_");
  return { _sort, _order };
};

export const getProducts = ({
  searchTerm,
  limit,
  page,
  sortField,
  filters,
  range,
}: getProductsQueryParams): Promise<Products> => {
  const requestURI = queryString.stringifyUrl({
    url: baseURL + "/products",
    query: {
      ...filters,
      ...(searchTerm && { q: searchTerm }),
      ...(range && rangeFilterToJsonServer(range)),
      ...(page && { _page: page }),
      ...(limit && { _limit: limit }),
      ...(sortField && sortValueToJsonServer(sortField)),
    },
  });

  return axios.get(requestURI).then((response) => {
    const total = response.headers["x-total-count"];
    return {
      rows: response.data,
      ...(total && { total }),
    };
  });
};
