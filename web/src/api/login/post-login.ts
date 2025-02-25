import { ILogin } from '../../interfaces/login';
import { api } from '../../lib/axios';

export async function login(body: ILogin) {
  const { data } = await api.post('/login', { ...body });

  return data;
}
