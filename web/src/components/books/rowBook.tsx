import { IBook } from '../../interfaces/books/IBook';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

interface BookRowProps {
  book: IBook;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
  onView: (book: IBook) => void;
}

// Componente responsável por renderizar uma linha da tabela
export function BookRow({ book, onEdit, onDelete, onView }: BookRowProps) {
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>{book.genre}</td>
      <td>{truncateText(book.synopsis, 12)}</td>
      <td>{truncateText(book.review, 12)}</td>
      <td>{book.rating}</td>
      <td>
        <button onClick={() => onEdit(book)} className="icon-button">
          <FaEdit />
        </button>
      </td>
      <td>
        <button onClick={() => onDelete(book)} className="icon-button">
          <FaTrashAlt />
        </button>
      </td>
      <td>
        <button onClick={() => onView(book)} className="icon-button">
          <FaEye />
        </button>
      </td>
    </tr>
  );
}
