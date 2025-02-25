import '../../App.css';
import { useLogin } from '../../hooks/login/useLogin';
import { useLoginForm } from './hooks/useLoginForm';
import { modalAtom } from '../../store/modal';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  switchToSignUp: () => void;
}

export const LoginForm = ({ switchToSignUp }: LoginFormProps) => {
  const setModal = useSetAtom(modalAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();
  const { mutateAsync: login } = useLogin();

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      await login({ body: { email, password } });
      console.log(data);
      setModal({
        open: true,
        type: 'success',
        onClose: () => navigate('/homePage'),
        onConfirm: () => navigate('/homePage'),
        title: 'Login efetuado com sucesso!',
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

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login">Faça seu login</h1>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            className="with-icon"
            {...register('email', { required: 'E-mail é obrigatório!' })}
          />
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}

        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            autoComplete="off"
            {...register('password', { required: 'Senha é obrigatória!' })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Carregando...' : 'Entrar'}
        </button>

        <div className="keep-logged">
          <input type="checkbox" id="keepLogged" />
          <label htmlFor="keepLogged">Manter-me conectado</label>
        </div>

        <button
          type="button"
          onClick={switchToSignUp}
          className="create-return"
        >
          Criar nova conta
        </button>
      </form>
    </>
  );
};
