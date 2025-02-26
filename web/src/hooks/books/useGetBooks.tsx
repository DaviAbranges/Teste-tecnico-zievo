import { useMutation } from '@tanstack/react-query';
import { getBooks } from '../../api/books/get-books';

export const useGetBooks = () => {
  return useMutation({
    mutationFn: () => getBooks(),
  });
};
