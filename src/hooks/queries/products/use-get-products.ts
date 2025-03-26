import axios from "axios";
import { Product } from "../../../types";
import { API_URL, PRODUCTSS_ENDPOINT } from "../../../api";
import { useQuery } from "@tanstack/react-query";

export const PRODUCTS_QUERY_KEY = "PRODUCTS_QUERY_KEY";

const getProducts = async (categoryId: number) => {
  const response = await axios.get<Product[]>(
    `${API_URL}${PRODUCTSS_ENDPOINT}/category/${categoryId}`
  );
  return response.data;
};

export const useGetProducts = (categoryId: number) => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, categoryId],
    queryFn: () => getProducts(categoryId),
    enabled: !!categoryId,
  });
};
