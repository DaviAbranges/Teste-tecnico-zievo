import { api } from '../../lib/axios';

export async function deleteBook(id: string) {
  const { data } = await api.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
}
