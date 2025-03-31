import axios from "axios";
import { API_URL, PRODUCTS_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PRODUCTS_QUERY_KEY } from "../../queries/products/use-get-products";
import { ProductPayload } from "./use-create-product";

const updateProduct = async (payload: ProductPayload) => {
  const response = await axios.put(
    `${API_URL}${PRODUCTS_ENDPOINT}/${payload.id}`,
    payload
  );
  return response.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductPayload) => updateProduct(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY, variables.category.id],
      });
      toast.success("Product updated successfully!", {
        style: {
          backgroundColor: "white",
          border: "2px solid green",
          color: "green",
        },
      });
    },
    onError: (error) => {
      toast.error(
        error.message ?? "Failed to update product. Please try again.",
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
