import { useForm } from 'react-hook-form';
import { bookFormSchema, BookFormSchema } from '../bookFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useBookForm = () => {
  const form = useForm<BookFormSchema>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      genre: '',
      author: '',
      year: '',
      synopsis: '',
      review: '',
      rating: 1,
    },
  });

  return form;
};
