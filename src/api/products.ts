import axios from "axios";

let baseURL = "https://dummyjson.com/products";

export const getProductsCategories = (): Promise<Categories> =>
  axios.get(`${baseURL}/categories`).then((response) => response.data);

export const getProducts = (searchTerm?: string): Promise<Products> => {
  let reqURL = baseURL + (searchTerm?.length ? `/search?q=${searchTerm}` : "");
  return axios.get(reqURL).then((response) => response.data);
};
