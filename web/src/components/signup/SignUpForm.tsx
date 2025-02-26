import '../../App.css';
import { useSignUp } from '../../hooks/signup/useSignUp';
import { ISignUp } from '../../interfaces/signup';
import { useSignUpForm } from './hooks/useSignupForm';
import { modalAtom } from '../../store/modal';
import { useAtom } from 'jotai';

interface SignUpFormProps {
  switchToLogin: () => void;
}

export const SignUpForm = ({ switchToLogin }: SignUpFormProps) => {
  const [, setModal] = useAtom(modalAtom);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useSignUpForm();
  const { mutateAsync: signup } = useSignUp();

  // Função crítica: valida os dados e realiza o cadastro
  const onSubmit = async (data: ISignUp) => {
    const isValid = await trigger();
    if (!isValid) return;
    try {
      await signup({
        body: { name: data.name, email: data.email, password: data.password },
      });
      setModal({
        open: true,
        type: 'success',
        title: 'Conta criada com sucesso!',
        message: 'Parabéns, sua conta foi criada com êxito.',
        onConfirm: () => switchToLogin(),
      });
    } catch (error) {
      setModal({
        open: true,
        type: 'error',
        onConfirm: () => null,
        title: 'Sua solicitação não pode ser concluída.',
      });
      reset();
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Crie sua conta</h1>
      <div className="form-group">
        <input type="text" placeholder="Nome completo" {...register('name')} />
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
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={switchToLogin} className="create-return">
        Voltar para Login
      </button>
    </form>
  );
};
