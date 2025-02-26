import { z } from 'zod';

export const bookFormSchema = z.object({
  title: z
    .string({ required_error: 'Título é obrigatório!' })
    .min(1, 'Título é obrigatório!')
    .max(50),
  genre: z
    .string({ required_error: 'Gênero é obrigatório!' })
    .min(1, 'Gênero é obrigatório!')
    .max(50),
  author: z
    .string({ required_error: 'Autor é obrigatório!' })
    .min(1, 'Autor é obrigatório!')
    .max(50),
  year: z.string({ required_error: 'Ano é obrigatório!' }),
  synopsis: z
    .string({ required_error: 'Sinopse é obrigatória!' })
    .min(1, 'Sinopse é obrigatória!')
    .max(500),
  review: z.string().max(500),
  rating: z.number().min(1).max(5),
});

export type BookFormSchema = z.infer<typeof bookFormSchema>;
