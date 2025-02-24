import { useSetAtom } from 'jotai';
import '../../App.css';
import { useSignin } from '../../hooks/signin/useSignin';
import { ISignin } from '../../interfaces/signin';
import { useSigninForm } from './hooks/useSigninForm';
import { modalAtom } from '../../store/modal';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
  switchToLogin: () => void;
}

export const SignInForm = ({ switchToLogin }: SignInFormProps) => {
  const setModal = useSetAtom(modalAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useSigninForm();
  const { mutateAsync: signin } = useSignin();
  const onSubmit = async (data: ISignin) => {
    const isValid = await trigger();
    if (!isValid) return false;

    try {
      await signin({
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
      setModal({
        open: true,
        type: 'success',
        onClose: () => null,
        onConfirm: () => null,
        content: {
          title: 'Categoria criada com sucesso!',
        },
      });
      navigate('/login');
    } catch (error) {}
    setModal({
      open: true,
      type: 'error',
      onConfirm: () => null,
      content: {
        title: 'Sua solicitação não pode ser concluída.',
      },
    });
  };
  return (
    <>
      <h1>Crie sua conta</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome completo"
            {...register('name')}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            autoComplete="off"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Crie uma senha"
            {...register('password')}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={switchToLogin}>
          Voltar para Login
        </button>
      </form>
    </>
  );
};
