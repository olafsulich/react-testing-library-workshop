import { LoginType } from '../components/loginForm/LoginForm';

export function login(user: LoginType) {
  return Promise.resolve(user);
}
