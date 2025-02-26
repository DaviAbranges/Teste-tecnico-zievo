export interface IBook {
  id?: string;
  title: string;
  author: string;
  year: string;
  genre: string;
  synopsis: string;
  review: string;
  rating: number;
}

interface IBookForm extends Omit<IBook, 'id'> {}
