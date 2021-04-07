import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { errorMessages } from '../../utils/errorsMessages';

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const MIN_USERNAME_LENGTH = 5;

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required(errorMessages.username.required)
    .min(MIN_USERNAME_LENGTH, errorMessages.username.pattern),
  password: Yup.string()
    .required(errorMessages.password.required)
    .matches(PASSWORD_PATTERN, errorMessages.password.pattern),
});

export type LoginType = Pick<Yup.InferType<typeof loginSchema>, 'username' | 'password'>;

type LoginFormProps = {
  login: (user: LoginType) => Promise<LoginType>;
};

export const LoginForm = ({ login }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    login(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Login</h1>
        <div>
          <label>
            Username
            <input
              type="text"
              {...register('username')}
              aria-invalid={errors.username ? true : false}
              autoComplete="username"
              aria-describedby="password-constraints"
              required
            />
          </label>
          <p id="username-constraints">Username should be at least five characters long</p>
          {errors.username ? <span role="alert">{errors.username.message}</span> : null}
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              {...register('password')}
              aria-invalid={errors.password ? true : false}
              aria-describedby="password-constraints"
              autoComplete="current-password"
              required
            />
          </label>
          <button type="button">
            <span className="visually-hidden">Show password as a normal text</span>
          </button>
          <p id="password-constraints">
            Password needs to be minimum of eight characters, it must contain at least one letter
            and one number
          </p>
          {errors.password ? <span role="alert">{errors.password.message}</span> : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
