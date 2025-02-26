import { useAtom, useSetAtom } from 'jotai';
import '../../styles/books/bookForm.css';
import { modalAtom } from '../../store/modal';
import { useNavigate } from 'react-router-dom';
import { useBookForm } from './hooks/useBookForm';
import { Controller } from 'react-hook-form';
import { IBook } from '../../interfaces/books/IBook';
import { usePostBooks } from '../../hooks/books/usePostBooks';
import { useGetBookById } from '../../hooks/books/useGetBookById';
import { useEffect } from 'react';
import { updateBook } from '../../api/books/update-book';

type FieldName =
  | 'title'
  | 'genre'
  | 'author'
  | 'year'
  | 'synopsis'
  | 'review'
  | 'rating';

export const BookForm = () => {
  const setModal = useSetAtom(modalAtom);
  const navigate = useNavigate();
  const { mutateAsync: postBooks } = usePostBooks();
  const { mutateAsync: getBookById } = useGetBookById();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useBookForm();

  const [modal] = useAtom(modalAtom);
  const formData = modal.formData;
  const bookId = formData?.id;

  useEffect(() => {
    console.log('formData', formData);

    if (formData) {
      reset(formData);
    } else if (bookId) {
      const fetchBook = async () => {
        try {
          const { data } = await getBookById(bookId);
          reset(data);
        } catch (error) {
          console.error('Erro ao buscar livro:', error);
        }
      };
      fetchBook();
    }
  }, [bookId, getBookById, reset, formData]);

  const onSubmit = async (body: IBook) => {
    try {
      if (bookId) {
        console.log('bookId', bookId);
        await updateBook(bookId, body);
      } else {
        await postBooks(body);
      }

      setModal({
        open: true,
        type: 'success',
        onClose: () => {},
        onConfirm: () => navigate(0),
        title: bookId
          ? 'Livro atualizado com sucesso!'
          : 'Livro criado com sucesso!',
      });
    } catch (error) {
      setModal({
        open: true,
        type: 'error',
        onConfirm: () => null,
        title: 'Sua solicitação não pode ser concluída.',
      });
    }
  };

  const handleCancel = (event: React.FormEvent) => {
    event.preventDefault();
    setModal({
      open: true,
      type: 'error',
      title: 'Operação Cancelada',
      onConfirm: () => navigate('/homePage'),
    });
  };

  const renderSelectField = (name: 'genre', placeholder: string) => (
    <>
      <select className="input-field " {...register(name)}>
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="Ficção Científica">Ficção Científica</option>
        <option value="Romance">Romance</option>
        <option value="Mistério">Mistério</option>
        <option value="Fantasia">Fantasia</option>
        <option value="Biografia">Biografia</option>
        <option value="Autoajuda">Autoajuda</option>
        <option value="Outro">Outro</option>
      </select>
      {errors[name] && <span className="error">{errors[name]?.message}</span>}
    </>
  );

  const renderInputField = (name: FieldName, placeholder: string) => (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className="input-field"
        {...register(name)}
      />
      {errors[name] && <span className="error">{errors[name]?.message}</span>}
    </>
  );

  const renderTextArea = (name: FieldName, placeholder: string) => (
    <>
      <textarea
        placeholder={placeholder}
        className="input-field"
        {...register(name)}
      />
      {errors[name] && <span className="error">{errors[name]?.message}</span>}
    </>
  );

  return (
    <>
      <h1>{bookId ? 'Editar Livro' : 'Inserir Livro'}</h1>
      <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Informações do Livro</h1>
        <div className="form-group-book">
          {renderInputField('title', 'Informe o título')}
          {renderSelectField('genre', 'Informe o gênero')}
          {renderInputField('author', 'Informe o nome do autor')}
          <select className="input-field year-field" {...register('year')}>
            <option value="" disabled>
              Selecione o ano
            </option>
            {Array.from({ length: 50 }, (_, index) => {
              const currentYear = new Date().getFullYear();
              const year = currentYear - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          {renderTextArea('synopsis', 'Digite um breve relato sobre o livro')}
          {renderTextArea('review', 'Escreva sua opinião sobre o livro')}
          {/* Ano */}
          {errors.year && <span className="error">{errors.year?.message}</span>}

          {/* Avaliação */}
          <div className="rating">
            <span>Avaliação:</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <label key={starValue}>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="radio"
                          value={starValue}
                          checked={starValue === field.value}
                          onChange={() => field.onChange(starValue)}
                          className="star-input"
                        />
                        <span className="star">&#9733;</span>
                      </>
                    )}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {bookId ? 'Atualizar Livro' : 'Inserir Livro'}
          </button>
          <button
            type="reset"
            className="btn btn-cancell"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
