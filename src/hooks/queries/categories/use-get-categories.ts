import axios from "axios";
import { Category } from "../../../types";
import { API_URL, CATEGORIES_ENDPOINT } from "../../../api";
import { useQuery } from "@tanstack/react-query";

export const CATEGORIES_QUERY_KEY = "CATEGORIES_QUERY_KEY"

const getCategories = async () => {
    const response = await axios.get<Category[]>(API_URL + CATEGORIES_ENDPOINT);
    return response.data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: getCategories,
  });
} 