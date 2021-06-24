import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ReactNode } from 'react';
import { postData } from '../../data/post';
import { CreatePost } from './CreatePost';
import type { Post as PostType } from '../../utils/types';

const createPostHandler = () => {
  return rest.post<PostType>('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    return res(
      ctx.json({
        userId: 1,
        id: 1,
        title: 'New post',
        body: 'description',
      }),
    );
  });
};

const server = setupServer(createPostHandler());

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

  it('shows Success message when loading status is over', async () => {
    render(<CreatePost />);

    const button = screen.getByRole('button', { name: /add post/i });

    userEvent.click(button);

    const loading = await screen.findByText(/loading/i);

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(async () => {
      const successMessage = await screen.findByText(/success/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});
