import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useGetBooks } from '../../hooks/books/useGetBooks';
import { IBook } from '../../interfaces/books/IBook';
import { useSetAtom } from 'jotai';
import { modalAtom } from '../../store/modal';
import { deleteBook } from '../../api/books/delete-books';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { generateYearRange } from '../../utils/dateUtils';
import { FiltersMenu } from '../../components/filters/filtersMenu';
import { BookRow } from '../../components/books/rowBook';
import '../../styles/books/myBooks.css';

// Função auxiliar para centralizar os handlers de mudança
const createChangeHandler =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setter(e.target.value);

export default function MyBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const setModal = useSetAtom(modalAtom);
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);
  const { mutateAsync: allBooks } = useGetBooks();

  // Busca os livros ao montar o componente
  useEffect(() => {
    allBooks()
      .then(({ data }) => setBooks(data))
      .catch(console.error);
  }, [allBooks]);

  // Handlers utilizando a função auxiliar
  const handleSearchChange = createChangeHandler(setSearchTerm);
  const handleAuthorChange = createChangeHandler(setAuthorFilter);
  const handleGenreChange = createChangeHandler(setGenreFilter);
  const handleYearChange = createChangeHandler(setYearFilter);
  const handleRatingChange = createChangeHandler(setRatingFilter);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Filtra os livros conforme os filtros e pesquisa
  const filteredBooks = useMemo(
    () =>
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!authorFilter ||
            book.author.toLowerCase().includes(authorFilter.toLowerCase())) &&
          (!genreFilter || book.genre === genreFilter) &&
          (!yearFilter || book.year.includes(yearFilter)) &&
          (!ratingFilter || book.rating === parseInt(ratingFilter)),
      ),
    [books, searchTerm, authorFilter, genreFilter, yearFilter, ratingFilter],
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const displayedBooks = useMemo(() => {
    const start = (currentPage - 1) * booksPerPage;
    return filteredBooks.slice(start, start + booksPerPage);
  }, [filteredBooks, currentPage, booksPerPage]);

  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleAddClick = () => {
    setModal({
      open: true,
      type: 'form',
      title: 'Inserir novo livro',
      message: 'Preencha os dados do livro',
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
    });
  };

  const handleEditClick = (book: IBook) => {
    setModal({
      open: true,
      type: 'form',
      title: 'Editar livro',
      message: 'Edite as informações do livro',
      confirmButtonText: 'Salvar alterações',
      cancelButtonText: 'Cancelar',
      formData: book,
    });
  };

  const handleDeleteClick = (book: IBook) => {
    setModal({
      open: true,
      type: 'error',
      title: 'Deletar livro',
      message: `Tem certeza que deseja deletar o livro ${book.title}?`,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      onConfirm: async () => {
        try {
          await deleteBook(book.id || '');
          setBooks((prev) => prev.filter((b) => b.id !== book.id));
          setModal({
            open: true,
            type: 'success',
            title: 'Livro excluído com sucesso!',
          });
        } catch (error) {
          console.error('Erro ao deletar o livro:', error);
          setModal({
            open: true,
            type: 'error',
            title: 'Erro ao deletar o livro.',
            message: 'Ocorreu um erro ao tentar excluir o livro.',
          });
        }
      },
      formData: book,
    });
  };

  const handleViewClick = (book: IBook) => navigate(`/viewBook/${book.id}`);

  // Gera filtros dinâmicos
  const authors = useMemo(
    () => [...new Set(books.map((book) => book.author))],
    [books],
  );
  const years = useMemo(
    () => generateYearRange(new Date().getFullYear(), 1900),
    [],
  );
  const genres = [
    'Ficção Científica',
    'Romance',
    'Mistério',
    'Fantasia',
    'Biografia',
    'Autoajuda',
    'Outro',
  ];

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar por título"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="add-button" onClick={handleAddClick}>
          Inserir novo livro
        </button>
        <FiltersMenu
          authorFilter={authorFilter}
          onAuthorChange={handleAuthorChange}
          genreFilter={genreFilter}
          onGenreChange={handleGenreChange}
          yearFilter={yearFilter}
          onYearChange={handleYearChange}
          ratingFilter={ratingFilter}
          onRatingChange={handleRatingChange}
          authors={authors}
          genres={genres}
          years={years}
        />
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>Sinopse</th>
            <th>Análise</th>
            <th>Avaliação</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length ? (
            displayedBooks.map((book, index) => (
              <BookRow
                key={index}
                book={book}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onView={handleViewClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan={10}>Nenhum livro encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
        <button className="icon-button logout" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}
