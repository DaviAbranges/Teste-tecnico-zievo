import { useForm } from 'react-hook-form';
import { LoginFormSchema, loginFormSchema } from '../formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return form;
};
