import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm, LoginType } from './LoginForm';
import { errorMessages } from '../../utils/errorsMessages';

const loginMock = jest.fn((user: LoginType) => {
  return Promise.resolve(user);
});

describe('LoginForm', () => {
  it('displays required errors when the values are invalid', async () => {
    render(<LoginForm login={loginMock} />);

    const submitButton = screen.getByRole('button', { name: /Submit/ });

    userEvent.click(submitButton);

    const usernameRequiredErrorMessage = await screen.findByText(errorMessages.username.required);
    const passwordRequiredErrorMessage = await screen.findByText(errorMessages.password.required);

    expect(usernameRequiredErrorMessage).toBeInTheDocument();
    expect(passwordRequiredErrorMessage).toBeInTheDocument();
  });
  it('displays matching errors when the values are invalid', async () => {
    render(<LoginForm login={loginMock} />);

    const submitButton = screen.getByRole('button', { name: /Submit/ });
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const username = 'test';
    const password = 'test';

    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    const usernamePatternErrorMessage = await screen.findByText(errorMessages.username.pattern);
    const passwordPatternErrorMessage = await screen.findByText(errorMessages.password.pattern);

    expect(loginMock).not.toBeCalled();
    expect(usernamePatternErrorMessage).toBeInTheDocument();
    expect(passwordPatternErrorMessage).toBeInTheDocument();
  });

  it('successfully submit the form with correct data', async () => {
    render(<LoginForm login={loginMock} />);

    const submitButton = screen.getByRole('button', { name: /Submit/ });
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    const username = 'test user';
    const password = 'Passwd12';

    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    userEvent.click(submitButton);

    const alerts = screen.queryAllByRole('alert');

    expect(alerts).toHaveLength(0);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({ password, username });
    });
  });
});
