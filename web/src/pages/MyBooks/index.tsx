import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import '../../styles/books/myBooks.css';
import { useGetBooks } from '../../hooks/books/useGetBooks';
import { IBook } from '../../interfaces/books/IBook';
import { useSetAtom } from 'jotai';
import { modalAtom } from '../../store/modal';
import { deleteBook } from '../../api/books/delete-books';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

export default function MyBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const setModal = useSetAtom(modalAtom);
  const navigate = useNavigate();

  const [books, setBooks] = useState<IBook[]>([]);
  const { mutateAsync: allBooks } = useGetBooks();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await allBooks();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [allBooks]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = useMemo(
    () =>
      books.filter((book: IBook) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [books, searchTerm],
  );

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
      formData: book, // Passando as informações do livro para o modal
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
          // Chame a função de exclusão aqui
          await deleteBook(book.id || ''); // Substitua `deleteBook` pela função da API de exclusão
          // Atualize a lista de livros após excluir
          setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
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
      formData: book, // Passando as informações do livro para o modal
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const handleViewClick = (book: IBook) => {
    navigate(`/viewBook/${book.id}`);
  };
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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book: IBook, index: number) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.genre}</td>
                <td>{truncateText(book.synopsis, 12)}</td>
                <td>{truncateText(book.review, 12)}</td>
                <td>{book.rating}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(book)}
                    className="icon-button"
                  >
                    <FaEdit />{' '}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="icon-button"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleViewClick(book)}
                    className="icon-button"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Nenhum livro encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
