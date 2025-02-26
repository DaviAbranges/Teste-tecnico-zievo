import { IBook } from '../../interfaces/books/IBook';
import { api } from '../../lib/axios';

export const updateBook = async (id: string, body: IBook) => {
  console.log('body', body, id);

  return api.put(`/books/${id}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
