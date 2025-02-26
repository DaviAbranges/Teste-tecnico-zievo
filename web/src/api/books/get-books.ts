import { api } from '../../lib/axios';

export async function getBooks() {
  const { data } = await api.get('/books', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return data;
}
