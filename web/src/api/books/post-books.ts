import { IBook } from '../../interfaces/books/IBook';
import { api } from '../../lib/axios';

export async function postBooks(body: IBook) {
  const { data } = await api.post('/books', body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return data;
}
