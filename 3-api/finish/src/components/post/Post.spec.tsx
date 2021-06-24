import {
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ReactNode } from 'react';
import { postData } from '../../data/post';
import { Post } from './Post';
import type { Post as PostType } from '../../utils/types';

const server = setupServer(
  rest.get<PostType>('https://jsonplaceholder.typicode.com/posts/1', (_req, res, ctx) => {
    return res(
      ctx.json({
        ...postData,
      }),
    );
  }),
);

const render = (ui: ReactNode, { ...rtlOptions }: RenderOptions = {}) => {
  const queryClient = new QueryClient();

  return rtlRender(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, {
    ...rtlOptions,
  });
};

describe('Post', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows correct title when loading status is over', async () => {
    render(<Post id={1} />);

    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const postHeading = screen.getByRole('heading', { level: 2 });
      expect(postHeading).toHaveTextContent(postData.title);
    });
  });

  it('shows an error message when request fails', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/posts/1', (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<Post id={1} />);

    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const error = screen.getByText(/something went wrong/i);

      expect(error).toBeInTheDocument();
    });
  });
});
