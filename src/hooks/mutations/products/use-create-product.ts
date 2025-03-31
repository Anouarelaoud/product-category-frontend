import axios from "axios";
import { API_URL, PRODUCTS_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PRODUCTS_QUERY_KEY } from "../../queries/products/use-get-products";
import { Category } from "../../../types";

export type ProductPayload = {
  id?: number;
  name: string;
  description: string;
  price: number;
  currency?: string;
  category: Category;
};

const createProduct = async (payload: ProductPayload) => {
  const response = await axios.post(`${API_URL}${PRODUCTS_ENDPOINT}`, payload);
  return response.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductPayload) => createProduct(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY, variables.category.id],
      });

      toast.success("Product created successfully!", {
        style: {
          backgroundColor: "white",
          border: "2px solid green",
          color: "green",
        },
      });
    },

    onError: (error) => {
      toast.error(
        error.message ?? "Failed to create product. Please try again.",
        {
          style: {
            backgroundColor: "white",
            border: "2px solid red",
            color: "red",
          },
        }
      );
    },
  });
};
