import { useForm } from 'react-hook-form';
import { signupFormSchema, SignUpFormSchema } from '../formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return form;
};
