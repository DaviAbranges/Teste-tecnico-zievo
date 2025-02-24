import { useMutation } from '@tanstack/react-query';
import { ISignin } from '../../interfaces/signin';
import { signin } from '../../api/login/post-login';

interface MutationArgs {
  body: ISignin;
}
export const useSignin = () => {
  return useMutation({
    mutationFn: ({ body }: MutationArgs) => signin(body),
  });
};
