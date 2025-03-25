import axios from "axios";
import { Product } from "../types";
import { API_URL } from ".";

export const getProducts = async () => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product) => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
