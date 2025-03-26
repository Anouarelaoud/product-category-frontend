import axios from "axios";
import { Category } from "../types";
import { API_URL, CATEGORIES_ENDPOINT } from ".";

const CATEGORIES_API_URL = API_URL + CATEGORIES_ENDPOINT

export const getCategories = async () => {
  const response = await axios.get<Category[]>(CATEGORIES_API_URL);
  return response.data;
};

export const getCategoryById = async (id: number) => {
  const response = await axios.get<Category>(`${CATEGORIES_API_URL}/${id}`);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await axios.post<Category>(CATEGORIES_API_URL, category);
  return response.data;
};

export const updateCategory = async (id: number, category: Category) => {
  const response = await axios.put<Category>(`${CATEGORIES_API_URL}/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`${CATEGORIES_API_URL}/${id}`);
};
