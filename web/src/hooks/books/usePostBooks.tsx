import { useMutation } from '@tanstack/react-query';
import { postBooks } from '../../api/books/post-books';
import { IBook } from '../../interfaces/books/IBook';

export const usePostBooks = () => {
  return useMutation({
    mutationFn: (body: IBook) => postBooks(body),
  });
};
