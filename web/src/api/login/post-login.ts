import { ISignin } from '../../interfaces/signin';
import { api } from '../../lib/axios';

export async function signin(body: ISignin) {
  const { data } = await api.post('/users', { ...body });

  return data;
}
