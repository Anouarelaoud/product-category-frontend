import axios from "axios";
import { API_URL, CATEGORIES_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../../queries/categories/use-get-categories";
import { toast } from "react-toastify";

const deleteCategory = async (categoryId: number) => {
  const response = await axios.delete(
    `${API_URL}${CATEGORIES_ENDPOINT}/${categoryId}`
  );
  return response.data;
};

export const useDeleteCategory = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success("Category deleted successfully!", {
        style: {
          backgroundColor: "white",
          border: "2px solid green",
          color: "green",
        },
      });
    },
    onError: (error) => {
      toast.error(
        error.message ?? "Failed to delete category. Please try again.",
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
