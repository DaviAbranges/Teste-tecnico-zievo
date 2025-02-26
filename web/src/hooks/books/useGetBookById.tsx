import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';

export const useGetBookById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.get(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return data;
    },
  });
};
