import { useMutation } from '@tanstack/react-query';
import { ISignUp } from '../../interfaces/signup';
import { signup } from '../../api/signup/post-signup';

interface MutationArgs {
  body: ISignUp;
}
export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ body }: MutationArgs) => signup(body),
  });
};
