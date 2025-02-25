import { useMutation } from '@tanstack/react-query';
import { ILogin } from '../../interfaces/login';
import { login } from '../../api/login/post-login';

interface MutationArgs {
  body: ILogin;
}
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ body }: MutationArgs) => login(body),
  });
};
