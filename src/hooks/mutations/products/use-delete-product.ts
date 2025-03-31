import axios from "axios";
import { API_URL, PRODUCTS_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PRODUCTS_QUERY_KEY } from "../../queries/products/use-get-products";

const deleteProduct = async (productId: number) => {
  const response = await axios.delete(
    `${API_URL}${PRODUCTS_ENDPOINT}/${productId}`
  );
  return response.data;
};

export const useDeleteProduct = (productId: number, categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_QUERY_KEY, categoryId],
      });
      toast.success("Product deleted successfully!", {
        style: {
          backgroundColor: "white",
          border: "2px solid green",
          color: "green",
        },
      });
    },
    onError: (error) => {
      toast.error(
        error.message ?? "Failed to delete product. Please try again.",
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
