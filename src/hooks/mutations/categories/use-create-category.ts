import axios from "axios";
import { API_URL, CATEGORIES_ENDPOINT } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../../queries/categories/use-get-categories";

const createCategory = async (name: string) => {
  const response = await axios.post(`${API_URL}${CATEGORIES_ENDPOINT}`, {
    name,
  });
  return response.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });
};
