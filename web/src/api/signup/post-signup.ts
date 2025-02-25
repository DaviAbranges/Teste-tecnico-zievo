import { ISignUp } from '../../interfaces/signup';
import { api } from '../../lib/axios';

export async function signup(body: ISignUp) {
  const { data } = await api.post('/users', { ...body });

  return data;
}
