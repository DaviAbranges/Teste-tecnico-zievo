import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useGetBookById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.get(`/api/books/${id}`);
      return response;
    },
  });
};
