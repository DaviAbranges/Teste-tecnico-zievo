import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookById } from '../../hooks/books/useGetBookById';
import { IBook } from '../../interfaces/books/IBook';
import '../../styles/books/viewBook.css';

export const ViewBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { mutateAsync: getBookById } = useGetBookById();

  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await getBookById(bookId || '');
        console.log('response:', data);

        setBook(data);
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId, getBookById]);

  const handleBack = () => {
    navigate('/homePage');
  };

  if (!book) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="view-book-container">
      <h1>Visualizar Livro</h1>
      <div className="book-details">
        <h2>{book.title}</h2>
        <p>
          <strong>Autor:</strong> {book.author}
        </p>
        <p>
          <strong>Ano:</strong> {book.year}
        </p>
        <p>
          <strong>Gênero:</strong> {book.genre}
        </p>
        <p>
          <strong>Sinopse:</strong> {book.synopsis}
        </p>
        <p>
          <strong>Opinião:</strong> {book.review}
        </p>
        <p>
          <strong>Avaliação:</strong> {book.rating} estrelas
        </p>
      </div>
      <button onClick={handleBack} className="btn btn-back">
        Voltar
      </button>
    </div>
  );
};
