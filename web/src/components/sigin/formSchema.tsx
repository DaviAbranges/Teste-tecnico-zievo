import { z } from 'zod';

export const signinFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, { message: 'Nome é obrigatório' }),
  email: z
    .string({ required_error: 'E-mail é obrigatório!' })
    .min(1, 'E-mail é obrigatório!')
    .email({
      message: 'E-mail inválido!',
    })
    .min(5, 'E-mail inválido!')
    .max(50),
  password: z
    .string({ required_error: 'Senha é obrigatória!' })
    .min(5, { message: 'Senha é obrigatória!' })
    .max(50),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;
