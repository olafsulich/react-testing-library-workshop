import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increments the count', () => {
    render(<Counter />);

    screen.debug();

    const button = screen.getByRole('button', { name: /increment/ });

    const count = screen.getByText(/count/);

    expect(count).toHaveTextContent('count: 0');

    userEvent.click(button);

    expect(count).toHaveTextContent('count: 1');
  });

  it('decrements the count', () => {
    render(<Counter />);

    const button = screen.getByRole('button', { name: /decrement/ });

    const count = screen.getByText(/count/);

    expect(count).toHaveTextContent('count: 0');

    userEvent.click(button);

    expect(count).toHaveTextContent('count: -1');
  });
});
