import { useForm } from 'react-hook-form';
import { signinFormSchema, SigninFormSchema } from '../formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSigninForm = () => {
  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return form;
};
