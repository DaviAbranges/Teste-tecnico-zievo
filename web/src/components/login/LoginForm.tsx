import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../App.css';

interface LoginFormProps {
  switchToSignIn: () => void;
}

export const LoginForm = ({ switchToSignIn }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: { email: string; password: string }) => {
    const { email, password } = data;
    // Exemplo de validação simple
  };

  return (
    <>
      <h1>Faça seu login</h1>
      {/* Ative o onSubmit para que o handleSubmit funcione */}
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <form className="form">
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            {...register('email', { required: 'E-mail é obrigatório!' })}
          />
          {/* {errors.email && (
            <span className="error">{errors.email.message}</span>
          )} */}
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            autoComplete="off"
            {...register('password', { required: 'Senha é obrigatória!' })}
          />
          {/* {errors.password && (
            <span className="error">{errors.password.message}</span>
          )} */}
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Carregando...' : 'Entrar'}
        </button>

        <div className="keep-logged">
          <input type="checkbox" id="keepLogged" />
          <label htmlFor="keepLogged">Manter-me conectado</label>
        </div>

        <button type="button" onClick={switchToSignIn}>
          Criar nova conta
        </button>
      </form>
    </>
  );
};
