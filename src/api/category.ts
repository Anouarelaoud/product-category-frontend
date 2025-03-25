import axios from "axios";
import { Category } from "../types";
import { API_URL } from ".";

export const getCategories = async () => {
  const response = await axios.get<Category[]>(API_URL);
  return response.data;
};

export const getCategoryById = async (id: number) => {
  const response = await axios.get<Category>(`${API_URL}/${id}`);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await axios.post<Category>(API_URL, category);
  return response.data;
};

export const updateCategory = async (id: number, category: Category) => {
  const response = await axios.put<Category>(`${API_URL}/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
