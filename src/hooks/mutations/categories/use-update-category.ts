import axios from "axios";
import { API_URL, CATEGORIES_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../../queries/categories/use-get-categories";

const updateCategory = async ({ id, name }: { id: number; name: string }) => {
  const response = await axios.put(`${API_URL}${CATEGORIES_ENDPOINT}/${id}`, {
    name,
  });
  return response.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory({ id, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });
};
